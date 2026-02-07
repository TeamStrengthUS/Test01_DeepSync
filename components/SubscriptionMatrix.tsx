
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Shield, Globe, Cpu, Database, CreditCard, Star } from 'lucide-react';

interface TierProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  isCurrent?: boolean;
  isPopular?: boolean;
  ctaText: string;
  onCtaClick?: () => void;
  icon: any;
}

const PricingTier: React.FC<TierProps> = ({ 
  name, price, description, features, isCurrent, isPopular, ctaText, onCtaClick, icon: Icon 
}) => (
  <div className={`relative p-8 rounded-[3rem] border transition-all duration-500 flex flex-col h-full ${
    isPopular ? 'bg-teal/5 border-teal/30 shadow-[0_0_50px_rgba(45,212,191,0.1)]' : 'bg-void/40 border-white/5'
  }`}>
    {isPopular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal text-black text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg">
        Recommended Protocol
      </div>
    )}

    <div className="flex justify-between items-start mb-8">
      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-teal">
        <Icon size={28} />
      </div>
      <div className="text-right">
        <h3 className="text-2xl font-black font-geist text-white uppercase tracking-tight">{name}</h3>
        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">{description}</p>
      </div>
    </div>

    <div className="mb-10">
      <div className="flex items-baseline gap-1">
        <span className="text-5xl font-black font-geist text-white">{price}</span>
        <span className="text-slate-500 font-bold text-sm uppercase tracking-widest">/shard</span>
      </div>
    </div>

    <ul className="space-y-4 mb-12 flex-1">
      {features.map((f, i) => (
        <li key={i} className="flex items-start gap-3 text-xs font-medium text-slate-300">
          <div className="mt-0.5 w-4 h-4 rounded-full bg-teal/10 flex items-center justify-center shrink-0">
            <Check size={10} className="text-teal" />
          </div>
          {f}
        </li>
      ))}
    </ul>

    <button 
      onClick={onCtaClick}
      disabled={isCurrent}
      className={`w-full py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${
        isCurrent 
        ? 'bg-white/5 text-slate-500 border border-white/10 cursor-default' 
        : 'bg-teal text-black hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] hover:scale-[1.02]'
      }`}
    >
      {isCurrent ? 'Active Protocol' : <><CreditCard size={16} /> {ctaText}</>}
    </button>
  </div>
);

const SubscriptionMatrix: React.FC<{ onUpgradeComplete?: () => void }> = ({ onUpgradeComplete }) => {
  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal/20 bg-teal/5 text-teal text-[9px] font-black tracking-widest uppercase mb-6">
          <Shield size={12} /> Commercial Layer Deployment
        </div>
        <h2 className="text-4xl md:text-6xl font-black font-geist tracking-tighter text-white uppercase mb-4">
          Neural Mesh <span className="text-teal italic">Scaling.</span>
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto font-medium text-lg">
          Select your operational tier to expand fleet capacity and neural fuel reserves.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PricingTier 
          name="Scout"
          price="$0"
          description="Evaluation Protocol"
          icon={Globe}
          features={[
            "1,000 Minutes Neural Voice Fuel",
            "1 Active Omni-Node",
            "Basic Security Strike Logging",
            "DeepSync Vault (1GB Shard)",
            "Community Support Access"
          ]}
          isCurrent
          ctaText="Current Plan"
        />
        <PricingTier 
          name="Command"
          price="$199"
          description="High-Velocity Operations"
          icon={Zap}
          isPopular
          features={[
            "Unlimited Neural Voice Fuel",
            "Up to 5 Active Nodes (Swarm Mode)",
            "Full DeepVault Explorer Access",
            "Hardware-Abstracted Kill Switch",
            "Priority Tactical Support"
          ]}
          ctaText="Upgrade via Stripe"
          onCtaClick={onUpgradeComplete}
        />
      </div>

      <div className="mt-16 p-8 bg-white/5 border border-white/5 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 text-left">
        <div className="flex items-center gap-6">
           <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 border border-purple-500/20">
              <Star size={24} />
           </div>
           <div>
              <h4 className="text-sm font-black text-white uppercase tracking-widest mb-1">Custom Enterprise Mesh</h4>
              <p className="text-xs text-slate-500 font-medium max-w-xs">Absolute data sovereignty, on-prem nodes, and custom IHL auditing trails.</p>
           </div>
        </div>
        <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-white/10 transition-all">
           Contact HQ Operations
        </button>
      </div>
    </div>
  );
};

export default SubscriptionMatrix;
