
import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { Link, useNavigate } from 'react-router-dom';
import { AdminMedia } from './Media';
import { AdminSeoPages } from './SeoPages';
import { MediaPicker } from '../../components/MediaManager/MediaPicker';
import { MediaFile } from '../../hooks/useMedia';
import { LayoutDashboard, FileText, Settings, LogOut, Briefcase, Plus, ArrowLeft, Tag, Image as ImageIcon, Save, PieChart, ExternalLink, XCircle, Upload, BookOpen, Globe } from 'lucide-react';
import { Icon } from '../../components/Icon';
import { BlogPost, CaseStudy, Service, SubService, Page } from '../../types';
import { BlogCSVImport } from '../../components/BlogCSVImport';
import { RichTextEditor } from '../../components/RichTextEditor';

// Tabs
const TABS = {
  OVERVIEW: 'OVERVIEW',
  SERVICES: 'SERVICES',
  BLOG: 'BLOG',
  PAGES: 'PAGES',
  PORTFOLIO: 'PORTFOLIO',
  CASE_STUDIES: 'CASE_STUDIES',
  MEDIA: 'MEDIA',
  SEO_PAGES: 'SEO_PAGES'
};

const BLOG_VIEWS = {
  LIST: 'LIST',
  EDIT: 'EDIT',
  CATEGORIES: 'CATEGORIES',
  IMPORT: 'IMPORT'
};

const PAGE_VIEWS = {
  LIST: 'LIST',
  EDIT: 'EDIT'
};

