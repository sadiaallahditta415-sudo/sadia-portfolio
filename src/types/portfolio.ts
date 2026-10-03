export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  highlights: string[];
  technologies?: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location?: string;
  details?: string;
  honors?: string;
}

export interface SkillCategory {
  category: string;
  description?: string;
  items: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  role: string;
  year: string;
  technologies: string[];
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialId?: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    label: string;
    role: string;
    headline: string;
    shortIntro: string;
    aboutSummary: string;
    aboutPhilosophy: string;
    location: string;
    availability: string;
    email: string;
    phone?: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };
  experiences: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
}
