'use client';

import React from 'react';

interface HeresySealProps {
  text?: string;
  subtext?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const HeresySeal: React.FC<HeresySealProps> = ({
  text = 'BUMI',
  subtext = 'PORTFOLIO',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10 text-[10px]',
    md: 'w-14 h-14 text-xs',
    lg: 'w-20 h-20 text-sm',
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center font-serif select-none ${sizeClasses[size]} ${className}`}
      title="Stempel Segel Autentikasi"
    >
      {/* Garis batas merah stempel */}
      <div className="absolute inset-0 rounded border-2 border-heresy/80 shadow-heresy-glow rotate-[-4deg] pointer-events-none transition-transform hover:rotate-0" />
      {/* Garis batas dalam tipis */}
      <div className="absolute inset-[3px] rounded-sm border border-heresy/50 pointer-events-none" />

      {/* Tekstur stempel tinta & teks */}
      <div className="relative flex flex-col items-center justify-center leading-none text-heresy font-bold tracking-wider text-center">
        <span className="scale-105 font-serif font-extrabold drop-shadow-[0_0_2px_rgba(166,43,43,0.8)]">{text}</span>
        {subtext && (
          <span className="text-[7px] tracking-widest uppercase mt-0.5 opacity-90 font-mono">
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
};
