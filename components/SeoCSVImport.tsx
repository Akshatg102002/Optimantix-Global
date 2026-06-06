import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import { Upload, FileText, AlertCircle, Loader2, Download } from 'lucide-react';
import { useData } from '../context/DataContext';
import { PageSEO } from '../types';

interface ImportProgress {
  total: number;
  completed: number;
  failed: number;
  errors: string[];
}

export const SeoCSVImport: React.FC = () => {
  const { updateSeoPage } = useData();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState<ImportProgress | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const downloadTemplate = () => {
    const templatePath = [
      'path,metaTitle,metaDescription,keywords,canonicalUrl,ogTitle,ogDescription,ogImage',
      '/,Optimantix Global - Home,Welcome to Optimantix Global,digital marketing, seo, agency,https://optimantix.com/,,,',
      '/about,About Us | Optimantix,Learn about our team and mission,,https://optimantix.com/about,,,',
    ].join('\n');
    
    const blob = new Blob([templatePath], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'seo_routes_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      alert('Please upload a valid CSV file.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setIsUploading(true);
    setProgress({ total: 0, completed: 0, failed: 0, errors: [] });

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const rows = results.data as Record<string, string>[];
          const errors: string[] = [];
          setProgress(prev => prev ? { ...prev, total: rows.length } : null);

          for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const rowNum = i + 2; // +1 for 0-index, +1 for header

            let path = row.path?.trim();
            if (!path) {
              errors.push(`Row ${rowNum}: Missing 'path'`);
              setProgress(p => p ? { ...p, failed: p.failed + 1, errors } : p);
              continue;
            }

            if (!path.startsWith('/')) {
              path = '/' + path;
            }

            const metaTitle = row.metaTitle?.trim() || '';
            const metaDescription = row.metaDescription?.trim() || '';
            
            if (!metaTitle && !metaDescription) {
               errors.push(`Row ${rowNum} (${path}): Both Title and Description are empty`);
               setProgress(p => p ? { ...p, failed: p.failed + 1, errors } : p);
               continue; // You want at least something to be set for an import
            }

            const seoData: PageSEO = {
              id: path,
              path: path,
              metaTitle: metaTitle,
              metaDescription: metaDescription,
              keywords: row.keywords?.trim() || '',
              canonicalUrl: row.canonicalUrl?.trim() || '',
              ogTitle: row.ogTitle?.trim() || '',
              ogDescription: row.ogDescription?.trim() || '',
              ogImage: row.ogImage?.trim() || '',
            };

            try {
              await updateSeoPage(seoData);
              setProgress(p => p ? { ...p, completed: p.completed + 1 } : p);
            } catch {
              errors.push(`Row ${rowNum} (${path}): Failed to save to database`);
              setProgress(p => p ? { ...p, failed: p.failed + 1, errors } : p);
            }
          }

        } catch (error) {
          console.error("Import error:", error);
          alert('An error occurred during processing.');
        } finally {
          setIsUploading(false);
          if (fileInputRef.current) fileInputRef.current.value = '';
        }
      },
      error: (error) => {
        console.error("CSV Parse error:", error);
        alert('Failed to parse CSV file. Ensure it is correctly formatted.');
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    });
  };

  const downloadErrors = () => {
    if (!progress || progress.errors.length === 0) return;
    const blob = new Blob([progress.errors.join('\n')], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'seo_import_errors.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <FileText className="text-primary" size={20} />
          Bulk SEO Import via CSV
        </h3>
        <button 
          onClick={downloadTemplate}
          className="text-sm flex items-center gap-2 text-primary hover:underline font-medium"
        >
          <Download size={16} /> Download Template
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-6">
        Upload a CSV file to bulk import or update SEO configurations for your routes. Ensure headers match the provided template.
      </p>
      
      <div className="flex flex-col md:flex-row items-center gap-6">
        <label className="flex flex-col items-center justify-center w-full md:w-auto px-8 py-10 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
          <input 
            type="file" 
            accept=".csv" 
            onChange={handleFileUpload} 
            className="hidden" 
            ref={fileInputRef}
            disabled={isUploading}
          />
          {isUploading ? (
             <div className="flex flex-col items-center">
                 <Loader2 className="w-8 h-8 mb-2 text-primary animate-spin" />
                 <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Processing...</span>
             </div>
          ) : (
            <div className="flex flex-col items-center text-gray-500 group-hover:text-primary transition-colors">
              <Upload className="w-8 h-8 mb-2" />
              <span className="text-sm font-medium">Click to upload CSV</span>
            </div>
          )}
        </label>

        {progress && (
            <div className="flex-1 w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 rounded-lg">
               <div className="mb-2 flex justify-between text-sm">
                   <span className="font-semibold">Import Progress</span>
                   <span className="text-gray-500">{progress.completed + progress.failed} / {progress.total} Processed</span>
               </div>
               
               <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                 <div className="bg-primary h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress.total > 0 ? ((progress.completed + progress.failed) / progress.total) * 100 : 0}%` }}></div>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-center">
                   <div className="bg-white dark:bg-dark p-2 rounded border border-gray-100 dark:border-gray-800">
                       <span className="block text-gray-500 text-xs">Total</span>
                       <span className="font-bold">{progress.total}</span>
                   </div>
                   <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded border border-green-100 dark:border-green-800/30 text-green-700 dark:text-green-400">
                       <span className="block opacity-80 text-xs">Success</span>
                       <span className="font-bold">{progress.completed}</span>
                   </div>
                   <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-100 dark:border-red-800/30 text-red-700 dark:text-red-400">
                       <span className="block opacity-80 text-xs">Failed</span>
                       <span className="font-bold">{progress.failed}</span>
                   </div>
                   <div className="bg-white dark:bg-dark p-2 rounded border border-gray-100 dark:border-gray-800">
                       <span className="block text-gray-500 text-xs">Success Rate</span>
                       <span className="font-bold text-gray-900 dark:text-white">
                           {progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0}%
                       </span>
                   </div>
               </div>

               {progress.errors.length > 0 && (
                   <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                       <div className="flex items-center gap-2 text-red-500 text-sm">
                           <AlertCircle size={16} />
                           <span>There were {progress.errors.length} errors.</span>
                       </div>
                       <button onClick={downloadErrors} className="text-xs font-semibold px-3 py-1.5 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                           Download Logs
                       </button>
                   </div>
               )}
            </div>
        )}
      </div>
    </div>
  );
};
