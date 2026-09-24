import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
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

export class JsonDataRepository implements DataRepository {
  private dataFilePath: string;
  private backupDir: string;
  private writeLock: boolean = false;

  constructor() {
    this.dataFilePath = path.resolve(process.cwd(), 'data/appdata.json');
    this.backupDir = path.resolve(process.cwd(), 'data/backups');
    this.ensureDirs();
  }

  private ensureDirs() {
    if (!fsSync.existsSync(path.dirname(this.dataFilePath))) {
      fsSync.mkdirSync(path.dirname(this.dataFilePath), { recursive: true });
    }
    if (!fsSync.existsSync(this.backupDir)) {
      fsSync.mkdirSync(this.backupDir, { recursive: true });
    }
  }

  async getData(): Promise<AppData> {
    try {
      const content = await fs.readFile(this.dataFilePath, 'utf-8');
      return JSON.parse(content) as AppData;
    } catch (error) {
      console.error('Error reading appdata.json:', error);
      throw new Error('Failed to load application data');
    }
  }

  async saveData(data: AppData, triggerBackup: boolean = true): Promise<void> {
    while (this.writeLock) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    this.writeLock = true;
    try {
      if (triggerBackup) {
        await this.createBackup();
      }
      const serialized = JSON.stringify(data, null, 2);
      const tempPath = `${this.dataFilePath}.tmp-${Date.now()}`;
      await fs.writeFile(tempPath, serialized, 'utf-8');
      await fs.rename(tempPath, this.dataFilePath);
    } catch (err) {
      console.error('Failed to save appdata safely:', err);
      throw err;
    } finally {
      this.writeLock = false;
    }
  }

  async createBackup(): Promise<string> {
    try {
      this.ensureDirs();
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFilename = `appdata-${timestamp}.json`;
      const backupPath = path.join(this.backupDir, backupFilename);
      if (fsSync.existsSync(this.dataFilePath)) {
        await fs.copyFile(this.dataFilePath, backupPath);
      }
      // Prune old backups if more than 30
      const files = await fs.readdir(this.backupDir);
      const jsonBackups = files.filter(f => f.startsWith('appdata-') && f.endsWith('.json')).sort();
      if (jsonBackups.length > 30) {
        const toDelete = jsonBackups.slice(0, jsonBackups.length - 30);
        for (const file of toDelete) {
          await fs.unlink(path.join(this.backupDir, file)).catch(() => {});
        }
      }
      return backupFilename;
    } catch (e) {
      console.warn('Backup creation notice:', e);
      return '';
    }
  }

  async listBackups(): Promise<string[]> {
    try {
      this.ensureDirs();
      const files = await fs.readdir(this.backupDir);
      return files.filter(f => f.startsWith('appdata-') && f.endsWith('.json')).sort().reverse();
    } catch (e) {
      return [];
    }
  }

  async restoreBackup(filename: string): Promise<boolean> {
    // Validate filename against path traversal
    const safeFilename = path.basename(filename);
    const backupPath = path.join(this.backupDir, safeFilename);
    if (!fsSync.existsSync(backupPath)) {
      return false;
    }
    const content = await fs.readFile(backupPath, 'utf-8');
    const parsed = JSON.parse(content);
    if (!parsed.site || !parsed.home) {
      throw new Error('Invalid backup schema');
    }
    await this.saveData(parsed, true);
    return true;
  }

  async getSite(): Promise<SiteData> {
    const data = await this.getData();
    return data.site;
  }

  async updateSite(site: Partial<SiteData>): Promise<SiteData> {
    const data = await this.getData();
    data.site = { ...data.site, ...site };
    await this.saveData(data);
    return data.site;
  }

  async getHome(): Promise<HomeData> {
    const data = await this.getData();
    return data.home;
  }

  async updateHome(home: Partial<HomeData>): Promise<HomeData> {
    const data = await this.getData();
    data.home = { ...data.home, ...home };
    await this.saveData(data);
    return data.home;
  }

