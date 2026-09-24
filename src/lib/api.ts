import { AppData, EnquiryItem, MediaItem, PortfolioProject, ServiceItem, TestimonialItem, FaqItem } from '../types';

export async function fetchAppData(): Promise<AppData> {
  const res = await fetch('/api/appdata');
  if (!res.ok) throw new Error('Failed to load application data');
  const json = await res.json();
  return json.data;
}

export async function submitEnquiry(payload: {
  name: string;
  business?: string;
  phone: string;
  email: string;
  businessType: string;
  requirement: string;
  message: string;
  honeypot?: string;
}): Promise<{ success: boolean; message: string; enquiryId?: string }> {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function sendChatMessage(messages: { role: string; content: string }[]): Promise<string> {
  const res = await fetch('/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages })
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || 'Chat error');
  return json.reply;
}

// Admin API calls
export async function adminLogin(email: string, password: string) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

export async function adminLogout() {
  const res = await fetch('/api/auth/logout', { method: 'POST' });
  return res.json();
}

export async function checkAdminSession() {
  const res = await fetch('/api/auth/session');
  return res.json();
}

export async function updateHomeContent(homeData: any) {
  const res = await fetch('/api/home', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(homeData)
  });
  return res.json();
}

export async function updateAboutContent(aboutData: any) {
  const res = await fetch('/api/about', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(aboutData)
  });
  return res.json();
}

export async function updateContactContent(contactData: any) {
  const res = await fetch('/api/contact', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactData)
  });
  return res.json();
}

export async function updateSeoContent(seoData: any) {
  const res = await fetch('/api/seo', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(seoData)
  });
  return res.json();
}

export async function updateAiContent(aiData: any) {
  const res = await fetch('/api/ai', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(aiData)
  });
  return res.json();
}

export async function savePortfolioProject(project: Partial<PortfolioProject>, isNew: boolean) {
  const url = isNew ? '/api/portfolio' : `/api/portfolio/${project.id}`;
  const method = isNew ? 'POST' : 'PUT';
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project)
  });
  return res.json();
}

export async function deletePortfolioProject(id: string) {
  const res = await fetch(`/api/portfolio/${id}`, { method: 'DELETE' });
  return res.json();
}

export async function saveService(service: Partial<ServiceItem>, isNew: boolean) {
  const url = isNew ? '/api/services' : `/api/services/${service.id}`;
  const method = isNew ? 'POST' : 'PUT';
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(service)
  });
  return res.json();
}

export async function deleteService(id: string) {
  const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
  return res.json();
}

export async function saveTestimonial(testimonial: Partial<TestimonialItem>, isNew: boolean) {
  const url = isNew ? '/api/testimonials' : `/api/testimonials/${testimonial.id}`;
  const method = isNew ? 'POST' : 'PUT';
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testimonial)
  });
  return res.json();
}

export async function deleteTestimonial(id: string) {
  const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
  return res.json();
}

export async function saveFaq(faq: Partial<FaqItem>, isNew: boolean) {
  const url = isNew ? '/api/faqs' : `/api/faqs/${faq.id}`;
  const method = isNew ? 'POST' : 'PUT';
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(faq)
  });
  return res.json();
}

export async function deleteFaq(id: string) {
  const res = await fetch(`/api/faqs/${id}`, { method: 'DELETE' });
  return res.json();
}

export async function updateEnquiryStatus(id: string, status: EnquiryItem['status']) {
  const res = await fetch(`/api/enquiries/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  return res.json();
}

export async function deleteEnquiry(id: string) {
  const res = await fetch(`/api/enquiries/${id}`, { method: 'DELETE' });
  return res.json();
}

export async function uploadMediaFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch('/api/media/upload', {
    method: 'POST',
    body: formData
  });
  return res.json();
}

export async function deleteMediaFile(id: string) {
  const res = await fetch(`/api/media/${id}`, { method: 'DELETE' });
  return res.json();
}

export async function createSystemBackup() {
  const res = await fetch('/api/backups/create', { method: 'POST' });
  return res.json();
}

export async function fetchSystemBackups() {
  const res = await fetch('/api/backups');
  return res.json();
}

export async function restoreSystemBackup(filename: string) {
  const res = await fetch('/api/backups/restore', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename })
  });
  return res.json();
}
