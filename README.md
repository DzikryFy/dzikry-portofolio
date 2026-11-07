# Dzikry — Chi: Celestial Portfolio & Manuscripts
### Bertema Anime: *Chi: Chikyū no Undō ni Tsuite* (チ。―地球の運動について―)

Web portofolio berkinerja tinggi dengan arsitektur **Next.js (App Router, TypeScript, Tailwind CSS, Framer Motion)** dan **Sanity Headless CMS terintegrasi (`/studio`)** yang dapat di-*deploy* dalam satu klik ke **Vercel**.

---

## 🌟 Konsep & Fitur Unggulan

1. **Desain Editorial Minimalis & Bebas "AI-Slop"**:
   - Menghindari gradasi neon murahan dan kekacauan visual.
   - Mengadopsi tata letak editorial resmi ala buku manuskrip astronomi abad ke-15 dan estetika grafis anime Jepang.
   - Palet warna kurasi: *Nocturnal Void* (`#08090E`), garis rambut kuningan astronomi (*Celestial Brass* `#C5A059`), aksen stempel merah heresi (*Heresy Seal* `#A62B2B`), dan teks perkamen kuno (*Aged Parchment* `#EDE7D8`).

2. **Animasi Berkarakter Anime**:
   - **Diagram Heliosentris Interaktif (`HeliocentricDiagram.tsx`)**: Lingkaran orbit matahari dan planet-planet dengan garis presisi 1px yang merespons kursor dan rotasi spring physics.
   - **Kartu Babak Anime (`AnimeTitleCard.tsx`)**: Penanda babak terinspirasi episode title card anime:
     - `第壹章: 観測者` (Act I: The Observer — Profil & Filosofi)
     - `第弐章: 記録` (Act II: Great Manuscripts — Proyek & Sistem)
     - `第参章: 軌道` (Act III: Chronology of Orbits — Pengalaman Kerja & Edukasi)
     - `第四章: 器具` (Act IV: Instruments of Truth — Tech Stack & Tooling)
     - `第五章: 書簡` (Act V: The Sealed Epistle — Kontak & Transmisi Pesan)

3. **Sanity Studio Terintegrasi (`/studio`)**:
   - Anda dapat mengelola seluruh isi portofolio (Profil, Proyek, Pengalaman, Pendidikan, Tech Stack, Pengaturan Situs) langsung dari browser di URL `/studio`.
   - **Fallback Resilient**: Jika Sanity belum dihubungkan, website otomatis menggunakan data bawaan berkualitas tinggi milik Dzikry tanpa crash.

4. **Kesiapan Deploy Vercel (Zero-Config)**:
   - Dikonfigurasi dengan App Router dan ISR (Incremental Static Regeneration) untuk pemuatan halaman super cepat (< 1 detik).

---

## 🚀 Panduan Memulai Cepat

### 1. Menjalankan Server Pengembangan Lokal
```bash
npm run dev
```
Buka browser di [http://localhost:3000](http://localhost:3000).

### 2. Membuka Sanity CMS Studio
Buka browser di [http://localhost:3000/studio](http://localhost:3000/studio).

---

## ⚙️ Menghubungkan ke Sanity CMS Pribadi

1. Buat akun gratis di [sanity.io](https://www.sanity.io).
2. Buat project baru dan pilih dataset `production`.
3. Buka file `.env.local` dan masukkan kredensial:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID="project_id_anda"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"
```
4. Tambahkan `http://localhost:3000` dan domain Vercel Anda ke **CORS Origins** di menu *API Settings* di Dashboard Sanity.

---

## 🌐 Deploy ke Vercel

1. Push repository ini ke GitHub / GitLab.
2. Buka [Vercel](https://vercel.com) dan impor repository.
3. Masukkan Environment Variables (`NEXT_PUBLIC_SANITY_PROJECT_ID`, dll).
4. Klik **Deploy**!
