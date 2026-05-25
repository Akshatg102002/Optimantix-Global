import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { PageSEO } from '../../types';
import { Check, Edit, X } from 'lucide-react';

export const AdminSeoPages: React.FC = () => {
  const { seoPages, updateSeoPage } = useData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formState, setFormState] = useState<Partial<PageSEO>>({});

  // Common pages we might want to ensure are always listed
  const defaultPaths = ['/', '/about', '/services', '/blog', '/case-studies', '/contact', '/free-seo-audit'];
  
  // Merge seoPages with defaultPaths to ensure basic routes show up even if unspoken
  const displayPages = [...seoPages];
  defaultPaths.forEach(path => {
    if (!displayPages.find(p => p.path === path && p.id === path)) {
      displayPages.push({
        id: path,
        path: path,
        metaTitle: '',
        metaDescription: '',
      });
    }
  });

  const handleEdit = (page: PageSEO) => {
    setEditingId(page.id);
    setFormState(page);
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormState({});
  };

  const handleSave = async () => {
    if (!formState.id || !formState.path || !formState.metaTitle || !formState.metaDescription) {
      alert('Path, Meta Title, and Meta Description are required.');
      return;
    }
    await updateSeoPage(formState as PageSEO);
    setEditingId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">SEO Management</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage title tags and meta descriptions globally.</p>
        </div>
        <button
          onClick={() => {
            const newId = prompt('Enter the exact URL path (e.g., /services/digital-marketing):');
            if (newId) {
              setEditingId(newId);
              setFormState({ id: newId, path: newId, metaTitle: '', metaDescription: '' });
            }
          }}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 text-sm font-semibold"
        >
          + Add Custom Route
        </button>
      </div>

      <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
              <th className="p-4 font-semibold text-sm">Path</th>
              <th className="p-4 font-semibold text-sm">Meta Title</th>
              <th className="p-4 font-semibold text-sm hidden md:table-cell">Meta Description</th>
              <th className="p-4 font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {displayPages.map((page) => (
              <tr key={page.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                {editingId === page.id ? (
                  <td colSpan={4} className="p-4">
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold">Edit SEO for {formState.path}</h3>
                        <div className="flex gap-2">
                          <button onClick={handleCancel} className="p-2 text-gray-500 hover:text-red-500 rounded"><X size={18}/></button>
                          <button onClick={handleSave} className="p-2 bg-primary text-white rounded hover:bg-primary/90 flex items-center gap-1"><Check size={18}/> Save</button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-gray-500">Path (Route)</label>
                          <input type="text" name="path" value={formState.path || ''} readOnly className="w-full p-2 bg-gray-200 dark:bg-gray-800 border-none rounded text-sm text-gray-500" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-gray-500">Meta Title <span className="text-red-500">*</span></label>
                          <input type="text" name="metaTitle" value={formState.metaTitle || ''} onChange={handleChange} className="w-full p-2 bg-white dark:bg-dark border border-gray-300 dark:border-gray-700 rounded text-sm" placeholder="Max 60 characters recommended" autoFocus />
                        </div>
                        <div className="space-y-1 md:col-span-2">
                          <label className="text-xs font-semibold text-gray-500">Meta Description <span className="text-red-500">*</span></label>
                          <textarea name="metaDescription" value={formState.metaDescription || ''} onChange={handleChange} rows={2} className="w-full p-2 bg-white dark:bg-dark border border-gray-300 dark:border-gray-700 rounded text-sm" placeholder="Max 155 characters recommended" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-gray-500">Open Graph Title</label>
                          <input type="text" name="ogTitle" value={formState.ogTitle || ''} onChange={handleChange} className="w-full p-2 bg-white dark:bg-dark border border-gray-300 dark:border-gray-700 rounded text-sm" placeholder="Defaults to Meta Title" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-gray-500">Open Graph Image URL</label>
                          <input type="text" name="ogImage" value={formState.ogImage || ''} onChange={handleChange} className="w-full p-2 bg-white dark:bg-dark border border-gray-300 dark:border-gray-700 rounded text-sm" placeholder="https://..." />
                        </div>
                        <div className="space-y-1 md:col-span-2">
                          <label className="text-xs font-semibold text-gray-500">Open Graph Description</label>
                          <textarea name="ogDescription" value={formState.ogDescription || ''} onChange={handleChange} rows={2} className="w-full p-2 bg-white dark:bg-dark border border-gray-300 dark:border-gray-700 rounded text-sm" placeholder="Defaults to Meta Description" />
                        </div>
                      </div>
                    </div>
                  </td>
                ) : (
                  <>
                    <td className="p-4">
                      <span className="font-mono text-xs text-primary bg-primary/10 px-2 py-1 rounded truncate block max-w-[150px]">
                        {page.path}
                      </span>
                    </td>
                    <td className="p-4 text-sm font-medium">
                      {page.metaTitle || <span className="text-gray-400 italic">Not set</span>}
                    </td>
                    <td className="p-4 text-sm text-gray-500 dark:text-gray-400 hidden md:table-cell max-w-[300px] truncate">
                      {page.metaDescription || <span className="text-gray-400 italic">Not set</span>}
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => handleEdit(page)}
                        className="text-gray-500 hover:text-primary transition p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <Edit size={16} />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
