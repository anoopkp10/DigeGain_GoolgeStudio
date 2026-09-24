export interface SiteData {
  name: string;
  tagline: string;
  description: string;
  url: string;
  logo: string;
  logoMark: string;
}

export interface HomeData {
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    supportingText: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
    whatsappText: string;
    highlightMetrics: { value: string; label: string; subtext: string }[];
  };
  whatWeBuildHeading: string;
  whatWeBuildSubtitle: string;
  businessProblemsHeading: string;
  businessProblemsSubtitle: string;
  solutionsHeading: string;
  solutionsSubtitle: string;
  aiHeading: string;
  aiSubtitle: string;
  aiDescription: string;
  processHeading: string;
  processSubtitle: string;
  whyChooseHeading: string;
  whyChooseSubtitle: string;
  ctaHeading: string;
  ctaSubtitle: string;
  ctaButtonText: string;
}

export interface AboutData {
  title: string;
  subtitle: string;
  description: string;
  mission: string;
  vision: string;
  approach: string;
  location: string;
  values: { title: string; desc: string }[];
}

export interface ServiceItem {
  id: string;
  order: number;
  title: string;
  slug?: string;
  shortDesc: string;
  longDesc: string;
  icon: string;
  capabilities: string[];
  businessOutcomes: string[];
  targetAudience: string[];
  active?: boolean;
  featured?: boolean;
}

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  client: string;
  category: string;
  shortDescription?: string;
  summary?: string;
  description?: string;
  challenge?: string;
  solution?: string;
  features: string[];
  coverImage: string;
  images?: string[];
  videos?: string[];
  websiteUrl?: string;
  demoUrl?: string;
  technologies?: string[];
  tags?: string[];
  year?: string;
  featured?: boolean;
  status: 'published' | 'draft';
  displayOrder: number;
  seoTitle?: string;
  seoDescription?: string;
  resultsMetric?: string;
  metric?: {
    label: string;
    value: string;
    context: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  business?: string;
  company?: string;
  role: string;
  avatar: string;
  quote: string;
  result?: string;
  location?: string;
  rating: number;
  active?: boolean;
  order: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order: number;
  active?: boolean;
}

export interface ContactData {
  companyName: string;
  phone: string;
  whatsapp: string;
  whatsappMessage: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  businessHours: string;
  googleMapsUrl: string;
  googleBusinessProfileUrl: string;
  social: {
    facebook: string;
    instagram: string;
    youtube: string;
    linkedin: string;
    twitter?: string;
  };
}

export interface EnquiryItem {
  id: string;
  name: string;
  business: string;
  phone: string;
  email: string;
  businessType: string;
  requirement: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'completed' | 'in_progress';
}

export interface SeoSettings {
  siteTitle: string;
  siteDescription: string;
  canonicalUrl: string;
  ogImage: string;
  googleVerification?: string;
  gaMeasurementId?: string;
  defaultTitle?: string;
  defaultDescription?: string;
  googleAnalyticsId?: string;
}

export interface AiSettings {
  enabled: boolean;
  provider: 'gemini' | 'openai';
  model: string;
  systemInstructions: string;
  welcomeMessage: string;
  suggestedPrompts: string[];
}

export interface MediaItem {
  id: string;
  name: string;
  path: string;
  size: number;
  type: string;
  uploadedAt: string;
}

export interface AppData {
  site: SiteData;
  home: HomeData;
  about: AboutData;
  services: ServiceItem[];
  portfolio: PortfolioProject[];
  testimonials: TestimonialItem[];
  faqs: FaqItem[];
  contact: ContactData;
  seo: SeoSettings;
  ai: AiSettings;
  media: MediaItem[];
  enquiries: EnquiryItem[];
}
