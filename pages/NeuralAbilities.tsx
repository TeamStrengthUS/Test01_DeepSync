
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Cpu, Mic, Activity, AlertCircle, RefreshCw, Fuel } from 'lucide-react';
import SkillConfigurator from '../components/SkillConfigurator.tsx';

const VoiceFuelGauge: React.FC = () => {
  const [usage, setUsage] = useState(450);
  const [isActive, setIsActive] = useState(false);
  const maxMinutes = 1000;
  const percentage = (usage / maxMinutes) * 100;
  
  // Requirement: If usage < 75%, stroke is teal-500 (Safe). If > 90%, stroke is red-500 (Critical).
  const strokeColor = percentage > 90 ? '#ef4444' : percentage > 75 ? '#f97316' : '#2dd4bf';
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  // Simulate active session pulse
  useEffect(() => {
    const timer = setInterval(() => {
      setIsActive(prev => !prev);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`p-10 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[3rem] shadow-xl glass-card text-center transition-all duration-500 relative flex flex-col items-center ${isActive ? 'ring-2 ring-teal/20 shadow-[0_0_40px_rgba(45,212,191,0.1)]' : ''}`}>
      <div className="absolute top-6 left-8 flex items-center gap-2">
         <Fuel size={14} className="text-slate-400" />
         <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Voice Fuel Gauge</span>
      </div>

      <div className="relative w-48 h-48 mt-8 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-slate-100 dark:text-white/5"
          />
          <motion.circle
            cx="96"
            cy="96"
            r={radius}
            stroke={strokeColor}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ 
              strokeDashoffset: offset,
              opacity: isActive ? [0.6, 1, 0.6] : 1
            }}
            transition={{ 
              strokeDashoffset: { duration: 2, ease: "easeOut" },
              opacity: { duration: 1.5, repeat: Infinity }
            }}
            strokeLinecap="round"
            className={isActive ? 'animate-pulse' : ''}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black font-geist text-slate-900 dark:text-white tabular-nums tracking-tighter">
            {usage}
          </span>
          <span className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-widest mt-1">/ {maxMinutes} min</span>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-teal animate-pulse' : 'bg-slate-400'}`} />
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          {isActive ? 'Session: Active (Pulsing)' : 'Mesh Status: Standby'}
        </span>
      </div>

      {percentage > 90 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 w-full"
        >
          <AlertCircle size={16} />
          <p className="text-[9px] font-black uppercase tracking-widest text-left">CRITICAL: FUEL DEPLETION IMMINENT</p>
        </motion.div>
      )}

      <button className="mt-8 w-full py-4 border border-slate-100 dark:border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-teal hover:border-teal/30 transition-all flex items-center justify-center gap-2">
        <RefreshCw size={12} /> Refill Ingress Credits
      </button>
    </div>
  );
};

const NeuralAbilities: React.FC = () => {
  return (
    <div className="space-y-12 p-2 text-left">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black font-geist tracking-tighter mb-2 text-slate-900 dark:text-white flex items-center gap-4">
            <Zap className="text-teal" size={32} /> Neural Mesh Capabilities
          </h1>
          <p className="text-slate-500 dark:text-white/40 font-medium italic">Enforce global quotas and skills routing for Omni-Nodes.</p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center gap-2">
            <Cpu className="text-purple-500" size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest text-purple-500">
              Edge Hot-Swap Active
            </span>
          </div>
          <div className="px-4 py-2 bg-teal/10 border border-teal/20 rounded-xl flex items-center gap-2">
            <ShieldCheck className="text-teal" size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest text-teal">
              Vault Sovereignty: OK
            </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-8">
           <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-teal/5 via-transparent to-transparent pointer-events-none rounded-[3rem]" />
            <SkillConfigurator />
          </div>
        </div>
        <div className="xl:col-span-4 space-y-8">
           <VoiceFuelGauge />
           <div className="p-10 bg-slate-900 dark:bg-black rounded-[3rem] border border-white/5 text-left glass-card">
              <h4 className="text-[10px] font-black text-teal uppercase tracking-widest mb-6 flex items-center gap-2">
                <Activity size={14} /> Telemetry Metrics
              </h4>
              <div className="space-y-6">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Node Jitter</span>
                  <span className="font-mono text-teal">0.02ms</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Active Streams</span>
                  <span className="font-mono text-white">4 active</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Packet Loss</span>
                  <span className="font-mono text-white">0.00%</span>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralAbilities;
