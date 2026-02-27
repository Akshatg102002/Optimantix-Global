
import React, { useState } from 'react';
import { useMedia, MediaFile } from '../../hooks/useMedia';
import { Trash2, Copy, Check, Upload, FileIcon, ImageIcon, Loader2, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MediaGridProps {
  onSelect?: (file: MediaFile) => void;
  selectable?: boolean;
}

export const MediaGrid: React.FC<MediaGridProps> = ({ onSelect, selectable = false }) => {
  const { media, loading, error, uploadFile, deleteFile } = useMedia();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleCopy = (file: MediaFile) => {
    // In a real app with Storage, this would be the URL. 
    // Here it's the Base64 string, which might be too long for some uses, 
    // but we'll copy it as requested.
    navigator.clipboard.writeText(file.data);
    setCopiedId(file.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        await uploadFile(files[i]);
      }
    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  const filteredMedia = media.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search files..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <label className="cursor-pointer bg-primary hover:bg-secondary text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-primary/20 whitespace-nowrap">
          <Upload size={18} />
          <span>{isUploading ? 'Uploading...' : 'Upload Media'}</span>
          <input 
            type="file" 
            className="hidden" 
            multiple 
            accept="image/*" 
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </label>
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg border border-red-100 dark:border-red-900/30 text-sm">
          {error}
        </div>
      )}

      {/* Grid */}
      {loading && media.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Loader2 className="animate-spin mb-4" size={40} />
          <p>Loading media library...</p>
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-400">
          <ImageIcon size={48} className="mb-4 opacity-20" />
          <p>{searchTerm ? 'No files match your search' : 'Your media library is empty'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          <AnimatePresence>
            {filteredMedia.map((file) => (
              <motion.div
                key={file.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`group relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all ${selectable ? 'cursor-pointer hover:border-primary' : ''}`}
                onClick={() => selectable && onSelect?.(file)}
              >
                {/* Preview */}
                <div className="aspect-square bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
                  {file.type.startsWith('image/') ? (
                    <img 
                      src={file.data} 
                      alt={file.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <FileIcon size={40} />
                    </div>
                  )}
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(file);
                      }}
                      className="p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition"
                      title="Copy Path (Base64)"
                    >
                      {copiedId === file.id ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                    {!selectable && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('Delete this file?')) deleteFile(file.id);
                        }}
                        className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-full text-red-200 transition"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate" title={file.name}>
                    {file.name}
                  </p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[10px] text-gray-500 uppercase">{file.type.split('/')[1]}</span>
                    <span className="text-[10px] text-gray-500">{formatSize(file.size)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
