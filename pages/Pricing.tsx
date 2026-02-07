
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Check } from 'lucide-react';

const Pricing: React.FC = () => {
  return (
    <div className="min-h-screen bg-lightSurface dark:bg-void text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <main className="pt-48 pb-32 px-6 container mx-auto max-w-7xl">
        <div className="text-center mb-24">
          <h1 className="text-6xl md:text-9xl font-black font-geist tracking-tighter mb-8 leading-none">
            Simple <span className="iridescent-gradient bg-clip-text text-transparent">Pricing.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Starter", price: "$0", desc: "For teams exploring AI.", features: ["3 Agents", "Standard Analytics", "Community Support"] },
            { name: "Pro", price: "$199", desc: "For high-growth teams.", features: ["Unlimited Agents", "Deep Analytics", "Custom Memory Layer", "Email Support"], highlighted: true },
            { name: "Enterprise", price: "Custom", desc: "For global organizations.", features: ["Full Node Sovereignty", "SOC2 Compliance", "24/7 Dedicated Support", "White-label Options"] }
          ].map((plan, i) => (
            <div key={i} className={`p-12 rounded-[3.5rem] flex flex-col ${plan.highlighted ? 'bg-black text-white shadow-2xl border-2 border-teal' : 'bg-white dark:bg-surface border border-slate-200 dark:border-white/5'}`}>
              <h3 className="text-2xl font-black mb-2 font-geist">{plan.name}</h3>
              <p className="text-slate-500 mb-8 font-bold">{plan.desc}</p>
              <div className="text-5xl font-black mb-12 font-geist">{plan.price}<span className="text-sm font-medium text-slate-400">/mo</span></div>
              <ul className="space-y-4 mb-12 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm font-bold">
                    <Check size={16} className="text-teal" /> {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-5 rounded-2xl font-black transition-all ${plan.highlighted ? 'bg-teal text-black hover:shadow-[0_0_30px_rgba(45,212,191,0.5)]' : 'bg-slate-900 text-white hover:bg-teal hover:text-black dark:bg-white dark:text-black'}`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
