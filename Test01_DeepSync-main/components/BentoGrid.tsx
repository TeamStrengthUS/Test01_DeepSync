
import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis, Tooltip } from 'recharts';
import { Activity, TrendingUp, ArrowUpRight, Cpu, Radio } from 'lucide-react';
import { useTheme } from '../ThemeContext.tsx';

const mockData = [
  { name: '00:00', value: 400 },
  { name: '04:00', value: 300 },
  { name: '08:00', value: 600 },
  { name: '12:00', value: 800 },
  { name: '16:00', value: 500 },
  { name: '20:00', value: 900 },
  { name: '23:59', value: 1000 },
];

const SpotlightCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`relative group bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-3xl p-6 overflow-hidden shadow-sm dark:shadow-none transition-all duration-300 glass-card ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(45, 212, 191, ${0.12}),
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </div>
  );
};

const BentoGrid: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 gap-4 h-full min-h-[600px]">
      {/* Main Dashboard Chart */}
      <SpotlightCard className="md:col-span-3 md:row-span-3 flex flex-col justify-between">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-[2px] rounded-3xl border-2 border-transparent border-t-teal/20 border-r-teal/5"
          />
        </div>
        <div className="flex justify-between items-start mb-4 relative z-10 text-left">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2 uppercase">
              Mesh Throughput <Activity size={18} className="text-teal" />
            </h3>
            <p className="text-sm text-slate-400 dark:text-white/40 font-medium">Real-time node synchronization</p>
          </div>
          <div className="bg-teal/10 text-teal px-3 py-1 rounded-full text-xs font-black border border-teal/20">
            PHX-VAULT-01
          </div>
        </div>
        <div className="flex-1 h-full min-h-[200px] w-full mt-4 relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#2DD4BF" 
                strokeWidth={3} 
                dot={false}
                animationDuration={2000}
              />
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ 
                  background: theme === 'dark' ? '#0A0A12' : '#FFFFFF', 
                  border: theme === 'dark' ? '1px solid rgba(45, 212, 191, 0.2)' : '1px solid #e2e8f0', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
                itemStyle={{ color: '#2DD4BF', fontWeight: 'bold' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-white/5 relative z-10">
           <Radio size={14} className="text-teal animate-pulse" />
           <span className="text-[10px] text-slate-400 dark:text-white/40 font-bold uppercase tracking-[0.3em]">Listening for Neural Flux...</span>
        </div>
      </SpotlightCard>

      {/* Active Nodes Card */}
      <SpotlightCard className="md:col-span-1 md:row-span-2 bg-gradient-to-br from-teal/10 via-transparent to-transparent flex flex-col justify-center text-center">
        <div className="text-teal mb-2 flex justify-center"><Cpu size={32} /></div>
        <div className="text-4xl font-black font-geist tabular-nums text-slate-900 dark:text-white">482</div>
        <div className="text-sm text-slate-500 dark:text-white/60 font-bold uppercase tracking-widest">Active Nodes</div>
        <div className="mt-4 text-xs font-black text-teal flex items-center justify-center gap-1 uppercase">
          <ArrowUpRight size={14} /> 100% Operational
        </div>
      </SpotlightCard>

      {/* Strikes Ledger Card */}
      <SpotlightCard className="md:col-span-1 md:row-span-2">
        <h4 className="text-sm font-black text-slate-800 dark:text-white/80 mb-4 flex items-center gap-2 uppercase tracking-widest text-left">
          <TrendingUp size={16} className="text-teal" /> Security Shards
        </h4>
        <div className="space-y-4">
          {[
            { name: 'EGRESS_GUARD', state: 'Active' },
            { name: 'VAULT_LOCK', state: 'Active' },
            { name: 'KILL_SWITCH', state: 'Armed' }
          ].map((shard, i) => (
            <div key={i} className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
              <span className="text-slate-600 dark:text-white/50">{shard.name}</span>
              <span className="text-teal">{shard.state}</span>
            </div>
          ))}
        </div>
      </SpotlightCard>

      {/* Footer Info Box */}
      <SpotlightCard className="md:col-span-3 md:row-span-1 flex items-center justify-between gap-8">
        <div className="flex-1">
          <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '99%' }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-teal to-indigo-500"
            />
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-slate-400 dark:text-white/40 uppercase tracking-[0.3em] font-black">
            <span>Global Consensus</span>
            <span className="text-teal">99.9%</span>
          </div>
        </div>
        <div className="hidden sm:block shrink-0 px-4 py-2 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5 text-left">
          <p className="text-[10px] text-slate-400 dark:text-white/40 uppercase mb-1 font-black tracking-widest">Mesh Pulse</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-teal animate-pulse shadow-[0_0_8px_rgba(45,212,191,0.5)]" />
            <span className="text-sm font-black text-slate-900 dark:text-white uppercase">Healthy</span>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
};

export default BentoGrid;
