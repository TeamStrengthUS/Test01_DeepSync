
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, ArrowRight, Zap, Globe, Cpu } from 'lucide-react';
import Logo from './Logo.tsx';
import { useTheme } from '../ThemeContext.tsx';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Overview', path: '/overview' },
    { name: 'Architecture', path: '/product' },
    { name: 'Neural Mesh', path: '/ecosystem' },
    { name: 'Security', path: '/protocols' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-5xl px-4">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[2rem] px-8 py-3 flex items-center justify-between shadow-2xl transition-colors duration-300 relative"
      >
        <div className="flex items-center gap-10">
          <Link to="/">
            <Logo size="sm" hideText />
          </Link>
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                className="text-[10px] lg:text-[11px] uppercase tracking-widest text-slate-500 dark:text-white/40 hover:text-teal dark:hover:text-teal transition-colors font-black"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/60 hover:text-teal transition-all border border-slate-200 dark:border-white/10"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </AnimatePresence>
          </button>
          
          <div className="hidden sm:block w-px h-6 bg-slate-200 dark:bg-white/10" />
          
          <Link to="/login" className="hidden sm:block text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-white/40 hover:text-teal transition-colors font-black">Login</Link>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/register')}
            className="hidden sm:block bg-teal text-black text-[10px] font-black px-6 py-2.5 rounded-full hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] transition-all uppercase tracking-widest"
          >
            Initialize
          </motion.button>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/60 border border-slate-200 dark:border-white/10"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-[calc(100%+12px)] left-0 right-0 bg-white dark:bg-surface border border-slate-200 dark:border-white/10 rounded-[2rem] p-6 shadow-2xl md:hidden flex flex-col gap-4 text-left z-[60]"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name}
                    to={link.path} 
                    onClick={() => setIsOpen(false)}
                    className="p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 text-slate-900 dark:text-white font-black uppercase tracking-widest text-xs border border-transparent hover:border-teal/20 transition-all flex items-center justify-between group"
                  >
                    {link.name}
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-teal" />
                  </Link>
                ))}
              </div>
              <div className="h-px bg-slate-100 dark:bg-white/5 my-2" />
              <Link 
                to="/login" 
                onClick={() => setIsOpen(false)}
                className="p-4 rounded-xl text-slate-500 dark:text-white/40 font-black uppercase tracking-widest text-center"
              >
                Log in to Platform
              </Link>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  navigate('/register');
                }}
                className="w-full py-4 bg-teal text-black font-black rounded-xl uppercase tracking-widest text-xs shadow-lg"
              >
                Deploy Workspace
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
};

export default Navbar;
