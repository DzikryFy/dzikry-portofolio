'use client';

import React, { useEffect, useRef, useState } from 'react';

interface MilkyWayGalaxyProps {
  mode?: 'fullscreen' | 'embedded';
  className?: string;
  focusEarth?: boolean;
  showHUD?: boolean;
  contentTargetId?: string;
}

export const MilkyWayGalaxy: React.FC<MilkyWayGalaxyProps> = ({
  mode = 'fullscreen',
  className = '',
  focusEarth = true,
  showHUD = true,
  contentTargetId = 'main-content',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const triggerWarpRef = useRef<() => void>(() => {});
  const [telemetry, setTelemetry] = useState({
    orbitDeg: 0,
    earthSpinDeg: 0,
    season: 'Ekuinoks Maret',
    distanceAU: '1.000 AU',
    isScrolling: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isDestroyed = false;

    // Viewport sizing
    let width = mode === 'fullscreen' ? window.innerWidth : (canvas.parentElement?.clientWidth || window.innerWidth);
    let height = mode === 'fullscreen' ? window.innerHeight : (canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = mode === 'fullscreen' ? window.innerWidth : canvas.parentElement.clientWidth;
      height = mode === 'fullscreen' ? window.innerHeight : canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    window.addEventListener('resize', handleResize);

    // ==========================================
    // 1. GENERATE MILKY WAY GALAXY PARTICLES
    // ==========================================
    const STAR_COUNT = mode === 'fullscreen' ? 1200 : 700;
    interface Star {
      x: number;
      y: number;
      z: number;
      baseX: number;
      baseY: number;
      armAngle: number;
      distFromCore: number;
      size: number;
      color: string;
      lightColor: string;
      alpha: number;
      twinkleSpeed: number;
      twinklePhase: number;
    }

    const stars: Star[] = [];
    const ARMS = 4;
    const GALAXY_RADIUS = Math.max(width, height) * 0.75;
    const STAR_COLORS = [
      '#EDE7D8', // Parchment white
      '#C5A059', // Brass gold
      '#E6CA7E', // Brass light
      '#7DD3FC', // Sky cyan
      '#F472B6', // Nebula pink
      '#FFFFFF', // Pure white
    ];
    const STAR_COLORS_LIGHT = [
      '#0284C7', // Chi Manga Celestial Azure Blue
      '#0EA5E9', // Sky Cyan Blue
      '#0369A1', // Deep Cerulean Blue
      '#38BDF8', // Electric Cyan
      '#0F172A', // Slate Navy Ink
      '#2563EB', // Royal Azure
    ];

    for (let i = 0; i < STAR_COUNT; i++) {
      const arm = i % ARMS;
      const armOffset = (arm * (Math.PI * 2)) / ARMS;
      // Exponential spiral distribution
      const dist = Math.pow(Math.random(), 1.6) * GALAXY_RADIUS;
      const spiralSpread = (Math.random() - 0.5) * 0.45;
      const theta = dist * 0.0035 + armOffset + spiralSpread;

      const baseX = Math.cos(theta) * dist;
      const baseY = Math.sin(theta) * dist * 0.52; // Elliptical perspective tilt

      stars.push({
        x: baseX,
        y: baseY,
        z: (Math.random() - 0.5) * 60,
        baseX,
        baseY,
        armAngle: theta,
        distFromCore: dist,
        size: Math.random() * 1.8 + 0.4,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        lightColor: STAR_COLORS_LIGHT[Math.floor(Math.random() * STAR_COLORS_LIGHT.length)],
        alpha: Math.random() * 0.75 + 0.25,
        twinkleSpeed: Math.random() * 0.04 + 0.015,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    // ==========================================
    // 2. ORBIT & ALL PLANETS AXIAL ROTATION STATE
    // ==========================================
    // Sudut rotasi poros masing-masing planet (berputar terus menerus pada porosnya)
    let mercurySpinAngle = 0;
    let venusSpinAngle = 0;
    let earthSpinAngle = 0;
    let marsSpinAngle = 0;
    let jupiterSpinAngle = 0;
    let saturnSpinAngle = 0;
    let uranusSpinAngle = 0;
    let neptuneSpinAngle = 0;

    // Pergerakan revolusi orbit planet mengitari Matahari (mengorbit saat discroll / bergerak)
    let currentOrbitAngle = 0;
    let targetOrbitAngle = 0;
    let lastScrollY = window.scrollY;
    let scrollTimeout: NodeJS.Timeout | null = null;
    let isCurrentlyScrolling = false;

    const onScroll = () => {
      isCurrentlyScrolling = true;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isCurrentlyScrolling = false;
      }, 150);

      // Cari elemen target utama <main> (area konten sebelum footer)
      const targetEl = contentTargetId
        ? document.getElementById(contentTargetId)
        : document.querySelector('main');

      if (targetEl) {
        // Hitung scroll progress khusus area <main> sebelum footer masuk
        const mainTop = targetEl.offsetTop;
        const mainHeight = targetEl.offsetHeight;
        // Jarak scroll maksimum: saat batas bawah <main> menyentuh batas bawah viewport (sebelum footer masuk)
        const maxScroll = Math.max(mainTop + mainHeight - window.innerHeight, 1);
        const currentScroll = Math.max(0, window.scrollY - mainTop);
        // Normalisasi: 0 saat paling atas, 1 (100%) tepat saat akhir <main> tercapai sebelum footer masuk
        const scrollRatio = Math.min(Math.max(currentScroll / maxScroll, 0), 1);

        // Putaran orbit Bumi selesai secara proporsional tepat saat konten utama selesai dibaca
        targetOrbitAngle = scrollRatio * Math.PI * 4;
      } else {
        const maxScroll = Math.max(
          document.documentElement.scrollHeight - window.innerHeight,
          1
        );
        const scrollRatio = window.scrollY / maxScroll;
        targetOrbitAngle = scrollRatio * Math.PI * 3;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Initialize with current scroll
    onScroll();
    isCurrentlyScrolling = false;

    // ==========================================
    // 2B. INTERACTIVE MOUSE PARALLAX & STARDUST
    // ==========================================
    let mouseX = -1000;
    let mouseY = -1000;
    let targetParallaxX = 0;
    let targetParallaxY = 0;
    let currentParallaxX = 0;
    let currentParallaxY = 0;
    let isMouseOver = false;

    interface Stardust {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
      life: number;
      maxLife: number;
    }
    const stardustPool: Stardust[] = [];

    interface Shockwave {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
    }
    const shockwaves: Shockwave[] = [];

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseOver = true;
      const nx = (e.clientX / width - 0.5) * 2;
      const ny = (e.clientY / height - 0.5) * 2;
      targetParallaxX = nx * 30;
      targetParallaxY = ny * 20;

      // Spawn subtle stardust comet trail
      if (Math.random() < 0.45) {
        stardustPool.push({
          x: mouseX + (Math.random() - 0.5) * 8,
          y: mouseY + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2 - 0.3,
          size: Math.random() * 2 + 1,
          alpha: 0.8,
          color: Math.random() > 0.4 ? '#E6CA7E' : '#7DD3FC',
          life: 0,
          maxLife: 35 + Math.random() * 25,
        });
        if (stardustPool.length > 70) stardustPool.shift();
      }
    };

    const onClick = (e: MouseEvent) => {
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 6,
        maxRadius: 110 + Math.random() * 40,
        alpha: 0.75,
      });

      for (let i = 0; i < 16; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        stardustPool.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2.5 + 1,
          alpha: 1,
          color: i % 2 === 0 ? '#E6CA7E' : '#7DD3FC',
          life: 0,
          maxLife: 45 + Math.random() * 30,
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('click', onClick, { passive: true });

    // Interactive Warp Speed Revolution Trigger
    triggerWarpRef.current = () => {
      targetOrbitAngle += Math.PI * 2;
      isCurrentlyScrolling = true;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isCurrentlyScrolling = false;
      }, 1200);

      const burstCenterX = width * 0.5 + currentParallaxX;
      const burstCenterY = height * 0.5 + currentParallaxY;

      shockwaves.push({
        x: burstCenterX,
        y: burstCenterY,
        radius: 10,
        maxRadius: 280,
        alpha: 0.9,
      });

      for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        stardustPool.push({
          x: burstCenterX,
          y: burstCenterY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3 + 1,
          alpha: 1,
          color: i % 3 === 0 ? '#FFFFFF' : i % 3 === 1 ? '#E6CA7E' : '#7DD3FC',
          life: 0,
          maxLife: 60 + Math.random() * 30,
        });
      }
    };

    // Continents procedural seed for Earth's surface
    const continentPatches = [
      { lon: 0.2, lat: 0.15, r: 0.38 },    // Eurasia
      { lon: 0.6, lat: -0.1, r: 0.28 },   // Africa
      { lon: 1.1, lat: -0.25, r: 0.2 },   // Australia & Indonesia
      { lon: 2.1, lat: 0.3, r: 0.35 },    // North America
      { lon: 2.4, lat: -0.2, r: 0.3 },    // South America
      { lon: 0.0, lat: 0.85, r: 0.22 },   // Arctic
      { lon: 0.0, lat: -0.85, r: 0.25 },  // Antarctica
    ];

    let lastTime = performance.now();
    let lastTelemetryUpdate = 0;
    let galaxyRotation = 0;

    // ==========================================
    // 3. MAIN ANIMATION LOOP
    // ==========================================
    const render = (now: number) => {
      if (isDestroyed) return;
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Semua planet berotasi pada porosnya pada 60fps dengan kecepatan sudut proporsional
      // "jika diam planet berotasi"
      mercurySpinAngle += dt * 0.9;
      venusSpinAngle -= dt * 0.7; // Venus berotasi retrograde (searah jarum jam)
      earthSpinAngle += dt * 1.8;
      marsSpinAngle += dt * 1.7;
      jupiterSpinAngle += dt * 2.6; // Yupiter rotasi tercepat di tata surya
      saturnSpinAngle += dt * 2.3;
      uranusSpinAngle -= dt * 1.6; // Uranus rotasi retrograde
      neptuneSpinAngle += dt * 1.9;
      galaxyRotation += dt * 0.015; // Slow majestic galaxy swirl

      // Lerp sudut orbit planet (bergerak mengorbit saat halaman di-scroll)
      // "jika sudah bergerak menjadi planet mengorbit"
      currentOrbitAngle += (targetOrbitAngle - currentOrbitAngle) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Update interactive 3D camera parallax
      currentParallaxX += (targetParallaxX - currentParallaxX) * 0.05;
      currentParallaxY += (targetParallaxY - currentParallaxY) * 0.05;

      // Deteksi tema aktif secara instan (Light vs Dark)
      const isLight = typeof document !== 'undefined' && document.documentElement.classList.contains('light');

      // Center coordinates (Tata Surya & Galaksi tepat di tengah layar)
      const centerX = width * 0.5 + currentParallaxX;
      const centerY = height * 0.5 + currentParallaxY;

      // ------------------------------------------
      // A. GALACTIC CORE & NEBULA BACKGROUND GLOW
      // ------------------------------------------
      const coreGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        GALAXY_RADIUS * 0.7
      );
      if (isLight) {
        // Mode Putih Chi: kabut biru langit & nebula azure cerulean
        coreGrad.addColorStop(0, 'rgba(2, 132, 199, 0.12)');
        coreGrad.addColorStop(0.3, 'rgba(14, 165, 233, 0.05)');
        coreGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      } else {
        // Mode Kosmik: hangat brass, debu cyan, kabut nebula ungu
        coreGrad.addColorStop(0, 'rgba(197, 160, 89, 0.16)');
        coreGrad.addColorStop(0.25, 'rgba(125, 211, 252, 0.08)');
        coreGrad.addColorStop(0.55, 'rgba(76, 29, 149, 0.05)');
        coreGrad.addColorStop(1, 'rgba(4, 5, 8, 0)');
      }
      ctx.fillStyle = coreGrad;
      ctx.fillRect(0, 0, width, height);

      // ------------------------------------------
      // B. DRAW MILKY WAY SPIRAL STARS
      // ------------------------------------------
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(galaxyRotation);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.twinklePhase += s.twinkleSpeed;
        const currentAlpha =
          s.alpha * (0.6 + 0.4 * Math.sin(s.twinklePhase));

        ctx.beginPath();
        ctx.arc(s.baseX, s.baseY, s.size, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? s.lightColor : s.color;
        ctx.globalAlpha = Math.max(0.05, Math.min(currentAlpha, 0.95));
        ctx.fill();
      }
      ctx.restore();
      ctx.globalAlpha = 1;

      // ------------------------------------------
      // C. THE SOLAR SYSTEM ORBITS & PLANETS (TATA SURYA)
      // ------------------------------------------
      const isFullscreen = mode === 'fullscreen';
      const baseRx = isFullscreen ? Math.min(width * 0.30, 270) : width * 0.30;
      const baseRy = baseRx * 0.48; // Perspective inclination

      ctx.save();
      ctx.translate(centerX, centerY);

      interface PlanetDef {
        name: string;
        sunDistAU: number;
        distRatio: number;
        radius: number;
        speedRatio: number;
        initialAngle: number;
        lightTextColor: string;
        darkTextColor: string;
      }

      // Definisi planet dengan ukuran proporsional & posisi awal terdistribusi acak di 4 penjuru (Kiri, Kanan, Atas, Bawah)
      // Uranus tetap di kanan atas (5.60) sesuai permintaan user, dan Neptunus dipindahkan dari ujung ke kiri bawah
      const otherPlanets: PlanetDef[] = [
        {
          name: 'MERKURIUS',
          sunDistAU: 0.39,
          distRatio: 0.42,
          radius: isFullscreen ? 6.5 : 5,
          speedRatio: 2.6,
          initialAngle: 3.25, // Kiri matahari
          lightTextColor: '#334155',
          darkTextColor: '#CBD5E1',
        },
        {
          name: 'VENUS',
          sunDistAU: 0.72,
          distRatio: 0.72,
          radius: isFullscreen ? 15 : 11,
          speedRatio: 1.45,
          initialAngle: 4.80, // Atas matahari
          lightTextColor: '#B45309',
          darkTextColor: '#FEF08A',
        },
        {
          name: 'MARS',
          sunDistAU: 1.52,
          distRatio: 1.25,
          radius: isFullscreen ? 9.5 : 7,
          speedRatio: 0.62,
          initialAngle: 5.25, // Kanan atas
          lightTextColor: '#B91C1C',
          darkTextColor: '#FCA5A5',
        },
        {
          name: 'YUPITER',
          sunDistAU: 5.20,
          distRatio: 1.55,
          radius: isFullscreen ? 30 : 21,
          speedRatio: 0.28,
          initialAngle: 1.60, // Bawah tengah
          lightTextColor: '#92400E',
          darkTextColor: '#FED7AA',
        },
        {
          name: 'SATURNUS',
          sunDistAU: 9.58,
          distRatio: 1.90,
          radius: isFullscreen ? 23 : 16,
          speedRatio: 0.16,
          initialAngle: 0.85, // Kanan bawah
          lightTextColor: '#A16207',
          darkTextColor: '#FDE68A',
        },
        {
          name: 'URANUS',
          sunDistAU: 19.2,
          distRatio: 2.25,
          radius: isFullscreen ? 14 : 10,
          speedRatio: 0.10,
          initialAngle: 5.60, // Kanan atas (TETAP)
          lightTextColor: '#0E7490',
          darkTextColor: '#A5F3FC',
        },
        {
          name: 'NEPTUNUS',
          sunDistAU: 30.1,
          distRatio: 2.35, // Dirapatkan agar proporsional dan tidak di ujung tepi layar
          radius: isFullscreen ? 13.5 : 9.5,
          speedRatio: 0.07,
          initialAngle: 4.35, // Langit atas-kiri terbuka (tampil utuh, elegan, dan tidak di ujung layar)
          lightTextColor: '#1D4ED8',
          darkTextColor: '#93C5FD',
        },
      ];

      // Gambar Garis Orbit Tipis Elegan untuk Semua Planet Lain
      otherPlanets.forEach((p) => {
        const prx = baseRx * p.distRatio;
        const pry = baseRy * p.distRatio;
        ctx.beginPath();
        ctx.ellipse(0, 0, prx, pry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = isLight ? 'rgba(2, 132, 199, 0.15)' : 'rgba(197, 160, 89, 0.13)';
        ctx.lineWidth = 0.75;
        ctx.setLineDash([3, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Garis Orbit Utama Bumi (Dengan Penanda Musim Kardinal)
      ctx.beginPath();
      ctx.ellipse(0, 0, baseRx, baseRy, 0, 0, Math.PI * 2);
      ctx.strokeStyle = isLight ? 'rgba(2, 132, 199, 0.38)' : 'rgba(197, 160, 89, 0.25)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Seasonal Cardinal Markers on Orbit
      const markers = [
        { angle: 0, label: 'TITIK BALIK (DES)' },
        { angle: Math.PI * 0.5, label: 'EKUINOKS (MAR)' },
        { angle: Math.PI, label: 'TITIK BALIK (JUN)' },
        { angle: Math.PI * 1.5, label: 'EKUINOKS (SEP)' },
      ];

      ctx.font = '8px "Cinzel", serif';
      ctx.fillStyle = isLight ? 'rgba(2, 132, 199, 0.85)' : 'rgba(197, 160, 89, 0.45)';
      ctx.textAlign = 'center';
      for (const m of markers) {
        const mx = Math.cos(m.angle) * baseRx;
        const my = Math.sin(m.angle) * baseRy;
        ctx.beginPath();
        ctx.arc(mx, my, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillText(m.label, mx, my + (my > 0 ? 12 : -8));
      }

      // ------------------------------------------
      // D. THE SUN (MATAHARI)
      // ------------------------------------------
      const sunPulse = 1 + Math.sin(now * 0.003) * 0.08;
      const sunRadius = (isFullscreen ? 34 : 24) * sunPulse;

      // Outer Corona Glow
      const corona = ctx.createRadialGradient(0, 0, 0, 0, 0, sunRadius * 3.5);
      corona.addColorStop(0, 'rgba(255, 235, 150, 0.9)');
      corona.addColorStop(0.25, 'rgba(245, 158, 11, 0.55)');
      corona.addColorStop(0.65, 'rgba(217, 119, 6, 0.15)');
      corona.addColorStop(1, 'rgba(180, 83, 9, 0)');
      ctx.fillStyle = corona;
      ctx.beginPath();
      ctx.arc(0, 0, sunRadius * 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Sun Core
      const sunCore = ctx.createRadialGradient(0, 0, 0, 0, 0, sunRadius);
      sunCore.addColorStop(0, '#FFFFFF');
      sunCore.addColorStop(0.4, '#FEF08A');
      sunCore.addColorStop(0.8, '#F59E0B');
      sunCore.addColorStop(1, '#D97706');
      ctx.fillStyle = sunCore;
      ctx.beginPath();
      ctx.arc(0, 0, sunRadius, 0, Math.PI * 2);
      ctx.fill();

      // Solar Rays Flare
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
      ctx.lineWidth = 1;
      for (let a = 0; a < 8; a++) {
        const rayAngle = a * (Math.PI / 4) + now * 0.0005;
        const x1 = Math.cos(rayAngle) * (sunRadius + 2);
        const y1 = Math.sin(rayAngle) * (sunRadius + 2);
        const x2 = Math.cos(rayAngle) * (sunRadius + 14 * sunPulse);
        const y2 = Math.sin(rayAngle) * (sunRadius + 14 * sunPulse);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Sun Label & Jarak dari Bumi (1.00 AU)
      ctx.font = 'bold 10px "Cinzel", serif';
      ctx.fillStyle = isLight ? '#B45309' : '#FDE68A';
      ctx.textAlign = 'center';
      ctx.fillText('MATAHARI', 0, sunRadius + 18);

      ctx.font = '8px "Cinzel", serif';
      ctx.fillStyle = isLight ? 'rgba(120, 53, 15, 0.85)' : 'rgba(230, 202, 126, 0.75)';
      ctx.fillText('1.00 AU DARI BUMI', 0, sunRadius + 29);

      // ------------------------------------------
      // E. PLANET-PLANET LAIN DALAM TATA SURYA
      // ------------------------------------------
      // Koordinat heliosentris Bumi dalam satuan AU (acuan jarak)
      const earthAU_X = Math.cos(currentOrbitAngle);
      const earthAU_Y = Math.sin(currentOrbitAngle);

      otherPlanets.forEach((p) => {
        // Orbit planet bergerak mengitari matahari sesuai progres scroll / gerakan
        const angle = p.initialAngle + currentOrbitAngle * p.speedRatio;
        const px = Math.cos(angle) * (baseRx * p.distRatio);
        const py = Math.sin(angle) * (baseRy * p.distRatio);
        const sunAngle = Math.atan2(-py, -px);

        // Hitung jarak real-time dari Bumi ke planet ini dalam satuan AU (Astronomical Units)
        const planetAU_X = Math.cos(angle) * p.sunDistAU;
        const planetAU_Y = Math.sin(angle) * p.sunDistAU;
        const distFromEarthAU = Math.hypot(planetAU_X - earthAU_X, planetAU_Y - earthAU_Y);
        const distText = `${distFromEarthAU.toFixed(2)} AU DARI BUMI`;

        ctx.save();
        ctx.translate(px, py);

        if (p.name === 'MERKURIUS') {
          // Merkurius: Planet berbatu abu-abu berkawah yang berotasi pada porosnya
          ctx.save();
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.clip();

          const g = ctx.createRadialGradient(-p.radius * 0.2, -p.radius * 0.2, 0, 0, 0, p.radius);
          g.addColorStop(0, '#CBD5E1');
          g.addColorStop(0.6, '#64748B');
          g.addColorStop(1, '#334155');
          ctx.fillStyle = g;
          ctx.fillRect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);

          // Kawah-kawah permukaan berotasi mengitari poros Merkurius
          ctx.fillStyle = 'rgba(15, 23, 42, 0.55)';
          const mercuryCraters = [
            { lon: 0.3, lat: -0.15, r: 0.25 },
            { lon: 1.8, lat: 0.2, r: 0.2 },
            { lon: 3.4, lat: -0.25, r: 0.22 },
            { lon: 4.9, lat: 0.1, r: 0.24 },
          ];
          mercuryCraters.forEach((c) => {
            const lon = (c.lon + mercurySpinAngle) % (Math.PI * 2);
            const depth = Math.cos(lon);
            if (depth > -0.1) {
              const cx = Math.sin(lon) * (p.radius * 0.85);
              const cy = c.lat * (p.radius * 0.85);
              ctx.beginPath();
              ctx.arc(cx, cy, c.r * p.radius * Math.max(0.25, depth), 0, Math.PI * 2);
              ctx.fill();
            }
          });

          // Terminator bayangan matahari
          const shad = ctx.createRadialGradient(
            Math.cos(sunAngle) * (p.radius * 0.3),
            Math.sin(sunAngle) * (p.radius * 0.3),
            p.radius * 0.1,
            0,
            0,
            p.radius * 1.05
          );
          shad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          shad.addColorStop(0.6, isLight ? 'rgba(15, 23, 42, 0.25)' : 'rgba(2, 6, 23, 0.4)');
          shad.addColorStop(1, isLight ? 'rgba(15, 23, 42, 0.65)' : 'rgba(2, 6, 23, 0.95)');
          ctx.fillStyle = shad;
          ctx.fillRect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);
          ctx.restore();

          // Highlight tepi
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(226, 232, 240, 0.4)';
          ctx.lineWidth = 0.75;
          ctx.stroke();
        } else if (p.name === 'VENUS') {
          // Venus: Atmosfer tebal belerang keemasan yang berotasi retrograde
          const halo = ctx.createRadialGradient(0, 0, p.radius * 0.8, 0, 0, p.radius * 1.5);
          halo.addColorStop(0, 'rgba(245, 158, 11, 0.3)');
          halo.addColorStop(1, 'rgba(245, 158, 11, 0)');
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(0, 0, p.radius * 1.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.save();
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.clip();

          const vg = ctx.createLinearGradient(-p.radius, -p.radius, p.radius, p.radius);
          vg.addColorStop(0, '#FEF08A');
          vg.addColorStop(0.5, '#F59E0B');
          vg.addColorStop(1, '#B45309');
          ctx.fillStyle = vg;
          ctx.fillRect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);

          // Pusaran awan atmosfer berotasi
          const venusBands = [
            { lon: 0.4, lat: -0.35, w: 0.85, h: 0.22, alpha: 0.28 },
            { lon: 2.1, lat: -0.05, w: 1.0, h: 0.25, alpha: 0.32 },
            { lon: 3.8, lat: 0.25, w: 0.8, h: 0.22, alpha: 0.26 },
            { lon: 5.2, lat: 0.5, w: 0.7, h: 0.18, alpha: 0.22 },
          ];
          venusBands.forEach((b) => {
            const lon = (b.lon + venusSpinAngle) % (Math.PI * 2);
            const depth = Math.cos(lon);
            if (depth > -0.2) {
              const cx = Math.sin(lon) * (p.radius * 0.9);
              const cy = b.lat * (p.radius * 0.9);
              const rx = p.radius * b.w * Math.max(0.2, depth);
              const ry = p.radius * b.h;
              ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha * Math.max(0.3, depth)})`;
              ctx.beginPath();
              ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
              ctx.fill();
            }
          });

          // Terminator bayangan matahari
          const shad = ctx.createRadialGradient(
            Math.cos(sunAngle) * (p.radius * 0.3),
            Math.sin(sunAngle) * (p.radius * 0.3),
            p.radius * 0.1,
            0,
            0,
            p.radius * 1.05
          );
          shad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          shad.addColorStop(0.6, isLight ? 'rgba(60, 40, 10, 0.22)' : 'rgba(30, 20, 5, 0.35)');
          shad.addColorStop(1, isLight ? 'rgba(30, 15, 5, 0.6)' : 'rgba(10, 5, 2, 0.95)');
          ctx.fillStyle = shad;
          ctx.fillRect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);
          ctx.restore();

          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(254, 240, 138, 0.55)';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        } else if (p.name === 'MARS') {
          // Mars: Planet Merah berkarat dengan es kutub putih & daratan berotasi
          const mHalo = ctx.createRadialGradient(0, 0, p.radius * 0.7, 0, 0, p.radius * 1.4);
          mHalo.addColorStop(0, 'rgba(239, 68, 68, 0.25)');
          mHalo.addColorStop(1, 'rgba(239, 68, 68, 0)');
          ctx.fillStyle = mHalo;
          ctx.beginPath();
          ctx.arc(0, 0, p.radius * 1.4, 0, Math.PI * 2);
          ctx.fill();

          ctx.save();
          const MARS_TILT = (-25 * Math.PI) / 180;
          ctx.rotate(MARS_TILT);

          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.clip();

          const mg = ctx.createRadialGradient(-p.radius * 0.2, -p.radius * 0.2, 0, 0, 0, p.radius);
          mg.addColorStop(0, '#F87171');
          mg.addColorStop(0.5, '#DC2626');
          mg.addColorStop(1, '#7F1D1D');
          ctx.fillStyle = mg;
          ctx.fillRect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);

          // Daratan vulkanik gelap (Syrtis Major dll) berotasi
          ctx.fillStyle = 'rgba(80, 15, 15, 0.65)';
          const marsPatches = [
            { lon: 0.5, lat: 0.1, r: 0.35 },
            { lon: 1.9, lat: -0.25, r: 0.38 },
            { lon: 3.3, lat: 0.2, r: 0.32 },
            { lon: 4.8, lat: -0.15, r: 0.36 },
          ];
          marsPatches.forEach((m) => {
            const lon = (m.lon + marsSpinAngle) % (Math.PI * 2);
            const depth = Math.cos(lon);
            if (depth > -0.15) {
              const cx = Math.sin(lon) * (p.radius * 0.85);
              const cy = m.lat * (p.radius * 0.85);
              ctx.beginPath();
              ctx.ellipse(cx, cy, m.r * p.radius * Math.max(0.25, depth), m.r * p.radius * 0.75, 0, 0, Math.PI * 2);
              ctx.fill();
            }
          });

          // Lapisan es kutub utara
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.ellipse(0, -p.radius * 0.82, p.radius * 0.42, p.radius * 0.2, 0, 0, Math.PI * 2);
          ctx.fill();

          // Terminator bayangan matahari
          const sunAngleRel = sunAngle - MARS_TILT;
          const shad = ctx.createRadialGradient(
            Math.cos(sunAngleRel) * (p.radius * 0.3),
            Math.sin(sunAngleRel) * (p.radius * 0.3),
            p.radius * 0.1,
            0,
            0,
            p.radius * 1.05
          );
          shad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          shad.addColorStop(0.6, isLight ? 'rgba(40, 10, 10, 0.25)' : 'rgba(20, 5, 5, 0.4)');
          shad.addColorStop(1, isLight ? 'rgba(25, 5, 5, 0.65)' : 'rgba(10, 2, 2, 0.95)');
          ctx.fillStyle = shad;
          ctx.fillRect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);
          ctx.restore();

          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(254, 202, 202, 0.5)';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        } else if (p.name === 'YUPITER') {
          // Yupiter: Raksasa gas terbesar dengan pita atmosfer dan Bintik Merah Raksasa berotasi
          const jHalo = ctx.createRadialGradient(0, 0, p.radius * 0.8, 0, 0, p.radius * 1.35);
          jHalo.addColorStop(0, 'rgba(245, 158, 11, 0.15)');
          jHalo.addColorStop(1, 'rgba(245, 158, 11, 0)');
          ctx.fillStyle = jHalo;
          ctx.beginPath();
          ctx.arc(0, 0, p.radius * 1.35, 0, Math.PI * 2);
          ctx.fill();

          ctx.save();
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.clip();

          // Dasar krem hangat
          ctx.fillStyle = '#FEF3C7';
          ctx.fillRect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);

          // Pita-pita atmosfer gas raksasa
          const bands = [
            { y: -p.radius * 0.8, h: p.radius * 0.25, c: '#B45309' },
            { y: -p.radius * 0.55, h: p.radius * 0.28, c: '#D97706' },
            { y: -p.radius * 0.27, h: p.radius * 0.26, c: '#FFFBEB' },
            { y: -p.radius * 0.01, h: p.radius * 0.32, c: '#92400E' },
            { y: p.radius * 0.31, h: p.radius * 0.3, c: '#B45309' },
            { y: p.radius * 0.61, h: p.radius * 0.39, c: '#78350F' },
          ];
          bands.forEach((b) => {
            ctx.fillStyle = b.c;
            ctx.fillRect(-p.radius, b.y, p.radius * 2, b.h);
          });

          // Badai-badai putih kecil (White ovals) berotasi
          const jupiterOvals = [
            { lon: 2.2, lat: -0.4, rx: 0.15, ry: 0.08 },
            { lon: 4.1, lat: 0.45, rx: 0.16, ry: 0.09 },
            { lon: 5.6, lat: -0.12, rx: 0.14, ry: 0.07 },
          ];
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          jupiterOvals.forEach((ov) => {
            const lon = (ov.lon + jupiterSpinAngle) % (Math.PI * 2);
            const depth = Math.cos(lon);
            if (depth > -0.15) {
              const cx = Math.sin(lon) * (p.radius * 0.85);
              const cy = ov.lat * (p.radius * 0.85);
              ctx.beginPath();
              ctx.ellipse(cx, cy, ov.rx * p.radius * Math.max(0.25, depth), ov.ry * p.radius, 0, 0, Math.PI * 2);
              ctx.fill();
            }
          });

          // Bintik Merah Raksasa (Great Red Spot) berotasi mengelilingi Yupiter
          const grsLon = (jupiterSpinAngle + 0.8) % (Math.PI * 2);
          const grsDepth = Math.cos(grsLon);
          if (grsDepth > -0.18) {
            const grsX = Math.sin(grsLon) * (p.radius * 0.82);
            const grsY = p.radius * 0.16;
            const grsRx = p.radius * 0.32 * Math.max(0.2, grsDepth);
            const grsRy = p.radius * 0.18;
            ctx.fillStyle = '#DC2626';
            ctx.beginPath();
            ctx.ellipse(grsX, grsY, grsRx, grsRy, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#991B1B';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Inti cerah dalam Great Red Spot
            ctx.fillStyle = 'rgba(254, 202, 202, 0.55)';
            ctx.beginPath();
            ctx.ellipse(grsX, grsY, grsRx * 0.5, grsRy * 0.45, 0, 0, Math.PI * 2);
            ctx.fill();
          }

          // Terminator bayangan matahari
          const shad = ctx.createRadialGradient(
            Math.cos(sunAngle) * (p.radius * 0.35),
            Math.sin(sunAngle) * (p.radius * 0.35),
            p.radius * 0.1,
            0,
            0,
            p.radius * 1.05
          );
          shad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          shad.addColorStop(0.6, isLight ? 'rgba(30, 20, 10, 0.25)' : 'rgba(15, 10, 5, 0.4)');
          shad.addColorStop(1, isLight ? 'rgba(15, 10, 5, 0.65)' : 'rgba(5, 3, 2, 0.95)');
          ctx.fillStyle = shad;
          ctx.fillRect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);
          ctx.restore();

          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(254, 243, 199, 0.6)';
          ctx.lineWidth = 1;
          ctx.stroke();
        } else if (p.name === 'SATURNUS') {
          // ==========================================
          // SATURNUS: PLANET CINCIN MAJESTIK (TRUE PERSPECTIVE)
          // ==========================================
          const ringTilt = (-20 * Math.PI) / 180;
          const s = 0.28; // Rasio perspektif elips cincin datar
          const maxRingR = p.radius * 2.32;

          // Definisi cincin konsentris fotorealistik (Cincin C, Cincin B, Celah Cassini, & Cincin A)
          const ringBands = [
            // Cincin C (Crepe ring - tipis transparan di dekat bola)
            {
              r1: p.radius * 1.22,
              r2: p.radius * 1.42,
              fill: isLight ? 'rgba(2, 132, 199, 0.16)' : 'rgba(197, 160, 89, 0.22)',
            },
            // Cincin B (Cincin utama paling padat dan berkilau)
            {
              r1: p.radius * 1.46,
              r2: p.radius * 1.94,
              fill: isLight ? 'rgba(2, 132, 199, 0.52)' : 'rgba(246, 224, 94, 0.78)',
            },
            // Kilau inti terang Cincin B
            {
              r1: p.radius * 1.62,
              r2: p.radius * 1.88,
              fill: isLight ? 'rgba(14, 165, 233, 0.35)' : 'rgba(254, 240, 138, 0.45)',
            },
            // (Celah Cassini: rentang antara 1.94 dan 2.04 transparan murni)
            // Cincin A (Cincin luar keemasan)
            {
              r1: p.radius * 2.04,
              r2: p.radius * 2.30,
              fill: isLight ? 'rgba(2, 132, 199, 0.32)' : 'rgba(230, 202, 126, 0.55)',
            },
          ];

          // Fungsi menggambar cakram cincin datar dengan lubang elips (evenodd)
          const drawRingBands = () => {
            ringBands.forEach((b) => {
              ctx.beginPath();
              ctx.ellipse(0, 0, b.r2, b.r2 * s, 0, 0, Math.PI * 2);
              ctx.ellipse(0, 0, b.r1, b.r1 * s, 0, Math.PI * 2, 0, true);
              ctx.fillStyle = b.fill;
              ctx.fill('evenodd');
            });

            // Garis pembatas halus (divisi Cassini dan batas luar)
            ctx.strokeStyle = isLight ? 'rgba(2, 132, 199, 0.45)' : 'rgba(254, 240, 138, 0.65)';
            ctx.lineWidth = 0.65;

            // Batas luar Cincin A
            ctx.beginPath();
            ctx.ellipse(0, 0, p.radius * 2.30, p.radius * 2.30 * s, 0, 0, Math.PI * 2);
            ctx.stroke();

            // Batas luar Cincin B (tepi dalam Cassini)
            ctx.beginPath();
            ctx.ellipse(0, 0, p.radius * 1.94, p.radius * 1.94 * s, 0, 0, Math.PI * 2);
            ctx.stroke();

            // Batas dalam Cincin A (tepi luar Cassini)
            ctx.strokeStyle = isLight ? 'rgba(2, 132, 199, 0.3)' : 'rgba(230, 202, 126, 0.45)';
            ctx.beginPath();
            ctx.ellipse(0, 0, p.radius * 2.04, p.radius * 2.04 * s, 0, 0, Math.PI * 2);
            ctx.stroke();
          };

          // ------------------------------------
          // 1. CINCIN BELAKANG (y < 0 pada bidang cincin, berada di belakang bola planet)
          // ------------------------------------
          ctx.save();
          ctx.rotate(ringTilt);
          ctx.save();
          ctx.beginPath();
          ctx.rect(-maxRingR * 1.3, -maxRingR * 1.3, maxRingR * 2.6, maxRingR * 1.3);
          ctx.clip();
          drawRingBands();

          // Bayangan bola planet jatuh ke cincin belakang (menjauhi arah matahari)
          const shadowAngleRel = Math.atan2(py, px) - ringTilt;
          const ringShadowGrad = ctx.createRadialGradient(
            Math.cos(shadowAngleRel) * (p.radius * 0.4),
            Math.sin(shadowAngleRel) * (p.radius * 0.4 * s),
            p.radius * 0.2,
            Math.cos(shadowAngleRel) * (p.radius * 1.4),
            Math.sin(shadowAngleRel) * (p.radius * 1.4 * s),
            p.radius * 1.2
          );
          ringShadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
          ringShadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = ringShadowGrad;
          ctx.fillRect(-maxRingR * 1.3, -maxRingR * 1.3, maxRingR * 2.6, maxRingR * 1.3);

          ctx.restore();
          ctx.restore();

          // ------------------------------------
          // 2. BOLA PLANET SATURNUS
          // ------------------------------------
          ctx.save();
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.clip();

          // Gradien dasar atmosfer Saturnus
          const sg = ctx.createLinearGradient(-p.radius, -p.radius, p.radius, p.radius);
          sg.addColorStop(0, '#FEF3C7');
          sg.addColorStop(0.35, '#FDE68A');
          sg.addColorStop(0.7, '#EAB308');
          sg.addColorStop(1, '#B45309');
          ctx.fillStyle = sg;
          ctx.fillRect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);

          // Pita-pita atmosfer halus
          const saturnBands = [
            { y: -p.radius * 0.65, h: p.radius * 0.2, c: 'rgba(180, 83, 9, 0.22)' },
            { y: -p.radius * 0.35, h: p.radius * 0.18, c: 'rgba(217, 119, 6, 0.25)' },
            { y: -p.radius * 0.05, h: p.radius * 0.22, c: 'rgba(254, 240, 138, 0.3)' },
            { y: p.radius * 0.25, h: p.radius * 0.24, c: 'rgba(180, 83, 9, 0.2)' },
          ];
          saturnBands.forEach((b) => {
            ctx.fillStyle = b.c;
            ctx.fillRect(-p.radius, b.y, p.radius * 2, b.h);
          });

          // Badai awan atmosfer Saturnus berputar pada porosnya
          const saturnStorms = [
            { lon: 0.6, lat: -0.2, rx: 0.22, ry: 0.08, c: 'rgba(255, 255, 255, 0.4)' },
            { lon: 2.7, lat: 0.15, rx: 0.26, ry: 0.09, c: 'rgba(217, 119, 6, 0.35)' },
            { lon: 4.5, lat: -0.45, rx: 0.2, ry: 0.07, c: 'rgba(254, 240, 138, 0.45)' },
          ];
          saturnStorms.forEach((st) => {
            const lon = (st.lon + saturnSpinAngle) % (Math.PI * 2);
            const depth = Math.cos(lon);
            if (depth > -0.1) {
              const cx = Math.sin(lon) * (p.radius * 0.85);
              const cy = st.lat * (p.radius * 0.85);
              ctx.fillStyle = st.c;
              ctx.beginPath();
              ctx.ellipse(cx, cy, st.rx * p.radius * Math.max(0.25, depth), st.ry * p.radius, 0, 0, Math.PI * 2);
              ctx.fill();
            }
          });

          // Bayangan tipis cincin pada khatulistiwa bola Saturnus
          ctx.save();
          ctx.rotate(ringTilt);
          ctx.fillStyle = 'rgba(10, 5, 2, 0.45)';
          ctx.fillRect(-p.radius, 0, p.radius * 2, p.radius * 0.22);
          ctx.restore();

          // Terminator bayangan matahari
          const shad = ctx.createRadialGradient(
            Math.cos(sunAngle) * (p.radius * 0.35),
            Math.sin(sunAngle) * (p.radius * 0.35),
            p.radius * 0.1,
            0,
            0,
            p.radius * 1.05
          );
          shad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          shad.addColorStop(0.55, isLight ? 'rgba(40, 30, 10, 0.25)' : 'rgba(20, 15, 5, 0.4)');
          shad.addColorStop(1, isLight ? 'rgba(15, 10, 5, 0.65)' : 'rgba(5, 3, 2, 0.95)');
          ctx.fillStyle = shad;
          ctx.fillRect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);
          ctx.restore(); // Akhir clip bola

          // Sorot tepi bola Saturnus
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(254, 240, 138, 0.6)';
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // ------------------------------------
          // 3. CINCIN DEPAN (y >= 0 pada bidang cincin, melintasi depan bola planet)
          // ------------------------------------
          ctx.save();
          ctx.rotate(ringTilt);
          ctx.save();
          ctx.beginPath();
          ctx.rect(-maxRingR * 1.3, 0, maxRingR * 2.6, maxRingR * 1.3);
          ctx.clip();
          drawRingBands();
          ctx.restore();
          ctx.restore();
        } else if (p.name === 'URANUS') {
          // Uranus: Raksasa es aquamarine berputar miring dengan cincin tipis vertikal
          const uHalo = ctx.createRadialGradient(0, 0, p.radius * 0.7, 0, 0, p.radius * 1.4);
          uHalo.addColorStop(0, 'rgba(103, 232, 249, 0.25)');
          uHalo.addColorStop(1, 'rgba(103, 232, 249, 0)');
          ctx.fillStyle = uHalo;
          ctx.beginPath();
          ctx.arc(0, 0, p.radius * 1.4, 0, Math.PI * 2);
          ctx.fill();

          // Cincin vertikal Uranus (kemiringan sumbu ~98°)
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius * 0.35, p.radius * 1.8, 0, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(103, 232, 249, 0.35)';
          ctx.lineWidth = 0.8;
          ctx.stroke();

          ctx.save();
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.clip();

          const ug = ctx.createLinearGradient(-p.radius, -p.radius, p.radius, p.radius);
          ug.addColorStop(0, '#A5F3FC');
          ug.addColorStop(0.5, '#06B6D4');
          ug.addColorStop(1, '#0891B2');
          ctx.fillStyle = ug;
          ctx.fillRect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);

          // Awan metana Uranus berotasi
          const uranusBands = [
            { lon: 0.5, lat: -0.22, rx: 0.3, ry: 0.09 },
            { lon: 2.8, lat: 0.2, rx: 0.35, ry: 0.1 },
            { lon: 4.7, lat: -0.1, rx: 0.28, ry: 0.08 },
          ];
          ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
          uranusBands.forEach((ub) => {
            const lon = (ub.lon + uranusSpinAngle) % (Math.PI * 2);
            const depth = Math.cos(lon);
            if (depth > -0.1) {
              const cx = Math.sin(lon) * (p.radius * 0.85);
              const cy = ub.lat * (p.radius * 0.85);
              ctx.beginPath();
              ctx.ellipse(cx, cy, ub.rx * p.radius * Math.max(0.25, depth), ub.ry * p.radius, 0, 0, Math.PI * 2);
              ctx.fill();
            }
          });

          // Terminator bayangan matahari
          const shad = ctx.createRadialGradient(
            Math.cos(sunAngle) * (p.radius * 0.3),
            Math.sin(sunAngle) * (p.radius * 0.3),
            p.radius * 0.1,
            0,
            0,
            p.radius * 1.05
          );
          shad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          shad.addColorStop(0.6, isLight ? 'rgba(8, 20, 30, 0.22)' : 'rgba(8, 20, 30, 0.35)');
          shad.addColorStop(1, isLight ? 'rgba(2, 10, 20, 0.65)' : 'rgba(2, 8, 15, 0.95)');
          ctx.fillStyle = shad;
          ctx.fillRect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);
          ctx.restore();

          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(165, 243, 252, 0.55)';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        } else if (p.name === 'NEPTUNUS') {
          // Neptunus: Raksasa biru laut cerulean dengan awan metana putih & Bintik Gelap Raksasa berotasi
          const nHalo = ctx.createRadialGradient(0, 0, p.radius * 0.7, 0, 0, p.radius * 1.45);
          nHalo.addColorStop(0, 'rgba(59, 130, 246, 0.28)');
          nHalo.addColorStop(1, 'rgba(59, 130, 246, 0)');
          ctx.fillStyle = nHalo;
          ctx.beginPath();
          ctx.arc(0, 0, p.radius * 1.45, 0, Math.PI * 2);
          ctx.fill();

          ctx.save();
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.clip();

          const ng = ctx.createLinearGradient(-p.radius, -p.radius, p.radius, p.radius);
          ng.addColorStop(0, '#60A5FA');
          ng.addColorStop(0.5, '#2563EB');
          ng.addColorStop(1, '#1E3A8A');
          ctx.fillStyle = ng;
          ctx.fillRect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);

          // Bintik Gelap Raksasa (Great Dark Spot) Neptunus berotasi
          const gdsLon = (neptuneSpinAngle + 1.2) % (Math.PI * 2);
          const gdsDepth = Math.cos(gdsLon);
          if (gdsDepth > -0.15) {
            const gdsX = Math.sin(gdsLon) * (p.radius * 0.82);
            const gdsY = -p.radius * 0.18;
            ctx.fillStyle = '#0F172A';
            ctx.beginPath();
            ctx.ellipse(gdsX, gdsY, p.radius * 0.28 * Math.max(0.25, gdsDepth), p.radius * 0.16, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = 'rgba(147, 197, 253, 0.55)';
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }

          // Awan metana putih cerah (Scooter clouds) berotasi
          const neptuneClouds = [
            { lon: 0.4, lat: 0.28, rx: 0.35, ry: 0.08 },
            { lon: 2.2, lat: -0.32, rx: 0.3, ry: 0.07 },
            { lon: 3.9, lat: 0.12, rx: 0.38, ry: 0.09 },
            { lon: 5.3, lat: -0.15, rx: 0.32, ry: 0.08 },
          ];
          ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
          neptuneClouds.forEach((nc) => {
            const lon = (nc.lon + neptuneSpinAngle) % (Math.PI * 2);
            const depth = Math.cos(lon);
            if (depth > -0.1) {
              const cx = Math.sin(lon) * (p.radius * 0.85);
              const cy = nc.lat * (p.radius * 0.85);
              ctx.beginPath();
              ctx.ellipse(cx, cy, nc.rx * p.radius * Math.max(0.25, depth), nc.ry * p.radius, 0, 0, Math.PI * 2);
              ctx.fill();
            }
          });

          // Terminator bayangan matahari
          const shad = ctx.createRadialGradient(
            Math.cos(sunAngle) * (p.radius * 0.3),
            Math.sin(sunAngle) * (p.radius * 0.3),
            p.radius * 0.1,
            0,
            0,
            p.radius * 1.05
          );
          shad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          shad.addColorStop(0.6, isLight ? 'rgba(10, 20, 40, 0.25)' : 'rgba(5, 10, 30, 0.4)');
          shad.addColorStop(1, isLight ? 'rgba(5, 10, 25, 0.65)' : 'rgba(1, 4, 15, 0.95)');
          ctx.fillStyle = shad;
          ctx.fillRect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);
          ctx.restore();

          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(147, 197, 253, 0.55)';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        // Label Planet dan Jarak Real-Time dari Bumi
        ctx.font = 'bold 8px "Cinzel", serif';
        ctx.fillStyle = isLight ? p.lightTextColor : p.darkTextColor;
        ctx.textAlign = 'center';
        ctx.fillText(p.name, 0, p.radius + 14);

        ctx.font = '6.5px "Cinzel", serif';
        ctx.fillStyle = isLight ? 'rgba(51, 65, 85, 0.75)' : 'rgba(230, 202, 126, 0.65)';
        ctx.fillText(distText, 0, p.radius + 23);

        ctx.restore();
      });

      // ------------------------------------------
      // F. THE EARTH (BUMI) - PUSAT PERHATIAN & TELEMETRI
      // ------------------------------------------
      // Posisi Bumi di orbit elips
      const earthX = Math.cos(currentOrbitAngle) * baseRx;
      const earthY = Math.sin(currentOrbitAngle) * baseRy;
      // Ukuran Bumi sedikit dikecilkan sesuai permintaan user (18px di fullscreen / 13px di embedded)
      const earthRadius = isFullscreen ? 18 : 13;

      // Garis gravitasi dari Matahari ke Bumi
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(earthX, earthY);
      ctx.strokeStyle = isLight ? 'rgba(2, 132, 199, 0.2)' : 'rgba(125, 211, 252, 0.15)';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.save();
      ctx.translate(earthX, earthY);

      // Kemiringan poros Bumi (23.5 derajat)
      const AXIAL_TILT = (-23.5 * Math.PI) / 180;
      ctx.rotate(AXIAL_TILT);

      // Garis poros rotasi Bumi
      ctx.beginPath();
      ctx.moveTo(0, -earthRadius * 1.55);
      ctx.lineTo(0, earthRadius * 1.55);
      ctx.strokeStyle = isLight ? 'rgba(2, 132, 199, 0.5)' : 'rgba(230, 202, 126, 0.45)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Penanda Kutub N / S
      ctx.font = '7px "Cinzel", serif';
      ctx.fillStyle = isLight ? 'rgba(3, 105, 161, 0.85)' : 'rgba(230, 202, 126, 0.7)';
      ctx.textAlign = 'center';
      ctx.fillText('N', 0, -earthRadius * 1.65);
      ctx.fillText('S', 0, earthRadius * 1.85);

      // Kilau Atmosfer Luar (Hamburan Rayleigh Biru)
      const atmoGrad = ctx.createRadialGradient(
        0,
        0,
        earthRadius * 0.7,
        0,
        0,
        earthRadius * 1.65
      );
      atmoGrad.addColorStop(0, 'rgba(56, 189, 248, 0.6)');
      atmoGrad.addColorStop(0.5, 'rgba(14, 165, 233, 0.25)');
      atmoGrad.addColorStop(1, 'rgba(2, 132, 199, 0)');
      ctx.fillStyle = atmoGrad;
      ctx.beginPath();
      ctx.arc(0, 0, earthRadius * 1.65, 0, Math.PI * 2);
      ctx.fill();

      // Clip bola Bumi untuk daratan dan samudera
      ctx.save();
      ctx.beginPath();
      ctx.arc(0, 0, earthRadius, 0, Math.PI * 2);
      ctx.clip();

      // Warna Samudera Bumi (Biru Kosmik Dalam)
      ctx.fillStyle = '#0F2C59';
      ctx.fillRect(-earthRadius, -earthRadius, earthRadius * 2, earthRadius * 2);

      // Benua-benua (bergerak berputar mengikuti earthSpinAngle)
      ctx.fillStyle = '#22577A';
      for (const p of continentPatches) {
        const currentLon = (p.lon + earthSpinAngle) % (Math.PI * 2);
        const visibleX = Math.sin(currentLon);
        const depth = Math.cos(currentLon);

        if (depth > -0.2) {
          const cx = visibleX * earthRadius * 0.9;
          const cy = p.lat * earthRadius * 0.9;
          const pr = p.r * earthRadius * Math.max(0.2, depth);

          ctx.beginPath();
          ctx.arc(cx, cy, pr, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#387780';
          ctx.beginPath();
          ctx.arc(cx + 1.5, cy - 1, pr * 0.65, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#22577A';
        }
      }

      // Lapisan awan putih berputar
      ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
      const cloudOffset = (earthSpinAngle * 1.2) % (earthRadius * 2);
      ctx.fillRect(-earthRadius + cloudOffset - earthRadius * 2, -earthRadius * 0.3, earthRadius * 1.2, 2.5);
      ctx.fillRect(-earthRadius + cloudOffset, earthRadius * 0.25, earthRadius * 1.4, 2.8);

      // Terminator Siang/Malam dari Matahari
      const sunAngleRel = Math.atan2(-earthY, -earthX) - AXIAL_TILT;
      const shadowGrad = ctx.createRadialGradient(
        Math.cos(sunAngleRel) * (earthRadius * 0.4),
        Math.sin(sunAngleRel) * (earthRadius * 0.4),
        earthRadius * 0.1,
        0,
        0,
        earthRadius * 1.05
      );
      shadowGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      shadowGrad.addColorStop(0.55, isLight ? 'rgba(10, 20, 40, 0.22)' : 'rgba(5, 7, 15, 0.35)');
      shadowGrad.addColorStop(0.9, isLight ? 'rgba(5, 10, 25, 0.55)' : 'rgba(2, 4, 8, 0.88)');
      shadowGrad.addColorStop(1, isLight ? 'rgba(5, 10, 25, 0.7)' : 'rgba(2, 4, 8, 0.98)');
      ctx.fillStyle = shadowGrad;
      ctx.fillRect(-earthRadius, -earthRadius, earthRadius * 2, earthRadius * 2);

      // Lampu kota malam hari di sisi gelap
      ctx.fillStyle = 'rgba(251, 191, 36, 0.4)';
      for (let l = 0; l < 4; l++) {
        const lx = -Math.cos(sunAngleRel) * (earthRadius * 0.5) + (l - 2) * 1.5;
        const ly = -Math.sin(sunAngleRel) * (earthRadius * 0.4) + ((l % 2) - 0.5) * 3;
        ctx.fillRect(lx, ly, 1.2, 1.2);
      }

      ctx.restore(); // Akhir clip bola Bumi

      // Sorot tepi bola Bumi
      ctx.beginPath();
      ctx.arc(0, 0, earthRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(224, 242, 254, 0.6)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // ------------------------------------------
      // G. BULAN (THE MOON)
      // ------------------------------------------
      const moonDist = earthRadius * 2.2;
      const moonAngle = earthSpinAngle * 0.35;
      const moonX = Math.cos(moonAngle) * moonDist;
      const moonY = Math.sin(moonAngle) * (moonDist * 0.5);

      // Orbit cincin Bulan
      ctx.beginPath();
      ctx.ellipse(0, 0, moonDist, moonDist * 0.5, 0, 0, Math.PI * 2);
      ctx.strokeStyle = isLight ? 'rgba(2, 132, 199, 0.25)' : 'rgba(197, 160, 89, 0.18)';
      ctx.lineWidth = 0.75;
      ctx.stroke();

      // Badan Bulan
      ctx.beginPath();
      ctx.arc(moonX, moonY, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#E2E8F0';
      ctx.shadowColor = 'rgba(226, 232, 240, 0.5)';
      ctx.shadowBlur = 4;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Label Bumi
      ctx.font = 'bold 9px "Cinzel", serif';
      ctx.fillStyle = isLight ? '#0369A1' : '#7DD3FC';
      ctx.textAlign = 'center';
      ctx.fillText('BUMI', 0, earthRadius + 15);

      ctx.font = '7px "Cinzel", serif';
      ctx.fillStyle = isLight ? 'rgba(55, 65, 81, 0.85)' : 'rgba(237, 231, 216, 0.7)';
      ctx.fillText('ROTASI: 23.5°', 0, earthRadius + 24);

      ctx.restore(); // Akhir transformasi Bumi
      ctx.restore(); // Akhir transformasi Orbit Pusat Matahari

      // ------------------------------------------
      // G. DRAW INTERACTIVE CONSTELLATION MOUSE LINES
      // ------------------------------------------
      if (isMouseOver && mouseX > 0 && mouseY > 0) {
        let connections = 0;
        const cosR = Math.cos(galaxyRotation);
        const sinR = Math.sin(galaxyRotation);

        for (let i = 0; i < stars.length && connections < 5; i += 4) {
          const s = stars[i];
          const rotX = s.baseX * cosR - s.baseY * sinR;
          const rotY = s.baseX * sinR + s.baseY * cosR;
          const sx = centerX + rotX;
          const sy = centerY + rotY;

          const dx = sx - mouseX;
          const dy = sy - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const lineAlpha = (1 - dist / 130) * 0.45;
            ctx.beginPath();
            ctx.moveTo(mouseX, mouseY);
            ctx.lineTo(sx, sy);
            ctx.strokeStyle = isLight ? `rgba(2, 132, 199, ${lineAlpha})` : `rgba(230, 202, 126, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Star highlight pulse when connected
            ctx.beginPath();
            ctx.arc(sx, sy, s.size * 2, 0, Math.PI * 2);
            ctx.fillStyle = isLight ? '#0284C7' : '#FFFFFF';
            ctx.globalAlpha = lineAlpha * 1.5;
            ctx.fill();
            ctx.globalAlpha = 1;

            connections++;
          }
        }
      }

      // ------------------------------------------
      // H. DRAW INTERACTIVE STARDUST PARTICLES POOL
      // ------------------------------------------
      for (let i = stardustPool.length - 1; i >= 0; i--) {
        const p = stardustPool[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        const progress = p.life / p.maxLife;
        const alpha = Math.max(0, p.alpha * (1 - progress));

        if (progress >= 1 || alpha <= 0.01) {
          stardustPool.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - progress * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;

      // ------------------------------------------
      // I. DRAW INTERACTIVE SUPERNOVA SHOCKWAVES
      // ------------------------------------------
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += 3.5;
        const progress = sw.radius / sw.maxRadius;
        const alpha = Math.max(0, sw.alpha * (1 - progress));

        if (progress >= 1 || alpha <= 0.01) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(197, 160, 89, ${alpha})`;
        ctx.lineWidth = 1.5 * (1 - progress * 0.7);
        ctx.setLineDash([6, 8]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Update telemetry state periodically
      const isMoving = isCurrentlyScrolling || Math.abs(targetOrbitAngle - currentOrbitAngle) > 0.003;

      if (now - lastTelemetryUpdate > 250) {
        lastTelemetryUpdate = now;
        const deg = ((((currentOrbitAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) * 180) / Math.PI;
        const spinDeg = ((((earthSpinAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) * 180) / Math.PI;

        let seasonName = 'Ekuinoks Maret';
        if (deg >= 45 && deg < 135) seasonName = 'Titik Balik Juni (Solstice)';
        else if (deg >= 135 && deg < 225) seasonName = 'Ekuinoks September';
        else if (deg >= 225 && deg < 315) seasonName = 'Titik Balik Desember';

        setTelemetry({
          orbitDeg: Math.round(deg),
          earthSpinDeg: Math.round(spinDeg),
          season: seasonName,
          distanceAU: '1.000 AU (149.6M km)',
          isScrolling: isMoving,
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [mode]);

  if (mode === 'embedded') {
    return (
      <div
        className={`relative w-full h-full min-h-[360px] overflow-hidden select-none ${className}`}
      >
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
    );
  }

  return (
    <>
      {/* Root Background Tata Surya: Fixed di Belakang Seluruh Halaman */}
      <div
        className={`fixed inset-0 w-screen h-screen z-0 pointer-events-none overflow-hidden select-none ${className}`}
        style={{ zIndex: 0 }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{
            opacity: 0.95,
          }}
        />
      </div>

      {/* Interactive Telemetry HUD (Live Orbit & Planet Rotation Status) */}
      {showHUD && (
        <>
          {/* Desktop & Laptop HUD (md+) - Bersih, Tajam, & Bebas Efek Neon/Blur */}
          <div
            className="fixed bottom-4 right-4 hidden md:flex items-center justify-between gap-3.5 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-void-950/90 border border-slate-200/90 dark:border-brass/30 shadow-sm backdrop-blur-sm text-[11px] font-mono z-30 pointer-events-auto select-none transition-colors"
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  telemetry.isScrolling
                    ? 'bg-amber-500 animate-pulse'
                    : 'bg-emerald-500'
                }`}
              />
              <span className="text-slate-800 dark:text-brass font-bold tracking-tight">
                {telemetry.isScrolling ? 'PLANET MENGORBIT' : 'PLANET BEROTASI'}
              </span>
            </div>

            <div className="flex items-center gap-2.5 text-slate-600 dark:text-parchment">
              <span>
                ORBIT: <span className="text-sky-600 dark:text-brass-light font-bold">{telemetry.orbitDeg}°</span>
              </span>
              <span className="hidden sm:inline text-slate-300 dark:text-brass/40">|</span>
              <span className="hidden sm:inline">
                ROTASI POROS: <span className="text-sky-600 dark:text-brass-light font-bold">{telemetry.earthSpinDeg}°</span>
              </span>
            </div>
          </div>

          {/* Compact Mobile Mini-HUD (< md) - Bersih, Tajam, & Bebas Efek Neon/Blur */}
          <div
            className="fixed bottom-3 right-3 md:hidden flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 dark:bg-void-950/90 border border-slate-200/90 dark:border-brass/30 shadow-sm backdrop-blur-sm text-[10px] font-mono z-30 pointer-events-auto select-none"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                telemetry.isScrolling
                  ? 'bg-amber-500 animate-pulse'
                  : 'bg-emerald-500'
              }`}
            />
            <span className="text-slate-700 dark:text-brass font-bold">
              {telemetry.isScrolling ? 'MENGORBIT:' : 'BEROTASI:'}
            </span>
            <span className="text-sky-600 dark:text-brass-light font-bold">{telemetry.orbitDeg}°</span>
          </div>
        </>
      )}
    </>
  );
};
