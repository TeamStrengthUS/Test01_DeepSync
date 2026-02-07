
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar.tsx';
import Footer from '../components/Footer.tsx';
import { Activity, CheckCircle2, AlertTriangle, Clock, Hammer, ShieldCheck, Database, Zap } from 'lucide-react';

const APIStatus: React.FC = () => {
  const components = [
    { name: 'DeepSync Core Protocol', status: 'Operational', uptime: '100%' },
    { name: 'PHX-01 DeepSync Vault Shard', status: 'Operational', uptime: '99.99%' },
    { name: 'Neural Mesh WebSockets', status: 'Operational', uptime: '100%' },
    { name: 'Vector Vault Ingestion', status: 'Operational', uptime: '99.98%' },
    { name: 'Enterprise Auth Node', status: 'Operational', uptime: '100%' },
  ];

  return (
    <div className="min-h-screen bg-lightSurface dark:bg-void text-slate-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
      <Navbar />
      
      {/* Background HUD elements */}
      <div className="absolute top-0 inset-x-0 h-[40vh] bg-[radial-gradient(circle_at_50%_0%,rgba(45,212,191,0.05),transparent_70%)] pointer-events-none" />

      <main className="pt-48 pb-32 px-6 container mx-auto max-w-3xl relative z-10">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 bg-teal/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-teal/20 relative">
            <div className="absolute inset-0 bg-teal/20 blur-xl animate-pulse" />
            <Activity className="text-teal relative z-10" size={40} />
          </div>
          <h1 className="text-5xl font-black font-geist tracking-tighter mb-4 text-slate-900 dark:text-white">
            TS <span className="text-teal">DeepSync</span> Status.
          </h1>
          <p className="text-slate-500 dark:text-white/40 font-bold uppercase tracking-[0.3em] text-[10px]">
            Global Telemetry • Real-time
          </p>
        </motion.div>

        {/* COMPREHENSIVE MAINTENANCE ANNOUNCEMENT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative mb-16 p-8 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[3rem] shadow-2xl overflow-hidden group"
        >
          {/* Iridescent Top border beam */}
          <div className="absolute top-0 inset-x-0 h-1 iridescent-gradient opacity-40" />
          
          <div className="flex flex-col md:flex-row gap-8 items-start relative z-10 text-left">
            <div className="w-14 h-14 rounded-2xl bg-teal/10 flex items-center justify-center shrink-0 border border-teal/20 text-teal">
              <Hammer size={24} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-teal/10 text-teal text-[10px] font-black uppercase tracking-widest border border-teal/20">
                  Scheduled Refinement
                </span>
                <span className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-widest">
                  Protocol V3.1-Expansion
                </span>
              </div>
              <h3 className="text-2xl font-black font-geist mb-4 text-slate-900 dark:text-white">DeepSync Vault Shard Expansion</h3>
              <p className="text-slate-500 dark:text-white/40 font-medium leading-relaxed mb-6">
                We are performing a scheduled expansion of the <strong>PHX-01 DeepSync Node</strong> to increase the Vault ingestion limit by 400%. During this window, sub-second sync latency may fluctuate briefly.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-teal" />
                  <div className="text-left">
                    <p className="text-[9px] font-black text-slate-400 dark:text-white/20 uppercase tracking-widest">Window Start</p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">June 24, 2026 - 02:00 UTC</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Zap size={16} className="text-teal" />
                  <div className="text-left">
                    <p className="text-[9px] font-black text-slate-400 dark:text-white/20 uppercase tracking-widest">Impact Scope</p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Agentic HUD Telemetry Only</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SYSTEM COMPONENT LIST */}
        <div className="space-y-4 text-left">
          <div className="flex justify-between items-center px-6 mb-2">
            <h4 className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.2em]">Neural Mesh Components</h4>
            <span className="text-[10px] font-black text-teal uppercase tracking-widest">Uptime</span>
          </div>
          {components.map((s, i) => (
            <motion.div 
              key={s.name} 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + (i * 0.1) }}
              className="p-8 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[2rem] flex items-center justify-between group hover:border-teal/20 transition-all shadow-lg dark:shadow-none"
            >
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-teal animate-pulse shadow-[0_0_8px_rgba(45,212,191,0.5)]" />
                <span className="text-lg font-bold tracking-tight text-slate-800 dark:text-white/80">{s.name}</span>
              </div>
              <div className="flex items-center gap-8">
                <span className="text-xs font-black font-geist text-slate-400 dark:text-white/20">{s.uptime}</span>
                <div className="flex items-center gap-2 text-teal font-black text-[10px] uppercase tracking-widest px-4 py-2 bg-teal/5 rounded-xl border border-teal/10">
                  <CheckCircle2 size={12} /> Operational
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SECURITY & INCIDENT HISTORY CTA */}
        <div className="mt-16 flex flex-col md:flex-row gap-6">
           <div className="flex-1 p-8 bg-slate-50 dark:bg-void border border-slate-200 dark:border-white/5 rounded-[2.5rem] flex items-center gap-4 group cursor-pointer hover:border-teal/30 transition-all">
              <div className="p-4 bg-white dark:bg-surface rounded-2xl text-slate-400 group-hover:text-teal transition-colors">
                <ShieldCheck size={20} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-widest mb-1">Governance</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Constitution Verification</p>
              </div>
           </div>
           <div className="flex-1 p-8 bg-slate-50 dark:bg-void border border-slate-200 dark:border-white/5 rounded-[2.5rem] flex items-center gap-4 group cursor-pointer hover:border-teal/30 transition-all">
              <div className="p-4 bg-white dark:bg-surface rounded-2xl text-slate-400 group-hover:text-teal transition-colors">
                <Database size={20} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-widest mb-1">Vault History</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">DeepSync Archives</p>
              </div>
           </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default APIStatus;
