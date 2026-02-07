
import React from 'react';
import { motion } from 'framer-motion';

interface UserAvatarProps {
  firstName: string;
  lastName: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ 
  firstName, 
  lastName, 
  size = 'md',
  className = "" 
}) => {
  const initials = {
    f: firstName.charAt(0).toUpperCase(),
    l: lastName.charAt(0).toUpperCase()
  };

  const containerSizes = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-12 h-12 rounded-2xl'
  };

  const fontSizes = {
    sm: '40px',
    md: '45px',
    lg: '50px'
  };

  return (
    <div className={`relative shrink-0 group ${className}`}>
      {/* Power Glow Aura */}
      <div className="absolute inset-0 iridescent-gradient blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full" />
      
      <div className={`${containerSizes[size]} relative bg-[#1A1A1F] flex items-center justify-center shadow-xl border border-white/10 group-hover:border-white/20 overflow-hidden transition-all duration-500`}>
        {/* Subsurface reflection */}
        <div className="absolute inset-0 iridescent-gradient opacity-[0.05] group-hover:opacity-[0.1] transition-opacity" />
        
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full relative z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* First Initial - Solid style like the 'T' */}
          <text
            x="32"
            y="62"
            textAnchor="middle"
            fill="white"
            className="font-geist"
            style={{ fontSize: fontSizes[size], fontWeight: 900 }}
          >
            {initials.f}
          </text>
          
          {/* Second Initial - Stroked ribbon style like the 'S' */}
          <motion.text
            x="68"
            y="62"
            textAnchor="middle"
            fill="none"
            stroke="#2DD4BF"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="font-geist"
            style={{ fontSize: fontSizes[size], fontWeight: 900 }}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {initials.l}
          </motion.text>
        </svg>
      </div>
    </div>
  );
};

export default UserAvatar;
