
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Lock, Mail, AlertTriangle, Shield } from 'lucide-react';

const SuspensionLock: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[9999] bg-[#010103] flex items-center justify-center p-6 overflow-hidden"
    >
      {/* Red Pulse Perimeter */}
      <motion.div 
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.02, 1]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-4 border-2 border-red-500/30 rounded-[3rem] pointer-events-none"
      />
      
      {/* Background Warning Patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full flex flex-wrap gap-20 p-20 transform -rotate-12">
          {[...Array(20)].map((_, i) => (
            <span key={i} className="text-red-500 font-black text-9xl">SUSPENDED</span>
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative z-10 w-full max-w-xl text-center"
      >
        <div className="flex justify-center mb-10">
          <div className="relative">
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-red-500 blur-3xl rounded-full"
            />
            <div className="relative w-24 h-24 rounded-[2rem] bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shadow-[0_0_50px_rgba(239,68,68,0.2)]">
              <Lock size={48} strokeWidth={1.5} />
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-black border border-red-500/50 flex items-center justify-center text-red-500 shadow-xl">
              <ShieldAlert size={20} />
            </div>
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-black font-geist tracking-tighter text-white mb-6 uppercase">
          Node <span className="text-red-500">Deactivated.</span>
        </h1>
        
        <div className="bg-red-500/5 border border-red-500/10 rounded-3xl p-8 mb-10 backdrop-blur-xl">
          <p className="text-lg text-slate-300 font-medium leading-relaxed mb-6">
            This Omni-Node has been suspended by the <span className="text-white font-black">Overwatch Command</span> due to a security violation or manual Kill Switch activation.
          </p>
          <div className="flex items-center justify-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-red-500/60">
            <span className="flex items-center gap-2"><AlertTriangle size={14} /> Protocol Breach</span>
            <div className="w-1 h-1 rounded-full bg-red-500/20" />
            <span className="flex items-center gap-2"><Shield size={14} /> Egress Locked</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="mailto:operations@teamstrength.us?subject=Omni-Node Suspension Inquiry"
            className="w-full sm:w-auto px-10 py-5 bg-red-600 text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-red-700 transition-all shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <Mail size={20} /> Contact Operations
          </a>
          <button 
            disabled
            className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 text-slate-500 font-black rounded-2xl cursor-not-allowed opacity-50"
          >
            Request Reactivation
          </button>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5">
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] max-w-sm mx-auto leading-relaxed">
            Deactivation confirms cessation of autonomous functions per <span className="text-slate-400">International Humanitarian Law (IHL)</span> protocols.
          </p>
          <p className="mt-4 font-mono text-[8px] text-red-500/40 uppercase tracking-widest">
            Audit ID: DEEP-SYNC-KILL-90412-SHARD-PHX
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SuspensionLock;
