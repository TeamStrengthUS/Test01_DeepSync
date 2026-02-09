
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../components/Navbar.tsx';
import BentoGrid from '../components/BentoGrid.tsx';
import Testimonials from '../components/Testimonials.tsx';
import Footer from '../components/Footer.tsx';
import { FEATURES } from '../constants.tsx';
import { ArrowRight, Terminal, ShieldCheck, Zap } from 'lucide-react';

const BackgroundBeams = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
    <div className="absolute top-[-15%] left-[-10%] w-[1000px] h-[1000px] bg-indigo-600/5 dark:bg-indigo-600/10 rounded-full blur-[160px] animate-pulse" />
    <div className="absolute bottom-[5%] right-[-5%] w-[800px] h-[800px] bg-fuchsia-600/5 dark:bg-fuchsia-600/8 rounded-full blur-[160px]" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.03),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.05),transparent_70%)]" />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay dark:opacity-[0.07]" />
  </div>
);

const Home: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="relative min-h-screen bg-lightSurface dark:bg-void text-slate-900 dark:text-white overflow-hidden selection:bg-teal selection:text-black transition-colors duration-300">
      <Navbar />
      <BackgroundBeams />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 md:pt-48 md:pb-40 container mx-auto max-w-[1400px] z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ y, opacity }}
            className="flex flex-col gap-8 text-left"
          >
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal/30 bg-teal/5 text-teal text-[10px] font-black tracking-widest uppercase mb-8 backdrop-blur-sm">
                <Terminal size={12} /> PROTOCOL V3.1 DEEPSYNC
              </span>
              <h1 className="text-6xl md:text-8xl font-black font-geist leading-[0.9] tracking-tighter mb-8 text-slate-900 dark:text-white">
                Govern Your <br />
                <span className="iridescent-gradient bg-clip-text text-transparent">Neural Mesh.</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 dark:text-white/40 max-w-xl leading-relaxed font-medium">
                TeamStrength is the industry's first IHL-compliant agentic runtime. 
                Deploy Omni-Nodes with absolute Meaningful Human Control and sub-second Vault synchronization.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 max-w-lg">
              <button className="w-full sm:w-auto px-10 py-5 bg-teal text-black font-black rounded-2xl flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] transition-all whitespace-nowrap text-lg">
                Initialize Node <Zap size={20} />
              </button>
              <button className="w-full sm:w-auto px-10 py-5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-200 dark:hover:bg-white/10 transition-all text-lg">
                Audit Protocols
              </button>
            </div>

            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-3 px-4 py-2 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
                <ShieldCheck size={18} className="text-teal" />
                <div className="text-left">
                  <span className="text-xs font-black block text-slate-800 dark:text-white uppercase tracking-wider">ICRC Standards</span>
                  <span className="text-[9px] text-slate-400 dark:text-white/40 uppercase tracking-widest font-black">Certified Compliance</span>
                </div>
              </div>
              <div className="h-10 w-px bg-slate-200 dark:bg-white/10" />
              <div className="text-left">
                <span className="text-sm font-black block text-slate-800 dark:text-white">482 Active Nodes</span>
                <span className="text-[10px] text-slate-400 dark:text-white/40 uppercase tracking-[0.2em] font-black">Neural Mesh Load: 14%</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full relative"
          >
            <div className="absolute -inset-10 bg-teal/5 blur-[120px] rounded-full pointer-events-none" />
            <BentoGrid />
          </motion.div>
        </div>
      </section>

      {/* Core Infrastructure Section */}
      <section className="py-32 px-6 container mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black font-geist mb-6 text-slate-900 dark:text-white uppercase">The <span className="text-teal italic">DeepSync</span> Ecosystem</h2>
          <p className="text-xl text-slate-500 dark:text-white/40 max-w-2xl mx-auto font-medium">
            Bridging autonomous logic with human governance. A technical framework for high-availability intelligence.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="group relative p-10 bg-white dark:bg-surface border border-slate-100 dark:border-white/5 rounded-[3rem] overflow-hidden shadow-lg dark:shadow-none transition-all duration-300"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_0%,rgba(45,212,191,0.05),transparent_70%)]" />
              <div className="relative z-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-slate-200 dark:border-white/10 group-hover:border-teal/40 group-hover:scale-110 transition-all duration-500 shadow-md dark:shadow-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 text-slate-900 dark:text-white uppercase tracking-tight">{feature.title}</h3>
                <p className="text-slate-500 dark:text-white/40 leading-relaxed text-lg font-medium">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mesh Verification Section */}
      <section className="py-32 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-transparent">
        <div className="container mx-auto px-6 mb-16 text-center">
          <h2 className="text-4xl font-black mb-4 text-slate-900 dark:text-white uppercase tracking-tighter">Verified across the Mesh</h2>
          <p className="text-slate-400 dark:text-white/40 uppercase tracking-widest font-black text-xs">DeepSync deployment audits</p>
        </div>
        <Testimonials />
      </section>

      <Footer />
    </div>
  );
};

export default Home;
