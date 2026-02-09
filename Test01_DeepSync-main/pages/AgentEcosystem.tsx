
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar.tsx';
import Footer from '../components/Footer.tsx';
import Logo from '../components/Logo.tsx';
import { Network, Bot, Cpu, Zap } from 'lucide-react';

const AgentEcosystem: React.FC = () => {
  return (
    <div className="min-h-screen bg-lightSurface dark:bg-void text-slate-900 dark:text-white transition-colors duration-300 overflow-hidden relative">
      <Navbar />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(45,212,191,0.05),transparent_50%)] pointer-events-none" />
      
      <main className="pt-48 pb-32 px-6 container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-32"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal/10 text-teal text-[10px] font-black tracking-widest uppercase mb-8">
            <Network size={12} /> Unified Neural Mesh
          </div>
          <h1 className="text-6xl md:text-9xl font-black font-geist tracking-tighter leading-none mb-8">
            Agent <span className="iridescent-gradient bg-clip-text text-transparent">Ecosystem.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 dark:text-white/40 max-w-3xl mx-auto font-medium">
            Not just single bots, but a interconnected network of specialized intelligences working in perfect synchronization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {[
            { icon: Bot, title: "Autonomous Units", desc: "Self-correcting agents that handle repetitive business logic without human oversight." },
            { icon: Cpu, title: "Compute Nodes", desc: "Distributed processing across global clusters for sub-10ms response times." },
            { icon: Zap, title: "Zero-Latency Sync", desc: "Every agent shares a unified memory layer, ensuring context is never lost." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-10 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[3rem] shadow-xl dark:shadow-none"
            >
              <div className="w-16 h-16 rounded-2xl bg-teal/5 border border-teal/20 flex items-center justify-center mb-8 text-teal">
                <feature.icon size={28} />
              </div>
              <h3 className="text-2xl font-black mb-4 font-geist">{feature.title}</h3>
              <p className="text-slate-500 dark:text-white/40 font-medium leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="p-20 bg-black rounded-[4rem] text-center relative overflow-hidden">
          <div className="absolute inset-0 iridescent-gradient opacity-10 blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-4xl font-black text-white mb-8 font-geist">Deploy your first node today.</h2>
            <button className="px-10 py-5 bg-teal text-black font-black rounded-2xl hover:scale-105 transition-transform">
              Initialize Ecosystem
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AgentEcosystem;
