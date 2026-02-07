
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Users, Brain, Heart, Target } from 'lucide-react';

const TeamIntelligence: React.FC = () => {
  return (
    <div className="min-h-screen bg-lightSurface dark:bg-void text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <main className="pt-48 pb-32 px-6 container mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-32">
          <h1 className="text-7xl md:text-9xl font-black font-geist tracking-tighter mb-8">
            Team <span className="iridescent-gradient bg-clip-text text-transparent">IQ.</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-white/40 max-w-2xl mx-auto font-medium">
            Empower your humans with the collective wisdom of your entire organization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Brain, label: "Shared Context" },
            { icon: Heart, label: "Empathy Layer" },
            { icon: Target, label: "Alignment Bot" },
            { icon: Users, label: "Global Sync" }
          ].map((item, i) => (
            <div key={i} className="p-10 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[3rem] text-center">
              <div className="mb-6 flex justify-center text-teal"><item.icon size={32} /></div>
              <h4 className="text-lg font-black font-geist">{item.label}</h4>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeamIntelligence;
