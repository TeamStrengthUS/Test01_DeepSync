
import React from 'react';
import Navbar from '../components/Navbar.tsx';
import Footer from '../components/Footer.tsx';
import { Search, FileText, Code, Terminal, BookOpen } from 'lucide-react';

/**
 * Documentation Page: Technical manuals and architecture specifications.
 */
const Documentation: React.FC = () => {
  // Fix: Adding a valid return statement to satisfy React.FC type requirements and fix "Type '() => void' is not assignable to type 'FC<{}>'"
  return (
    <div className="min-h-screen bg-lightSurface dark:bg-void text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <main className="pt-48 pb-32 px-6 container mx-auto max-w-7xl">
        <div className="text-left mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal/20 bg-teal/5 text-teal text-[10px] font-black tracking-widest uppercase mb-8 backdrop-blur-sm">
            <BookOpen size={12} /> Neural Mesh Manual v3.1
          </div>
          <h1 className="text-6xl md:text-8xl font-black font-geist tracking-tighter mb-8 leading-none">
            Technical <br />
            <span className="iridescent-gradient bg-clip-text text-transparent">Manuals.</span>
          </h1>
          <div className="max-w-xl relative group">
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 dark:text-white/20 group-focus-within:text-teal transition-colors" size={20} />
             <input 
               type="text" 
               placeholder="Search the Neural Mesh protocols..." 
               className="w-full bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-3xl py-6 pl-16 pr-6 outline-none focus:border-teal/30 transition-all font-bold text-sm text-slate-900 dark:text-white"
             />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {[
             { title: "Mesh Deployment", icon: Terminal, desc: "Step-by-step guide to containerizing Omni-Nodes on edge infrastructure." },
             { title: "Vault Architecture", icon: FileText, desc: "DeepSync vector persistence, state recovery, and sync protocols." },
             { title: "API Reference", icon: Code, desc: "Developer documentation for interacting with the Neural Mesh SDK." },
             { title: "Compliance Specs", icon: BookOpen, desc: "IHL standards alignment and Overwatch HUD audit integration." }
           ].map((doc, i) => (
             <div key={i} className="p-10 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[3rem] hover:border-teal/30 transition-all group cursor-pointer shadow-xl">
               <div className="w-16 h-16 rounded-2xl bg-teal/5 flex items-center justify-center text-teal mb-8 group-hover:scale-110 transition-transform border border-teal/10 shadow-sm">
                 <doc.icon size={28} />
               </div>
               <h3 className="text-2xl font-black mb-4 uppercase tracking-tight text-slate-900 dark:text-white">{doc.title}</h3>
               <p className="text-slate-500 dark:text-white/40 font-medium leading-relaxed">{doc.desc}</p>
             </div>
           ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Documentation;
