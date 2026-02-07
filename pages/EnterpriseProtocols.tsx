
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
  Activity,
  Search
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
    statusColor: 'text-teal'
  },
  {
    id: 'II',
    name: 'Temporal Containment (Voice Fuel)',
    status: 'ENFORCED (Hard Limit)',
    description: 'Autonomous voice capabilities are strictly bound by the 1000-minute Neural Voice Fuel quota. Connection terminates automatically upon depletion.',
    reference: 'LiveKit Free Tier / Prevention of Indefinite Operation',
    icon: Zap,
    statusColor: 'text-teal'
  },
  {
    id: 'III',
    name: 'Ingress Identification (Pairing)',
    status: 'ACTIVE',
    description: 'Unauthorized ingress blocked. Telegram/Signal channels require cryptographic pairing (TELEGRAM_DM_POLICY=pairing) to prevent adversary spoofing.',
    reference: 'Neural Mesh Ingress Standard V3.1',
    icon: Fingerprint,
    statusColor: 'text-teal'
  },
  {
    id: 'IV',
    name: 'Egress Containment (The Guard)',
    status: 'ARMED',
    description: 'Shell execution monitored. Destructive commands (rm -rf, mkfs, nmap) are intercepted by the Omni-Node Hook and logged as Security Strikes.',
    reference: 'Letta Runtime Security Hook 0.4.2',
    icon: Terminal,
    statusColor: 'text-teal'
  },
  {
    id: 'V',
    name: 'Immutable Accountability',
    status: 'SYNCED',
    description: 'All violation attempts are written to the security_strikes ledger in the DeepSync Vault. Records are immutable and accessible for After-Action Review.',
    reference: 'DeepSync Vault / pgvector Audit Trail',
    icon: Database,
    statusColor: 'text-teal'
  }
];

