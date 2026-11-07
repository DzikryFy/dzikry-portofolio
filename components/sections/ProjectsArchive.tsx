'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Project } from '@/types';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { ProjectModal } from '@/components/sections/ProjectModal';
import { AnimeTitleCard } from '@/components/celestial/AnimeTitleCard';
import { ArrowLeft, Search } from 'lucide-react';

interface ProjectsArchiveProps {
  projects: Project[];
}

export const ProjectsArchive: React.FC<ProjectsArchiveProps> = ({ projects }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'featured'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter((p) => {
    const matchesFilter = filter === 'all' || (filter === 'featured' && p.featured);
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
      {/* Tombol Navigasi Kembali ke Beranda */}
      <div className="mb-8">
        <Link
          href="/"
          onClick={() => {
            try {
              sessionStorage.setItem('has_seen_splash', 'true');
              localStorage.setItem('has_seen_splash', 'true');
            } catch {}
          }}
          className="inline-flex items-center gap-2 text-xs font-mono text-parchment-dim hover:text-brass transition-colors tracking-wider group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>KEMBALI KE BERANDA</span>
        </Link>
      </div>

      {/* Header Halaman */}
      <div className="mb-10 pb-8 border-b border-brass/20 space-y-6">
        <AnimeTitleCard
          title="SELURUH PROYEK"
          description="Koleksi lengkap seluruh aplikasi web, sistem terdistribusi, dan produk digital yang telah saya bangun."
          className="mb-0"
        />

        {/* Kontrol Pencarian & Filter (Rata Kiri) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3">
          {/* Input Pencarian (Kapsul Melengkung) */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-brass/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari proyek..."
              className="pl-10 pr-4 py-2 rounded-full border border-brass/25 bg-void-950/80 text-parchment text-xs font-mono placeholder:text-parchment-dark focus:outline-none focus:border-brass transition-colors w-full"
            />
          </div>

          {/* Filter Tab (Kapsul Melengkung) */}
          <div className="flex items-center gap-2 font-mono text-xs select-none">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full border transition-all ${
                filter === 'all'
                  ? 'border-brass bg-brass/15 text-brass-light font-bold shadow-sm'
                  : 'border-brass/20 text-parchment-dim hover:border-brass/40 hover:text-parchment'
              }`}
            >
              SEMUA
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`px-4 py-2 rounded-full border transition-all ${
                filter === 'featured'
                  ? 'border-brass bg-brass/15 text-brass-light font-bold shadow-sm'
                  : 'border-brass/20 text-parchment-dim hover:border-brass/40 hover:text-parchment'
              }`}
            >
              UNGGULAN
            </button>
          </div>
        </div>
      </div>

      {/* Kisi Seluruh Proyek (Terpusat Rapi & Seimbang) */}
      {filteredProjects.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-5 sm:gap-6 max-w-6xl mx-auto">
          {filteredProjects.map((project, idx) => (
            <div
              key={project._id || idx}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm flex"
            >
              <ProjectCard
                project={project}
                idx={idx}
                onSelect={setSelectedProject}
                className="w-full"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-brass/15 rounded-2xl bg-void-950/40">
          <p className="text-sm font-mono text-parchment-dim">
            Tidak ada proyek yang cocok dengan kata kunci &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilter('all');
            }}
            className="mt-4 px-5 py-2 text-xs font-mono text-brass border border-brass/30 hover:border-brass rounded-full transition-colors"
          >
            RESET PENCARIAN
          </button>
        </div>
      )}

      {/* Modal Detail Proyek Lengkap */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};
