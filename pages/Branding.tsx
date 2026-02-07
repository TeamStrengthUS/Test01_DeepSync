
import React from 'react';
import { motion } from 'framer-motion';
// Fixed: Explicitly importing named exports from react-router-dom
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import { 
  Copy, 
  Palette, 
  Type, 
  ShieldCheck, 
  Mail, 
  Maximize2, 
  Sparkles, 
  ExternalLink,
  BookOpen,
  Workflow,
  Database,
  Brain,
  Layers,
  Activity
} from 'lucide-react';

const BrandingCard: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = "" }) => (
  <div className={`bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[2rem] p-8 relative overflow-hidden group shadow-xl dark:shadow-none transition-all duration-300 ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-white/30 mb-8 flex items-center gap-2">
      <div className="w-1 h-1 bg-teal rounded-full" /> {title}
    </h3>
    <div className="relative z-10">{children}</div>
  </div>
);

const NomenclatureItem: React.FC<{ term: string; definition: string; icon: any; category: string }> = ({ term, definition, icon: Icon, category }) => (
  <div className="p-8 bg-slate-50 dark:bg-void border border-slate-200 dark:border-white/5 rounded-[2.5rem] group hover:border-teal/30 transition-all flex flex-col h-full">
    <div className="flex justify-between items-start mb-6">
      <div className="w-12 h-12 rounded-2xl bg-white dark:bg-surface border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 group-hover:text-teal transition-colors shadow-sm">
        <Icon size={20} />
      </div>
      <div className="text-right">
        <span className="block text-[9px] font-black text-slate-400 dark:text-white/20 uppercase tracking-widest mb-1">
          Technical Base
        </span>
        <span className="text-[10px] font-black text-teal uppercase tracking-widest">
          {category}
        </span>
      </div>
    </div>
    <h4 className="text-2xl font-black font-geist tracking-tight mb-3 text-slate-900 dark:text-white group-hover:text-teal transition-colors">
      {term}
    </h4>
    <p className="text-sm text-slate-500 dark:text-white/40 leading-relaxed font-medium">
      {definition}
    </p>
  </div>
);

const Branding: React.FC = () => {
  return (
    <div className="min-h-screen bg-lightSurface dark:bg-void text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <header className="pt-48 pb-24 px-6 container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl text-left"
        >
          <span className="text-teal font-black tracking-widest uppercase text-[10px] mb-4 block">TEAMSTRENGTH.US • Strategic Nomenclature v3.1</span>
          <h1 className="text-6xl md:text-8xl font-black font-geist tracking-tighter mb-8 leading-none text-slate-900 dark:text-white">
            Brand <span className="iridescent-gradient bg-clip-text text-transparent">Identity.</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-white/40 leading-relaxed font-medium">
            Defining the intersection of technical architecture and agentic experience. A unified language for high-performance intelligence.
          </p>
        </motion.div>
      </header>

      <main className="px-6 container mx-auto max-w-7xl space-y-24 pb-32">
        
        {/* Nomenclature Section */}
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-white/5 pb-12">
            <div className="max-w-xl text-left">
              <h2 className="text-4xl font-black font-geist tracking-tighter mb-4 text-slate-900 dark:text-white flex items-center gap-4">
                <BookOpen className="text-teal" size={32} /> Strategic Nomenclature
              </h2>
              <p className="text-slate-500 dark:text-white/40 font-medium">
                The core vocabulary of TeamStrength. These terms represent our specialized technical components transformed into high-performance strategic assets.
              </p>
            </div>
            <div className="text-[10px] font-black text-teal uppercase tracking-[0.3em] mb-2">
              Protocol v3.1-Alpha
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            <NomenclatureItem 
              term="DeepSync" 
              category="Supabase (Vector DB)"
              icon={Database}
              definition="The memory and synchronization protocol. It serves as the 'Vault' where state is persisted and synchronized across the ecosystem."
            />
            <NomenclatureItem 
              term="Team IQ Node" 
              category="Letta Server"
              icon={Brain}
              definition="The central intelligence processing unit that aggregates user agent wisdom into a unified, actionable cognitive layer."
            />
            <NomenclatureItem 
              term="Neural Mesh" 
              category="Railway / Edge Functions"
              icon={Workflow}
              definition="The distributed network of processing nodes allowing globally shared memory abilities with near-zero latency for autonomous operations."
            />
            <NomenclatureItem 
              term="Agentic Layer" 
              category="Antigravity Dashboard"
              icon={Layers}
              definition="The primary interface where users interact with their agents, manage mission parameters, and view real-time strategic outcomes."
            />
            <NomenclatureItem 
              term="Power Glow" 
              category="Active State / Syncing"
              icon={Activity}
              definition="The Teal-Pink-Purple iridescent visual signifier indicating real-time Active Intelligence and healthy protocol synchronization."
            />
            <NomenclatureItem 
              term="The Constitution" 
              category="System Prompt"
              icon={ShieldCheck}
              definition="The ethical boundary instructions and core directives encoded into the Neural Mesh to govern agentic behavior and mission alignment."
            />
          </div>
        </section>

        {/* Scale & Contrast Section */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black flex items-center gap-3 text-slate-900 dark:text-white">
              <Maximize2 className="text-teal" size={24} /> Scale & Contrast
            </h2>
          </div>
          
          <div className="space-y-6">
            {/* White Background Variant */}
            <div className="relative w-full aspect-[21/9] bg-white rounded-[3rem] border border-slate-200 overflow-hidden flex items-center justify-center group shadow-2xl transition-all duration-500 hover:shadow-teal/10 p-12">
              <div className="absolute top-6 left-8 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-900" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">On Light (Paper White)</span>
              </div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-full flex justify-center"
              >
                <Logo size="xl" colorMode="light" />
              </motion.div>
            </div>

            {/* Black Background Variant */}
            <div className="relative w-full aspect-[21/9] bg-black rounded-[3rem] border border-white/5 overflow-hidden flex items-center justify-center group shadow-2xl transition-all duration-500 hover:shadow-teal/20 p-12">
              <div className="absolute top-6 left-8 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/20">On Dark (Void Black)</span>
              </div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-full flex justify-center"
              >
                <Logo size="xl" colorMode="dark" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Email Signature Section */}
        <section className="p-12 bg-white dark:bg-surface border border-slate-200 dark:border-white/10 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-12 group transition-all text-left">
          <div className="max-w-xl">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/10 text-teal text-[10px] font-black uppercase tracking-widest mb-6">
               <Mail size={12} /> Communication Assets
             </div>
             <h2 className="text-4xl font-black font-geist tracking-tighter mb-4 text-slate-900 dark:text-white">Email Signature Ready</h2>
             <p className="text-slate-500 dark:text-white/40 text-lg font-medium mb-8 leading-relaxed">
               Need the logo for your Gmail or Outlook signature? We've prepared a dedicated export view with the correct contrast and white background.
             </p>
             <Link 
              to="/signature" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-black rounded-2xl hover:bg-teal dark:hover:bg-teal transition-all group-hover:scale-[1.02] shadow-xl"
             >
               Launch Export Tool <ExternalLink size={20} />
             </Link>
          </div>
          <div className="p-8 bg-lightSurface dark:bg-void border border-slate-200 dark:border-white/5 rounded-[2rem] shadow-inner">
             <Logo size="lg" colorMode="light" />
          </div>
        </section>

        {/* Signature Glow Section */}
        <section className="space-y-8">
          <h2 className="text-2xl font-black flex items-center gap-3 text-slate-900 dark:text-white">
            <Sparkles className="text-teal" size={24} /> Signature Glow System
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <BrandingCard title="The Iridescent Glow">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="relative">
                  <Logo size="lg" hideText />
                </div>
                <div className="mt-12 text-center max-w-xs">
                  <p className="text-sm font-bold text-slate-900 dark:text-white mb-2">Atmospheric Depth</p>
                  <p className="text-xs text-slate-400 dark:text-white/40 leading-relaxed font-medium">
                    The Signature Glow is now integrated directly into our core iconography, providing a consistent "Power Glow" aura in all environments.
                  </p>
                </div>
              </div>
            </BrandingCard>
            <BrandingCard title="Interactive States">
              <div className="flex flex-col gap-6 justify-center h-full py-8">
                <button className="w-full py-6 bg-teal text-black font-black rounded-2xl text-lg hover:shadow-[0_0_40px_rgba(45,212,191,0.5)] transition-all">
                  Teal (Core)
                </button>
                <button className="w-full py-6 iridescent-gradient text-black font-black rounded-2xl text-lg hover:shadow-[0_0_40px_rgba(255,0,128,0.3)] transition-all">
                  Iridescent (Power)
                </button>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-white/20 text-center">
                  Glow intensity varies by component hierarchy
                </div>
              </div>
            </BrandingCard>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
          {/* Colors Section */}
          <BrandingCard title="Color Palette" className="lg:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {[
                { name: 'Void Black', hex: '#010103', desc: 'Core Background' },
                { name: 'Teal Accent', hex: '#2DD4BF', desc: 'Primary Action' },
                { name: 'Nebula Indigo', hex: '#4F46E5', desc: 'Environmental Depth' },
                { name: 'Nebula Violet', hex: '#7C3AED', desc: 'Environmental Depth' },
                { name: 'Deep Slate', hex: '#0F172A', desc: 'Secondary Text' },
                { name: 'Power Glow', hex: 'Gradient', desc: 'Iridescent V1', gradient: true },
              ].map((color) => (
                <div key={color.name} className="space-y-3 group/swatch">
                  <div className="relative w-full h-24 rounded-2xl border border-slate-200 dark:border-white/10 shadow-inner overflow-hidden cursor-pointer">
                    {color.gradient ? (
                      <div className="w-full h-full iridescent-gradient" />
                    ) : (
                      <div className="w-full h-full" style={{ backgroundColor: color.hex }} />
                    )}
                    
                    {/* HEX Hover Reveal */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover/swatch:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <span className="text-white font-geist font-black text-[10px] tracking-widest uppercase">
                        {color.hex}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900 dark:text-white">{color.name}</p>
                    <p className="text-[10px] text-teal font-black uppercase">{color.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl">
              <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed font-medium italic">
                The <span className="text-teal font-black">Power Glow</span> remains our core signature effect, while the <span className="text-indigo-500 font-black">Nebula Underlay</span> (Indigo/Violet) provides environmental depth and "liveness" to the Void-black background.
              </p>
            </div>
          </BrandingCard>

          {/* Typography Section */}
          <BrandingCard title="Typography" className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-slate-100 dark:border-white/5 pb-2">
                  <span className="text-[10px] text-slate-400 dark:text-white/20 font-black uppercase tracking-widest">Geist Sans</span>
                  <span className="text-[10px] text-teal font-black">Display & UI</span>
                </div>
                <p className="text-5xl font-geist font-black tracking-tighter text-slate-900 dark:text-white">ABC 123</p>
                <p className="text-xs text-slate-400 dark:text-white/40 font-medium">Used for high-impact headlines and platform iconography.</p>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-slate-100 dark:border-white/5 pb-2">
                  <span className="text-[10px] text-slate-400 dark:text-white/20 font-black uppercase tracking-widest">Inter</span>
                  <span className="text-[10px] text-teal font-black">Body Copy</span>
                </div>
                <p className="text-5xl font-black text-slate-900 dark:text-white">ABC 123</p>
                <p className="text-xs text-slate-400 dark:text-white/40 font-medium">Used for all reading text, ensuring maximum clarity across devices.</p>
              </div>
            </div>
          </BrandingCard>
        </div>

        {/* Visual Language */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
           <BrandingCard title="Surface Effects">
              <div className="flex flex-col gap-6">
                <div className="p-6 bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/5 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-teal to-transparent opacity-40" />
                  <p className="text-sm font-black mb-2 text-slate-900 dark:text-white">Border Beam</p>
                  <p className="text-xs text-slate-400 dark:text-white/40 font-medium">Animated light path orbiting card perimeters.</p>
                </div>
                <div className="p-6 bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/5 rounded-2xl relative overflow-hidden">
                  <div className="absolute inset-0 iridescent-gradient opacity-[0.03]" />
                  <p className="text-sm font-black mb-2 text-slate-900 dark:text-white">Iridescent Noise</p>
                  <p className="text-xs text-slate-400 dark:text-white/40 font-medium">Subtle grain texture combined with low-opacity gradients for depth.</p>
                </div>
              </div>
           </BrandingCard>
           
           <BrandingCard title="Icons & Symbols">
              <div className="grid grid-cols-4 gap-4">
                 {[Palette, Type, Copy, ShieldCheck, Mail, Workflow, Database, Brain].map((Icon, i) => (
                   <div key={i} className="aspect-square bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl flex items-center justify-center hover:bg-teal/10 hover:border-teal/30 transition-all cursor-crosshair">
                      <Icon size={24} className="text-slate-400 dark:text-white/40 group-hover:text-teal" />
                   </div>
                 ))}
              </div>
           </BrandingCard>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Branding;