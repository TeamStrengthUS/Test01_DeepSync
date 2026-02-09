
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';
import Logo from '../components/Logo.tsx';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../lib/supabaseClient.ts';
import { 
  ShieldCheck, 
  Zap, 
  Database, 
  Lock, 
  Activity, 
  Cpu, 
  ChevronRight,
  ShieldAlert,
  Scale,
  Target
} from 'lucide-react';


const ValueCard: React.FC<{ icon: any, title: string, desc: string }> = ({ icon: Icon, title, desc }) => (
  <div className="bg-white dark:bg-surface border border-slate-200 dark:border-white/5 p-8 rounded-[2.5rem] text-left hover:border-teal/30 transition-all group shadow-xl">
    <div className="w-12 h-12 rounded-2xl bg-teal/5 border border-teal/10 flex items-center justify-center text-teal mb-6 group-hover:scale-110 transition-transform">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-black font-geist text-slate-900 dark:text-white uppercase mb-3">{title}</h3>
    <p className="text-sm text-slate-500 dark:text-white/40 leading-relaxed font-medium">{desc}</p>
  </div>
);

const Landing: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        navigate('/mission-control');
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-lightSurface dark:bg-void text-slate-900 dark:text-white overflow-hidden relative transition-colors duration-300 selection:bg-teal selection:text-black">
      <Navbar />

      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-teal/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay dark:opacity-[0.05]" />
      </div>

      <main className="relative z-10 pt-48 pb-32 px-6 container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <div className="inline-flex flex-col gap-2 mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal/20 bg-teal/5 text-teal text-[10px] font-black tracking-widest uppercase backdrop-blur-sm w-fit">
                <ShieldCheck size={12} /> Compliant with 2026 ICRC Standards
              </div>
              <div className="text-[9px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.3em] px-4">
                Built on the Letta Framework • Compliant with UN Resolution 79/239
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-black font-geist tracking-tighter leading-[0.9] mb-8 text-slate-900 dark:text-white uppercase">
              Deploy Military-Grade <br />
              <span className="iridescent-gradient bg-clip-text text-transparent italic leading-[1.1]">AI Decision-Support Systems.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 dark:text-white/40 leading-relaxed mb-16 max-w-xl font-medium">
              Achieve Information Superiority with ICRC-Compliant Neural Mesh Technology. Architected for absolute state precision and verified Meaningful Human Control.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ValueCard 
                icon={Scale} 
                title="Supervised Execution" 
                desc="Task-specific neural processing bound by human-validated decision gates and operational limits." 
              />
              <ValueCard 
                icon={Target} 
                title="Precision Analytics" 
                desc="High-fidelity telemetry synthesis providing actionable intelligence superiority for decision-makers." 
              />
              <ValueCard 
                icon={ShieldAlert} 
                title="IHL Overwatch" 
                desc="Hardware-abstracted governance and immutable security audit trails for total legal accountability." 
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative group lg:sticky lg:top-40"
          >
            <div className="absolute -inset-10 bg-teal/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-teal/10 transition-colors" />
            <div className="bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[3rem] p-10 shadow-2xl relative z-10 animate-power-glow-card">
               <div className="mb-10 text-center">
                  <Logo size="sm" className="justify-center mb-6" />
                  <h2 className="text-2xl font-black font-geist tracking-tight mb-2 uppercase text-slate-900 dark:text-white">System Activation</h2>
                  <p className="text-xs text-slate-400 dark:text-white/40 font-medium uppercase tracking-[0.3em]">Initialize Mission Control</p>
               </div>
               
               <div className="auth-ui-container">
                  <Auth
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa }}
                    theme="dark"
                    providers={['google', 'github']}
                    redirectTo={window.location.origin + '/#/mission-control'}
                  />
               </div>

               <p className="mt-8 text-center text-[9px] font-black text-slate-300 dark:text-white/10 uppercase tracking-[0.4em] leading-relaxed">
                  Subject to <span className="text-teal">Constitutional Governance</span> <br /> Audit Log: ACTIVE (AI-DSS PROTOCOL)
               </p>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="relative z-10 py-12 border-t border-slate-100 dark:border-white/5 px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-widest">
           <Lock size={12} className="text-teal" /> SOC2 TYPE II CERTIFIED
           <div className="w-1 h-1 rounded-full bg-slate-200 dark:bg-white/10" />
           <ShieldCheck size={12} className="text-teal" /> IHL 2026 COMPLIANT (AI-DSS SAFE HARBOR)
        </div>
        <p className="text-[10px] font-black text-slate-300 dark:text-white/10 uppercase tracking-[0.4em]">
          © 2026 TEAMSTRENGTH.US • NEURAL MESH V3.2
        </p>
      </footer>
    </div>
  );
};

export default Landing;
