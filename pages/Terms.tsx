
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar.tsx';
import Footer from '../components/Footer.tsx';
import { Zap, Globe, FileText, Activity } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-lightSurface dark:bg-void text-slate-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
      <Navbar />
      
      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-[50vh] bg-gradient-to-b from-teal/5 to-transparent pointer-events-none" />

      <main className="pt-48 pb-32 px-6 container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <span className="text-teal font-black tracking-widest uppercase text-[10px] mb-4 block">PLATFORM PROTOCOLS {new Date().getFullYear()}</span>
          <h1 className="text-6xl md:text-8xl font-black font-geist tracking-tighter mb-8 leading-none">
            Service <span className="iridescent-gradient bg-clip-text text-transparent">Protocol.</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-white/40 max-w-2xl mx-auto leading-relaxed font-medium">
            The operational framework for high-performance teams. Clear terms for a complex agentic landscape.
          </p>
        </motion.div>

        <div className="space-y-12">
          {[
            { 
              title: "1. Service Provision", 
              icon: Globe,
              content: "TeamStrength provides an AI-native performance layer consisting of autonomous agents, deep analytics, and real-time intelligence nodes. We guarantee 99.9% uptime for enterprise-tier accounts." 
            },
            { 
              title: "2. Agentic Liability", 
              icon: Zap,
              content: "While our agents are architected for high-accuracy, they are tools designed to augment human decision-making. Users are responsible for final validation of agent-generated sales strategies and communications." 
            },
            { 
              title: "3. Subscription & Usage", 
              icon: Activity,
              content: "Access to the platform is provided on a subscription basis. Overages on agent task-cycles are billed at the standard rate unless otherwise negotiated in an enterprise agreement." 
            },
            { 
              title: "4. Ethical Conduct", 
              icon: FileText,
              content: "The use of TeamStrength agents for malicious outreach, spamming, or data-harvesting in violation of local laws is strictly prohibited and will result in immediate node suspension." 
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-12 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[3rem] shadow-xl dark:shadow-none flex flex-col md:flex-row gap-8 items-start"
            >
              <div className="w-16 h-16 rounded-[1.5rem] bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0">
                <item.icon size={24} className="text-teal" />
              </div>
              <div>
                <h3 className="text-3xl font-black mb-4 font-geist tracking-tight">{item.title}</h3>
                <p className="text-lg text-slate-500 dark:text-white/40 font-medium leading-relaxed">{item.content}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 p-12 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[3rem] text-center">
          <p className="text-sm text-slate-400 dark:text-white/20 font-black uppercase tracking-[0.2em] mb-4">Last Modified: JAN 01, {new Date().getFullYear()}</p>
          <p className="text-slate-500 dark:text-white/40 font-medium">By accessing the platform, you agree to adhere to these operational protocols.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