  async getAbout(): Promise<AboutData> {
    const data = await this.getData();
    return data.about;
  }

  async updateAbout(about: Partial<AboutData>): Promise<AboutData> {
    const data = await this.getData();
    data.about = { ...data.about, ...about };
    await this.saveData(data);
    return data.about;
  }

  async getServices(): Promise<ServiceItem[]> {
    const data = await this.getData();
    return data.services.sort((a, b) => a.order - b.order);
  }

  async addService(service: Omit<ServiceItem, 'id'>): Promise<ServiceItem> {
    const data = await this.getData();
    const newService: ServiceItem = {
      ...service,
      id: `srv-${Date.now()}`
    };
    data.services.push(newService);
    await this.saveData(data);
    return newService;
  }

  async updateService(id: string, service: Partial<ServiceItem>): Promise<ServiceItem> {
    const data = await this.getData();
    const index = data.services.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Service not found');
    data.services[index] = { ...data.services[index], ...service };
    await this.saveData(data);
    return data.services[index];
  }

  async deleteService(id: string): Promise<boolean> {
    const data = await this.getData();
    const initialLen = data.services.length;
    data.services = data.services.filter(s => s.id !== id);
    if (data.services.length !== initialLen) {
      await this.saveData(data);
      return true;
    }
    return false;
  }

