'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Project } from '@/types';
import { ExternalLink, Github } from 'lucide-react';

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
  showDescription = false,
  onSelect,
  className = '',
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

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

    setRotateX(-yPct * 5);
    setRotateY(xPct * 5);
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
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect?.(project)}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease-out, border-color 0.3s ease',
      }}
      className={`group relative rounded-2xl border border-brass/25 bg-white/60 dark:bg-void-950/50 backdrop-blur-md flex flex-col justify-between hover:border-brass/70 hover:bg-white/75 dark:hover:bg-void-950/65 transition-colors duration-300 overflow-hidden shadow-sm cursor-pointer ${className}`}
    >
      {/* Interactive Golden Spotlight Glare */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 rounded-2xl"
        style={{
          opacity: glarePos.opacity,
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(197, 160, 89, 0.14) 0%, transparent 60%)`,
        }}
      />

      {/* Gambar Proyek Jernih & Asli */}
      <div className="relative w-full aspect-video overflow-hidden border-b border-brass/20 bg-void-900 rounded-t-2xl">
        <Image
          src={getProjectCoverImage(project, idx)}
          alt={`Cuplikan antarmuka proyek ${project.title}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>

      {/* Konten Proyek: Judul & Tautan (Semua Rata Tengah / Center) */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          {/* Judul Proyek (Center) */}
          <h3 className="text-base sm:text-lg font-serif font-bold text-parchment group-hover:text-brass-light transition-colors line-clamp-2 text-center">
            {project.title}
          </h3>

          {/* Deskripsi (Hanya ditampilkan jika showDescription = true, Center) */}
          {showDescription && project.description && (
            <p className="mt-2 text-xs sm:text-sm text-parchment-dim font-sans leading-relaxed line-clamp-3 text-center">
              {project.description}
            </p>
          )}
        </div>

        {/* Tautan Aksi: DEMO & KODE (Center, Tanpa Tulisan DETAIL, Disembunyikan pada proyek QC) */}
        {(showDemo || showRepo) && (
          <div className="pt-3 border-t border-brass/15 flex items-center justify-center">
            <div className="flex items-center justify-center gap-5">
              {showDemo && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-brass hover:text-brass-light transition-colors font-semibold tracking-wider"
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
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-parchment-dim hover:text-parchment transition-colors font-semibold tracking-wider"
                  title="Buka Kode Repositori"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>KODE</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};