'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimeTitleCardProps {
  actNumber?: string;
  actSubtitle?: string;
  title: string;
  catalogCode?: string;
  japaneseTitle?: string;
  description?: string;
  className?: string;
}

export const AnimeTitleCard: React.FC<AnimeTitleCardProps> = ({
  title,
  description,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative mb-8 select-none ${className}`}
    >
      {/* Main Title Typography - Clean Cinematic Header */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-brass dark:text-parchment font-bold">
        {title}
      </h2>

      {description && (
        <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-parchment-dim font-sans leading-relaxed max-w-none md:whitespace-nowrap">
          {description}
        </p>
      )}
    </motion.div>
  );
};
