
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Search, Trash2, ShieldCheck, Activity, RefreshCw, Filter, Download, AlertTriangle, Clock } from 'lucide-react';

interface MemoryShard {
  id: string;
  type: 'Core' | 'Archival';
  content: string;
  updated_at: string;
}

const DeepVault: React.FC = () => {
  const [memories, setMemories] = useState<MemoryShard[]>([
    { id: 'mem_001', type: 'Core', content: 'Alex Rivers prefers PHX-Primary node for egress due to sub-ms latency requirements.', updated_at: '2026-02-07T10:12:00Z' },
    { id: 'mem_002', type: 'Archival', content: 'Q4 roadmap discussion focused on ICRC Meaningful Human Control audit trails.', updated_at: '2026-02-07T08:00:00Z' },
    { id: 'mem_003', type: 'Core', content: 'The Constitution V3.1 prohibits unauthorized shell command execution.', updated_at: '2026-02-06T15:30:00Z' },
    { id: 'mem_004', type: 'Archival', content: 'Sales target for Enterprise tier set at 400 nodes per quarter.', updated_at: '2026-02-04T12:00:00Z' },
    { id: 'mem_005', type: 'Core', content: 'User identity verified via TG-DM-Pairing protocol at 08:00 UTC.', updated_at: '2026-02-02T09:15:00Z' },
  ]);
  
  const [search, setSearch] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  const filteredMemories = memories.filter(m => 
    m.content.toLowerCase().includes(search.toLowerCase()) || 
    m.id.toLowerCase().includes(search.toLowerCase())
  );

  const purgeMemory = (id: string) => {
    if (confirm("Execute PERMANENT PURGE? This action satisfies IHL requirements for human override and cannot be undone. The memory shard will be erased from the DeepSync Vault.")) {
      setMemories(prev => prev.filter(m => m.id !== id));
    }
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  return (
    <div className="space-y-12 p-2 text-left relative min-h-screen">
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 mb-12">
        <div>
          <h1 className="text-5xl font-black font-geist tracking-tighter text-white flex items-center gap-4">
            <Database className="text-teal" size={32} /> DeepVault Explorer
          </h1>
          <p className="text-slate-500 font-medium flex items-center gap-2 mt-2">
            <ShieldCheck size={16} className="text-teal" /> Meaningful Human Control • Immutable Shard Ledger
          </p>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-white/10 transition-all"
          >
            {isSyncing ? <RefreshCw size={14} className="animate-spin" /> : <RefreshCw size={14} />}
            Sync Parity
          </button>
          <button className="px-6 py-4 bg-teal text-black rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl">
            <Download size={14} /> Audit Export
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-12 space-y-8">
          
          {/* Search & Stats HUD */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2 relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-teal transition-colors" size={20} />
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Vault content..." 
                className="w-full bg-surface border border-white/5 focus:border-teal/30 rounded-3xl py-6 pl-16 pr-6 outline-none text-sm font-bold transition-all"
              />
            </div>
            <div className="p-6 bg-surface border border-white/5 rounded-3xl flex items-center justify-between">
               <div>
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Active Shards</p>
                  <p className="text-2xl font-black text-white">{memories.length}</p>
               </div>
               <Activity className="text-teal opacity-20" size={32} />
            </div>
            <div className="p-6 bg-surface border border-white/5 rounded-3xl flex items-center justify-between">
               <div>
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Retention</p>
                  <p className="text-2xl font-black text-teal">99.9%</p>
               </div>
               <ShieldCheck className="text-teal opacity-20" size={32} />
            </div>
          </div>

          {/* Data Grid */}
          <div className="bg-surface border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal/20 to-transparent" />
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-void/30">
                    <th className="px-10 py-8 text-[10px] font-black text-white/20 uppercase tracking-widest">Shard ID</th>
                    <th className="px-10 py-8 text-[10px] font-black text-white/20 uppercase tracking-widest">Type</th>
                    <th className="px-10 py-8 text-[10px] font-black text-white/20 uppercase tracking-widest">Content Snippet</th>
                    <th className="px-10 py-8 text-[10px] font-black text-white/20 uppercase tracking-widest">Last Synced</th>
                    <th className="px-10 py-8 text-[10px] font-black text-white/20 uppercase tracking-widest text-right">MHC Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <AnimatePresence mode="popLayout">
                    {filteredMemories.length > 0 ? (
                      filteredMemories.map((m) => (
                        <motion.tr 
                          key={m.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="group hover:bg-white/[0.02] transition-colors"
                        >
                          <td className="px-10 py-8 text-[11px] font-mono text-white/40">{m.id}</td>
                          <td className="px-10 py-8">
                            <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md border ${m.type === 'Core' ? 'bg-teal/10 text-teal border-teal/20' : 'bg-purple-500/10 text-purple-500 border-purple-500/20'}`}>
                              {m.type}
                            </span>
                          </td>
                          <td className="px-10 py-8">
                            <p className="text-sm font-medium text-white/70 max-w-md truncate group-hover:text-white transition-colors">
                              {m.content}
                            </p>
                          </td>
                          <td className="px-10 py-8 text-[11px] font-bold text-white/30 italic">
                             <div className="flex items-center gap-2">
                                <Clock size={12} />
                                {new Date(m.updated_at).toLocaleTimeString('en-GB', { hour12: false })}
                             </div>
                          </td>
                          <td className="px-10 py-8 text-right">
                             <button 
                              onClick={() => purgeMemory(m.id)}
                              className="p-3 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                              title="Purge Shard"
                             >
                                <Trash2 size={16} />
                             </button>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-10 py-20 text-center">
                           <div className="flex flex-col items-center gap-4 text-slate-500">
                              <AlertTriangle size={32} className="opacity-20" />
                              <p className="text-sm font-black uppercase tracking-widest">No memory shards found in current partition</p>
                           </div>
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
            <div className="p-8 bg-void/50 border-t border-white/5 flex justify-center items-center gap-10">
               <button className="text-[10px] font-black text-white/10 uppercase tracking-[0.4em] hover:text-white transition-colors">Load Archive Pages</button>
               <div className="h-4 w-px bg-white/5" />
               <p className="text-[9px] font-black text-white/10 uppercase tracking-widest italic">Vault Integrity: VERIFIED</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeepVault;
