'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Profile } from '@/types';

interface HeroPortraitProps {
  profile: Profile;
}

export const HeroPortrait: React.FC<HeroPortraitProps> = ({ profile }) => {
  const [imgSrc, setImgSrc] = useState<string>(
    profile.avatarUrl || '/profile.png'
  );

  // Parallax ringan via Framer Motion: foto bergeser ~15-20px lebih lambat saat scroll
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 600], [0, 18]);

  return (
    <div className="relative w-full flex items-end justify-center lg:justify-end self-end pointer-events-none select-none">
      {/* Frameless Cutout Image Container: bebas mask-image & overflow-visible agar shadow tidak terpotong garis horizontal */}
      <motion.div
        style={{ y: yParallax }}
        className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[460px] flex items-end justify-center lg:justify-end pb-0 overflow-visible"
      >
        <Image
          src={imgSrc}
          alt={`Potret ${profile.name} — Software Engineer & Web Developer`}
          width={373}
          height={669}
          priority
          quality={85}
          sizes="(max-width: 640px) 280px, (max-width: 1024px) 380px, 420px"
          onError={() => {
            if (imgSrc !== '/profile.png') {
              setImgSrc('/profile.png');
            }
          }}
          className="w-full h-auto max-h-[390px] sm:max-h-[440px] md:max-h-[480px] lg:max-h-[510px] object-contain object-bottom drop-shadow-[0_8px_20px_rgba(2,132,199,0.14)] drop-shadow-[0_16px_30px_rgba(15,23,42,0.08)] dark:drop-shadow-[0_16px_35px_rgba(0,0,0,0.7)] dark:drop-shadow-[0_0_30px_rgba(197,160,89,0.14)]"
        />
      </motion.div>
    </div>
  );
};
