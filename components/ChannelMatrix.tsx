
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Slack, 
  MessageSquare, 
  Phone, 
  Zap, 
  ChevronDown, 
  HelpCircle, 
  Key, 
  RefreshCw, 
  ShieldCheck, 
  QrCode,
  Layers,
  Info
} from 'lucide-react';

interface Channel {
  id: string;
  name: string;
  icon: any;
  color: string;
  guide: string[];
  fields: { name: string; label: string; placeholder: string; type: string }[];
}

const CHANNELS: Channel[] = [
  {
    id: 'telegram',
    name: 'Telegram Matrix',
    icon: Send,
    color: 'text-[#0088cc]',
    guide: [
      "Open Telegram and search for @BotFather.",
      "Send /newbot to initialize a new Omni-Node.",
      "Copy the Bot Token provided by FatherBot.",
      "After launching, your agent will reply with a secure Pairing Code. Enter it here to authorize your identity."
    ],
    fields: [
      { name: 'token', label: '1. Secure Bot Token', placeholder: '712345678:AAE...', type: 'password' },
      { name: 'pairing', label: '2. Awaiting Pairing Code', placeholder: 'Enter 6-digit code...', type: 'text' }
    ]
  },
  {
    id: 'slack',
    name: 'Slack Ingress',
    icon: Slack,
    color: 'text-[#4A154B]',
    guide: [
      "Navigate to your Slack App Dashboard.",
      "Under 'Socket Mode', ensure it is toggled ON.",
      "Copy your xoxb- bot token and xapp- app token.",
      "Grant 'chat:write' and 'channels:history' permissions."
    ],
    fields: [
      { name: 'app_token', label: 'App-Level Token', placeholder: 'xapp-1-...', type: 'password' },
      { name: 'bot_token', label: 'Bot User OAuth Token', placeholder: 'xoxb-...', type: 'password' }
    ]
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Meta Link',
    icon: Phone,
    color: 'text-[#25D366]',
    guide: [
      "Open WhatsApp on your primary mobile device.",
      "Go to Settings > Linked Devices > Link a Device.",
      "Scan this code to link the Omni-Node to your device via the DeepSync sidecar.",
      "DeepSync will poll for the pairing status every 2 seconds."
    ],
    fields: [] 
  }
];

