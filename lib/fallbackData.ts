import { PortfolioData } from '@/types';

export const fallbackPortfolioData: PortfolioData = {
  profile: {
    name: 'DZIKRY',
    kanjiName: 'D',
    title: 'Software Engineer & Web Developer',
    subtitle: 'Membangun aplikasi web dan sistem perangkat lunak modern berkinerja tinggi dengan arsitektur yang kokoh, bersih, dan terukur.',
    bio: [
      'Hello, Saya Muhammad Dzikry Fikry, seorang Software Engineer & Web Developer yang berfokus pada pengembangan sistem web full-stack, integrasi CMS modern, serta arsitektur backend yang rapi dan terukur.'
    ],
    quote: {
      text: 'Bahkan jika dunia ini terbalik, bumi tetap berputar pada porosnya.',
      translation: 'Bahkan jika dunia ini terbalik, bumi tetap berputar pada porosnya.',
      author: 'Orb: Gerakan Bumi'
    },
    coordinates: 'Depok, Indonesia (06°24\'LS 106°49\'BT)',
    avatarUrl: '/profile.png',
    resumeUrl: '#',
    phone: '+62 812-8838-9457',
    location: 'Depok, Jawa Barat, Indonesia',
    socialLinks: {
      github: 'https://github.com/DzikryFy',
      linkedin: 'https://www.linkedin.com/in/muhammad-dzikry-fikry',
      email: 'm.dzikryfikry@gmail.com',
      twitter: 'https://twitter.com'
    }
  },
  siteSettings: {
    title: 'Dzikry — Portofolio Software Engineer',
    description: 'Portofolio minimalis bertema Orb: Gerakan Bumi. Ditenagai oleh Next.js dan Sanity CMS.',
    astronomyQuote: 'Bahkan jika dunia ini terbalik, bumi tetap berputar pada porosnya.',
    email: 'm.dzikryfikry@gmail.com',
    location: 'Depok / Jarak Jauh (Remote), Indonesia',
    hankoText: 'BUMI'
  },
  projects: [
    {
      _id: 'proj-1',
      title: 'Portal Yayasan Asih Putera',
      japaneseTitle: 'NEXT.JS / PORTAL',
      slug: 'portal-yayasan-asih-putera',
      description: 'Portal web resmi dan pusat informasi digital Yayasan Asih Putera dengan arsitektur modern berlatensi rendah.',
      longDescription: 'Dibangun menggunakan Next.js App Router, React 19, TypeScript, dan Tailwind CSS. Menghadirkan antarmuka institusional yang responsif, navigasi cepat, dan integrasi modular untuk profil yayasan, unit pendidikan, dan informasi layanan publik.',
      coverImage: '/projects/yayasan-asih-putera-mockup.png',
      tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Axios', 'Lucide Icons'],
      demoUrl: 'https://asihputera.sch.id',
      repoUrl: 'https://github.com/Yayasan-Asih-Putera',
      featured: true,
      order: 1,
      epoch: 'Tahun 2024'
    },
    {
      _id: 'proj-2',
      title: 'Sistem Informasi Perpustakaan SMKN 1 Depok',
      japaneseTitle: 'PHP / WEB APP',
      slug: 'perpustakaan-smkn-1-depok',
      description: 'Aplikasi manajemen perpustakaan berbasis web untuk otomasi sirkulasi buku, katalog digital, dan administrasi SMKN 1 Depok.',
      longDescription: 'Sistem informasi perpustakaan digital terintegrasi yang mencakup otentikasi multi-user (siswa & admin), pencatatan sirkulasi peminjaman & pengembalian buku, formulir saran buku baru, serta laporan riwayat peminjaman siswa dengan basis data MySQL terstruktur.',
      coverImage: '/projects/perpustakaan-smkn-1-depok-mockup.png',
      tags: ['PHP', 'MySQL', 'JavaScript', 'CSS3', 'Web App', 'SQL'],
      demoUrl: 'https://github.com/DzikryFy/Perpustakaan-SMKN-1-DEPOK',
      repoUrl: 'https://github.com/DzikryFy/Perpustakaan-SMKN-1-DEPOK',
      featured: true,
      order: 2,
      epoch: 'Tahun 2024'
    },
    {
      _id: 'proj-3',
      title: 'Quality Control (QC) Web Silondo Bermula',
      japaneseTitle: 'WEB QA / QC',
      slug: 'qc-web-silondo-bermula',
      description: 'Pengujian kualitas menyeluruh (Quality Control) pada platform web Silondo Bermula untuk memastikan keandalan fungsional, performa alur pengguna, dan ketiadaan cacat sistem.',
      longDescription: 'Melakukan pengujian Quality Control (QC) dan pengujian perangkat lunak berbasis web untuk platform Silondo Bermula. Bertanggung jawab atas pengujian fungsionalitas menyeluruh (functional testing), verifikasi responsivitas tampilan antarmuka, validasi input data pengguna, serta pelaporan dan dokumentasi bug untuk memastikan sistem layak beroperasi secara stabil sebelum digunakan publik.',
      coverImage: '/projects/qc-silondo-bermula-mockup.png',
      tags: ['Web QC / QA', 'Functional Testing', 'UI/UX Validation', 'Bug Reporting', 'Cross-Browser Testing'],
      demoUrl: '',
      repoUrl: '',
      featured: true,
      order: 3,
      epoch: 'Tahun 2026'
    }
  ],
  experiences: [
    {
      _id: 'exp-1',
      role: 'Web Developer & QA Intern (PKL)',
      company: 'PT Ciptadra Softindo',
      location: 'Depok / Jakarta',
      period: 'Juli 2026 — Oktober 2026',
      isCurrent: false,
      description: 'Menjalani Praktik Kerja Lapangan (PKL) selama 4 bulan yang berfokus pada Quality Assurance (QA) web, modernisasi tampilan produk perusahaan (Onebox), dan pembangunan portal yayasan berbasis Next.js.',
      highlights: [
        'Membangun Portal Yayasan Asih Putera menggunakan Next.js yang diintegrasikan dengan headless CMS internal perusahaan melalui REST API.',
        'Melakukan pembaruan dan redesign antarmuka (UI/UX) web untuk salah satu produk digital utama PT Ciptadra Softindo, yaitu Onebox.',
        'Melakukan pengujian Quality Assurance (QA) web secara berkala untuk memastikan keandalan fungsi, responsivitas antarmuka, dan validitas alur kerja sistem.'
      ],
      skills: ['Next.js', 'React', 'REST API', 'Web QA & Testing', 'UI/UX Redesign', 'Onebox', 'Tailwind CSS'],
      order: 1
    },
    {
      _id: 'exp-2',
      role: 'Ketua Ekstrakurikuler & Pengurus Organisasi Penaung',
      company: 'SMKN 1 Depok',
      location: 'Depok, Jawa Barat',
      period: '2024 — 2025',
      isCurrent: false,
      description: 'Memimpin operasional ekstrakurikuler sekolah sekaligus aktif menjabat sebagai anggota dalam organisasi penaung ekstrakurikuler di SMKN 1 Depok.',
      highlights: [
        'Memimpin koordinasi tim, perencanaan program kerja, dan eksekusi berbagai kegiatan berkala ekstrakurikuler selama masa bakti.',
        'Menjembatani aspirasi dan komunikasi efektif antara anggota ekstrakurikuler dengan organisasi penaung serta pihak sekolah.',
        'Mengelola pembinaan kemampuan teknis/kreatif tim, regenerasi keanggotaan, dan evaluasi berkala kegiatan.'
      ],
      skills: [],
      order: 2
    },
    {
      _id: 'exp-3',
      role: 'Divisi Hubungan Masyarakat (Humas)',
      company: 'Karang Taruna',
      location: 'Depok, Jawa Barat',
      period: '2024 — 2025',
      isCurrent: false,
      description: 'Bertanggung jawab dalam pengelolaan komunikasi publik, publikasi informasi kegiatan kepemudaan, serta menjalin hubungan kemasyarakatan di lingkungan sekitar.',
      highlights: [
        'Menyusun dan mempublikasikan informasi agenda kepemudaan, sosial, dan kegiatan kemasyarakatan secara berkala dan terstruktur.',
        'Membangun relasi kemitraan aktif antara pemuda, pengurus lingkungan, dan tokoh masyarakat sekitar.',
        'Mendukung publikasi digital serta kelancaran koordinasi sosial pada berbagai acara kegiatan warga.'
      ],
      skills: [],
      order: 3
    }
  ],
  educations: [
    {
      _id: 'edu-1',
      institution: 'SMKN 1 DEPOK',
      degree: 'Sekolah Menengah Kejuruan (SMK)',
      field: 'PPLG (Pengembangan Perangkat Lunak)',
      period: '2024 — Sekarang',
      description: 'Fokus keahlian pada Pengembangan Perangkat Lunak dan Gim (PPLG), Pemrograman Web Modern (Next.js, TypeScript, PHP), Perancangan Basis Data Relasional, serta Rekayasa Perangkat Lunak.',
      highlights: [
        'Pengembangan sistem informasi perpustakaan berbasis web (PHP & MySQL).',
        'Pembangunan portal web institusional terintegrasi dan aplikasi kreatif.'
      ],
      order: 1
    }
  ],
  techStack: [
    // Frontend
    {
      name: 'TypeScript',
      category: 'core',
      categoryLabel: 'Frontend',
      level: 'Mahir',
      iconName: 'TypeScript',
      description: 'Bahasa utama untuk pengetikan statis, keandalan kode, dan skalabilitas proyek.'
    },
    {
      name: 'React',
      category: 'core',
      categoryLabel: 'Frontend',
      level: 'Mahir',
      iconName: 'React',
      description: 'Library antarmuka modular berbasis komponen reaktif dan Virtual DOM.'
    },
    {
      name: 'Next.js',
      category: 'core',
      categoryLabel: 'Frontend',
      level: 'Mahir',
      iconName: 'Next.js',
      description: 'Framework React modern untuk SSR, SSG, App Router, dan performa web optimal.'
    },
    {
      name: 'Tailwind CSS',
      category: 'core',
      categoryLabel: 'Frontend',
      level: 'Mahir',
      iconName: 'Tailwind CSS',
      description: 'Utilitas styling modern untuk antarmuka elegan, responsif, dan konsisten.'
    },
    {
      name: 'Bootstrap',
      category: 'core',
      categoryLabel: 'Frontend',
      level: 'Mahir',
      iconName: 'Bootstrap',
      description: 'Framework CSS responsif berbasis komponen dan sistem grid modern.'
    },
    {
      name: 'CSS3',
      category: 'core',
      categoryLabel: 'Frontend',
      level: 'Mahir',
      iconName: 'CSS3',
      description: 'Styling tata letak tingkat lanjut, animasi transisi halus, dan desain responsif fleksibel.'
    },
    {
      name: 'HTML5',
      category: 'core',
      categoryLabel: 'Frontend',
      level: 'Mahir',
      iconName: 'HTML5',
      description: 'Struktur semantik dokumen web modern yang aksesibel dan terstandarisasi.'
    },

    // Backend & Data
    {
      name: 'PHP',
      category: 'engine',
      categoryLabel: 'Backend & Data',
      level: 'Mahir',
      iconName: 'PHP',
      description: 'Bahasa pemrograman server-side yang andal untuk pengembangan aplikasi web dinamis.'
    },
    {
      name: 'Laravel',
      category: 'engine',
      categoryLabel: 'Backend & Data',
      level: 'Mahir',
      iconName: 'Laravel',
      description: 'Framework PHP modern dengan arsitektur MVC, routing elegan, dan ORM tangguh.'
    },
    {
      name: 'SQL',
      category: 'engine',
      categoryLabel: 'Backend & Data',
      level: 'Mahir',
      iconName: 'SQL',
      description: 'Pengelolaan basis data relasional MySQL dan PostgreSQL teroptimasi.'
    },
    {
      name: 'REST API',
      category: 'engine',
      categoryLabel: 'Backend & Data',
      level: 'Mahir',
      iconName: 'REST API',
      description: 'Perancangan arsitektur endpoint efisien, terdokumentasi, dan aman.'
    },

    // DevOps & Tools
    {
      name: 'Git & GitHub',
      category: 'navigation',
      categoryLabel: 'DevOps & Tools',
      level: 'Mahir',
      iconName: 'Git & GitHub',
      description: 'Manajemen versi kode, kolaborasi pull-request, dan branching strategy.'
    },
    {
      name: 'GitLab',
      category: 'navigation',
      categoryLabel: 'DevOps & Tools',
      level: 'Berpengalaman',
      iconName: 'GitLab',
      description: 'Platform DevOps terpadu untuk repositori kode, issue tracking, dan pipeline CI/CD.'
    },
    {
      name: 'Figma',
      category: 'navigation',
      categoryLabel: 'DevOps & Tools',
      level: 'Berpengalaman',
      iconName: 'Figma',
      description: 'Desain antarmuka UI/UX kolaboratif, prototyping interaktif, dan wireframing.'
    },
    {
      name: 'Linux',
      category: 'navigation',
      categoryLabel: 'DevOps & Tools',
      level: 'Berpengalaman',
      iconName: 'Linux',
      description: 'Sistem operasi server berbasis kernel Linux untuk manajemen lingkungan server dan deployment.'
    },
    {
      name: 'Docker',
      category: 'navigation',
      categoryLabel: 'DevOps & Tools',
      level: 'Berpengalaman',
      iconName: 'Docker',
      description: 'Standardisasi lingkungan kontainer aplikasi untuk deployment yang konsisten.'
    },
    {
      name: 'Postman',
      category: 'navigation',
      categoryLabel: 'DevOps & Tools',
      level: 'Mahir',
      iconName: 'Postman',
      description: 'Pengujian API otomatis, simulasi request endpoint, dan dokumentasi interaktif koleksi REST API.'
    },
    {
      name: 'Swagger',
      category: 'navigation',
      categoryLabel: 'DevOps & Tools',
      level: 'Mahir',
      iconName: 'Swagger',
      description: 'Spesifikasi OpenAPI dan antarmuka pengujian dokumentasi endpoint API terstandarisasi.'
    }
  ]
};
