export type Language = 'id' | 'en';

export interface Dictionary {
  nav: {
    profile: string;
    skills: string;
    experience: string;
    contact: string;
  };
  hero: {
    role: string;
    bio: string[];
    btnProjects: string;
    btnContact: string;
  };
  projects: {
    title: string;
    subtitle: string;
    viewAll: string;
    btnDemo: string;
    btnCode: string;
    btnDetail: string;
    items: Record<string, { title?: string; description: string; longDescription?: string }>;
  };
  github: {
    title: string;
    yearSummary: string;
    contributionsInYear: string;
    less: string;
    more: string;
    noContrib: string;
    contribCount: string;
  };
  timeline: {
    title: string;
    subtitle: string;
    viewAll: string;
    viewMore: string;
    tabWork: string;
    tabEducation: string;
    activeStatus: string;
    items: Record<string, { role?: string; company?: string; description?: string; highlights?: string[] }>;
  };
  footer: {
    quote: string;
    sitemap: string;
    contact: string;
    backToTop: string;
    rights: string;
  };
  archive: {
    backHome: string;
    projectsTitle: string;
    projectsSubtitle: string;
    timelineTitle: string;
    timelineSubtitle: string;
    searchProjects: string;
    searchTimeline: string;
    tabAll: string;
    tabFeatured: string;
    noProjectsMatch: string;
    noTimelineMatch: string;
  };
  modal: {
    overview: string;
    techStack: string;
    close: string;
  };
}

