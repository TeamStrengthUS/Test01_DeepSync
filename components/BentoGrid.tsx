
import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis, Tooltip } from 'recharts';
import { Users, Activity, TrendingUp, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../ThemeContext.tsx';

const mockData = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 600 },
  { name: 'Thu', value: 800 },
  { name: 'Fri', value: 500 },
  { name: 'Sat', value: 900 },
  { name: 'Sun', value: 1000 },
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
              rgba(139, 92, 246, ${0.12}),
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
            className="absolute -inset-[2px] rounded-3xl border-2 border-transparent border-t-violet-500/20 border-r-violet-500/5"
          />
        </div>
        <div className="flex justify-between items-start mb-4 relative z-10 text-left">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              Performance Trends <Activity size={18} className="text-violet-400" />
            </h3>
            <p className="text-sm text-slate-400 dark:text-white/40 font-medium">Real-time team velocity</p>
          </div>
          <div className="bg-violet-500/10 text-violet-400 px-3 py-1 rounded-full text-xs font-black border border-violet-500/20">
            +18.2% this week
          </div>
        </div>
        <div className="flex-1 h-full min-h-[200px] w-full mt-4 relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#8B5CF6" 
                strokeWidth={3} 
                dot={false}
                animationDuration={2000}
              />
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ 
                  background: theme === 'dark' ? '#0A0A12' : '#FFFFFF', 
                  border: theme === 'dark' ? '1px solid rgba(139, 92, 246, 0.2)' : '1px solid #e2e8f0', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
                itemStyle={{ color: '#8B5CF6', fontWeight: 'bold' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-white/5 relative z-10">
           {[1,2,3,4].map(i => (
             <img key={i} src={`https://picsum.photos/seed/user${i}/40/40`} className="w-8 h-8 rounded-full border-2 border-white dark:border-surface" alt="user" />
           ))}
           <span className="text-xs text-slate-400 dark:text-white/40 font-bold uppercase tracking-widest">+12 online</span>
        </div>
      </SpotlightCard>

      {/* Velocity Card */}
      <SpotlightCard className="md:col-span-1 md:row-span-2 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent flex flex-col justify-center text-center">
        <div className="text-violet-400 mb-2 flex justify-center"><TrendingUp size={32} /></div>
        <div className="text-4xl font-black font-geist tabular-nums text-slate-900 dark:text-white">18</div>
        <div className="text-sm text-slate-500 dark:text-white/60 font-bold uppercase tracking-widest">Active Projects</div>
        <div className="mt-4 text-xs font-black text-violet-400 flex items-center justify-center gap-1">
          <ArrowUpRight size={14} /> 12% INCREASE
        </div>
      </SpotlightCard>

      {/* Leads Card */}
      <SpotlightCard className="md:col-span-1 md:row-span-2">
        <h4 className="text-sm font-black text-slate-800 dark:text-white/80 mb-4 flex items-center gap-2 uppercase tracking-widest text-left">
          <Users size={16} className="text-violet-400" /> Leads
        </h4>
        <div className="space-y-4">
          {[
            { name: 'Alex M.', time: '2m ago' },
            { name: 'Jessica R.', time: '15m ago' },
            { name: 'Sam B.', time: '1h ago' }
          ].map((lead, i) => (
            <div key={i} className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-600 dark:text-white/70">{lead.name}</span>
              <span className="text-slate-400 dark:text-white/30 tracking-tight uppercase">{lead.time}</span>
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
              animate={{ width: '74%' }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-violet-500 to-teal"
            />
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-slate-400 dark:text-white/40 uppercase tracking-[0.3em] font-black">
            <span>Quarterly Goal</span>
            <span className="text-violet-400">74%</span>
          </div>
        </div>
        <div className="hidden sm:block shrink-0 px-4 py-2 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5 text-left">
          <p className="text-[10px] text-slate-400 dark:text-white/40 uppercase mb-1 font-black tracking-widest">Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
            <span className="text-sm font-black text-slate-900 dark:text-white">HEALTHY</span>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
};

export default BentoGrid;
