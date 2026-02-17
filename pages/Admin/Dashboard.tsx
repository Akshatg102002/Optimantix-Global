
import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, FileText, Settings, LogOut, CheckCircle, XCircle, Briefcase, Plus, ArrowLeft, Tag, Image as ImageIcon, Save } from 'lucide-react';
import { Icon } from '../../components/Icon';
import { BlogPost, BlogCategory } from '../../types';

// Tabs
const TABS = {
  LEADS: 'LEADS',
  SERVICES: 'SERVICES',
  BLOG: 'BLOG',
  PORTFOLIO: 'PORTFOLIO'
};

const BLOG_VIEWS = {
  LIST: 'LIST',
  EDIT: 'EDIT',
  CATEGORIES: 'CATEGORIES'
};

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(TABS.LEADS);
  const [blogView, setBlogView] = useState(BLOG_VIEWS.LIST);

  const { 
    leads, services, blogs, blogCategories, projects, 
    updateLeadStatus, updateService, 
    addBlogPost, deleteBlogPost, 
    addBlogCategory, deleteBlogCategory,
    addProject, deleteProject, 
    isAuthenticated, logout 
  } = useData();

  const navigate = useNavigate();

  // Service Edit Form
  const [editingService, setEditingService] = useState<string | null>(null);
  const [editServiceForm, setEditServiceForm] = useState<any>({ title: '', shortDescription: '' });

  // Blog Form
  const initialBlogForm: Partial<BlogPost> = { 
    title: '', slug: '', excerpt: '', content: '', author: '', 
    imageUrl: 'https://images.unsplash.com/photo-1499750310159-52f0f835497a?auto=format&fit=crop&q=80&w=800',
    categoryId: '', metaTitle: '', metaDescription: '', isPublished: true 
  };
  const [blogForm, setBlogForm] = useState<Partial<BlogPost>>(initialBlogForm);
  const [isSubmittingBlog, setIsSubmittingBlog] = useState(false);

  // Category Form
  const [newCategoryName, setNewCategoryName] = useState('');

  // Project Form
  const [newProjectForm, setNewProjectForm] = useState({ title: '', category: '', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800', projectUrl: '' });

  useEffect(() => {
    if (!isAuthenticated) {
        navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // --- Lead Handlers ---
  const handleStatusUpdate = (id: string, status: 'Contacted' | 'Closed') => {
    updateLeadStatus(id, status);
  };

  // --- Service Handlers ---
  const handleEditService = (service: any) => {
    setEditingService(service.id);
    setEditServiceForm(service);
  };

  const saveService = () => {
    updateService(editServiceForm);
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
    } catch (error) {
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
    } catch (error) {
        alert("Failed to create category");
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

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-dark font-sans text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-card border-r border-gray-200 dark:border-gray-800 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">
            <LayoutDashboard />
            <span>Admin Panel</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab(TABS.LEADS)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === TABS.LEADS ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
            <MessageSquare size={20} /> Leads
          </button>
          <button onClick={() => setActiveTab(TABS.SERVICES)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === TABS.SERVICES ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
            <Settings size={20} /> Services
          </button>
          <button onClick={() => { setActiveTab(TABS.BLOG); setBlogView(BLOG_VIEWS.LIST); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === TABS.BLOG ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
            <FileText size={20} /> Blog
          </button>
          <button onClick={() => setActiveTab(TABS.PORTFOLIO)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === TABS.PORTFOLIO ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
            <Briefcase size={20} /> Portfolio
          </button>
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
          <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-primary transition p-2">
             Back to Site
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-700 transition w-full p-2">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50 dark:bg-dark">
        <div className="md:hidden flex justify-between items-center mb-6 bg-white dark:bg-dark-card p-4 rounded-lg shadow-sm">
           <span className="font-bold text-lg">Admin Panel</span>
           <button onClick={handleLogout} className="text-red-500"><LogOut size={20}/></button>
        </div>
        
        {/* LEADS TAB */}
        {activeTab === TABS.LEADS && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Lead Management</h1>
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-x-auto">
              <table className="w-full text-left min-w-[800px]">
                <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-gray-500 text-sm uppercase">
                  <tr>
                    <th className="p-4 font-semibold">Date</th>
                    <th className="p-4 font-semibold">Name</th>
                    <th className="p-4 font-semibold">Contact</th>
                    <th className="p-4 font-semibold">Details</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {leads.length === 0 ? (
                    <tr><td colSpan={6} className="p-8 text-center text-gray-500">No leads found yet.</td></tr>
                  ) : (
                    leads.map(lead => (
                      <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{new Date(lead.date).toLocaleDateString()}</td>
                        <td className="p-4 font-medium">
                            {lead.name}
                            {lead.company && <div className="text-xs text-gray-500">{lead.company}</div>}
                        </td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          <div>{lead.email}</div>
                          <div className="text-xs opacity-75">{lead.phone}</div>
                        </td>
                        <td className="p-4 text-sm max-w-xs truncate" title={lead.message}>
                            <div className="font-medium text-primary">{lead.serviceInterest}</div>
                            <div className="text-gray-500 text-xs truncate">{lead.message}</div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            lead.status === 'New' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                            lead.status === 'Contacted' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="p-4 flex gap-2">
                          {lead.status !== 'Closed' && (
                            <>
                              <button onClick={() => handleStatusUpdate(lead.id, 'Contacted')} title="Mark Contacted" className="text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 p-1 rounded"><CheckCircle size={18} /></button>
                              <button onClick={() => handleStatusUpdate(lead.id, 'Closed')} title="Mark Closed" className="text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 p-1 rounded"><CheckCircle size={18} /></button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SERVICES TAB */}
        {activeTab === TABS.SERVICES && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Service Manager</h1>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {services.map(service => (
                <div key={service.id} className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                  {editingService === service.id ? (
                    <div className="space-y-4">
                      <input 
                        className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-700" 
                        value={editServiceForm.title} 
                        onChange={e => setEditServiceForm({...editServiceForm, title: e.target.value})}
                        placeholder="Service Title"
                      />
                      <textarea 
                        className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-700" 
                        rows={3}
                        value={editServiceForm.shortDescription} 
                        onChange={e => setEditServiceForm({...editServiceForm, shortDescription: e.target.value})}
                        placeholder="Short Description"
                      />
                      <div className="flex gap-2">
                        <button onClick={saveService} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
                        <button onClick={() => setEditingService(null)} className="bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-indigo-50 dark:bg-slate-700 p-2 rounded text-primary">
                            <Icon name={service.iconName} size={24} />
                          </div>
                          <h3 className="font-bold text-lg">{service.title}</h3>
                        </div>
                        <button onClick={() => handleEditService(service)} className="text-blue-600 dark:text-blue-400 text-sm hover:underline">Edit</button>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{service.shortDescription}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BLOG TAB */}
        {activeTab === TABS.BLOG && (
          <div>
            {/* Header / Navigation for Blog Tab */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
               <h1 className="text-2xl font-bold">
                  {blogView === BLOG_VIEWS.LIST && "Manage Blogs"}
                  {blogView === BLOG_VIEWS.EDIT && "Create New Blog"}
                  {blogView === BLOG_VIEWS.CATEGORIES && "Blog Categories"}
               </h1>
               <div className="flex gap-3">
                   {blogView !== BLOG_VIEWS.LIST && (
                        <button onClick={() => setBlogView(BLOG_VIEWS.LIST)} className="bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded text-sm font-medium hover:bg-gray-300 transition flex items-center gap-2">
                            <ArrowLeft size={16} /> Back to List
                        </button>
                   )}
                   {blogView === BLOG_VIEWS.LIST && (
                       <>
                        <button onClick={() => setBlogView(BLOG_VIEWS.CATEGORIES)} className="bg-white dark:bg-dark-card border border-gray-300 dark:border-gray-700 px-4 py-2 rounded text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                            Manage Categories
                        </button>
                        <button onClick={() => setBlogView(BLOG_VIEWS.EDIT)} className="bg-primary text-white px-4 py-2 rounded text-sm font-medium hover:bg-secondary transition flex items-center gap-2">
                            <Plus size={16} /> New Blog
                        </button>
                       </>
                   )}
               </div>
            </div>

            {/* BLOG VIEW: LIST */}
            {blogView === BLOG_VIEWS.LIST && (
                <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                    <div className="p-1 min-w-[800px] overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-xs uppercase text-gray-500">
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
                                            <tr key={blog.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                                <td className="p-4 font-medium max-w-xs truncate">{blog.title}</td>
                                                <td className="p-4 text-sm">
                                                    {cat ? <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-bold">{cat.name}</span> : <span className="text-gray-400 italic">Uncategorized</span>}
                                                </td>
                                                <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{blog.author}</td>
                                                <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{new Date(blog.date).toLocaleDateString()}</td>
                                                <td className="p-4 text-right">
                                                    <button onClick={() => deleteBlogPost(blog.id)} className="text-red-500 hover:bg-red-50 p-2 rounded transition"><XCircle size={18} /></button>
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
                                className="flex-1 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded focus:ring-2 focus:ring-primary outline-none"
                                placeholder="Category Name"
                                value={newCategoryName}
                                onChange={e => setNewCategoryName(e.target.value)}
                            />
                            <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary">Add</button>
                        </form>
                    </div>
                    <div className="bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                        <h2 className="text-lg font-bold mb-4">Existing Categories</h2>
                        <ul className="space-y-2">
                            {blogCategories.length === 0 && <li className="text-gray-500 italic">No categories created.</li>}
                            {blogCategories.map(cat => (
                                <li key={cat.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded">
                                    <span>{cat.name}</span>
                                    <button onClick={() => deleteBlogCategory(cat.id)} className="text-red-500 text-sm hover:underline">Delete</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* BLOG VIEW: EDIT (NEW BLOG) */}
            {blogView === BLOG_VIEWS.EDIT && (
                <form onSubmit={handlePublishBlog} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-200 dark:border-gray-800 space-y-4">
                            <h2 className="text-lg font-bold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">Content</h2>
                            
                            <div>
                                <label className="block text-sm font-medium mb-1">Blog Title</label>
                                <input 
                                    required
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded focus:ring-2 focus:ring-primary outline-none text-lg"
                                    placeholder="Enter blog title..."
                                    value={blogForm.title}
                                    onChange={e => setBlogForm({...blogForm, title: e.target.value, slug: generateSlug(e.target.value)})}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Slug (URL)</label>
                                <input 
                                    required
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded focus:ring-2 focus:ring-primary outline-none text-sm text-gray-500"
                                    value={blogForm.slug}
                                    onChange={e => setBlogForm({...blogForm, slug: generateSlug(e.target.value)})}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Blog Content</label>
                                <textarea 
                                    required
                                    rows={12}
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded focus:ring-2 focus:ring-primary outline-none"
                                    placeholder="Write your article content here..."
                                    value={blogForm.content}
                                    onChange={e => setBlogForm({...blogForm, content: e.target.value})}
                                />
                                <p className="text-xs text-gray-400 mt-1">Basic text formatting. New lines create paragraphs.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Short Excerpt</label>
                                <textarea 
                                    required
                                    rows={3}
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded focus:ring-2 focus:ring-primary outline-none"
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
                                <label className="block text-sm font-medium mb-1">Meta Title</label>
                                <input 
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded focus:ring-2 focus:ring-primary outline-none"
                                    placeholder="SEO Title (defaults to blog title)"
                                    value={blogForm.metaTitle}
                                    onChange={e => setBlogForm({...blogForm, metaTitle: e.target.value})}
                                />
                             </div>
                             <div>
                                <label className="block text-sm font-medium mb-1">Meta Description</label>
                                <textarea 
                                    rows={2}
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded focus:ring-2 focus:ring-primary outline-none"
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
                                <label className="block text-sm font-medium mb-1">Author</label>
                                <input 
                                    required
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded focus:ring-2 focus:ring-primary outline-none"
                                    value={blogForm.author}
                                    onChange={e => setBlogForm({...blogForm, author: e.target.value})}
                                />
                             </div>

                             <div>
                                <label className="block text-sm font-medium mb-1">Category</label>
                                <select 
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded focus:ring-2 focus:ring-primary outline-none"
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
                                <label className="block text-sm font-medium mb-1 flex items-center gap-2"><ImageIcon size={16}/> Featured Image URL</label>
                                <input 
                                    required
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded focus:ring-2 focus:ring-primary outline-none text-sm"
                                    value={blogForm.imageUrl}
                                    onChange={e => setBlogForm({...blogForm, imageUrl: e.target.value})}
                                />
                                {blogForm.imageUrl && (
                                    <div className="mt-2 h-32 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                                        <img src={blogForm.imageUrl} className="w-full h-full object-cover" alt="Preview" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                    </div>
                                )}
                             </div>

                             <button 
                                type="submit" 
                                disabled={isSubmittingBlog}
                                className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-secondary transition flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isSubmittingBlog ? "Publishing..." : <><Save size={18} /> Publish Blog</>}
                             </button>
                        </div>
                    </div>
                </form>
            )}
          </div>
        )}

        {/* PORTFOLIO TAB */}
        {activeTab === TABS.PORTFOLIO && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-2xl font-bold mb-6">Portfolio Items</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map(project => (
                  <div key={project.id} className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                    <div className="h-40 overflow-hidden">
                        <img src={project.imageUrl} className="w-full h-full object-cover" alt={project.title} />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold">{project.title}</h3>
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{project.category}</span>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                         {project.projectUrl ? <a href={project.projectUrl} target="_blank" className="text-sm text-blue-500 hover:underline">View Link</a> : <span className="text-sm text-gray-400">No Link</span>}
                         <button onClick={() => deleteProject(project.id)} className="text-red-500 text-sm hover:text-red-700 flex items-center gap-1">
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
                <form onSubmit={handleAddProject} className="space-y-3">
                  <input 
                    required
                    placeholder="Project Title" 
                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded focus:ring-2 focus:ring-primary outline-none"
                    value={newProjectForm.title}
                    onChange={e => setNewProjectForm({...newProjectForm, title: e.target.value})}
                  />
                  <select
                    required
                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded focus:ring-2 focus:ring-primary outline-none"
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
                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded focus:ring-2 focus:ring-primary outline-none"
                    value={newProjectForm.imageUrl}
                    onChange={e => setNewProjectForm({...newProjectForm, imageUrl: e.target.value})}
                  />
                  <input 
                    placeholder="Project Link (Optional)" 
                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded focus:ring-2 focus:ring-primary outline-none"
                    value={newProjectForm.projectUrl}
                    onChange={e => setNewProjectForm({...newProjectForm, projectUrl: e.target.value})}
                  />
                  <button type="submit" className="w-full bg-primary text-white py-2 rounded hover:opacity-90 flex items-center justify-center gap-2">
                     <Plus size={16} /> Add Project
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
