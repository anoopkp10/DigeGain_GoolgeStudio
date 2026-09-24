import React, { useState } from 'react';
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Briefcase,
  Layers,
  Star,
  HelpCircle,
  Phone,
  Search,
  Bot,
  Image as ImageIcon,
  Database,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Save,
  CheckCircle,
  ExternalLink,
  Upload,
  RefreshCw,
  Copy
} from 'lucide-react';
import {
  AppData,
  EnquiryItem,
  PortfolioProject,
  ServiceItem,
  TestimonialItem,
  FaqItem,
  MediaItem
} from '../../types';
import {
  adminLogout,
  updateHomeContent,
  updateAboutContent,
  updateContactContent,
  updateSeoContent,
  updateAiContent,
  savePortfolioProject,
  deletePortfolioProject,
  saveService,
  deleteService,
  saveTestimonial,
  deleteTestimonial,
  saveFaq,
  deleteFaq,
  updateEnquiryStatus,
  deleteEnquiry,
  uploadMediaFile,
  deleteMediaFile,
  createSystemBackup,
  fetchSystemBackups,
  restoreSystemBackup
} from '../../lib/api';

interface AdminDashboardProps {
  appData: AppData;
  onRefreshData: () => Promise<void>;
  onLogout: () => void;
  onViewPublicSite: () => void;
}

