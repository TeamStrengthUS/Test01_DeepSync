
import React, { useState } from 'react';
import Logo from '../components/Logo';
import { ArrowLeft, Camera, Copy, Zap, ZapOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignatureExport: React.FC = () => {
  const [isAnimated, setIsAnimated] = useState(true);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-inter">
      {/* UI Overlay */}
      <div className="fixed top-0 inset-x-0 p-6 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-slate-100 z-50 no-print">
        <Link to="/branding" className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400 hover:text-teal transition-colors">
          <ArrowLeft size={16} /> Back to Brand
        </Link>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsAnimated(!isAnimated)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${isAnimated ? 'bg-teal text-black shadow-[0_0_20px_rgba(45,212,191,0.3)]' : 'bg-slate-100 text-slate-400'}`}
          >
            {isAnimated ? <Zap size={14} /> : <ZapOff size={14} />}
            Animation: {isAnimated ? 'Active' : 'Static'}
          </button>
          
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-teal px-3 py-1 bg-teal/5 rounded-full border border-teal/10">
            Email Signature Export
          </span>
        </div>
      </div>

      <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto flex flex-col items-center gap-32">
        <section className="text-center space-y-4 no-print">
          <h1 className="text-3xl font-black font-geist tracking-tighter">Signature Assets</h1>
          <p className="text-slate-500 font-medium max-w-lg">
            Standard logo versions on white background using <strong>Deep Slate (#0F172A)</strong> text and persistent <strong>Power Glow</strong>.
          </p>
        </section>

        {/* Medium Size - Best for most signatures */}
        <div className="group relative">
           <div className="absolute -top-8 left-0 text-[10px] font-black text-slate-300 uppercase tracking-widest no-print">Standard (MD)</div>
           <div className="p-12 border border-dashed border-slate-100 rounded-3xl group-hover:border-teal/20 transition-colors bg-white">
              <Logo size="md" colorMode="light" isAnimated={isAnimated} />
           </div>
        </div>

        {/* Large Size - For high-density displays */}
        <div className="group relative">
           <div className="absolute -top-8 left-0 text-[10px] font-black text-slate-300 uppercase tracking-widest no-print">Large (LG)</div>
           <div className="p-16 border border-dashed border-slate-100 rounded-[3rem] group-hover:border-teal/20 transition-colors bg-white">
              <Logo size="lg" colorMode="light" isAnimated={isAnimated} />
           </div>
        </div>

        {/* Small Size - For minimalist signatures */}
        <div className="group relative">
           <div className="absolute -top-8 left-0 text-[10px] font-black text-slate-300 uppercase tracking-widest no-print">Small (SM)</div>
           <div className="p-8 border border-dashed border-slate-100 rounded-2xl group-hover:border-teal/20 transition-colors bg-white">
              <Logo size="sm" colorMode="light" isAnimated={isAnimated} />
           </div>
        </div>

        {/* Instructions */}
        <div className="max-w-xl w-full p-8 bg-slate-50 rounded-[2rem] border border-slate-100 no-print">
           <h3 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2">
             <Camera size={16} className="text-teal" /> Capturing the Animation
           </h3>
           <div className="text-xs space-y-4 text-slate-500 font-medium">
             <p>Gmail signatures do not support SVG code directly, but they do support <strong>GIFs</strong>. To use the animated version:</p>
             <ol className="list-decimal pl-4 space-y-2">
               <li>Use a tool like <strong>GIPHY Capture</strong> or <strong>ScreenToGif</strong> to record the animated logo above.</li>
               <li>Save it as a transparent or white-background GIF.</li>
               <li>In Gmail Settings, upload the GIF as your signature image.</li>
             </ol>
             <p className="pt-2 italic text-slate-400">Pro-tip: If you prefer static, toggle the animation off before taking your screenshot.</p>
           </div>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default SignatureExport;
