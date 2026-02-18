
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Service, BlogPost, Lead, Project, BlogCategory } from '../types';
import { INITIAL_SERVICES, INITIAL_PROJECTS } from '../constants';
import { db, auth } from '../lib/firebase';
import firebase from 'firebase/compat/app';

interface DataContextType {
  services: Service[];
  blogs: BlogPost[];
  blogCategories: BlogCategory[];
  leads: Lead[];
  projects: Project[];
  isDark: boolean;
  toggleTheme: () => void;
  isAuthenticated: boolean;
  currentUser: firebase.User | null;
  login: (pass: string) => Promise<void>;
  logout: () => Promise<void>;
  addLead: (lead: Omit<Lead, 'id' | 'date' | 'status'>) => void;
  updateService: (service: Service) => void;
  // Blog Actions
  fetchBlogs: () => Promise<void>;
  addBlogPost: (post: Omit<BlogPost, 'id'>) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
  // Category Actions
  addBlogCategory: (category: Omit<BlogCategory, 'id'>) => Promise<void>;
  deleteBlogCategory: (id: string) => Promise<void>;
  // Project Actions
  addProject: (project: Omit<Project, 'id'>) => void;
  deleteProject: (id: string) => void;
  updateLeadStatus: (id: string, status: Lead['status']) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const STORAGE_KEYS = {
    SERVICES: 'opt_services_v5',
    LEADS: 'opt_leads_v5',
    PROJECTS: 'opt_projects_v5',
    THEME: 'opt_theme',
    AUTH: 'opt_admin_auth'
  };

  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [blogCategories, setBlogCategories] = useState<BlogCategory[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  
  // Theme State
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS.THEME) === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem(STORAGE_KEYS.THEME, 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem(STORAGE_KEYS.THEME, 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  // --- FIREBASE AUTH LISTENER ---
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) {
        // If firebase user exists, we are "connected" to DB
        fetchBlogs(); 
        fetchCategories();
      }
    });
    
    // Check Local Storage for Admin Session
    const localAuth = localStorage.getItem(STORAGE_KEYS.AUTH);
    if (localAuth === 'true') {
        setIsAuthenticated(true);
        // Try to establish firebase connection silently if needed
        if (!auth.currentUser) {
            auth.signInAnonymously().catch(e => console.warn("Background auth failed", e));
        }
    }

    return unsubscribe;
  }, []);

  // --- LOGIN LOGIC ---
  const login = async (pass: string) => {
    if (pass === 'admin999') {
        // 1. Set Local State Immediately (Hardcoded access)
        setIsAuthenticated(true);
        localStorage.setItem(STORAGE_KEYS.AUTH, 'true');

        // 2. Try to get Database Permissions (Anonymous Auth)
        // We catch the error so it doesn't block the UI login if Auth is not enabled in Console
        try {
            await auth.signInAnonymously();
        } catch (error) {
            console.warn("Login successful locally, but Firebase Auth failed. Database writes may fail if rules require auth.", error);
        }
    } else {
        throw new Error("Invalid Password");
    }
  };

  const logout = async () => {
    try {
        await auth.signOut();
    } catch (e) {
        console.warn("Sign out error", e);
    }
    setIsAuthenticated(false);
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  };

  // --- FIREBASE FETCHING ---
  const fetchBlogs = async () => {
    try {
      const querySnapshot = await db.collection("blogs").orderBy("date", "desc").get();
      const fetchedBlogs: BlogPost[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as BlogPost));
      setBlogs(fetchedBlogs);
    } catch (error) {
      console.error("Error fetching blogs (Check Firestore Rules):", error);
      // Don't clear blogs on error to keep UI stable if previously loaded or fallback needed
    }
  };

  const fetchCategories = async () => {
    try {
      const querySnapshot = await db.collection("blog_categories").get();
      const fetchedCategories: BlogCategory[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as BlogCategory));
      setBlogCategories(fetchedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    // Initial Fetch
    fetchBlogs();
    fetchCategories();

    // Local Storage Hydration
    const storedServices = localStorage.getItem(STORAGE_KEYS.SERVICES);
    const storedLeads = localStorage.getItem(STORAGE_KEYS.LEADS);
    const storedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS);

    if (storedServices) {
        try {
            const parsed = JSON.parse(storedServices);
            if (Array.isArray(parsed) && parsed.length > 0) setServices(parsed);
        } catch (e) { console.error("Failed to parse services", e); }
    }
    
    if (storedLeads) {
        try { setLeads(JSON.parse(storedLeads)); } catch (e) { console.error(e); }
    }
    
    if (storedProjects) {
        try { setProjects(JSON.parse(storedProjects)); } catch (e) { console.error(e); }
    }
  }, []);

  // Sync Local Storage
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services)); }, [services]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads)); }, [leads]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects)); }, [projects]);

  // --- ACTION HANDLERS ---

  const addLead = (leadData: Omit<Lead, 'id' | 'date' | 'status'>) => {
    const newLead: Lead = {
      ...leadData,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'New'
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const updateService = (updatedService: Service) => {
    setServices(prev => prev.map(s => s.id === updatedService.id ? updatedService : s));
  };

  const addBlogPost = async (postData: Omit<BlogPost, 'id'>) => {
    try {
      await db.collection("blogs").add(postData);
      await fetchBlogs();
    } catch (e) {
      console.error("Error adding blog: ", e);
      alert("Failed to save to database. Check permissions.");
      throw e;
    }
  };

  const deleteBlogPost = async (id: string) => {
    try {
      await db.collection("blogs").doc(id).delete();
      setBlogs(prev => prev.filter(b => b.id !== id));
    } catch (e) {
      console.error("Error deleting blog: ", e);
      alert("Failed to delete. Check permissions.");
      throw e;
    }
  };

  const addBlogCategory = async (categoryData: Omit<BlogCategory, 'id'>) => {
    try {
      await db.collection("blog_categories").add(categoryData);
      await fetchCategories();
    } catch (e) {
      console.error("Error adding category: ", e);
      throw e;
    }
  };

  const deleteBlogCategory = async (id: string) => {
    try {
        await db.collection("blog_categories").doc(id).delete();
        setBlogCategories(prev => prev.filter(c => c.id !== id));
    } catch (e) {
        console.error("Error deleting category: ", e);
    }
  };

  const addProject = (projectData: Omit<Project, 'id'>) => {
    const newProject: Project = { ...projectData, id: Date.now().toString() };
    setProjects(prev => [newProject, ...prev]);
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const updateLeadStatus = (id: string, status: Lead['status']) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  return (
    <DataContext.Provider value={{ 
      services, blogs, blogCategories, leads, projects,
      isDark, toggleTheme,
      isAuthenticated, 
      currentUser,
      login, logout,
      addLead, updateService, addBlogPost, deleteBlogPost, updateLeadStatus,
      addProject, deleteProject, fetchBlogs, addBlogCategory, deleteBlogCategory
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
