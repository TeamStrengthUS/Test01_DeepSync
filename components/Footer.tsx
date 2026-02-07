
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from './Logo';
import { Github, Twitter, Linkedin, ArrowUpRight, Globe, Shield, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const PLATFORM_LINKS = [
    { label: 'Agentic Layer', path: '/ecosystem' },
    { label: 'Skills Configurator', path: '/dashboard/abilities' },
    { label: 'DeepSync Vault', path: '/deepsync' },
    { label: 'Team IQ Node', path: '/intelligence' },
    { label: 'The Constitution', path: '/branding' },
    { label: 'Pricing', path: '/pricing' },
  ];

  const RESOURCE_LINKS = [
    { label: 'Documentation', path: '/docs' },
    { label: 'Brand Guidelines', path: '/branding' },
    { label: 'Mesh Status', path: '/status' },
    { label: 'Community', path: '/community' },
    { label: 'Contact Sales', path: '/contact' }
  ];

  return (
    <footer className="relative pt-32 pb-12 px-6 border-t border-slate-200 dark:border-white/5 bg-lightSurface dark:bg-void overflow-hidden transition-colors duration-300">
      {/* Background Decorative Element */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 bg-teal/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand Column */}
          <div className="flex flex-col gap-8 text-left">
            <Link to="/" className="w-fit">
              <Logo size="md" />
            </Link>
            <p className="text-slate-500 dark:text-white/40 leading-relaxed text-sm max-w-xs font-medium">
              The high-performance intelligence layer for modern teams. Built on the unified Neural Mesh for absolute state precision.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center hover:bg-teal/10 hover:border-teal/30 text-slate-400 dark:text-white/40 hover:text-teal transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center hover:bg-teal/10 hover:border-teal/30 text-slate-400 dark:text-white/40 hover:text-teal transition-all">
                <Github size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center hover:bg-teal/10 hover:border-teal/30 text-slate-400 dark:text-white/40 hover:text-teal transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div className="text-left">
            <h4 className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-[0.3em] mb-8">Ecosystem</h4>
            <ul className="space-y-4">
              {PLATFORM_LINKS.map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className="text-sm text-slate-500 dark:text-white/50 hover:text-teal transition-colors font-bold flex items-center gap-2 group">
                    {item.label} <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div className="text-left">
            <h4 className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-[0.3em] mb-8">Resources</h4>
            <ul className="space-y-4">
              {RESOURCE_LINKS.map((item) => (
                <li key={item.label}>
                  <Link 
                    to={item.path} 
                    className="text-sm text-slate-500 dark:text-white/50 hover:text-teal transition-colors font-bold flex items-center gap-2 group"
                  >
                    {item.label} <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Status Column */}
          <div className="flex flex-col text-left">
            <h4 className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-[0.3em] mb-8">System Health</h4>
            <div className="p-6 rounded-[2rem] bg-white dark:bg-surface border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-600 dark:text-white/60">DeepSync Vault</span>
                <span className="flex items-center gap-2 text-[10px] font-black uppercase text-teal">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" /> Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-600 dark:text-white/60">Neural Mesh</span>
                <span className="flex items-center gap-2 text-[10px] font-black uppercase text-teal">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" /> Synchronized
                </span>
              </div>
              <div className="h-px bg-slate-100 dark:bg-white/5 my-2" />
              <p className="text-[10px] text-slate-400 dark:text-white/20 font-black uppercase tracking-widest text-center">
                Last checked 2m ago
              </p>
            </div>
          </div>
        </div>

        {/* Massive Brand Mark */}
        <div className="pt-24 border-t border-slate-200 dark:border-white/5 relative">
          <h2 className="text-[18vw] font-black leading-none tracking-tighter text-slate-900/[0.03] dark:text-white/[0.02] select-none pointer-events-none uppercase text-center w-full">
            TEAMSTRENGTH
          </h2>
          
          <div className="absolute inset-x-0 bottom-12 flex flex-col md:flex-row justify-between items-center gap-8 px-4">
            <div className="flex items-center gap-8 text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.4em]">
              <div className="flex items-center gap-2"><MapPin size={12} /> HQ PHX/AZ</div>
              <div className="flex items-center gap-2"><Shield size={12} /> THE CONSTITUTION V3.1</div>
            </div>
            
            <div className="flex items-center gap-8 text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-widest">
              <Link to="/privacy" className="hover:text-teal transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-teal transition-colors">Terms</Link>
              <Link to="/contact" className="hover:text-teal transition-colors">Contact</Link>
              <span className="text-slate-300 dark:text-white/10 select-none">© {currentYear} TEAMSTRENGTH.US</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
