
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Mic, 
  Activity, 
  AlertCircle, 
  RefreshCw, 
  Fuel, 
  Terminal, 
  Search, 
  Calculator, 
  Clock,
  Shield,
  Info,
  Lock
} from 'lucide-react';
import { useTheme } from '../ThemeContext.tsx';

type RiskLevel = 'Safe' | 'Audited' | 'Restricted';

interface Capability {
  id: string;
  name: string;
  desc: string;
  icon: any;
  risk: RiskLevel;
  tooltip: string;
  consumesFuel?: boolean;
}

const CAPABILITIES: Capability[] = [
  {
    id: 'calculator',
    name: 'Logic Calculator',
    desc: 'Perform high-precision mathematical operations locally.',
    icon: Calculator,
    risk: 'Safe',
    tooltip: 'Standard operation. No data egress required.'
  },
  {
    id: 'time',
    name: 'Temporal Sync',
    desc: 'Synchronize agent timezone and scheduling protocols.',
    icon: Clock,
    risk: 'Safe',
    tooltip: 'Standard operation. Predictable behavior.'
  },
  {
    id: 'search',
    name: 'Neural Web Search',
    desc: 'Query the global mesh for real-time information.',
    icon: Search,
    risk: 'Audited',
    tooltip: 'All search queries are logged to DeepSync Vault for audit.'
  },
  {
    id: 'voice',
    name: 'Voice Mode',
    desc: 'Low-latency vocal interaction protocol via LiveKit.',
    icon: Mic,
    risk: 'Audited',
    consumesFuel: true,
    tooltip: 'All vocal interactions are recorded and stored in the Vault.'
  },
  {
    id: 'bash',
    name: 'Terminal / Bash',
    desc: 'Execute system commands within the node sandbox.',
    icon: Terminal,
    risk: 'Restricted',
    tooltip: 'Requires strict adherence to Constitution. Dangerous commands will trigger a Security Strike.'
  },
  {
    id: 'mesh_tools',
    name: 'Mesh Integrations',
    desc: 'Bridge communication across Slack, Discord, and Telegram.',
    icon: Cpu,
    risk: 'Restricted',
    tooltip: 'Cross-mesh data movement is strictly monitored by the Overwatch HUD.'
  }
];

