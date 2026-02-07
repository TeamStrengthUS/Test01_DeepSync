
import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../constants';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden py-10 transition-colors duration-300">
      <div className="flex w-fit animate-marquee">
        {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
          <div 
            key={`${t.id}-${i}`} 
            className="w-[350px] shrink-0 mx-4 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 p-6 rounded-3xl backdrop-blur-sm shadow-xl dark:shadow-none"
          >
            <div className="flex items-center gap-1 mb-4">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} size={14} className="fill-teal text-teal" />
              ))}
            </div>
            <p className="text-slate-600 dark:text-white/80 text-sm italic mb-6 leading-relaxed font-medium">
              "{t.content}"
            </p>
            <div className="flex items-center gap-3">
              <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full grayscale group-hover:grayscale-0 transition-all border border-slate-100 dark:border-white/5" />
              <div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white">{t.name}</h4>
                <p className="text-xs text-slate-400 dark:text-white/40 font-bold uppercase tracking-widest">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-lightSurface dark:from-void to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-lightSurface dark:from-void to-transparent z-10" />
    </div>
  );
};

export default Testimonials;
