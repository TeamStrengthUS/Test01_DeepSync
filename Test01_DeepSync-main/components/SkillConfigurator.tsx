
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  Search, 
  Lock, 
  ShieldCheck, 
  Zap, 
  RefreshCw, 
  Key, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Skill {
  id: string;
  name: string;
  desc: string;
  icon: any;
  tierRequired: 'Free' | 'Pro' | 'Enterprise';
  requiredVars: string[];
}

const SKILLS: Skill[] = [
  {
    id: 'voice_mode',
    name: 'Voice Mode',
    desc: 'Real-time vocal interaction using LiveKit & Deepgram.',
    icon: Mic,
    tierRequired: 'Pro',
    requiredVars: ['DEEPGRAM_API_KEY']
  },
  {
    id: 'deep_research',
    name: 'Deep Research',
    desc: 'Autonomous web browsing and document synthesis.',
    icon: Search,
    tierRequired: 'Pro',
    requiredVars: ['TAVILY_API_KEY']
  },
  {
    id: 'enterprise_vault',
    name: 'Vault Architecture',
    desc: 'Distributed data residency across multiple global nodes.',
    icon: ShieldCheck,
    tierRequired: 'Enterprise',
    requiredVars: ['VAULT_MASTER_KEY']
  }
];

const SkillCard: React.FC<{ 
  skill: Skill; 
  userTier: string; 
  onUpdate: (id: string, key: string) => void;
  isSyncing: boolean;
  isWidget?: boolean;
}> = ({ skill, userTier, onUpdate, isSyncing, isWidget }) => {
  const [keyInput, setKeyInput] = useState('');
  const [hasCredential, setHasCredential] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const isLocked = skill.tierRequired === 'Enterprise' && userTier !== 'Enterprise';
  const needsCredential = !hasCredential && !isLocked;
  const isReady = hasCredential && !isLocked;

  const handleSave = () => {
    setIsValidating(true);
    setTimeout(() => {
      setHasCredential(true);
      setIsValidating(false);
    }, 1500);
  };

  if (isWidget) {
    return (
      <div className={`p-6 rounded-[2rem] border transition-all duration-300 flex items-center justify-between ${
        isEnabled ? 'bg-teal/5 border-teal/20 shadow-[0_0_20px_rgba(45,212,191,0.05)]' : 'bg-white dark:bg-surface border-slate-200 dark:border-white/5'
      }`}>
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
            isEnabled ? 'bg-teal/10 border-teal/20 text-teal' : 'bg-slate-50 dark:bg-void/50 border-slate-200 dark:border-white/10 text-slate-400'
          }`}>
            <skill.icon size={20} />
          </div>
          <div>
            <h4 className="text-sm font-black font-geist text-slate-900 dark:text-white uppercase">{skill.name}</h4>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {isEnabled ? 'Active' : isLocked ? 'Locked' : 'Disconnected'}
            </p>
          </div>
        </div>
        <div className={`w-2 h-2 rounded-full ${isEnabled ? 'bg-teal animate-pulse shadow-[0_0_8px_#2DD4BF]' : 'bg-slate-200 dark:bg-white/10'}`} />
      </div>
    );
  }

  return (
    <div className={`relative p-8 rounded-[2.5rem] border transition-all duration-500 overflow-hidden flex flex-col h-full ${
      isLocked ? 'bg-slate-100/50 dark:bg-void/50 border-slate-200 dark:border-white/5 grayscale' : 
      isEnabled ? 'bg-white dark:bg-surface border-teal/30 shadow-[0_0_40px_rgba(45,212,191,0.15)] animate-power-glow-card' : 
      'bg-white dark:bg-surface border border-slate-200 dark:border-white/5'
    }`}>
      {isLocked && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/40 dark:bg-void/40 backdrop-blur-[2px] p-6 text-center">
          <Lock size={24} className="mb-3 text-slate-400" />
          <p className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Upgrade to {skill.tierRequired}</p>
          <p className="text-[10px] font-medium text-slate-500 mt-1">Unlock this Neural Mesh capability.</p>
        </div>
      )}

      <div className="flex justify-between items-start mb-6">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-colors ${
          isEnabled ? 'bg-teal/10 border-teal/20 text-teal' : 'bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-400'
        }`}>
          <skill.icon size={24} />
        </div>
        <div className="text-right">
          <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md border ${
            skill.tierRequired === 'Enterprise' ? 'border-purple-500/30 text-purple-500' : 'border-teal/30 text-teal'
          }`}>
            {skill.tierRequired}
          </span>
        </div>
      </div>

      <div className="flex-1 text-left">
        <h3 className="text-xl font-black font-geist text-slate-900 dark:text-white mb-2">{skill.name}</h3>
        <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed font-medium mb-6">{skill.desc}</p>
      </div>

      <div className="mt-auto pt-6 border-t border-slate-100 dark:border-white/5 space-y-4">
        {needsCredential && (
          <div className="space-y-3">
            <div className="relative">
              <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="password"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder={`Enter ${skill.requiredVars[0]}`}
                className="w-full bg-slate-50 dark:bg-void/50 border border-slate-200 dark:border-white/5 rounded-xl py-3 pl-10 pr-4 text-[10px] font-mono outline-none focus:border-teal/40 transition-all text-slate-900 dark:text-white"
              />
            </div>
            <button 
              onClick={handleSave}
              disabled={!keyInput || isValidating}
              className="w-full py-3 bg-teal text-black font-black text-[10px] uppercase tracking-widest rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isValidating ? <RefreshCw size={14} className="animate-spin" /> : <Zap size={14} />}
              Initialize Ability
            </button>
          </div>
        )}

        {isReady && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal/5 flex items-center justify-center text-teal">
                <CheckCircle2 size={14} />
              </div>
              <div className="text-left">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">DeepSync</p>
                <p className="text-[10px] font-bold text-slate-900 dark:text-white">Credentials Masked</p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsEnabled(!isEnabled)}
              disabled={isSyncing}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 flex items-center ${isEnabled ? 'bg-teal' : 'bg-slate-200 dark:bg-white/10'}`}
            >
              <motion.div 
                animate={{ x: isEnabled ? 26 : 4 }}
                className="w-4 h-4 bg-white dark:bg-surface rounded-full shadow-md"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

