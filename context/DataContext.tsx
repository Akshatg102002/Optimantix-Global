
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Service, BlogPost, Lead, Project, BlogCategory, CaseStudy } from '../types';
import { INITIAL_SERVICES, INITIAL_PROJECTS } from '../constants';
import { db, auth } from '../lib/firebase';
import firebase from 'firebase/compat/app';
import { normalizeBlogPayload } from '../utils/blog';

interface DataContextType {
  services: Service[];
  blogs: BlogPost[];
  blogCategories: BlogCategory[];
  leads: Lead[];
  projects: Project[];
  caseStudies: CaseStudy[];
  isDark: boolean;
  toggleTheme: () => void;
  isAuthenticated: boolean;
  currentUser: firebase.User | null;
  login: (pass: string) => Promise<void>;
  logout: () => Promise<void>;
  addLead: (lead: Omit<Lead, 'id' | 'date' | 'status'>) => void;
  // Blog Actions
  fetchBlogs: () => Promise<void>;
  addBlogPost: (post: Omit<BlogPost, 'id'>) => Promise<void>;
  updateBlogPost: (post: BlogPost) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
  // Category Actions
  addBlogCategory: (category: Omit<BlogCategory, 'id'>) => Promise<void>;
  deleteBlogCategory: (id: string) => Promise<void>;
  // Project Actions
  fetchProjects: () => Promise<void>;
  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  // Case Study Actions
  fetchCaseStudies: () => Promise<void>;
  addCaseStudy: (study: Omit<CaseStudy, 'id'>) => Promise<void>;
  updateCaseStudy: (study: CaseStudy) => Promise<void>;
  deleteCaseStudy: (id: string) => Promise<void>;
  // Service Actions
  fetchServices: () => Promise<void>;
  updateService: (service: Service) => Promise<void>;
  
