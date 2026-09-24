import React, { useState, useEffect } from 'react';
import { AppData, ServiceItem } from './types';
import { fetchAppData, checkAdminSession } from './lib/api';
import initialData from '../data/appdata.json';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/hero/HeroSection';
import { WhatWeBuildSection } from './components/services/WhatWeBuildSection';
import { ProblemSolutionSection } from './components/services/ProblemSolutionSection';
import { AiCapabilitiesSection } from './components/services/AiCapabilitiesSection';
import { WhyDigegainSection } from './components/services/WhyDigegainSection';
import { ProcessSection } from './components/services/ProcessSection';
import { PortfolioSection } from './components/portfolio/PortfolioSection';
import { TestimonialsSection } from './components/testimonials/TestimonialsSection';
import { FaqSection } from './components/contact/FaqSection';
import { ContactSection } from './components/contact/ContactSection';
import { CustomCursor } from './components/ui/CustomCursor';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import { AiChatWidget } from './components/ui/AiChatWidget';
import { MobileStickyBar } from './components/ui/MobileStickyBar';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

export default function App() {
  const [data, setData] = useState<AppData>(initialData as unknown as AppData);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'home' | 'portfolio' | 'contact' | 'admin'>('home');
  const [adminUser, setAdminUser] = useState<any>(null);

  // Load fresh appdata from server
  const loadData = async () => {
    try {
      const serverData = await fetchAppData();
      if (serverData && serverData.site) {
        setData(serverData);
      }
    } catch (err) {
      console.warn('Falling back to local appdata state:', err);
    }
  };

  useEffect(() => {
    loadData();
    // Check if admin session exists
    checkAdminSession().then((res) => {
      if (res && res.authenticated) {
        setAdminUser(res.user);
      }
    });

    // Check hash for quick route
    if (window.location.pathname.startsWith('/admin')) {
      setView('admin');
    } else if (window.location.pathname.startsWith('/portfolio')) {
      setView('portfolio');
    } else if (window.location.pathname.startsWith('/contact')) {
      setView('contact');
    }
  }, []);

  const handleNavigate = (newView: string, sectionId?: string) => {
    if (newView === 'admin') {
      setView('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (newView === 'portfolio') {
      setView('portfolio');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (newView === 'contact') {
      setView('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Default to home
    setView('home');
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // If in Admin View
  if (view === 'admin') {
    if (!adminUser) {
      return (
        <AdminLogin
          onLoginSuccess={(user) => setAdminUser(user)}
          onBackToSite={() => setView('home')}
        />
      );
    }
    return (
      <AdminDashboard
        appData={data}
        onRefreshData={loadData}
        onLogout={() => setAdminUser(null)}
        onViewPublicSite={() => setView('home')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#1E89C1] selection:text-white">
      {/* Cinematic preloader */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Custom Precision Follower Cursor (auto-disabled on touch) */}
      <CustomCursor />

      {/* Sticky Brand Navigation Bar */}
      <Header currentView={view} onNavigate={handleNavigate} />

      {/* Main Page Views */}
      <main>
        {view === 'home' && (
          <>
            <HeroSection
              home={data.home}
              contact={data.contact}
              onNavigate={handleNavigate}
            />

            <WhatWeBuildSection
              services={data.services}
              onSelectService={() => handleNavigate('contact')}
              onStartProject={() => handleNavigate('contact')}
            />

            <ProblemSolutionSection
              onExploreSolutions={() => handleNavigate('contact')}
            />

            <AiCapabilitiesSection />

            <WhyDigegainSection />

            <ProcessSection />

            <PortfolioSection
              projects={data.portfolio}
              onStartProject={() => handleNavigate('contact')}
            />

            <TestimonialsSection testimonials={data.testimonials} />

            <FaqSection faqs={data.faqs} />

            <ContactSection contact={data.contact} />
          </>
        )}

        {view === 'portfolio' && (
          <PortfolioSection
            projects={data.portfolio}
            onStartProject={() => handleNavigate('contact')}
            standalone={true}
          />
        )}

        {view === 'contact' && (
          <ContactSection contact={data.contact} standalone={true} />
        )}
      </main>

      {/* Global Brand Footer */}
      <Footer contact={data.contact} onNavigate={handleNavigate} />

      {/* Floating Action Utilities */}
      <WhatsAppButton phone={data.contact.phone} />
      <AiChatWidget settings={data.ai} />

      {/* Mobile Sticky Bottom Bar (Call, WhatsApp, Enquire) */}
      <MobileStickyBar
        phone={data.contact.phone}
        whatsapp={data.contact.whatsapp}
        onEnquireClick={() => handleNavigate('contact')}
      />
    </div>
  );
}
