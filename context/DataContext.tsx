
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Service, BlogPost, Lead, Project, BlogCategory, CaseStudy, PageSEO } from '../types';
import { INITIAL_SERVICES, INITIAL_PROJECTS } from '../constants';
import { db, auth } from '../lib/firebase';
import firebase from 'firebase/compat/app';

interface DataContextType {
  services: Service[];
  blogs: BlogPost[];
  blogCategories: BlogCategory[];
  leads: Lead[];
  projects: Project[];
  caseStudies: CaseStudy[];
  seoPages: PageSEO[];
  fetchSeoPages: () => Promise<void>;
  updateSeoPage: (page: PageSEO) => Promise<void>;
  deleteSeoPage: (id: string) => Promise<void>;
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
    SERVICES: 'opt_services_v6',
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
  const [seoPages, setSeoPages] = useState<PageSEO[]>([]);
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
      // Force sync: overwrite every reload during development
      for (const service of INITIAL_SERVICES) {
        const { id, ...rest } = service;
        await db.collection("services").doc(id).set(rest, { merge: true });
      }
      
      const querySnapshot = await db.collection("services").get();
      if (!querySnapshot.empty) {
        const fetchedServices: Service[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Service));
        setServices(fetchedServices);
      } else {
        setServices(INITIAL_SERVICES);
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
      if (!querySnapshot.empty) {
        const fetchedStudies: CaseStudy[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as CaseStudy));
        
        // Sort in memory
        fetchedStudies.sort((a, b) => parseDate(b.date) - parseDate(a.date));
        
        setCaseStudies(fetchedStudies);
      } else {
        // Seed default best-suitable case studies
        const initialCaseStudies = [
          {
            id: 'cs-1',
            title: 'Scaling E-Commerce Sales by 300% on Amazon UK',
            slug: 'scaling-ecommerce-sales-amazon-uk',
            excerpt: 'How we helped a premium supplement brand dominate their category on Amazon using aggressive PPC and A+ content optimization.',
            content: '<h2>The Challenge</h2><p>Our client, a leading health supplement provider, struggled with high ACoS and stagnant organic rankings on Amazon UK. Their existing campaigns were bleeding budget with minimal returns.</p><h2>Our Approach</h2><p>We completely restructured their Amazon Advertising framework. We implemented a tiered keyword strategy, created high-converting A+ content, and focused aggressively on Sponsored Brands and Sponsored Display ads.</p><h2>The Results</h2><ul><li>300% increase in monthly sales</li><li>Reduced ACoS from 45% to 12%</li><li>Captured 3 top-ranking generic keyword positions in less than intact 90 days.</li></ul>',
            imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
            serviceId: '2',
            metaTitle: 'Scaling E-Commerce Sales on Amazon | Case Study',
            metaDescription: 'Discover how Optimantix Global helped a supplement brand increase sales by 300% on Amazon UK with a revamped PPC and listing strategy.',
            tags: ['Amazon Marketplace', 'E-commerce', 'PPC'],
            date: '2023-10-12'
          },
          {
            id: 'cs-2',
            title: 'Organic Traffic Boost for Healthcare Tech Startup',
            slug: 'organic-traffic-healthcare-startup',
            excerpt: 'Strategic SEO restructuring leading to a 150% increase in targeted organic traffic and a 40% jump in B2B qualified software leads.',
            content: '<h2>The Challenge</h2><p>A burgeoning healthcare software startup had an amazing product but a technically flawed website. Their traffic was flat, and they relied entirely on expensive outbound sales.</p><h2>Our Approach</h2><p>Our first step was a comprehensive technical audit, fixing crawl errors and massive site speed issues. Then, we developed a content marketing pipeline targeting long-tail, high-intent B2B healthcare keywords. Finally, we deployed a backlink acquisition strategy focusing on high-authority medical portals.</p><h2>The Results</h2><ul><li>150% increase in targeted organic traffic within 6 months.</li><li>40% increase in monthly qualified leads through the site.</li><li>Reduced overall Customer Acquisition Cost by 60%.</li></ul>',
            imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
            serviceId: '1',
            metaTitle: 'Healthcare Startup Organic Traffic Growth | Case Study',
            metaDescription: 'A detailed look at how comprehensive SEO and content marketing strategies grew B2B leads by 40% for a healthcare tech company.',
            tags: ['SEO', 'B2B', 'Content Marketing'],
            date: '2023-08-22'
          },
          {
            id: 'cs-3',
            title: 'Next-Gen Web Portal for a Global Retailer',
            slug: 'next-gen-web-portal-global-retailer',
            excerpt: 'Redesigning and deploying a highly scalable custom web portal that handles over 100k daily active users with zero downtime.',
            content: '<h2>The Challenge</h2><p>A global retailer’s legacy website was failing under high traffic loads during seasonal sales, resulting in lost revenue and a poor user experience.</p><h2>Our Approach</h2><p>We built a headless commerce solution using React and a scalable cloud infrastructure. We implemented advanced caching mechanisms, edge computing for fast asset delivery, and a fully modern UI/UX design focusing on conversion rate optimization.</p><h2>The Results</h2><ul><li>100k+ daily visitors handled flawlessly.</li><li>Page load times dropped from 4.5s to 0.8s.</li><li>Mobile conversion rates surged by 25%.</li><li>Zero downtime during black-friday events.</li></ul>',
            imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
            serviceId: '3',
            metaTitle: 'Scalable Web Portal for Global Retailer | Case Study',
            metaDescription: 'Read about our custom headless commerce build that reduced load times by 80% and increased mobile conversions by 25%.',
            tags: ['Web Development', 'Headless Commerce', 'UI/UX'],
            date: '2023-12-05'
          }
        ];
        
        for (const cs of initialCaseStudies) {
          const { id, ...rest } = cs;
          await db.collection("case_studies").doc(id).set(rest);
        }
        setCaseStudies(initialCaseStudies);
      }
    } catch (error) {
      console.warn("Fetching case studies failed:", error);
    }
  };

  const getSeoDocId = (path: string) => encodeURIComponent(path);

  const fetchSeoPages = async () => {
    try {
      const querySnapshot = await db.collection("seo_pages").get();
      if (!querySnapshot.empty) {
        const fetchedSeoPages: PageSEO[] = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            ...data,
            id: data.id || data.path || doc.id,
          } as PageSEO;
        });
        setSeoPages(fetchedSeoPages);
      }
    } catch (error) {
      console.warn("Fetching seo pages failed:", error);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        fetchSeoPages();
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
      fetchSeoPages();
    }, 500); // Small delay to allow auth to initialize

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services)); }, [services]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads)); }, [leads]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects)); }, [projects]);
  useEffect(() => { localStorage.setItem('opt_blogs_v1', JSON.stringify(blogs)); }, [blogs]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const tempId = 'temp-' + Date.now();
    const newPost = { ...postData, id: tempId } as BlogPost;
    setBlogs(prev => [newPost, ...prev]);

    try {
      const docRef = await db.collection("blogs").add(postData);
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
    setBlogs(prev => prev.map(b => b.id === post.id ? post : b));
    try {
      if (!post.id.startsWith('temp-')) {
        await db.collection("blogs").doc(post.id).update(post);
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

  const updateSeoPage = async (page: PageSEO) => {
    // If it exists, update it. Else add it.
    const existing = seoPages.find(p => p.id === page.id || p.path === page.path);
    if (existing) {
      setSeoPages(prev => prev.map(p => (p.id === page.id || p.path === page.path) ? page : p));
    } else {
      setSeoPages(prev => [...prev, page]);
    }
    
    try {
      await db.collection("seo_pages").doc(getSeoDocId(page.path)).set(page, { merge: true });
    } catch (e) {
      console.error("Error updating seo page: ", e);
    }
  };

  const deleteSeoPage = async (id: string) => {
    const pageToDelete = seoPages.find(p => p.id === id);
    setSeoPages(prev => prev.filter(p => p.id !== id));
    try {
      if (pageToDelete) {
        await db.collection("seo_pages").doc(getSeoDocId(pageToDelete.path)).delete();
      }
    } catch (e) {
      console.error("Error deleting seo page: ", e);
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
      services, blogs, blogCategories, leads, projects, caseStudies, seoPages,
      isDark, toggleTheme,
      isAuthenticated, 
      currentUser,
      login, logout,
      addLead, updateService, addBlogPost, deleteBlogPost, updateLeadStatus, updateBlogPost,
      addProject, deleteProject, updateProject, fetchBlogs, addBlogCategory, deleteBlogCategory,
      addCaseStudy, updateCaseStudy, deleteCaseStudy,
      fetchProjects, fetchCaseStudies, fetchServices,
      fetchSeoPages, updateSeoPage, deleteSeoPage,
      globalLoading, setGlobalLoading
    }}>
      {children}
    </DataContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
