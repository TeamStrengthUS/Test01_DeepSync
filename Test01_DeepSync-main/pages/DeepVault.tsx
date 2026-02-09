
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  Search, 
  Trash2, 
  ShieldCheck, 
  Activity, 
  RefreshCw, 
  Terminal, 
  Clock, 
  AlertTriangle,
  History,
  Cpu,
  Fingerprint,
  Layers,
  Shield
} from 'lucide-react';

type LifecycleState = 'Active' | 'Archival' | 'Frozen';
type ProvenanceSource = 'User Input' | 'System Inference' | 'External Doc';
type AccessLevel = 'Private' | 'Shared';

interface MemoryShard {
  id: string;
  type: 'Core' | 'Archival';
  content: string;
  node_id: string;
  created_at: string;
  // MemCube Metadata (MemOS V3.1 Spec)
  provenance: ProvenanceSource;
  lifecycle_state: LifecycleState;
  access_level: AccessLevel;
}

const ShardBadge: React.FC<{ label: string; colorClass: string }> = ({ label, colorClass }) => (
  <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${colorClass}`}>
    {label}
  </span>
);

const DeepVault: React.FC = () => {
  const [memories, setMemories] = useState<MemoryShard[]>([
    { 
      id: 'uuid-7a1-b4', 
      type: 'Core', 
      content: 'Alex Rivers prefers PHX-Primary node for egress due to sub-ms latency requirements.', 
      node_id: 'PHX-01', 
      created_at: '2026-02-07T10:12:00Z',
      provenance: 'User Input',
      lifecycle_state: 'Active',
      access_level: 'Private'
    },
    { 
      id: 'uuid-8c2-d9', 
      type: 'Archival', 
      content: 'Q4 roadmap discussion focused on ICRC Meaningful Human Control audit trails.', 
      node_id: 'LDN-02', 
      created_at: '2026-02-07T08:00:00Z',
      provenance: 'System Inference',
      lifecycle_state: 'Archival',
      access_level: 'Shared'
    },
    { 
      id: 'uuid-3f4-e0', 
      type: 'Core', 
      content: 'The Constitution V3.1 prohibits unauthorized shell command execution.', 
      node_id: 'PHX-01', 
      created_at: '2026-02-06T15:30:00Z',
      provenance: 'External Doc',
      lifecycle_state: 'Frozen',
      access_level: 'Shared'
    },
    { 
      id: 'uuid-9b5-c1', 
      type: 'Archival', 
      content: 'Sales target for Enterprise tier set at 400 nodes per quarter.', 
      node_id: 'SIN-04', 
      created_at: '2026-02-04T12:00:00Z',
      provenance: 'User Input',
      lifecycle_state: 'Active',
      access_level: 'Private'
    },
  ]);
  
  const [search, setSearch] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  const filteredMemories = memories.filter(m => 
    m.content.toLowerCase().includes(search.toLowerCase()) || 
    m.id.toLowerCase().includes(search.toLowerCase())
  );

  const purgeMemory = (id: string) => {
    if (confirm("EXECUTE PERMANENT PURGE? This satisfies ICRC MHC protocols and cannot be undone. The memory shard will be physically erased from the DeepSync Vault.")) {
      setMemories(prev => prev.filter(m => m.id !== id));
      console.log(`[VAULT] Shard ${id} purged by operator.`);
    }
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1500);
  };

  const getLifecycleColor = (state: LifecycleState) => {
    switch (state) {
      case 'Active': return 'bg-teal/10 text-teal border-teal/20';
      case 'Archival': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'Frozen': return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
      default: return 'bg-white/5 text-white/40 border-white/10';
    }
  };

  const getProvenanceColor = (source: ProvenanceSource) => {
    switch (source) {
      case 'User Input': return 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20';
      case 'System Inference': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'External Doc': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-white/5 text-white/40 border-white/10';
    }
  };

  const getAccessColor = (level: AccessLevel) => {
    return level === 'Private' 
      ? 'bg-red-500/10 text-red-500 border-red-500/20' 
      : 'bg-teal/10 text-teal border-teal/20';
  };

  return (
    <div className="min-h-screen bg-black text-matrix font-mono p-4 md:p-12 relative overflow-hidden flex flex-col">
      {/* Background Matrix Glitch Decor */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none overflow-hidden">
        <div className="flex flex-wrap gap-4 text-[10px]">
          {Array.from({ length: 500 }).map((_, i) => (
            <span key={i}>{Math.random() > 0.5 ? '1' : '0'}</span>
          ))}
        </div>
      </div>

      <header className="relative z-10 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 mb-12 border-b border-matrix/20 pb-8">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <Database className="text-matrix" size={32} />
            <h1 className="text-4xl font-black tracking-tighter uppercase">DeepVault Explorer</h1>
          </div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-matrix/60">
            [ MEANINGFUL HUMAN CONTROL ] [ MEMOS_SPEC_V3.1 ] [ MEMCUBE_DATA_LAKE ]
          </p>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className="px-6 py-4 border border-matrix/40 hover:bg-matrix/10 transition-all text-xs uppercase font-bold flex items-center gap-3"
          >
            <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
            SYNC_VAULT_PARITY
          </button>
          <button className="px-6 py-4 bg-matrix text-black text-xs uppercase font-black hover:scale-105 transition-transform flex items-center gap-3 shadow-[0_0_20px_#00FF41]">
            EXPORT_AUDIT_LOG
          </button>
        </div>
      </header>

      <div className="relative z-10 flex-1 flex flex-col gap-8">
        {/* Search HUD */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2 relative group">
            <Terminal className="absolute left-6 top-1/2 -translate-y-1/2 text-matrix/40 group-focus-within:text-matrix" size={20} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="QUERY_MEMCUBE_METADATA..." 
              className="w-full bg-black border border-matrix/20 focus:border-matrix/60 rounded-none py-6 pl-16 pr-6 outline-none text-xs font-bold transition-all placeholder:text-matrix/20"
            />
          </div>
          <div className="p-6 border border-matrix/20 flex flex-col justify-center">
             <p className="text-[9px] uppercase tracking-widest text-matrix/40 mb-1">MEMCUBE_COUNT</p>
             <p className="text-2xl font-black tabular-nums">{memories.length.toString().padStart(3, '0')}</p>
          </div>
          <div className="p-6 border border-matrix/20 flex flex-col justify-center">
             <p className="text-[9px] uppercase tracking-widest text-matrix/40 mb-1">VAULT_INTEGRITY</p>
             <div className="flex items-center gap-3">
               <p className="text-2xl font-black">STABLE</p>
               <Activity size={18} className="animate-pulse" />
             </div>
          </div>
        </div>

        {/* Tactical Table */}
        <div className="border border-matrix/20 bg-black/40 backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-matrix/20 bg-matrix/5">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest">TIMESTAMP_UTC</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest">PROVENANCE</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest">CONTENT_SNIPPET</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest">LIFECYCLE</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest">ACCESS</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-matrix/10">
                <AnimatePresence mode="popLayout">
                  {filteredMemories.length > 0 ? (
                    filteredMemories.map((m) => (
                      <motion.tr 
                        key={m.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="group hover:bg-matrix/5 transition-colors"
                      >
                        <td className="px-8 py-6 text-[10px] font-bold text-matrix/60">
                           {new Date(m.created_at).toISOString().replace('T', ' ').split('.')[0]}
                        </td>
                        <td className="px-8 py-6">
                           <ShardBadge label={m.provenance} colorClass={getProvenanceColor(m.provenance)} />
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col gap-1">
                            <p className="text-xs font-medium max-w-xl truncate group-hover:text-white transition-colors">
                              {m.content}
                            </p>
                            <div className="flex items-center gap-2 text-[8px] font-bold opacity-40 uppercase">
                              <Cpu size={10} /> {m.node_id} • SHARD_{m.id.split('-')[0]}
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                           <ShardBadge label={m.lifecycle_state} colorClass={getLifecycleColor(m.lifecycle_state)} />
                        </td>
                        <td className="px-8 py-6">
                           <ShardBadge label={m.access_level} colorClass={getAccessColor(m.access_level)} />
                        </td>
                        <td className="px-8 py-6 text-right">
                           <button 
                            onClick={() => purgeMemory(m.id)}
                            className="p-3 text-red-500 hover:bg-red-500 hover:text-black transition-all"
                            title="EXECUTE_PURGE"
                           >
                              <Trash2 size={16} />
                           </button>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-8 py-32 text-center">
                         <div className="flex flex-col items-center gap-4 text-matrix/20">
                            <AlertTriangle size={48} />
                            <p className="text-sm font-black uppercase tracking-widest">ZERO_MEMCUBES_RECOVERED_IN_THIS_PARTITION</p>
                         </div>
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-matrix/5 border-t border-matrix/10 flex justify-between items-center">
             <div className="flex gap-4">
                <span className="text-[9px] font-bold flex items-center gap-1"><Fingerprint size={10} /> ATTESTATION: VERIFIED</span>
                <span className="text-[9px] font-bold flex items-center gap-1"><Layers size={10} /> L_OFFSET: 000</span>
             </div>
             <p className="text-[9px] font-black uppercase italic animate-pulse">DeepSync MemOS Active - Polling Sub-Vaults...</p>
          </div>
        </div>
      </div>

      <footer className="mt-8 pt-6 border-t border-matrix/10 flex justify-center gap-12 text-[9px] font-black opacity-40 uppercase tracking-[0.3em]">
         <span className="flex items-center gap-2"><ShieldCheck size={12} /> IHL_VALIDATED</span>
         <span className="flex items-center gap-2"><History size={12} /> SYNC: 0.04MS</span>
         <span className="flex items-center gap-2"><Shield size={12} /> ACCESS_GOV: ENFORCED</span>
         <span>© 2026 TEAMSTRENGTH_DATA_SECURITY</span>
      </footer>
    </div>
  );
};

export default DeepVault;
