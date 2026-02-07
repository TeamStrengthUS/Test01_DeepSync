
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  Users, 
  Search, 
  MoreVertical, 
  Power, 
  RefreshCw, 
  Zap, 
  Mic, 
  AlertTriangle,
  Activity,
  ChevronRight,
  ShieldCheck,
  Terminal
} from 'lucide-react';

interface Tenant {
  id: string;
  email: string;
  voiceFuel: number;
  nodeStatus: 'active' | 'suspended';
  keyId: string;
  tier: 'Free' | 'Pro' | 'Enterprise';
}

const MOCK_TENANTS: Tenant[] = [
  { id: 'usr_001', email: 'ceo@hypergrowth.com', voiceFuel: 940, nodeStatus: 'active', keyId: 'lk_7721_ak', tier: 'Enterprise' },
  { id: 'usr_002', email: 'marketing@neologix.io', voiceFuel: 1050, nodeStatus: 'active', keyId: 'lk_8832_pk', tier: 'Pro' },
  { id: 'usr_003', email: 'dev@velocity.sh', voiceFuel: 420, nodeStatus: 'suspended', keyId: 'lk_1102_vk', tier: 'Pro' },
  { id: 'usr_004', email: 'ops@spark.com', voiceFuel: 120, nodeStatus: 'active', keyId: 'lk_0042_sk', tier: 'Free' },
];

const Overwatch: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>(MOCK_TENANTS);
  const [isRotating, setIsRotating] = useState<string | null>(null);

  const handleRefuel = (id: string) => {
    setTenants(prev => prev.map(t => t.id === id ? { ...t, voiceFuel: Math.max(0, t.voiceFuel - 100) } : t));
  };

  const handleRotate = (id: string) => {
    setIsRotating(id);
    setTimeout(() => setIsRotating(null), 2000);
  };

  const handleKill = (id: string) => {
    setTenants(prev => prev.map(t => t.id === id ? { ...t, nodeStatus: t.nodeStatus === 'active' ? 'suspended' : 'active' } : t));
  };

  return (
    <div className="space-y-12 p-2 text-left">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-[2rem] bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 relative">
            <div className="absolute inset-0 bg-red-500/20 blur-xl animate-pulse" />
            <ShieldAlert size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black font-geist tracking-tighter mb-2 text-slate-900 dark:text-white flex items-center gap-4">
              Project Overwatch
            </h1>
            <p className="text-slate-500 dark:text-white/40 font-medium flex items-center gap-2">
              <Terminal size={14} className="text-red-500" /> Administrative Egress & Tenant Command HUD.
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3">
             <Activity size={16} className="text-red-500 animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-red-500">Global Node Governance: Active</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* GOD VIEW TABLE */}
        <div className="xl:col-span-12">
          <div className="bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[3rem] overflow-hidden shadow-2xl glass-card">
            <div className="p-8 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-4 bg-slate-50 dark:bg-void/50 border border-slate-200 dark:border-white/5 rounded-2xl px-5 py-3 w-full max-w-md">
                <Search size={18} className="text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Query Tenant Matrix..." 
                  className="bg-transparent border-none outline-none text-sm w-full text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
                />
              </div>
              <div className="flex gap-3">
                 <button className="px-6 py-3 bg-slate-100 dark:bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Export Egress Logs</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-slate-100 dark:border-white/5">
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tenant Details</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Voice Fuel (%)</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Node Status</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Key Ingress</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Intervention</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {tenants.map(tenant => (
                    <tr key={tenant.id} className={`group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors ${tenant.voiceFuel > 1000 ? 'bg-red-500/[0.03]' : ''}`}>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black font-geist text-xs ${
                            tenant.tier === 'Enterprise' ? 'bg-purple-500/20 text-purple-500' : 'bg-teal/20 text-teal'
                          }`}>
                            {tenant.id.split('_')[1]}
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900 dark:text-white">{tenant.email}</p>
                            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{tenant.tier} Account</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="w-48">
                          <div className="flex justify-between items-center mb-2">
                             <span className={`text-[10px] font-black uppercase ${tenant.voiceFuel > 1000 ? 'text-red-500' : 'text-slate-400'}`}>
                               {tenant.voiceFuel} / 1000m
                             </span>
                             {tenant.voiceFuel > 1000 && <AlertTriangle size={12} className="text-red-500 animate-pulse" />}
                          </div>
                          <div className="h-2 w-full bg-slate-100 dark:bg-void rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min(100, (tenant.voiceFuel / 1000) * 100)}%` }}
                              className={`h-full rounded-full ${tenant.voiceFuel > 1000 ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-teal shadow-[0_0_8px_rgba(45,212,191,0.5)]'}`}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${tenant.nodeStatus === 'active' ? 'bg-teal animate-pulse shadow-[0_0_8px_#2DD4BF]' : 'bg-red-500'}`} />
                          <span className={`text-[10px] font-black uppercase tracking-widest ${tenant.nodeStatus === 'active' ? 'text-teal' : 'text-red-500'}`}>
                            {tenant.nodeStatus}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <code className="text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/5">
                          {tenant.keyId}
                        </code>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleRefuel(tenant.id)}
                            className="p-3 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-xl text-teal hover:bg-teal hover:text-black transition-all"
                            title="Refuel: Give back 100m"
                          >
                            <Zap size={14} />
                          </button>
                          <button 
                            onClick={() => handleRotate(tenant.id)}
                            className="p-3 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-xl text-purple-500 hover:bg-purple-500 hover:text-white transition-all"
                            title="Rotate Neural Keys"
                          >
                            <RefreshCw size={14} className={isRotating === tenant.id ? 'animate-spin' : ''} />
                          </button>
                          <button 
                            onClick={() => handleKill(tenant.id)}
                            className="p-3 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all"
                            title="Emergency Stop Node"
                          >
                            <Power size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        <div className="p-8 bg-red-500/5 border border-red-500/10 rounded-[2.5rem] flex flex-col gap-6 text-left">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center text-red-500">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-xl font-black font-geist text-slate-900 dark:text-white">Emergency Broadcast</h3>
           </div>
           <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed font-medium">
             Send a mandatory system alert to all active Omni-Nodes. This bypasses user filters and appears as a system critical message.
           </p>
           <button className="mt-auto py-4 bg-red-500 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all">
             Initialize Broadcast
           </button>
        </div>

        <div className="p-8 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[2.5rem] flex flex-col gap-6 text-left glass-card">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal/10 flex items-center justify-center text-teal">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-black font-geist text-slate-900 dark:text-white">Mesh Compliance</h3>
           </div>
           <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed font-medium">
             Deploy an architecture-wide Constitution update. Forces all agents to re-parse ethical boundaries.
           </p>
           <button className="mt-auto py-4 border border-teal/20 text-teal font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-teal hover:text-black transition-all">
             Global Mesh Sync
           </button>
        </div>

        <div className="p-8 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[2.5rem] flex flex-col gap-6 text-left glass-card">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                <RefreshCw size={24} />
              </div>
              <h3 className="text-xl font-black font-geist text-slate-900 dark:text-white">Key Vending Status</h3>
           </div>
           <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed font-medium">
             LiveKit KVM healthy. Tokens generated in last 24h: <span className="text-white font-bold">1,242</span>. Success rate: <span className="text-teal font-bold">100%</span>.
           </p>
           <div className="mt-auto flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-void rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-400">
             <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" /> Master Secret Valid
           </div>
        </div>
      </div>
    </div>
  );
};

export default Overwatch;
