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
      {/* Frameless Cutout Image Container dengan CSS Gradient Mask pada bagian bawah */}
      <motion.div
        style={{ y: yParallax }}
        className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[420px] flex items-end justify-center lg:justify-end [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]"
      >
        <Image
          src={imgSrc}
          alt={`Potret ${profile.name} — Software Engineer & Web Developer`}
          width={500}
          height={600}
          priority
          sizes="(max-width: 640px) 280px, (max-width: 1024px) 380px, 420px"
          onError={() => {
            if (imgSrc !== '/profile.png') {
              setImgSrc('/profile.png');
            }
          }}
          className="w-full h-auto max-h-[400px] sm:max-h-[450px] md:max-h-[480px] lg:max-h-[510px] object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
        />
      </motion.div>
    </div>
  );
};
