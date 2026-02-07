
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Cpu, Mic, Activity, AlertCircle, RefreshCw } from 'lucide-react';
import SkillConfigurator from '../components/SkillConfigurator';

const VoiceFuelGauge: React.FC = () => {
  const [usage, setUsage] = useState(642);
  const [isActive, setIsActive] = useState(false);
  const maxMinutes = 1000;
  const percentage = (usage / maxMinutes) * 100;

  // Simulate active session pulse
  useEffect(() => {
    const timer = setInterval(() => {
      setIsActive(prev => !prev);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const getGaugeColor = () => {
    if (percentage > 90) return 'text-red-500';
    if (percentage > 75) return 'text-orange-400';
    return 'text-teal';
  };

  const getBgColor = () => {
    if (percentage > 90) return 'bg-red-500';
    if (percentage > 75) return 'bg-orange-400';
    return 'bg-teal';
  };

  return (
    <div className={`p-8 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[3rem] shadow-xl glass-card text-left transition-all duration-500 ${isActive ? 'ring-2 ring-teal/20 shadow-[0_0_30px_rgba(45,212,191,0.1)]' : ''}`}>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-black font-geist text-slate-900 dark:text-white uppercase flex items-center gap-3">
            <Mic className={`${isActive ? 'animate-pulse text-teal' : 'text-slate-400'}`} size={20} /> Voice Fuel Gauge
          </h3>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Multi-Tenant Quota Monitor</p>
        </div>
        <div className="text-right">
          <span className={`text-2xl font-black font-geist ${getGaugeColor()}`}>{usage}</span>
          <span className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase ml-1">/ {maxMinutes}m</span>
        </div>
      </div>

      {/* Circular Progress (SVG) alternative or stay with bar for UI consistency */}
      <div className="h-4 w-full bg-slate-100 dark:bg-void rounded-full overflow-hidden border border-white/5 p-1 relative">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          className={`h-full rounded-full transition-colors duration-500 ${getBgColor()} ${isActive ? 'shadow-[0_0_15px_rgba(45,212,191,0.5)]' : ''}`}
        />
        {isActive && (
          <motion.div 
            animate={{ opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 bg-white"
          />
        )}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-teal animate-pulse' : 'bg-slate-400'}`} />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {isActive ? 'Session Active: Pulsing' : 'Ingress Protocol: Standby'}
          </span>
        </div>
        <button className="text-[10px] font-black text-slate-400 hover:text-teal uppercase tracking-widest transition-colors flex items-center gap-1">
          <RefreshCw size={12} /> Rotate Keys
        </button>
      </div>

      {percentage > 90 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500"
        >
          <AlertCircle size={16} />
          <p className="text-[10px] font-black uppercase tracking-widest">Kill Switch Imminent: Approaching Quota</p>
        </motion.div>
      )}
    </div>
  );
};

const NeuralAbilities: React.FC = () => {
  return (
    <div className="space-y-12 p-2 text-left">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black font-geist tracking-tighter mb-2 text-slate-900 dark:text-white flex items-center gap-4">
            <Zap className="text-teal" size={32} /> Neural Abilities
          </h1>
          <p className="text-slate-500 dark:text-white/40 font-medium italic">Configure and authorize autonomous capabilities across the Neural Mesh.</p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center gap-2">
            <Cpu className="text-purple-500" size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest text-purple-500">
              Hot-Swap Enabled
            </span>
          </div>
          <div className="px-4 py-2 bg-teal/10 border border-teal/20 rounded-xl flex items-center gap-2">
            <ShieldCheck className="text-teal" size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest text-teal">
              Vault Verified
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
           <div className="p-8 bg-slate-900 dark:bg-black rounded-[3rem] border border-white/5 text-left">
              <h4 className="text-[10px] font-black text-teal uppercase tracking-widest mb-6 flex items-center gap-2">
                <Activity size={14} /> LiveKit Protocol v4
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Node Latency</span>
                  <span className="font-bold">14ms</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Scoped Namespace</span>
                  <span className="font-mono text-[9px] text-teal">user_9921_*</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Encryption</span>
                  <span className="font-bold">E2EE Active</span>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralAbilities;
