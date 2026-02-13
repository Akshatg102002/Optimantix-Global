import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Service, BlogPost, Lead } from '../types';
import { INITIAL_SERVICES, INITIAL_BLOGS } from '../constants';

interface DataContextType {
  services: Service[];
  blogs: BlogPost[];
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'date' | 'status'>) => void;
  updateService: (service: Service) => void;
  addBlogPost: (post: Omit<BlogPost, 'id'>) => void;
  deleteBlogPost: (id: string) => void;
  updateLeadStatus: (id: string, status: Lead['status']) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [leads, setLeads] = useState<Lead[]>([]);

  // Load from local storage on mount (simulated persistence)
  useEffect(() => {
    const storedServices = localStorage.getItem('opt_services');
    const storedBlogs = localStorage.getItem('opt_blogs');
    const storedLeads = localStorage.getItem('opt_leads');

    if (storedServices) setServices(JSON.parse(storedServices));
    if (storedBlogs) setBlogs(JSON.parse(storedBlogs));
    if (storedLeads) setLeads(JSON.parse(storedLeads));
  }, []);

  // Save to local storage whenever data changes
  useEffect(() => {
    localStorage.setItem('opt_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('opt_blogs', JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem('opt_leads', JSON.stringify(leads));
  }, [leads]);

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

  const updateLeadStatus = (id: string, status: Lead['status']) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  return (
    <DataContext.Provider value={{ services, blogs, leads, addLead, updateService, addBlogPost, deleteBlogPost, updateLeadStatus }}>
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