const ChannelCard: React.FC<{ channel: Channel; isActive: boolean }> = ({ channel, isActive }) => {
  const [expanded, setExpanded] = useState(false);
  const [enabled, setEnabled] = useState(isActive);
  const [isSyncing, setIsSyncing] = useState(false);
  const [qrState, setQrState] = useState<'idle' | 'generating' | 'ready'>('idle');
  const [qrCounter, setQrCounter] = useState(0);

  useEffect(() => {
    let timer: number;
    if (qrState === 'generating') {
      timer = window.setInterval(() => {
        setQrCounter(prev => prev + 1);
        if (qrCounter > 3) {
          setQrState('ready');
          clearInterval(timer);
        }
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [qrState, qrCounter]);

  const handleSave = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setEnabled(true);
    }, 2000);
  };

  const handleGenerateQR = () => {
    setQrState('generating');
    setQrCounter(0);
  };

  return (
    <div className={`group rounded-[2rem] border transition-all duration-500 overflow-hidden relative ${
      expanded ? 'border-teal/30 bg-white dark:bg-surface shadow-2xl' : 'border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-void/50'
    } ${enabled ? 'power-glow-border' : ''}`}>
      
      <div 
        onClick={() => setExpanded(!expanded)}
        className="p-8 cursor-pointer flex items-center justify-between relative z-10"
      >
        <div className="flex items-center gap-6">
          <div className={`w-14 h-14 rounded-2xl bg-white dark:bg-surface border border-slate-200 dark:border-white/10 flex items-center justify-center ${channel.color} shadow-sm transition-transform group-hover:scale-110`}>
            <channel.icon size={28} />
          </div>
          <div className="text-left">
            <h3 className="text-xl font-black font-geist text-slate-900 dark:text-white uppercase tracking-tight">{channel.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${enabled ? 'bg-teal shadow-[0_0_8px_#2DD4BF] animate-pulse' : 'bg-slate-400'}`} />
              <span className={`text-[10px] font-black uppercase tracking-widest ${enabled ? 'text-teal' : 'text-slate-400'}`}>
                {enabled ? 'Channel Synced' : 'Authorize Ingress Required'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-full border border-white/5">
             <Layers size={12} className="text-slate-400" />
             <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Shard: PHX-04</span>
          </div>
          <ChevronDown size={20} className={`text-slate-400 transition-transform duration-500 ${expanded ? 'rotate-180' : ''}`} />
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-slate-100 dark:border-white/5 relative z-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-10 border-r border-slate-100 dark:border-white/5 bg-white dark:bg-surface text-left">
                {channel.id === 'whatsapp' ? (
                  <div className="space-y-8 flex flex-col items-center">
                    <div className="w-full max-w-[220px] aspect-square bg-slate-50 dark:bg-void rounded-3xl border-2 border-dashed border-slate-200 dark:border-white/10 flex flex-col items-center justify-center relative overflow-hidden p-6 group/qr">
                      {qrState === 'idle' && (
                        <button 
                          onClick={handleGenerateQR} 
                          className="text-teal font-black uppercase text-[10px] tracking-widest flex flex-col items-center gap-3 group-hover/qr:scale-110 transition-transform"
                        >
                          <QrCode size={40} className="text-teal/40" /> Generate Secure QR
                        </button>
                      )}
                      {qrState === 'generating' && (
                        <div className="flex flex-col items-center gap-4 text-center">
                          <RefreshCw size={32} className="text-teal animate-spin" />
                          <div className="space-y-1">
                            <span className="text-[9px] font-black text-teal uppercase tracking-widest block">Polling DeepSync Vault...</span>
                            <span className="text-[8px] text-slate-400 font-bold italic">Polling cycle {qrCounter}</span>
                          </div>
                        </div>
                      )}
                      {qrState === 'ready' && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="relative"
                        >
                          <img 
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=OmniNode-${channel.id}-Sync-${qrCounter}`} 
                            className="w-full h-full invert dark:invert-0" 
                            alt="Sync QR Code" 
                          />
                          <div className="absolute inset-0 border-2 border-teal opacity-20 animate-pulse rounded-lg" />
                        </motion.div>
                      )}
                    </div>
                    {qrState === 'ready' && (
                       <p className="text-[10px] font-black text-teal uppercase tracking-widest flex items-center gap-2 text-center">
                         <Info size={12} /> Scan now to link Omni-Node via DeepSync sidecar
                       </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-8">
                    {channel.fields.map(field => (
                      <div key={field.name} className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-[0.2em] px-2">{field.label}</label>
                        <div className="relative">
                          <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-white/20" size={16} />
                          <input 
                            type={field.type}
                            placeholder={field.placeholder}
                            className="w-full bg-slate-50 dark:bg-void/50 border border-slate-200 dark:border-white/5 rounded-2xl py-5 pl-14 pr-4 font-mono text-xs outline-none focus:border-teal/40 transition-all text-slate-900 dark:text-white"
                          />
                        </div>
                      </div>
                    ))}

                    <button 
                      onClick={handleSave}
                      disabled={isSyncing}
                      className="w-full py-5 bg-teal text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] transition-all flex items-center justify-center gap-3"
                    >
                      {isSyncing ? <RefreshCw size={18} className="animate-spin" /> : <Zap size={18} />}
                      {isSyncing ? 'Linking Channel...' : 'Authorize Ingress'}
                    </button>
                  </div>
                )}
                
                <div className="mt-8 flex items-center justify-center gap-3 text-[8px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.2em]">
                  <ShieldCheck size={12} className="text-teal" /> Credentials Encrypted in Vault
                </div>
              </div>

              <div className="p-10 bg-slate-50/50 dark:bg-void/30 text-left">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-xl bg-teal/10 flex items-center justify-center text-teal">
                    <HelpCircle size={16} />
                  </div>
                  <h4 className="text-[10px] font-black text-teal uppercase tracking-widest">Protocol Setup Guide</h4>
                </div>
                <div className="space-y-6">
                  {channel.guide.map((step, i) => (
                    <div key={i} className="flex gap-6 group/step">
                      <div className="w-6 h-6 rounded-lg bg-white dark:bg-surface border border-slate-200 dark:border-white/10 flex items-center justify-center text-[10px] font-black font-geist text-slate-400 group-hover/step:text-teal group-hover/step:border-teal/40 transition-colors">
                        {(i + 1)}
                      </div>
                      <p className="text-sm font-medium text-slate-500 dark:text-white/50 leading-relaxed group-hover/step:text-slate-900 dark:group-hover/step:text-white/80 transition-colors">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-12 p-6 rounded-3xl bg-teal/5 border border-teal/20">
                   <p className="text-[10px] text-teal font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                     <Zap size={12} /> Pro-Tip
                   </p>
                   <p className="text-[11px] font-medium text-slate-600 dark:text-white/60 leading-relaxed italic">
                     Once paired, the Omni-Node will automatically ingest your chat history to build a unified Team IQ shard for the DeepSync Vault.
                   </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ChannelMatrix: React.FC = () => {
  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-end gap-6 text-left">
        <div className="max-w-xl">
          <h2 className="text-3xl font-black font-geist text-slate-900 dark:text-white flex items-center gap-4 mb-2">
            <Layers className="text-teal" size={28} /> Channel Matrix
          </h2>
          <p className="text-sm font-medium text-slate-500 dark:text-white/40">
            Configure multi-channel ingress for your Omni-Node. These tokens authorize the agent to bridge external communications with the Neural Mesh.
          </p>
        </div>
        <div className="px-5 py-3 bg-white dark:bg-surface border border-slate-200 dark:border-white/10 rounded-2xl flex items-center gap-3">
           <Zap size={16} className="text-teal" />
           <span className="text-[10px] font-black uppercase tracking-widest">Matrix Status: 3 Omni-Nodes Synced</span>
        </div>
      </header>

      <div className="space-y-6">
        {CHANNELS.map(channel => (
          <ChannelCard key={channel.id} channel={channel} isActive={channel.id === 'telegram'} />
        ))}
      </div>

      <div className="p-10 border border-dashed border-slate-200 dark:border-white/10 rounded-[3rem] text-center flex flex-col items-center gap-6">
         <div className="w-16 h-16 rounded-[2rem] bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400">
           <Layers size={32} />
         </div>
         <div className="max-w-sm">
           <h4 className="text-lg font-black font-geist mb-2">Request New Protocol</h4>
           <p className="text-sm text-slate-400 font-medium">Don't see your primary communication channel? Our engineers can build custom adapters for your stack.</p>
         </div>
         <button className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-black font-black uppercase text-[10px] tracking-widest rounded-xl hover:scale-105 transition-transform">
           Request Integration Shard
         </button>
      </div>
    </div>
  );
};

export default ChannelMatrix;
