'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimeTitleCard } from '@/components/celestial/AnimeTitleCard';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { ProjectModal } from '@/components/sections/ProjectModal';
import { Project } from '@/types';
import { ArrowRight } from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  // Menampilkan maksimal 4 proyek terbaru pada homepage
  const latestProjects = projects.slice(0, 4);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-16 sm:py-24 border-t border-brass/15 bg-transparent scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Seksi: Judul di Kiri & Link Teks "LIHAT SELURUH PROYEK" di Kanan Atas */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <AnimeTitleCard
            title="PROYEK UNGGULAN"
            description="Koleksi aplikasi web dan sistem perangkat lunak terbaru yang telah saya bangun."
            className="mb-0"
          />

          <motion.div
            initial={{ opacity: 0, x: 16, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="pb-2 self-start sm:self-end shrink-0"
          >
            <Link
              href="/proyek"
              className="group inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-brass hover:text-brass-light uppercase transition-all duration-200 border-b border-brass/30 hover:border-brass pb-0.5 cursor-pointer"
            >
              <span>LIHAT SELURUH PROYEK</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Kisi Proyek Interaktif (Terpusat rapi dan seimbang) */}
        <div className="flex flex-wrap justify-center gap-5 sm:gap-6 mt-6 sm:mt-8 max-w-6xl mx-auto">
          {latestProjects.map((project, idx) => (
            <div
              key={project._id || idx}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm flex"
            >
              <ProjectCard
                project={project}
                idx={idx}
                showDescription={false}
                onSelect={setSelectedProject}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal Detail Proyek Lengkap (Deskripsi & Tech Stack) */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