  async getPortfolio(): Promise<PortfolioProject[]> {
    const data = await this.getData();
    return data.portfolio.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async getProjectBySlug(slug: string): Promise<PortfolioProject | null> {
    const data = await this.getData();
    const match = data.portfolio.find(p => p.slug === slug);
    return match || null;
  }

  async addProject(project: Omit<PortfolioProject, 'id' | 'createdAt' | 'updatedAt'>): Promise<PortfolioProject> {
    const data = await this.getData();
    const newProject: PortfolioProject = {
      ...project,
      id: `port-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    data.portfolio.push(newProject);
    await this.saveData(data);
    return newProject;
  }

  async updateProject(id: string, project: Partial<PortfolioProject>): Promise<PortfolioProject> {
    const data = await this.getData();
    const index = data.portfolio.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Project not found');
    data.portfolio[index] = {
      ...data.portfolio[index],
      ...project,
      updatedAt: new Date().toISOString()
    };
    await this.saveData(data);
    return data.portfolio[index];
  }

  async deleteProject(id: string): Promise<boolean> {
    const data = await this.getData();
    const initialLen = data.portfolio.length;
    data.portfolio = data.portfolio.filter(p => p.id !== id);
    if (data.portfolio.length !== initialLen) {
      await this.saveData(data);
      return true;
    }
    return false;
  }

  async getTestimonials(): Promise<TestimonialItem[]> {
    const data = await this.getData();
    return data.testimonials.sort((a, b) => a.order - b.order);
  }

  async addTestimonial(item: Omit<TestimonialItem, 'id'>): Promise<TestimonialItem> {
    const data = await this.getData();
    const newTestimonial: TestimonialItem = {
      ...item,
      id: `test-${Date.now()}`
    };
    data.testimonials.push(newTestimonial);
    await this.saveData(data);
    return newTestimonial;
  }

  async updateTestimonial(id: string, item: Partial<TestimonialItem>): Promise<TestimonialItem> {
    const data = await this.getData();
    const index = data.testimonials.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Testimonial not found');
    data.testimonials[index] = { ...data.testimonials[index], ...item };
    await this.saveData(data);
    return data.testimonials[index];
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    const data = await this.getData();
    const initialLen = data.testimonials.length;
    data.testimonials = data.testimonials.filter(t => t.id !== id);
    if (data.testimonials.length !== initialLen) {
      await this.saveData(data);
      return true;
    }
    return false;
  }

  async getFaqs(): Promise<FaqItem[]> {
    const data = await this.getData();
    return data.faqs.sort((a, b) => a.order - b.order);
  }

  async addFaq(faq: Omit<FaqItem, 'id'>): Promise<FaqItem> {
    const data = await this.getData();
    const newFaq: FaqItem = {
      ...faq,
      id: `faq-${Date.now()}`
    };
    data.faqs.push(newFaq);
    await this.saveData(data);
    return newFaq;
  }

  async updateFaq(id: string, faq: Partial<FaqItem>): Promise<FaqItem> {
    const data = await this.getData();
    const index = data.faqs.findIndex(f => f.id === id);
    if (index === -1) throw new Error('FAQ not found');
    data.faqs[index] = { ...data.faqs[index], ...faq };
    await this.saveData(data);
    return data.faqs[index];
  }

  async deleteFaq(id: string): Promise<boolean> {
    const data = await this.getData();
    const initialLen = data.faqs.length;
    data.faqs = data.faqs.filter(f => f.id !== id);
    if (data.faqs.length !== initialLen) {
      await this.saveData(data);
      return true;
    }
    return false;
  }

  async getContact(): Promise<ContactData> {
    const data = await this.getData();
    return data.contact;
  }

  async updateContact(contact: Partial<ContactData>): Promise<ContactData> {
    const data = await this.getData();
    data.contact = { ...data.contact, ...contact };
    await this.saveData(data);
    return data.contact;
  }

  async getSeo(): Promise<SeoSettings> {
    const data = await this.getData();
    return data.seo;
  }

  async updateSeo(seo: Partial<SeoSettings>): Promise<SeoSettings> {
    const data = await this.getData();
    data.seo = { ...data.seo, ...seo };
    await this.saveData(data);
    return data.seo;
  }

  async getAiSettings(): Promise<AiSettings> {
    const data = await this.getData();
    return data.ai;
  }

  async updateAiSettings(ai: Partial<AiSettings>): Promise<AiSettings> {
    const data = await this.getData();
    data.ai = { ...data.ai, ...ai };
    await this.saveData(data);
    return data.ai;
  }

  async getEnquiries(): Promise<EnquiryItem[]> {
    const data = await this.getData();
    return data.enquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async addEnquiry(enquiry: Omit<EnquiryItem, 'id' | 'createdAt' | 'status'>): Promise<EnquiryItem> {
    const data = await this.getData();
    const newEnquiry: EnquiryItem = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'new'
    };
    data.enquiries.push(newEnquiry);
    await this.saveData(data, false); // don't need backup for user inquiry
    return newEnquiry;
  }

  async updateEnquiryStatus(id: string, status: EnquiryItem['status']): Promise<EnquiryItem> {
    const data = await this.getData();
    const index = data.enquiries.findIndex(e => e.id === id);
    if (index === -1) throw new Error('Enquiry not found');
    data.enquiries[index].status = status;
    await this.saveData(data, false);
    return data.enquiries[index];
  }

  async deleteEnquiry(id: string): Promise<boolean> {
    const data = await this.getData();
    const initialLen = data.enquiries.length;
    data.enquiries = data.enquiries.filter(e => e.id !== id);
    if (data.enquiries.length !== initialLen) {
      await this.saveData(data, false);
      return true;
    }
    return false;
  }

  async getMedia(): Promise<MediaItem[]> {
    const data = await this.getData();
    return data.media || [];
  }

  async addMedia(media: MediaItem): Promise<MediaItem> {
    const data = await this.getData();
    if (!data.media) data.media = [];
    data.media.unshift(media);
    await this.saveData(data);
    return media;
  }

  async deleteMedia(id: string): Promise<boolean> {
    const data = await this.getData();
    if (!data.media) return false;
    const initialLen = data.media.length;
    data.media = data.media.filter(m => m.id !== id);
    if (data.media.length !== initialLen) {
      await this.saveData(data);
      return true;
    }
    return false;
  }
}
