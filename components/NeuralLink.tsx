
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Terminal, Zap, Activity } from 'lucide-react';
import Logo from './Logo.tsx';

interface Message {
  id: number;
  role: 'user' | 'agent';
  text: string;
  time: string;
}

const NeuralLink: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'agent', text: 'ACKNOWLEDGED: TeamStrength Neural Link V3.1 initialized. Operational state: Optimal. How can I assist with your mission today?', time: '10:00' }
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
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      role: 'user',
      text: input,
      time: new Date().toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Mock Response
    setTimeout(() => {
      const agentMsg: Message = {
        id: Date.now() + 1,
        role: 'agent',
        text: `COMMAND RECEIVED: Processing through DeepSync Vault. Shard parity verified. Response consolidated based on Constitutional Protocol V3.1.`,
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
            className="w-96 h-[550px] bg-surface border border-white/5 rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col mb-6 glass-card border-teal/20"
          >
            {/* Header */}
            <div className="p-6 bg-void/50 border-b border-white/5 flex justify-between items-center">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center text-teal border border-teal/20 relative">
                     <div className="absolute inset-0 bg-teal/20 blur-md animate-pulse" />
                     <Terminal size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black font-geist text-white uppercase tracking-tight">Neural Link</h3>
                    <div className="flex items-center gap-1.5">
                       <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                       <span className="text-[8px] font-black text-teal uppercase tracking-[0.2em]">Live Sync</span>
                    </div>
                  </div>
               </div>
               <button onClick={() => setIsOpen(false)} className="p-2 text-white/20 hover:text-white transition-colors">
                  <X size={20} />
               </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar" ref={scrollRef}>
               {messages.map((m) => (
                 <div key={m.id} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`text-[8px] font-black uppercase tracking-widest mb-1.5 ${m.role === 'user' ? 'text-teal' : 'text-white/20'}`}>
                       {m.role === 'user' ? 'COMMAND' : 'ACKNOWLEDGED'} • {m.time}
                    </div>
                    <div className={`p-4 rounded-2xl max-w-[85%] text-xs font-medium leading-relaxed ${m.role === 'user' ? 'bg-teal/10 border border-teal/20 text-teal rounded-tr-none' : 'bg-void/50 border border-white/5 text-white/80 rounded-tl-none'}`}>
                       {m.text}
                    </div>
                 </div>
               ))}
               {isTyping && (
                 <div className="flex flex-col items-start">
                    <div className="text-[8px] font-black uppercase tracking-widest mb-1.5 text-white/20">AGENT TYPING...</div>
                    <div className="p-4 rounded-2xl bg-void/50 border border-white/5 flex gap-1">
                       <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-1 h-1 bg-teal rounded-full" />
                       <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} className="w-1 h-1 bg-teal rounded-full" />
                       <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }} className="w-1 h-1 bg-teal rounded-full" />
                    </div>
                 </div>
               )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-white/5 bg-void/30">
               <div className="relative group">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyUp={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Enter command..."
                    className="w-full bg-surface border border-white/5 focus:border-teal/30 rounded-2xl py-4 pl-6 pr-14 text-xs font-bold outline-none transition-all placeholder:text-white/10 text-white"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-teal text-black flex items-center justify-center hover:shadow-[0_0_15px_rgba(45,212,191,0.5)] transition-all disabled:opacity-20"
                  >
                    <Send size={14} />
                  </button>
               </div>
               <div className="mt-4 flex items-center justify-center gap-4 text-[7px] font-black text-white/10 uppercase tracking-[0.3em]">
                  <Activity size={10} /> Sync: 0.04ms
                  <div className="w-1 h-1 rounded-full bg-white/5" />
                  <Zap size={10} /> Vault: PHX-01
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-[1.5rem] bg-teal text-black flex items-center justify-center shadow-[0_20px_50px_rgba(45,212,191,0.3)] hover:scale-105 transition-all relative group ${isOpen ? 'rotate-90' : ''}`}
      >
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-[1.5rem]" />
        {isOpen ? <X size={28} /> : <Logo size="sm" hideText />}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-white border-2 border-teal rounded-full animate-bounce" />
        )}
      </button>
    </div>
  );
};

export default NeuralLink;
