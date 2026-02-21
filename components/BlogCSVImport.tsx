import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import { Upload, FileText, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import { BlogPost } from '../types';

export const BlogCSVImport: React.FC = () => {
  const { addBlogPost } = useData();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{ success: boolean; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setUploadStatus({ success: false, message: 'Please upload a valid CSV file.' });
      return;
    }

    setIsUploading(true);
    setUploadStatus(null);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const posts = results.data as any[];
          let successCount = 0;
          let errorCount = 0;

          for (const post of posts) {
            // Basic validation
            if (!post.title || !post.content || !post.slug) {
              errorCount++;
              continue;
            }

            // Construct Blog Post Object
            const newPost: Omit<BlogPost, 'id'> = {
              title: post.title,
              slug: post.slug,
              excerpt: post.excerpt || post.content.substring(0, 150) + '...',
              content: post.content,
              author: post.author || 'Admin',
              date: post.date || new Date().toISOString().split('T')[0],
              imageUrl: post.imageUrl || 'https://images.unsplash.com/photo-1499750310159-5b5f22132042?auto=format&fit=crop&q=80&w=800', // Default image
              // categoryId: post.category || 'General' // Removed as it requires ID lookup
            };

            await addBlogPost(newPost);
            successCount++;
          }

          setUploadStatus({ 
            success: true, 
            message: `Successfully imported ${successCount} blogs. ${errorCount > 0 ? `Failed to import ${errorCount} rows due to missing data.` : ''}` 
          });
          
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }

        } catch (error) {
          console.error("Import error:", error);
          setUploadStatus({ success: false, message: 'An error occurred during import.' });
        } finally {
          setIsUploading(false);
        }
      },
      error: (error) => {
        console.error("CSV Parse error:", error);
        setUploadStatus({ success: false, message: 'Failed to parse CSV file.' });
        setIsUploading(false);
      }
    });
  };

  return (
    <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 mb-8">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <FileText className="text-primary" size={20} />
        Import Blogs via CSV
      </h3>
      
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <label className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
          <input 
            type="file" 
            accept=".csv" 
            onChange={handleFileUpload} 
            className="hidden" 
            ref={fileInputRef}
            disabled={isUploading}
          />
          {isUploading ? (
             <Loader2 className="w-5 h-5 mr-2 text-gray-500 animate-spin" />
          ) : (
             <Upload className="w-5 h-5 mr-2 text-gray-500 group-hover:text-primary transition-colors" />
          )}
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
            {isUploading ? 'Importing...' : 'Select CSV File'}
          </span>
        </label>

        <div className="text-xs text-gray-500 dark:text-gray-400">
          <p className="font-semibold mb-1">Required CSV Columns:</p>
          <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-primary">
            title, slug, content
          </code>
          <p className="mt-1">Optional: excerpt, author, date, imageUrl, category</p>
        </div>
      </div>

      {uploadStatus && (
        <div className={`mt-4 p-3 rounded-lg flex items-start gap-2 text-sm ${uploadStatus.success ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {uploadStatus.success ? <CheckCircle size={16} className="mt-0.5 shrink-0" /> : <AlertCircle size={16} className="mt-0.5 shrink-0" />}
          <span>{uploadStatus.message}</span>
        </div>
      )}
    </div>
  );
};
