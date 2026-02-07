
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Cpu, Activity, Zap, ShieldCheck } from 'lucide-react';

interface AgentNode {
  id: string;
  name: string;
  status: 'active' | 'suspended';
  mesh: string;
}

const NODES: AgentNode[] = [
  { id: 'node_01', name: 'Alpha-Overseer', status: 'active', mesh: 'PHX-01' },
  { id: 'node_02', name: 'Sigma-Research', status: 'active', mesh: 'LDN-02' },
  { id: 'node_03', name: 'Omega-Security', status: 'suspended', mesh: 'SIN-03' },
];

const FleetSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeNode, setActiveNode] = useState(NODES[0]);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const selectNode = (node: AgentNode) => {
    setActiveNode(node);
    setIsOpen(false);
  };

  const handleDeploy = () => {
    setIsOpen(false);
    setShowUpgradeModal(true);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-4 pl-4 pr-6 py-2.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
      >
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center relative ${activeNode.status === 'active' ? 'bg-teal/10 text-teal border border-teal/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
          <Cpu size={16} />
          {activeNode.status === 'active' && <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-teal rounded-full animate-pulse" />}
        </div>
        <div className="text-left hidden sm:block">
           <p className="text-[10px] font-black text-white/20 uppercase tracking-widest leading-none mb-1">Active Node</p>
           <p className="text-sm font-black text-white leading-none">{activeNode.name}</p>
        </div>
        <ChevronDown size={14} className={`text-white/20 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full right-0 mt-4 w-72 bg-surface/90 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-2xl p-4 z-50 overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-white/5 mb-2">
              <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Neural Fleet Portfolio</p>
            </div>
            
            <div className="space-y-1">
              {NODES.map(node => (
                <button 
                  key={node.id}
                  onClick={() => selectNode(node)}
                  className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all text-left group ${activeNode.id === node.id ? 'bg-teal/10 border border-teal/20' : 'hover:bg-white/5 border border-transparent'}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${node.status === 'active' ? 'text-teal' : 'text-red-500'}`}>
                    <Activity size={16} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-xs font-black uppercase tracking-widest ${activeNode.id === node.id ? 'text-teal' : 'text-white'}`}>{node.name}</p>
                    <p className="text-[9px] font-bold text-white/20 tracking-widest">{node.mesh}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/5">
              <button 
                onClick={handleDeploy}
                className="w-full py-4 bg-teal text-black font-black uppercase text-[10px] tracking-widest rounded-xl flex items-center justify-center gap-3 hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] transition-all"
              >
                <Plus size={16} /> Deploy New Node
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upgrade Modal */}
      <AnimatePresence>
        {showUpgradeModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-void/90 backdrop-blur-xl">
             <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-xl bg-surface border border-teal/30 rounded-[3rem] p-12 shadow-[0_0_100px_rgba(45,212,191,0.15)] relative overflow-hidden"
             >
                <div className="absolute top-0 right-0 p-12 text-teal/5">
                  <Zap size={200} strokeWidth={1} />
                </div>
                
                <div className="relative z-10 text-center flex flex-col items-center">
                   <div className="w-20 h-20 rounded-[2rem] bg-teal/10 flex items-center justify-center text-teal border border-teal/20 mb-8">
                      <Zap size={40} />
                   </div>
                   <h2 className="text-4xl font-black font-geist tracking-tighter mb-4 uppercase">Upgrade to Command Tier</h2>
                   <p className="text-lg text-white/50 font-medium mb-12 leading-relaxed">
                     Your current <span className="text-white font-black italic underline">Pro Tier</span> license is limited to 2 active Omni-Nodes. Scale to Command Tier for unlimited fleet deployment across global mesh clusters.
                   </p>
                   
                   <div className="grid grid-cols-2 gap-6 w-full mb-12 text-left">
                      <div className="p-6 bg-white/5 border border-white/5 rounded-[2rem]">
                         <ShieldCheck className="text-teal mb-3" size={24} />
                         <h4 className="text-xs font-black uppercase tracking-widest text-white mb-1">Infinite Fleet</h4>
                         <p className="text-[10px] text-white/30 font-medium">No limits on node activation.</p>
                      </div>
                      <div className="p-6 bg-white/5 border border-white/5 rounded-[2rem]">
                         <Activity className="text-teal mb-3" size={24} />
                         <h4 className="text-xs font-black uppercase tracking-widest text-white mb-1">2K Resolution</h4>
                         <p className="text-[10px] text-white/30 font-medium">Advanced Neural visualization.</p>
                      </div>
                   </div>

                   <div className="flex flex-col sm:flex-row gap-4 w-full">
                      <button className="flex-1 py-5 bg-teal text-black font-black uppercase tracking-widest rounded-2xl shadow-xl hover:scale-[1.02] transition-transform">
                        Upgrade Now • $499/mo
                      </button>
                      <button onClick={() => setShowUpgradeModal(false)} className="flex-1 py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all">
                        Dismiss
                      </button>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FleetSelector;
