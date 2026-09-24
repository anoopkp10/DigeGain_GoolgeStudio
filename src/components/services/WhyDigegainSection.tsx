import React from 'react';
import { Check, X, Shield, Smartphone, Zap, Sparkles, Search, Layers } from 'lucide-react';

export function WhyDigegainSection() {
  const pillars = [
    {
      icon: <Layers className="h-5 w-5 text-[#1E89C1]" />,
      title: 'Modern Bespoke Design',
      desc: 'Crafted from the ground up for your specific brand identity. Never recycled cookie-cutter WordPress or Elementor templates.'
    },
    {
      icon: <Zap className="h-5 w-5 text-[#F37B20]" />,
      title: 'Sub-Second Page Speeds',
      desc: 'Engineered with clean React/Node architecture and edge asset distribution. Loads in under 1.2 seconds even on modest 4G mobile networks.'
    },
    {
      icon: <Smartphone className="h-5 w-5 text-[#42A83D]" />,
      title: 'Mobile-First Touch Ergonomics',
      desc: 'Over 70% of business visitors use smartphones. Our thumb-friendly actions, tap-to-call, and one-tap WhatsApp integration eliminate booking friction.'
    },
    {
      icon: <Search className="h-5 w-5 text-[#1E89C1]" />,
      title: 'SEO + AEO + GEO Ready',
      desc: 'Pre-indexed for Google, local search maps, and generative search engines (Gemini, ChatGPT, Perplexity) with native Schema.org JSON-LD microdata.'
    },
    {
      icon: <Shield className="h-5 w-5 text-[#F37B20]" />,
      title: 'Direct Business Operations',
      desc: 'Seamless connections to your WhatsApp, staff calendars, CRM, and order pipelines. Your website becomes an active worker, not just an expense.'
    },
    {
      icon: <Sparkles className="h-5 w-5 text-[#42A83D]" />,
      title: 'Transparent Pricing & Ownership',
      desc: 'Zero lock-in traps or hidden recurring agency fees. You own 100% of your source code, domain, media assets, and customer database.'
    }
  ];

  const comparison = [
    {
      feature: 'Performance & Page Load Speed',
      digegain: 'Under 1.2s (Custom Code)',
      agency: '3.5s – 7.0s (Bloated Themes)',
      diy: '4.0s – 8.0s (Third-party scripts)'
    },
    {
      feature: 'Mobile-First Ergonomics & WhatsApp',
      digegain: 'Bespoke one-tap flows & token routing',
      agency: 'Generic floating button widget',
      diy: 'Basic external link or iframe'
    },
    {
      feature: 'AEO / Generative Engine Readiness',
      digegain: 'Native JSON-LD + LLM discovery maps',
      agency: 'Standard meta tags only',
      diy: 'None or auto-generated boilerplate'
    },
    {
      feature: 'Bespoke Booking & Order Engine',
      digegain: 'Custom real-time database flow',
      agency: 'High monthly plugin subscription',
      diy: 'Rigid generic third-party widget'
    },
    {
      feature: 'Code & Data Ownership',
      digegain: '100% Client Owned (Zero Lock-in)',
      agency: 'Often locked to proprietary host',
      diy: 'Rented platform (Cannot export)'
    }
  ];

  return (
    <section id="why-digegain" className="py-24 bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1E89C1]">
            <span className="h-2 w-2 rounded-full bg-[#F37B20]" />
            <span className="tracking-widest uppercase">The DIGEGAIN Standard</span>
          </div>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-[#102A43] sm:text-4xl">
            Technology With a Business Purpose
          </h2>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            We reject the bloated, slow agency standard. Every line of code, design choice, and automation we build directly serves your customer acquisition and revenue growth.
          </p>
        </div>

        {/* 6 Key Pillars Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pil, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:border-[#1E89C1]/40 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50">
                {pil.icon}
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-[#102A43]">
                {pil.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                {pil.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Regional Hub & Worldwide Execution Visual Banner */}
        <div className="mt-16 overflow-hidden rounded-3xl border border-slate-800 bg-[#081827] shadow-xl">
          <img
            src="/images/kerala-innovation-hub.svg"
            alt="DIGEGAIN Kochi Infopark Engineering Hub to Global Execution"
            className="h-auto w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Uncompromising Comparison Table */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-display text-2xl font-bold text-[#102A43]">
              How DIGEGAIN Compares
            </h3>
            <p className="mt-2 text-xs text-slate-500">
              A transparent breakdown against traditional agencies and DIY website builders.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="p-4 sm:px-6">Core Capability</th>
                  <th className="p-4 sm:px-6 text-[#1E89C1] bg-[#F1F8FC]/60">DIGEGAIN Engineered</th>
                  <th className="p-4 sm:px-6">Generic Agency</th>
                  <th className="p-4 sm:px-6">DIY Builders (Wix/Squarespace)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {comparison.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="p-4 sm:px-6 font-semibold text-slate-900">
                      {row.feature}
                    </td>
                    <td className="p-4 sm:px-6 font-bold text-[#1E89C1] bg-[#F1F8FC]/30">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-[#42A83D] shrink-0" />
                        <span>{row.digegain}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:px-6 text-slate-500">
                      {row.agency}
                    </td>
                    <td className="p-4 sm:px-6 text-slate-400">
                      {row.diy}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
