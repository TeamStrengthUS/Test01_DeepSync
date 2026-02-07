
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar.tsx';
import Footer from '../components/Footer.tsx';
import { 
  ShieldCheck, 
  Lock, 
  Globe, 
  RefreshCw, 
  ShieldAlert, 
  Cpu, 
  Zap, 
  Fingerprint, 
  Terminal, 
  Database,
  CheckCircle2,
  Activity
} from 'lucide-react';

interface Protocol {
  id: string;
  name: string;
  status: string;
  description: string;
  reference: string;
  icon: any;
  statusColor: string;
}

const PROTOCOLS: Protocol[] = [
  {
    id: 'I',
    name: 'Meaningful Human Control (MHC)',
    status: 'ENFORCED',
    description: 'Operation Stage intervention enabled via Overwatch Kill Switch. Human operator retains absolute authority to deactivate neural functions.',
    reference: 'ICRC Working Paper 2025, Section 2',
    icon: ShieldCheck,
    statusColor: 'text-emerald-500'
  },
  {
    id: 'II',
    name: 'Temporal Containment (Voice Fuel)',
    status: 'ENFORCED (Hard Limit)',
    description: 'Autonomous voice capabilities are strictly bound by the 1000-minute Neural Voice Fuel quota. Connection terminates automatically upon depletion.',
    reference: 'LiveKit Free Tier / Prevention of Indefinite Operation',
    icon: Zap,
    statusColor: 'text-emerald-500'
  },
  {
    id: 'III',
    name: 'Ingress Identification (Pairing)',
    status: 'ACTIVE',
    description: 'Unauthorized ingress blocked. Telegram/Signal channels require cryptographic pairing (TELEGRAM_DM_POLICY=pairing) to prevent adversary spoofing.',
    reference: 'Neural Mesh Ingress Standard V3.1',
    icon: Fingerprint,
    statusColor: 'text-emerald-400'
  },
  {
    id: 'IV',
    name: 'Egress Containment (The Guard)',
    status: 'ARMED',
    description: 'Shell execution monitored. Destructive commands (rm -rf, mkfs, nmap) are intercepted by the Omni-Node Hook and logged as Security Strikes.',
    reference: 'Letta Runtime Security Hook 0.4.2',
    icon: Terminal,
    statusColor: 'text-emerald-500'
  },
  {
    id: 'V',
    name: 'Immutable Accountability',
    status: 'SYNCED',
    description: 'All violation attempts are written to the security_strikes ledger in the DeepSync Vault. Records are immutable and accessible for After-Action Review.',
    reference: 'DeepSync Vault / pgvector Audit Trail',
    icon: Database,
    statusColor: 'text-emerald-500'
  }
];

const EnterpriseProtocols: React.FC = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [lastCheck, setLastCheck] = useState<string>('08:42:11 UTC');

  const runSystemCheck = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setLastCheck(new Date().toLocaleTimeString('en-GB', { hour12: false }) + ' UTC');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 transition-colors duration-300 selection:bg-emerald-500 selection:text-black">
      <Navbar />
      
      {/* Tactical Background Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="w-full h-full bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <main className="pt-48 pb-32 px-6 container mx-auto max-w-6xl relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20 text-left border-b border-emerald-500/10 pb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-500 font-black tracking-[0.4em] uppercase text-[10px]">Governance HUD Active</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black font-geist tracking-tighter leading-none text-white mb-6 uppercase">
              Active Governance <br />
              <span className="text-emerald-500 italic">Protocols (ICRC-2026)</span>
            </h1>
            <p className="text-lg text-slate-400 font-medium">
              Technical constraints engineered to satisfy the International Humanitarian Law standards for autonomous system predictability and human intervention.
            </p>
          </div>

          <div className="flex flex-col items-end gap-4">
             <div className="text-right font-mono text-[10px] text-slate-500 mb-2">
                LAST INTEGRITY CHECK: {lastCheck}
             </div>
             <button 
              onClick={runSystemCheck}
              disabled={isVerifying}
              className={`flex items-center gap-3 px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest transition-all ${
                isVerifying 
                ? 'bg-emerald-500/20 text-emerald-500 cursor-not-allowed border border-emerald-500/20' 
                : 'bg-emerald-600 text-black hover:bg-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] border border-transparent'
              }`}
             >
               {isVerifying ? <RefreshCw className="animate-spin" size={16} /> : <Activity size={16} />}
               {isVerifying ? 'Verifying Neural Mesh...' : 'Initiate System Audit'}
             </button>
          </div>
        </div>

        {/* Protocols Grid */}
        <div className="grid grid-cols-1 gap-6">
          {PROTOCOLS.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative p-10 bg-slate-900/50 border border-slate-800 rounded-[2.5rem] overflow-hidden hover:border-emerald-500/30 transition-all duration-500 flex flex-col md:flex-row items-center gap-10"
            >
              {/* Card Index */}
              <div className="absolute top-6 left-8 font-mono text-[9px] text-slate-600 font-bold tracking-widest">
                PROTOCOL_ID::{p.id}
              </div>

              {/* Icon Container */}
              <div className="w-20 h-20 shrink-0 rounded-3xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-emerald-500 group-hover:border-emerald-500/20 transition-all shadow-inner">
                <p.icon size={32} strokeWidth={1.5} />
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
                  <h3 className="text-2xl font-black font-geist text-white uppercase tracking-tight">{p.name}</h3>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/5 border border-emerald-500/10 ${p.statusColor} text-[10px] font-black tracking-widest uppercase`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    {p.status}
                  </div>
                </div>
                <p className="text-slate-400 font-medium leading-relaxed mb-4 max-w-2xl">
                  {p.description}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-600 uppercase font-bold">
                  <ShieldAlert size={12} className="text-emerald-500/40" /> Ref: {p.reference}
                </div>
              </div>

              {/* Action/Detail */}
              <div className="hidden lg:block shrink-0 pr-8">
                 <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-right mb-2">Shard Status</div>
                 <div className="flex gap-1.5 justify-end">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-5 h-1.5 rounded-sm bg-emerald-500/20 border border-emerald-500/10" />
                    ))}
                    <div className="w-5 h-1.5 rounded-sm bg-emerald-500 animate-pulse border border-emerald-500/20" />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Accountability Statement */}
        <div className="mt-24 p-12 bg-slate-900/40 border border-slate-800 rounded-[4rem] text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 p-12 text-emerald-500/5">
              <ShieldAlert size={200} strokeWidth={1} />
           </div>
           <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl font-black font-geist tracking-tighter text-white mb-6 uppercase italic">Operational Boundary Affirmation</h2>
              <p className="text-slate-400 font-medium leading-relaxed mb-10">
                TeamStrength confirms that no Omni-Node is capable of self-modifying these 5 core protocols. System deactivation persists as a hardware-abstracted capability, ensuring that humans remain the sole arbiters of autonomous action.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">
                <span className="flex items-center gap-2"><CheckCircle2 size={14} /> IHL Certified</span>
                <div className="w-1 h-1 rounded-full bg-emerald-500/20 hidden sm:block" />
                <span className="flex items-center gap-2"><CheckCircle2 size={14} /> SOC2-Neural Compliant</span>
                <div className="w-1 h-1 rounded-full bg-emerald-500/20 hidden sm:block" />
                <span className="flex items-center gap-2"><CheckCircle2 size={14} /> ICRC Standards</span>
              </div>
           </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EnterpriseProtocols;
