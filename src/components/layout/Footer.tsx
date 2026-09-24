import React from 'react';
import { ArrowUpRight, MapPin, Phone, Mail, MessageSquare } from 'lucide-react';
import { ContactData } from '../../types';

interface FooterProps {
  contact: ContactData;
  onNavigate: (view: string, sectionId?: string) => void;
}

export function Footer({ contact, onNavigate }: FooterProps) {
  const cleanPhone = contact.phone.replace(/[^0-9]/g, '');

  return (
    <footer className="border-t border-slate-200 bg-[#0B1E30] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Col 1: Brand & Positioning */}
          <div className="lg:col-span-2">
            <img
              src="/logo-white.svg"
              alt="DIGEGAIN Logo"
              className="h-10 w-auto"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">
              Modern Websites. Built for Business Growth. DIGEGAIN builds high-performance service websites, booking systems, order systems, dashboards, and AI-enabled digital experiences.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {contact.social.facebook && (
                <a
                  href={contact.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-slate-300 transition-colors hover:bg-[#1E89C1] hover:text-white"
                  aria-label="Facebook"
                >
                  <span className="text-xs font-bold">FB</span>
                </a>
              )}
              {contact.social.instagram && (
                <a
                  href={contact.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-slate-300 transition-colors hover:bg-[#F37B20] hover:text-white"
                  aria-label="Instagram"
                >
                  <span className="text-xs font-bold">IG</span>
                </a>
              )}
              {contact.social.linkedin && (
                <a
                  href={contact.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-slate-300 transition-colors hover:bg-[#1E89C1] hover:text-white"
                  aria-label="LinkedIn"
                >
                  <span className="text-xs font-bold">IN</span>
                </a>
              )}
              {contact.social.youtube && (
                <a
                  href={contact.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-slate-300 transition-colors hover:bg-red-600 hover:text-white"
                  aria-label="YouTube"
                >
                  <span className="text-xs font-bold">YT</span>
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-[#38BDF8] uppercase">
              Navigation
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('home', 'hero')}
                  className="transition-colors hover:text-white"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'what-we-build')}
                  className="transition-colors hover:text-white"
                >
                  What We Build
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="transition-colors hover:text-white"
                >
                  Portfolio Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'why-digegain')}
                  className="transition-colors hover:text-white"
                >
                  Why DIGEGAIN
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="transition-colors hover:text-white"
                >
                  Contact &amp; Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Specialized Systems */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-[#F37B20] uppercase">
              Web Systems
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
              <li>Service Business Websites</li>
              <li>Doctor &amp; Clinic Booking</li>
              <li>Restaurant Table Booking</li>
              <li>Hotel &amp; Resort Portals</li>
              <li>Product &amp; Order Catalogs</li>
              <li>Operations Dashboards</li>
              <li>AI-Enabled Chatbots</li>
            </ul>
          </div>

          {/* Col 4: Contact & Location */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-[#42A83D] uppercase">
              Office &amp; Reach
            </h4>
            <div className="mt-4 space-y-3 text-xs leading-relaxed text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#38BDF8]" />
                <span>
                  {contact.address}, {contact.city}, {contact.state} {contact.country}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-[#42A83D]" />
                <a href={`tel:${cleanPhone}`} className="hover:text-white">
                  {contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="h-4 w-4 shrink-0 text-[#42A83D]" />
                <a
                  href={`https://wa.me/${cleanPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  WhatsApp Consultation
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-[#F37B20]" />
                <a href={`mailto:${contact.email}`} className="hover:text-white">
                  {contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-slate-800 pt-8 text-xs text-slate-400 sm:flex-row">
          <div>
            © 2026 DIGEGAIN Technologies. All rights reserved. Built for Business Growth.
          </div>
          <div className="mt-4 flex items-center gap-6 sm:mt-0">
            <a
              href={contact.googleBusinessProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#38BDF8] hover:underline"
            >
              View us on Google
            </a>
            <button
              onClick={() => onNavigate('admin')}
              className="text-slate-500 hover:text-slate-300"
            >
              Admin Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
