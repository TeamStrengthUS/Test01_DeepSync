
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar.tsx';
import Footer from '../components/Footer.tsx';
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
import { useTheme } from '../ThemeContext.tsx';

const data = [
  { name: '00:00', value: 400 },
  { name: '04:00', value: 600 },
  { name: '08:00', value: 300 },
  { name: '12:00', value: 900 },
  { name: '16:00', value: 500 },
  { name: '20:00', value: 800 },
  { name: '23:59', value: 1000 },
];

/**
 * RealtimeAnalytics: Sub-second telemetry visualization page.
 */
const RealtimeAnalytics: React.FC = () => {
  const { theme } = useTheme();

  // Fix: Providing full implementation and default export
  return (
    <div className="min-h-screen bg-lightSurface dark:bg-void text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <main className="pt-48 pb-32 px-6 container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal/20 bg-teal/5 text-teal text-[10px] font-black tracking-widest uppercase mb-8 backdrop-blur-sm">
            <Activity size={12} /> Live Telemetry HUD
          </div>
          <h1 className="text-6xl md:text-8xl font-black font-geist tracking-tighter mb-8 leading-none">
            DeepSync <span className="iridescent-gradient bg-clip-text text-transparent">Analytics.</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-white/40 max-w-2xl mx-auto font-medium leading-relaxed">
            Real-time monitoring of Neural Mesh performance. Observe sub-second synchronization latency and node throughput across the global ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { label: 'Global Throughput', val: '4.2 GB/s', icon: Activity },
            { label: 'Active Shards', val: '1,284', icon: Database },
            { label: 'Mesh Latency', val: '0.04ms', icon: Zap }
          ].map((item, i) => (
            <div key={i} className="p-8 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[3rem] shadow-xl group hover:border-teal/30 transition-all">
               <div className="flex justify-between items-start mb-6">
                 <div className="w-12 h-12 rounded-2xl bg-teal/10 flex items-center justify-center text-teal border border-teal/20 group-hover:scale-110 transition-transform">
                   <item.icon size={24} />
                 </div>
                 <ArrowUpRight size={16} className="text-teal opacity-0 group-hover:opacity-100 transition-opacity" />
               </div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{item.label}</p>
               <p className="text-3xl font-black font-geist text-slate-900 dark:text-white tracking-tighter">{item.val}</p>
            </div>
          ))}
        </div>

        {/* Real-time Spectrum Chart */}
        <div className="h-[400px] w-full bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[3rem] p-10 shadow-2xl overflow-hidden relative">
          <div className="absolute top-8 left-10 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span className="text-[10px] font-black text-teal uppercase tracking-widest">Neural Flux Spectrum</span>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2DD4BF" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#2DD4BF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ 
                  background: theme === 'dark' ? '#0F172A' : '#FFFFFF', 
                  border: '1px solid #2DD4BF20', 
                  borderRadius: '1rem',
                  fontSize: '10px',
                  fontWeight: 'bold'
                }}
              />
              <Area type="monotone" dataKey="value" stroke="#2DD4BF" fillOpacity={1} fill="url(#colorVal)" strokeWidth={4} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RealtimeAnalytics;
