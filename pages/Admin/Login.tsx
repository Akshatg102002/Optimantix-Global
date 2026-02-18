
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Lock, LogIn, ShieldCheck } from 'lucide-react';
import { SEO } from '../../components/SEO';

export const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useData();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(password);
      navigate('/admin');
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Invalid Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark flex items-center justify-center p-4">
      <SEO title="Admin Login" description="Secure login area for Optimantix Global staff." />
      <div className="bg-white dark:bg-dark-card p-8 rounded-2xl shadow-xl w-full max-w-sm border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Admin Access
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Enter your security credentials</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Password</label>
             <div className="relative">
                <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="••••••••"
                />
                <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
             </div>
          </div>
          
          {error && <p className="text-red-500 text-center text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded animate-pulse">{error}</p>}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 rounded-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-primary/20"
          >
            {loading ? 'Verifying...' : <><LogIn size={18} /> Login to Dashboard</>}
          </button>
          
          <div className="text-center mt-6">
             <a href="/" className="text-xs text-gray-400 hover:text-primary transition-colors">← Back to Website</a>
          </div>
        </form>
      </div>
    </div>
  );
};