  updateLeadStatus: (id: string, status: Lead['status']) => void;
  // UI State
  globalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const STORAGE_KEYS = {
    SERVICES: 'opt_services_v5',
    LEADS: 'opt_leads_v5',
    PROJECTS: 'opt_projects_v5',
    CASE_STUDIES: 'opt_case_studies_v1',
    THEME: 'opt_theme',
    AUTH: 'opt_admin_auth'
  };

  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [blogCategories, setBlogCategories] = useState<BlogCategory[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [globalLoading, setGlobalLoading] = useState(false);
  
  // Helper to parse various date formats
  const parseDate = (dateStr: string) => {
    if (!dateStr) return 0;
    // Try standard parsing
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) return d.getTime();
    
    // Try DD/MM/YYYY
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0]);
      const month = parseInt(parts[1]) - 1;
      const year = parseInt(parts[2]);
      const d2 = new Date(year, month, day);
      if (!isNaN(d2.getTime())) return d2.getTime();
    }
    
    return 0;
  };

  // --- FIREBASE FETCHING ---
  const fetchBlogs = async () => {
    try {
      const querySnapshot = await db.collection("blogs").get();
      const fetchedBlogs: BlogPost[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as BlogPost));
      
      // Sort in memory to avoid index requirements
      fetchedBlogs.sort((a, b) => parseDate(b.date) - parseDate(a.date));
      
      setBlogs(fetchedBlogs);
    } catch (error) {
      console.warn("Fetching blogs failed:", error);
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
      console.warn("Fetching categories failed:", error);
    }
  }

  const fetchServices = async () => {
    try {
      const querySnapshot = await db.collection("services").get();
      if (!querySnapshot.empty) {
        const fetchedServices: Service[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Service));
        setServices(fetchedServices);
      } else {
        // Seed initial services if empty
        for (const service of INITIAL_SERVICES) {
          const { id, ...rest } = service;
          await db.collection("services").doc(id).set(rest);
        }
      }
    } catch (error) {
      console.warn("Fetching services failed:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const querySnapshot = await db.collection("projects").get();
      if (!querySnapshot.empty) {
        const fetchedProjects: Project[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Project));
        setProjects(fetchedProjects);
      } else {
        // Seed initial projects if empty
        for (const project of INITIAL_PROJECTS) {
          const { id, ...rest } = project;
          await db.collection("projects").doc(id).set(rest);
        }
      }
    } catch (error) {
      console.warn("Fetching projects failed:", error);
    }
  };

  const fetchCaseStudies = async () => {
    try {
      const querySnapshot = await db.collection("case_studies").get();
      const fetchedStudies: CaseStudy[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as CaseStudy));
      
      // Sort in memory
      fetchedStudies.sort((a, b) => parseDate(b.date) - parseDate(a.date));
      
      setCaseStudies(fetchedStudies);
    } catch (error) {
      console.warn("Fetching case studies failed:", error);
    }
  };

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
        fetchServices();
        fetchProjects();
        fetchCaseStudies();
      }
    });
    
    // Check Local Storage for Admin Session
    const localAuth = localStorage.getItem(STORAGE_KEYS.AUTH);
    if (localAuth === 'true') {
      setTimeout(() => setIsAuthenticated(true), 0);
    }

    // Always attempt anonymous sign-in if no user exists to ensure DB access
    if (!auth.currentUser) {
      auth.signInAnonymously().catch(e => console.warn("Background auth failed", e));
    }
    
    // Always fetch public data initially
    const timer = setTimeout(() => {
      fetchBlogs();
      fetchCategories();
      fetchServices();
      fetchProjects();
      fetchCaseStudies();
    }, 500); // Small delay to allow auth to initialize

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  // --- LOGIN LOGIC ---
  const login = async (pass: string) => {
    if (pass === 'admin999') {
        setIsAuthenticated(true);
        localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
        try {
            await auth.signInAnonymously();
        } catch (error) {
            console.warn("Login successful locally, but Firebase Auth failed.", error);
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

  useEffect(() => {
    const storedServices = localStorage.getItem(STORAGE_KEYS.SERVICES);
    const storedLeads = localStorage.getItem(STORAGE_KEYS.LEADS);
    const storedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    const storedBlogs = localStorage.getItem('opt_blogs_v1');
    const storedCaseStudies = localStorage.getItem(STORAGE_KEYS.CASE_STUDIES);

    if (storedServices) {
        try {
            const parsed = JSON.parse(storedServices);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setTimeout(() => setServices(parsed), 0);
            }
        } catch (e) { console.error("Failed to parse services", e); }
    }
    
    if (storedLeads) {
        try { 
          setTimeout(() => setLeads(JSON.parse(storedLeads)), 0);
        } catch (e) { console.error(e); }
    }
    
    if (storedProjects) {
        try { 
          setTimeout(() => setProjects(JSON.parse(storedProjects)), 0);
        } catch (e) { console.error(e); }
    }

    if (storedBlogs) {
        try {
          setTimeout(() => setBlogs(JSON.parse(storedBlogs)), 0);
        } catch (e) { console.error(e); }
    }

    if (storedCaseStudies) {
        try {
          setTimeout(() => setCaseStudies(JSON.parse(storedCaseStudies)), 0);
        } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => { localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services)); }, [services]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads)); }, [leads]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects)); }, [projects]);
  useEffect(() => { localStorage.setItem('opt_blogs_v1', JSON.stringify(blogs)); }, [blogs]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.CASE_STUDIES, JSON.stringify(caseStudies)); }, [caseStudies]);

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

  const updateService = async (updatedService: Service) => {
    setServices(prev => prev.map(s => s.id === updatedService.id ? updatedService : s));
    try {
      await db.collection("services").doc(updatedService.id).set(updatedService);
    } catch (e) {
      console.error("Error updating service: ", e);
    }
  };

  const addBlogPost = async (postData: Omit<BlogPost, 'id'>) => {
    const normalizedPost = normalizeBlogPayload(postData);
    const tempId = 'temp-' + Date.now();
    const newPost = { ...normalizedPost, id: tempId } as BlogPost;
    setBlogs(prev => [newPost, ...prev]);

    try {
      const docRef = await db.collection("blogs").add(normalizedPost);
      setBlogs(prev => prev.map(b => b.id === tempId ? { ...b, id: docRef.id } : b));
    } catch (e) {
      console.error("Error adding blog: ", e);
      alert("Note: Database write failed (Permissions). Blog saved locally for this session.");
    }
  };

  const deleteBlogPost = async (id: string) => {
    setBlogs(prev => prev.filter(b => b.id !== id));
    try {
      if (!id.startsWith('temp-')) {
         await db.collection("blogs").doc(id).delete();
      }
    } catch (e) {
      console.error("Error deleting blog: ", e);
      alert("Note: Database delete failed. Item removed locally.");
    }
  };

  const updateBlogPost = async (post: BlogPost) => {
    const normalizedPost = { id: post.id, ...normalizeBlogPayload(post) };
    setBlogs(prev => prev.map(b => b.id === post.id ? normalizedPost : b));
    try {
      if (!post.id.startsWith('temp-')) {
        await db.collection("blogs").doc(post.id).update(normalizedPost);
      }
    } catch (e) {
      console.error("Error updating blog: ", e);
      alert("Note: Database update failed. Item updated locally.");
    }
  };

  const addBlogCategory = async (categoryData: Omit<BlogCategory, 'id'>) => {
    const tempId = 'temp-cat-' + Date.now();
    const newCat = { ...categoryData, id: tempId };
    setBlogCategories(prev => [...prev, newCat]);

    try {
      const docRef = await db.collection("blog_categories").add(categoryData);
      setBlogCategories(prev => prev.map(c => c.id === tempId ? { ...c, id: docRef.id } : c));
    } catch (e) {
      console.error("Error adding category: ", e);
      alert("Note: Database write failed. Category saved locally.");
    }
  };

  const deleteBlogCategory = async (id: string) => {
    setBlogCategories(prev => prev.filter(c => c.id !== id));
    try {
        if (!id.startsWith('temp-')) {
            await db.collection("blog_categories").doc(id).delete();
        }
    } catch (e) {
        console.error("Error deleting category: ", e);
    }
  };

  // --- PROJECT ACTIONS ---
  const addProject = async (projectData: Omit<Project, 'id'>) => {
    const tempId = 'temp-proj-' + Date.now();
    const newProject: Project = { ...projectData, id: tempId };
    setProjects(prev => [newProject, ...prev]);
    try {
      const docRef = await db.collection("projects").add(projectData);
      setProjects(prev => prev.map(p => p.id === tempId ? { ...p, id: docRef.id } : p));
    } catch (e) {
      console.error("Error adding project: ", e);
    }
  };

  const updateProject = async (project: Project) => {
    setProjects(prev => prev.map(p => p.id === project.id ? project : p));
    try {
      if (!project.id.startsWith('temp-')) {
        await db.collection("projects").doc(project.id).update(project);
      }
    } catch (e) {
      console.error("Error updating project: ", e);
    }
  };

  const deleteProject = async (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    try {
      if (!id.startsWith('temp-')) {
        await db.collection("projects").doc(id).delete();
      }
    } catch (e) {
      console.error("Error deleting project: ", e);
    }
  };

  // --- CASE STUDY ACTIONS ---
  const addCaseStudy = async (studyData: Omit<CaseStudy, 'id'>) => {
    const tempId = 'temp-study-' + Date.now();
    const newStudy: CaseStudy = { ...studyData, id: tempId };
    setCaseStudies(prev => [newStudy, ...prev]);
    try {
      const docRef = await db.collection("case_studies").add(studyData);
      setCaseStudies(prev => prev.map(s => s.id === tempId ? { ...s, id: docRef.id } : s));
    } catch (e) {
      console.error("Error adding case study: ", e);
    }
  };

  const updateCaseStudy = async (study: CaseStudy) => {
    setCaseStudies(prev => prev.map(s => s.id === study.id ? study : s));
    try {
      if (!study.id.startsWith('temp-')) {
        await db.collection("case_studies").doc(study.id).update(study);
      }
    } catch (e) {
      console.error("Error updating case study: ", e);
    }
  };

  const deleteCaseStudy = async (id: string) => {
    setCaseStudies(prev => prev.filter(s => s.id !== id));
    try {
      if (!id.startsWith('temp-')) {
        await db.collection("case_studies").doc(id).delete();
      }
    } catch (e) {
      console.error("Error deleting case study: ", e);
    }
  };

  const updateLeadStatus = (id: string, status: Lead['status']) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  return (
    <DataContext.Provider value={{ 
      services, blogs, blogCategories, leads, projects, caseStudies,
      isDark, toggleTheme,
      isAuthenticated, 
      currentUser,
      login, logout,
      addLead, updateService, addBlogPost, deleteBlogPost, updateLeadStatus, updateBlogPost,
      addProject, deleteProject, updateProject, fetchBlogs, addBlogCategory, deleteBlogCategory,
      addCaseStudy, updateCaseStudy, deleteCaseStudy,
      fetchProjects, fetchCaseStudies, fetchServices,
      globalLoading, setGlobalLoading
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
