
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search, FileText, Code, Terminal } from 'lucide-react';

const Documentation: React.FC = () => {
  return (
    <div className="min-h-screen bg-lightSurface dark:bg-void text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <main className="pt-48 pb-32 px-6 container mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <h1 className="text-6xl font-black font-geist tracking-tighter mb-8 leading-none">
            Developer <span className="iridescent-gradient bg-clip-text text-transparent">Nexus.</span>
          </h1>
          <div className="relative mb-16">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input type="text" placeholder="Search protocol documentation..." className="w-full py-6 pl-16 pr-6 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[2rem] font-bold outline-none focus:border-teal/50 transition-all" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { icon: FileText, title: "Guides", desc: "Step-by-step setup for agents." },
             { icon: Code, title: "API Reference", desc: "Full REST & GraphQL endpoints." },
             { icon: Terminal, title: "SDKs", desc: "Official libraries for Node & Python." }
           ].map((item, i) => (
             <div key={i} className="p-10 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[3rem] hover:border-teal/30 transition-all cursor-pointer">
               <item.icon className="text-teal mb-6" size={32} />
               <h3 className="text-2xl font-black mb-2 font-geist">{item.title}</h3>
               <p className="text-slate-500 dark:text-white/40 font-medium">{item.desc}</p>
             </div>
           ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Documentation;
