import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

// Baca manual .env.local tanpa perlu paket dotenv
function loadEnvLocal() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const [key, ...vals] = trimmed.split('=');
      if (key && vals.length > 0) {
        const val = vals.join('=').replace(/^["']|["']$/g, '');
        if (!process.env[key.trim()]) {
          process.env[key.trim()] = val.trim();
        }
      }
    }
  }
}
loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  console.error('❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID belum diatur di .env.local');
  process.exit(1);
}

if (!token) {
  console.error('❌ Error: SANITY_API_TOKEN diperlukan untuk mengunggah data.');
  console.error('👉 Cara membuat token:');
  console.error('   1. Buka Sanity Dashboard: https://www.sanity.io/manage/project/' + projectId + '/api');
  console.error('   2. Di bagian "Tokens", klik "+ Add API token"');
  console.error('   3. Berikan izin "Editor" dan beri nama "Portfolio Seeder"');
  console.error('   4. Jalankan: $env:SANITY_API_TOKEN="token_anda"; node scripts/seed-sanity.mjs');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

async function seedData() {
  console.log(`🚀 Memulai migrasi data ke Sanity (${projectId} / ${dataset})...`);

  // 1. Profile
  const profileDoc = {
    _id: 'portfolio-profile-main',
    _type: 'profile',
    name: 'DZIKRY',
    kanjiName: 'D',
    title: 'Software Engineer & Web Developer',
    subtitle: 'Membangun aplikasi web dan sistem perangkat lunak modern berkinerja tinggi dengan arsitektur yang kokoh, bersih, dan terukur.',
    coordinates: "Depok, Indonesia (06°24'LS 106°49'BT)",
    bio: [
      'Hello, Saya Muhammad Dzikry Fikry, seorang Software Engineer & Web Developer yang berfokus pada pengembangan sistem web full-stack, integrasi CMS modern, serta arsitektur backend yang rapi dan terukur.'
    ],
    quote: {
      text: 'Bahkan jika dunia ini terbalik, bumi tetap berputar pada porosnya.',
      translation: 'Bahkan jika dunia ini terbalik, bumi tetap berputar pada porosnya.',
      author: 'Orb: Gerakan Bumi'
    },
    phone: '+62 812-8838-9457',
    location: 'Depok, Jawa Barat, Indonesia',
    socialLinks: {
      github: 'https://github.com/DzikryFy',
      linkedin: 'https://www.linkedin.com/in/muhammad-dzikry-fikry',
      email: 'm.dzikryfikry@gmail.com',
      twitter: 'https://twitter.com'
    }
  };

  await client.createOrReplace(profileDoc);
  console.log('✅ Profil & Bio berhasil disimpan.');

  // 2. Site Settings
  const siteSettingsDoc = {
    _id: 'portfolio-site-settings',
    _type: 'siteSettings',
    title: 'Dzikry — Portofolio Software Engineer',
    description: 'Portofolio minimalis bertema Orb: Gerakan Bumi. Ditenagai oleh Next.js dan Sanity CMS.',
    astronomyQuote: 'Bahkan jika dunia ini terbalik, bumi tetap berputar pada porosnya.',
    email: 'm.dzikryfikry@gmail.com',
    location: 'Depok / Jarak Jauh (Remote), Indonesia',
    hankoText: 'BUMI'
  };

  await client.createOrReplace(siteSettingsDoc);
  console.log('✅ Pengaturan Situs berhasil disimpan.');

  // 3. Projects
  // Hapus proyek lama terlebih dahulu jika ada
  try {
    await client.delete('proj-4');
  } catch (e) {}

  const projects = [
    {
      _id: 'proj-1',
      _type: 'project',
      title: 'Portal Yayasan Asih Putera',
      japaneseTitle: 'NEXT.JS / PORTAL',
      slug: { _type: 'slug', current: 'portal-yayasan-asih-putera' },
      description: 'Portal web resmi dan pusat informasi digital Yayasan Asih Putera dengan arsitektur modern berlatensi rendah.',
      longDescription: 'Dibangun menggunakan Next.js App Router, React 19, TypeScript, dan Tailwind CSS. Menghadirkan antarmuka institusional yang responsif, navigasi cepat, dan integrasi modular untuk profil yayasan, unit pendidikan, dan informasi layanan publik.',
      coverImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: 'image-cbcff22b89232dc8d94f3bf3b05fc01e3e7333af-1280x720-png',
        },
      },
      tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Axios', 'Lucide Icons'],
      demoUrl: 'https://asihputera.sch.id',
      repoUrl: 'https://github.com/Yayasan-Asih-Putera',
      featured: true,
      order: 1,
      epoch: 'Tahun 2024'
    },
    {
      _id: 'proj-2',
      _type: 'project',
      title: 'Sistem Informasi Perpustakaan SMKN 1 Depok',
      japaneseTitle: 'PHP / WEB APP',
      slug: { _type: 'slug', current: 'perpustakaan-smkn-1-depok' },
      description: 'Aplikasi manajemen perpustakaan berbasis web untuk otomasi sirkulasi buku, katalog digital, dan administrasi SMKN 1 Depok.',
      longDescription: 'Sistem informasi perpustakaan digital terintegrasi yang mencakup otentikasi multi-user (siswa & admin), pencatatan sirkulasi peminjaman & pengembalian buku, formulir saran buku baru, serta laporan riwayat peminjaman siswa dengan basis data MySQL terstruktur.',
      coverImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: 'image-50eb191ac9e02efd337fe2aa1ea8c5a329fde5b0-1280x720-png',
        },
      },
      tags: ['PHP', 'MySQL', 'JavaScript', 'CSS3', 'Web App', 'SQL'],
      demoUrl: 'https://github.com/DzikryFy/Perpustakaan-SMKN-1-DEPOK',
      repoUrl: 'https://github.com/DzikryFy/Perpustakaan-SMKN-1-DEPOK',
      featured: true,
      order: 2,
      epoch: 'Tahun 2024'
    },
    {
      _id: 'proj-3',
      _type: 'project',
      title: 'Quality Control (QC) Web Silondo Bermula',
      japaneseTitle: 'WEB QA / QC',
      slug: { _type: 'slug', current: 'qc-web-silondo-bermula' },
      description: 'Pengujian kualitas menyeluruh (Quality Control) pada platform web Silondo Bermula untuk memastikan keandalan fungsional, performa alur pengguna, dan ketiadaan cacat sistem.',
      longDescription: 'Melakukan pengujian Quality Control (QC) dan pengujian perangkat lunak berbasis web untuk platform Silondo Bermula. Bertanggung jawab atas pengujian fungsionalitas menyeluruh (functional testing), verifikasi responsivitas tampilan antarmuka, validasi input data pengguna, serta pelaporan dan dokumentasi bug untuk memastikan sistem layak beroperasi secara stabil sebelum digunakan publik.',
      coverImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: 'image-dcb832b7d5ba4630cab4c3bc8b6c044ba236d5dc-1280x720-png',
        },
      },
      tags: ['Web QC / QA', 'Functional Testing', 'UI/UX Validation', 'Bug Reporting', 'Cross-Browser Testing'],
      demoUrl: '',
      repoUrl: '',
      featured: true,
      order: 3,
      epoch: 'Tahun 2026'
    }
  ];

  for (const proj of projects) {
    await client.createOrReplace(proj);
  }
  console.log(`✅ ${projects.length} Proyek berhasil disimpan.`);

  // 4. Experiences
  const experiences = [
    {
      _id: 'exp-1',
      _type: 'experience',
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
      _type: 'experience',
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
      _type: 'experience',
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
  ];

  for (const exp of experiences) {
    await client.createOrReplace(exp);
  }
  console.log(`✅ ${experiences.length} Riwayat Pengalaman berhasil disimpan.`);

  // 5. Educations
  try {
    await client.delete('edu-2');
  } catch (e) {}

  const educations = [
    {
      _id: 'edu-1',
      _type: 'education',
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
  ];

  for (const edu of educations) {
    await client.createOrReplace(edu);
  }
  console.log(`✅ ${educations.length} Riwayat Pendidikan berhasil disimpan.`);

  // 6. Tech Stack
  // Bersihkan data techStack lama agar sinkron sempurna
  try {
    const oldTechs = await client.fetch('*[_type == "techStack"]._id');
    for (const id of oldTechs) {
      await client.delete(id);
    }
  } catch (e) {}

  const techStack = [
    // Frontend
    { _id: 'tech-1', _type: 'techStack', name: 'TypeScript', category: 'core', categoryLabel: 'Frontend', level: 'Mahir', iconName: 'Code2', description: 'Bahasa utama untuk pengetikan statis, keandalan kode, dan skalabilitas proyek.', order: 1 },
    { _id: 'tech-2', _type: 'techStack', name: 'React', category: 'core', categoryLabel: 'Frontend', level: 'Mahir', iconName: 'Globe', description: 'Library antarmuka modular berbasis komponen reaktif dan Virtual DOM.', order: 2 },
    { _id: 'tech-3', _type: 'techStack', name: 'Next.js', category: 'core', categoryLabel: 'Frontend', level: 'Mahir', iconName: 'Globe', description: 'Framework React modern untuk SSR, SSG, App Router, dan performa web optimal.', order: 3 },
    { _id: 'tech-4', _type: 'techStack', name: 'Tailwind CSS', category: 'core', categoryLabel: 'Frontend', level: 'Mahir', iconName: 'Palette', description: 'Utilitas styling modern untuk antarmuka elegan, responsif, dan konsisten.', order: 4 },
    { _id: 'tech-5', _type: 'techStack', name: 'Bootstrap', category: 'core', categoryLabel: 'Frontend', level: 'Mahir', iconName: 'Palette', description: 'Framework CSS responsif berbasis komponen dan sistem grid modern.', order: 5 },
    { _id: 'tech-6', _type: 'techStack', name: 'CSS3', category: 'core', categoryLabel: 'Frontend', level: 'Mahir', iconName: 'Palette', description: 'Styling tata letak tingkat lanjut, animasi transisi halus, dan desain responsif fleksibel.', order: 6 },
    { _id: 'tech-7', _type: 'techStack', name: 'HTML5', category: 'core', categoryLabel: 'Frontend', level: 'Mahir', iconName: 'Sparkles', description: 'Struktur semantik dokumen web modern yang aksesibel dan terstandarisasi.', order: 7 },

    // Backend & Data
    { _id: 'tech-8', _type: 'techStack', name: 'PHP', category: 'engine', categoryLabel: 'Backend & Data', level: 'Mahir', iconName: 'Server', description: 'Bahasa pemrograman server-side yang andal untuk pengembangan aplikasi web dinamis.', order: 8 },
    { _id: 'tech-9', _type: 'techStack', name: 'Laravel', category: 'engine', categoryLabel: 'Backend & Data', level: 'Mahir', iconName: 'Server', description: 'Framework PHP modern dengan arsitektur MVC, routing elegan, dan ORM tangguh.', order: 9 },
    { _id: 'tech-10', _type: 'techStack', name: 'SQL', category: 'engine', categoryLabel: 'Backend & Data', level: 'Mahir', iconName: 'Database', description: 'Pengelolaan basis data relasional MySQL dan PostgreSQL teroptimasi.', order: 10 },
    { _id: 'tech-11', _type: 'techStack', name: 'REST API', category: 'engine', categoryLabel: 'Backend & Data', level: 'Mahir', iconName: 'Cpu', description: 'Perancangan arsitektur endpoint efisien, terdokumentasi, dan aman.', order: 11 },

    // DevOps & Tools
    { _id: 'tech-12', _type: 'techStack', name: 'Git & GitHub', category: 'navigation', categoryLabel: 'DevOps & Tools', level: 'Mahir', iconName: 'GitBranch', description: 'Manajemen versi kode, kolaborasi pull-request, dan branching strategy.', order: 12 },
    { _id: 'tech-13', _type: 'techStack', name: 'GitLab', category: 'navigation', categoryLabel: 'DevOps & Tools', level: 'Berpengalaman', iconName: 'GitBranch', description: 'Platform DevOps terpadu untuk repositori kode, issue tracking, dan pipeline CI/CD.', order: 13 },
    { _id: 'tech-14', _type: 'techStack', name: 'Figma', category: 'navigation', categoryLabel: 'DevOps & Tools', level: 'Berpengalaman', iconName: 'Palette', description: 'Desain antarmuka UI/UX kolaboratif, prototyping interaktif, dan wireframing.', order: 14 },
    { _id: 'tech-15', _type: 'techStack', name: 'Linux', category: 'navigation', categoryLabel: 'DevOps & Tools', level: 'Berpengalaman', iconName: 'Server', description: 'Sistem operasi server berbasis kernel Linux untuk manajemen lingkungan server dan deployment.', order: 15 },
    { _id: 'tech-16', _type: 'techStack', name: 'Docker', category: 'navigation', categoryLabel: 'DevOps & Tools', level: 'Berpengalaman', iconName: 'Box', description: 'Standardisasi lingkungan kontainer aplikasi untuk deployment yang konsisten.', order: 16 },
    { _id: 'tech-17', _type: 'techStack', name: 'Postman', category: 'navigation', categoryLabel: 'DevOps & Tools', level: 'Mahir', iconName: 'Send', description: 'Pengujian API otomatis, simulasi request endpoint, dan dokumentasi interaktif koleksi REST API.', order: 17 },
    { _id: 'tech-18', _type: 'techStack', name: 'Swagger', category: 'navigation', categoryLabel: 'DevOps & Tools', level: 'Mahir', iconName: 'FileCode', description: 'Spesifikasi OpenAPI dan antarmuka pengujian dokumentasi endpoint API terstandarisasi.', order: 18 },
  ];

  for (const t of techStack) {
    await client.createOrReplace(t);
  }
  console.log(`✅ ${techStack.length} Item Tech Stack berhasil disimpan.`);

  console.log('\n🎉 SEMUA DATA BERHASIL DI-MIGRASI KE SANITY CLOUD!');
  console.log('Sekarang portofolio Anda sudah 100% didukung data Sanity CMS secara dinamis.');
}

seedData().catch((err) => {
  console.error('❌ Gagal mengunggah data ke Sanity:', err);
  process.exit(1);
});
