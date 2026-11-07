'use client';

import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const HeliocentricDiagram: React.FC<{ size?: number; className?: string }> = ({
  size = 460,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 25, stiffness: 120 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    rotateY.set(deltaX * 12);
    rotateX.set(-deltaY * 12);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex items-center justify-center select-none perspective-[1000px] ${className}`}
      style={{ width: size, height: size }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Background Soft Celestial Radial Aura */}
        <div className="absolute inset-0 rounded-full bg-gradient-radial from-brass/10 via-brass/5 to-transparent blur-2xl pointer-events-none" />

        {/* Outer Rotating Astrolabe Ring 1 */}
        <div className="absolute inset-0 rounded-full border border-brass/25 animate-spin-slow pointer-events-none">
          {/* Degree markers */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <div
              key={deg}
              className="absolute top-0 left-1/2 -translate-x-1/2 origin-[center_230px] flex flex-col items-center"
              style={{ transform: `rotate(${deg}deg)` }}
            >
              <div className="w-[1px] h-3 bg-brass/60" />
              <span className="text-[8px] font-mono text-brass/50 mt-1">{deg}°</span>
            </div>
          ))}
        </div>

        {/* Outer Reverse Rotating Astrolabe Ring 2 */}
        <div className="absolute inset-4 rounded-full border border-brass/15 border-dashed animate-spin-reverse pointer-events-none" />

        {/* Zodiac / Ecliptic Ring */}
        <div className="absolute inset-12 rounded-full border border-brass/20 pointer-events-none">
          {/* Crosshairs */}
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] -translate-x-1/2 bg-gradient-to-b from-brass/20 via-transparent to-brass/20" />
          <div className="absolute left-0 right-0 top-1/2 h-[1px] -translate-y-1/2 bg-gradient-to-r from-brass/20 via-transparent to-brass/20" />
        </div>

        {/* Planetary Orbit Track 3 (Mars) */}
        <div className="absolute inset-20 rounded-full border border-brass/15 pointer-events-none">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brass-muted" />
        </div>

        {/* Planetary Orbit Track 2 (Earth / Bumi) */}
        <div className="absolute inset-28 rounded-full border border-brass/35 pointer-events-none">
          {/* Earth Body & Moon */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <div className="w-3.5 h-3.5 rounded-full bg-void-950 border border-brass flex items-center justify-center shadow-brass-glow">
              <div className="w-1.5 h-1.5 rounded-full bg-parchment" />
            </div>
            {/* Bulan */}
            <div className="absolute w-8 h-8 rounded-full border border-brass/30 animate-spin-slow">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brass/80" />
            </div>
          </div>
        </div>

        {/* Planetary Orbit Track 1 (Venus / Merkurius) */}
        <div className="absolute inset-36 rounded-full border border-brass/20 pointer-events-none">
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brass/60" />
        </div>

        {/* Central Sun (Matahari - Pusat Heliosentris) */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="relative w-12 h-12 rounded-full bg-brass/10 border border-brass flex items-center justify-center shadow-brass-glow">
            <div className="w-6 h-6 rounded-full bg-brass/80 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-parchment" />
            </div>
            {/* Pancaran sinar */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <div
                key={angle}
                className="absolute w-[1px] h-3 bg-brass/40"
                style={{
                  top: '-8px',
                  transformOrigin: 'center 32px',
                  transform: `rotate(${angle}deg)`,
                }}
              />
            ))}
          </div>
          <span className="mt-2 text-[9px] font-mono tracking-widest text-brass/70 uppercase">
            MATAHARI
          </span>
        </div>

        {/* Title Inscription */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-mono text-brass/60 tracking-widest uppercase pointer-events-none">
          ORB: PERGERAKAN BUMI
        </div>
      </motion.div>
    </div>
  );
};
