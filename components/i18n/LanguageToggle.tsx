'use client';

import React from 'react';
import { useLanguage } from './LanguageProvider';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  className?: string;
  showIcon?: boolean;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  className = '',
  showIcon = false,
}) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-brass/35 bg-white/80 dark:bg-void-950/85 p-0.5 text-xs font-mono select-none shadow-sm backdrop-blur-sm transition-colors ${className}`}
      role="group"
      aria-label="Pengalih Bahasa / Language Switcher"
    >
      {showIcon && (
        <span className="pl-1.5 pr-0.5 text-brass">
          <Globe className="w-3.5 h-3.5" />
        </span>
      )}

      <button
        type="button"
        onClick={() => setLanguage('id')}
        className={`px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wider transition-all duration-200 cursor-pointer ${
          language === 'id'
            ? 'bg-brass text-white dark:text-void-950 shadow-sm'
            : 'text-slate-600 dark:text-parchment-dim hover:text-brass dark:hover:text-brass-light'
        }`}
        title="Bahasa Indonesia"
        aria-pressed={language === 'id'}
      >
        ID
      </button>

      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wider transition-all duration-200 cursor-pointer ${
          language === 'en'
            ? 'bg-brass text-white dark:text-void-950 shadow-sm'
            : 'text-slate-600 dark:text-parchment-dim hover:text-brass dark:hover:text-brass-light'
        }`}
        title="English"
        aria-pressed={language === 'en'}
      >
        EN
      </button>
    </div>
  );
};
