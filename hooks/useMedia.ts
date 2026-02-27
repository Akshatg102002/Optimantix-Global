
import { useState, useEffect, useCallback } from 'react';
import { db } from '../lib/firebase';

export interface MediaFile {
  id: string;
  name: string;
  type: string;
  size: number;
  data: string; // Base64 string
  createdAt: string;
}

const STORAGE_KEY = 'opt_media_library';

export const useMedia = () => {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch from Firebase and sync with LocalStorage
  const fetchMedia = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const snapshot = await db.collection('media').orderBy('createdAt', 'desc').get();
      const files: MediaFile[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as MediaFile));
      
      setMedia(files);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
    } catch (err: unknown) {
      console.error('Error fetching media:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch media';
      setError(errorMessage);
      
      // Fallback to localStorage if offline
      const local = localStorage.getItem(STORAGE_KEY);
      if (local) {
        setMedia(JSON.parse(local));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const uploadFile = async (file: File) => {
    setLoading(true);
    setError(null);
    try {
      // Convert to Base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
      });
      reader.readAsDataURL(file);
      const base64 = await base64Promise;

      const mediaData: Omit<MediaFile, 'id'> = {
        name: file.name,
        type: file.type,
        size: file.size,
        data: base64,
        createdAt: new Date().toISOString()
      };

      // Save to Firebase
      const docRef = await db.collection('media').add(mediaData);
      
      const newFile: MediaFile = {
        id: docRef.id,
        ...mediaData
      };

      setMedia(prev => [newFile, ...prev]);
      
      // Update LocalStorage
      const updated = [newFile, ...media];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      
      return newFile;
    } catch (err: unknown) {
      console.error('Error uploading file:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload file';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await db.collection('media').doc(id).delete();
      
      const updated = media.filter(f => f.id !== id);
      setMedia(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err: unknown) {
      console.error('Error deleting file:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete file';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    media,
    loading,
    error,
    uploadFile,
    deleteFile,
    refresh: fetchMedia
  };
};
