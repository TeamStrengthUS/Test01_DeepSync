
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ChevronLeft, ShieldCheck } from 'lucide-react';

const Register: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-lightSurface dark:bg-void overflow-hidden selection:bg-teal selection:text-black transition-colors duration-300">
      {/* Visual Side (Desktop) */}
      <div className="hidden lg:flex relative flex-[1.2] flex-col items-center justify-center p-12 bg-white dark:bg-black border-r border-slate-200 dark:border-white/5 transition-colors duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,0.05),transparent_70%)]" />
        <div className="relative w-[600px] h-[600px] flex items-center justify-center">
           {/* Decorative Atomic elements */}
           {[...Array(6)].map((_, i) => (
             <motion.div 
               key={i}
               animate={{ 
                 rotate: i % 2 === 0 ? 360 : -360, 
                 scale: [1, 1.05, 1],
                 opacity: [0.1, 0.2, 0.1]
               }}
               transition={{ 
                 duration: 15 + i * 8, 
                 repeat: Infinity, 
                 ease: "linear" 
               }}
               className="absolute border border-slate-200 dark:border-teal/10 rounded-full"
               style={{ 
                 width: `${(i + 1) * 80}px`, 
                 height: `${(i + 1) * 80}px`,
               }}
             />
           ))}
           <div className="relative text-center z-10">
             <div className="text-[14rem] font-black opacity-[0.03] select-none font-geist tracking-tighter leading-none mb-0 text-slate-900 dark:text-white">AGENTS</div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <ShieldCheck size={120} className="text-slate-200 dark:text-teal/20" strokeWidth={1} />
             </div>
           </div>
        </div>
        
        <div className="absolute bottom-24 text-center px-12">
          <h2 className="text-3xl font-black font-geist tracking-tight mb-3 text-slate-900 dark:text-white">Scale with Precision</h2>
          <p className="text-slate-500 dark:text-white/40 text-lg max-w-sm font-medium">Join the network of 1,200+ teams driving growth through autonomous intelligence.</p>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-24 bg-lightSurface dark:bg-void relative overflow-y-auto transition-colors duration-300">
        <div className="w-full max-w-md py-12">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 dark:text-white/40 hover:text-slate-900 dark:hover:text-white mb-12 text-sm font-black group transition-colors">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-black font-geist tracking-tighter mb-4 text-slate-900 dark:text-white">Start Growth.</h1>
            <p className="text-slate-500 dark:text-white/40 text-lg mb-10 leading-relaxed font-medium">Begin your 14-day premium trial. No card required for launch.</p>
          </motion.div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-[0.2em] px-2">Account Lead</label>
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-white/20 group-focus-within:text-teal transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Alex Rivers" 
                  className="w-full bg-white dark:bg-surface border border-slate-200 dark:border-white/5 focus:border-teal/50 rounded-2xl py-5 pl-14 pr-5 text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-white/10 font-bold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-[0.2em] px-2">Work Identity</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-white/20 group-focus-within:text-teal transition-colors" size={18} />
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full bg-white dark:bg-surface border border-slate-200 dark:border-white/5 focus:border-teal/50 rounded-2xl py-5 pl-14 pr-5 text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-white/10 font-bold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-[0.2em] px-2">Secret Key</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-white/20 group-focus-within:text-teal transition-colors" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-white dark:bg-surface border border-slate-200 dark:border-white/5 focus:border-teal/50 rounded-2xl py-5 pl-14 pr-5 text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-white/10 font-bold"
                />
              </div>
            </div>

            <div className="flex items-start gap-4 py-4 px-2">
               <input type="checkbox" className="w-5 h-5 mt-0.5 rounded-lg bg-white dark:bg-surface border-slate-200 dark:border-white/10 text-teal focus:ring-teal cursor-pointer" />
               <p className="text-[10px] text-slate-400 dark:text-white/30 font-black uppercase tracking-widest leading-relaxed">
                 I agree to the <a href="#" className="text-teal hover:underline decoration-2">Protocol Terms</a> and <a href="#" className="text-teal hover:underline decoration-2">Privacy Standards</a>.
               </p>
            </div>

            <button 
              type="submit"
              className="w-full py-5 bg-teal text-black font-black rounded-2xl text-lg hover:shadow-[0_0_30px_rgba(45,212,191,0.5)] transition-all relative overflow-hidden group"
            >
              <span className="relative z-10">Initialize Workspace</span>
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            </button>
          </form>

          <p className="mt-12 text-center text-slate-500 dark:text-white/40 font-bold text-sm">
            Already registered? <Link to="/login" className="text-teal font-black hover:underline">Sign In Instead</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
