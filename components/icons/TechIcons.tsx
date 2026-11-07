import React from 'react';

interface TechIconProps {
  name: string;
  className?: string;
  useBrandColor?: boolean;
}

export const TechIcon: React.FC<TechIconProps> = ({
  name,
  className = 'w-5 h-5',
  useBrandColor = false,
}) => {
  const n = name.toLowerCase().trim();

  // 1. TypeScript (TS)
  if (n.includes('typescript') || n === 'ts') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`${className} ${useBrandColor ? 'text-[#3178C6]' : ''}`}
        aria-label="TypeScript Logo"
      >
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.26c-.17.117-.298.267-.384.45-.086.182-.129.401-.129.657 0 .224.045.419.135.584.09.165.22.311.39.439.17.128.384.243.642.345.258.102.56.205.906.31 1.166.353 2.012.825 2.539 1.417.527.592.79 1.398.79 2.418 0 .612-.11 1.171-.33 1.677a4.267 4.267 0 0 1-.938 1.365 4.636 4.636 0 0 1-1.554.912c-.636.219-1.38.328-2.23.328-.8 0-1.574-.087-2.32-.262a7.737 7.737 0 0 1-1.93-.77v-2.616c.65.418 1.353.729 2.108.932.755.204 1.46.306 2.115.306.34 0 .64-.035.9-.105.26-.07.478-.178.653-.324.175-.146.305-.333.39-.56.085-.228.128-.504.128-.827 0-.256-.051-.476-.154-.66-.102-.185-.251-.346-.447-.484-.196-.138-.445-.262-.746-.373-.301-.111-.663-.225-1.085-.342-.71-.233-1.3-.497-1.77-.792a3.86 3.86 0 0 1-1.182-1.106 3.486 3.486 0 0 1-.58-1.328 5.795 5.795 0 0 1-.168-1.442c0-.573.107-1.105.32-1.597.214-.492.527-.919.94-1.28.413-.362.93-.642 1.552-.84.622-.199 1.352-.298 2.19-.298zM2.875 9.875h8.625v2.25H8.312v9.75H5.812v-9.75H2.875z" />
      </svg>
    );
  }

  // 2. Next.js
  if (n.includes('next')) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        className={`${className} ${useBrandColor ? 'text-black dark:text-white' : ''}`}
        aria-label="Next.js Logo"
      >
        <path d="M18.665 21.978C16.687 23.262 14.425 24 12 24 5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12c0 3.584-1.574 6.801-4.067 8.995l-10.7-13.725H7.078v13.46h2.155V8.895l9.432 12.083zm-1.897-9.52v-4.73h-2.155v7.482l2.155-2.752z" />
      </svg>
    );
  }

  // 3. React
  if (n.includes('react')) {
    return (
      <svg
        viewBox="-11.5 -10.23174 23 20.46348"
        fill="none"
        className={`${className} ${useBrandColor ? 'text-[#61DAFB]' : ''}`}
        aria-label="React Logo"
      >
        <circle cx="0" cy="0" r="2.05" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="1">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  // 4. Tailwind CSS
  if (n.includes('tailwind')) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`${className} ${useBrandColor ? 'text-[#38BDF8]' : ''}`}
        aria-label="Tailwind CSS Logo"
      >
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    );
  }

  // 5. Bootstrap
  if (n.includes('bootstrap')) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`${className} ${useBrandColor ? 'text-[#7952B3]' : ''}`}
        aria-label="Bootstrap Logo"
      >
        <path d="M5.7 0C2.6 0 0 2.6 0 5.7v12.6C0 21.4 2.6 24 5.7 24h12.6c3.1 0 5.7-2.6 5.7-5.7V5.7C24 2.6 21.4 0 18.3 0H5.7zm3.8 5.7h4.8c2.4 0 3.8 1.3 3.8 3.2 0 1.3-.8 2.3-2 2.7 1.6.4 2.6 1.6 2.6 3.2 0 2.2-1.7 3.5-4.2 3.5H9.5V5.7zm2.8 2.5v3.2h2c1 0 1.6-.6 1.6-1.6s-.6-1.6-1.6-1.6h-2zm0 5.4v3.5h2.2c1.1 0 1.8-.7 1.8-1.8 0-1-.7-1.7-1.8-1.7h-2.2z" />
      </svg>
    );
  }

  // 6. CSS3
  if (n.includes('css3') || n === 'css' || n.includes('css 3')) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`${className} ${useBrandColor ? 'text-[#1572B6]' : ''}`}
        aria-label="CSS3 Logo"
      >
        <path d="M1.5 0h21l-1.9 21.6L12 24l-8.6-2.4L1.5 0zm16.7 4.7H5.8l.4 4.5h9.3l-.4 4.4-3.1.8-3.1-.8-.2-2.3H6.3l.4 4.5 5.3 1.5 5.3-1.5.8-8.9.2-2.2z" />
      </svg>
    );
  }

  // 7. HTML5 (Official Shield with 5)
  if (n.includes('html')) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`${className} ${useBrandColor ? 'text-[#E34F26]' : ''}`}
        aria-label="HTML5 Logo"
      >
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.234-2.625h11.203l.235-2.625H5.86l.703 7.875h7.734l-.328 3.656-3.003.813-2.997-.813-.193-2.156H5.405l.38 4.265 5.185 1.438 5.188-1.438.718-8.063H8.531z" />
      </svg>
    );
  }

  // 8. Laravel
  if (n.includes('laravel')) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`${className} ${useBrandColor ? 'text-[#FF2D20]' : ''}`}
        aria-label="Laravel Logo"
      >
        <path d="M22.95 5.57L13.19.04a1.73 1.73 0 0 0-1.74 0L1.7 5.57A1.73 1.73 0 0 0 .83 7.07v11.08a1.73 1.73 0 0 0 .87 1.5l9.75 5.53a1.73 1.73 0 0 0 1.74 0l9.76-5.53a1.73 1.73 0 0 0 .87-1.5V7.07a1.73 1.73 0 0 0-.87-1.5zm-1.87 2.05l-8.76 4.96v9.84l8.76-4.97V7.62zm-9.76-4.47l8.72 4.94-3.79 2.14-8.73-4.94 3.8-2.14zm-8.4 4.47l8.76 4.96v9.84L2.92 17.46V7.62z" />
      </svg>
    );
  }

  // 9. PHP
  if (n.includes('php')) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`${className} ${useBrandColor ? 'text-[#777BB4]' : ''}`}
        aria-label="PHP Logo"
      >
        <path d="M12 3C6.48 3 2 7.03 2 12s4.48 9 10 9 10-4.03 10-9-4.48-9-10-9zm-5.4 12.3H4.9l1.4-6.6h2.6c1.5 0 2.4.7 2.1 2.2-.3 1.4-1.3 2.1-2.7 2.1H7.2l-.6 2.3zm8.3 0h-1.7l1.4-6.6h2.6c1.5 0 2.4.7 2.1 2.2-.3 1.4-1.3 2.1-2.7 2.1h-1.1l-.6 2.3zm-3.6 0h-1.6l1.4-6.6h1.6l-1.4 6.6zm-4-3.7h.9c.7 0 1.2-.3 1.3-1 .1-.6-.2-.9-.8-.9h-.8l-.6 1.9zm8.3 0h.9c.7 0 1.2-.3 1.3-1 .1-.6-.2-.9-.8-.9h-.8l-.6 1.9z" />
      </svg>
    );
  }

  // 10. SQL (MySQL & PostgreSQL Database)
  if (
    n.includes('sql') ||
    n.includes('postgres') ||
    n.includes('mysql') ||
    n.includes('timescale') ||
    n.includes('database')
  ) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} ${useBrandColor ? 'text-[#4169E1]' : ''}`}
        aria-label="SQL Database Logo"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    );
  }

  // 11. REST API
  if (n.includes('graphql') || n.includes('api') || n.includes('rest') || n.includes('kontrak')) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} ${useBrandColor ? 'text-[#E10098]' : ''}`}
        aria-label="RESTful API Logo"
      >
        <rect x="2" y="3" width="20" height="7" rx="2" />
        <rect x="2" y="14" width="20" height="7" rx="2" />
        <circle cx="6" cy="6.5" r="1" fill="currentColor" />
        <circle cx="6" cy="17.5" r="1" fill="currentColor" />
        <path d="M10 6.5h8" />
        <path d="M10 17.5h8" />
      </svg>
    );
  }

  // 12. GitLab (Must be evaluated BEFORE 'git' to prevent false positive substring match)
  if (n.includes('gitlab')) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`${className} ${useBrandColor ? 'text-[#FC6D26]' : ''}`}
        aria-label="GitLab Logo"
      >
        <path d="M23.955 13.587l-1.342-4.135-2.664-8.189c-.135-.423-.73-.423-.867 0L16.418 9.45H7.582L4.918 1.263c-.136-.423-.731-.423-.867 0L1.386 9.452.044 13.587c-.121.375.014.789.331 1.023L12 23.054l11.625-8.443c.318-.235.453-.647.33-1.024" />
      </svg>
    );
  }

  // 13. GitHub
  if (n.includes('github')) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-label="GitHub Logo"
      >
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    );
  }

  // 14. Git
  if (n.includes('git')) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`${className} ${useBrandColor ? 'text-[#F05032]' : ''}`}
        aria-label="Git Logo"
      >
        <path d="M23.546 10.93L13.067.452a1.5 1.5 0 0 0-2.122 0L8.78 2.618l2.903 2.903a1.782 1.782 0 0 1 2.25 2.25l2.793 2.794a1.782 1.782 0 1 1-1.06 1.06l-2.673-2.674v5.334a1.782 1.782 0 1 1-1.5 0V8.92a1.782 1.782 0 0 1-.954-2.338L7.697 3.7 0.454 10.94a1.5 1.5 0 0 0 0 2.122l10.48 10.48a1.5 1.5 0 0 0 2.122 0l10.48-10.48a1.5 1.5 0 0 0 0-2.132z" />
      </svg>
    );
  }

  // 15. Figma (Official 5-component geometry)
  if (n.includes('figma')) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`${className} ${useBrandColor ? 'text-[#F24E1E]' : ''}`}
        aria-label="Figma Logo"
      >
        <path d="M8.25 0A3.75 3.75 0 0 0 4.5 3.75 3.75 3.75 0 0 0 8.25 7.5H12V0H8.25zm0 7.5A3.75 3.75 0 0 0 4.5 11.25 3.75 3.75 0 0 0 8.25 15H12V7.5H8.25zm0 7.5A3.75 3.75 0 0 0 4.5 18.75 3.75 3.75 0 0 0 8.25 22.5 3.75 3.75 0 0 0 12 18.75V15H8.25zm7.5-15H12v7.5h3.75A3.75 3.75 0 0 0 19.5 3.75 3.75 3.75 0 0 0 15.75 0zm0 7.5A3.75 3.75 0 1 0 19.5 11.25 3.75 3.75 0 0 0 15.75 7.5z" />
      </svg>
    );
  }

  // 16. Linux (Official Tux silhouette with eyes, beak & belly)
  if (n.includes('linux')) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`${className} ${useBrandColor ? 'text-[#FCC624]' : ''}`}
        aria-label="Linux Logo"
      >
        <path d="M12 2c-3.1 0-4.8 2.1-4.8 5 0 1.2.3 2.5.8 3.5-1.9 1-3.2 2.9-3.5 5.1-.4 2.2.3 4.2 2 5.2 1.1.7 2.6.8 4 .3.8-.3 1.7-.8 2.5-1.4.8.6 1.7 1.1 2.5 1.4 1.4.5 2.9.4 4-.3 1.7-1 2.4-3 2-5.2-.3-2.2-1.6-4.1-3.5-5.1.5-1 .8-2.3.8-3.5C18.8 4.1 17.1 2 12 2zm-1.8 4c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm3.6 0c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm-1.8 2.2c1.2 0 1.8.6 1.8 1.2 0 .8-1 1.4-1.8 1.4s-1.8-.6-1.8-1.4c0-.6.6-1.2 1.8-1.2zm0 4.3c2.5 0 4.2 1.8 4.2 4.2 0 1.8-1.5 3-4.2 3s-4.2-1.2-4.2-3c0-2.4 1.7-4.2 4.2-4.2z" />
      </svg>
    );
  }

  // 17. Docker (Sharp separated 9-box container grid + whale with eye)
  if (n.includes('docker')) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`${className} ${useBrandColor ? 'text-[#2496ED]' : ''}`}
        aria-label="Docker Logo"
      >
        {/* Tier 3 (Puncak): 1 box */}
        <rect x="7.8" y="3.2" width="2.6" height="2.2" rx="0.3" />
        {/* Tier 2 (Tengah): 3 boxes */}
        <rect x="4.6" y="6.1" width="2.6" height="2.2" rx="0.3" />
        <rect x="7.8" y="6.1" width="2.6" height="2.2" rx="0.3" />
        <rect x="11.0" y="6.1" width="2.6" height="2.2" rx="0.3" />
        {/* Tier 1 (Dasar): 5 boxes */}
        <rect x="1.4" y="9.0" width="2.6" height="2.2" rx="0.3" />
        <rect x="4.6" y="9.0" width="2.6" height="2.2" rx="0.3" />
        <rect x="7.8" y="9.0" width="2.6" height="2.2" rx="0.3" />
        <rect x="11.0" y="9.0" width="2.6" height="2.2" rx="0.3" />
        <rect x="14.2" y="9.0" width="2.6" height="2.2" rx="0.3" />
        {/* Badan Paus dengan Mata Tersenyum */}
        <path d="M23.6 12.6c-.5-.4-1.4-.6-2.3-.6-.3 0-.6 0-.8.1-.5-.9-1.4-1.5-2.5-1.5-.7 0-1.4.3-1.9.7-.5-.3-1.1-.4-1.8-.4-.3 0-.6 0-.9.1H1.2c-.4 0-.7.3-.7.7 0 2.4.9 4.6 2.5 6.1 2.3 2.1 5.6 2.6 9 2.6 7 0 11.5-3.6 12-8.5.1-.2 0-.4-.2-.5l-.2-.1zM19.5 14.8c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z" />
      </svg>
    );
  }

  // 18. Node.js
  if (n.includes('node') || n.includes('express')) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`${className} ${useBrandColor ? 'text-[#5FA04E]' : ''}`}
        aria-label="Node.js Logo"
      >
        <path d="M12 2L2.5 7.5v9L12 22l9.5-5.5v-9L12 2zm0 2.2l7.5 4.3v7l-7.5 4.3-7.5-4.3v-7L12 4.2zm-1 4.3v6.5h2V8.5h-2z" />
      </svg>
    );
  }

  // 19. JavaScript
  if (n.includes('javascript') || n === 'js') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`${className} ${useBrandColor ? 'text-[#F7DF1E]' : ''}`}
        aria-label="JavaScript Logo"
      >
        <path d="M1.5 1.5h21v21h-21z" fillOpacity="0.12" />
        <path d="M2 2h20v20H2V2zm13.7 13.9c.5.8 1.2 1.3 2.3 1.3 1 0 1.6-.5 1.6-1.2 0-.8-.7-1.1-1.8-1.6l-.6-.3c-1.8-.8-3-1.7-3-3.7 0-1.9 1.4-3.3 3.6-3.3 1.6 0 2.7.5 3.5 1.9l-1.8 1.2c-.4-.7-.9-1-1.7-1-.8 0-1.3.5-1.3 1.1 0 .7.5 1 1.6 1.5l.6.3c2.1.9 3.3 1.8 3.3 3.9 0 2.2-1.7 3.5-4 3.5-2.2 0-3.6-1-4.3-2.4l1.9-1.2zm-7.6.2c.4.6.8 1.1 1.7 1.1.9 0 1.5-.4 1.5-1.9v-7.1h2.3v7.1c0 2.6-1.5 3.7-3.7 3.7-2 0-3.1-1-3.7-2.3l1.9-1.2z" />
      </svg>
    );
  }

  // 20. Framer Motion
  if (n.includes('framer')) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`${className} ${useBrandColor ? 'text-[#0055FF]' : ''}`}
        aria-label="Framer Motion Logo"
      >
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
      </svg>
    );
  }

  // 21. CI/CD Pipeline
  if (n.includes('ci') || n.includes('cd') || n.includes('pipeline') || n.includes('otomatisasi')) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} ${useBrandColor ? 'text-[#2088FF]' : ''}`}
        aria-label="CI/CD Pipeline Logo"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M10 8l6 4-6 4V8z" fill="currentColor" />
        <path d="M3 12h3" />
        <path d="M18 12h3" />
      </svg>
    );
  }

  // 22. Postman (Official API Platform Logo)
  if (n.includes('postman')) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`${className} ${useBrandColor ? 'text-[#FF6C37]' : ''}`}
        aria-label="Postman Logo"
      >
        <path d="M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.471 7.485a.855.855 0 0 0-.593.25l-4.453 4.453-.307-.307-.643-.643c4.389-4.376 5.18-4.418 5.996-3.753zm-4.863 4.861l4.44-4.44a.62.62 0 1 1 .847.903l-4.699 4.125-.588-.588zm.33.694l-1.1.238a.06.06 0 0 1-.067-.032.06.06 0 0 1 .01-.073l.645-.645.512.512zm-2.803-.459l1.172-1.172.879.878-1.979.426a.074.074 0 0 1-.085-.039.072.072 0 0 1 .013-.093zm-3.646 6.058a.076.076 0 0 1-.069-.083.077.077 0 0 1 .022-.046h.002l.946-.946 1.222 1.222-2.123-.147zm2.425-1.256a.228.228 0 0 0-.117.256l.203.865a.125.125 0 0 1-.211.117h-.003l-.934-.934-.294-.295 3.762-3.758 1.82-.393.874.874c-1.255 1.102-2.971 2.201-5.1 3.268zm5.279-3.428h-.002l-.839-.839 4.699-4.125a.952.952 0 0 0 .119-.127c-.148 1.345-2.029 3.245-3.977 5.091zm3.657-6.46l-.003-.002a1.822 1.822 0 0 1 2.459-2.684l-1.61 1.613a.119.119 0 0 0 0 .169l1.247 1.247a1.817 1.817 0 0 1-2.093-.343zm2.578 0a1.714 1.714 0 0 1-.271.218h-.001l-1.207-1.207 1.533-1.533c.661.72.637 1.832-.054 2.522zM18.855 6.05a.143.143 0 0 0-.053.157.416.416 0 0 1-.053.45.14.14 0 0 0 .023.197.141.141 0 0 0 .084.03.14.14 0 0 0 .106-.05.691.691 0 0 0 .087-.751.138.138 0 0 0-.194-.033z" />
      </svg>
    );
  }

  // 23. Swagger (OpenAPI Specification Logo)
  if (n.includes('swagger') || n.includes('openapi')) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`${className} ${useBrandColor ? 'text-[#85EA2D]' : ''}`}
        aria-label="Swagger Logo"
      >
        <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12c6.616 0 12-5.383 12-12S18.616 0 12 0zm0 1.144c5.995 0 10.856 4.86 10.856 10.856 0 5.995-4.86 10.856-10.856 10.856-5.996 0-10.856-4.86-10.856-10.856C1.144 6.004 6.004 1.144 12 1.144zM8.37 5.868a6.707 6.707 0 0 0-.423.005c-.983.056-1.573.517-1.735 1.472-.115.665-.096 1.348-.143 2.017-.013.35-.05.697-.115 1.038-.134.609-.397.798-1.016.83a2.65 2.65 0 0 0-.244.042v1.463c1.126.055 1.278.452 1.37 1.629.033.429-.013.858.015 1.287.018.406.073.808.156 1.2.259 1.075 1.307 1.435 2.575 1.218v-1.283c-.203 0-.383.005-.558 0-.43-.013-.591-.12-.632-.535-.056-.535-.042-1.08-.075-1.62-.064-1.001-.175-1.988-1.153-2.625.503-.37.868-.812.983-1.398.083-.41.134-.821.166-1.237.028-.415-.023-.84.014-1.25.06-.665.102-.937.9-.91.12 0 .235-.017.369-.027v-1.31c-.16 0-.31-.004-.454-.006zm7.593.009a4.247 4.247 0 0 0-.813.06v1.274c.245 0 .434 0 .623.005.328.004.577.13.61.494.032.332.031.669.064 1.006.065.669.101 1.347.217 2.007.102.544.475.95.941 1.283-.817.549-1.057 1.333-1.098 2.215-.023.604-.037 1.213-.069 1.822-.028.554-.222.734-.78.748-.157.004-.31.018-.484.028v1.305c.327 0 .627.019.927 0 .932-.055 1.495-.507 1.68-1.412.078-.498.124-1 .138-1.504.032-.461.028-.927.074-1.384.069-.715.397-1.01 1.112-1.057a.972.972 0 0 0 .199-.046v-1.463c-.12-.014-.204-.027-.291-.032-.536-.023-.804-.203-.937-.71a5.146 5.146 0 0 1-.152-.993c-.037-.618-.033-1.241-.074-1.86-.08-1.192-.794-1.753-1.887-1.786zm-6.89 5.28a.844.844 0 0 0-.083 1.684h.055a.83.83 0 0 0 .877-.78v-.046a.845.845 0 0 0-.83-.858zm2.911 0a.808.808 0 0 0-.834.78c0 .027 0 .05.004.078 0 .503.342.826.859.826.507 0 .826-.332.826-.853-.005-.503-.342-.836-.855-.831zm2.963 0a.861.861 0 0 0-.876.835c0 .47.378.849.849.849h.009c.425.074.853-.337.881-.83.023-.457-.392-.854-.863-.854z" />
      </svg>
    );
  }

  // Fallback: Terminal / Code icon
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Code Icon"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
};