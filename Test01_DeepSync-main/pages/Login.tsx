import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Fixed: Ensuring named exports are explicitly recognized
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ChevronLeft, Github } from 'lucide-react';
import Logo from '../components/Logo.tsx';
import { supabase } from '../lib/supabaseClient.ts';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    navigate('/dashboard/overview');
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/#/dashboard/overview` }
    });
    if (error) setError(error.message);
  };

  return (
    <div className="min-h-screen flex flex-col bg-lightSurface dark:bg-void overflow-hidden selection:bg-teal selection:text-black transition-colors duration-300">
      <div className="flex-1 flex overflow-hidden">
        {/* Visual Side (Desktop) */}
        <div className="hidden lg:flex relative flex-[1.2] flex-col items-center justify-center p-12 bg-white dark:bg-black border-r border-slate-200 dark:border-white/5 transition-colors duration-300">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,0.05),transparent_70%)]" />
          <div className="relative w-[500px] h-[500px]">
            {/* Orbits */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-teal/5"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-10 rounded-full border border-slate-200 dark:border-white/5"
            />
            
            {/* Central Object */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="absolute -inset-10 bg-iridescent opacity-10 blur-[60px] animate-pulse" />
                <div className="w-56 h-56 bg-white dark:bg-surface border border-slate-200 dark:border-white/10 rounded-[3rem] shadow-2xl flex items-center justify-center overflow-hidden relative group cursor-crosshair transition-colors duration-300">
                  <div className="absolute inset-0 bg-iridescent opacity-10 group-hover:opacity-20 transition-opacity" />
                  <Logo size="lg" hideText />
                </div>
              </motion.div>
            </div>
          </div>
          
          <div className="absolute bottom-24 text-center">
            <h2 className="text-3xl font-black font-geist tracking-tight mb-3 text-slate-900 dark:text-white">Welcome to the Core</h2>
            <p className="text-slate-500 dark:text-white/40 text-lg max-w-sm font-medium">Access your unified AI performance workspace.</p>
          </div>
        </div>

        {/* Form Side */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-24 bg-lightSurface dark:bg-void transition-colors duration-300">
          <div className="w-full max-w-md">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-400 dark:text-white/40 hover:text-slate-900 dark:hover:text-white mb-12 text-sm font-black group transition-colors">
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl font-black font-geist tracking-tighter mb-4 text-slate-900 dark:text-white">Sign In.</h1>
              <p className="text-slate-500 dark:text-white/40 text-lg mb-10 leading-relaxed font-medium">Enter your credentials to manage your autonomous team.</p>
            </motion.div>

            {/* Fix: Corrected escaped quotes and provided valid event handlers */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-[0.2em] px-2">Workspace Email</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-white/20 group-focus-within:text-teal transition-colors" size={18} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com" 
                    className="w-full bg-white dark:bg-surface border border-slate-200 dark:border-white/5 focus:border-teal/50 rounded-2xl py-5 pl-14 pr-5 text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-white/10 font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-[0.2em] px-2">Password</label>
                  <a href="#" className="text-[10px] text-teal hover:underline font-black uppercase tracking-widest">Forgot?</a>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-white/20 group-focus-within:text-teal transition-colors" size={18} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="w-full bg-white dark:bg-surface border border-slate-200 dark:border-white/5 focus:border-teal/50 rounded-2xl py-5 pl-14 pr-5 text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-white/10 font-bold"
                  />
                </div>
              </div>
              
              {/* Fix: Corrected escaped quotes */}
              {error && (
                <div className="p-4 border border-red-500/20 bg-red-500/5 rounded-2xl text-red-500 text-xs font-bold">
                  {error}
                </div>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-teal text-black font-black rounded-2xl text-lg hover:shadow-[0_0_30px_rgba(45,212,191,0.5)] transition-all relative overflow-hidden group"
              >
                <span className="relative z-10">{loading ? 'Authorizing...' : 'Launch Dashboard'}</span>
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              </button>

              <div className="relative py-8 flex items-center justify-center">
                <div className="absolute w-full h-px bg-slate-100 dark:bg-white/5" />
                <span className="relative z-10 bg-lightSurface dark:bg-void px-6 text-[10px] text-slate-400 dark:text-white/20 uppercase tracking-[0.3em] font-black transition-colors duration-300">Secure Authentication</span>
              </div>

              {/* Fix: Corrected escaped quotes and OAuth handlers */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleOAuth('google')}
                  className="py-4 bg-white dark:bg-surface border border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-white/10 transition-all font-black text-xs uppercase tracking-widest text-slate-600 dark:text-white shadow-sm dark:shadow-none"
                >
                  <img src="https://www.google.com/favicon.ico" className="w-4 h-4 grayscale opacity-40 group-hover:opacity-100" alt="google" />
                  Google
                </button>
                <button
                  type="button"
                  onClick={() => handleOAuth('github')}
                  className="py-4 bg-white dark:bg-surface border border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-white/10 transition-all font-black text-xs uppercase tracking-widest text-slate-600 dark:text-white shadow-sm dark:shadow-none"
                >
                  <Github size={18} className="text-slate-400 dark:text-white/20" />
                  GitHub
                </button>
              </div>
            </form>

            <p className="mt-12 text-center text-slate-500 dark:text-white/40 font-bold text-sm">
              New to TeamStrength? <Link to="/register" className="text-teal font-black hover:underline">Start Trial</Link>
            </p>
          </div>
        </div>
      </div>
      
      <footer className="py-8 border-t border-slate-200 dark:border-white/5 px-8 flex justify-between items-center text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-widest transition-colors duration-300">
        <span>© {new Date().getFullYear()} TEAMSTRENGTH.US</span>
        <div className="flex gap-8">
          <Link to="/privacy" className="hover:text-teal transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-teal transition-colors">Terms</Link>
          <Link to="/contact" className="hover:text-teal transition-colors">Contact</Link>
        </div>
      </footer>
    </div>
  );
};

export default Login;