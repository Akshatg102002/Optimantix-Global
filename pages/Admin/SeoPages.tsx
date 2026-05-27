import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { PageSEO } from '../../types';
import { Check, Edit, X, Trash2 } from 'lucide-react';
import { SeoCSVImport } from '../../components/SeoCSVImport';

export const AdminSeoPages: React.FC = () => {
  const { seoPages, updateSeoPage, deleteSeoPage } = useData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formState, setFormState] = useState<Partial<PageSEO>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Common pages we might want to ensure are always listed
  const defaultPaths = ['/', '/about', '/services', '/blog', '/case-studies', '/contact', '/free-seo-audit'];
  
  // Merge seoPages with defaultPaths to ensure basic routes show up even if unspoken
  let displayPages = [...seoPages];
  defaultPaths.forEach(path => {
    if (!displayPages.find(p => p.path === path && p.id === path)) {
      displayPages.push({
        id: path,
        path: path,
        metaTitle: '',
        metaDescription: '',
        keywords: '',
        canonicalUrl: '',
        ogTitle: '',
        ogDescription: '',
        ogImage: '',
      });
    }
  });

  // Sort logically (default paths first, then alphabetical)
  displayPages.sort((a, b) => {
      const aIsDefault = defaultPaths.includes(a.path);
      const bIsDefault = defaultPaths.includes(b.path);
      if (aIsDefault && !bIsDefault) return -1;
      if (!aIsDefault && bIsDefault) return 1;
      return a.path.localeCompare(b.path);
  });

  // Inject the newly requested path if making a new one and it doesn't exist
  if (editingId && !displayPages.find(p => p.id === editingId)) {
      displayPages = [formState as PageSEO, ...displayPages];
  }

  const handleEdit = (page: PageSEO) => {
    setEditingId(page.id);
    setFormState(page);
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormState({});
  };

  const handleSave = async () => {
    if (!formState.path || !formState.metaTitle || !formState.metaDescription) {
      alert('Path, Meta Title, and Meta Description are required.');
      return;
    }

    if (!formState.path.startsWith('/')) {
        alert('Path must start with a forward slash (/). E.g. /my-path');
        return;
    }

    setIsSaving(true);
    try {
      await updateSeoPage(formState as PageSEO);
      setEditingId(null);
    } catch (e) {
      alert('Error saving SEO route.');
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
      if (defaultPaths.includes(id)) {
          alert('You cannot fully delete core predefined routes, but you can clear their SEO text.');
          return;
      }

      if (window.confirm(`Are you sure you want to permanently delete the SEO data for ${id}?`)) {
          setIsDeleting(id);
          try {
              await deleteSeoPage(id);
          } catch(e) {
              alert('Error deleting route.');
              console.error(e);
          } finally {
              setIsDeleting(null);
          }
      }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <SeoCSVImport />
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">SEO Management</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage title tags and meta descriptions globally.</p>
        </div>
        <button
          onClick={() => {
            let newPath = prompt('Enter the exact URL path to override (e.g., /services/digital-marketing):');
            if (newPath) {
              newPath = newPath.trim().toLowerCase();
              if (!newPath.startsWith('/')) {
                  newPath = '/' + newPath;
              }
              // check if exists
              if (displayPages.find(p => p.path === newPath)) {
                  alert("That route already exists in the list. Please edit it instead.");
                  const existing = displayPages.find(p => p.path === newPath)!;
                  setEditingId(existing.id);
                  setFormState(existing);
                  return;
              }

              setEditingId(newPath);
              setFormState({ id: newPath, path: newPath, metaTitle: '', metaDescription: '' });
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
              <tr key={page.id} className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 transition ${isDeleting === page.id ? 'opacity-50' : ''}`}>
                {editingId === page.id ? (
                  <td colSpan={4} className="p-4">
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold">Edit SEO for {formState.path}</h3>
                        <div className="flex gap-2">
                          <button onClick={handleCancel} disabled={isSaving} className="p-2 text-gray-500 hover:text-red-500 rounded disabled:opacity-50"><X size={18}/></button>
                          <button onClick={handleSave} disabled={isSaving} className="p-2 bg-primary text-white rounded hover:bg-primary/90 flex items-center gap-1 disabled:opacity-50">
                              {isSaving ? <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"/> : <Check size={18}/>} Save
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-gray-500">Path (Route) <span className="text-red-500">*</span></label>
                          <input type="text" name="path" value={formState.path || ''} onChange={handleChange} className="w-full p-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded text-sm disabled:opacity-50 cursor-not-allowed" disabled={true} />
                          <p className="text-[10px] text-gray-400">Path cannot be changed after creation. Delete and recreate if needed.</p>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-gray-500">Canonical URL</label>
                          <input type="text" name="canonicalUrl" value={formState.canonicalUrl || ''} onChange={handleChange} className="w-full p-2 bg-white dark:bg-dark border border-gray-300 dark:border-gray-700 rounded text-sm" placeholder="https://optimantix.com/..." />
                        </div>
                        <div className="space-y-1 md:col-span-2">
                          <label className="text-xs font-semibold text-gray-500">Meta Title <span className="text-red-500">*</span></label>
                          <input type="text" name="metaTitle" value={formState.metaTitle || ''} onChange={handleChange} className="w-full p-2 bg-white dark:bg-dark border border-gray-300 dark:border-gray-700 rounded text-sm" placeholder="Max 60 characters recommended" autoFocus />
                        </div>
                        <div className="space-y-1 md:col-span-2">
                          <label className="text-xs font-semibold text-gray-500">Meta Description <span className="text-red-500">*</span></label>
                          <textarea name="metaDescription" value={formState.metaDescription || ''} onChange={handleChange} rows={2} className="w-full p-2 bg-white dark:bg-dark border border-gray-300 dark:border-gray-700 rounded text-sm" placeholder="Max 155 characters recommended" />
                        </div>
                        <div className="space-y-1 md:col-span-2">
                          <label className="text-xs font-semibold text-gray-500">Keywords</label>
                          <input type="text" name="keywords" value={formState.keywords || ''} onChange={handleChange} className="w-full p-2 bg-white dark:bg-dark border border-gray-300 dark:border-gray-700 rounded text-sm" placeholder="Comma separated SEO keywords" />
                        </div>
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 md:col-span-2">
                           <h4 className="text-sm font-semibold mb-3">Open Graph Data</h4>
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
                      <div className="flex gap-2">
                          <button 
                            onClick={() => handleEdit(page)}
                            className="text-gray-500 hover:text-primary transition p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          {!defaultPaths.includes(page.id) && (
                            <button
                               onClick={() => handleDelete(page.id)}
                               disabled={isDeleting === page.id}
                               className="text-gray-500 hover:text-red-500 transition p-2 bg-gray-100 dark:bg-gray-800 hover:bg-red-500/10 rounded-lg disabled:opacity-50"
                               title="Delete"
                            >
                                <Trash2 size={16} />
                            </button>
                          )}
                      </div>
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
};;
