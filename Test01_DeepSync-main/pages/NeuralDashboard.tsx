
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Cpu, 
  Globe, 
  ShieldCheck, 
  Zap, 
  Terminal, 
  AlertTriangle, 
  RefreshCw, 
  Server,
  Workflow,
  Radio,
  Dna,
  Database
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
// Fixed: Corrected import path for useTheme
import { useTheme } from '../ThemeContext.tsx';

// --- MOCK DATA & CONSTANTS ---
const INITIAL_CHART_DATA = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  load: Math.floor(Math.random() * 20 + 30)
}));

const MESH_NODES = [
  { id: 'PHX', name: 'PHX-Primary', x: '25%', y: '45%' },
  { id: 'LDN', name: 'LDN-Edge-01', x: '50%', y: '35%' },
  { id: 'SIN', name: 'SIN-Edge-02', x: '80%', y: '60%' }
];

const RECENT_EVENTS_TEMPLATE = [
  "Shard replication parity reached in SIN-Edge-02",
  "DeepSync Vault encryption cycle verified",
  "Neural Mesh re-balancing ingress load",
  "The Constitution v3.1 consensus achieved",
  "PHX-Primary latency optimized to 0.02ms",
  "Autonomous unit 482 context updated",
  "Mesh node LDN-Edge-01 heartbeat received",
  "Vector database ingestion burst detected"
];

// --- COMPONENTS ---

const ScanlineOverlay = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03] z-50">
    <div className="w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
  </div>
);

const CircularGauge: React.FC<{ value: number; label: string }> = ({ value, label }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90">
          <circle cx="48" cy="48" r={radius} stroke="rgba(45, 212, 191, 0.1)" strokeWidth="6" fill="none" />
          <motion.circle
            cx="48"
            cy="48"
            r={radius}
            stroke="url(#gaugeGradient)"
            strokeWidth="6"
            fill="none"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut" }}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2DD4BF" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-black text-sm text-white">
          {value}%
        </div>
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
    </div>
  );
};

