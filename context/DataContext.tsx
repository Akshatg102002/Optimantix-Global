
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
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Theme State
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('opt_theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('opt_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('opt_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('opt_auth', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('opt_auth');
  };

  useEffect(() => {
    if (localStorage.getItem('opt_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const storedServices = localStorage.getItem('opt_services');
    const storedBlogs = localStorage.getItem('opt_blogs');
    const storedLeads = localStorage.getItem('opt_leads');
    const storedProjects = localStorage.getItem('opt_projects');

    if (storedServices) setServices(JSON.parse(storedServices));
    if (storedBlogs) setBlogs(JSON.parse(storedBlogs));
    if (storedLeads) setLeads(JSON.parse(storedLeads));
    if (storedProjects) setProjects(JSON.parse(storedProjects));
  }, []);

  useEffect(() => { localStorage.setItem('opt_services', JSON.stringify(services)); }, [services]);
  useEffect(() => { localStorage.setItem('opt_blogs', JSON.stringify(blogs)); }, [blogs]);
  useEffect(() => { localStorage.setItem('opt_leads', JSON.stringify(leads)); }, [leads]);
  useEffect(() => { localStorage.setItem('opt_projects', JSON.stringify(projects)); }, [projects]);

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
