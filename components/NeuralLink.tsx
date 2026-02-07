
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Terminal, Zap, Activity, Fuel, AlertTriangle, ShieldCheck } from 'lucide-react';
import Logo from './Logo.tsx';

interface Message {
  id: number;
  role: 'human' | 'agent';
  text: string;
  time: string;
}

const NeuralLink: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [voiceFuel, setVoiceFuel] = useState(1000); 
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'agent', text: 'INITIATING TACTICAL_LINK_V3.2. MESH_STATUS: ONLINE. AWAITING HUMAN_INGRESS.', time: '00:00' }
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
      role: 'human',
      text: input,
      time: new Date().toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    
    // Simulating heavy resource consumption for high-performance agent
    setVoiceFuel(prev => Math.max(0, prev - 25));

    // Mock Response from Agentic Dispatcher
    setTimeout(() => {
      const agentMsg: Message = {
        id: Date.now() + 1,
        role: 'agent',
        text: `DEEP_SYNC_DISPATCH: COMMAND RECEIVED. QUERYING PHX-VAULT-SHARD. VALIDATING AGAINST CONSTITUTION_V3.1. OPERATION STATUS: EXECUTED.`,
        time: new Date().toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, agentMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[200] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9, rotateY: 10 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="w-[440px] h-[650px] bg-[#010103]/90 border border-teal/40 rounded-[3rem] shadow-[0_50px_150px_rgba(45,212,191,0.2)] overflow-hidden flex flex-col mb-6 backdrop-blur-3xl font-mono"
          >
            {/* Tactical Header */}
            <div className="p-8 bg-black/60 border-matrix/10 flex justify-between items-center">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal/10 flex items-center justify-center text-teal border border-teal/30 relative">
                     <div className="absolute inset-0 bg-teal/20 blur-xl animate-pulse" />
                     <Terminal size={24} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-black text-white uppercase tracking-tight">Tactical Hub</h3>
                    <div className="flex items-center gap-2">
                       <ShieldCheck size={10} className="text-teal" />
                       <span className="text-[8px] font-black text-teal uppercase tracking-[0.2em]">Constitution Active</span>
                    </div>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="text-right">
                     <p className="text-[8px] font-black text-white/20 uppercase">Voice Fuel</p>
                     <p className={`text-[10px] font-black ${voiceFuel > 100 ? 'text-teal' : 'text-red-500'}`}>{voiceFuel}m</p>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="p-3 text-white/20 hover:text-white transition-colors bg-white/5 rounded-xl">
                     <X size={20} />
                  </button>
               </div>
            </div>

            {/* Neural Thread */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar bg-black/40 shadow-inner" ref={scrollRef}>
               {messages.map((m) => (
                 <div key={m.id} className={`flex flex-col ${m.role === 'human' ? 'items-end' : 'items-start'}`}>
                    <div className={`text-[8px] font-black uppercase tracking-widest mb-2 ${m.role === 'human' ? 'text-teal' : 'text-white/30'}`}>
                       {m.role === 'human' ? 'Human_Ingress' : 'Neural_Agent'} • {m.time}
                    </div>
                    <div className={`p-5 rounded-3xl max-w-[90%] text-[11px] font-bold leading-relaxed ${m.role === 'human' ? 'bg-teal/10 border border-teal/30 text-teal rounded-tr-none shadow-[0_0_30px_rgba(45,212,191,0.05)]' : 'bg-white/5 border border-white/10 text-white/90 rounded-tl-none'}`}>
                       {m.role === 'agent' && <span className="text-teal/40 mr-2">></span>}
                       {m.text}
                    </div>
                 </div>
               ))}
               {isTyping && (
                 <div className="flex flex-col items-start">
                    <div className="text-[8px] font-black uppercase tracking-widest mb-2 text-white/20">Synthesizing_DeepSync_Vault...</div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex gap-2">
                       <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-1.5 h-1.5 bg-teal rounded-full" />
                       <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-teal rounded-full" />
                       <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-teal rounded-full" />
                    </div>
                 </div>
               )}
               {voiceFuel <= 0 && (
                 <div className="p-6 bg-red-900/20 border border-red-500/40 rounded-3xl flex items-start gap-4">
                    <AlertTriangle size={20} className="text-red-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-red-500 font-black uppercase tracking-widest leading-relaxed">
                      CRITICAL: Voice Fuel Depleted. Neural ingress locked until manual operator refill.
                    </p>
                 </div>
               )}
            </div>

            {/* Tactical Ingress */}
            <div className="p-8 border-t border-white/5 bg-black/60">
               <div className="relative group">
                  <input 
                    type="text" 
                    value={input}
                    disabled={voiceFuel <= 0}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyUp={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={voiceFuel > 0 ? "COMMAND_INGRESS..." : "ACCESS_DENIED: NO_FUEL"}
                    className="w-full bg-surface/50 border border-white/10 focus:border-teal/40 rounded-2xl py-6 pl-6 pr-16 text-xs font-black outline-none transition-all placeholder:text-white/10 text-white disabled:opacity-20 uppercase"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={!input.trim() || voiceFuel <= 0}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-teal text-black flex items-center justify-center hover:shadow-[0_0_30px_rgba(45,212,191,0.5)] transition-all disabled:opacity-10 shadow-lg"
                  >
                    <Send size={16} />
                  </button>
               </div>
               <div className="mt-6 flex items-center justify-center gap-8 text-[7px] font-black text-white/10 uppercase tracking-[0.4em]">
                  <span className="flex items-center gap-2"><Activity size={10} /> Sync_0.04ms</span>
                  <div className="w-1 h-1 rounded-full bg-white/10" />
                  <span className="flex items-center gap-2"><Zap size={10} /> Mesh_Online</span>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary HUD Toggle */}
      <motion.button 
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-[0_20px_50px_rgba(45,212,191,0.3)] transition-all relative group z-[201] ${isOpen ? 'bg-white text-black' : 'bg-teal text-black'}`}
      >
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]" />
        {isOpen ? <X size={32} /> : <Logo size="sm" hideText />}
        {!isOpen && (
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-1 -right-1 w-6 h-6 bg-white border-4 border-teal rounded-full shadow-lg" 
          />
        )}
      </motion.button>
    </div>
  );
};

export default NeuralLink;
