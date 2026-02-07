
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../components/Navbar';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import { Bot, Brain, Sparkles, Target, Zap, MessageCircle, BarChart, Shield, ArrowRight, Users } from 'lucide-react';

const AgentCard = ({ icon: Icon, title, desc, color }: { icon: any, title: string, desc: string, color: string }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="relative p-8 rounded-[3rem] bg-white dark:bg-surface border border-slate-200 dark:border-white/5 overflow-hidden group shadow-xl dark:shadow-none transition-all duration-300"
  >
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${color}`} />
    <div className="relative z-10 text-left">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 group-hover:scale-110 transition-transform`}>
        <Icon size={28} className="text-teal" />
      </div>
      <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{title}</h3>
      <p className="text-slate-500 dark:text-white/40 leading-relaxed font-medium">{desc}</p>
    </div>
  </motion.div>
);

const Product: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);

  return (
    <div className="min-h-screen bg-lightSurface dark:bg-void text-slate-900 dark:text-white overflow-hidden selection:bg-teal selection:text-black transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            style={{ y: y1 }}
            className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-teal/10 dark:bg-teal/20 blur-[180px] rounded-full" 
          />
          <motion.div 
            style={{ y: y2 }}
            className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 dark:bg-purple-600/10 blur-[180px] rounded-full" 
          />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex justify-center mb-10">
              <div className="p-4 rounded-3xl bg-white dark:bg-surface border border-slate-200 dark:border-white/10 shadow-2xl relative">
                <div className="absolute inset-0 bg-iridescent opacity-10 blur-xl animate-pulse" />
                <Logo size="lg" hideText />
              </div>
            </div>
            
            <h1 className="text-6xl md:text-9xl font-black font-geist tracking-tighter leading-none mb-8 text-slate-900 dark:text-white">
              Work with <br />
              <span className="iridescent-gradient bg-clip-text text-transparent">Intelligence</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-500 dark:text-white/40 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
              Transform your business from a collection of tools into an ecosystem of autonomous agents. 
              TeamStrength Neural Mesh: Automated wisdom at the core of your stack.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="w-full sm:w-auto px-10 py-5 bg-teal text-black font-black rounded-2xl text-lg hover:shadow-[0_0_40px_rgba(45,212,191,0.5)] transition-all flex items-center justify-center gap-2 group">
                Deploy Agent <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-10 py-5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-black rounded-2xl text-lg hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-sm">
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Autonomous Agent Grid */}
      <section className="py-32 px-6 container mx-auto max-w-7xl relative">
        <div className="text-center mb-24">
          <span className="text-teal font-black tracking-widest uppercase text-[10px] mb-4 block">The Agentic Layer</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 font-geist text-slate-900 dark:text-white">Built for Business Growth</h2>
          <p className="text-slate-500 dark:text-white/40 max-w-2xl mx-auto text-lg font-medium">
            Our agents don't just process data; they operate on DeepSync memory protocols to drive real strategic outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AgentCard 
            icon={Brain}
            title="Team IQ Node"
            desc="Synthesize your entire company documentation and telemetry into a unified, actionable cognitive layer."
            color="from-teal/40"
          />
          <AgentCard 
            icon={Bot}
            title="Agentic Outreach"
            desc="Deploy autonomous sales units that handle discovery, qualification, and scheduling with high-level Constitutional alignment."
            color="from-purple-500/40"
          />
          <AgentCard 
            icon={Target}
            title="Mesh Strategy"
            desc="Analyze market trends across the Neural Mesh to generate real-time pivots and growth strategies automatically."
            color="from-pink-500/40"
          />
        </div>
      </section>

      {/* Deep Dive: DeepSync AI */}
      <section className="py-32 bg-white dark:bg-surface/30 relative border-y border-slate-100 dark:border-white/5 transition-colors duration-300">
        <div className="container mx-auto px-6 max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-8 border border-teal/20">
              <Sparkles className="text-teal" size={24} />
            </div>
            <h2 className="text-5xl font-black font-geist tracking-tight mb-8 text-slate-900 dark:text-white">
              Your Wisdom, <br />
              <span className="text-slate-400 dark:text-white/40">Vault Protected.</span>
            </h2>
            <p className="text-lg text-slate-500 dark:text-white/40 leading-relaxed mb-8 font-medium">
              DeepSync eliminates memory silos. Our Vault architecture ingests every PDF, email, and meeting transcript to power the most senior member of your team.
            </p>
            <ul className="space-y-4">
              {[
                "Instant cross-mesh intelligence",
                "Automated Constitutional auditing",
                "Context-aware project briefings"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-white/80 font-bold">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="relative p-1 bg-gradient-to-br from-slate-200 via-transparent to-slate-200 dark:from-white/10 dark:to-white/10 rounded-[3rem]">
            <div className="bg-lightSurface dark:bg-void rounded-[2.9rem] overflow-hidden p-8 border border-slate-200 dark:border-white/5 shadow-2xl">
              <div className="space-y-6">
                <div className="flex gap-4 items-start text-left">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center shrink-0">
                    <MessageCircle size={18} className="text-slate-400 dark:text-white/40" />
                  </div>
                  <div className="bg-white dark:bg-surface p-4 rounded-2xl rounded-tl-none border border-slate-200 dark:border-white/5 shadow-sm">
                    <p className="text-sm font-medium text-slate-600 dark:text-white/80">"What was the main objection in the Q3 enterprise roadmap meeting?"</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start flex-row-reverse text-right">
                  <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center shrink-0 border border-teal/20">
                    <Logo size="sm" hideText />
                  </div>
                  <div className="bg-teal/5 p-5 rounded-2xl rounded-tr-none border border-teal/20 flex-1 text-left">
                    <p className="text-sm leading-relaxed mb-4 text-slate-700 dark:text-white/90 font-medium">
                      Based on the telemetry synced to the Vault on Sept 14, the primary objection was **integration latency** with legacy SAP systems.
                    </p>
                    <div className="p-3 bg-white/40 dark:bg-black/40 rounded-xl border border-slate-200 dark:border-white/5 text-[10px] uppercase tracking-widest text-slate-400 dark:text-white/40 font-black">
                      Source: Neural Mesh Arch_Review.mp4
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal/5 to-transparent" />
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black font-geist mb-8 tracking-tighter text-slate-900 dark:text-white">
            The future isn't automated. <br />
            It's <span className="text-teal italic">Agentic.</span>
          </h2>
          <p className="text-xl text-slate-500 dark:text-white/40 mb-12 font-medium">
            Join the elite teams using TeamStrength to drive exponential growth through the DeepSync Vault and Neural Mesh.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto px-12 py-6 bg-slate-900 dark:bg-white text-white dark:text-black font-black rounded-3xl text-xl hover:bg-teal dark:hover:bg-teal transition-all hover:scale-105 active:scale-95 shadow-2xl">
              Build Your First Agent
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Product;
