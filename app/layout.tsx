import type { Metadata, Viewport } from 'next';
import { Cinzel, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { LanguageProvider } from '@/components/i18n/LanguageProvider';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dzikry-portofolio.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Muhammad Dzikry Fikry — Software Engineer & Web Developer',
    template: '%s | Muhammad Dzikry Fikry',
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/favicon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        url: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    shortcut: '/favicon.ico',
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  description:
    'Portofolio resmi Muhammad Dzikry Fikry, Software Engineer & Web Developer yang berfokus pada pengembangan sistem web modern, Next.js, Go, dan arsitektur backend terukur.',
  keywords: [
    'Muhammad Dzikry Fikry',
    'Dzikry',
    'Dzikry Fikry',
    'DzikryFy',
    'Software Engineer Depok',
    'Full Stack Developer Indonesia',
    'Next.js',
    'Golang',
    'Web Developer',
    'Frontend Developer',
    'Backend Developer',
    'Sanity CMS',
  ],
  authors: [{ name: 'Muhammad Dzikry Fikry', url: 'https://github.com/DzikryFy' }],
  creator: 'Muhammad Dzikry Fikry',
  publisher: 'Muhammad Dzikry Fikry',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'profile',
    locale: 'id_ID',
    url: siteUrl,
    siteName: 'Muhammad Dzikry Fikry Portfolio',
    title: 'Muhammad Dzikry Fikry — Software Engineer & Web Developer',
    description:
      'Portofolio resmi Muhammad Dzikry Fikry, Software Engineer & Web Developer yang berfokus pada pengembangan sistem web modern, Next.js, Go, dan arsitektur backend terukur.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Muhammad Dzikry Fikry — Software Engineer & Web Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Dzikry Fikry — Software Engineer & Web Developer',
    description:
      'Portofolio resmi Muhammad Dzikry Fikry, Software Engineer & Web Developer yang berfokus pada pengembangan sistem web modern, Next.js, Go, dan arsitektur backend terukur.',
    images: ['/og-image.png'],
    creator: '@DzikryFy',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'bnRx9WgON4-NKNTBL5WqGo4dd7mNbrvF_8HjzDhnN8Q',
  },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Muhammad Dzikry Fikry',
  alternateName: ['Dzikry', 'DzikryFy', 'Muhammad Dzikry'],
  url: siteUrl,
  image: `${siteUrl}/profile.png`,
  jobTitle: 'Software Engineer & Web Developer',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Depok',
    addressRegion: 'Jawa Barat',
    addressCountry: 'ID',
  },
  sameAs: [
    'https://github.com/DzikryFy',
    'https://www.linkedin.com/in/muhammad-dzikry-fikry',
    'https://twitter.com',
  ],
  knowsAbout: [
    'Next.js',
    'React',
    'TypeScript',
    'JavaScript',
    'Go',
    'PHP',
    'Laravel',
    'Docker',
    'Tailwind CSS',
    'Full Stack Web Development',
    'Sanity CMS',
    'System Architecture',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Muhammad Dzikry Fikry',
  alternateName: ['Dzikry', 'Dzikry Portofolio', 'DzikryFy'],
  url: siteUrl,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${cinzel.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var stored = localStorage.getItem('dzikry-theme');
                var theme = stored || 'light';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                  document.documentElement.style.colorScheme = 'dark';
                } else {
                  document.documentElement.classList.add('light');
                  document.documentElement.classList.remove('dark');
                  document.documentElement.style.colorScheme = 'light';
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="bg-void text-parchment antialiased selection:bg-brass selection:text-void-950 font-serif">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