const CASE_STUDY_VIEWS = {
  LIST: 'LIST',
  EDIT: 'EDIT'
};

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(TABS.OVERVIEW);
  const [blogView, setBlogView] = useState(BLOG_VIEWS.LIST);
  const [pageView, setPageView] = useState(PAGE_VIEWS.LIST);

  const {
    services, blogs, blogCategories, projects, caseStudies, pages,
    updateService,
    addBlogPost, deleteBlogPost, updateBlogPost,
    addBlogCategory, deleteBlogCategory,
    addProject, deleteProject,
    addCaseStudy, updateCaseStudy, deleteCaseStudy,
    addPage, updatePage, deletePage,
    isAuthenticated, logout
  } = useData();

  const navigate = useNavigate();

  // Page State
  const initialPageForm: Partial<Page> = {
    title: '', slug: '', excerpt: '', content: '', imageUrl: '', imageAltText: '',
    metaTitle: '', metaDescription: '', focusKeyword: '', isPublished: true,
    schemaType: 'WebPage'
  };
  const [pageForm, setPageForm] = useState<Partial<Page>>(initialPageForm);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [isSubmittingPage, setIsSubmittingPage] = useState(false);

  // Case Study State
  const [caseStudyView, setCaseStudyView] = useState(CASE_STUDY_VIEWS.LIST);
  const initialCaseStudyForm: Partial<CaseStudy> = {
    title: '', slug: '', excerpt: '', content: '', imageUrl: '', imageAltText: '',
    serviceId: '', subServiceId: '',
    metaTitle: '', metaDescription: '', tags: [],
    date: new Date().toISOString()
  };
  const [caseStudyForm, setCaseStudyForm] = useState<Partial<CaseStudy>>(initialCaseStudyForm);
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | null>(null);
  const [isSubmittingCaseStudy, setIsSubmittingCaseStudy] = useState(false);

  // Service Edit Form
  const [editingService, setEditingService] = useState<string | null>(null);
  const [editServiceForm, setEditServiceForm] = useState<Partial<Service>>({ title: '', shortDescription: '' });

  // Blog Form
  const initialBlogForm: Partial<BlogPost> = {
    title: '', slug: '', excerpt: '', content: '', author: 'Admin', imageAltText: '',
    imageUrl: 'https://images.unsplash.com/photo-1499750310159-52f0f835497a?auto=format&fit=crop&q=80&w=800',
    categoryId: '', metaTitle: '', metaDescription: '', isPublished: true
  };
  const [blogForm, setBlogForm] = useState<Partial<BlogPost>>(initialBlogForm);
  const [isSubmittingBlog, setIsSubmittingBlog] = useState(false);

  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  // Category Form
  const [newCategoryName, setNewCategoryName] = useState('');

  // Project Form
  const [newProjectForm, setNewProjectForm] = useState({ title: '', category: '', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800', projectUrl: '' });

  // Media Picker State
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<'blog' | 'project' | 'caseStudy' | 'page' | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
        navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // --- Case Study Handlers ---
  const handleSaveCaseStudy = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingCaseStudy(true);
    try {
      if (editingCaseStudy) {
        updateCaseStudy({ ...editingCaseStudy, ...caseStudyForm } as CaseStudy);
        alert("Case Study Updated!");
      } else {
        addCaseStudy({ ...caseStudyForm, date: new Date().toISOString() } as CaseStudy);
        alert("Case Study Created!");
      }
      setCaseStudyForm(initialCaseStudyForm);
      setEditingCaseStudy(null);
      setCaseStudyView(CASE_STUDY_VIEWS.LIST);
    } catch {
      alert("Failed to save case study");
    } finally {
      setIsSubmittingCaseStudy(false);
    }
  };

  const handleEditCaseStudy = (study: CaseStudy) => {
    setEditingCaseStudy(study);
    setCaseStudyForm(study);
    setCaseStudyView(CASE_STUDY_VIEWS.EDIT);
  };

  const handleDeleteCaseStudy = (id: string) => {
    if (window.confirm("Are you sure you want to delete this case study?")) {
      deleteCaseStudy(id);
    }
  };

  // --- Page Handlers ---
  const handleSavePage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingPage(true);
    try {
      if (editingPage) {
        await updatePage({ ...editingPage, ...pageForm } as Page);
        alert("Page Updated!");
      } else {
        await addPage({ ...pageForm, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } as any);
        alert("Page Created!");
      }
      setPageForm(initialPageForm);
      setEditingPage(null);
      setPageView(PAGE_VIEWS.LIST);
    } catch {
      alert("Failed to save page");
    } finally {
      setIsSubmittingPage(false);
    }
  };

  const handleEditPage = (page: Page) => {
    setEditingPage(page);
    setPageForm(page);
    setPageView(PAGE_VIEWS.EDIT);
  };

  const handleDeletePage = (id: string) => {
    if (window.confirm("Are you sure you want to delete this page?")) {
      deletePage(id);
    }
  };

  // --- Service Handlers ---
  const handleEditService = (service: Service) => {
    setEditingService(service.id);
    setEditServiceForm(service);
  };

  const saveService = async () => {
    await updateService(editServiceForm as Service);
    setEditingService(null);
  };

  // --- Blog Handlers ---
  const handlePublishBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingBlog(true);
    try {
        await addBlogPost({
            ...blogForm as BlogPost,
            date: new Date().toISOString()
        });
        alert("Blog Posted Successfully!");
        setBlogForm(initialBlogForm);
        setBlogView(BLOG_VIEWS.LIST);
    } catch {
        alert("Failed to post blog");
    } finally {
        setIsSubmittingBlog(false);
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName) return;
    const slug = newCategoryName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    try {
        await addBlogCategory({ name: newCategoryName, slug });
        setNewCategoryName('');
    } catch {
        alert("Failed to create category");
    }
  };

  const handleEditBlog = (blog: BlogPost) => {
    setEditingBlog(blog);
    setBlogForm(blog);
    setBlogView(BLOG_VIEWS.EDIT);
  };

  const handleUpdateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;

    setIsSubmittingBlog(true);
    try {
      await updateBlogPost({ ...editingBlog, ...blogForm });
      alert("Blog Updated Successfully!");
      setEditingBlog(null);
      setBlogForm(initialBlogForm);
      setBlogView(BLOG_VIEWS.LIST);
    } catch {
      alert("Failed to update blog");
    } finally {
      setIsSubmittingBlog(false);
    }
  };

  // --- Project Handlers ---
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    addProject(newProjectForm);
    setNewProjectForm({ title: '', category: '', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800', projectUrl: '' });
    alert("Project Added!");
  };

  const generateSlug = (text: string) => {
      return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  };

  if (!isAuthenticated) return null;

  const stats = [
    { label: 'Blog Posts', value: blogs.length, icon: FileText, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { label: 'Projects', value: projects.length, icon: Briefcase, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
    { label: 'Services', value: services.length, icon: Settings, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-dark font-sans text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-dark-card border-r border-gray-200 dark:border-gray-800 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">
            <LayoutDashboard />
            <span>Admin Panel</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab(TABS.OVERVIEW)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium ${activeTab === TABS.OVERVIEW ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
            <PieChart size={20} /> Overview
          </button>
          <button onClick={() => setActiveTab(TABS.SERVICES)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium ${activeTab === TABS.SERVICES ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
            <Settings size={20} /> Services
          </button>
          <button onClick={() => { setActiveTab(TABS.BLOG); setBlogView(BLOG_VIEWS.LIST); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium ${activeTab === TABS.BLOG ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
            <FileText size={20} /> Blog
          </button>
          <button onClick={() => { setActiveTab(TABS.PAGES); setPageView(PAGE_VIEWS.LIST); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium ${activeTab === TABS.PAGES ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
            <FileText size={20} /> Pages
          </button>
          {/* Portfolio tab hidden per client request — data and files preserved */}
          {/* <button onClick={() => setActiveTab(TABS.PORTFOLIO)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium ${activeTab === TABS.PORTFOLIO ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
            <Briefcase size={20} /> Portfolio
          </button> */}
          <button onClick={() => { setActiveTab(TABS.CASE_STUDIES); setCaseStudyView(CASE_STUDY_VIEWS.LIST); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium ${activeTab === TABS.CASE_STUDIES ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
            <BookOpen size={20} /> Case Studies
          </button>
          <button onClick={() => setActiveTab(TABS.MEDIA)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium ${activeTab === TABS.MEDIA ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
            <ImageIcon size={20} /> Media
          </button>
          <button onClick={() => setActiveTab(TABS.SEO_PAGES)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium ${activeTab === TABS.SEO_PAGES ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
            <Globe size={20} /> SEO Management
          </button>
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
          <Link to="/" target="_blank" className="flex items-center gap-2 text-gray-500 hover:text-primary transition p-2 text-sm">
             <ExternalLink size={16} /> View Live Site
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-700 transition w-full p-2 text-sm font-medium">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50 dark:bg-[#111]">
        <div className="md:hidden flex justify-between items-center mb-6 bg-white dark:bg-dark-card p-4 rounded-xl shadow-sm">
           <span className="font-bold text-lg flex items-center gap-2"><LayoutDashboard className="text-primary"/> Admin</span>
           <button onClick={handleLogout} className="text-gray-500"><LogOut size={20}/></button>
        </div>
        
        {/* OVERVIEW TAB */}
        {activeTab === TABS.OVERVIEW && (
             <div className="animate-fadeIn">
                <h1 className="text-2xl font-bold mb-2">Dashboard Overview</h1>
                <p className="text-gray-500 mb-8">Welcome back, Admin. Here's what's happening.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4">
                            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="bg-white dark:bg-dark-card rounded-xl p-8 border border-gray-200 dark:border-gray-800 text-center">
                    <p className="text-gray-500 dark:text-gray-400">Select a module from the sidebar to manage content.</p>
                </div>
             </div>
        )}

        {/* SERVICES TAB */}
        {activeTab === TABS.SERVICES && (
          <div className="animate-fadeIn">
            <h1 className="text-2xl font-bold mb-6">Service Manager</h1>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {services.map(service => (
                <div key={service.id} className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 hover:border-primary/30 transition-all">
                  {editingService === service.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Title</label>
                          <input 
                            className="w-full border p-2 rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none" 
                            value={editServiceForm.title} 
                            onChange={e => setEditServiceForm({...editServiceForm, title: e.target.value})}
                            placeholder="Service Title"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Slug</label>
                          <input 
                            className="w-full border p-2 rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none" 
                            value={editServiceForm.slug} 
                            onChange={e => setEditServiceForm({...editServiceForm, slug: e.target.value})}
                            placeholder="service-slug"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Short Description</label>
                        <textarea 
                          className="w-full border p-2 rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none" 
                          rows={2}
                          value={editServiceForm.shortDescription} 
                          onChange={e => setEditServiceForm({...editServiceForm, shortDescription: e.target.value})}
                          placeholder="Short Description"
                        />
                      </div>

                      {/* Sub-services Management */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300">Sub-Services</h4>
                          <button 
                            type="button"
                            onClick={() => {
                              const newSub = { id: Date.now().toString(), title: 'New Sub-Service', slug: 'new-sub-service', shortDescription: '', fullDescription: '', features: [], benefits: [] };
                              setEditServiceForm({
                                ...editServiceForm,
                                subServices: [...(editServiceForm.subServices || []), newSub]
                              });
                            }}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded hover:bg-primary hover:text-white transition"
                          >
                            + Add Sub-Service
                          </button>
                        </div>
                        <div className="space-y-2 max-h-60 overflow-y-auto p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-800">
                          {editServiceForm.subServices?.map((sub: SubService, idx: number) => (
                            <div key={sub.id || idx} className="bg-white dark:bg-dark-card p-3 rounded-lg border border-gray-200 dark:border-gray-700 space-y-2">
                              <div className="flex gap-2">
                                <input 
                                  className="flex-1 text-xs border p-1.5 rounded dark:bg-gray-800 dark:border-gray-700"
                                  value={sub.title}
                                  onChange={e => {
                                    const newSubs = [...(editServiceForm.subServices || [])];
                                    newSubs[idx] = { ...sub, title: e.target.value, slug: generateSlug(e.target.value) };
                                    setEditServiceForm({ ...editServiceForm, subServices: newSubs });
                                  }}
                                  placeholder="Sub-service Title"
                                />
                                <button 
                                  type="button"
                                  onClick={() => {
                                    const newSubs = editServiceForm.subServices?.filter((_: SubService, i: number) => i !== idx);
                                    setEditServiceForm({ ...editServiceForm, subServices: newSubs });
                                  }}
                                  className="text-red-500 hover:bg-red-50 p-1 rounded"
                                >
                                  <XCircle size={14} />
                                </button>
                              </div>
                              <input 
                                className="w-full text-[10px] border p-1 rounded dark:bg-gray-800 dark:border-gray-700 font-mono text-gray-500"
                                value={sub.slug}
                                onChange={e => {
                                  const newSubs = [...(editServiceForm.subServices || [])];
                                  newSubs[idx] = { ...sub, slug: e.target.value };
                                  setEditServiceForm({ ...editServiceForm, subServices: newSubs });
                                }}
                                placeholder="sub-service-slug"
                              />
                            </div>
                          ))}
                          {(!editServiceForm.subServices || editServiceForm.subServices.length === 0) && (
                            <p className="text-center text-xs text-gray-400 py-4">No sub-services added.</p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                        <button onClick={saveService} className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                          <Save size={16} /> Save Changes
                        </button>
                        <button onClick={() => setEditingService(null)} className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-bold">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-indigo-50 dark:bg-slate-800 p-3 rounded-xl text-primary">
                            <Icon name={service.iconName} size={24} />
                          </div>
                          <h3 className="font-bold text-lg">{service.title}</h3>
                        </div>
                        <button onClick={() => handleEditService(service)} className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-lg hover:bg-primary hover:text-white transition">Edit</button>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{service.shortDescription}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BLOG TAB */}
        {activeTab === TABS.BLOG && (
          <div className="animate-fadeIn">
            {/* Header / Navigation for Blog Tab */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
               <h1 className="text-2xl font-bold">
                  {blogView === BLOG_VIEWS.LIST && "Manage Blogs"}
                  {blogView === BLOG_VIEWS.EDIT && (editingBlog ? 'Edit Blog Post' : 'Create New Blog')}
                  {blogView === BLOG_VIEWS.CATEGORIES && "Blog Categories"}
                  {blogView === BLOG_VIEWS.IMPORT && "Import Blogs from CSV"}
               </h1>
               <div className="flex gap-3">
                   {blogView !== BLOG_VIEWS.LIST && (
                        <button onClick={() => setBlogView(BLOG_VIEWS.LIST)} className="bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition flex items-center gap-2">
                            <ArrowLeft size={16} /> Back to List
                        </button>
                   )}
                   {blogView === BLOG_VIEWS.LIST && (
                       <>
                        <button onClick={() => setBlogView(BLOG_VIEWS.IMPORT)} className="bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition flex items-center gap-2">
                            <Upload size={16} /> Import CSV
                        </button>
                        <button onClick={() => setBlogView(BLOG_VIEWS.CATEGORIES)} className="bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition">
                            Categories
                        </button>
                        <button onClick={() => setBlogView(BLOG_VIEWS.EDIT)} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-secondary transition flex items-center gap-2 shadow-lg shadow-primary/20">
                            <Plus size={16} /> New Blog
                        </button>
                       </>
                   )}
               </div>
            </div>

            {/* BLOG VIEW: IMPORT */}
            {blogView === BLOG_VIEWS.IMPORT && (
                <div className="bg-white dark:bg-dark-card p-8 rounded-xl border border-gray-200 dark:border-gray-800">
                    <BlogCSVImport />
                </div>
            )}

            {/* BLOG VIEW: LIST */}
            {blogView === BLOG_VIEWS.LIST && (
                <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                    <div className="p-1 min-w-[800px] overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 text-xs uppercase text-gray-500 font-bold tracking-wider">
                                <tr>
                                    <th className="p-4">Title</th>
                                    <th className="p-4">Category</th>
                                    <th className="p-4">Author</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {blogs.length === 0 ? (
                                    <tr><td colSpan={5} className="p-8 text-center text-gray-500">No blogs posted yet.</td></tr>
                                ) : (
                                    blogs.map(blog => {
                                        const cat = blogCategories.find(c => c.id === blog.categoryId);
                                        return (
                                            <tr key={blog.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                                <td className="p-4 font-medium max-w-xs truncate">{blog.title}</td>
                                                <td className="p-4 text-sm">
                                                    {cat ? <span className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 px-2 py-1 rounded-md text-xs font-bold">{cat.name}</span> : <span className="text-gray-400 text-xs italic">Uncategorized</span>}
                                                </td>
                                                <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{blog.author}</td>
                                                <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{new Date(blog.date).toLocaleDateString()}</td>
                                                <td className="p-4 text-right flex items-center justify-end gap-2">
                                                    <button onClick={() => handleEditBlog(blog)} className="text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-2 rounded-lg transition"><Save size={18} /></button>
                                                    <button onClick={() => deleteBlogPost(blog.id)} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition"><XCircle size={18} /></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* BLOG VIEW: CATEGORIES */}
            {blogView === BLOG_VIEWS.CATEGORIES && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                        <h2 className="text-lg font-bold mb-4">Create Category</h2>
                        <form onSubmit={handleCreateCategory} className="flex gap-2">
                            <input 
                                className="flex-1 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2.5 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                placeholder="Category Name"
                                value={newCategoryName}
                                onChange={e => setNewCategoryName(e.target.value)}
                            />
                            <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-secondary">Add</button>
                        </form>
                    </div>
                    <div className="bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                        <h2 className="text-lg font-bold mb-4">Existing Categories</h2>
                        <ul className="space-y-2">
                            {blogCategories.length === 0 && <li className="text-gray-500 italic">No categories created.</li>}
                            {blogCategories.map(cat => (
                                <li key={cat.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                                    <span className="font-medium">{cat.name}</span>
                                    <button onClick={() => deleteBlogCategory(cat.id)} className="text-red-500 text-xs font-bold hover:underline">DELETE</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* BLOG VIEW: EDIT (NEW BLOG) */}
            {blogView === BLOG_VIEWS.EDIT && (
                <form onSubmit={editingBlog ? handleUpdateBlog : handlePublishBlog} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-200 dark:border-gray-800 space-y-4">
                            <h2 className="text-lg font-bold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">Content</h2>
                            
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Blog Title</label>
                                <input 
                                    required
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none text-lg font-medium"
                                    placeholder="Enter blog title..."
                                    value={blogForm.title}
                                    onChange={e => setBlogForm({...blogForm, title: e.target.value, slug: generateSlug(e.target.value)})}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Slug (URL)</label>
                                <input 
                                    required
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm text-gray-500 font-mono"
                                    value={blogForm.slug}
                                    onChange={e => setBlogForm({...blogForm, slug: generateSlug(e.target.value)})}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Blog Content</label>
                                <RichTextEditor
                                    value={blogForm.content || ''}
                                    onChange={(html) => setBlogForm({...blogForm, content: html})}
                                    placeholder="Write your article content here..."
                                />
                                <p className="text-xs text-gray-400 mt-2">Full HTML editor with formatting, images, and links.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Short Excerpt</label>
                                <textarea 
                                    required
                                    rows={3}
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    placeholder="Summary for the card view..."
                                    value={blogForm.excerpt}
                                    onChange={e => setBlogForm({...blogForm, excerpt: e.target.value})}
                                />
                            </div>
                        </div>

                        {/* SEO Section */}
                        <div className="bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-200 dark:border-gray-800 space-y-4">
                             <h2 className="text-lg font-bold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 flex items-center gap-2"><Tag size={18} /> SEO Settings</h2>
                             <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Meta Title</label>
                                <input 
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    placeholder="SEO Title (defaults to blog title)"
                                    value={blogForm.metaTitle}
                                    onChange={e => setBlogForm({...blogForm, metaTitle: e.target.value})}
                                />
                             </div>
                             <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Meta Description</label>
                                <textarea 
                                    rows={2}
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    placeholder="SEO Description (defaults to excerpt)"
                                    value={blogForm.metaDescription}
                                    onChange={e => setBlogForm({...blogForm, metaDescription: e.target.value})}
                                />
                             </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-200 dark:border-gray-800 space-y-4 sticky top-6">
                             <h2 className="text-lg font-bold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">Publishing</h2>
                             
                             <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Author</label>
                                <input 
                                    required
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    value={blogForm.author}
                                    onChange={e => setBlogForm({...blogForm, author: e.target.value})}
                                />
                             </div>

                             <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Category</label>
                                <select 
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    value={blogForm.categoryId}
                                    onChange={e => setBlogForm({...blogForm, categoryId: e.target.value})}
                                >
                                    <option value="">Select Category</option>
                                    {blogCategories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                             </div>

                             <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 flex items-center justify-between">
                                  <span className="flex items-center gap-2"><ImageIcon size={16}/> Featured Image URL</span>
                                  <button 
                                    type="button"
                                    onClick={() => { setMediaPickerTarget('blog'); setIsMediaPickerOpen(true); }}
                                    className="text-xs text-primary hover:underline font-bold"
                                  >
                                    Select from Library
                                  </button>
                                </label>
                                <input 
                                    required
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm"
                                    value={blogForm.imageUrl}
                                    onChange={e => setBlogForm({...blogForm, imageUrl: e.target.value})}
                                />
                                {blogForm.imageUrl && (
                                    <div className="mt-3 h-32 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100">
                                        <img src={blogForm.imageUrl} className="w-full h-full object-cover" alt="Preview" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                    </div>
                                )}
                             </div>

                             <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Image Alt Text</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm"
                                    placeholder="Describe the image for accessibility..."
                                    value={blogForm.imageAltText || ''}
                                    onChange={e => setBlogForm({...blogForm, imageAltText: e.target.value})}
                                />
                                <p className="text-xs text-gray-400 mt-1">Defaults to blog title if left empty.</p>
                             </div>

                             <button 
                                type="submit" 
                                disabled={isSubmittingBlog}
                                className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-secondary transition flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
                            >
                                {isSubmittingBlog ? (editingBlog ? 'Updating...' : 'Publishing...') : <><Save size={18} /> {editingBlog ? 'Update Blog' : 'Publish Blog'}</>}
                             </button>
                        </div>
                    </div>
                </form>
            )}
          </div>
        )}

        {/* PAGES TAB */}
        {activeTab === TABS.PAGES && (
          <div className="animate-fadeIn">
            {/* PAGES VIEW: LIST */}
            {pageView === PAGE_VIEWS.LIST && (
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Pages</h1>
                        <button
                            onClick={() => { setPageForm(initialPageForm); setEditingPage(null); setPageView(PAGE_VIEWS.EDIT); }}
                            className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-secondary transition flex items-center gap-2 shadow-lg shadow-primary/20"
                        >
                            <Plus size={20} /> New Page
                        </button>
                    </div>
                    <div className="bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                                <tr>
                                    <th className="p-4 text-left font-bold text-gray-700 dark:text-gray-300">Title</th>
                                    <th className="p-4 text-left font-bold text-gray-700 dark:text-gray-300">Slug</th>
                                    <th className="p-4 text-left font-bold text-gray-700 dark:text-gray-300">Status</th>
                                    <th className="p-4 text-left font-bold text-gray-700 dark:text-gray-300">Created</th>
                                    <th className="p-4 text-right font-bold text-gray-700 dark:text-gray-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {pages.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-gray-500">No pages yet. Create one to get started.</td>
                                    </tr>
                                )}
                                {pages.map(page => (
                                    <tr key={page.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                                        <td className="p-4 font-medium text-gray-900 dark:text-white">{page.title}</td>
                                        <td className="p-4 text-gray-600 dark:text-gray-400 font-mono text-xs">/{page.slug}</td>
                                        <td className="p-4"><span className={`px-3 py-1 rounded-full text-xs font-bold ${page.isPublished ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'}`}>{page.isPublished ? 'Published' : 'Draft'}</span></td>
                                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{new Date(page.createdAt).toLocaleDateString()}</td>
                                        <td className="p-4 text-right flex items-center justify-end gap-2">
                                            <button onClick={() => handleEditPage(page)} className="text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-2 rounded-lg transition"><Save size={18} /></button>
                                            <button onClick={() => handleDeletePage(page.id)} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition"><XCircle size={18} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* PAGES VIEW: EDIT */}
            {pageView === PAGE_VIEWS.EDIT && (
                <form onSubmit={handleSavePage} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-200 dark:border-gray-800 space-y-4">
                            <h2 className="text-lg font-bold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">Content</h2>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Page Title</label>
                                <input
                                    required
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none text-lg font-medium"
                                    placeholder="Enter page title..."
                                    value={pageForm.title}
                                    onChange={e => setPageForm({...pageForm, title: e.target.value, slug: generateSlug(e.target.value)})}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Slug (URL)</label>
                                <input
                                    required
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm text-gray-500 font-mono"
                                    value={pageForm.slug}
                                    onChange={e => setPageForm({...pageForm, slug: generateSlug(e.target.value)})}
                                />
                                <p className="text-xs text-gray-400 mt-1">Will be accessible at /pages/{pageForm.slug}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Page Content</label>
                                <RichTextEditor
                                    value={pageForm.content || ''}
                                    onChange={(html) => setPageForm({...pageForm, content: html})}
                                    placeholder="Write your page content here..."
                                />
                                <p className="text-xs text-gray-400 mt-2">Full HTML editor with formatting, images, and links.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Short Excerpt</label>
                                <textarea
                                    required
                                    rows={3}
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    placeholder="Brief summary..."
                                    value={pageForm.excerpt}
                                    onChange={e => setPageForm({...pageForm, excerpt: e.target.value})}
                                />
                            </div>
                        </div>

                        {/* SEO Section */}
                        <div className="bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-200 dark:border-gray-800 space-y-4">
                             <h2 className="text-lg font-bold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 flex items-center gap-2"><Tag size={18} /> SEO Settings</h2>
                             <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Meta Title <span className="text-xs text-gray-500">({(pageForm.metaTitle || '').length}/60)</span></label>
                                <input
                                    maxLength={60}
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    placeholder="SEO Title"
                                    value={pageForm.metaTitle}
                                    onChange={e => setPageForm({...pageForm, metaTitle: e.target.value})}
                                />
                             </div>
                             <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Meta Description <span className="text-xs text-gray-500">({(pageForm.metaDescription || '').length}/160)</span></label>
                                <textarea
                                    maxLength={160}
                                    rows={2}
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    placeholder="SEO Description"
                                    value={pageForm.metaDescription}
                                    onChange={e => setPageForm({...pageForm, metaDescription: e.target.value})}
                                />
                             </div>
                             <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Focus Keyword (Optional)</label>
                                <input
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    placeholder="Primary keyword to target"
                                    value={pageForm.focusKeyword}
                                    onChange={e => setPageForm({...pageForm, focusKeyword: e.target.value})}
                                />
                             </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-200 dark:border-gray-800 space-y-4 sticky top-6">
                             <h2 className="text-lg font-bold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">Settings</h2>

                             <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 flex items-center justify-between">
                                  <span className="flex items-center gap-2"><ImageIcon size={16}/> Featured Image</span>
                                  <button
                                    type="button"
                                    onClick={() => { setMediaPickerTarget('page'); setIsMediaPickerOpen(true); }}
                                    className="text-xs text-primary hover:underline font-bold"
                                  >
                                    Select from Library
                                  </button>
                                </label>
                                <input
                                    required
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm"
                                    value={pageForm.imageUrl}
                                    onChange={e => setPageForm({...pageForm, imageUrl: e.target.value})}
                                />
                                {pageForm.imageUrl && (
                                    <div className="mt-3 h-32 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100">
                                        <img src={pageForm.imageUrl} className="w-full h-full object-cover" alt="Preview" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                    </div>
                                )}
                             </div>

                             <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Image Alt Text</label>
                                <input
                                  type="text"
                                  className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm"
                                  placeholder="Describe the image for accessibility..."
                                  value={pageForm.imageAltText || ''}
                                  onChange={e => setPageForm({...pageForm, imageAltText: e.target.value})}
                                />
                                <p className="text-xs text-gray-400 mt-1">Defaults to page title if left empty.</p>
                             </div>

                             <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Schema Type</label>
                                <select
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    value={pageForm.schemaType || 'WebPage'}
                                    onChange={e => setPageForm({...pageForm, schemaType: e.target.value as 'Article' | 'WebPage'})}
                                >
                                    <option value="WebPage">WebPage</option>
                                    <option value="Article">Article</option>
                                </select>
                             </div>

                             <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                                <input
                                    type="checkbox"
                                    checked={pageForm.isPublished}
                                    onChange={e => setPageForm({...pageForm, isPublished: e.target.checked})}
                                    className="w-5 h-5 accent-primary cursor-pointer"
                                />
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 cursor-pointer">Published</label>
                             </div>

                             <button
                                type="submit"
                                disabled={isSubmittingPage}
                                className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-secondary transition flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
                            >
                                {isSubmittingPage ? 'Saving...' : <><Save size={18} /> {editingPage ? 'Update Page' : 'Create Page'}</>}
                             </button>
                        </div>
                    </div>
                </form>
            )}
          </div>
        )}

        {/* PORTFOLIO TAB */}
        {/* Portfolio tab hidden per client request — data and files preserved (nav entry removed above; this block is now unreachable but retained intentionally) */}
        {activeTab === TABS.PORTFOLIO && (
          <div className="animate-fadeIn grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-2xl font-bold mb-6">Portfolio Items</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map(project => (
                  <div key={project.id} className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden group">
                    <div className="h-40 overflow-hidden relative">
                        <img src={project.imageUrl} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={project.title} />
                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-xs px-2 py-1 rounded">{project.category}</div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-gray-900 dark:text-white">{project.title}</h3>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                         {project.projectUrl ? <a href={project.projectUrl} target="_blank" className="text-xs font-bold text-primary hover:underline flex items-center gap-1"><ExternalLink size={12}/> View Link</a> : <span className="text-xs text-gray-400">No Link</span>}
                         <button onClick={() => deleteProject(project.id)} className="text-red-500 text-xs font-bold hover:text-red-700 flex items-center gap-1 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded">
                            <XCircle size={14} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 sticky top-8">
                <h2 className="text-xl font-bold mb-4">Add Project</h2>
                <form onSubmit={handleAddProject} className="space-y-4">
                  <input 
                    required
                    placeholder="Project Title" 
                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    value={newProjectForm.title}
                    onChange={e => setNewProjectForm({...newProjectForm, title: e.target.value})}
                  />
                  <select
                    required
                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    value={newProjectForm.category}
                    onChange={e => setNewProjectForm({...newProjectForm, category: e.target.value})}
                  >
                      <option value="" disabled>Select Category</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Development">Development</option>
                      <option value="Design">Design</option>
                      <option value="E-Commerce">E-Commerce</option>
                  </select>
                  <input 
                    required
                    placeholder="Image URL" 
                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    value={newProjectForm.imageUrl}
                    onChange={e => setNewProjectForm({...newProjectForm, imageUrl: e.target.value})}
                  />
                  <button 
                    type="button"
                    onClick={() => { setMediaPickerTarget('project'); setIsMediaPickerOpen(true); }}
                    className="text-xs text-primary hover:underline font-bold block mt-1"
                  >
                    Select from Library
                  </button>
                  <input 
                    placeholder="Project Link (Optional)" 
                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    value={newProjectForm.projectUrl}
                    onChange={e => setNewProjectForm({...newProjectForm, projectUrl: e.target.value})}
                  />
                  <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:opacity-90 flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                     <Plus size={18} /> Add Project
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* CASE STUDIES TAB */}
        {activeTab === TABS.CASE_STUDIES && (
          <div className="animate-fadeIn">
            {/* Header / Navigation for Case Studies Tab */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
               <h1 className="text-2xl font-bold">
                  {caseStudyView === CASE_STUDY_VIEWS.LIST && "Manage Case Studies"}
                  {caseStudyView === CASE_STUDY_VIEWS.EDIT && (editingCaseStudy ? 'Edit Case Study' : 'Create New Case Study')}
               </h1>
               <div className="flex gap-3">
                   {caseStudyView !== CASE_STUDY_VIEWS.LIST && (
                        <button onClick={() => setCaseStudyView(CASE_STUDY_VIEWS.LIST)} className="bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition flex items-center gap-2">
                            <ArrowLeft size={16} /> Back to List
                        </button>
                   )}
                   {caseStudyView === CASE_STUDY_VIEWS.LIST && (
                        <button onClick={() => { setCaseStudyForm(initialCaseStudyForm); setEditingCaseStudy(null); setCaseStudyView(CASE_STUDY_VIEWS.EDIT); }} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-secondary transition flex items-center gap-2 shadow-lg shadow-primary/20">
                            <Plus size={16} /> New Case Study
                        </button>
                   )}
               </div>
            </div>

            {/* CASE STUDY VIEW: LIST */}
            {caseStudyView === CASE_STUDY_VIEWS.LIST && (
                <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                    <div className="p-1 min-w-[800px] overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 text-xs uppercase text-gray-500 font-bold tracking-wider">
                                <tr>
                                    <th className="p-4">Title</th>
                                    <th className="p-4">Service</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {caseStudies.length === 0 ? (
                                    <tr><td colSpan={4} className="p-8 text-center text-gray-500">No case studies created yet.</td></tr>
                                ) : (
                                    caseStudies.map(study => {
                                        const service = services.find(s => s.id === study.serviceId);
                                        return (
                                            <tr key={study.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                                <td className="p-4 font-medium max-w-xs truncate">{study.title}</td>
                                                <td className="p-4 text-sm">
                                                    {service ? <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-1 rounded-md text-xs font-bold">{service.title}</span> : <span className="text-gray-400 text-xs italic">Unassigned</span>}
                                                </td>
                                                <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{new Date(study.date).toLocaleDateString()}</td>
                                                <td className="p-4 text-right flex items-center justify-end gap-2">
                                                    <button onClick={() => handleEditCaseStudy(study)} className="text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-2 rounded-lg transition"><Save size={18} /></button>
                                                    <button onClick={() => handleDeleteCaseStudy(study.id)} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition"><XCircle size={18} /></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* CASE STUDY VIEW: EDIT */}
            {caseStudyView === CASE_STUDY_VIEWS.EDIT && (
                <form onSubmit={handleSaveCaseStudy} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-200 dark:border-gray-800 space-y-4">
                            <h2 className="text-lg font-bold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">Content</h2>
                            
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Title</label>
                                <input 
                                    required
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none text-lg font-medium"
                                    placeholder="Case Study Title"
                                    value={caseStudyForm.title}
                                    onChange={e => setCaseStudyForm({...caseStudyForm, title: e.target.value, slug: generateSlug(e.target.value)})}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Slug (URL)</label>
                                <input 
                                    required
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm text-gray-500 font-mono"
                                    value={caseStudyForm.slug}
                                    onChange={e => setCaseStudyForm({...caseStudyForm, slug: generateSlug(e.target.value)})}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Content</label>
                                <RichTextEditor
                                    value={caseStudyForm.content || ''}
                                    onChange={(html) => setCaseStudyForm({...caseStudyForm, content: html})}
                                    placeholder="Describe the problem, solution, and results..."
                                />
                                <p className="text-xs text-gray-400 mt-2">Full HTML editor with formatting, images, and links.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Short Excerpt</label>
                                <textarea 
                                    required
                                    rows={3}
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    placeholder="Brief summary..."
                                    value={caseStudyForm.excerpt}
                                    onChange={e => setCaseStudyForm({...caseStudyForm, excerpt: e.target.value})}
                                />
                            </div>
                        </div>

                        {/* SEO Section */}
                        <div className="bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-200 dark:border-gray-800 space-y-4">
                             <h2 className="text-lg font-bold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 flex items-center gap-2"><Tag size={18} /> SEO Settings</h2>
                             <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Meta Title</label>
                                <input 
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    placeholder="SEO Title"
                                    value={caseStudyForm.metaTitle}
                                    onChange={e => setCaseStudyForm({...caseStudyForm, metaTitle: e.target.value})}
                                />
                             </div>
                             <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Meta Description</label>
                                <textarea 
                                    rows={2}
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    placeholder="SEO Description"
                                    value={caseStudyForm.metaDescription}
                                    onChange={e => setCaseStudyForm({...caseStudyForm, metaDescription: e.target.value})}
                                />
                             </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-200 dark:border-gray-800 space-y-4 sticky top-6">
                             <h2 className="text-lg font-bold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">Settings</h2>
                             
                             <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Service Assignment</label>
                                <select 
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    value={caseStudyForm.serviceId}
                                    onChange={e => setCaseStudyForm({...caseStudyForm, serviceId: e.target.value, subServiceId: ''})}
                                >
                                    <option value="">Select Service</option>
                                    {services.map(s => (
                                        <option key={s.id} value={s.id}>{s.title}</option>
                                    ))}
                                </select>
                             </div>

                             {caseStudyForm.serviceId && (
                                 <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Sub-Service (Optional)</label>
                                    <select 
                                        className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                        value={caseStudyForm.subServiceId}
                                        onChange={e => setCaseStudyForm({...caseStudyForm, subServiceId: e.target.value})}
                                    >
                                        <option value="">Select Sub-Service</option>
                                        {services.find(s => s.id === caseStudyForm.serviceId)?.subServices?.map(sub => (
                                            <option key={sub.id} value={sub.id}>{sub.title}</option>
                                        ))}
                                    </select>
                                 </div>
                             )}

                             <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 flex items-center justify-between">
                                  <span className="flex items-center gap-2"><ImageIcon size={16}/> Featured Image</span>
                                  <button 
                                    type="button"
                                    onClick={() => { setMediaPickerTarget('caseStudy'); setIsMediaPickerOpen(true); }}
                                    className="text-xs text-primary hover:underline font-bold"
                                  >
                                    Select from Library
                                  </button>
                                </label>
                                <input 
                                    required
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm"
                                    value={caseStudyForm.imageUrl}
                                    onChange={e => setCaseStudyForm({...caseStudyForm, imageUrl: e.target.value})}
                                />
                                {caseStudyForm.imageUrl && (
                                    <div className="mt-3 h-32 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100">
                                        <img src={caseStudyForm.imageUrl} className="w-full h-full object-cover" alt="Preview" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                    </div>
                                )}
                             </div>

                             <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Image Alt Text</label>
                                <input
                                  type="text"
                                  className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm"
                                  placeholder="Describe the image for accessibility..."
                                  value={caseStudyForm.imageAltText || ''}
                                  onChange={e => setCaseStudyForm({...caseStudyForm, imageAltText: e.target.value})}
                                />
                                <p className="text-xs text-gray-400 mt-1">Defaults to case study title if left empty.</p>
                             </div>

                             <button 
                                type="submit" 
                                disabled={isSubmittingCaseStudy}
                                className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-secondary transition flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
                            >
                                {isSubmittingCaseStudy ? 'Saving...' : <><Save size={18} /> {editingCaseStudy ? 'Update Case Study' : 'Create Case Study'}</>}
                             </button>
                        </div>
                    </div>
                </form>
            )}
          </div>
        )}

        {/* MEDIA TAB */}
        {activeTab === TABS.MEDIA && (
          <div className="animate-fadeIn">
            <AdminMedia />
          </div>
        )}

        {/* SEO PAGES TAB */}
        {activeTab === TABS.SEO_PAGES && (
          <div className="animate-fadeIn">
            <AdminSeoPages />
          </div>
        )}

        <MediaPicker 
          isOpen={isMediaPickerOpen}
          onClose={() => setIsMediaPickerOpen(false)}
          onSelect={(file: MediaFile) => {
            if (mediaPickerTarget === 'blog') {
              setBlogForm(prev => ({ ...prev, imageUrl: file.data }));
            } else if (mediaPickerTarget === 'project') {
              setNewProjectForm(prev => ({ ...prev, imageUrl: file.data }));
            } else if (mediaPickerTarget === 'caseStudy') {
              setCaseStudyForm(prev => ({ ...prev, imageUrl: file.data }));
            } else if (mediaPickerTarget === 'page') {
              setPageForm(prev => ({ ...prev, imageUrl: file.data }));
            }
          }}
        />
      </main>
    </div>
  );
};
