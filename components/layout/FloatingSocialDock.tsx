'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';
import { Profile } from '@/types';

interface FloatingSocialDockProps {
  profile?: Profile;
}

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export const FloatingSocialDock: React.FC<FloatingSocialDockProps> = ({ profile }) => {
  const emailTarget = profile?.socialLinks?.email || 'm.dzikryfikry@gmail.com';
  const mailtoHref = emailTarget.startsWith('mailto:')
    ? emailTarget
    : `mailto:${emailTarget}`;

  const githubUrl = profile?.socialLinks?.github || 'https://github.com/DzikryFy';
  const linkedinUrl =
    profile?.socialLinks?.linkedin ||
    'https://www.linkedin.com/in/muhammad-dzikry-fikry';

  const rawPhone = profile?.phone || '+62 812-8838-9457';
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}`;

  const socialItems = [
    {
      name: 'Email',
      href: mailtoHref,
      icon: <Mail className="w-4 h-4 text-brass" />,
      tooltip: 'm.dzikryfikry@gmail.com',
      isExternal: false,
    },
    {
      name: 'GitHub',
      href: githubUrl,
      icon: <Github className="w-4 h-4 text-brass" />,
      tooltip: 'github.com/DzikryFy',
      isExternal: true,
    },
    {
      name: 'LinkedIn',
      href: linkedinUrl,
      icon: <Linkedin className="w-4 h-4 text-brass" />,
      tooltip: 'linkedin.com/in/muhammad-dzikry-fikry',
      isExternal: true,
    },
    {
      name: 'WhatsApp',
      href: whatsappUrl,
      icon: <WhatsAppIcon className="w-4 h-4 text-emerald-500" />,
      tooltip: 'WhatsApp: +62 812-8838-9457',
      isExternal: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-14 md:bottom-16 right-3 md:right-4 z-40 flex items-center gap-1.5 p-1.5 rounded-full bg-white/90 dark:bg-void-950/90 border border-slate-200/90 dark:border-brass/35 shadow-lg shadow-black/10 dark:shadow-black/50 backdrop-blur-md select-none transition-colors"
      aria-label="Tautan Sosial Cepat"
    >
      {socialItems.map((item) => (
        <a
          key={item.name}
          href={item.href}
          target={item.isExternal ? '_blank' : undefined}
          rel={item.isExternal ? 'noopener noreferrer' : undefined}
          className="group relative w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full flex items-center justify-center text-slate-700 dark:text-parchment hover:text-brass dark:hover:text-brass-light hover:bg-brass/10 border border-transparent hover:border-brass/30 transition-all duration-200 active:scale-95"
          aria-label={item.name}
          title={item.tooltip}
        >
          {item.icon}

          {/* Floating Tooltip di Atas Tombol */}
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 px-2 py-0.5 rounded bg-void-950 text-parchment border border-brass/30 text-[10px] font-mono whitespace-nowrap shadow-md z-50">
            {item.name}
          </span>
        </a>
      ))}
    </motion.div>
  );
};