const MeshPulse: React.FC<{ load: number }> = ({ load }) => {
  const pulseScale = 1 + (load / 150);
  
  return (
    <div className="relative w-64 h-64 flex items-center justify-center group cursor-crosshair">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20 / pulseScale, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 border border-teal/10 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15 / pulseScale, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4 border border-indigo-500/10 rounded-full"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.1 * pulseScale, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 2 / pulseScale, repeat: Infinity }}
        className="absolute inset-0 bg-teal/20 rounded-full blur-3xl"
      />
      
      <div className="relative z-10 w-32 h-32 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl transition-transform group-hover:scale-110">
        <div className="absolute inset-0 bg-gradient-to-br from-teal/20 via-transparent to-indigo-500/20" />
        <Dna size={48} className="text-teal animate-pulse" />
      </div>

      {/* Orbiting particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ rotate: 360 }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-teal rounded-full shadow-[0_0_10px_#2DD4BF]" />
        </motion.div>
      ))}
    </div>
  );
};

const NeuralDashboard: React.FC = () => {
  const { theme } = useTheme();
  const [load, setLoad] = useState(42);
  const [chartData, setChartData] = useState(INITIAL_CHART_DATA);
  const [constitutionEnforced, setConstitutionEnforced] = useState(true);
  const [events, setEvents] = useState<{ id: number; msg: string; time: string }[]>([]);
  const [metrics, setMetrics] = useState({
    tokens: 1204859,
    shards: 3,
    latency: 0.04
  });
  
  const eventLogRef = useRef<HTMLDivElement>(null);

  // Add event helper
  const addEvent = (msg: string) => {
    const newEvent = {
      id: Date.now(),
      msg,
      time: new Date().toLocaleTimeString('en-GB', { hour12: false })
    };
    setEvents(prev => [newEvent, ...prev.slice(0, 15)]);
  };

  // Simulate periodic changes
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        tokens: prev.tokens + Math.floor(Math.random() * 1000),
        latency: Math.max(0.01, Math.min(0.08, prev.latency + (Math.random() * 0.02 - 0.01)))
      }));
      
      const randomMsg = RECENT_EVENTS_TEMPLATE[Math.floor(Math.random() * RECENT_EVENTS_TEMPLATE.length)];
      addEvent(randomMsg);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const simulateLoad = () => {
    const newLoad = Math.min(100, load + 15);
    setLoad(newLoad);
    setChartData(prev => {
      const next = [...prev.slice(1), { time: prev[prev.length - 1].time + 1, load: newLoad }];
      return next;
    });
    addEvent(`MANUAL LOAD TRIGGER: Neural throughput spike detected (${newLoad}%)`);
    
    // Cool-down simulation
    setTimeout(() => {
      setLoad(prev => Math.max(30, prev - 10));
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-inter selection:bg-teal selection:text-black relative overflow-hidden flex flex-col p-2 md:p-8">
      <ScanlineOverlay />
      
      {/* Background HUD elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(45,212,191,0.05),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 mb-12 relative z-10">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-teal/10 border border-teal/20 flex items-center justify-center text-teal relative overflow-hidden shadow-[0_0_30px_rgba(45,212,191,0.1)]">
            <div className="absolute inset-0 bg-gradient-to-br from-teal/20 to-transparent" />
            <Workflow size={32} />
          </div>
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-black font-geist tracking-tighter text-white">Neural Mission Control</h1>
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-2 px-2 py-0.5 rounded bg-teal/10 border border-teal/20 text-[8px] font-black uppercase tracking-widest text-teal">
                <Radio size={8} className="animate-pulse" /> Live Stream
              </div>
              <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">Protocol V3.1 Shard Deployment</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Constitution Protocol</p>
             <button 
              onClick={() => setConstitutionEnforced(!constitutionEnforced)}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl border transition-all ${constitutionEnforced ? 'border-teal/20 bg-teal/5 text-teal' : 'border-red-500/50 bg-red-500/10 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]'}`}
             >
               {constitutionEnforced ? <ShieldCheck size={16} /> : <AlertTriangle size={16} className="animate-pulse" />}
               <span className="text-xs font-black uppercase tracking-widest">
                 {constitutionEnforced ? 'Enforced' : 'Override Active'}
               </span>
             </button>
          </div>
          
          <button 
            onClick={simulateLoad}
            className="px-8 py-4 bg-white/5 border border-white/10 hover:border-teal/50 hover:bg-teal/10 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all flex items-center gap-3"
          >
            <Zap size={14} className="text-teal" /> Simulate Load
          </button>
        </div>
      </header>

      {/* Warning Banner */}
      <AnimatePresence>
        {!constitutionEnforced && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center justify-center gap-4">
              <AlertTriangle className="text-red-500 animate-bounce" size={20} />
              <p className="text-xs font-black text-red-500 uppercase tracking-widest animate-pulse">
                WARNING: DEPARTING FROM HUMAN CONTROL PROTOCOLS. SYSTEM INTEGRITY AT RISK.
              </p>
              <AlertTriangle className="text-red-500 animate-bounce" size={20} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 flex-1">
        
        {/* Left Column: Centerpiece & Metrics */}
        <div className="lg:col-span-8 space-y-8 flex flex-col">
          
          {/* Main Visualizer */}
          <div className="bg-slate-900/40 border border-white/5 rounded-[3rem] p-12 flex flex-col items-center justify-center relative overflow-hidden flex-1 shadow-inner">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.03),transparent_70%)]" />
             <div className="absolute top-0 left-0 p-8">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                   <span className="text-[10px] font-black uppercase text-teal tracking-[0.3em]">Mesh Heartbeat</span>
                </div>
             </div>
             
             <MeshPulse load={load} />
             
             <div className="mt-12 grid grid-cols-3 gap-16">
                <CircularGauge value={Math.round(load)} label="CPU Flux" />
                <CircularGauge value={85} label="DeepSync Sync" />
                <CircularGauge value={92} label="Vault Health" />
             </div>
          </div>

          {/* Lower Data Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Total Mesh Tokens', val: metrics.tokens.toLocaleString(), icon: Database, color: 'text-teal' },
              { label: 'Active Shards', val: metrics.shards, icon: Server, color: 'text-indigo-400' },
              { label: 'Ingress Latency', val: `${metrics.latency.toFixed(2)}ms`, icon: Activity, color: 'text-pink-500' }
            ].map((stat, i) => (
              <div key={i} className="p-8 bg-slate-900/60 border border-white/5 rounded-[2.5rem] text-left group hover:border-teal/30 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${stat.color}`}>
                    <stat.icon size={18} />
                  </div>
                  <TrendingUpIcon className="text-white/10 group-hover:text-teal/40 transition-colors" />
                </div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
                <p className="text-3xl font-black font-geist text-white tracking-tighter">{stat.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Map & Logs */}
        <div className="lg:col-span-4 space-y-8 flex flex-col">
          
          {/* Neural Map */}
          <div className="bg-slate-900/60 border border-white/5 rounded-[3rem] p-8 text-left h-[300px] relative overflow-hidden">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
                  <Globe size={14} className="text-teal" /> Global Presence
                </h3>
                <span className="text-[9px] font-black text-teal uppercase tracking-widest bg-teal/10 px-2 py-0.5 rounded">All Nodes Active</span>
             </div>
             
             <div className="relative w-full h-40 bg-white/[0.02] rounded-2xl border border-white/5">
                {/* Simplified Map Visualization */}
                {MESH_NODES.map((node) => (
                  <motion.div
                    key={node.id}
                    style={{ left: node.x, top: node.y }}
                    className="absolute"
                  >
                    <div className="relative flex flex-col items-center">
                      <motion.div 
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute w-6 h-6 bg-teal rounded-full -translate-y-1"
                      />
                      <div className="w-2 h-2 bg-teal rounded-full shadow-[0_0_10px_#2DD4BF] z-10" />
                      <span className="text-[8px] font-black text-slate-500 uppercase mt-2">{node.name}</span>
                    </div>
                  </motion.div>
                ))}
                
                {/* Connection lines (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                  <line x1="25%" y1="45%" x2="50%" y2="35%" stroke="#2DD4BF" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="50%" y1="35%" x2="80%" y2="60%" stroke="#2DD4BF" strokeWidth="1" strokeDasharray="4 4" />
                </svg>
             </div>

             <div className="mt-6 flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                <span className="text-slate-500">Network Topology</span>
                <span className="text-teal">Mesh Active</span>
             </div>
          </div>

          {/* Load Chart */}
          <div className="bg-slate-900/60 border border-white/5 rounded-[3rem] p-8 text-left flex-1 flex flex-col">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2 mb-8">
              <Activity size={14} className="text-teal" /> Neural Load Spectrum
            </h3>
            <div className="flex-1 w-full min-h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="loadGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2DD4BF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2DD4BF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="load" 
                    stroke="#2DD4BF" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#loadGradient)" 
                    animationDuration={1000}
                  />
                  <XAxis hide />
                  <YAxis hide domain={[0, 100]} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Events Log */}
          <div className="bg-black/40 border border-white/5 rounded-[3rem] p-8 text-left h-[250px] flex flex-col">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2 mb-6">
              <Terminal size={14} className="text-teal" /> DeepSync Audit Stream
            </h3>
            <div 
              className="flex-1 overflow-y-auto no-scrollbar space-y-3 font-mono text-[10px]"
              ref={eventLogRef}
            >
              <AnimatePresence initial={false}>
                {events.map((event) => (
                  <motion.div 
                    key={event.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-3 group"
                  >
                    <span className="text-slate-600 whitespace-nowrap">[{event.time}]</span>
                    <span className="text-teal/60 uppercase">info</span>
                    <span className="text-slate-400 group-hover:text-white transition-colors">{event.msg}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div className="text-teal/40 animate-pulse">> listening for mesh signals...</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .font-geist { font-family: 'Geist Sans', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

const TrendingUpIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    width="20" 
    height="20"
  >
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

export default NeuralDashboard;
