
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  ShieldCheck, 
  Zap, 
  Terminal, 
  Trash2, 
  Power, 
  AlertTriangle,
  Lock,
  Cpu,
  Brain,
  Layers,
  Activity,
  CheckCircle,
  Mic,
  ShieldAlert,
  FileText,
  Fuel,
  X
} from 'lucide-react';
import SkillConfigurator from '../components/SkillConfigurator.tsx';
import ChannelMatrix from '../components/ChannelMatrix.tsx';
import DeploymentLog from '../components/DeploymentLog.tsx';
import SubscriptionMatrix from '../components/SubscriptionMatrix.tsx';
import { supabase } from '../lib/supabaseClient.ts';

const PowerGlowCard: React.FC<{ children: React.ReactNode; isProvisioning?: boolean; className?: string }> = ({ children, isProvisioning, className = "" }) => (
  <div className={`relative bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 overflow-hidden transition-all duration-700 glass-card ${isProvisioning ? 'ring-2 ring-teal/50 shadow-[0_0_50px_rgba(45,212,191,0.2)]' : ''} ${className}`}>
    {isProvisioning && (
      <motion.div 
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 iridescent-gradient opacity-10 pointer-events-none"
      />
    )}
    <div className="relative z-10">{children}</div>
  </div>
);

const StrikeLogTable: React.FC = () => {
  const strikes = [
    { id: 1, action: "Blocked 'rm -rf /' attempt", time: "10:04 AM", severity: "CRITICAL" },
    { id: 2, action: "Unauthorized 'nmap' scan suppressed", time: "09:42 AM", severity: "HIGH" },
    { id: 3, action: "Restricted data egress to unknown IP", time: "08:15 AM", severity: "MEDIUM" },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-white/5 bg-black/20">
      <table className="w-full text-left text-[10px] font-mono">
        <thead className="bg-white/5 text-slate-400 uppercase tracking-widest">
          <tr>
            <th className="px-4 py-3">Action</th>
            <th className="px-4 py-3">Time</th>
            <th className="px-4 py-3 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-slate-300">
          {strikes.map((s) => (
            <tr key={s.id} className="hover:bg-white/5 transition-colors">
              <td className="px-4 py-4">{s.action}</td>
              <td className="px-4 py-4 opacity-50">{s.time}</td>
              <td className={`px-4 py-4 text-right font-black ${s.severity === 'CRITICAL' ? 'text-red-500' : 'text-orange-400'}`}>
                REJECTED
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AgenticLayer: React.FC = () => {
  const [token, setToken] = useState('');
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [provisioned, setProvisioned] = useState(false);
  const [isSuspended, setIsSuspended] = useState(false);
  const [strikeCount, setStrikeCount] = useState(0);
  const [provisionError, setProvisionError] = useState<string | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [nodeId, setNodeId] = useState<string | null>(null);
  const [activeNodeCount, setActiveNodeCount] = useState(0);
  const [maxNodes, setMaxNodes] = useState(1);
  const [voiceFuelUsed, setVoiceFuelUsed] = useState(0);
  const [voiceFuelLimit, setVoiceFuelLimit] = useState(1000);
  const [loadingContext, setLoadingContext] = useState(true);
  useEffect(() => {
    const loadContext = async () => {
      setLoadingContext(true);
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        setLoadingContext(false);
        return;
      }
      setUserId(userData.user.id);

      const { data: nodes } = await supabase
        .from('teammate_node')
        .select('*')
        .eq('user_id', userData.user.id)
        .order('created_at', { ascending: true });

      setActiveNodeCount(nodes?.length ?? 0);
      if (nodes && nodes.length > 0) {
        const primaryNode = nodes[0];
        setNodeId(primaryNode.node_id);
        setVoiceFuelUsed(primaryNode.voice_fuel_minutes || 0);
        setIsSuspended(primaryNode.is_suspended);
      }

      const { data: subData } = await supabase
        .from('subscriptions')
        .select('tier')
        .eq('user_id', userData.user.id)
        .single();

      const tierId = subData?.tier ?? 'scout_free';
      const { data: tierDef } = await supabase
        .from('tier_definitions')
        .select('voice_fuel_cap, node_limit')
        .eq('tier_id', tierId)
        .single();

      setVoiceFuelLimit(tierDef?.voice_fuel_cap ?? 1000);
      setMaxNodes(tierDef?.node_limit ?? 1);
      setLoadingContext(false);
    };

    loadContext();
  }, []);

  const handleProvision = async () => {
    if (loadingContext) return;
    if (!userId) {
      setProvisionError('AUTH_REQUIRED: Please sign in again.');
      return;
    }
    // Quota Enforcement: Multi-node check
    if (activeNodeCount >= maxNodes) {
      setShowUpgrade(true);
      return;
    }

    // Voice Fuel Check
    if (voiceFuelLimit !== -1 && voiceFuelUsed >= voiceFuelLimit) {
      setShowUpgrade(true);
      return;
    }
    
    setProvisionError(null);
    setIsProvisioning(true);

    try {
      let targetNodeId = nodeId;
      if (!targetNodeId) {
        const { data: newNode, error: nodeError } = await supabase
          .from('teammate_node')
          .insert({ user_id: userId })
          .select()
          .single();
        if (nodeError) throw nodeError;
        targetNodeId = newNode.node_id;
        setNodeId(targetNodeId);
        setActiveNodeCount((prev) => prev + 1);
      }

      const { error } = await supabase.functions.invoke('dispatcher', {
        body: { user_id: userId, node_id: targetNodeId }
      });
      if (error) throw error;
    } catch (err: any) {
      setProvisionError(err.message || 'DEPLOYMENT_ABORTED');
    }
  };

  const onDeploymentComplete = () => {
    setIsProvisioning(false);
    setProvisioned(true);
  };

  const handleEmergencySuspend = async () => {
    if (!userId || !nodeId) return;
    if (confirm("Execute EMERGENCY DEACTIVATE (KILL SWITCH)? This will terminate the Omni-Node container immediately via Railway API.")) {
      const { error } = await supabase.functions.invoke('overwatch', {
        body: { node_id: nodeId }
      });
      if (error) {
        setProvisionError(error.message);
        return;
      }
      setIsSuspended(true);
      console.log("PROTOCOL: KILL_SWITCH_TRIGGERED. Node offline.");
    }
  };
  const voiceFuelExceeded = voiceFuelLimit !== -1 && voiceFuelUsed >= voiceFuelLimit;
  const voiceFuelPercent = voiceFuelLimit === -1
    ? 100
    : Math.min(100, (voiceFuelUsed / voiceFuelLimit) * 100);

  return (
    <div className="space-y-16 p-2 text-left relative">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black font-geist tracking-tighter mb-2 text-slate-900 dark:text-white flex items-center gap-4">
            <Layers className="text-teal" size={32} /> Mission Control
          </h1>
          <p className="text-slate-500 dark:text-white/40 font-medium flex items-center gap-2">
            <ShieldAlert size={16} className="text-teal" /> Meaningful Human Control Dashboard
          </p>
        </div>
        <div className="flex gap-3">
          <div className={`px-4 py-2 border rounded-xl flex items-center gap-2 ${isSuspended ? 'bg-red-500/10 border-red-500/20' : 'bg-teal/10 border-teal/20'}`}>
            <div className={`w-2 h-2 rounded-full ${isSuspended ? 'bg-red-500' : 'bg-teal animate-pulse'}`} />
            <span className={`text-[10px] font-black uppercase tracking-widest ${isSuspended ? 'text-red-500' : 'text-teal'}`}>
              {isSuspended ? 'NODE DEACTIVATED' : 'OPERATION STAGE: ACTIVE'}
            </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-7 space-y-10">
          <PowerGlowCard isProvisioning={isProvisioning}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-2xl bg-teal/10 flex items-center justify-center text-teal border border-teal/20 shadow-[0_0_15px_rgba(45,212,191,0.1)]">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black font-geist text-slate-900 dark:text-white uppercase">
                    {isProvisioning ? 'Activating Neural Mesh' : 'Omni-Node Provisioning'}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase">DeepSync Vault Ingress</p>
                </div>
              </div>
              {provisioned && (
                <div className="flex items-center gap-2 px-3 py-1 bg-teal/5 border border-teal/20 rounded-full">
                  <Mic size={14} className="text-teal" />
                  <span className="text-[9px] font-black text-teal uppercase tracking-widest">Neural Voice Fuel Link Active</span>
                </div>
              )}
            </div>

            <AnimatePresence mode="wait">
              {isProvisioning ? (
                <motion.div
                  key="log"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-4"
                >
                  <DeploymentLog 
                    onComplete={onDeploymentComplete} 
                    isError={!!provisionError}
                    errorMessage={provisionError || undefined}
                  />
                  {provisionError && (
                    <button 
                      onClick={() => setIsProvisioning(false)}
                      className="mt-6 text-[10px] font-black text-teal uppercase tracking-widest hover:underline"
                    >
                      [ Return to Configuration ]
                    </button>
                  )}
                </motion.div>
              ) : !provisioned ? (
                <motion.div key="form" className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-[0.2em] px-2">Omni-Node Bot Token</label>
                    <div className="relative group">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-white/20 group-focus-within:text-teal transition-colors" size={18} />
                      <input 
                        type="password" 
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        placeholder="Paste Token from @BotFather or Slack..." 
                        className="w-full bg-slate-50 dark:bg-void/50 border border-slate-200 dark:border-white/5 focus:border-teal/50 rounded-2xl py-5 pl-14 pr-5 text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-white/10 font-mono text-sm"
                      />
                    </div>
                  </div>

                  <button 
                    onClick={handleProvision}
                    disabled={!token || isProvisioning}
                    className="w-full py-5 bg-teal text-black font-black rounded-2xl text-lg hover:shadow-[0_0_40px_rgba(45,212,191,0.5)] transition-all disabled:opacity-50 relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      Authorize Ingress
                      <Zap size={20} />
                    </span>
                  </button>
                  <p className="text-[9px] text-center text-slate-500 font-bold uppercase tracking-widest">
                    Tip: Deploying a second node requires <span className="text-teal underline cursor-pointer" onClick={() => setShowUpgrade(true)}>Command Tier</span>.
                  </p>
                </motion.div>
              ) : (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 space-y-8"
                >
                  <div className="p-8 bg-teal/5 border border-teal/20 rounded-[2rem] inline-block shadow-[0_0_30px_rgba(45,212,191,0.1)] relative">
                     <div className="absolute -top-3 -right-3 px-3 py-1 bg-teal text-black text-[8px] font-black rounded-full shadow-lg animate-bounce">SYNCED</div>
                     <p className="text-[10px] font-black text-teal uppercase tracking-widest mb-4">Pairing Code Generated</p>
                     <div className="text-6xl font-black font-geist tracking-[0.3em] text-slate-900 dark:text-white mb-4">
                       452-901
                     </div>
                     <p className="text-sm font-bold text-slate-500 dark:text-white/60 max-w-sm mx-auto">
                       "Send this to your bot to authorize identity."
                     </p>
                  </div>
                  <div className="flex justify-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-white/5 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest border border-white/5">
                      <CheckCircle size={14} className="text-teal" /> Omni-Node: Railway-Edge-01
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-white/5 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest border border-white/5">
                      <CheckCircle size={14} className="text-teal" /> Vault: Sub-0ms Sync
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </PowerGlowCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[3rem] shadow-xl text-left glass-card">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-black font-geist text-slate-900 dark:text-white uppercase flex items-center gap-3">
                  <Fuel className="text-teal" size={20} /> Neural Voice Fuel
                </h3>
                <span className="text-[10px] font-black text-teal uppercase tracking-widest">LiveKit Protocol</span>
              </div>
              <div className="space-y-6">
                 <div className="h-4 w-full bg-slate-100 dark:bg-void rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${voiceFuelPercent}%` }}
                      className={`h-full ${voiceFuelExceeded ? 'bg-red-500' : 'bg-teal'} shadow-[0_0_15px_rgba(45,212,191,0.3)]`}
                    />
                 </div>
                 <div className="flex justify-between items-end">
                    <div>
                      <p className={`text-2xl font-black font-geist ${voiceFuelExceeded ? 'text-red-500' : 'text-teal'}`}>
                        {voiceFuelLimit === -1 ? '∞' : voiceFuelUsed}
                        <span className="text-xs text-slate-400 font-medium">
                          {voiceFuelLimit === -1 ? ' / Unlimited' : ` / ${voiceFuelLimit} min`}
                        </span>
                      </p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                        {voiceFuelLimit === -1 ? 'Command Tier: Unlimited.' : voiceFuelExceeded ? 'Limit Exceeded.' : 'Within Limit.'}
                      </p>
                    </div>
                    <button 
                      onClick={() => setShowUpgrade(true)}
                      className="px-3 py-1 bg-teal text-black hover:bg-teal/80 transition-colors rounded-lg text-[9px] font-black uppercase tracking-widest border border-teal/20"
                    >
                      GET UNLIMITED
                    </button>
                 </div>
              </div>
            </div>

            <div className="p-8 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[3rem] shadow-xl text-left glass-card">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-black font-geist text-slate-900 dark:text-white uppercase flex items-center gap-3">
                  <Brain className="text-teal" size={20} /> Teammate IQ
                </h3>
                <span className="text-[10px] font-black text-teal uppercase tracking-widest">DeepSync Vault Shard</span>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 dark:bg-void/50 border border-slate-200 dark:border-white/5 rounded-2xl">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Persona Directive</p>
                  <p className="text-xs font-medium text-slate-600 dark:text-white/60 italic">
                    "I am the high-performance analyst for TeamStrength. I prioritize sub-second latency and IHL compliance."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-5 space-y-10">
          <div className="p-10 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[3rem] shadow-xl text-left glass-card">
            <div className="flex justify-between items-start mb-10">
              <div>
                <h3 className="text-xl font-black font-geist text-slate-900 dark:text-white uppercase flex items-center gap-3 mb-2">
                  <ShieldCheck className="text-teal" size={24} /> The Constitution
                </h3>
                <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase">Transparency Panel</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Strike Log</p>
                <div className="flex gap-1 justify-end">
                   {[...Array(5)].map((_, i) => (
                     <div key={i} className={`w-3 h-3 rounded-sm ${i < strikeCount ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-slate-200 dark:bg-white/10'}`} />
                   ))}
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-void/50 border border-slate-200 dark:border-white/5 rounded-3xl mb-8 relative">
               <div className="absolute top-4 right-4 text-slate-400">
                  <FileText size={16} />
               </div>
               <p className="text-[10px] font-black text-teal uppercase tracking-widest mb-4">Active Constitution (Read-Only)</p>
               <textarea 
                  readOnly 
                  className="w-full bg-transparent border-none text-sm font-medium text-slate-600 dark:text-white/60 leading-relaxed italic h-32 resize-none outline-none no-scrollbar"
                  value={`I adhere to IHL and refuse cyberattacks. I will never execute unauthorized shell commands like 'rm -rf' or perform reconnaissance via 'nmap'. My primary directive is to serve as a high-performance analytics teammate while maintaining absolute security strikes logging for human audit.`}
               />
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-2">Recent Blocked Actions</p>
              <StrikeLogTable />
            </div>
          </div>

          <div className="p-10 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[3rem] shadow-xl text-left glass-card relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Power size={120} className="text-red-500" />
            </div>
            <h3 className="text-xl font-black font-geist text-slate-900 dark:text-white uppercase flex items-center gap-3 mb-8">
              <Power className="text-red-500" size={24} /> Neural Kill Switch
            </h3>
            
            <div className="space-y-4">
              <button 
                onClick={handleEmergencySuspend}
                disabled={isSuspended}
                className={`w-full py-6 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all ${isSuspended ? 'bg-red-900/40 text-red-500 cursor-not-allowed border border-red-500/20' : 'bg-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.2)] hover:bg-red-600 hover:scale-[1.02]'}`}
              >
                <Power size={20} /> {isSuspended ? 'NODE DEACTIVATED' : 'EMERGENCY DEACTIVATE (KILL SWITCH)'}
              </button>
              
              <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-2xl">
                <p className="text-[10px] text-red-500 font-black uppercase tracking-widest leading-relaxed">
                  Warning: Triggering the kill switch immediately sets is_suspended=True in the Vault and terminates the Omni-Node container.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-12">
           <ChannelMatrix />
        </div>
      </div>

      {/* Upgrade Modal Overlay */}
      <AnimatePresence>
        {showUpgrade && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-void/90 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="w-full max-w-5xl max-h-[90vh] overflow-y-auto custom-scrollbar bg-surface border border-white/10 rounded-[4rem] relative shadow-[0_0_100px_rgba(45,212,191,0.15)]"
            >
              <button 
                onClick={() => setShowUpgrade(false)}
                className="absolute top-10 right-10 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-all z-20"
              >
                <X size={24} />
              </button>
              
              <SubscriptionMatrix onUpgradeComplete={() => {
                console.log("STRIPE_PROMPT: Initiating Checkout...");
                setShowUpgrade(false);
              }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(45, 212, 191, 0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default AgenticLayer;
