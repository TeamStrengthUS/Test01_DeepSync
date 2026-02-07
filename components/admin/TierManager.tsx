
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Add missing RefreshCw import
import { 
  Package, 
  Plus, 
  DollarSign, 
  Fuel, 
  Cpu, 
  ToggleLeft, 
  ToggleRight, 
  Save, 
  X, 
  Settings2,
  Database,
  ShieldCheck,
  ChevronRight,
  MoreVertical,
  Trash2,
  RefreshCw
} from 'lucide-react';

interface TierDefinition {
  tier_id: string;
  display_name: string;
  voice_fuel_cap: number;
  node_limit: number;
  monthly_price_usd: number;
  is_active: boolean;
  features_list: string[];
}

const TierManager: React.FC = () => {
  const [tiers, setTiers] = useState<TierDefinition[]>([
    {
      tier_id: 'scout_free',
      display_name: 'Scout Class',
      voice_fuel_cap: 1000,
      node_limit: 1,
      monthly_price_usd: 0,
      is_active: true,
      features_list: ["1,000 Mins Voice Fuel", "1 Omni-Node"]
    },
    {
      tier_id: 'command_pro',
      display_name: 'Command Class',
      voice_fuel_cap: 999999,
      node_limit: 5,
      monthly_price_usd: 29,
      is_active: true,
      features_list: ["Unlimited Voice Fuel", "5 Omni-Nodes"]
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [editingTier, setEditingTier] = useState<TierDefinition | null>(null);

  const [formData, setFormData] = useState<TierDefinition>({
    tier_id: '',
    display_name: '',
    voice_fuel_cap: 1000,
    node_limit: 1,
    monthly_price_usd: 0,
    is_active: true,
    features_list: []
  });

  const openModal = (tier?: TierDefinition) => {
    if (tier) {
      setEditingTier(tier);
      setFormData(tier);
    } else {
      setEditingTier(null);
      setFormData({
        tier_id: '',
        display_name: '',
        voice_fuel_cap: 1000,
        node_limit: 1,
        monthly_price_usd: 0,
        is_active: true,
        features_list: []
      });
    }
    setIsModalOpen(true);
  };

  const handleDeploy = () => {
    setIsDeploying(true);
    // Simulation of Supabase .upsert()
    console.log(`[LOGISTICS] Deploying Tier: ${formData.tier_id}`);
    
    setTimeout(() => {
      if (editingTier) {
        setTiers(prev => prev.map(t => t.tier_id === editingTier.tier_id ? formData : t));
      } else {
        setTiers(prev => [...prev, formData]);
      }
      setIsDeploying(false);
      setIsModalOpen(false);
    }, 1500);
  };

  const toggleTierStatus = (id: string) => {
    setTiers(prev => prev.map(t => t.tier_id === id ? { ...t, is_active: !t.is_active } : t));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center bg-surface border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-teal/5 to-transparent pointer-events-none" />
        <div className="relative z-10 text-left">
          <h2 className="text-2xl font-black font-geist text-white uppercase tracking-tight flex items-center gap-3">
            <Package className="text-teal" size={24} /> Ecosystem Tier Logistics
          </h2>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Global Commercial Layer Configuration</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="relative z-10 px-8 py-4 bg-teal text-black font-black uppercase text-[10px] tracking-widest rounded-2xl hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] transition-all flex items-center gap-3"
        >
          <Plus size={16} /> Deploy New Tier
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Tier List Area */}
        <div className="xl:col-span-3">
          <div className="bg-surface border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl glass-card">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <th className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Display Identity</th>
                    <th className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Internal Slug</th>
                    <th className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Price (USD)</th>
                    <th className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Resource Matrix</th>
                    <th className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Status</th>
                    <th className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {tiers.map((tier) => (
                    <tr key={tier.tier_id} className="group hover:bg-white/[0.01] transition-colors">
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-teal/5 border border-teal/20 flex items-center justify-center text-teal">
                             <Package size={18} />
                           </div>
                           <span className="text-sm font-black text-white">{tier.display_name}</span>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <code className="text-[10px] font-mono text-slate-500 bg-white/5 px-2 py-1 rounded">
                          {tier.tier_id}
                        </code>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-1">
                          <span className="text-xl font-black text-white">${tier.monthly_price_usd}</span>
                          <span className="text-[9px] text-slate-500 font-bold uppercase">/mo</span>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex gap-4">
                           <div className="flex items-center gap-2 text-slate-400">
                             <Fuel size={14} className="text-teal/40" />
                             <span className="text-[10px] font-bold">{tier.voice_fuel_cap >= 999999 ? '∞' : tier.voice_fuel_cap}m</span>
                           </div>
                           <div className="flex items-center gap-2 text-slate-400">
                             <Cpu size={14} className="text-indigo-400/40" />
                             <span className="text-[10px] font-bold">{tier.node_limit} Node{tier.node_limit > 1 ? 's' : ''}</span>
                           </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                         <button 
                          onClick={() => toggleTierStatus(tier.tier_id)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${
                            tier.is_active 
                            ? 'bg-teal/5 border-teal/20 text-teal' 
                            : 'bg-slate-500/10 border-slate-500/20 text-slate-500'
                          }`}
                         >
                           {tier.is_active ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                           {tier.is_active ? 'Active' : 'Archived'}
                         </button>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <div className="flex justify-end gap-2">
                           <button 
                            onClick={() => openModal(tier)}
                            className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                           >
                             <Settings2 size={16} />
                           </button>
                           <button className="p-3 bg-red-500/5 rounded-xl text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all">
                             <Trash2 size={16} />
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

      {/* Deployment Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-void/90 backdrop-blur-2xl"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-surface border border-white/10 rounded-[3rem] shadow-[0_50px_150px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
            >
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal/10 flex items-center justify-center text-teal border border-teal/20">
                    <Database size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black font-geist text-white uppercase tracking-tight">
                      {editingTier ? 'Update Tier Protocol' : 'Initialize New Tier'}
                    </h3>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1 italic">IHL-Validated Deployment</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-4 text-slate-500 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-10 space-y-8 overflow-y-auto max-h-[70vh] no-scrollbar">
                <div className="grid grid-cols-2 gap-8">
                   <div className="space-y-3 text-left">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-2">Ecosystem Identity (Slug)</label>
                     <input 
                      type="text" 
                      value={formData.tier_id}
                      disabled={!!editingTier}
                      onChange={(e) => setFormData({...formData, tier_id: e.target.value})}
                      placeholder="e.g. sentinel_pro"
                      className="w-full bg-void/50 border border-white/5 rounded-2xl py-5 px-6 text-sm font-mono text-teal outline-none focus:border-teal/30 transition-all placeholder:text-slate-700 disabled:opacity-50"
                     />
                   </div>
                   <div className="space-y-3 text-left">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-2">Display Name</label>
                     <input 
                      type="text" 
                      value={formData.display_name}
                      onChange={(e) => setFormData({...formData, display_name: e.target.value})}
                      placeholder="e.g. Sentinel Class"
                      className="w-full bg-void/50 border border-white/5 rounded-2xl py-5 px-6 text-sm font-black text-white outline-none focus:border-teal/30 transition-all"
                     />
                   </div>
                </div>

                <div className="grid grid-cols-3 gap-8">
                   <div className="space-y-3 text-left">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                       <DollarSign size={10} /> Monthly USD
                     </label>
                     <input 
                      type="number" 
                      value={formData.monthly_price_usd}
                      onChange={(e) => setFormData({...formData, monthly_price_usd: parseInt(e.target.value)})}
                      className="w-full bg-void/50 border border-white/5 rounded-2xl py-5 px-6 text-sm font-black text-white outline-none focus:border-teal/30 transition-all"
                     />
                   </div>
                   <div className="space-y-3 text-left">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                       <Fuel size={10} /> Fuel Cap (Mins)
                     </label>
                     <input 
                      type="number" 
                      value={formData.voice_fuel_cap}
                      onChange={(e) => setFormData({...formData, voice_fuel_cap: parseInt(e.target.value)})}
                      className="w-full bg-void/50 border border-white/5 rounded-2xl py-5 px-6 text-sm font-black text-white outline-none focus:border-teal/30 transition-all"
                     />
                   </div>
                   <div className="space-y-3 text-left">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                       <Cpu size={10} /> Node Limit
                     </label>
                     <input 
                      type="number" 
                      value={formData.node_limit}
                      onChange={(e) => setFormData({...formData, node_limit: parseInt(e.target.value)})}
                      className="w-full bg-void/50 border border-white/5 rounded-2xl py-5 px-6 text-sm font-black text-white outline-none focus:border-teal/30 transition-all"
                     />
                   </div>
                </div>

                <div className="p-6 bg-teal/5 border border-teal/10 rounded-3xl flex items-center gap-6">
                   <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center text-teal">
                      <ShieldCheck size={20} />
                   </div>
                   <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic text-left">
                     Deploying these changes will immediately update the <span className="text-teal font-black">SubscriptionMatrix</span> for all active mesh users. Protocol propagation takes approximately 0.4ms.
                   </p>
                </div>
              </div>

              <div className="p-8 border-t border-white/5 flex gap-4">
                 <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-5 border border-white/10 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-white/5 transition-all"
                 >
                   Discard
                 </button>
                 <button 
                  onClick={handleDeploy}
                  disabled={isDeploying || !formData.tier_id || !formData.display_name}
                  className="flex-[2] py-5 bg-teal text-black font-black uppercase text-[10px] tracking-widest rounded-2xl hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                 >
                   {isDeploying ? <RefreshCw className="animate-spin" size={16} /> : <Save size={16} />}
                   Deploy Tier Configuration
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TierManager;