export const dictionaries: Record<Language, Dictionary> = {
  id: {
    nav: {
      profile: 'PROFILE',
      skills: 'KEAHLIAN',
      experience: 'PENGALAMAN',
      contact: 'CONTACT',
    },
    hero: {
      role: 'SOFTWARE ENGINEER & WEB DEVELOPER',
      bio: [
        'Hello, saya Muhammad Dzikry Fikry, seorang Software Engineer & Web Developer yang berfokus pada pengembangan sistem web full-stack, Quality Check Web, dan AI/ML Antusias.',
      ],
      btnProjects: 'LIHAT PROYEK',
      btnContact: 'HUBUNGI SAYA',
    },
    projects: {
      title: 'PROYEK UNGGULAN',
      subtitle: 'Koleksi aplikasi web dan sistem perangkat lunak terbaru yang telah saya bangun.',
      viewAll: 'LIHAT SELURUH PROYEK',
      btnDemo: 'DEMO',
      btnCode: 'KODE',
      btnDetail: 'DETAIL',
      items: {
        'portal-yayasan-asih-putera': {
          title: 'Portal Yayasan Asih Putera',
          description:
            'Portal web resmi dan pusat informasi digital Yayasan Asih Putera dengan arsitektur modern berlatensi rendah.',
          longDescription:
            'Dibangun menggunakan Next.js App Router, React 19, TypeScript, dan Tailwind CSS. Menghadirkan antarmuka institusional yang responsif, navigasi cepat, dan integrasi modular untuk profil yayasan, unit pendidikan, dan informasi layanan publik.',
        },
        'perpustakaan-smkn-1-depok': {
          title: 'Sistem Informasi Perpustakaan SMKN 1 Depok',
          description:
            'Aplikasi manajemen perpustakaan berbasis web untuk otomasi sirkulasi buku, katalog digital, dan administrasi SMKN 1 Depok.',
          longDescription:
            'Sistem informasi perpustakaan digital terintegrasi yang mencakup otentikasi multi-user (siswa & admin), pencatatan sirkulasi peminjaman & pengembalian buku, formulir saran buku baru, serta laporan riwayat peminjaman siswa dengan basis data MySQL terstruktur.',
        },
        'qc-web-silondo-bermula': {
          title: 'Quality Control (QC) Web Silondo Bermula',
          description:
            'Pengujian fungsionalitas menyeluruh, validasi alur bisnis, dan audit responsivitas antarmuka sistem web Silondo Bermula.',
          longDescription:
            'Implementasi metodologi Quality Assurance komprehensif yang mencakup pengujian manual fungsional lintas modul (autentikasi, perizinan role, validasi input, respons API, dan kompatibilitas lintas peramban) guna memastikan stabilitas rilis produk.',
        },
      },
    },
    github: {
      title: 'GitHub Contributions:',
      yearSummary: 'kontribusi setahun terakhir',
      contributionsInYear: 'contributions in the last year',
      less: 'Kurang',
      more: 'Lebih',
      noContrib: 'Tidak ada kontribusi',
      contribCount: 'kontribusi pada',
    },
    timeline: {
      title: 'PENGALAMAN & PENDIDIKAN',
      subtitle:
        'Perjalanan karir profesional, pengalaman implementasi sistem perangkat lunak, dan latar belakang akademik.',
      viewAll: 'LIHAT SELURUH RIWAYAT',
      viewMore: 'LIHAT LEBIH BANYAK PENGALAMAN & PENDIDIKAN',
      tabWork: 'PENGALAMAN KERJA',
      tabEducation: 'PENDIDIKAN',
      activeStatus: 'AKTIF',
      items: {
        'ciptadra-softindo': {
          role: 'Web Developer & QA Intern (PKL)',
          company: 'PT Ciptadra Softindo',
          description:
            'Menjalani Praktik Kerja Lapangan (PKL) selama 4 bulan yang berfokus pada Quality Assurance (QA) web, modernisasi tampilan produk perusahaan (Onebox), dan pembangunan portal yayasan berbasis Next.js.',
          highlights: [
            'Membangun Portal Yayasan Asih Putera menggunakan Next.js yang diintegrasikan dengan headless CMS internal perusahaan melalui REST API.',
            'Melakukan pembaruan dan redesain antarmuka (UI/UX) web untuk salah satu produk digital utama PT Ciptadra Softindo, yaitu Onebox.',
            'Melakukan pengujian Quality Assurance (QA) web secara berkala untuk memastikan keandalan fungsi, responsivitas antarmuka, dan validitas alur kerja sistem.',
          ],
        },
        'smkn1-depok-org': {
          role: 'Ketua Ekstrakurikuler & Pengurus Organisasi Penaung',
          company: 'SMKN 1 Depok',
          description:
            'Memimpin operasional ekstrakurikuler sekolah sekaligus aktif menjabat sebagai anggota dalam organisasi penaung ekstrakurikuler di SMKN 1 Depok.',
          highlights: [
            'Memimpin koordinasi tim, perencanaan program kerja, dan eksekusi berbagai kegiatan berkala ekstrakurikuler selama masa bakti.',
            'Menjembatani aspirasi dan komunikasi efektif antara anggota ekstrakurikuler dengan organisasi penaung serta pihak sekolah.',
            'Mengelola pembinaan kemampuan teknis/kreatif tim, regenerasi keanggotaan, dan evaluasi berkala kegiatan.',
          ],
        },
        'karang-taruna': {
          role: 'Divisi Hubungan Masyarakat (Humas)',
          company: 'Karang Taruna',
          description:
            'Bertanggung jawab dalam pengelolaan komunikasi publik, publikasi informasi kegiatan kepemudaan, serta menjalin hubungan kemasyarakatan di lingkungan sekitar.',
          highlights: [
            'Menyusun dan mempublikasikan informasi agenda kepemudaan, sosial, dan kegiatan kemasyarakatan secara berkala dan terstruktur.',
            'Membangun relasi kemitraan aktif antara pemuda, pengurus lingkungan, dan tokoh masyarakat sekitar.',
            'Mendukung publikasi digital serta kelancaran koordinasi sosial pada berbagai acara kegiatan warga.',
          ],
        },
      },
    },
    footer: {
      quote: 'Bahkan jika dunia ini terbalik, bumi tetap berputar pada porosnya.',
      sitemap: 'SITE MAP',
      contact: 'KONTAK',
      backToTop: 'KEMBALI KE ATAS',
      rights: 'Seluruh hak cipta dilindungi.',
    },
    archive: {
      backHome: 'KEMBALI KE BERANDA',
      projectsTitle: 'SELURUH PROYEK',
      projectsSubtitle:
        'Koleksi lengkap seluruh aplikasi web, sistem terdistribusi, dan produk digital yang telah saya bangun.',
      timelineTitle: 'SELURUH PENGALAMAN & PENDIDIKAN',
      timelineSubtitle:
        'Daftar lengkap riwayat karir profesional, peran kepemimpinan organisasi, serta jejak akademik formal.',
      searchProjects: 'Cari proyek...',
      searchTimeline: 'Cari posisi, instansi, skill...',
      tabAll: 'SEMUA',
      tabFeatured: 'UNGGULAN',
      noProjectsMatch: 'Tidak ditemukan proyek yang cocok dengan',
      noTimelineMatch: 'Tidak ditemukan riwayat yang cocok dengan',
    },
    modal: {
      overview: 'RINGKASAN & DAMPAK',
      techStack: 'TEKNOLOGI & ALAT',
      close: 'TUTUP',
    },
  },

  en: {
    nav: {
      profile: 'PROFILE',
      skills: 'SKILLS',
      experience: 'EXPERIENCE',
      contact: 'CONTACT',
    },
    hero: {
      role: 'SOFTWARE ENGINEER & WEB DEVELOPER',
      bio: [
        "Hello, I am Muhammad Dzikry Fikry, a Software Engineer & Web Developer focused on full-stack web systems, Web Quality Assurance, and an AI/ML enthusiast.",
      ],
      btnProjects: 'EXPLORE PROJECTS',
      btnContact: 'CONTACT ME',
    },
    projects: {
      title: 'FEATURED PROJECTS',
      subtitle: 'Curated collection of modern web applications and software systems I have built.',
      viewAll: 'VIEW ALL PROJECTS',
      btnDemo: 'DEMO',
      btnCode: 'CODE',
      btnDetail: 'DETAIL',
      items: {
        'portal-yayasan-asih-putera': {
          title: 'Yayasan Asih Putera Web Portal',
          description:
            'Official web portal and digital information center for Yayasan Asih Putera engineered with low-latency modern architecture.',
          longDescription:
            'Built with Next.js App Router, React 19, TypeScript, and Tailwind CSS. Features an institutional responsive UI, ultra-fast routing, and modular integration for educational units and public services.',
        },
        'perpustakaan-smkn-1-depok': {
          title: 'SMKN 1 Depok Library Information System',
          description:
            'Web-based library management platform automating book circulation, digital cataloging, and student administration at SMKN 1 Depok.',
          longDescription:
            'Integrated digital library software featuring multi-role authentication (student & administrator), book borrowing and return workflows, recommendation forms, and historical borrowing analytics with MySQL.',
        },
        'qc-web-silondo-bermula': {
          title: 'Quality Control (QC) Web Silondo Bermula',
          description:
            'Comprehensive functional verification, business flow validation, and UI/UX responsiveness audit for Silondo Bermula web system.',
          longDescription:
            'Implementation of rigorous QA methodologies covering end-to-end functional testing across modules (auth, permissions, input sanitization, API contracts, cross-browser audits) to ensure release readiness.',
        },
      },
    },
    github: {
      title: 'GitHub Contributions:',
      yearSummary: 'contributions in the last year',
      contributionsInYear: 'contributions in the last year',
      less: 'Less',
      more: 'More',
      noContrib: 'No contributions',
      contribCount: 'contributions on',
    },
    timeline: {
      title: 'EXPERIENCE & EDUCATION',
      subtitle:
        'Professional career milestones, software engineering implementation track record, and academic background.',
      viewAll: 'VIEW FULL CAREER PATH',
      viewMore: 'VIEW MORE EXPERIENCE & EDUCATION',
      tabWork: 'WORK EXPERIENCE',
      tabEducation: 'EDUCATION',
      activeStatus: 'ACTIVE',
      items: {
        'ciptadra-softindo': {
          role: 'Web Developer & QA Intern',
          company: 'PT Ciptadra Softindo',
          description:
            'Completed a 4-month professional internship focusing on web Quality Assurance (QA), redesigning internal core products (Onebox), and building a foundation web portal using Next.js.',
          highlights: [
            'Engineered Yayasan Asih Putera Web Portal with Next.js integrated with proprietary headless CMS via RESTful APIs.',
            'Modernized and redesigned user interfaces (UI/UX) for Onebox, PT Ciptadra Softindo’s flagship software product.',
            'Conducted automated and manual Quality Assurance testing across core web systems to guarantee uptime and business logic stability.',
          ],
        },
        'smkn1-depok-org': {
          role: 'Extracurricular Head & Oversight Board Member',
          company: 'SMKN 1 Depok',
          description:
            'Spearheaded school extracurricular operations while serving as an active board officer in the extracurricular oversight council at SMKN 1 Depok.',
          highlights: [
            'Led cross-functional teams in planning, resource allocation, and execution of major school events and technical workshops.',
            'Facilitated clear communication channels between student clubs, student council representatives, and school administration.',
            'Mentored junior members in creative problem-solving, team management, and conducted periodic performance reviews.',
          ],
        },
        'karang-taruna': {
          role: 'Public Relations Officer',
          company: 'Karang Taruna Youth Council',
          description:
            'Directed public communication campaigns, digital information broadcasts, and community outreach initiatives for youth programs.',
          highlights: [
            'Curated and published structured digital announcements, civic bulletins, and social empowerment programs.',
            'Fostered active collaborative partnerships between local youth, neighborhood councils, and community leaders.',
            'Supported digital engagement and logistics coordination across regional civic and cultural events.',
          ],
        },
      },
    },
    footer: {
      quote: 'Even if the world were turned upside down, the earth still revolves on its axis.',
      sitemap: 'SITE MAP',
      contact: 'CONTACT',
      backToTop: 'BACK TO TOP',
      rights: 'All rights reserved.',
    },
    archive: {
      backHome: 'BACK TO HOME',
      projectsTitle: 'ALL PROJECTS',
      projectsSubtitle:
        'Complete repository of web applications, software systems, and digital products engineered by Dzikry.',
      timelineTitle: 'ALL EXPERIENCE & EDUCATION',
      timelineSubtitle:
        'Comprehensive professional milestones, organizational leadership history, and academic achievements.',
      searchProjects: 'Search projects...',
      searchTimeline: 'Search roles, companies, skills...',
      tabAll: 'ALL',
      tabFeatured: 'FEATURED',
      noProjectsMatch: 'No projects found matching',
      noTimelineMatch: 'No records found matching',
    },
    modal: {
      overview: 'OVERVIEW & IMPACT',
      techStack: 'TECH STACK & TOOLS',
      close: 'CLOSE',
    },
  },
};
