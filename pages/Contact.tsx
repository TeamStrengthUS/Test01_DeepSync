
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Send, Globe, Mail, MessageSquare, Sparkles } from 'lucide-react';
import { useTheme } from '../App';

const ParticleField: React.FC = () => {
  const { theme } = useTheme();
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(60)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: Math.random() * 0.5, 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight 
          }}
          animate={{ 
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.2, 1],
            y: [null, Math.random() * -200 - 100],
            x: [null, Math.random() * 50 - 25]
          }}
          transition={{ 
            duration: 5 + Math.random() * 10, 
            repeat: Infinity,
            ease: "linear" 
          }}
          className={`absolute w-1 h-1 rounded-full blur-[2px] ${theme === 'dark' ? 'bg-teal' : 'bg-slate-300'}`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lightSurface dark:via-void to-lightSurface dark:to-void" />
    </div>
  );
};

const Contact: React.FC = () => {
  const [activeInquiry, setActiveInquiry] = useState('Enterprise Demo');

  return (
    <div className="min-h-screen bg-lightSurface dark:bg-void relative overflow-hidden flex flex-col selection:bg-teal selection:text-black transition-colors duration-300">
      <Navbar />
      <ParticleField />

      <main className="flex-1 flex items-center justify-center p-6 pt-40 pb-20 relative z-10">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal/20 bg-teal/5 text-teal text-[10px] font-black tracking-widest uppercase mb-8 w-fit backdrop-blur-md">
              <Sparkles size={12} /> Priority Channel
            </div>
            <h1 className="text-6xl md:text-8xl font-black font-geist tracking-tighter mb-8 leading-[0.9] text-slate-900 dark:text-white">
              Let's build <br />
              <span className="iridescent-gradient bg-clip-text text-transparent">Together.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 dark:text-white/40 mb-16 leading-relaxed max-w-lg font-medium">
              Deployment, security, or enterprise pricing—our agents and engineers are ready to assist.
            </p>

            <div className="space-y-10">
              {[
                { icon: Globe, label: 'Global HQ', value: 'Phoenix, AZ' },
                { icon: Mail, label: 'Technical Sales', value: 'sales@teamstrength.us' },
                { icon: MessageSquare, label: 'Enterprise Support', value: '24/7 High-Priority Line' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-8 group">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-white dark:bg-surface border border-slate-200 dark:border-white/5 flex items-center justify-center group-hover:border-teal/40 group-hover:bg-teal/5 transition-all duration-500 shadow-xl dark:shadow-2xl">
                    <item.icon size={24} className="text-slate-400 dark:text-white/30 group-hover:text-teal transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.3em] mb-1">{item.label}</h4>
                    <p className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-teal transition-colors">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-teal/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="bg-white/80 dark:bg-surface/80 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[4rem] p-12 relative z-10 shadow-[0_50px_100px_rgba(0,0,0,0.1)] dark:shadow-[0_50px_100px_rgba(0,0,0,0.5)] transition-colors duration-300">
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] px-2">First Name</label>
                    <input 
                      type="text" 
                      placeholder="Alex"
                      className="w-full bg-slate-50 dark:bg-void/50 border border-slate-200 dark:border-white/5 rounded-2xl px-6 py-5 text-slate-900 dark:text-white focus:border-teal/50 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-white/10 font-bold" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] px-2">Last Name</label>
                    <input 
                      type="text" 
                      placeholder="Rivers"
                      className="w-full bg-slate-50 dark:bg-void/50 border border-slate-200 dark:border-white/5 rounded-2xl px-6 py-5 text-slate-900 dark:text-white focus:border-teal/50 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-white/10 font-bold" 
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] px-2">Work Email</label>
                  <input 
                    type="email" 
                    placeholder="alex@company.com"
                    className="w-full bg-slate-50 dark:bg-void/50 border border-slate-200 dark:border-white/5 rounded-2xl px-6 py-5 text-slate-900 dark:text-white focus:border-teal/50 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-white/10 font-bold" 
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] px-2">Primary Inquiry</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Enterprise Demo', 'Custom Agents', 'Technical Support', 'Partnerships'].map(type => (
                      <button 
                        key={type}
                        type="button"
                        onClick={() => setActiveInquiry(type)}
                        className={`py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${activeInquiry === type ? 'bg-teal border-teal text-black' : 'bg-slate-50 dark:bg-void/50 border-slate-200 dark:border-white/5 text-slate-400 dark:text-white/30 hover:border-teal/30 hover:text-teal'}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] px-2">Brief Context</label>
                  <textarea 
                    rows={4} 
                    placeholder="How can we help you scale today?"
                    className="w-full bg-slate-50 dark:bg-void/50 border border-slate-200 dark:border-white/5 rounded-2xl px-6 py-5 text-slate-900 dark:text-white focus:border-teal/50 outline-none transition-all resize-none placeholder:text-slate-300 dark:placeholder:text-white/10 font-bold"
                  ></textarea>
                </div>

                <button className="w-full py-6 bg-teal text-black font-black rounded-2xl flex items-center justify-center gap-3 hover:shadow-[0_0_40px_rgba(45,212,191,0.5)] transition-all text-lg relative overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2">Send Transmission <Send size={20} /></span>
                  <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