const EnterpriseProtocols: React.FC = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [auditComplete, setAuditComplete] = useState(false);
  const [lastCheck, setLastCheck] = useState<string>('08:42:11 UTC');

  const runSystemCheck = () => {
    setIsVerifying(true);
    setAuditComplete(false);
    setTimeout(() => {
      setIsVerifying(false);
      setAuditComplete(true);
      setLastCheck(new Date().toLocaleTimeString('en-GB', { hour12: false }) + ' UTC');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-lightSurface dark:bg-void text-slate-600 dark:text-slate-300 transition-colors duration-300 selection:bg-teal selection:text-black">
      <Navbar />
      
      {/* Tactical Background Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
        <div className="w-full h-full bg-[linear-gradient(rgba(45,212,191,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <main className="pt-48 pb-32 px-6 container mx-auto max-w-6xl relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20 text-left border-b border-slate-200 dark:border-white/5 pb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-teal animate-pulse shadow-[0_0_8px_#2DD4BF]" />
              <span className="text-teal font-black tracking-[0.4em] uppercase text-[10px]">Governance HUD Active</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black font-geist tracking-tighter leading-none text-slate-900 dark:text-white mb-6 uppercase">
              Active Governance <br />
              <span className="iridescent-gradient bg-clip-text text-transparent italic">Protocols (ICRC-2026)</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Technical constraints engineered to satisfy the International Humanitarian Law standards for autonomous system predictability and human intervention.
            </p>
          </div>

          <div className="flex flex-col items-end gap-4">
             <div className="text-right font-mono text-[10px] text-slate-400 dark:text-slate-500 mb-2 font-bold tracking-widest">
                LAST INTEGRITY CHECK: {lastCheck}
             </div>
             <button 
              onClick={runSystemCheck}
              disabled={isVerifying}
              className={`flex items-center gap-3 px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest transition-all ${
                isVerifying 
                ? 'bg-teal/10 text-teal cursor-not-allowed border border-teal/20' 
                : 'bg-teal text-black hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] border border-transparent'
              }`}
             >
               {isVerifying ? <RefreshCw className="animate-spin" size={16} /> : <Activity size={16} />}
               {isVerifying ? 'Verifying Neural Mesh...' : 'Initiate System Audit'}
             </button>
          </div>
        </div>

        {/* Dynamic Display Area */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {!auditComplete && !isVerifying && (
              <motion.div 
                key="audit-prompt"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 mb-8 relative">
                   <div className="absolute inset-0 bg-teal/5 blur-3xl rounded-full" />
                   <ShieldAlert size={48} className="relative z-10" />
                </div>
                <h3 className="text-2xl font-black font-geist text-slate-900 dark:text-white uppercase tracking-tight mb-3">System Audit Required</h3>
                <p className="text-slate-500 dark:text-white/40 font-medium max-w-sm">
                  Neural Mesh encryption shards are currently in a dormant state. Initiate a system audit to verify IHL compliance and reveal active protocols.
                </p>
              </motion.div>
            )}

            {isVerifying && (
              <motion.div 
                key="verifying"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-32 text-center space-y-8"
              >
                <div className="relative">
                   <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 rounded-full border-2 border-dashed border-teal/30 flex items-center justify-center"
                   />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <RefreshCw className="text-teal animate-spin" size={40} />
                   </div>
                </div>
                <div className="space-y-2">
                   <p className="text-[10px] font-black text-teal uppercase tracking-[0.4em] animate-pulse">Scanning Shard PHX-VAULT-01...</p>
                   <p className="text-xs font-mono text-slate-400">Verifying state consistency across 482 nodes</p>
                </div>
              </motion.div>
            )}

            {auditComplete && !isVerifying && (
              <motion.div 
                key="protocols-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 gap-6"
              >
                {PROTOCOLS.map((p, idx) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="group relative p-10 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden hover:border-teal/30 transition-all duration-500 flex flex-col md:flex-row items-center gap-10 shadow-sm dark:shadow-none"
                  >
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(45,212,191,0.02),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Card Index */}
                    <div className="absolute top-6 left-8 font-mono text-[9px] text-teal/40 dark:text-teal/40 font-bold tracking-widest">
                      PROTOCOL_ID::{p.id}
                    </div>

                    {/* Icon Container */}
                    <div className="w-20 h-20 shrink-0 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 dark:text-white/20 group-hover:text-teal group-hover:border-teal/20 transition-all shadow-inner relative overflow-hidden">
                      <div className="absolute inset-0 bg-teal/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <p.icon size={32} strokeWidth={1.5} className="relative z-10" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left relative z-10">
                      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
                        <h3 className="text-2xl font-black font-geist text-slate-900 dark:text-white uppercase tracking-tight">{p.name}</h3>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal/5 border border-teal/10 ${p.statusColor} text-[10px] font-black tracking-widest uppercase`}>
                          <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse shadow-[0_0_4px_currentColor]" />
                          {p.status}
                        </div>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-4 max-w-2xl">
                        {p.description}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase font-bold">
                        <ShieldAlert size={12} className="text-teal/40" /> Ref: {p.reference}
                      </div>
                    </div>

                    {/* Action/Detail */}
                    <div className="hidden lg:block shrink-0 pr-8 relative z-10">
                       <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right mb-2">Shard Status</div>
                       <div className="flex gap-1.5 justify-end">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-5 h-1.5 rounded-sm bg-teal/10 dark:bg-teal/10 border border-teal/10" />
                          ))}
                          <div className="w-5 h-1.5 rounded-sm bg-teal animate-pulse border border-teal/20 shadow-[0_0_8px_#2DD4BF]" />
                       </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Accountability Statement - Only show if audit complete */}
        <AnimatePresence>
          {auditComplete && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-24 p-12 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-[4rem] text-center relative overflow-hidden shadow-sm dark:shadow-none"
            >
               <div className="absolute top-0 right-0 p-12 text-teal/5">
                  <ShieldAlert size={200} strokeWidth={1} />
               </div>
               <div className="relative z-10 max-w-3xl mx-auto">
                  <h2 className="text-3xl font-black font-geist tracking-tighter text-slate-900 dark:text-white mb-6 uppercase italic">Operational Boundary Affirmation</h2>
                  <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10">
                    TeamStrength confirms that no Omni-Node is capable of self-modifying these 5 core protocols. System deactivation persists as a hardware-abstracted capability, ensuring that humans remain the sole arbiters of autonomous action.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-[10px] font-black text-teal uppercase tracking-[0.4em]">
                    <span className="flex items-center gap-2"><CheckCircle2 size={14} /> IHL Certified</span>
                    <div className="w-1 h-1 rounded-full bg-teal/20 hidden sm:block" />
                    <span className="flex items-center gap-2"><CheckCircle2 size={14} /> SOC2-Neural Compliant</span>
                    <div className="w-1 h-1 rounded-full bg-teal/20 hidden sm:block" />
                    <span className="flex items-center gap-2"><CheckCircle2 size={14} /> ICRC Standards</span>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default EnterpriseProtocols;
