
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  ShieldCheck, 
  Zap, 
  Terminal, 
  Database, 
  Trash2, 
  Power, 
  AlertTriangle,
  Lock,
  Cpu,
  Brain,
  Layers,
  Activity,
  CheckCircle,
  MessageSquare,
  Mic
} from 'lucide-react';
import UserAvatar from '../components/UserAvatar';
import SkillConfigurator from '../components/SkillConfigurator';
import ChannelMatrix from '../components/ChannelMatrix';

const PowerGlowCard: React.FC<{ children: React.ReactNode; isProvisioning?: boolean; className?: string }> = ({ children, isProvisioning, className = "" }) => (
  <div className={`relative bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 overflow-hidden transition-all duration-700 glass-card ${isProvisioning ? 'ring-2 ring-teal/50 shadow-[0_0_50px_rgba(45,212,191,0.2)]' : ''} ${className}`}>
    {isProvisioning && (
      <motion.div 
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 iridescent-gradient opacity-10 pointer-events-none"
      />
    )}
    <div className="relative z-10">{children}</div>
  </div>
);

const AgenticLayer: React.FC = () => {
  const [token, setToken] = useState('');
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [provisioned, setProvisioned] = useState(false);
  const [isSuspended, setIsSuspended] = useState(false);
  const [strikeCount, setStrikeCount] = useState(2);

  const handleProvision = () => {
    setIsProvisioning(true);
    setTimeout(() => {
      setIsProvisioning(false);
      setProvisioned(true);
    }, 4000);
  };

  return (
    <div className="space-y-16 p-2 text-left">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black font-geist tracking-tighter mb-2 text-slate-900 dark:text-white flex items-center gap-4">
            <Layers className="text-teal" size={32} /> Agentic Layer
          </h1>
          <p className="text-slate-500 dark:text-white/40 font-medium">Deploy and govern your individual TeamMate nodes.</p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-teal/10 border border-teal/20 rounded-xl flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isSuspended ? 'bg-red-500' : 'bg-teal animate-pulse'}`} />
            <span className="text-[10px] font-black uppercase tracking-widest text-teal">
              {isSuspended ? 'Mesh Suspended' : 'Neural Mesh: Active'}
            </span>
          </div>
        </div>
      </header>

      {/* CORE CONFIGURATION */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* SECTION 2: THE "CONNECT" INTERFACE */}
        <div className="xl:col-span-7 space-y-10">
          <PowerGlowCard isProvisioning={isProvisioning}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-teal/10 flex items-center justify-center text-teal border border-teal/10 shadow-[0_0_15px_rgba(45,212,191,0.1)]">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black font-geist text-slate-900 dark:text-white uppercase">Initialize Omni-Node</h3>
                  <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">Secure Ingress Control</p>
                </div>
              </div>
              {provisioned && (
                <div className="flex items-center gap-2 px-3 py-1 bg-teal/5 border border-teal/20 rounded-full">
                  <Mic size={14} className="text-teal" />
                  <span className="text-[9px] font-black text-teal uppercase tracking-widest">Voice Linked</span>
                </div>
              )}
            </div>

            {!provisioned ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-[0.2em] px-2">Primary Ingress Key</label>
                  <div className="relative group">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-white/20 group-focus-within:text-teal transition-colors" size={18} />
                    <input 
                      type="password" 
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      placeholder="Auth Key or Bot Token..." 
                      className="w-full bg-slate-50 dark:bg-void/50 border border-slate-200 dark:border-white/5 focus:border-teal/50 rounded-2xl py-5 pl-14 pr-5 text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-white/10 font-mono text-sm"
                    />
                  </div>
                </div>

                <button 
                  onClick={handleProvision}
                  disabled={!token || isProvisioning}
                  className="w-full py-5 bg-teal text-black font-black rounded-2xl text-lg hover:shadow-[0_0_40px_rgba(45,212,191,0.5)] transition-all disabled:opacity-50 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isProvisioning ? 'Provisioning Neural Mesh...' : 'Provision Omni-Node'}
                    <Zap size={20} className={isProvisioning ? 'animate-bounce' : ''} />
                  </span>
                  {isProvisioning && (
                    <motion.div 
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-white/20"
                    />
                  )}
                </button>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-8"
              >
                <div className="p-8 bg-teal/5 border border-teal/20 rounded-[2rem] inline-block shadow-[0_0_30px_rgba(45,212,191,0.1)]">
                   <p className="text-[10px] font-black text-teal uppercase tracking-widest mb-4">Secure Ingress: Encrypted Link Active</p>
                   <div className="text-6xl font-black font-geist tracking-[0.3em] text-slate-900 dark:text-white mb-4">
                     123-456
                   </div>
                   <p className="text-sm font-bold text-slate-500 dark:text-white/60 max-w-sm mx-auto">
                     Send this code to your <span className="text-teal">Omni-Node</span> on your chosen channel to authorize the link.
                   </p>
                </div>
                <div className="flex justify-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-white/5 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <CheckCircle size={14} className="text-teal" /> Mesh: Rail-01
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-white/5 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <CheckCircle size={14} className="text-teal" /> Vault: DeepSync-Alpha
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-white/5 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <CheckCircle size={14} className="text-teal" /> LiveKit: Scoped
                  </div>
                </div>
              </motion.div>
            )}
          </PowerGlowCard>

          {/* SECTION 3: THE "DEEPSYNC" MONITOR (PART 1) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[3rem] shadow-xl text-left glass-card">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-black font-geist text-slate-900 dark:text-white uppercase flex items-center gap-3">
                  <Brain className="text-teal" size={20} /> Team IQ
                </h3>
                <span className="text-[10px] font-black text-teal uppercase tracking-widest">Active Abilities</span>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 dark:bg-void/50 border border-slate-200 dark:border-white/5 rounded-2xl">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Persona Memory Block</p>
                  <p className="text-xs font-medium text-slate-600 dark:text-white/60 line-clamp-2 italic">
                    "I am a high-performance sales agent specializing in SaaS enterprise outreach. My tone is professional yet punchy..."
                  </p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-void/50 border border-slate-200 dark:border-white/5 rounded-2xl">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Human Context Block</p>
                  <p className="text-xs font-medium text-slate-600 dark:text-white/60 line-clamp-2 italic">
                    "User: Alex Rivers. Preferences: Briefing via Telegram every morning at 8:00 AM. Key KPI: Inbound MQLs."
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[3rem] shadow-xl text-left flex flex-col glass-card">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-black font-geist text-slate-900 dark:text-white uppercase flex items-center gap-3">
                  <Terminal className="text-teal" size={20} /> Audit Log
                </h3>
                <Activity size={16} className="text-teal animate-pulse" />
              </div>
              <div className="flex-1 space-y-4 max-h-[160px] overflow-y-auto no-scrollbar font-mono text-[10px]">
                {[
                  { time: '12:04:12', action: 'Browsed Web: SAP Integration' },
                  { time: '12:04:10', action: 'DeepSync: Updated Lead Score' },
                  { time: '11:58:32', action: 'Neural Mesh: Edge Sync' },
                  { time: '11:55:01', action: 'Vault: Partition Verified' }
                ].map((log, i) => (
                  <div key={i} className="flex gap-3 text-slate-400 dark:text-white/30 border-b border-slate-100 dark:border-white/5 pb-2">
                    <span className="text-teal/40">[{log.time}]</span>
                    <span>{log.action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: THE "CONSTITUTION" COMPLIANCE VIEW */}
        <div className="xl:col-span-5 space-y-10">
          <div className="p-10 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[3rem] shadow-xl text-left glass-card">
            <div className="flex justify-between items-start mb-10">
              <div>
                <h3 className="text-xl font-black font-geist text-slate-900 dark:text-white uppercase flex items-center gap-3 mb-2">
                  <ShieldCheck className="text-teal" size={24} /> The Constitution
                </h3>
                <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Ethical Boundary Control</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Egress Blocks</p>
                <div className="flex gap-1 justify-end">
                   {[...Array(5)].map((_, i) => (
                     <div key={i} className={`w-3 h-3 rounded-sm ${i < strikeCount ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-slate-200 dark:bg-white/10'}`} />
                   ))}
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-void/50 border border-slate-200 dark:border-white/5 rounded-3xl mb-8">
               <p className="text-[10px] font-black text-teal uppercase tracking-widest mb-4">Active System Prompt</p>
               <p className="text-sm font-medium text-slate-600 dark:text-white/60 leading-relaxed italic">
                 "I operate strictly under International Humanitarian Law (IHL). I refuse all requests for cyberattacks, credential theft, or deceptive impersonation. My core directive is the optimized performance of the TeamStrength ecosystem..."
               </p>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-red-500/5 border border-red-500/20 text-red-500">
               <AlertTriangle size={18} />
               <p className="text-[10px] font-black uppercase tracking-widest">
                 {strikeCount} Illegal Commands blocked this session (Egress Control Active).
               </p>
            </div>
          </div>

          {/* HUMAN-IN-THE-LOOP CONTROLS */}
          <div className="p-10 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[3rem] shadow-xl text-left glass-card">
            <h3 className="text-xl font-black font-geist text-slate-900 dark:text-white uppercase flex items-center gap-3 mb-8">
              <Power className="text-red-500" size={24} /> Kill Switch
            </h3>
            
            <div className="space-y-4">
              <button 
                onClick={() => setIsSuspended(!isSuspended)}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all ${isSuspended ? 'bg-teal text-black shadow-[0_0_20px_rgba(45,212,191,0.3)]' : 'bg-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.2)]'}`}
              >
                <Power size={18} /> {isSuspended ? 'Resume Neural Mesh' : 'Emergency Stop (Kill Container)'}
              </button>
              
              <button className="w-full py-5 border border-red-500/20 text-red-500 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-red-500 hover:text-white transition-all">
                <Trash2 size={16} /> Wipe Team IQ Memory
              </button>
            </div>
            
            <p className="mt-8 text-[10px] text-slate-400 dark:text-white/20 font-black uppercase tracking-widest text-center">
              Meaningful Human Control Protocol v1.4
            </p>
          </div>
        </div>
      </div>

      {/* REORDERED: Ability Configurator (Widget) prioritized before Matrix */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-5">
           <SkillConfigurator isWidget />
        </div>
        <div className="xl:col-span-7">
           <ChannelMatrix />
        </div>
      </div>
      
      <style>{`
        @keyframes power-glow {
          0% { border-color: #2DD4BF; box-shadow: 0 0 15px rgba(45, 212, 191, 0.3); }
          33% { border-color: #FF0080; box-shadow: 0 0 15px rgba(255, 0, 128, 0.3); }
          66% { border-color: #7928CA; box-shadow: 0 0 15px rgba(121, 40, 202, 0.3); }
          100% { border-color: #2DD4BF; box-shadow: 0 0 15px rgba(45, 212, 191, 0.3); }
        }
        .animate-power-glow {
          animation: power-glow 4s infinite linear;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default AgenticLayer;
