import React, { useState } from 'react';
import {
  Calendar,
  Briefcase,
  ShoppingBag,
  BarChart3,
  Cpu,
  Sparkles,
  ArrowRight,
  Check,
  Building2,
  ChevronRight
} from 'lucide-react';
import { ServiceItem } from '../../types';

interface WhatWeBuildSectionProps {
  services: ServiceItem[];
  heading?: string;
  subtitle?: string;
  onSelectService: (service: ServiceItem) => void;
  onStartProject: () => void;
}

export function WhatWeBuildSection({
  services,
  heading = 'What We Build',
  subtitle = 'Engineered digital systems specifically designed to turn online attention into verifiable revenue and automated workflows.',
  onSelectService,
  onStartProject
}: WhatWeBuildSectionProps) {
  const [activeTabId, setActiveTabId] = useState<string>(services[0]?.id || 'srv-1');

  const activeService = services.find((s) => s.id === activeTabId) || services[0];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Calendar':
        return <Calendar className="h-5 w-5" />;
      case 'ShoppingBag':
        return <ShoppingBag className="h-5 w-5" />;
      case 'BarChart3':
        return <BarChart3 className="h-5 w-5" />;
      case 'Cpu':
        return <Cpu className="h-5 w-5" />;
      case 'Sparkles':
        return <Sparkles className="h-5 w-5" />;
      default:
        return <Briefcase className="h-5 w-5" />;
    }
  };

  return (
    <section id="what-we-build" className="border-t border-slate-200/80 bg-[#F1F8FC]/50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1E89C1]">
            <span className="h-2 w-2 rounded-full bg-[#1E89C1]" />
            <span className="tracking-widest uppercase">Custom Web Systems</span>
          </div>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-[#102A43] sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            {subtitle}
          </p>
        </div>

        {/* Interactive Master-Detail Showcase */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Numbered Service List */}
          <div className="space-y-2 lg:col-span-5">
            {services.map((srv, idx) => {
              const isActive = srv.id === activeTabId;
              const formattedNum = String(idx + 1).padStart(2, '0');

              return (
                <button
                  key={srv.id}
                  onClick={() => setActiveTabId(srv.id)}
                  className={`w-full rounded-2xl p-4 text-left transition-all duration-200 ${
                    isActive
                      ? 'border border-[rgba(30,137,193,0.3)] bg-white shadow-md ring-1 ring-[#1E89C1]/20'
                      : 'border border-transparent bg-transparent hover:bg-white/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-mono font-bold tabular-nums ${isActive ? 'text-[#F37B20]' : 'text-slate-400'}`}>
                        {formattedNum}
                      </span>
                      <span className={`text-base font-bold ${isActive ? 'text-[#1E89C1]' : 'text-slate-800'}`}>
                        {srv.title}
                      </span>
                    </div>
                    <ChevronRight className={`h-4 w-4 transition-transform ${isActive ? 'text-[#1E89C1] translate-x-1' : 'text-slate-400'}`} />
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs text-slate-500 pl-7">
                    {srv.shortDesc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep Architectural Breakdown of Selected Service */}
          <div className="lg:col-span-7">
            {activeService && (
              <div className="rounded-3xl border border-[rgba(30,137,193,0.18)] bg-white p-6 shadow-xl sm:p-8">
                {/* Header */}
                <div className="flex items-start justify-between border-b border-slate-100 pb-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#1E89C1]">
                      {getIcon(activeService.icon)}
                      <span className="uppercase tracking-wider">Engineered Capability</span>
                    </div>
                    <h3 className="mt-2 font-display text-2xl font-bold text-[#102A43] sm:text-3xl">
                      {activeService.title}
                    </h3>
                  </div>
                  <button
                    onClick={onStartProject}
                    data-cursor="start"
                    className="hidden rounded-xl bg-[#F37B20] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#D9630E] sm:block"
                  >
                    Build This System
                  </button>
                </div>

                {/* Long Description */}
                <p className="mt-6 text-sm leading-relaxed text-slate-700 sm:text-base">
                  {activeService.longDesc}
                </p>

                {/* Visual System Architecture Preview */}
                <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50 shadow-inner">
                  <div className="flex items-center justify-between border-b border-slate-200/60 bg-white px-4 py-2.5 text-[11px] font-semibold text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#1E89C1]" />
                      <span>{activeService.title} Architecture</span>
                    </span>
                    <span className="font-mono text-xs text-[#F37B20]">Zero-Friction Conversion</span>
                  </div>
                  <img
                    src="/images/home-web-showcase.svg"
                    alt={`${activeService.title} Architecture Preview`}
                    className="h-44 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-52"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Grid: Core Capabilities & Measurable Outcomes */}
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Capabilities */}
                  <div className="rounded-2xl border border-slate-100 bg-[#F8FAFC] p-4">
                    <h4 className="text-xs font-bold tracking-wider text-[#102A43] uppercase">
                      Included Capabilities
                    </h4>
                    <ul className="mt-3 space-y-2 text-xs text-slate-600">
                      {activeService.capabilities?.map((cap, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1E89C1]" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Business Outcomes */}
                  <div className="rounded-2xl border border-[rgba(66,168,61,0.2)] bg-[#F0FDF4] p-4">
                    <h4 className="text-xs font-bold tracking-wider text-[#2E872A] uppercase">
                      Direct Business Impact
                    </h4>
                    <ul className="mt-3 space-y-2 text-xs text-slate-700">
                      {activeService.businessOutcomes?.map((out, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#42A83D]" />
                          <span className="font-medium">{out}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Target Industries */}
                {activeService.targetAudience && (
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Ideal For:
                    </span>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-700">
                      {activeService.targetAudience.map((aud, i) => (
                        <span
                          key={i}
                          className="rounded-lg bg-slate-100 px-2.5 py-1 font-medium text-slate-700"
                        >
                          {aud}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mobile CTA */}
                <div className="mt-6 pt-4 border-t border-slate-100 sm:hidden">
                  <button
                    onClick={onStartProject}
                    className="w-full rounded-xl bg-[#F37B20] py-3 text-xs font-bold text-white shadow-md"
                  >
                    Start Your Project with this System
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
