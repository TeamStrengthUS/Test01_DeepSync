
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  Activity, 
  TrendingUp, 
  ArrowUpRight, 
  Zap, 
  Cpu, 
  Globe, 
  Terminal,
  Database,
  Layers,
  ShieldCheck,
  RefreshCw,
  Server,
  Workflow,
  X,
  Maximize2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ComposedChart,
  Line
} from 'recharts';
// Fixed: Corrected import path for useTheme
import { useTheme } from '../ThemeContext.tsx';

// --- MOCK DATA ---
const revenueData = [
  { name: 'Mon', actual: 4000, projected: 4000 },
  { name: 'Tue', actual: 3200, projected: 3300 },
  { name: 'Wed', actual: 4500, projected: 4200 },
  { name: 'Thu', actual: 4800, projected: 5000 },
  { name: 'Fri', actual: 5900, projected: 5500 },
  { name: 'Sat', actual: 7200, projected: 6800 },
  { name: 'Sun', actual: 8100, projected: 7500 },
  { name: 'Next Mon', actual: null, projected: 8500 },
];

const funnelData = [
  { stage: 'DeepSync Vault Ingestion', value: 100, color: 'rgba(45, 212, 191, 0.1)' },
  { stage: 'Neural Mesh Logic Sync', value: 85, color: 'rgba(45, 212, 191, 0.3)' },
  { stage: 'Team IQ Refinement', value: 65, color: 'rgba(45, 212, 191, 0.6)' },
  { stage: 'Agentic Layer Dispatch', value: 42, color: '#2DD4BF' },
];

const heatmapData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  value: Math.floor(Math.random() * 80 + 20),
}));

const LOG_MESSAGES = [
  { type: 'VAULT', msg: 'Parquet partitions verified in DeepSync-S3' },
  { type: 'MESH', msg: 'Neural Mesh edge replication triggered' },
  { type: 'PROTOCOL', msg: 'The Constitution v3.1 successfully synced' },
  { type: 'AGENT', msg: 'Predictive model pulling from Team IQ Node' },
  { type: 'SYNC', msg: 'DeepSync Vault consistency: PASSED' },
  { type: 'NODE', msg: 'Team IQ Node at 98% cognitive parity' },
  { type: 'CORE', msg: 'Neural mesh throughput re-balanced' },
  { type: 'GLOW', msg: 'Power Glow visual state active: 100%' },
];

const generateLogs = () => {
  const now = new Date();
  return Array.from({ length: 12 }, (_, i) => {
    const log = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
    const time = new Date(now.getTime() - (i * 15000));
    return {
      id: Math.random(),
      type: log.type,
      msg: log.msg,
      time: time.toLocaleTimeString('en-GB', { hour12: false })
    };
  });
};

