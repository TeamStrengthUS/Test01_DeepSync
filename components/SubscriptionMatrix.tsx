import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  Zap, 
  Shield, 
  Globe, 
  Cpu, 
  Database, 
  CreditCard, 
  Star, 
  RefreshCw,
  AlertCircle,
  AlertTriangle,
  Package,
  ExternalLink
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient.ts';

interface TierDefinition {
  tier_id: string;
  display_name: string;
  voice_fuel_cap: number;
  node_limit: number;
  monthly_price_usd: number;
  features_list: string[];
  is_active: boolean;
}

interface PricingTierProps {
  tier: TierDefinition;
  isCurrent?: boolean;
  onUpgradeComplete?: () => void;
}

const PricingTier: React.FC<PricingTierProps> = ({ tier, isCurrent, onUpgradeComplete }) => {
  const [isInitializing, setIsInitializing] = useState(false);
  const isPopular = tier.tier_id === 'command_pro';
  
  const getIcon = () => {
    if (tier.tier_id.includes('scout')) return Globe;
    if (tier.tier_id.includes('command')) return Zap;
    if (tier.tier_id.includes('enterprise')) return Shield;
    return Package;
  };

  const Icon = getIcon();

  const handleCommercialActivation = async () => {
    if (isCurrent) return;
    setIsInitializing(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert("Authorization Required: Please sign in to upgrade your mission protocols.");
        return;
      }

      // Call the Stripe Edge Function for a secure session
      const { data, error } = await supabase.functions.invoke('stripe', {
        body: { 
          tier_id: tier.tier_id, 
          user_id: user.id,
          email: user.email 
        },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        path: '/checkout'
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Checkout URL generation failed.");
      }
    } catch (err) {
      console.error("[COMMERCIAL] Upgrade failed:", err);
      alert("Billing Integration Error: Unable to initialize secure checkout. Contact HQ.");
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative p-8 rounded-[3rem] border transition-all duration-500 flex flex-col h-full ${
        isPopular ? 'bg-teal/5 border-teal/30 shadow-[0_0_50px_rgba(45,212,191,0.1)]' : 'bg-void/40 border-white/5'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal text-black text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg">
          Recommended Protocol
        </div>
      )}

      <div className="flex justify-between items-start mb-8 text-left">
        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-teal">
          <Icon size={28} />
        </div>
        <div className="text-right">
          <h3 className="text-2xl font-black font-geist text-white uppercase tracking-tight">{tier.display_name}</h3>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">
            {tier.node_limit} Active Node{tier.node_limit > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="mb-10 text-left">
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-black font-geist text-white">${tier.monthly_price_usd}</span>
          <span className="text-slate-500 font-bold text-sm uppercase tracking-widest">/mo</span>
        </div>
      </div>

      <ul className="space-y-4 mb-12 flex-1 text-left">
        {(tier.features_list || []).map((feature, i) => {
          const isVoiceFuel = feature.toLowerCase().includes('voice fuel');
          return (
            <li key={i} className="flex items-start gap-3 text-xs font-medium text-slate-300">
              <div className="mt-0.5 w-4 h-4 rounded-full bg-teal/10 flex items-center justify-center shrink-0">
                <Check size={10} className="text-teal" />
              </div>
              <div className="flex flex-col gap-1">
                <span>{feature}</span>
                {isVoiceFuel && (
                  <span className="inline-flex items-center gap-1.5 text-[8px] font-black text-teal uppercase tracking-widest px-2 py-0.5 bg-teal/5 border border-teal/20 rounded w-fit">
                    <AlertTriangle size={8} /> Hard Operational Limit (IHL)
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <button 
        onClick={handleCommercialActivation}
        disabled={isCurrent || isInitializing}
        className={`w-full py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${
          isCurrent 
          ? 'bg-white/5 text-slate-500 border border-white/10 cursor-default' 
          : isInitializing
            ? 'bg-white/5 text-slate-700 border border-white/5 cursor-wait'
            : 'bg-teal text-black hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] hover:scale-[1.02]'
        }`}
      >
        {isCurrent ? 'Active Protocol' : (
          <>
            <CreditCard size={16} /> 
            {isInitializing ? 'Handshaking...' : 'Initialize Tier'}
            {!isInitializing && <ExternalLink size={12} className="opacity-50" />}
          </>
        )}
      </button>
    </motion.div>
  );
};

const SubscriptionMatrix: React.FC<{ onUpgradeComplete?: () => void }> = ({ onUpgradeComplete }) => {
  const [tiers, setTiers] = useState<TierDefinition[]>([]);
  const [currentTier, setCurrentTier] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTiers = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        const [tiersRes, subRes] = await Promise.all([
          supabase.from('tier_definitions').select('*').eq('is_active', true).order('monthly_price_usd', { ascending: true }),
          user ? supabase.from('subscriptions').select('tier').eq('user_id', user.id).maybeSingle() : Promise.resolve({ data: null })
        ]);

        if (tiersRes.error) throw tiersRes.error;
        setTiers(tiersRes.data || []);
        setCurrentTier(subRes.data?.tier || 'scout_free');
      } catch (err: any) {
        console.error('[PRICING] Error fetching dynamic tiers:', err);
        setError('Failed to sync tier logistics from DeepSync Vault.');
      } finally {
        setLoading(false);
      }
    };

    fetchTiers();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal/20 bg-teal/5 text-teal text-[10px] font-black tracking-widest uppercase mb-6 backdrop-blur-md">
          <Shield size={12} /> Commercial Layer Deployment
        </div>
        <h2 className="text-4xl md:text-6xl font-black font-geist tracking-tighter text-white uppercase mb-4">
          Neural Mesh <span className="text-teal italic">Scaling.</span>
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto font-medium text-lg leading-relaxed">
          Select your operational tier to expand fleet capacity and neural fuel reserves within the TeamStrength ecosystem.
        </p>
      </div>

      <div className="min-h-[400px] relative">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 space-y-6"
            >
              <RefreshCw className="text-teal animate-spin" size={40} />
              <p className="text-[10px] font-black text-teal uppercase tracking-[0.4em]">Querying Tier Logistics Shards...</p>
            </motion.div>
          ) : error ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 border border-red-500/20 bg-red-500/5 rounded-[3rem] text-center max-w-md mx-auto"
            >
              <AlertCircle className="text-red-500 mx-auto mb-6" size={48} />
              <h3 className="text-xl font-black text-white uppercase mb-2">Sync Failure</h3>
              <p className="text-slate-400 text-sm font-medium mb-8">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-white/5 border border-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                Retry Handshake
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {tiers.map((tier) => (
                <PricingTier 
                  key={tier.tier_id} 
                  tier={tier} 
                  isCurrent={tier.tier_id === currentTier}
                  onUpgradeComplete={onUpgradeComplete}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-16 p-8 bg-white/5 border border-white/5 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 text-left transition-all hover:border-teal/20 group">
        <div className="flex items-center gap-6">
           <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 border border-purple-500/20 group-hover:scale-110 transition-transform">
              <Star size={24} />
           </div>
           <div>
              <h4 className="text-sm font-black text-white uppercase tracking-widest mb-1">Custom Enterprise Mesh</h4>
              <p className="text-xs text-slate-500 font-medium max-w-xs">Absolute data sovereignty, on-prem nodes, and custom IHL auditing trails for global organizations.</p>
           </div>
        </div>
        <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-teal hover:text-black transition-all">
           Contact HQ Operations
        </button>
      </div>

      <div className="mt-12 text-center">
         <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] flex items-center justify-center gap-3">
           <AlertCircle size={10} /> All resource caps are strictly enforced by the DeepSync sidecar protocol.
         </p>
      </div>
    </div>
  );
};

export default SubscriptionMatrix;