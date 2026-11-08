'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Project } from '@/types';
import { ExternalLink, Github, Maximize2 } from 'lucide-react';

const defaultProjectImages = [
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
];

export const getDefaultProjectImage = (idx: number) => {
  return defaultProjectImages[idx % defaultProjectImages.length];
};

export const getProjectCoverImage = (project: Project, idx: number = 0) => {
  if (project.slug === 'perpustakaan-smkn-1-depok' || /perpustakaan/i.test(project.title)) {
    return '/projects/perpustakaan-smkn-1-depok-mockup.png';
  }
  if (project.slug === 'portal-yayasan-asih-putera' || /yayasan|asih putera/i.test(project.title)) {
    return '/projects/yayasan-asih-putera-mockup.png';
  }
  if (project.slug === 'qc-web-silondo-bermula' || /quality control|qc|silondo/i.test(project.title)) {
    return '/projects/qc-silondo-bermula-mockup.png';
  }
  if (project.coverImage && typeof project.coverImage === 'string' && project.coverImage.trim() !== '') {
    return project.coverImage;
  }
  return getDefaultProjectImage(idx);
};

export interface ProjectCardProps {
  project: Project;
  idx: number;
  showDescription?: boolean;
  onSelect?: (project: Project) => void;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  idx,
  onSelect,
  className = '',
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isMobileActive, setIsMobileActive] = useState(false);

  const isQCProject =
    project.slug === 'qc-web-silondo-bermula' ||
    /quality control|qc/i.test(project.title);
  const showDemo = !isQCProject && Boolean(project.demoUrl);
  const showRepo = !isQCProject && Boolean(project.repoUrl);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;

    setRotateX(-yPct * 4);
    setRotateY(xPct * 4);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
    setIsMobileActive(false);
  };

  const handleCardClick = () => {
    // Pada perangkat mobile / layar sentuh (touchscreen tanpa mouse hover)
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
      if (!isMobileActive) {
        setIsMobileActive(true);
        return;
      }
    }
    onSelect?.(project);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease-out, border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      className={`group relative rounded-2xl border border-brass/25 hover:border-brass/75 bg-void-950 overflow-hidden shadow-md hover:shadow-brass-glow transition-all duration-300 cursor-pointer select-none aspect-video sm:aspect-[16/10] w-full ${className}`}
    >
      {/* 1. Gambar Proyek Penuh (Full-Bleed Cover Image) */}
      <Image
        src={getProjectCoverImage(project, idx)}
        alt={`Cuplikan antarmuka proyek ${project.title}`}
        fill
        quality={85}
        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 380px"
        className="w-full h-full object-cover object-top sm:object-center scale-100 group-hover:scale-105 transition-transform duration-500 ease-out"
      />

      {/* 2. Interactive Golden Spotlight Glare */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 rounded-2xl"
        style={{
          opacity: glarePos.opacity,
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(197, 160, 89, 0.16) 0%, transparent 60%)`,
        }}
      />

      {/* 3. Subtle Bottom Shadow Vignette (Default/Idle: menjaga estetika gambar) */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-0" />

      {/* 4. Hover Overlay Reveal: Menampilkan Judul, Deskripsi, Tech Stack, & Tombol Aksi saat Kursor Diarahkan */}
      <div
        className={`absolute inset-0 z-20 flex flex-col justify-end p-4 sm:p-5 bg-gradient-to-t from-void-950/95 via-void-950/80 to-void-950/30 backdrop-blur-[3px] transition-all duration-300 ${
          isMobileActive
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
        }`}
      >
        <div className="space-y-2 sm:space-y-2.5">
          {/* Judul Proyek */}
          <h3 className="text-base sm:text-lg font-serif font-bold text-brass-light tracking-wide line-clamp-1 drop-shadow-sm">
            {project.title}
          </h3>

          {/* Deskripsi Proyek */}
          {project.description && (
            <p className="text-xs sm:text-[13px] text-parchment/90 font-sans leading-relaxed line-clamp-2 sm:line-clamp-3">
              {project.description}
            </p>
          )}

          {/* Micro-Badges Tech Stack */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              {project.tags.slice(0, 4).map((tag, i) => (
                <span
                  key={i}
                  className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-brass/15 border border-brass/30 text-brass-light tracking-wide select-none"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Tautan Aksi: DEMO, KODE, & DETAIL */}
          <div className="pt-2 border-t border-brass/20 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {showDemo && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brass hover:bg-brass-light text-void-950 text-xs font-mono font-bold tracking-wider transition-colors shadow-sm active:scale-95"
                  title="Buka Demo Langsung"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>DEMO</span>
                </a>
              )}

              {showRepo && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-brass/40 bg-void-900/80 hover:bg-brass/20 text-parchment text-xs font-mono font-bold tracking-wider transition-colors active:scale-95"
                  title="Buka Kode Repositori"
                >
                  <Github className="w-3.5 h-3.5 text-brass" />
                  <span>KODE</span>
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.(project);
              }}
              className="inline-flex items-center gap-1 text-[11px] font-mono text-parchment-dim hover:text-brass transition-colors uppercase tracking-wider ml-auto"
              title="Lihat Detail Lengkap"
            >
              <span>DETAIL</span>
              <Maximize2 className="w-3 h-3 text-brass" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
