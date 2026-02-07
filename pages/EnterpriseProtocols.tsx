import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ShieldCheck, Lock, Globe } from 'lucide-react';

const EnterpriseProtocols: React.FC = () => {
  return (
    <div className="min-h-screen bg-lightSurface dark:bg-void text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <main className="pt-48 pb-32 px-6 container mx-auto max-w-7xl">
        <div className="text-center mb-32">
          <span className="text-teal font-black tracking-widest uppercase text-[10px] mb-4 block">V3.1 ENCRYPTED PLATFORM</span>
          <h1 className="text-6xl md:text-9xl font-black font-geist tracking-tighter leading-none mb-8">
            Enterprise <br />
            <span className="iridescent-gradient bg-clip-text text-transparent">Protocols.</span>
          </h1>
        </div>
        
        <div className="space-y-8">
          {[
            { icon: ShieldCheck, title: "SOC2 Type II Certified", desc: "Rigorous third-party audits ensure your data is handled with peak security standards." },
            { icon: Lock, title: "Data Residency Control", desc: "Select which global nodes store your data to comply with local sovereignty laws." },
            { icon: Globe, title: "SLA Guarantees", desc: "99.99% uptime with 24/7 dedicated enterprise support pods." }
          ].map((item, i) => (
            <div key={i} className="p-12 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[4rem] flex items-center gap-12">
               <div className="p-6 bg-teal/5 rounded-3xl text-teal"><item.icon size={40} /></div>
               <div>
                 <h3 className="text-3xl font-black font-geist mb-2">{item.title}</h3>
                 <p className="text-slate-500 dark:text-white/40 text-lg font-medium">{item.desc}</p>
               </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EnterpriseProtocols;