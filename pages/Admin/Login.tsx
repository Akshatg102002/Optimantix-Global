
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Lock, Mail, UserPlus, LogIn } from 'lucide-react';
import { SEO } from '../../components/SEO';

export const AdminLogin: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useData();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegistering) {
        await register(email, password);
        // After register, usually logged in automatically
      } else {
        await login(email, password);
      }
      navigate('/admin');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
          setError("Invalid email or password.");
      } else if (err.code === 'auth/email-already-in-use') {
          setError("Email is already in use.");
      } else if (err.code === 'auth/weak-password') {
          setError("Password should be at least 6 characters.");
      } else {
          setError("Authentication failed. " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark flex items-center justify-center p-4">
      <SEO title="Admin Login" description="Secure login area for Optimantix Global staff." />
      <div className="bg-white dark:bg-dark-card p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isRegistering ? 'Create Admin Account' : 'Admin Login'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Secure area for employees only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
            <div className="relative">
                <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                placeholder="admin@optimantix.com"
                />
                <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
             <div className="relative">
                <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                placeholder="Enter password"
                />
                <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
             </div>
          </div>
          
          {error && <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded">{error}</p>}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? 'Processing...' : (
                isRegistering ? <><UserPlus size={18} /> Create Account</> : <><LogIn size={18} /> Login</>
            )}
          </button>
          
          <div className="text-center mt-6 space-y-2">
             <button 
                type="button" 
                onClick={() => { setIsRegistering(!isRegistering); setError(''); }}
                className="text-sm text-primary hover:underline"
             >
                 {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
             </button>
             <div>
                <a href="/" className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">Back to Website</a>
             </div>
          </div>
        </form>
      </div>
    </div>
  );
};
