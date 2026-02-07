
import React from 'react';
import Navbar from '../components/Navbar.tsx';
import Footer from '../components/Footer.tsx';
import { Github, Twitter, MessageSquare, Globe } from 'lucide-react';

const Community: React.FC = () => {
  return (
    <div className="min-h-screen bg-lightSurface dark:bg-void text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <main className="pt-48 pb-32 px-6 container mx-auto max-w-7xl">
        <div className="text-center mb-32">
          <h1 className="text-7xl md:text-9xl font-black font-geist tracking-tighter mb-8 leading-none">
            The <span className="iridescent-gradient bg-clip-text text-transparent">Collective.</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-white/40 max-w-2xl mx-auto font-medium leading-relaxed">
            Join 1,200+ teams building the future of agentic growth. Exchange protocols, share custom agents, and scale together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {[
             { icon: Github, label: "GitHub", val: "Open Source" },
             { icon: MessageSquare, label: "Discord", val: "Protocol Chat" },
             { icon: Twitter, label: "X / Twitter", val: "Daily Updates" },
             { icon: Globe, label: "Forum", val: "Deep Logic" }
           ].map((item, i) => (
             <div key={i} className="p-12 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[4rem] flex flex-col items-center text-center group hover:border-teal transition-all cursor-pointer shadow-xl">
               <div className="mb-8 p-6 bg-slate-50 dark:bg-void rounded-3xl group-hover:bg-teal group-hover:text-black transition-all">
                 <item.icon size={32} />
               </div>
               <h4 className="text-2xl font-black mb-2 font-geist">{item.label}</h4>
               <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">{item.val}</p>
             </div>
           ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
