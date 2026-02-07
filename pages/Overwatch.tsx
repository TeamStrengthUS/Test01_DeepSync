import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  Users, 
  Search, 
  Power, 
  RefreshCw, 
  Zap, 
  Activity, 
  ShieldCheck, 
  Terminal,
  AlertTriangle,
  ChevronRight,
  Database,
  Lock,
  Flame,
  User,
  History
} from 'lucide-react';

// Admin check mock
const IS_ADMIN = true; // In production, this would be validated via JWT claims

interface Strike {
  id: string;
  user_id: string;
  violation_type: string;
  details: string;
  timestamp: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
}

interface NodeRecord {
  user_id: string;
  email: string;
  voice_fuel_minutes: number;
  is_suspended: boolean;
  neural_id: string;
}

const Overwatch: React.FC = () => {
  const [nodes, setNodes] = useState<NodeRecord[]>([
    { user_id: 'usr_001', email: 'ceo@hypergrowth.com', voice_fuel_minutes: 940, is_suspended: false, neural_id: 'agent_alpha' },
    { user_id: 'usr_002', email: 'dev@velocity.sh', voice_fuel_minutes: 120, is_suspended: true, neural_id: 'agent_beta' },
    { user_id: 'usr_003', email: 'ops@spark.com', voice_fuel_minutes: 450, is_suspended: false, neural_id: 'agent_gamma' },
  ]);

  const [strikes, setStrikes] = useState<Strike[]>([
    { id: '1', user_id: 'usr_001', violation_type: 'Illegal Egress', details: "Blocked 'rm -rf /' attempt via bash tool", timestamp: new Date().toISOString(), severity: 'HIGH' },
    { id: '2', user_id: 'usr_002', violation_type: 'Unauth Scan', details: "Nmap scan detected on internal 10.0.0.1", timestamp: new Date(Date.now() - 3600000).toISOString(), severity: 'HIGH' },
    { id: '3', user_id: 'usr_003', violation_type: 'Policy Breach', details: "Attempted data export to non-whitelisted IP", timestamp: new Date(Date.now() - 7200000).toISOString(), severity: 'MEDIUM' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState<NodeRecord | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Statistics Calculation
  const stats = {
    active: nodes.filter(n => !n.is_suspended).length,
    suspended: nodes.filter(n => n.is_suspended).length,
    totalStrikes: strikes.length,
    criticalStrikes: strikes.filter(s => s.severity === 'HIGH').length
  };

  const handleSearch = () => {
    const found = nodes.find(n => n.email.toLowerCase().includes(searchQuery.toLowerCase()) || n.user_id.includes(searchQuery));
    setSelectedNode(found || null);
  };

  const updateNodeStatus = async (id: string, suspended: boolean) => {
    setIsProcessing(true);
    // Conceptual Supabase Update:
    // const { error } = await supabase.from('teammate_node').update({ is_suspended: suspended }).eq('user_id', id);
    setTimeout(() => {
      setNodes(prev => prev.map(n => n.user_id === id ? { ...n, is_suspended: suspended } : n));
      if (selectedNode?.user_id === id) setSelectedNode(prev => prev ? { ...prev, is_suspended: suspended } : null);
      setIsProcessing(false);
    }, 800);
  };

  const resetQuota = async (id: string) => {
    setIsProcessing(true);
    // Conceptual Supabase Update:
    // const { error } = await supabase.from('teammate_node').update({ voice_fuel_minutes: 0 }).eq('user_id', id);
    setTimeout(() => {
      setNodes(prev => prev.map(n => n.user_id === id ? { ...n, voice_fuel_minutes: 0 } : n));
      if (selectedNode?.user_id === id) setSelectedNode(prev => prev ? { ...prev, voice_fuel_minutes: 0 } : null);
      setIsProcessing(false);
    }, 800);
  };

  if (!IS_ADMIN) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-12">
        <Lock size={64} className="text-red-500 mb-6" />
        <h1 className="text-4xl font-black font-geist text-white mb-4 uppercase">Access Restricted</h1>
        <p className="text-slate-400 font-medium">Overwatch protocols require @teamstrength.com administrative clearance.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 p-2 text-left relative">
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 mb-12">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-[2.5rem] bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 relative">
            <div className="absolute inset-0 bg-red-500/20 blur-2xl animate-pulse" />
            <ShieldAlert size={36} />
          </div>
          <div>
            <h1 className="text-5xl font-black font-geist tracking-tighter mb-2 text-white">Project Overwatch</h1>
            <p className="text-slate-400 font-medium flex items-center gap-2">
              <Terminal size={14} className="text-red-500" /> Administrative Command & IHL Enforcement HUD.
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="px-6 py-4 bg-void border border-red-500/20 rounded-3xl flex items-center gap-4 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
             <div className="relative">
                <Activity size={20} className="text-red-500 animate-pulse" />
                <div className="absolute inset-0 bg-red-500/40 blur-md rounded-full" />
             </div>
             <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">Global Mesh Governance</p>
                <p className="text-sm font-black text-white">System Protocol V3.1: ARMED</p>
             </div>
          </div>
        </div>
      </header>

      {/* SECTION A: THE THREAT RADAR */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Nodes", val: stats.active, icon: Users, color: "text-teal", bg: "bg-teal/5", border: "border-teal/20" },
          { label: "Suspended", val: stats.suspended, icon: Power, color: "text-red-500", bg: "bg-red-500/5", border: "border-red-500/20" },
          { label: "Total Strikes", val: stats.totalStrikes, icon: ShieldAlert, color: "text-orange-400", bg: "bg-orange-400/5", border: "border-orange-400/20" },
          { label: "Critical Breaches", val: stats.criticalStrikes, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-600/5", border: "border-red-600/20" }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-8 ${stat.bg} ${stat.border} border rounded-[3rem] relative overflow-hidden group hover:scale-[1.02] transition-all duration-500 glass-card`}
          >
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <stat.icon size={120} />
            </div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mb-4">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h3 className={`text-5xl font-black font-geist tracking-tighter ${stat.color}`}>{stat.val}</h3>
              <stat.icon size={24} className={`${stat.color} opacity-40`} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* SECTION B: THE STRIKE LOG */}
        <div className="xl:col-span-8">
          <div className="bg-surface border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl glass-card flex flex-col h-full">
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-xl font-black font-geist text-white uppercase flex items-center gap-4">
                <History size={20} className="text-orange-400" /> Recent Security Strikes
              </h3>
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" /> Live Audit Stream
              </div>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Timestamp</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Target UID</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Violation Type</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Details</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Action Taken</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {strikes.map((s) => (
                    <tr key={s.id} className={`group hover:bg-white/[0.02] transition-colors ${s.severity === 'HIGH' ? 'bg-red-500/[0.02]' : ''}`}>
                      <td className="px-8 py-6 text-[11px] font-mono text-slate-400">
                        {new Date(s.timestamp).toLocaleTimeString()}
                      </td>
                      <td className="px-8 py-6 text-xs font-black text-white/60">
                        {s.user_id}
                      </td>
                      <td className="px-8 py-6">
                        <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md border ${
                          s.severity === 'HIGH' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-orange-500/10 text-orange-500 border-orange-500/20'
                        }`}>
                          {s.violation_type}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-xs text-slate-400 max-w-xs truncate">
                        {s.details}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2 text-red-500 font-black text-[10px] uppercase tracking-widest">
                          <Lock size={12} /> BLOCKED
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-void/50 border-t border-white/5 text-center">
               <button className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.4em] transition-colors">Load Full Audit History (DeepSync Vault)</button>
            </div>
          </div>
        </div>

        {/* SECTION C: NODE MANAGEMENT (THE KILL SWITCH) */}
        <div className="xl:col-span-4 space-y-10">
          <div className="p-10 bg-surface border border-white/5 rounded-[3rem] shadow-xl glass-card text-left relative overflow-hidden flex flex-col h-full">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Database size={120} strokeWidth={1} />
            </div>
            
            <h3 className="text-xl font-black font-geist text-white uppercase flex items-center gap-3 mb-8">
              <User className="text-teal" size={24} /> Node Management
            </h3>

            <div className="space-y-6 flex-1">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal transition-colors" size={18} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search UID or Email..."
                  className="w-full bg-void/50 border border-white/5 focus:border-teal/50 rounded-2xl py-5 pl-14 pr-4 text-sm font-medium outline-none transition-all placeholder:text-slate-600"
                />
              </div>

              <AnimatePresence mode="wait">
                {selectedNode ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-8 bg-void/40 border border-white/5 rounded-[2rem] space-y-8"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-black text-white mb-1">{selectedNode.email}</p>
                        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{selectedNode.user_id}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                        selectedNode.is_suspended ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-teal/10 text-teal border-teal/20'
                      }`}>
                        {selectedNode.is_suspended ? 'Offline' : 'Healthy'}
                      </div>
                    </div>

                    <div className="space-y-4">
                       <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                         <span className="text-slate-500">Voice Fuel Usage</span>
                         <span className={selectedNode.voice_fuel_minutes > 900 ? 'text-red-500' : 'text-teal'}>
                           {selectedNode.voice_fuel_minutes} / 1000m
                         </span>
                       </div>
                       <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(selectedNode.voice_fuel_minutes / 1000) * 100}%` }}
                            className={`h-full ${selectedNode.voice_fuel_minutes > 900 ? 'bg-red-500' : 'bg-teal'}`}
                          />
                       </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {selectedNode.is_suspended ? (
                        <button 
                          onClick={() => updateNodeStatus(selectedNode.user_id, false)}
                          disabled={isProcessing}
                          className="w-full py-4 bg-teal text-black font-black uppercase text-[10px] tracking-[0.2em] rounded-2xl hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] transition-all flex items-center justify-center gap-2"
                        >
                          {isProcessing ? <RefreshCw className="animate-spin" size={14} /> : <Zap size={14} />}
                          Reactivate Node
                        </button>
                      ) : (
                        <button 
                          onClick={() => updateNodeStatus(selectedNode.user_id, true)}
                          disabled={isProcessing}
                          className="w-full py-4 bg-red-600 text-white font-black uppercase text-[10px] tracking-[0.2em] rounded-2xl hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all flex items-center justify-center gap-2"
                        >
                          {isProcessing ? <RefreshCw className="animate-spin" size={14} /> : <Power size={14} />}
                          Emergency Suspend
                        </button>
                      )}
                      
                      <button 
                        onClick={() => resetQuota(selectedNode.user_id)}
                        disabled={isProcessing}
                        className="w-full py-4 bg-white/5 border border-white/10 text-white font-black uppercase text-[10px] tracking-[0.2em] rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                      >
                        <Flame size={14} /> Reset Quota (Refuel)
                      </button>
                    </div>
                  </motion.div>
                ) : searchQuery ? (
                  <div className="p-12 text-center text-slate-500">
                    <AlertTriangle className="mx-auto mb-4 opacity-20" size={48} />
                    <p className="text-xs font-black uppercase tracking-widest">No Node Found in Mesh</p>
                  </div>
                ) : (
                  <div className="p-12 text-center border-2 border-dashed border-white/5 rounded-[2rem] text-slate-600">
                    <p className="text-xs font-black uppercase tracking-widest">Enter Credentials to Inspect Node</p>
                  </div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-3 text-[9px] font-black text-slate-500 uppercase tracking-widest">
               <ShieldCheck size={12} className="text-teal" /> Verified Human Override State
            </div>
          </div>
        </div>
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

export default Overwatch;