export function AdminDashboard({ appData, onRefreshData, onLogout, onViewPublicSite }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'enquiries' | 'home' | 'services' | 'portfolio' | 'testimonials' | 'faqs' | 'contact' | 'seo' | 'ai' | 'media' | 'backups'>('overview');
  const [saveStatus, setSaveStatus] = useState<string>('');

  // Editable local copies
  const [homeForm, setHomeForm] = useState(appData.home);
  const [contactForm, setContactForm] = useState(appData.contact);
  const [seoForm, setSeoForm] = useState(appData.seo);
  const [aiForm, setAiForm] = useState(appData.ai);

  // Portfolio edit state
  const [editingProject, setEditingProject] = useState<Partial<PortfolioProject> | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);

  // Service edit state
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);
  const [isNewService, setIsNewService] = useState(false);

  // Media state
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [copiedPath, setCopiedPath] = useState('');

  // Backup state
  const [backups, setBackups] = useState<string[]>([]);
  const [loadingBackups, setLoadingBackups] = useState(false);

  const showBanner = (msg: string) => {
    setSaveStatus(msg);
    setTimeout(() => setSaveStatus(''), 4000);
  };

  const handleLogout = async () => {
    await adminLogout();
    onLogout();
  };

  // Load backups when tab selected
  const handleTabChange = async (tab: any) => {
    setActiveTab(tab);
    if (tab === 'backups') {
      setLoadingBackups(true);
      try {
        const res = await fetchSystemBackups();
        if (res.success) setBackups(res.data);
      } finally {
        setLoadingBackups(false);
      }
    }
  };

  const handleSaveHome = async () => {
    try {
      const res = await updateHomeContent(homeForm);
      if (res.success) {
        showBanner('Home page content updated successfully');
        await onRefreshData();
      }
    } catch (e) {
      showBanner('Failed to save home content');
    }
  };

  const handleSaveContact = async () => {
    try {
      const res = await updateContactContent(contactForm);
      if (res.success) {
        showBanner('Contact and company information updated');
        await onRefreshData();
      }
    } catch (e) {
      showBanner('Failed to save contact info');
    }
  };

  const handleSaveSeo = async () => {
    try {
      const res = await updateSeoContent(seoForm);
      if (res.success) {
        showBanner('SEO and generative search settings updated');
        await onRefreshData();
      }
    } catch (e) {
      showBanner('Failed to save SEO');
    }
  };

  const handleSaveAi = async () => {
    try {
      const res = await updateAiContent(aiForm);
      if (res.success) {
        showBanner('AI configuration updated');
        await onRefreshData();
      }
    } catch (e) {
      showBanner('Failed to save AI settings');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingMedia(true);
    try {
      const res = await uploadMediaFile(file);
      if (res.success) {
        showBanner(`File "${file.name}" uploaded successfully`);
        await onRefreshData();
      }
    } catch (err) {
      showBanner('Failed to upload file');
    } finally {
      setUploadingMedia(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPath(text);
    setTimeout(() => setCopiedPath(''), 2000);
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-950/80 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo Brand */}
          <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img src="/logo-mark.svg" alt="DIGEGAIN" className="h-7 w-7" />
              <div>
                <span className="font-display font-bold text-sm text-white">DIGEGAIN</span>
                <span className="block text-[10px] text-[#1E89C1] font-mono">Control Panel</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-170px)] text-xs">
            <button
              onClick={() => handleTabChange('overview')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-colors ${
                activeTab === 'overview' ? 'bg-[#1E89C1] text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => handleTabChange('enquiries')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-colors ${
                activeTab === 'enquiries' ? 'bg-[#1E89C1] text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="h-4 w-4" />
                <span>Enquiries</span>
              </div>
              {appData.enquiries?.filter(e => e.status === 'new').length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-[#F37B20] text-white text-[10px] font-bold">
                  {appData.enquiries.filter(e => e.status === 'new').length}
                </span>
              )}
            </button>

            <button
              onClick={() => handleTabChange('home')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-colors ${
                activeTab === 'home' ? 'bg-[#1E89C1] text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Hero &amp; Home Content</span>
            </button>

            <button
              onClick={() => handleTabChange('services')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-colors ${
                activeTab === 'services' ? 'bg-[#1E89C1] text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Briefcase className="h-4 w-4" />
              <span>Services (What We Build)</span>
            </button>

            <button
              onClick={() => handleTabChange('portfolio')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-colors ${
                activeTab === 'portfolio' ? 'bg-[#1E89C1] text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Layers className="h-4 w-4" />
              <span>Portfolio Projects</span>
            </button>

            <button
              onClick={() => handleTabChange('testimonials')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-colors ${
                activeTab === 'testimonials' ? 'bg-[#1E89C1] text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Star className="h-4 w-4" />
              <span>Testimonials</span>
            </button>

            <button
              onClick={() => handleTabChange('faqs')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-colors ${
                activeTab === 'faqs' ? 'bg-[#1E89C1] text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <HelpCircle className="h-4 w-4" />
              <span>FAQs / AEO</span>
            </button>

            <button
              onClick={() => handleTabChange('contact')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-colors ${
                activeTab === 'contact' ? 'bg-[#1E89C1] text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Phone className="h-4 w-4" />
              <span>Company &amp; Contact</span>
            </button>

            <button
              onClick={() => handleTabChange('seo')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-colors ${
                activeTab === 'seo' ? 'bg-[#1E89C1] text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Search className="h-4 w-4" />
              <span>SEO, AEO &amp; GEO</span>
            </button>

            <button
              onClick={() => handleTabChange('ai')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-colors ${
                activeTab === 'ai' ? 'bg-[#1E89C1] text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Bot className="h-4 w-4" />
              <span>AI Engine Settings</span>
            </button>

            <button
              onClick={() => handleTabChange('media')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-colors ${
                activeTab === 'media' ? 'bg-[#1E89C1] text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <ImageIcon className="h-4 w-4" />
              <span>Media Library</span>
            </button>

            <button
              onClick={() => handleTabChange('backups')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-colors ${
                activeTab === 'backups' ? 'bg-[#1E89C1] text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Database className="h-4 w-4" />
              <span>System Backups</span>
            </button>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-slate-800/80 space-y-1">
          <button
            onClick={onViewPublicSite}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-400 hover:bg-slate-900 hover:text-white"
          >
            <span>View Public Site</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-900">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-950/40 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="font-display font-bold text-base text-white capitalize">
              {activeTab === 'home' ? 'Hero & Content Editor' : activeTab}
            </h2>
            {saveStatus && (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-[#42A83D] bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                <CheckCircle className="h-3.5 w-3.5" />
                <span>{saveStatus}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onRefreshData()}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs text-slate-300 hover:text-white"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Sync</span>
            </button>
          </div>
        </header>

        {/* Content Body Container */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                <div className="rounded-2xl border border-slate-800 bg-slate-800/40 p-5">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Total Inquiries</span>
                  <div className="mt-2 text-3xl font-extrabold text-[#1E89C1] font-display">
                    {appData.enquiries?.length || 0}
                  </div>
                  <span className="text-[11px] text-[#42A83D] font-medium">
                    {appData.enquiries?.filter(e => e.status === 'new').length || 0} new unread
                  </span>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-800/40 p-5">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Live Case Studies</span>
                  <div className="mt-2 text-3xl font-extrabold text-[#F37B20] font-display">
                    {appData.portfolio?.filter(p => p.status === 'published').length || 0}
                  </div>
                  <span className="text-[11px] text-slate-400">Published projects</span>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-800/40 p-5">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Engineered Systems</span>
                  <div className="mt-2 text-3xl font-extrabold text-[#42A83D] font-display">
                    {appData.services?.length || 0}
                  </div>
                  <span className="text-[11px] text-slate-400">Core offerings active</span>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-800/40 p-5">
                  <span className="text-xs text-slate-400 uppercase font-semibold">AI Assistant Status</span>
                  <div className="mt-2 text-2xl font-extrabold text-white font-display">
                    {appData.ai?.enabled ? 'Online' : 'Disabled'}
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Model: {appData.ai?.model || 'gemini-2.5-flash'}
                  </span>
                </div>
              </div>

              {/* Recent Inquiries Quick Table */}
              <div className="rounded-2xl border border-slate-800 bg-slate-800/40 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-base text-white">
                    Recent Customer Inquiries
                  </h3>
                  <button
                    onClick={() => setActiveTab('enquiries')}
                    className="text-xs text-[#1E89C1] hover:underline"
                  >
                    View All &rarr;
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-700 text-slate-400 uppercase text-[10px]">
                        <th className="py-2.5">Name / Business</th>
                        <th className="py-2.5">Phone / WhatsApp</th>
                        <th className="py-2.5">Requirement</th>
                        <th className="py-2.5">Date</th>
                        <th className="py-2.5">Status</th>
                        <th className="py-2.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {appData.enquiries?.slice(0, 5).map((enq) => (
                        <tr key={enq.id} className="hover:bg-slate-800/20">
                          <td className="py-3 font-semibold text-white">
                            {enq.name}
                            <span className="block text-[10px] text-slate-400 font-normal">
                              {enq.business || 'N/A'}
                            </span>
                          </td>
                          <td className="py-3 text-slate-300">
                            {enq.phone}
                          </td>
                          <td className="py-3 text-[#38BDF8]">
                            {enq.requirement}
                          </td>
                          <td className="py-3 text-slate-400">
                            {new Date(enq.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              enq.status === 'new' ? 'bg-red-500/20 text-red-400' :
                              enq.status === 'contacted' ? 'bg-amber-500/20 text-amber-400' :
                              'bg-emerald-500/20 text-emerald-400'
                            }`}>
                              {enq.status}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <a
                              href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-[#42A83D] hover:underline font-semibold"
                            >
                              WhatsApp
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ENQUIRIES */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-lg text-white">
                  Customer &amp; Project Inquiries ({appData.enquiries?.length || 0})
                </h3>
              </div>

              <div className="space-y-4">
                {appData.enquiries?.map((enq) => (
                  <div
                    key={enq.id}
                    className="rounded-2xl border border-slate-800 bg-slate-800/40 p-6 flex flex-col md:flex-row justify-between gap-6"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-display font-bold text-base text-white">
                          {enq.name}
                        </h4>
                        {enq.business && (
                          <span className="text-xs text-slate-400 font-medium">
                            · {enq.business}
                          </span>
                        )}
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          enq.status === 'new' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                          enq.status === 'contacted' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {enq.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                        <span>Phone: <strong className="text-slate-200">{enq.phone}</strong></span>
                        <span>Email: <strong className="text-slate-200">{enq.email}</strong></span>
                        <span>Domain: <strong className="text-slate-200">{enq.businessType}</strong></span>
                        <span>Requirement: <strong className="text-[#F37B20]">{enq.requirement}</strong></span>
                      </div>

                      {enq.message && (
                        <p className="mt-2 text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                          {enq.message}
                        </p>
                      )}

                      <span className="text-[10px] text-slate-500 block">
                        Received: {new Date(enq.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex md:flex-col justify-end gap-2 shrink-0">
                      <a
                        href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(enq.name)},%20this%20is%20DIGEGAIN%20regarding%20your%20inquiry.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 rounded-xl bg-[#42A83D] px-4 py-2 text-xs font-bold text-white hover:bg-[#389433]"
                      >
                        <MessageSquare className="h-3.5 w-3.5 fill-white stroke-none" />
                        <span>Reply on WhatsApp</span>
                      </a>

                      <select
                        value={enq.status}
                        onChange={async (e) => {
                          await updateEnquiryStatus(enq.id, e.target.value as any);
                          await onRefreshData();
                        }}
                        className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white"
                      >
                        <option value="new">Mark New</option>
                        <option value="contacted">Mark Contacted</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>

                      <button
                        onClick={async () => {
                          if (confirm('Delete this inquiry?')) {
                            await deleteEnquiry(enq.id);
                            await onRefreshData();
                          }
                        }}
                        className="flex items-center justify-center gap-1 rounded-xl border border-red-500/20 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: HOME EDITOR */}
          {activeTab === 'home' && (
            <div className="max-w-4xl space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-800/40 p-6 space-y-5">
                <h3 className="font-display font-bold text-base text-white">
                  Hero Section Text &amp; CTAs
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-300">
                    Badge Eyebrow Text
                  </label>
                  <input
                    type="text"
                    value={homeForm.hero.badge}
                    onChange={(e) => setHomeForm({
                      ...homeForm,
                      hero: { ...homeForm.hero, badge: e.target.value }
                    })}
                    className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300">
                    Main Headline
                  </label>
                  <input
                    type="text"
                    value={homeForm.hero.headline}
                    onChange={(e) => setHomeForm({
                      ...homeForm,
                      hero: { ...homeForm.hero, headline: e.target.value }
                    })}
                    className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300">
                    Subheadline
                  </label>
                  <input
                    type="text"
                    value={homeForm.hero.subheadline}
                    onChange={(e) => setHomeForm({
                      ...homeForm,
                      hero: { ...homeForm.hero, subheadline: e.target.value }
                    })}
                    className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300">
                    Supporting Text
                  </label>
                  <textarea
                    rows={3}
                    value={homeForm.hero.supportingText}
                    onChange={(e) => setHomeForm({
                      ...homeForm,
                      hero: { ...homeForm.hero, supportingText: e.target.value }
                    })}
                    className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2.5 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300">Primary CTA</label>
                    <input
                      type="text"
                      value={homeForm.hero.primaryCtaText}
                      onChange={(e) => setHomeForm({
                        ...homeForm,
                        hero: { ...homeForm.hero, primaryCtaText: e.target.value }
                      })}
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300">Secondary CTA</label>
                    <input
                      type="text"
                      value={homeForm.hero.secondaryCtaText}
                      onChange={(e) => setHomeForm({
                        ...homeForm,
                        hero: { ...homeForm.hero, secondaryCtaText: e.target.value }
                      })}
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300">WhatsApp CTA</label>
                    <input
                      type="text"
                      value={homeForm.hero.whatsappText}
                      onChange={(e) => setHomeForm({
                        ...homeForm,
                        hero: { ...homeForm.hero, whatsappText: e.target.value }
                      })}
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSaveHome}
                  className="flex items-center gap-2 rounded-xl bg-[#1E89C1] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#156B97]"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Home Content</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-lg text-white">
                  Services (What We Build) ({appData.services?.length || 0})
                </h3>
                <button
                  onClick={() => {
                    setEditingService({
                      title: '',
                      shortDesc: '',
                      longDesc: '',
                      icon: 'Briefcase',
                      order: (appData.services?.length || 0) + 1,
                      capabilities: ['Real-time sync', 'Mobile-first design'],
                      businessOutcomes: ['Higher conversion', 'Lower bounce rate'],
                      targetAudience: ['Service businesses']
                    });
                    setIsNewService(true);
                  }}
                  className="flex items-center gap-1.5 rounded-xl bg-[#1E89C1] px-4 py-2 text-xs font-bold text-white"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Service</span>
                </button>
              </div>

              {editingService && (
                <div className="rounded-2xl border border-[#1E89C1]/50 bg-slate-800/80 p-6 space-y-4">
                  <h4 className="text-sm font-bold text-[#38BDF8]">
                    {isNewService ? 'Create New Service' : 'Edit Service'}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-300 font-bold">Title</label>
                      <input
                        type="text"
                        value={editingService.title}
                        onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-300 font-bold">Icon</label>
                      <select
                        value={editingService.icon}
                        onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                      >
                        <option value="Calendar">Calendar (Bookings)</option>
                        <option value="ShoppingBag">ShoppingBag (Orders/E-com)</option>
                        <option value="BarChart3">BarChart3 (Dashboards)</option>
                        <option value="Cpu">Cpu (AI Systems)</option>
                        <option value="Briefcase">Briefcase (General Services)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 font-bold">Short Summary</label>
                    <input
                      type="text"
                      value={editingService.shortDesc}
                      onChange={(e) => setEditingService({ ...editingService, shortDesc: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 font-bold">Long Architectural Description</label>
                    <textarea
                      rows={3}
                      value={editingService.longDesc}
                      onChange={(e) => setEditingService({ ...editingService, longDesc: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={async () => {
                        await saveService(editingService, isNewService);
                        setEditingService(null);
                        showBanner('Service saved');
                        await onRefreshData();
                      }}
                      className="rounded-xl bg-[#42A83D] px-4 py-2 text-xs font-bold text-white"
                    >
                      Save Service
                    </button>
                    <button
                      onClick={() => setEditingService(null)}
                      className="rounded-xl border border-slate-700 px-4 py-2 text-xs text-slate-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {appData.services?.map((srv) => (
                  <div
                    key={srv.id}
                    className="rounded-2xl border border-slate-800 bg-slate-800/40 p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-sm text-white">
                          {srv.title}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingService(srv);
                              setIsNewService(false);
                            }}
                            className="p-1 text-slate-400 hover:text-white"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={async () => {
                              if (confirm(`Delete service "${srv.title}"?`)) {
                                await deleteService(srv.id);
                                await onRefreshData();
                              }
                            }}
                            className="p-1 text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-slate-400">
                        {srv.shortDesc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-[#38BDF8]">
                      {srv.capabilities?.length || 0} capabilities configured
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PORTFOLIO */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-lg text-white">
                  Portfolio Case Studies ({appData.portfolio?.length || 0})
                </h3>
                <button
                  onClick={() => {
                    setEditingProject({
                      title: '',
                      slug: `project-${Date.now()}`,
                      client: '',
                      category: 'Booking Systems',
                      summary: '',
                      challenge: '',
                      solution: '',
                      coverImage: '/uploads/images/portfolio_malabar.svg',
                      features: ['Custom booking engine', 'Instant WhatsApp notifications'],
                      tags: ['React', 'Node.js', 'WhatsApp API'],
                      metric: { value: '+120%', label: 'Inbound Growth', context: 'in 90 days' },
                      displayOrder: (appData.portfolio?.length || 0) + 1,
                      featured: true,
                      status: 'published'
                    });
                    setIsNewProject(true);
                  }}
                  className="flex items-center gap-1.5 rounded-xl bg-[#F37B20] px-4 py-2 text-xs font-bold text-white"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Editing Form */}
              {editingProject && (
                <div className="rounded-2xl border border-[#F37B20]/40 bg-slate-800/80 p-6 space-y-4">
                  <h4 className="text-sm font-bold text-[#F37B20]">
                    {isNewProject ? 'Create Case Study' : 'Edit Case Study'}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs text-slate-300 font-bold">Title</label>
                      <input
                        type="text"
                        value={editingProject.title}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-300 font-bold">Client</label>
                      <input
                        type="text"
                        value={editingProject.client}
                        onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-300 font-bold">Category</label>
                      <select
                        value={editingProject.category}
                        onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                      >
                        <option value="Booking Systems">Booking Systems</option>
                        <option value="Service Business Websites">Service Business Websites</option>
                        <option value="Business Dashboards">Business Dashboards</option>
                        <option value="Order Systems">Order Systems</option>
                        <option value="Creative & Architecture">Creative & Architecture</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-300 font-bold">Cover Image Path</label>
                      <input
                        type="text"
                        value={editingProject.coverImage}
                        onChange={(e) => setEditingProject({ ...editingProject, coverImage: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-300 font-bold">Slug URL</label>
                      <input
                        type="text"
                        value={editingProject.slug}
                        onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 font-bold">Summary</label>
                    <textarea
                      rows={2}
                      value={editingProject.summary}
                      onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-300 font-bold">The Challenge</label>
                      <textarea
                        rows={3}
                        value={editingProject.challenge}
                        onChange={(e) => setEditingProject({ ...editingProject, challenge: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-300 font-bold">The Solution</label>
                      <textarea
                        rows={3}
                        value={editingProject.solution}
                        onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={async () => {
                        await savePortfolioProject(editingProject, isNewProject);
                        setEditingProject(null);
                        showBanner('Portfolio project saved');
                        await onRefreshData();
                      }}
                      className="rounded-xl bg-[#42A83D] px-4 py-2 text-xs font-bold text-white"
                    >
                      Save Project
                    </button>
                    <button
                      onClick={() => setEditingProject(null)}
                      className="rounded-xl border border-slate-700 px-4 py-2 text-xs text-slate-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Projects List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {appData.portfolio?.map((proj) => (
                  <div
                    key={proj.id}
                    className="rounded-2xl border border-slate-800 bg-slate-800/40 p-4 flex gap-4"
                  >
                    <img
                      src={proj.coverImage}
                      alt={proj.title}
                      className="w-24 h-24 rounded-xl object-cover shrink-0 bg-slate-900 border border-slate-700"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-display font-bold text-sm text-white truncate">
                          {proj.title}
                        </h4>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => {
                              setEditingProject(proj);
                              setIsNewProject(false);
                            }}
                            className="p-1 text-slate-400 hover:text-white"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={async () => {
                              if (confirm(`Delete project "${proj.title}"?`)) {
                                await deletePortfolioProject(proj.id);
                                await onRefreshData();
                              }
                            }}
                            className="p-1 text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {proj.client} · {proj.category}
                      </p>
                      <p className="mt-1 text-xs text-slate-300 line-clamp-2">
                        {proj.summary}
                      </p>
                      {proj.metric && (
                        <span className="mt-2 inline-block text-[10px] font-bold text-[#42A83D] bg-emerald-500/10 px-2 py-0.5 rounded-md">
                          {proj.metric.label}: {proj.metric.value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CONTACT & PROFILE */}
          {activeTab === 'contact' && (
            <div className="max-w-3xl space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-800/40 p-6 space-y-4">
                <h3 className="font-display font-bold text-base text-white">
                  Company &amp; Contact Info
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-300 font-bold">Phone Number</label>
                    <input
                      type="text"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 font-bold">Email Address</label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-bold">Office Address</label>
                  <input
                    type="text"
                    value={contactForm.address}
                    onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-slate-300 font-bold">City</label>
                    <input
                      type="text"
                      value={contactForm.city}
                      onChange={(e) => setContactForm({ ...contactForm, city: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 font-bold">State</label>
                    <input
                      type="text"
                      value={contactForm.state}
                      onChange={(e) => setContactForm({ ...contactForm, state: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 font-bold">Country</label>
                    <input
                      type="text"
                      value={contactForm.country}
                      onChange={(e) => setContactForm({ ...contactForm, country: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-bold">Google Business Profile URL</label>
                  <input
                    type="text"
                    value={contactForm.googleBusinessProfileUrl}
                    onChange={(e) => setContactForm({ ...contactForm, googleBusinessProfileUrl: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                  />
                </div>

                <button
                  onClick={handleSaveContact}
                  className="flex items-center gap-2 rounded-xl bg-[#1E89C1] px-5 py-2.5 text-xs font-bold text-white"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Contact Details</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 7: SEO / AEO / GEO */}
          {activeTab === 'seo' && (
            <div className="max-w-3xl space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-800/40 p-6 space-y-4">
                <h3 className="font-display font-bold text-base text-white">
                  SEO, AEO &amp; Generative Engine Optimization
                </h3>

                <div>
                  <label className="text-xs text-slate-300 font-bold">Default Page Title</label>
                  <input
                    type="text"
                    value={seoForm.defaultTitle}
                    onChange={(e) => setSeoForm({ ...seoForm, defaultTitle: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-bold">Meta Description</label>
                  <textarea
                    rows={3}
                    value={seoForm.defaultDescription}
                    onChange={(e) => setSeoForm({ ...seoForm, defaultDescription: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-300 font-bold">Canonical Base URL</label>
                    <input
                      type="text"
                      value={seoForm.canonicalUrl}
                      onChange={(e) => setSeoForm({ ...seoForm, canonicalUrl: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 font-bold">Google Analytics 4 ID</label>
                    <input
                      type="text"
                      value={seoForm.googleAnalyticsId}
                      onChange={(e) => setSeoForm({ ...seoForm, googleAnalyticsId: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSaveSeo}
                  className="flex items-center gap-2 rounded-xl bg-[#1E89C1] px-5 py-2.5 text-xs font-bold text-white"
                >
                  <Save className="h-4 w-4" />
                  <span>Save SEO Settings</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 8: AI SETTINGS */}
          {activeTab === 'ai' && (
            <div className="max-w-3xl space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-800/40 p-6 space-y-4">
                <h3 className="font-display font-bold text-base text-white">
                  AI Assistant &amp; Intelligence Gateway
                </h3>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="aiEnabled"
                    checked={aiForm.enabled}
                    onChange={(e) => setAiForm({ ...aiForm, enabled: e.target.checked })}
                    className="h-4 w-4 rounded text-[#1E89C1]"
                  />
                  <label htmlFor="aiEnabled" className="text-xs font-bold text-white">
                    Enable Public AI Assistant on Website
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-300 font-bold">AI Provider</label>
                    <select
                      value={aiForm.provider}
                      onChange={(e) => setAiForm({ ...aiForm, provider: e.target.value as any })}
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                    >
                      <option value="gemini">Google Gemini (Recommended)</option>
                      <option value="openai">OpenAI</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 font-bold">Model</label>
                    <input
                      type="text"
                      value={aiForm.model}
                      onChange={(e) => setAiForm({ ...aiForm, model: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-bold">Welcome Message</label>
                  <input
                    type="text"
                    value={aiForm.welcomeMessage}
                    onChange={(e) => setAiForm({ ...aiForm, welcomeMessage: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-bold">System Instructions</label>
                  <textarea
                    rows={5}
                    value={aiForm.systemInstructions}
                    onChange={(e) => setAiForm({ ...aiForm, systemInstructions: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                  />
                </div>

                <button
                  onClick={handleSaveAi}
                  className="flex items-center gap-2 rounded-xl bg-[#1E89C1] px-5 py-2.5 text-xs font-bold text-white"
                >
                  <Save className="h-4 w-4" />
                  <span>Save AI Configuration</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 9: MEDIA LIBRARY */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-white">
                    Media Library &amp; Asset Storage
                  </h3>
                  <p className="text-xs text-slate-400">
                    Upload images and videos (stored in /uploads with automatic web routing)
                  </p>
                </div>

                <label className="flex items-center gap-2 rounded-xl bg-[#1E89C1] px-4 py-2 text-xs font-bold text-white cursor-pointer hover:bg-[#156B97]">
                  <Upload className="h-4 w-4" />
                  <span>{uploadingMedia ? 'Uploading...' : 'Upload File'}</span>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={uploadingMedia}
                  />
                </label>
              </div>

              {copiedPath && (
                <div className="rounded-xl bg-emerald-500/20 border border-emerald-500/30 p-2.5 text-xs text-emerald-300 font-mono">
                  Copied path to clipboard: {copiedPath}
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {appData.media?.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-800 bg-slate-800/40 p-3 overflow-hidden flex flex-col justify-between"
                  >
                    <div className="aspect-[4/3] rounded-xl bg-slate-950 overflow-hidden flex items-center justify-center border border-slate-700">
                      {item.type.startsWith('video/') ? (
                        <video src={item.path} className="w-full h-full object-cover" />
                      ) : (
                        <img src={item.path} alt={item.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="mt-2.5">
                      <span className="block text-xs font-semibold text-white truncate" title={item.name}>
                        {item.name}
                      </span>
                      <span className="block text-[10px] text-slate-500 font-mono">
                        {(item.size / 1024).toFixed(1)} KB
                      </span>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between">
                      <button
                        onClick={() => handleCopy(item.path)}
                        className="text-[11px] text-[#38BDF8] hover:underline flex items-center gap-1"
                      >
                        <Copy className="h-3 w-3" />
                        <span>Copy Path</span>
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm(`Delete file "${item.name}"?`)) {
                            await deleteMediaFile(item.id);
                            await onRefreshData();
                          }
                        }}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: BACKUPS */}
          {activeTab === 'backups' && (
            <div className="max-w-3xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-white">
                    System Backups &amp; Disaster Recovery
                  </h3>
                  <p className="text-xs text-slate-400">
                    Create timestamped JSON snapshots and restore anytime.
                  </p>
                </div>
                <button
                  onClick={async () => {
                    const res = await createSystemBackup();
                    if (res.success) {
                      showBanner('Backup created: ' + res.filename);
                      const bList = await fetchSystemBackups();
                      if (bList.success) setBackups(bList.data);
                    }
                  }}
                  className="flex items-center gap-2 rounded-xl bg-[#42A83D] px-4 py-2 text-xs font-bold text-white hover:bg-[#389433]"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Snapshot Now</span>
                </button>
              </div>

              {loadingBackups ? (
                <div className="text-xs text-slate-400">Loading backups...</div>
              ) : (
                <div className="space-y-2">
                  {backups.map((bName) => (
                    <div
                      key={bName}
                      className="rounded-xl border border-slate-800 bg-slate-800/40 p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Database className="h-4 w-4 text-[#1E89C1]" />
                        <span className="font-mono text-xs text-slate-200">{bName}</span>
                      </div>
                      <button
                        onClick={async () => {
                          if (confirm(`Restore system to snapshot "${bName}"? Current state will be overwritten.`)) {
                            const res = await restoreSystemBackup(bName);
                            if (res.success) {
                              showBanner('Snapshot restored successfully');
                              await onRefreshData();
                            }
                          }
                        }}
                        className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 hover:text-white"
                      >
                        Restore
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 11: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <h3 className="font-display font-bold text-lg text-white">
                Client Testimonials ({appData.testimonials?.length || 0})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {appData.testimonials?.map((t) => (
                  <div key={t.id} className="rounded-2xl border border-slate-800 bg-slate-800/40 p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-white">{t.name}</div>
                      <div className="text-xs text-[#38BDF8]">{t.company}</div>
                    </div>
                    <p className="text-xs text-slate-300 italic">&ldquo;{t.quote}&rdquo;</p>
                    <div className="text-[10px] text-slate-500">Location: {t.location}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 12: FAQS */}
          {activeTab === 'faqs' && (
            <div className="space-y-6">
              <h3 className="font-display font-bold text-lg text-white">
                Frequently Answered Questions ({appData.faqs?.length || 0})
              </h3>
              <div className="space-y-3">
                {appData.faqs?.map((faq) => (
                  <div key={faq.id} className="rounded-xl border border-slate-800 bg-slate-800/40 p-4 space-y-1.5">
                    <h4 className="font-bold text-xs text-white">{faq.question}</h4>
                    <p className="text-xs text-slate-400">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
