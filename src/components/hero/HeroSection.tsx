import React from 'react';
import { ArrowUpRight, MessageSquare, ShieldCheck, Zap } from 'lucide-react';
import { HomeData, ContactData } from '../../types';
import { HeroVisual } from './HeroVisual';

interface HeroSectionProps {
  home: HomeData;
  contact: ContactData;
  onNavigate: (view: string, sectionId?: string) => void;
}

export function HeroSection({ home, contact, onNavigate }: HeroSectionProps) {
  const cleanPhone = contact.phone.replace(/[^0-9]/g, '');

  return (
    <section id="hero" className="relative overflow-hidden pt-32 pb-20 lg:pt-36 lg:pb-28">
      {/* Decorative background grid and soft tints */}
      <div className="bg-tech-grid absolute inset-0 -z-10 opacity-70" />
      <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#1E89C1]/5 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 -z-10 h-80 w-80 rounded-full bg-[#F37B20]/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Proposition, Copy & CTAs */}
          <div className="lg:col-span-6 xl:col-span-7">
            {/* Clean Unboxed Eyebrow (Zero-Pill Discipline) */}
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-[#1E89C1]">
              <span className="h-2 w-2 rounded-full bg-[#F37B20]" />
              <span className="tracking-widest uppercase">
                {home.hero.badge || 'Digital Growth & AI Web Engineering'}
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500">Kochi &amp; Worldwide</span>
            </div>

            {/* Primary Headline */}
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-[#102A43] sm:text-5xl lg:text-6xl">
              Modern Websites.
              <span className="block text-[#1E89C1]">Built for Business Growth.</span>
            </h1>

            {/* Subheadline & Value Proposition */}
            <p className="mt-5 text-lg font-medium text-slate-700 sm:text-xl">
              {home.hero.subheadline}
            </p>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
              {home.hero.supportingText}
            </p>

            {/* Call To Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('contact')}
                data-cursor="start"
                className="flex items-center gap-2 rounded-xl bg-[#F37B20] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-[#D9630E] hover:shadow-xl active:scale-95"
              >
                <span>{home.hero.primaryCtaText || 'START YOUR PROJECT'}</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => onNavigate('portfolio')}
                data-cursor="view"
                className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:border-[#1E89C1] hover:text-[#1E89C1] active:scale-95"
              >
                <span>{home.hero.secondaryCtaText || 'EXPLORE OUR WORK'}</span>
              </button>

              <a
                href={`https://wa.me/${cleanPhone}?text=Hi%20DIGEGAIN,%20I%20am%20interested%20in%20discussing%20a%20website%20project.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-[#42A83D]/10 px-5 py-3.5 text-sm font-bold text-[#2E872A] transition-colors hover:bg-[#42A83D]/20 active:scale-95"
              >
                <MessageSquare className="h-4 w-4 fill-[#2E872A] stroke-none" />
                <span>{home.hero.whatsappText || 'Chat on WhatsApp'}</span>
              </a>
            </div>

            {/* Client Social Proof Avatar Strip */}
            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-slate-200/60 pt-6">
              <div className="flex -space-x-2">
                <img
                  src="/uploads/images/avatar_pradeep.svg"
                  alt="Dr. Pradeep Menon"
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white"
                  referrerPolicy="no-referrer"
                />
                <img
                  src="/uploads/images/avatar_shabnam.svg"
                  alt="Shabnam Kurian"
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white"
                  referrerPolicy="no-referrer"
                />
                <img
                  src="/uploads/images/avatar_alex.svg"
                  alt="Alex Roy"
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-500 text-xs">
                  {'★★★★★'}
                  <span className="ml-1 font-bold text-slate-800">4.9 / 5.0</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Trusted by 50+ clinics, salons &amp; enterprises across Kerala and GCC
                </p>
              </div>
            </div>

            {/* Trust Markers Bar */}
            <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#42A83D]" />
                <span>Zero bloated templates</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-[#F37B20]" />
                <span>Sub-second page speeds</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#1E89C1]" />
                <span>Direct WhatsApp &amp; Booking automation</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Interactive Visual Mockup */}
          <div className="lg:col-span-6 xl:col-span-5">
            <HeroVisual />
          </div>
        </div>

        {/* Quantified Business Metrics Bar (Adjacent to Hero Claim) */}
        <div className="mt-16 border-y border-slate-200/80 bg-white/70 py-8 backdrop-blur-sm">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {home.hero.highlightMetrics?.map((metric, i) => (
              <div key={i} className="flex flex-col border-slate-200 sm:border-r sm:last:border-r-0 sm:px-6">
                <span className="font-display text-3xl font-extrabold tabular-nums text-[#1E89C1] lg:text-4xl">
                  {metric.value}
                </span>
                <span className="mt-1 text-sm font-bold text-[#102A43]">
                  {metric.label}
                </span>
                <span className="text-xs text-slate-500">
                  {metric.subtext}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