interface SkillConfiguratorProps {
  isWidget?: boolean;
}

const SkillConfigurator: React.FC<SkillConfiguratorProps> = ({ isWidget }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [userTier] = useState('Pro');

  const handleSkillToggle = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2500);
  };

  if (isWidget) {
    return (
      <div className="bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[3rem] p-8 shadow-xl glass-card">
        <div className="flex justify-between items-center mb-8">
          <div className="text-left">
            <h3 className="text-xl font-black font-geist text-slate-900 dark:text-white uppercase flex items-center gap-3">
              <Zap className="text-teal" size={20} /> Neural Abilities
            </h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Core Mesh Capabilities</p>
          </div>
          <Link to="/dashboard/abilities" className="p-2 bg-slate-100 dark:bg-white/5 rounded-xl text-teal hover:bg-teal/10 transition-colors">
            <ArrowRight size={18} />
          </Link>
        </div>
        <div className="space-y-4">
          {SKILLS.map(skill => (
            <SkillCard 
              key={skill.id} 
              skill={skill} 
              userTier={userTier} 
              onUpdate={handleSkillToggle}
              isSyncing={isSyncing}
              isWidget
            />
          ))}
        </div>
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5">
           <Link to="/dashboard/abilities" className="text-[10px] font-black text-teal uppercase tracking-widest hover:underline block text-center">
             Manage Full Capability Stack
           </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div className="text-left">
          <h2 className="text-2xl font-black font-geist text-slate-900 dark:text-white flex items-center gap-3">
            <Zap className="text-teal" size={24} /> Neural Ability Configurator
          </h2>
          <p className="text-sm font-medium text-slate-500 dark:text-white/40 mt-1">
            Authorize and hot-swap capabilities across your mesh nodes.
          </p>
        </div>
        
        <AnimatePresence>
          {isSyncing && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center gap-3 px-4 py-2 bg-teal/10 border border-teal/20 rounded-xl text-teal"
            >
              <RefreshCw size={14} className="animate-spin" />
              <span className="text-[10px] font-black uppercase tracking-widest">Redeploying Mesh...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {SKILLS.map(skill => (
          <SkillCard 
            key={skill.id} 
            skill={skill} 
            userTier={userTier} 
            onUpdate={handleSkillToggle}
            isSyncing={isSyncing}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillConfigurator;
