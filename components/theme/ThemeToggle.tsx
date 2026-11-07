'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  showLabel = false,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-full border border-brass/30 bg-brass/10 animate-pulse ${className}`}
      />
    );
  }

  const isLight = theme === 'light';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center gap-2 ${showLabel ? 'px-4 py-2 rounded-full' : 'w-9 h-9 rounded-full'} border border-brass/30 bg-brass/10 hover:bg-brass/20 hover:border-brass text-brass transition-all duration-200 active:scale-95 shadow-sm group ${className}`}
      title={isLight ? 'Beralih ke Mode Gelap (Malam / Kosmik)' : 'Beralih ke Mode Terang (Siang / Azure Chi)'}
      aria-label={isLight ? 'Beralih ke Mode Gelap' : 'Beralih ke Mode Terang'}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isLight ? (
          <Moon className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-12 text-brass" />
        ) : (
          <Sun className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45 text-brass-light" />
        )}
      </div>
      {showLabel && (
        <span className="text-xs font-mono tracking-wider">
          {isLight ? 'MODE GELAP' : 'MODE TERANG'}
        </span>
      )}
    </button>
  );
};