const RiskBadge: React.FC<{ level: RiskLevel }> = ({ level }) => {
  const styles = {
    Safe: 'bg-green-500/10 text-green-500 border-green-500/20',
    Audited: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    Restricted: 'bg-red-500/10 text-red-500 border-red-500/20'
  };

  return (
    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${styles[level]}`}>
      {level}
    </span>
  );
};

const CapabilityCard: React.FC<{ 
  cap: Capability; 
  fuelUsage: number;
  isActive: boolean;
  onToggle: () => void;
}> = ({ cap, fuelUsage, isActive, onToggle }) => {
  const isQuotaExceeded = cap.consumesFuel && fuelUsage >= 1000;
  const isLocked = isQuotaExceeded;

  return (
    <div className={`relative group p-8 rounded-[2.5rem] border transition-all duration-500 flex flex-col h-full overflow-hidden glass-card ${
      isLocked ? 'opacity-40 grayscale pointer-events-none' : 
      isActive ? 'border-teal/40 bg-teal/5 shadow-[0_0_40px_rgba(45,212,191,0.1)]' : 'border-slate-200 dark:border-white/5 hover:border-teal/20'
    }`}>
      {/* Power Glow for active items */}
      {isActive && !isLocked && (
        <motion.div 
          layoutId={`glow-${cap.id}`}
          className="absolute inset-0 iridescent-gradient opacity-[0.03] pointer-events-none"
        />
      )}

      {/* Quota Exceeded Stamp */}
      {isQuotaExceeded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center rotate-[-12deg]">
          <div className="border-4 border-red-500 text-red-500 font-black uppercase text-xl px-4 py-2 rounded-xl scale-125 opacity-80">
            Quota Exceeded
          </div>
        </div>
      )}

      <div className="flex justify-between items-start mb-6">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${
          isActive ? 'bg-teal/10 border-teal/20 text-teal' : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400'
        }`}>
          <cap.icon size={24} />
        </div>
        <div className="flex flex-col items-end gap-2">
          <RiskBadge level={cap.risk} />
          {cap.consumesFuel && (
            <span className="text-[7px] font-black text-slate-400 uppercase tracking-tighter flex items-center gap-1">
              <Fuel size={8} className="text-teal" /> Fuel Consumed
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 text-left">
        <h3 className="text-lg font-black font-geist text-slate-900 dark:text-white uppercase mb-2 group-hover:text-teal transition-colors">{cap.name}</h3>
        <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed font-medium mb-6">{cap.desc}</p>
      </div>

      <div className="mt-auto space-y-4 pt-6 border-t border-slate-100 dark:border-white/5">
        <div className="flex items-start gap-2 p-3 bg-slate-50 dark:bg-black/40 rounded-xl">
          <Info size={12} className="text-teal shrink-0 mt-0.5" />
          <p className="text-[10px] text-slate-500 dark:text-white/30 font-medium leading-relaxed italic">
            {cap.tooltip}
          </p>
        </div>

        {cap.consumesFuel && (
          <div className="p-3 bg-teal/5 border border-teal/20 rounded-xl flex items-center justify-between">
            <span className="text-[9px] font-black text-teal uppercase tracking-widest">Neural Voice Fuel</span>
            <span className="text-[9px] font-mono text-white/60">{fuelUsage} / 1000m</span>
          </div>
        )}

        <button 
          onClick={onToggle}
          className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
            isActive ? 'bg-teal text-black shadow-lg' : 'bg-slate-900 dark:bg-white/5 text-white hover:bg-teal hover:text-black'
          }`}
        >
          {isActive ? 'Deactivate Ability' : 'Authorize Protocol'}
        </button>
      </div>
    </div>
  );
};

const NeuralAbilities: React.FC = () => {
  const [activeCaps, setActiveCaps] = useState<string[]>(['calculator', 'time', 'search']);
  const [fuelUsage, setFuelUsage] = useState(1000); // Set to 1000 to demonstrate quota exceeded state

  const toggleCap = (id: string) => {
    setActiveCaps(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-12 p-2 text-left relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal/5 blur-[120px] rounded-full pointer-events-none" />
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-8 bg-teal" />
            <span className="text-teal font-black tracking-[0.4em] uppercase text-[10px]">Governance v3.1</span>
          </div>
          <h1 className="text-5xl font-black font-geist tracking-tighter text-slate-900 dark:text-white">
            Operational Capabilities <span className="text-teal italic">Matrix.</span>
          </h1>
          <p className="text-slate-500 dark:text-white/40 font-medium mt-2 max-w-xl">
            Authorize and audit high-performance abilities across your Neural Mesh. 
            All actions are logged to the DeepSync Vault under IHL compliance protocols.
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-4">
          <div className="px-6 py-4 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-3xl flex items-center gap-6 shadow-xl">
             <div className="text-right">
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Neural Fuel</p>
                <p className={`text-lg font-black font-geist ${fuelUsage >= 1000 ? 'text-red-500' : 'text-teal'}`}>
                  {fuelUsage}m <span className="text-xs text-slate-400 font-medium">/ 1000m</span>
                </p>
             </div>
             <div className="w-px h-8 bg-slate-200 dark:bg-white/10" />
             <div className="text-center">
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Active Skills</p>
                <p className="text-lg font-black font-geist text-white">{activeCaps.length}</p>
             </div>
          </div>
          <button 
            onClick={() => setFuelUsage(usage => usage === 1000 ? 450 : 1000)}
            className="text-[9px] font-black text-teal uppercase tracking-widest hover:underline"
          >
            [DEBUG: Toggle Quota State]
          </button>
        </div>
      </header>

      {/* Matrix Tactical Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {CAPABILITIES.map(cap => (
          <CapabilityCard 
            key={cap.id} 
            cap={cap} 
            fuelUsage={fuelUsage}
            isActive={activeCaps.includes(cap.id)}
            onToggle={() => toggleCap(cap.id)}
          />
        ))}
      </div>

      <div className="mt-16 p-12 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[4rem] flex flex-col md:flex-row items-center justify-between gap-12 group transition-all text-left glass-card relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 text-teal/5 group-hover:text-teal/10 transition-colors pointer-events-none">
          <Shield size={180} strokeWidth={1} />
        </div>
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/10 text-teal text-[10px] font-black uppercase tracking-widest mb-6">
            <ShieldCheck size={12} /> The Constitution Protocol
          </div>
          <h2 className="text-3xl font-black font-geist tracking-tighter mb-4 text-slate-900 dark:text-white uppercase">Meaningful Human Control</h2>
          <p className="text-slate-500 dark:text-white/40 text-lg font-medium leading-relaxed">
            All capabilities operate within the "Constitution Sandbox." Automated monitors prevent unauthorized data egress and non-compliant commands. 
            If a security boundary is breached, the Neural Kill Switch is triggered immediately.
          </p>
        </div>
        <button className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-black rounded-2xl hover:bg-teal dark:hover:bg-teal transition-all shadow-xl whitespace-nowrap">
          View Governance Ledger
        </button>
      </div>

      <style>{`
        .glass-card {
          background: rgba(10, 10, 15, 0.7);
          backdrop-filter: blur(24px);
        }
      `}</style>
    </div>
  );
};

export default NeuralAbilities;
