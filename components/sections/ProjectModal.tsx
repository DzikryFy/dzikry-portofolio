'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types';
import { X, ExternalLink, Github } from 'lucide-react';
import { getDefaultProjectImage, getProjectCoverImage } from './ProjectCard';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Tutup dengan tombol Escape & kunci scroll body saat modal aktif
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          {/* Backdrop Gelap Kosmis dengan Blur Halus */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-void-950/85 backdrop-blur-md cursor-pointer"
          />

          {/* Kotak Konten Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-brass/35 bg-void-950 p-5 sm:p-8 text-parchment shadow-2xl shadow-black z-10 space-y-6"
          >
            {/* Tombol Tutup (Silang) */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full border border-brass/30 bg-brass/10 hover:bg-brass hover:text-void-950 text-brass flex items-center justify-center transition-all duration-200 active:scale-90 shadow-sm cursor-pointer z-20"
              aria-label="Tutup jendela modal"
              title="Tutup (Esc)"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header: Tag Kategori / Epoch */}
            <div className="flex items-center gap-2 pr-12">
              <span className="text-[10px] sm:text-xs font-mono text-brass uppercase font-bold tracking-widest">
                // PROYEK {project.japaneseTitle ? `// ${project.japaneseTitle}` : ''}
              </span>
              {project.epoch && (
                <span className="text-[10px] font-mono text-parchment-dim tracking-wider">
                  [{project.epoch}]
                </span>
              )}
            </div>

            {/* Judul Proyek */}
            <h2
              id="modal-project-title"
              className="text-2xl sm:text-3xl font-serif font-bold text-brass dark:text-parchment tracking-tight"
            >
              {project.title}
            </h2>

            {/* Gambar Cover Proyek */}
            <div className="relative w-full aspect-video overflow-hidden rounded-xl border border-brass/20 bg-void-900 shadow-md">
              <Image
                src={getProjectCoverImage(project, 0)}
                alt={`Detail gambar proyek ${project.title}`}
                fill
                sizes="(max-width: 640px) 100vw, 672px"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Bagian: Tech Stack */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1 rounded-full border border-brass/30 bg-brass/10 text-brass hover:border-brass text-xs font-mono transition-colors shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Bagian: Deskripsi Lengkap */}
            <div className="space-y-2.5 text-sm sm:text-base text-parchment-dim font-sans leading-relaxed">
              <p className="text-parchment font-medium">
                {project.description}
              </p>
              {project.longDescription && project.longDescription !== project.description && (
                <p className="text-parchment-dim">
                  {project.longDescription}
                </p>
              )}
            </div>

            {/* Bagian Tautan Aksi: Demo & Repository (Disembunyikan pada Proyek QC) */}
            {(() => {
              const isQC =
                project.slug === 'qc-web-silondo-bermula' ||
                /quality control|qc/i.test(project.title);
              const showDemo = !isQC && Boolean(project.demoUrl);
              const showRepo = !isQC && Boolean(project.repoUrl);

              if (!showDemo && !showRepo) return null;

              return (
                <div className="pt-4 border-t border-brass/15 flex flex-wrap items-center gap-3">
                  {showDemo && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-brass bg-brass hover:bg-brass-light text-white dark:text-void-950 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-brass-glow active:scale-95"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>KUNJUNGI DEMO</span>
                    </a>
                  )}

                  {showRepo && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-brass/40 bg-white dark:bg-black hover:border-brass text-slate-900 dark:text-parchment hover:text-brass font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-sm dark:shadow-md dark:shadow-black active:scale-95"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>KODE REPOSITORI</span>
                    </a>
                  )}
                </div>
              );
            })()}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
