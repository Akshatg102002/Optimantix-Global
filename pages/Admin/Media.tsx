
import React from 'react';
import { MediaGrid } from '../../components/MediaManager/MediaGrid';
import { ImageIcon, LayoutGrid, List } from 'lucide-react';

export const AdminMedia: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <ImageIcon className="text-primary" size={32} />
            Media Library
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your images and assets. Files are stored in Firebase and cached locally.
          </p>
        </div>
        
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <button className="p-2 bg-white dark:bg-gray-700 rounded-md shadow-sm text-primary">
            <LayoutGrid size={18} />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <List size={18} />
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
        <MediaGrid />
      </div>
    </div>
  );
};
