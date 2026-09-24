import {
  AppData,
  SiteData,
  HomeData,
  AboutData,
  ServiceItem,
  PortfolioProject,
  TestimonialItem,
  FaqItem,
  ContactData,
  SeoSettings,
  AiSettings,
  EnquiryItem,
  MediaItem
} from '../../types';

export interface DataRepository {
  getData(): Promise<AppData>;
  saveData(data: AppData): Promise<void>;

  getSite(): Promise<SiteData>;
  updateSite(site: Partial<SiteData>): Promise<SiteData>;

  getHome(): Promise<HomeData>;
  updateHome(home: Partial<HomeData>): Promise<HomeData>;

  getAbout(): Promise<AboutData>;
  updateAbout(about: Partial<AboutData>): Promise<AboutData>;

  getServices(): Promise<ServiceItem[]>;
  addService(service: Omit<ServiceItem, 'id'>): Promise<ServiceItem>;
  updateService(id: string, service: Partial<ServiceItem>): Promise<ServiceItem>;
  deleteService(id: string): Promise<boolean>;

  getPortfolio(): Promise<PortfolioProject[]>;
  getProjectBySlug(slug: string): Promise<PortfolioProject | null>;
  addProject(project: Omit<PortfolioProject, 'id' | 'createdAt' | 'updatedAt'>): Promise<PortfolioProject>;
  updateProject(id: string, project: Partial<PortfolioProject>): Promise<PortfolioProject>;
  deleteProject(id: string): Promise<boolean>;

  getTestimonials(): Promise<TestimonialItem[]>;
  addTestimonial(item: Omit<TestimonialItem, 'id'>): Promise<TestimonialItem>;
  updateTestimonial(id: string, item: Partial<TestimonialItem>): Promise<TestimonialItem>;
  deleteTestimonial(id: string): Promise<boolean>;

  getFaqs(): Promise<FaqItem[]>;
  addFaq(faq: Omit<FaqItem, 'id'>): Promise<FaqItem>;
  updateFaq(id: string, faq: Partial<FaqItem>): Promise<FaqItem>;
  deleteFaq(id: string): Promise<boolean>;

  getContact(): Promise<ContactData>;
  updateContact(contact: Partial<ContactData>): Promise<ContactData>;

  getSeo(): Promise<SeoSettings>;
  updateSeo(seo: Partial<SeoSettings>): Promise<SeoSettings>;

  getAiSettings(): Promise<AiSettings>;
  updateAiSettings(ai: Partial<AiSettings>): Promise<AiSettings>;

  getEnquiries(): Promise<EnquiryItem[]>;
  addEnquiry(enquiry: Omit<EnquiryItem, 'id' | 'createdAt' | 'status'>): Promise<EnquiryItem>;
  updateEnquiryStatus(id: string, status: EnquiryItem['status']): Promise<EnquiryItem>;
  deleteEnquiry(id: string): Promise<boolean>;

  getMedia(): Promise<MediaItem[]>;
  addMedia(media: MediaItem): Promise<MediaItem>;
  deleteMedia(id: string): Promise<boolean>;

  createBackup(): Promise<string>;
  listBackups(): Promise<string[]>;
  restoreBackup(filename: string): Promise<boolean>;
}
