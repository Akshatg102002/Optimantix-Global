
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Service, BlogPost, Lead, Project } from '../types';
import { INITIAL_SERVICES, INITIAL_BLOGS, INITIAL_PROJECTS } from '../constants';

interface DataContextType {
  services: Service[];
  blogs: BlogPost[];
  leads: Lead[];
  projects: Project[];
  isDark: boolean;
  toggleTheme: () => void;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  addLead: (lead: Omit<Lead, 'id' | 'date' | 'status'>) => void;
  updateService: (service: Service) => void;
  addBlogPost: (post: Omit<BlogPost, 'id'>) => void;
  deleteBlogPost: (id: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  deleteProject: (id: string) => void;
  updateLeadStatus: (id: string, status: Lead['status']) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Using v2 keys to invalidate old cache lacking subServices
  const STORAGE_KEYS = {
    SERVICES: 'opt_services_v2',
    BLOGS: 'opt_blogs_v2',
    LEADS: 'opt_leads_v2',
    PROJECTS: 'opt_projects_v2',
    THEME: 'opt_theme',
    AUTH: 'opt_auth'
  };

  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
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

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  };

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEYS.AUTH) === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const storedServices = localStorage.getItem(STORAGE_KEYS.SERVICES);
    const storedBlogs = localStorage.getItem(STORAGE_KEYS.BLOGS);
    const storedLeads = localStorage.getItem(STORAGE_KEYS.LEADS);
    const storedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS);

    if (storedServices) setServices(JSON.parse(storedServices));
    if (storedBlogs) setBlogs(JSON.parse(storedBlogs));
    if (storedLeads) setLeads(JSON.parse(storedLeads));
    if (storedProjects) setProjects(JSON.parse(storedProjects));
  }, []);

  useEffect(() => { localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services)); }, [services]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogs)); }, [blogs]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads)); }, [leads]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects)); }, [projects]);

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

  const addBlogPost = (postData: Omit<BlogPost, 'id'>) => {
    const newPost: BlogPost = {
      ...postData,
      id: Date.now().toString()
    };
    setBlogs(prev => [newPost, ...prev]);
  };

  const deleteBlogPost = (id: string) => {
    setBlogs(prev => prev.filter(b => b.id !== id));
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
      services, blogs, leads, projects,
      isDark, toggleTheme,
      isAuthenticated, login, logout,
      addLead, updateService, addBlogPost, deleteBlogPost, updateLeadStatus,
      addProject, deleteProject
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
