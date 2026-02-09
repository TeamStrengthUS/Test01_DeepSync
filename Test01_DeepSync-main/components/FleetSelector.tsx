
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Cpu, Activity, Zap, ShieldCheck, CreditCard, X } from 'lucide-react';
import SubscriptionMatrix from './SubscriptionMatrix.tsx';

interface AgentNode {
  id: string;
  agent_callsign: string;
  status: 'active' | 'suspended';
  mesh_location: string;
}

const FleetSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  
  // Mocking data that would normally come from Supabase 'teammate_node' and 'subscriptions'
  const [nodes, setNodes] = useState<AgentNode[]>([
    { id: 'node_01', agent_callsign: 'Alpha', status: 'active', mesh_location: 'PHX-01' }
  ]);
  const [activeNode, setActiveNode] = useState(nodes[0]);
  const [subscription] = useState({ max_nodes: 5, tier: 'command_pro' });

  const selectNode = (node: AgentNode) => {
    setActiveNode(node);
    setIsOpen(false);
    console.log(`[FLEET] Switching context to: ${node.agent_callsign}`);
  };

  const handleDeployRequest = () => {
    setIsOpen(false);
    
    // Quota Logic
    if (nodes.length >= subscription.max_nodes) {
      setShowUpgradeModal(true);
    } else {
      initiateDeployment();
    }
  };

  const initiateDeployment = async () => {
    setIsDeploying(true);
    
    // New Multi-Agent logic: Identify specific node attributes
    const newNodeId = `node_0${nodes.length + 1}`;
    const callsign = nodes.length === 1 ? 'Bravo' : 'Charlie';

    console.log(`[FLEET] Dispatching launch signal for ${callsign} (ID: ${newNodeId})`);

    // Actual Dispatcher API Call simulation
    try {
      // In production: await fetch('/functions/v1/dispatcher', { 
      //   method: 'POST', 
      //   body: JSON.stringify({ user_id: 'usr_current', node_id: newNodeId }) 
      // });
      
      // Simulating network delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newNode: AgentNode = {
        id: newNodeId,
        agent_callsign: callsign,
        status: 'active',
        mesh_location: 'LDN-02'
      };
      
      setNodes([...nodes, newNode]);
      setActiveNode(newNode);
      setIsDeploying(false);
      console.log(`[FLEET] Neural Mesh confirmed deployment: ${newNode.agent_callsign}`);
    } catch (err) {
      console.error("[FLEET] Deployment collision or quota failure", err);
      setIsDeploying(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-4 pl-4 pr-6 py-2.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
        >
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center relative ${activeNode.status === 'active' ? 'bg-teal/10 text-teal border border-teal/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
            <Cpu size={16} />
            {activeNode.status === 'active' && <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-teal rounded-full animate-pulse" />}
          </div>
          <div className="text-left hidden sm:block">
             <p className="text-[10px] font-black text-white/20 uppercase tracking-widest leading-none mb-1">Fleet Callsign</p>
             <p className="text-sm font-black text-white leading-none">{activeNode.agent_callsign}</p>
          </div>
          <ChevronDown size={14} className={`text-white/20 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isDeploying && (
          <div className="px-4 py-2.5 bg-teal/10 border border-teal/20 rounded-xl flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-teal animate-ping" />
             <span className="text-[10px] font-black text-teal uppercase tracking-widest">Spawning Node...</span>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full right-0 mt-4 w-72 bg-surface/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-2xl p-4 z-50 overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-white/5 mb-2 flex justify-between items-center">
              <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Neural Fleet Registry</p>
              <span className="text-[9px] font-black text-teal uppercase">{nodes.length}/{subscription.max_nodes}</span>
            </div>
            
            <div className="space-y-1 max-h-60 overflow-y-auto no-scrollbar">
              {nodes.map(node => (
                <button 
                  key={node.id}
                  onClick={() => selectNode(node)}
                  className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all text-left group ${activeNode.id === node.id ? 'bg-teal/10 border border-teal/20' : 'hover:bg-white/5 border border-transparent'}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${node.status === 'active' ? 'text-teal' : 'text-red-500'}`}>
                    <Activity size={16} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-xs font-black uppercase tracking-widest ${activeNode.id === node.id ? 'text-teal' : 'text-white'}`}>{node.agent_callsign}</p>
                    <p className="text-[9px] font-bold text-white/20 tracking-widest">{node.mesh_location}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/5">
              <button 
                onClick={handleDeployRequest}
                className="w-full py-4 bg-teal text-black font-black uppercase text-[10px] tracking-widest rounded-xl flex items-center justify-center gap-3 hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] transition-all"
              >
                <Plus size={16} /> Deploy New Node
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upgrade Modal Overlay */}
      <AnimatePresence>
        {showUpgradeModal && (
          <div className="fixed inset-0 z-[1000] bg-void/90 backdrop-blur-2xl flex items-center justify-center p-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="w-full max-w-5xl max-h-[90vh] overflow-y-auto no-scrollbar bg-surface border border-white/10 rounded-[4rem] relative shadow-[0_0_100px_rgba(45,212,191,0.15)]"
            >
              <button 
                onClick={() => setShowUpgradeModal(false)}
                className="absolute top-10 right-10 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-all z-20"
              >
                <X size={24} />
              </button>
              
              <SubscriptionMatrix onUpgradeComplete={() => {
                console.log("STRIPE_PROMPT: Initiating Command Tier Checkout...");
                setShowUpgradeModal(false);
              }} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FleetSelector;
