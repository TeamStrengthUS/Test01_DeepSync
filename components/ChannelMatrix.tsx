
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
  Info,
  Layers
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
    name: 'Telegram Ingress',
    icon: Send,
    color: 'text-[#0088cc]',
    guide: [
      "Open Telegram and search for @BotFather.",
      "Send the command /newbot.",
      "Name your agent (e.g., 'MyTeamMate').",
      "Copy the API Token and paste it here.",
      "Security: Once live, send your Pairing Code to the bot immediately."
    ],
    fields: [{ name: 'token', label: 'Bot Token', placeholder: '712345678:AAE...', type: 'password' }]
  },
  {
    id: 'slack',
    name: 'Slack Matrix',
    icon: Slack,
    color: 'text-[#4A154B]',
    guide: [
      "Go to api.slack.com/apps and create a new App.",
      "Under Socket Mode, toggle 'Enable Socket Mode' on.",
      "Generate an App-Level Token (xapp-...) and paste it here.",
      "Go to OAuth & Permissions, add app_mentions:read and chat:write scopes.",
      "Install to Workspace and copy the Bot User OAuth Token (xoxb-...)."
    ],
    fields: [
      { name: 'app_token', label: 'App-Level Token', placeholder: 'xapp-1-...', type: 'password' },
      { name: 'bot_token', label: 'Bot User OAuth Token', placeholder: 'xoxb-...', type: 'password' }
    ]
  },
  {
    id: 'discord',
    name: 'Discord Nexus',
    icon: MessageSquare,
    color: 'text-[#5865F2]',
    guide: [
      "Go to the Discord Developer Portal.",
      "Create an Application and go to the Bot tab.",
      "Crucial: Scroll down and enable 'Message Content Intent'.",
      "Click 'Reset Token', copy it, and paste it here.",
      "Use the 'OAuth2 URL Generator' to invite the bot to your server."
    ],
    fields: [{ name: 'token', label: 'Bot Token', placeholder: 'MTE5...', type: 'password' }]
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Meta Link',
    icon: Phone,
    color: 'text-[#25D366]',
    guide: [
      "Click 'Generate QR' below.",
      "Open WhatsApp on your phone -> Settings -> Linked Devices.",
      "Tap 'Link a Device' and scan the code on this screen.",
      "Note: Session data is encrypted in your Session Vault."
    ],
    fields: [] // Handled via QR action
  }
];