const DashboardCard: React.FC<{ 
  title: string; 
  subtitle?: string; 
  icon?: any;
  children: React.ReactNode; 
  className?: string;
  variant?: 'glass' | 'solid' | 'void';
  onRefresh?: () => void;
  onExpand?: () => void;
  isRefreshing?: boolean;
}> = ({ title, subtitle, icon: Icon, children, className = "", variant = 'glass', onRefresh, onExpand, isRefreshing }) => {
  const backgrounds = {
    glass: 'bg-white/80 dark:bg-surface/60 backdrop-blur-xl',
    solid: 'bg-white dark:bg-surface',
    void: 'bg-slate-900 dark:bg-black',
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${backgrounds[variant]} border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 shadow-2xl dark:shadow-none relative overflow-hidden group ${className}`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4 text-left">
          {Icon && (
            <div className="w-10 h-10 rounded-xl bg-teal/5 border border-teal/10 flex items-center justify-center text-teal">
              <Icon size={18} />
            </div>
          )}
          <div>
            <h3 className="text-lg font-black font-geist tracking-tight text-slate-900 dark:text-white uppercase">{title}</h3>
            {subtitle && <p className="text-[10px] text-slate-400 dark:text-white/30 font-black uppercase tracking-[0.2em]">{subtitle}</p>}
          </div>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={onRefresh}
             disabled={isRefreshing}
             className="p-2 rounded-lg hover:bg-teal/10 text-slate-300 transition-colors disabled:opacity-50"
             title="Refresh Telemetry"
           >
              <RefreshCw size={14} className={`${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-700'}`} />
           </button>
           <button 
             onClick={onExpand}
             className="p-2 rounded-lg hover:bg-teal/10 text-slate-300 transition-colors"
             title="Expand View"
           >
              <ArrowUpRight size={14} />
           </button>
        </div>
      </div>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

const DeepSync: React.FC = () => {
  const { theme } = useTheme();
  const [logs, setLogs] = useState(generateLogs());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleRefreshLogs = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLogs(generateLogs());
      setIsRefreshing(false);
    }, 800);
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  useEffect(() => {
    const interval = setInterval(() => {
      const log = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
      const newLog = {
        id: Math.random(),
        type: log.type,
        msg: log.msg,
        time: new Date().toLocaleTimeString('en-GB', { hour12: false })
      };
      setLogs(prev => [newLog, ...prev.slice(0, 24)]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-lightSurface dark:bg-void text-slate-900 dark:text-white transition-colors duration-300 relative overflow-hidden selection:bg-teal selection:text-black">
      <Navbar />
      
      {/* HUD Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(45,212,191,0.05),transparent_70%)] pointer-events-none" />

      <main className="pt-48 pb-32 px-6 container mx-auto max-w-[1600px] relative z-10">
        
        {/* Header HUD */}
        <div className="flex flex-col xl:flex-row justify-between items-end gap-12 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="max-w-4xl text-left"
          >
            <div className="flex items-center gap-3 mb-6">
               <div className="h-px w-12 bg-teal" />
               <span className="text-teal font-black tracking-[0.4em] uppercase text-[10px]">NEURAL MESH ACTIVE</span>
            </div>
            <h1 className="text-7xl md:text-8xl font-black font-geist tracking-tighter mb-6 leading-none text-slate-900 dark:text-white">
              TeamStrength <br />
              <span className="iridescent-gradient bg-clip-text text-transparent italic">DeepSync.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 dark:text-white/40 font-medium max-w-2xl">
              Fusing the scale of the DeepSync Vault with the reliability of a high-performance mesh. 
              Sub-second synchronization for the agentic era.
            </p>
          </motion.div>

          <div className="flex items-center gap-6 p-6 bg-white/50 dark:bg-surface/50 backdrop-blur-3xl border border-slate-200 dark:border-white/5 rounded-3xl">
             <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-teal rounded-full animate-pulse shadow-[0_0_10px_#2DD4BF]" />
                <span className="text-[10px] font-black uppercase tracking-widest">Neural Mesh Online</span>
             </div>
             <div className="w-px h-8 bg-slate-200 dark:bg-white/10" />
             <div className="text-right">
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Sync Rate</p>
                <p className="text-lg font-black font-geist">4.2 GB/s</p>
             </div>
          </div>
        </div>

        {/* BENTO HUD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          {/* Main Chart */}
          <DashboardCard 
            title="Intelligence Flux" 
            subtitle="DeepSync Latency vs Throughput"
            icon={Workflow}
            className="lg:col-span-8 lg:row-span-2 min-h-[600px]"
          >
            <div className="h-[400px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2DD4BF" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#2DD4BF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)', fontSize: 10, fontWeight: 700 }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)', fontSize: 10, fontWeight: 700 }} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: '#0A0A0F', 
                      border: '1px solid rgba(255,255,255,0.05)', 
                      borderRadius: '20px', 
                      padding: '20px'
                    }}
                    itemStyle={{ color: '#2DD4BF', fontWeight: '900', textTransform: 'uppercase', fontSize: '10px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#2DD4BF" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorActual)" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="projected" 
                    stroke="#7928CA" 
                    strokeWidth={2} 
                    strokeDasharray="8 8" 
                    dot={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-slate-100 dark:border-white/5 text-left">
               {[
                 { label: 'Vault Volume', val: '1.2 PB', sub: 'DeepSync State', color: 'text-teal' },
                 { label: 'Mesh Jitter', val: '0.04ms', sub: 'Neural Mesh sync', color: 'text-purple-500' },
                 { label: 'Team IQ Load', val: '14%', sub: 'Optimized Logic', color: 'text-white' },
                 { label: 'Sovereignty', val: '100%', sub: 'Private Node', color: 'text-teal' }
               ].map((stat, i) => (
                 <div key={i}>
                    <p className="text-[10px] text-slate-400 dark:text-white/20 font-black uppercase tracking-widest mb-2">{stat.label}</p>
                    <p className={`text-2xl font-black font-geist ${stat.color}`}>{stat.val}</p>
                    <p className="text-[9px] text-slate-400 uppercase font-bold">{stat.sub}</p>
                 </div>
               ))}
            </div>
          </DashboardCard>

          {/* DeepSync Architecture Funnel */}
          <DashboardCard 
            title="Mesh Protocols" 
            subtitle="DeepSync Refinement Stages"
            icon={Layers}
            className="lg:col-span-4"
          >
            <div className="space-y-4 mt-4">
              {funnelData.map((stage, i) => (
                <div key={stage.stage} className="relative">
                  <div className="flex justify-between items-center mb-1.5 px-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/40">{stage.stage}</span>
                    <span className="text-xs font-black text-white">{stage.value}%</span>
                  </div>
                  <div className="h-8 w-full bg-slate-100 dark:bg-white/5 rounded-xl overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stage.value}%` }}
                      transition={{ duration: 1.5, delay: i * 0.1 }}
                      className="h-full rounded-xl"
                      style={{ backgroundColor: stage.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-void rounded-2xl border border-white/5 text-left">
               <div className="flex items-center gap-4 mb-4">
                  <Database size={24} className="text-teal" />
                  <h4 className="text-sm font-black uppercase tracking-widest">State Vault</h4>
               </div>
               <p className="text-xs text-slate-500 dark:text-white/40 font-medium">
                 Our DeepSync architecture eliminates memory silos, allowing agents to query raw interaction telemetry and Team IQ in a single transaction.
               </p>
            </div>
          </DashboardCard>

          {/* Activity Grid */}
          <DashboardCard 
            title="Node Health Matrix" 
            subtitle="Neural Mesh Consistency"
            icon={Activity}
            className="lg:col-span-4"
          >
             <div className="grid grid-cols-6 gap-2 mt-4">
               {heatmapData.map((d) => (
                 <motion.div 
                   key={d.day}
                   whileHover={{ scale: 1.1 }}
                   className="aspect-square rounded-md border border-white/5 cursor-crosshair"
                   style={{ backgroundColor: `rgba(45, 212, 191, ${d.value / 100})` }}
                 />
               ))}
             </div>
             <div className="mt-8 flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                <span>Idle Node</span>
                <span>Active Mesh</span>
             </div>
          </DashboardCard>

          {/* Logs Terminal */}
          <DashboardCard 
            title="Mesh Telemetry" 
            subtitle="DeepSync Real-time Thread"
            icon={Terminal}
            className="lg:col-span-4"
            variant="void"
            onRefresh={handleRefreshLogs}
            onExpand={toggleExpand}
            isRefreshing={isRefreshing}
          >
            <div className="space-y-4 font-mono text-[10px] mt-2 h-[280px] overflow-y-auto no-scrollbar text-left relative">
               <AnimatePresence mode="popLayout">
                 {isRefreshing ? (
                   <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-20"
                   >
                     <RefreshCw size={24} className="text-teal animate-spin mb-4" />
                     <span className="text-teal font-black tracking-widest animate-pulse">RE-INITIALIZING NODES...</span>
                   </motion.div>
                 ) : null}
               </AnimatePresence>

               {logs.map(log => (
                 <motion.div 
                   key={log.id} 
                   layout
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="flex items-start gap-3 group"
                 >
                   <span className="text-white/20">[{log.time}]</span>
                   <span className="text-teal font-black">[{log.type}]</span>
                   <span className="text-white/60 group-hover:text-white transition-colors">{log.msg}</span>
                 </motion.div>
               ))}
               <div className="flex items-center gap-2 animate-pulse text-teal mt-4">
                 <span>></span>
                 <span className="font-black italic underline">SYNCHRONIZING NEURAL MESH NODES...</span>
               </div>
            </div>
          </DashboardCard>

          {/* Residency */}
          <DashboardCard 
            title="Mesh Residency" 
            subtitle="Global DeepSync Replication"
            icon={Globe}
            className="lg:col-span-8"
          >
             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 text-left">
                {[
                  { node: 'PHX-VAULT', lat: '2ms', status: 'optimal' },
                  { node: 'LDN-NODE', lat: '14ms', status: 'active' },
                  { node: 'SIN-NODE', lat: '32ms', status: 'active' },
                  { node: 'SYD-EDGE', lat: '50ms', status: 'standby' }
                ].map((node, i) => (
                  <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-3xl hover:border-teal/30 transition-all">
                     <p className="text-[10px] font-black text-slate-400 uppercase mb-4">{node.node}</p>
                     <p className="text-2xl font-black font-geist text-white">{node.lat}</p>
                     <p className="text-[9px] text-teal font-black uppercase mt-1 tracking-widest">{node.status}</p>
                  </div>
                ))}
             </div>
          </DashboardCard>
        </div>

        {/* Informational Cards */}
        <section className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          <div className="p-16 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[4rem] relative overflow-hidden group shadow-2xl">
             <div className="absolute top-0 right-0 p-12 text-teal/5 group-hover:text-teal/10 transition-colors pointer-events-none">
                <Server size={200} strokeWidth={1} />
             </div>
             <h2 className="text-4xl font-black font-geist tracking-tighter mb-6 text-slate-900 dark:text-white">Unified DeepSync Vault.</h2>
             <p className="text-lg text-slate-500 dark:text-white/40 font-medium leading-relaxed mb-8">
               TeamStrength DeepSync is built on high-availability processing nodes. We eliminate the need for separate ETL processes by providing a unified memory layer where agents can access both high-velocity streaming telemetry and Team IQ instantly.
             </p>
             <button className="flex items-center gap-3 text-teal font-black uppercase tracking-widest text-xs group">
               Explore Neural Mesh <ArrowUpRight size={16} className="group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
          
          <div className="p-16 iridescent-gradient rounded-[4rem] flex flex-col justify-center shadow-[0_0_100px_rgba(45,212,191,0.2)]">
             <h2 className="text-4xl font-black text-black font-geist tracking-tighter mb-4">Initialize DeepSync.</h2>
             <p className="text-black/60 font-bold mb-10 max-w-sm leading-relaxed">
               Bridge your team's state memory with actionable intelligence. Deploy a custom DeepSync node in under 4 minutes.
             </p>
             <button className="w-fit px-10 py-5 bg-black text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform shadow-2xl">
               Activate Protocol
             </button>
          </div>
        </section>
      </main>

      {/* EXPANDED MODAL OVERLAY */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-void/90 backdrop-blur-2xl z-[100] flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="w-full max-w-5xl h-[80vh] bg-surface border border-white/10 rounded-[4rem] relative flex flex-col overflow-hidden shadow-[0_0_100px_rgba(45,212,191,0.1)]"
            >
              {/* Modal Header */}
              <div className="p-12 border-b border-white/5 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-3xl bg-teal/5 border border-teal/10 flex items-center justify-center text-teal">
                    <Terminal size={32} />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black font-geist tracking-tighter text-white">Full-Spectrum Telemetry</h2>
                    <p className="text-sm font-black text-teal uppercase tracking-widest">Neural Mesh Expansion v3.1</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={handleRefreshLogs}
                    className="flex items-center gap-3 px-6 py-4 bg-white/5 hover:bg-teal hover:text-black rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} /> Force Sync
                  </button>
                  <button 
                    onClick={toggleExpand}
                    className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white/40 hover:text-white transition-all"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-12 font-mono text-sm space-y-6 custom-scrollbar text-left relative">
                 <AnimatePresence mode="popLayout">
                   {isRefreshing ? (
                     <motion.div 
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       exit={{ opacity: 0 }}
                       className="absolute inset-0 flex flex-col items-center justify-center bg-surface/80 backdrop-blur-sm z-20"
                     >
                       <RefreshCw size={48} className="text-teal animate-spin mb-8" />
                       <span className="text-2xl font-black text-teal tracking-[0.2em] animate-pulse">RECONSTRUCTING MESH NODES...</span>
                     </motion.div>
                   ) : null}
                 </AnimatePresence>

                 {logs.concat(generateLogs()).map((log, idx) => (
                   <motion.div 
                     key={log.id + idx} 
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: idx * 0.02 }}
                     className="flex items-start gap-6 group py-2 border-b border-white/[0.02]"
                   >
                     <span className="text-white/20 whitespace-nowrap">[{log.time}]</span>
                     <span className="text-teal font-black whitespace-nowrap">[{log.type.padEnd(9)}]</span>
                     <span className="text-white/60 group-hover:text-white transition-colors">{log.msg}</span>
                     <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] text-white/10 uppercase font-black">Verified Mesh ID: {Math.floor(Math.random() * 999)}</span>
                     </div>
                   </motion.div>
                 ))}
                 
                 <div className="flex items-center gap-4 text-teal animate-pulse py-12">
                   <div className="w-2 h-2 rounded-full bg-teal" />
                   <span className="font-black italic text-xl">LISTENING FOR RAW NEURAL TELEMETRY...</span>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(45,212,191,0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(45,212,191,0.4);
        }
      `}</style>
    </div>
  );
};

export default DeepSync;
