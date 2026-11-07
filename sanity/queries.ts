export const groq = (strings: TemplateStringsArray, ...values: any[]) =>
  strings.reduce((result, str, i) => result + str + (values[i] || ''), '');

export const portfolioQuery = groq`{
  "profile": *[_type == "profile"][0]{
    name,
    kanjiName,
    title,
    subtitle,
    bio,
    quote,
    coordinates,
    "avatarUrl": avatar.asset->url,
    "resumeUrl": resume.asset->url,
    socialLinks
  },
  "projects": *[_type == "project"] | order(order asc, _createdAt desc){
    _id,
    title,
    japaneseTitle,
    "slug": slug.current,
    description,
    longDescription,
    "coverImage": coalesce(coverImage.asset->url, coverImage, ""),
    tags,
    demoUrl,
    repoUrl,
    featured,
    order,
    epoch
  },
  "experiences": *[_type == "experience"] | order(order asc, _createdAt desc){
    _id,
    role,
    company,
    location,
    period,
    isCurrent,
    description,
    highlights,
    skills,
    order
  },
  "educations": *[_type == "education"] | order(order asc, _createdAt desc){
    _id,
    institution,
    degree,
    field,
    period,
    description,
    highlights,
    order
  },
  "techStack": *[_type == "techStack"] | order(order asc, _createdAt asc){
    name,
    category,
    categoryLabel,
    level,
    iconName,
    description
  },
  "siteSettings": *[_type == "siteSettings"][0]{
    title,
    description,
    astronomyQuote,
    email,
    location,
    hankoText
  }
}`;
