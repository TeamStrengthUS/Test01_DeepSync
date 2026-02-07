
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Terminal, Zap, Activity, Fuel, AlertTriangle } from 'lucide-react';
import Logo from './Logo.tsx';

interface Message {
  id: number;
  role: 'user' | 'agent';
  text: string;
  time: string;
}

const NeuralLink: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [voiceFuel, setVoiceFuel] = useState(450); // Simulated fuel state
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'agent', text: 'ACKNOWLEDGED: Neural Link V3.2 initialized. Shard parity verified. Awaiting command ingress.', time: '10:00' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim() || voiceFuel <= 0) return;

    const userMsg: Message = {
      id: Date.now(),
      role: 'user',
      text: input,
      time: new Date().toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    
    // Simulate fuel consumption
    setVoiceFuel(prev => Math.max(0, prev - 15));

    // Mock Response from Agent
    setTimeout(() => {
      const agentMsg: Message = {
        id: Date.now() + 1,
        role: 'agent',
        text: `DEEP_SYNC_RESPONSE: Analyzing ingress in PHX-01 Vault. Command processed according to Constitutional Protocol V3.1. Result committed to immutable ledger.`,
        time: new Date().toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, agentMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="w-[420px] h-[600px] bg-surface border border-teal/20 rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col mb-6 glass-card"
          >
            {/* Header HUD */}
            <div className="p-6 bg-void/80 border-b border-white/5 flex justify-between items-center backdrop-blur-md">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center text-teal border border-teal/20 relative overflow-hidden">
                     <div className="absolute inset-0 bg-teal/20 blur-md animate-pulse" />
                     <Terminal size={20} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-black font-geist text-white uppercase tracking-tight">Neural Link HUD</h3>
                    <div className="flex items-center gap-1.5">
                       <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                       <span className="text-[8px] font-black text-teal uppercase tracking-[0.2em]">Egress Guard Active</span>
                    </div>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="text-right">
                     <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Fuel</p>
                     <p className={`text-[10px] font-black ${voiceFuel > 0 ? 'text-teal' : 'text-red-500'}`}>{voiceFuel}m</p>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="p-2 text-white/20 hover:text-white transition-colors">
                     <X size={20} />
                  </button>
               </div>
            </div>

            {/* Chat Space */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-black/20" ref={scrollRef}>
               {messages.map((m) => (
                 <div key={m.id} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`text-[8px] font-black uppercase tracking-widest mb-1.5 ${m.role === 'user' ? 'text-teal' : 'text-white/20'}`}>
                       {m.role === 'user' ? 'Human Ingress' : 'Agent Consensus'} • {m.time}
                    </div>
                    <div className={`p-4 rounded-2xl max-w-[90%] text-xs font-medium leading-relaxed font-mono ${m.role === 'user' ? 'bg-teal/10 border border-teal/20 text-teal rounded-tr-none' : 'bg-void/50 border border-white/5 text-white/80 rounded-tl-none'}`}>
                       {m.role === 'agent' && <span className="text-teal/40 mr-2">></span>}
                       {m.text}
                    </div>
                 </div>
               ))}
               {isTyping && (
                 <div className="flex flex-col items-start">
                    <div className="text-[8px] font-black uppercase tracking-widest mb-1.5 text-white/20">Processing neural flux...</div>
                    <div className="p-4 rounded-2xl bg-void/50 border border-white/5 flex gap-1.5">
                       <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }} className="w-1 h-1 bg-teal rounded-full" />
                       <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-1 h-1 bg-teal rounded-full" />
                       <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-1 h-1 bg-teal rounded-full" />
                    </div>
                 </div>
               )}
               {voiceFuel <= 0 && (
                 <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3">
                    <AlertTriangle size={14} className="text-red-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest leading-relaxed">
                      Voice Fuel depleted. Neural Link ingress suspended until next billing cycle or human manual refill.
                    </p>
                 </div>
               )}
            </div>

            {/* Input HUD */}
            <div className="p-6 border-t border-white/5 bg-void/50 backdrop-blur-md">
               <div className="relative group">
                  <input 
                    type="text" 
                    value={input}
                    disabled={voiceFuel <= 0}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyUp={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={voiceFuel > 0 ? "Enter encrypted command..." : "Ingress locked: No fuel"}
                    className="w-full bg-surface border border-white/5 focus:border-teal/30 rounded-2xl py-5 pl-6 pr-14 text-xs font-bold font-mono outline-none transition-all placeholder:text-white/10 text-white disabled:opacity-50"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={!input.trim() || voiceFuel <= 0}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-teal text-black flex items-center justify-center hover:shadow-[0_0_20px_rgba(45,212,191,0.5)] transition-all disabled:opacity-20 shadow-lg"
                  >
                    <Send size={16} />
                  </button>
               </div>
               <div className="mt-4 flex items-center justify-center gap-6 text-[7px] font-black text-white/10 uppercase tracking-[0.4em]">
                  <span className="flex items-center gap-1"><Activity size={10} /> Sync 0.04ms</span>
                  <div className="w-1 h-1 rounded-full bg-white/5" />
                  <span className="flex items-center gap-1"><Zap size={10} /> PHX-01 Shard</span>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-[0_20px_50px_rgba(45,212,191,0.3)] transition-all relative group z-[101] ${isOpen ? 'bg-white text-black rotate-90' : 'bg-teal text-black'}`}
      >
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-[1.5rem]" />
        {isOpen ? <X size={28} /> : <Logo size="sm" hideText />}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-white border-2 border-teal rounded-full animate-bounce shadow-lg" />
        )}
      </motion.button>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(45, 212, 191, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(45, 212, 191, 0.3); }
      `}</style>
    </div>
  );
};

export default NeuralLink;
