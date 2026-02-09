
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  X, 
  Send, 
  Terminal, 
  Zap, 
  Activity, 
  Fuel, 
  AlertTriangle, 
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import Logo from './Logo.tsx';
import { supabase } from '../lib/supabaseClient.ts';


interface Message {
  id: string | number;
  role: 'human' | 'agent';
  text: string;
  time: string;
}

const NeuralLink: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [voiceFuel, setVoiceFuel] = useState(1000); 
  const [messages, setMessages] = useState<Message[]>([
    { id: 'init', role: 'agent', text: 'INITIATING TACTICAL_LINK_V3.2. MESH_STATUS: ONLINE. AWAITING HUMAN_INGRESS.', time: '00:00' }
  ]);
  const [userId, setUserId] = useState<string | null>(null);
  const [nodeId, setNodeId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. Subscribe to Outbound Relay (Messages from Agent to Human)
  useEffect(() => {
    if (!isOpen) return;
    let channel: ReturnType<typeof supabase.channel> | null = null;

    const init = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;
      setUserId(userData.user.id);

      const { data: nodes } = await supabase
        .from('teammate_node')
        .select('node_id')
        .eq('user_id', userData.user.id)
        .order('created_at', { ascending: true })
        .limit(1);

      setNodeId(nodes?.[0]?.node_id ?? null);

      channel = supabase
        .channel(`web_chat_relay_${userData.user.id}`)
        .on(
          'postgres_changes',
          { 
            event: 'INSERT', 
            schema: 'public', 
            table: 'web_chat_buffer',
            filter: `user_id=eq.${userData.user.id}`
          },
          (payload) => {
            const newMsg = payload.new;
            if (newMsg.direction !== 'outbound') return;
            setMessages(prev => [...prev, {
              id: newMsg.id,
              role: 'agent',
              text: newMsg.content,
              time: new Date(newMsg.created_at).toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit' })
            }]);
            setIsTyping(false);
          }
        )
        .subscribe();
    };

    init();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [isOpen]);

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || voiceFuel <= 0 || isSending) return;

    setIsSending(true);
    const timestamp = new Date().toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit' });
    
    // Optimistic UI Update
    const tempId = Date.now();
    setMessages(prev => [...prev, {
      id: tempId,
      role: 'human',
      text: input,
      time: timestamp
    }]);

    try {
      // 2. Insert into Inbound Relay (Human to Agent)
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Unauthenticated ingress");

      const { error } = await supabase
        .from('web_chat_buffer')
        .insert({
          user_id: userData.user.id,
          ...(nodeId ? { node_id: nodeId } : {}),
          direction: 'inbound',
          content: input,
          // node_id is handled by server-side logic or context in a full implementation
        });

      if (error) throw error;

      setInput('');
      setIsTyping(true); // Waiting for agent response via subscription
      setVoiceFuel(prev => Math.max(0, prev - 25)); // Fuel consumption simulation
    } catch (err) {
      console.error("[RELAY] Failed to push to buffer:", err);
      // Optional: Add error message to thread
    } finally {
      setIsSending(false);
    }
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
                       <span className="text-[8px] font-black text-teal uppercase tracking-[0.2em]">DB_RELAY ACTIVE</span>
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
                    <div className="text-[8px] font-black uppercase tracking-widest mb-2 text-white/20">AWAITING_RELAY_RESPONSE...</div>
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
                    disabled={voiceFuel <= 0 || isSending}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyUp={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={voiceFuel > 0 ? "COMMAND_INGRESS..." : "ACCESS_DENIED: NO_FUEL"}
                    className="w-full bg-surface/50 border border-white/10 focus:border-teal/40 rounded-2xl py-6 pl-6 pr-16 text-xs font-black outline-none transition-all placeholder:text-white/10 text-white disabled:opacity-20 uppercase"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={!input.trim() || voiceFuel <= 0 || isSending}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-teal text-black flex items-center justify-center hover:shadow-[0_0_30px_rgba(45,212,191,0.5)] transition-all disabled:opacity-10 shadow-lg"
                  >
                    {isSending ? <RefreshCw className="animate-spin" size={16} /> : <Send size={16} />}
                  </button>
               </div>
               <div className="mt-6 flex items-center justify-center gap-8 text-[7px] font-black text-white/10 uppercase tracking-[0.4em]">
                  <span className="flex items-center gap-2"><Activity size={10} /> Sync_0.04ms</span>
                  <div className="w-1 h-1 rounded-full bg-white/10" />
                  <span className="flex items-center gap-2"><Zap size={10} /> DB_Relay_Active</span>
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
