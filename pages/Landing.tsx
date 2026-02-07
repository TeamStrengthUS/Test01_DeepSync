
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';
import Logo from '../components/Logo.tsx';
import { ShieldCheck, Zap, Globe, Lock, ArrowRight, Activity, Cpu, Database, Command } from 'lucide-react';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would use supabase.auth.signInWithPassword
    // For this build, we follow the mission-control redirect logic
    navigate('/dashboard/overview');
  };

  return (
    <div className="min-h-screen bg-lightSurface dark:bg-void text-slate-900 dark:text-white overflow-hidden relative transition-colors duration-300 selection:bg-teal selection:text-black">
      <Navbar />

      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-teal/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay dark:opacity-[0.05]" />
      </div>

      {/* Hero */}
      <main className="relative z-10 pt-48 pb-32 px-6 container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal/20 bg-teal/5 text-teal text-[10px] font-black tracking-widest uppercase mb-8 backdrop-blur-sm">
            <ShieldCheck size={12} /> ICRC 2026 COMPLIANT AI-DSS
          </div>
          <h1 className="text-6xl md:text-8xl font-black font-geist tracking-tighter leading-[0.9] mb-8 text-slate-900 dark:text-white">
            Secure AI <br />
            that <span className="iridescent-gradient bg-clip-text text-transparent italic">Remembers.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 dark:text-white/40 leading-relaxed mb-12 max-w-xl font-medium">
            TeamStrength provides high-performance Neural Mesh clusters architected for absolute state precision and human governance.
          </p>
          
          {/* System Telemetry */}
          <div className="mt-16 flex flex-col gap-6">
             <div className="flex items-center gap-10">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                   <div className="text-left">
                      <p className="text-[9px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.2em] mb-1">Mesh Status</p>
                      <p className="text-xs font-black text-teal uppercase tracking-widest">Global Consensus: 99.9%</p>
                   </div>
                </div>
                <div className="w-px h-8 bg-slate-200 dark:bg-white/5" />
                <div className="flex items-center gap-3">
                   <Activity size={16} className="text-slate-400 dark:text-white/20" />
                   <div className="text-left">
                      <p className="text-[9px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.2em] mb-1">Latency</p>
                      <p className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-widest">0.04ms PHX-VAULT</p>
                   </div>
                </div>
             </div>
             
             <div className="flex items-center gap-4 py-3 px-6 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl w-fit">
                <Database size={14} className="text-teal" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-white/40">Immutable Memory Ledger V3.2 Active</span>
             </div>
          </div>
        </motion.div>

        {/* Auth Provider Implementation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative group"
        >
          <div className="absolute -inset-10 bg-teal/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-teal/10 transition-colors" />
          <div className="bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[3rem] p-10 shadow-2xl relative z-10 animate-power-glow-card">
             <div className="mb-10 text-center">
                <Logo size="sm" className="justify-center mb-6" />
                <h2 className="text-2xl font-black font-geist tracking-tight mb-2 uppercase text-slate-900 dark:text-white">Core Activation</h2>
                <p className="text-xs text-slate-400 dark:text-white/40 font-medium uppercase tracking-[0.3em]">Initialize Mission Control</p>
             </div>
             
             {/* Supabase-Style Auth Interface */}
             <div className="space-y-4">
                <button 
                  onClick={handleAuth}
                  className="w-full py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-center gap-4 hover:bg-slate-100 dark:hover:bg-white/10 transition-all font-black text-[10px] uppercase tracking-[0.3em] text-slate-600 dark:text-white"
                >
                  <img src="https://www.google.com/favicon.ico" className="w-4 h-4 grayscale" alt="Google" />
                  Continue with Google
                </button>
             </div>

             <div className="relative py-8 flex items-center justify-center">
                <div className="absolute w-full h-px bg-slate-100 dark:bg-white/5" />
                <span className="relative z-10 bg-white dark:bg-surface px-4 text-[9px] text-slate-300 dark:text-white/10 font-black uppercase tracking-[0.4em]">Encrypted Pairing</span>
             </div>

             <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-2">
                   <label className="text-[9px] font-black text-slate-400 dark:text-white/20 uppercase tracking-widest block px-2 text-left">Work Email</label>
                   <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@neural-mesh.sh"
                      className="w-full bg-slate-50 dark:bg-void/50 border border-slate-200 dark:border-white/5 focus:border-teal/50 rounded-2xl py-5 px-6 text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-white/10 font-bold text-sm" 
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] font-black text-slate-400 dark:text-white/20 uppercase tracking-widest block px-2 text-left">Password</label>
                   <input 
                      type="password" 
                      required
                      placeholder="••••••••"
                      className="w-full bg-slate-50 dark:bg-void/50 border border-slate-200 dark:border-white/5 focus:border-teal/50 rounded-2xl py-5 px-6 text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-white/10 font-bold text-sm" 
                   />
                </div>
                <button 
                  type="submit"
                  className="w-full py-5 bg-teal text-black font-black rounded-2xl text-sm uppercase tracking-[0.3em] shadow-xl hover:shadow-teal/20 transition-all mt-4 hover:scale-[1.01]"
                >
                  Launch Dashboard
                </button>
             </form>

             <p className="mt-8 text-center text-[9px] font-black text-slate-300 dark:text-white/10 uppercase tracking-[0.4em] leading-relaxed">
                Subject to <span className="text-teal">Constitutional Governance</span> <br /> Audit Log: ACTIVE
             </p>
          </div>
        </motion.div>
      </main>

      {/* Footer Minimal */}
      <footer className="relative z-10 py-12 border-t border-slate-100 dark:border-white/5 px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-widest">
           <Lock size={12} className="text-teal" /> SOC2 TYPE II CERTIFIED
           <div className="w-1 h-1 rounded-full bg-slate-200 dark:bg-white/10" />
           <ShieldCheck size={12} className="text-teal" /> IHL 2026 COMPLIANT
        </div>
        <p className="text-[10px] font-black text-slate-300 dark:text-white/10 uppercase tracking-[0.4em]">
          © 2026 TEAMSTRENGTH.US • NEURAL MESH V3.2
        </p>
      </footer>
    </div>
  );
};

export default Landing;
