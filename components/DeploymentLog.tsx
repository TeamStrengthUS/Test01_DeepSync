
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, AlertCircle, CheckCircle2 } from 'lucide-react';

interface DeploymentLogProps {
  onComplete: () => void;
  isError?: boolean;
  errorMessage?: string;
}

const SEQUENCE = [
  "> INITIALIZING NEURAL MESH...",
  "> SYNCING DEEPSYNC VAULT (ENCRYPTED)...",
  "> VERIFYING QUOTA: VOICE FUEL [OK]...",
  "> INJECTING CONSTITUTION & IHL PROTOCOLS...",
  "> LOADING OMNI-NODE CONTAINER...",
  "> ESTABLISHING SECURE UPLINK...",
  "> OPERATION STAGE: ACTIVE."
];

const DeploymentLog: React.FC<DeploymentLogProps> = ({ onComplete, isError = false, errorMessage }) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    if (visibleLines < SEQUENCE.length && !isError) {
      const timer = setTimeout(() => {
        setVisibleLines(prev => prev + 1);
      }, 600);
      return () => clearTimeout(timer);
    } else if (visibleLines === SEQUENCE.length && !isError) {
      const completionTimer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(completionTimer);
    }
  }, [visibleLines, onComplete, isError]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-black rounded-2xl border border-white/10 shadow-2xl overflow-hidden font-mono text-sm">
      {/* Terminal Header */}
      <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-teal/50" />
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
          <Terminal size={12} /> Activation Sequence
        </div>
      </div>

      {/* Terminal Content */}
      <div className="p-6 h-64 overflow-y-auto no-scrollbar flex flex-col justify-start gap-2">
        <AnimatePresence>
          {SEQUENCE.slice(0, visibleLines).map((line, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-center gap-3 ${idx === SEQUENCE.length - 1 ? 'text-teal font-black' : 'text-slate-400'}`}
            >
              <span className="shrink-0 opacity-50">[{new Date().toLocaleTimeString('en-GB', { hour12: false })}]</span>
              <span>{line}</span>
              {idx === visibleLines - 1 && idx < SEQUENCE.length - 1 && !isError && (
                <motion.div 
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-2 h-4 bg-teal/50"
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500"
          >
            <AlertCircle size={18} />
            <span className="font-black uppercase tracking-widest text-xs">
              > ERROR: {errorMessage || 'DEPLOYMENT ABORTED'}
            </span>
          </motion.div>
        )}

        {!isError && visibleLines === SEQUENCE.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-auto flex items-center justify-center gap-2 text-teal text-[10px] font-black uppercase tracking-[0.3em] py-4 animate-pulse"
          >
            <CheckCircle2 size={14} /> System Synchronized
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DeploymentLog;
