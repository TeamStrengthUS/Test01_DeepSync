
import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  hideText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  colorMode?: 'auto' | 'light' | 'dark';
  isAnimated?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  hideText = false, 
  size = 'md',
  colorMode = 'auto',
  isAnimated = false
}) => {
  const iconSizes = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-16 h-16 rounded-2xl',
    xl: 'w-48 h-48 rounded-[3rem]'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
    xl: 'text-8xl'
  };

  const textColorClass = {
    auto: 'text-slate-900 dark:text-white',
    light: 'text-[#0F172A]',
    dark: 'text-white'
  }[colorMode];

  const renderIcon = () => {
    return (
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        className="w-full h-full p-[15%]"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* The "T" - Solid White */}
        <path 
          d="M15 25 H55 V38 H41 V75 H29 V38 H15 V25 Z" 
          fill="white" 
        />
        
        {/* The stylized "S" - Updated to Teal #2DD4BF */}
        <motion.path
          d="M45 55 C 45 65, 65 65, 75 55 C 85 45, 60 35, 50 25 C 40 15, 60 10, 75 15"
          stroke="#2DD4BF"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1,
            stroke: isAnimated ? ["#2DD4BF", "#FF0080", "#7928CA", "#2DD4BF"] : "#2DD4BF"
          }}
          transition={{ 
            pathLength: { duration: 1, delay: 0.2 },
            opacity: { duration: 0.5 },
            stroke: { duration: 4, repeat: isAnimated ? Infinity : 0, ease: "linear" }
          }}
        />
        
        {/* S-Arrowhead - Updated to Teal #2DD4BF */}
        <motion.path
          d="M68 12 L 78 15 L 72 25"
          stroke="#2DD4BF"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            stroke: isAnimated ? ["#2DD4BF", "#FF0080", "#7928CA", "#2DD4BF"] : "#2DD4BF"
          }}
          transition={{ 
            delay: 1,
            stroke: { duration: 4, repeat: isAnimated ? Infinity : 0, ease: "linear" }
          }}
        />
      </svg>
    );
  };

  return (
    <div className={`flex items-center gap-[0.5em] group ${className}`}>
      <div className="relative shrink-0">
        {/* Persistent Iridescent Glow (Power Glow v1) */}
        <motion.div 
          animate={isAnimated ? {
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.05, 1],
          } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-br from-teal via-pink-500 to-purple-600 blur-xl opacity-20 dark:opacity-40 rounded-2xl"
        />
        
        {/* Hover intensification */}
        {!isAnimated && (
          <div className="absolute -inset-2 bg-gradient-to-br from-teal via-pink-500 to-purple-600 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 rounded-full"></div>
        )}
        
        <div className={`${iconSizes[size]} relative bg-[#0A0A12] flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-105 border border-white/10 group-hover:border-teal/30 overflow-hidden`}>
           {/* Subsurface iridescent reflection */}
           <motion.div 
             animate={isAnimated ? { opacity: [0.05, 0.15, 0.05] } : {}}
             transition={{ duration: 4, repeat: Infinity }}
             className="absolute inset-0 bg-gradient-to-br from-teal/20 via-pink-500/10 to-purple-600/20 opacity-[0.05] group-hover:opacity-[0.15] transition-opacity duration-500" 
           />
           
           <div className="relative z-10 w-full h-full">
            {renderIcon()}
           </div>
        </div>
      </div>

      {!hideText && (
        <span className={`${textSizes[size]} font-black tracking-tighter ${textColorClass} font-geist transition-colors duration-300 leading-none`}>
          TeamStrength<span className="text-teal">.</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
