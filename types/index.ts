export interface Profile {
  name: string;
  kanjiName?: string;
  title: string;
  subtitle?: string;
  bio: string[];
  quote: {
    text: string;
    translation?: string;
    author?: string;
  };
  avatarUrl?: string;
  resumeUrl?: string;
  coordinates?: string; // e.g. "45°26'N 12°19'E — Celestial Epoch"
  phone?: string;
  location?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    email?: string;
    twitter?: string;
    phone?: string;
  };
}

export interface Project {
  _id: string;
  title: string;
  japaneseTitle?: string;
  slug: string;
  description: string;
  longDescription?: string;
  coverImage?: string;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean;
  order: number;
  epoch?: string; // e.g. "Cycle 2024"
}

export interface Experience {
  _id: string;
  role: string;
  company: string;
  location?: string;
  period: string; // e.g. "2023 — Present"
  isCurrent?: boolean;
  description: string;
  highlights: string[];
  skills: string[];
  order: number;
}

export interface Education {
  _id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
  description?: string;
  highlights?: string[];
  order: number;
}

export interface TechStackItem {
  name: string;
  category: 'core' | 'engine' | 'navigation'; // Core (Frontend), Engine (Backend/DB), Navigation (DevOps/Tools)
  categoryLabel?: string;
  level?: string; // e.g. "Mastered Ring", "Outer Orbit"
  iconName?: string;
  description?: string;
}

export interface SiteSettings {
  title: string;
  description: string;
  astronomyQuote: string;
  email: string;
  location: string;
  hankoText?: string;
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  experiences: Experience[];
  educations: Education[];
  techStack: TechStackItem[];
  siteSettings: SiteSettings;
}
