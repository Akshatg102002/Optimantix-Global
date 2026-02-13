import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, FileText, Settings, LogOut, CheckCircle, XCircle } from 'lucide-react';
import { Icon } from '../../components/Icon';

// Tabs
const TABS = {
  LEADS: 'LEADS',
  SERVICES: 'SERVICES',
  BLOG: 'BLOG'
};

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(TABS.LEADS);
  const { leads, services, blogs, updateLeadStatus, updateService, addBlogPost, deleteBlogPost, isAuthenticated, logout } = useData();
  const navigate = useNavigate();

  // Simple state for forms (Service Edit & Blog Add)
  const [editingService, setEditingService] = useState<string | null>(null);
  const [editServiceForm, setEditServiceForm] = useState<any>({ title: '', shortDescription: '', pricing: '' });
  const [newBlogForm, setNewBlogForm] = useState({ title: '', slug: '', excerpt: '', content: '', author: '', imageUrl: 'https://picsum.photos/800/400' });

  useEffect(() => {
    if (!isAuthenticated) {
        navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleStatusUpdate = (id: string, status: 'Contacted' | 'Closed') => {
    updateLeadStatus(id, status);
  };

  const handleEditService = (service: any) => {
    setEditingService(service.id);
    setEditServiceForm(service);
  };

  const saveService = () => {
    updateService(editServiceForm);
    setEditingService(null);
  };

  const handlePublishBlog = (e: React.FormEvent) => {
    e.preventDefault();
    addBlogPost({
      ...newBlogForm,
      date: new Date().toISOString()
    });
    setNewBlogForm({ title: '', slug: '', excerpt: '', content: '', author: '', imageUrl: 'https://picsum.photos/800/400' });
    alert("Blog Posted!");
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
          <button onClick={() => setActiveTab(TABS.BLOG)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === TABS.BLOG ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
            <FileText size={20} /> Blog
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
                    <th className="p-4 font-semibold">Interest</th>
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
                        <td className="p-4 font-medium">{lead.name}</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          <div>{lead.email}</div>
                          <div className="text-xs opacity-75">{lead.phone}</div>
                        </td>
                        <td className="p-4 text-sm">{lead.serviceInterest}</td>
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
                      <input 
                        className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-700" 
                        value={editServiceForm.pricing} 
                        onChange={e => setEditServiceForm({...editServiceForm, pricing: e.target.value})}
                        placeholder="Pricing"
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
                      <div className="text-sm font-semibold">Pricing: {service.pricing}</div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BLOG TAB */}
        {activeTab === TABS.BLOG && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-2xl font-bold mb-6">Published Posts</h1>
              <div className="space-y-4">
                {blogs.map(blog => (
                  <div key={blog.id} className="bg-white dark:bg-dark-card p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 flex gap-4">
                    <img src={blog.imageUrl} className="w-24 h-24 object-cover rounded-lg" alt={blog.title} />
                    <div className="flex-1">
                      <h3 className="font-bold">{blog.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{new Date(blog.date).toLocaleDateString()} by {blog.author}</p>
                      <button onClick={() => deleteBlogPost(blog.id)} className="text-red-500 text-sm hover:text-red-700 flex items-center gap-1">
                        <XCircle size={14} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 sticky top-8">
                <h2 className="text-xl font-bold mb-4">Write New Post</h2>
                <form onSubmit={handlePublishBlog} className="space-y-3">
                  <input 
                    required
                    placeholder="Title" 
                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded focus:ring-2 focus:ring-primary outline-none"
                    value={newBlogForm.title}
                    onChange={e => setNewBlogForm({...newBlogForm, title: e.target.value})}
                  />
                  <input 
                    required
                    placeholder="Author" 
                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded focus:ring-2 focus:ring-primary outline-none"
                    value={newBlogForm.author}
                    onChange={e => setNewBlogForm({...newBlogForm, author: e.target.value})}
                  />
                  <textarea 
                    required
                    placeholder="Excerpt" 
                    rows={2}
                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded focus:ring-2 focus:ring-primary outline-none"
                    value={newBlogForm.excerpt}
                    onChange={e => setNewBlogForm({...newBlogForm, excerpt: e.target.value})}
                  />
                  <textarea 
                    required
                    placeholder="Content" 
                    rows={6}
                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded focus:ring-2 focus:ring-primary outline-none"
                    value={newBlogForm.content}
                    onChange={e => setNewBlogForm({...newBlogForm, content: e.target.value})}
                  />
                  <button type="submit" className="w-full bg-primary text-white py-2 rounded hover:opacity-90">Publish</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};