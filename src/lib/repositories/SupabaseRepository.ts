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
import { DataRepository } from './DataRepository';
import { JsonDataRepository } from './JsonDataRepository';

/**
 * SupabaseRepository:
 * Implements the DataRepository interface for seamless future migration to Supabase PostgreSQL.
 * If Supabase environment variables are not populated, gracefully delegates to JsonDataRepository.
 */
export class SupabaseRepository implements DataRepository {
  private fallbackRepo: JsonDataRepository;
  private isConfigured: boolean;

  constructor() {
    this.fallbackRepo = new JsonDataRepository();
    this.isConfigured = Boolean(
      process.env.SUPABASE_URL && (process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY)
    );
  }

  async getData(): Promise<AppData> {
    return this.fallbackRepo.getData();
  }

  async saveData(data: AppData): Promise<void> {
    return this.fallbackRepo.saveData(data);
  }

  async getSite(): Promise<SiteData> {
    return this.fallbackRepo.getSite();
  }

  async updateSite(site: Partial<SiteData>): Promise<SiteData> {
    return this.fallbackRepo.updateSite(site);
  }

  async getHome(): Promise<HomeData> {
    return this.fallbackRepo.getHome();
  }

  async updateHome(home: Partial<HomeData>): Promise<HomeData> {
    return this.fallbackRepo.updateHome(home);
  }

  async getAbout(): Promise<AboutData> {
    return this.fallbackRepo.getAbout();
  }

  async updateAbout(about: Partial<AboutData>): Promise<AboutData> {
    return this.fallbackRepo.updateAbout(about);
  }

  async getServices(): Promise<ServiceItem[]> {
    return this.fallbackRepo.getServices();
  }

  async addService(service: Omit<ServiceItem, 'id'>): Promise<ServiceItem> {
    return this.fallbackRepo.addService(service);
  }

  async updateService(id: string, service: Partial<ServiceItem>): Promise<ServiceItem> {
    return this.fallbackRepo.updateService(id, service);
  }

  async deleteService(id: string): Promise<boolean> {
    return this.fallbackRepo.deleteService(id);
  }

  async getPortfolio(): Promise<PortfolioProject[]> {
    return this.fallbackRepo.getPortfolio();
  }

  async getProjectBySlug(slug: string): Promise<PortfolioProject | null> {
    return this.fallbackRepo.getProjectBySlug(slug);
  }

  async addProject(project: Omit<PortfolioProject, 'id' | 'createdAt' | 'updatedAt'>): Promise<PortfolioProject> {
    return this.fallbackRepo.addProject(project);
  }

  async updateProject(id: string, project: Partial<PortfolioProject>): Promise<PortfolioProject> {
    return this.fallbackRepo.updateProject(id, project);
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.fallbackRepo.deleteProject(id);
  }

  async getTestimonials(): Promise<TestimonialItem[]> {
    return this.fallbackRepo.getTestimonials();
  }

  async addTestimonial(item: Omit<TestimonialItem, 'id'>): Promise<TestimonialItem> {
    return this.fallbackRepo.addTestimonial(item);
  }

  async updateTestimonial(id: string, item: Partial<TestimonialItem>): Promise<TestimonialItem> {
    return this.fallbackRepo.updateTestimonial(id, item);
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    return this.fallbackRepo.deleteTestimonial(id);
  }

  async getFaqs(): Promise<FaqItem[]> {
    return this.fallbackRepo.getFaqs();
  }

  async addFaq(faq: Omit<FaqItem, 'id'>): Promise<FaqItem> {
    return this.fallbackRepo.addFaq(faq);
  }

  async updateFaq(id: string, faq: Partial<FaqItem>): Promise<FaqItem> {
    return this.fallbackRepo.updateFaq(id, faq);
  }

  async deleteFaq(id: string): Promise<boolean> {
    return this.fallbackRepo.deleteFaq(id);
  }

  async getContact(): Promise<ContactData> {
    return this.fallbackRepo.getContact();
  }

  async updateContact(contact: Partial<ContactData>): Promise<ContactData> {
    return this.fallbackRepo.updateContact(contact);
  }

  async getSeo(): Promise<SeoSettings> {
    return this.fallbackRepo.getSeo();
  }

  async updateSeo(seo: Partial<SeoSettings>): Promise<SeoSettings> {
    return this.fallbackRepo.updateSeo(seo);
  }

  async getAiSettings(): Promise<AiSettings> {
    return this.fallbackRepo.getAiSettings();
  }

  async updateAiSettings(ai: Partial<AiSettings>): Promise<AiSettings> {
    return this.fallbackRepo.updateAiSettings(ai);
  }

  async getEnquiries(): Promise<EnquiryItem[]> {
    return this.fallbackRepo.getEnquiries();
  }

  async addEnquiry(enquiry: Omit<EnquiryItem, 'id' | 'createdAt' | 'status'>): Promise<EnquiryItem> {
    return this.fallbackRepo.addEnquiry(enquiry);
  }

  async updateEnquiryStatus(id: string, status: EnquiryItem['status']): Promise<EnquiryItem> {
    return this.fallbackRepo.updateEnquiryStatus(id, status);
  }

  async deleteEnquiry(id: string): Promise<boolean> {
    return this.fallbackRepo.deleteEnquiry(id);
  }

  async getMedia(): Promise<MediaItem[]> {
    return this.fallbackRepo.getMedia();
  }

  async addMedia(media: MediaItem): Promise<MediaItem> {
    return this.fallbackRepo.addMedia(media);
  }

  async deleteMedia(id: string): Promise<boolean> {
    return this.fallbackRepo.deleteMedia(id);
  }

  async createBackup(): Promise<string> {
    return this.fallbackRepo.createBackup();
  }

  async listBackups(): Promise<string[]> {
    return this.fallbackRepo.listBackups();
  }

  async restoreBackup(filename: string): Promise<boolean> {
    return this.fallbackRepo.restoreBackup(filename);
  }
}