const ChannelCard: React.FC<{ channel: Channel; isActive: boolean }> = ({ channel, isActive }) => {
  const [expanded, setExpanded] = useState(false);
  const [enabled, setEnabled] = useState(isActive);
  const [isSyncing, setIsSyncing] = useState(false);
  const [qrState, setQrState] = useState<'idle' | 'generating' | 'ready'>('idle');

  const handleSave = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setEnabled(true);
    }, 2000);
  };

  const handleGenerateQR = () => {
    setQrState('generating');
    setTimeout(() => setQrState('ready'), 3000);
  };

  return (
    <div className={`group rounded-[2rem] border transition-all duration-500 overflow-hidden relative ${
      expanded ? 'border-teal/30 bg-white dark:bg-surface' : 'border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-void/50'
    } ${enabled ? 'power-glow-border' : ''}`}>
      
      {/* Summary View */}
      <div 
        onClick={() => setExpanded(!expanded)}
        className="p-8 cursor-pointer flex items-center justify-between relative z-10"
      >
        <div className="flex items-center gap-6">
          <div className={`w-14 h-14 rounded-2xl bg-white dark:bg-surface border border-slate-200 dark:border-white/10 flex items-center justify-center ${channel.color} shadow-sm transition-transform group-hover:scale-110`}>
            <channel.icon size={28} />
          </div>
          <div className="text-left">
            <h3 className="text-xl font-black font-geist text-slate-900 dark:text-white uppercase">{channel.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${enabled ? 'bg-teal shadow-[0_0_8px_#2DD4BF] animate-pulse' : 'bg-slate-400'}`} />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {enabled ? 'Active on Neural Mesh' : 'Awaiting Ingress'}
              </span>
            </div>
          </div>
        </div>
        <ChevronDown size={20} className={`text-slate-400 transition-transform duration-500 ${expanded ? 'rotate-180' : ''}`} />
      </div>

      {/* Expanded View */}
      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-slate-100 dark:border-white/5 relative z-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Credentials Section */}
              <div className="p-10 border-r border-slate-100 dark:border-white/5 bg-white dark:bg-surface text-left">
                {channel.id === 'whatsapp' ? (
                  <div className="space-y-8 flex flex-col items-center">
                    <div className="w-full max-w-[200px] aspect-square bg-slate-50 dark:bg-void rounded-3xl border-2 border-dashed border-slate-200 dark:border-white/10 flex items-center justify-center relative overflow-hidden">
                      {qrState === 'idle' && (
                        <button onClick={handleGenerateQR} className="text-teal font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform flex flex-col items-center gap-2">
                          <QrCode size={24} /> Generate QR
                        </button>
                      )}
                      {qrState === 'generating' && (
                        <div className="flex flex-col items-center gap-2">
                          <RefreshCw size={24} className="text-teal animate-spin" />
                          <span className="text-[9px] font-black text-teal uppercase tracking-widest">Polling Vault...</span>
                        </div>
                      )}
                      {qrState === 'ready' && (
                        <img 
                          src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=OmniNode-Pairing" 
                          className="w-full h-full p-6 invert dark:invert-0" 
                          alt="QR Code" 
                        />
                      )}
                    </div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">
                      Mesh ID: W-META-049
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {channel.fields.map(field => (
                      <div key={field.name} className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest px-2">{field.label}</label>
                        <div className="relative">
                          <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                          <input 
                            type={field.type}
                            placeholder={field.placeholder}
                            className="w-full bg-slate-50 dark:bg-void/50 border border-slate-200 dark:border-white/5 rounded-2xl py-4 pl-12 pr-4 font-mono text-[11px] outline-none focus:border-teal/40 transition-all text-slate-900 dark:text-white"
                          />
                        </div>
                      </div>
                    ))}
                    <button 
                      onClick={handleSave}
                      disabled={isSyncing}
                      className="w-full py-4 bg-teal text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:shadow-[0_0_20px_rgba(45,212,191,0.3)] transition-all flex items-center justify-center gap-2"
                    >
                      {isSyncing ? <RefreshCw size={16} className="animate-spin" /> : <Zap size={16} />}
                      {isSyncing ? 'Synchronizing Vault...' : 'Save to DeepSync'}
                    </button>
                  </div>
                )}
                
                <div className="mt-8 flex items-center gap-2 text-[8px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.15em]">
                  <ShieldCheck size={12} /> Credentials encrypted in DeepSync • Runtime Injection
                </div>
              </div>

              {/* Guide Section */}
              <div className="p-10 bg-slate-50/50 dark:bg-void/30 text-left">
                <h4 className="text-[10px] font-black text-teal uppercase tracking-widest mb-6 flex items-center gap-2">
                  <HelpCircle size={14} /> Setup Guide
                </h4>
                <div className="space-y-4">
                  {channel.guide.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="text-teal font-black font-geist text-xs shrink-0">{(i + 1).toString().padStart(2, '0')}</span>
                      <p className="text-xs font-medium text-slate-500 dark:text-white/40 leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
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
    <div className="space-y-8">
      <header className="text-left">
        <h2 className="text-2xl font-black font-geist text-slate-900 dark:text-white flex items-center gap-3">
          <Layers className="text-teal" size={24} /> Channel Matrix
        </h2>
        <p className="text-sm font-medium text-slate-500 dark:text-white/40 mt-1">
          Expand and authorize ingress protocols for your Omni-Node.
        </p>
      </header>

      <div className="space-y-4">
        {CHANNELS.map(channel => (
          <ChannelCard key={channel.id} channel={channel} isActive={channel.id === 'telegram'} />
        ))}
      </div>
    </div>
  );
};

export default ChannelMatrix;
