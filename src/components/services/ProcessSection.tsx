import React, { useState } from 'react';
import {
  Compass,
  FileCode,
  Layout,
  Code2,
  Share2,
  CheckCircle,
  Rocket,
  LineChart,
  ArrowRight
} from 'lucide-react';

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Discover',
      icon: <Compass className="h-5 w-5" />,
      tagline: 'Deep Business & Customer Profiling',
      desc: 'We analyze your core business model, target clientele, competitive advantages, current manual bottlenecks, and revenue goals.',
      deliverables: ['Client Persona Mapping', 'Competitor Gap Audit', 'Technical Requirement Scope']
    },
    {
      num: '02',
      title: 'Plan',
      icon: <FileCode className="h-5 w-5" />,
      tagline: 'Architecture & User Flow Specification',
      desc: 'Mapping out every page journey, conversion funnel, database schema, and third-party API integration before writing code.',
      deliverables: ['Information Architecture', 'Low-Fidelity Wireframes', 'Database & API Blueprint']
    },
    {
      num: '03',
      title: 'Design',
      icon: <Layout className="h-5 w-5" />,
      tagline: 'Bespoke UI & High-Conversion Ergonomics',
      desc: 'Pixel-perfect, custom-designed interfaces adhering to brand identity, strict typography hierarchy, zero generic templates, and mobile touch mechanics.',
      deliverables: ['High-Fidelity Figma Prototypes', 'Responsive Layout System', 'Interactive Component Kit']
    },
    {
      num: '04',
      title: 'Develop',
      icon: <Code2 className="h-5 w-5" />,
      tagline: 'High-Performance Clean Code Engineering',
      desc: 'Building with lightweight, modern stacks (React, TypeScript, Next.js, Node.js). Fast load times, clean modular architecture, and zero runtime bloat.',
      deliverables: ['Sub-second Frontend Engine', 'Secure REST/GraphQL Backend', 'Atomic Data Repository']
    },
    {
      num: '05',
      title: 'Integrate',
      icon: <Share2 className="h-5 w-5" />,
      tagline: 'Booking, WhatsApp, Payment & AI Systems',
      desc: 'Connecting your live operation channels: WhatsApp Business automation, doctor/table booking queues, payment gateways, and AI qualification routing.',
      deliverables: ['WhatsApp Dispatch API', 'Realtime Calendar Synchronization', 'Secure Payment Gateway']
    },
    {
      num: '06',
      title: 'Test',
      icon: <CheckCircle className="h-5 w-5" />,
      tagline: 'Rigorous Performance & Security Benchmarking',
      desc: 'Thorough multi-device cross-browser testing, mobile load stress tests, accessibility audits, and 100/100 Core Web Vitals verification.',
      deliverables: ['Core Web Vitals Pass Report', 'Security Audit & Input Sanitization', 'Cross-Browser Validation']
    },
    {
      num: '07',
      title: 'Launch',
      icon: <Rocket className="h-5 w-5" />,
      tagline: 'Zero-Downtime Deployment & SEO Indexing',
      desc: 'Smooth go-live with automated SSL certificates, Google Search Console & Analytics 4 registration, XML sitemaps, and Google Business verification.',
      deliverables: ['Production Edge CDN Launch', 'AEO / SEO Indexing Setup', 'Staff Onboarding & Training']
    },
    {
      num: '08',
      title: 'Improve',
      icon: <LineChart className="h-5 w-5" />,
      tagline: 'Continuous Analytics & Conversion Growth',
      desc: 'A website is a living asset. We monitor real visitor interaction, analyze heatmaps, refine conversion funnels, and iterate for continuous growth.',
      deliverables: ['Monthly Conversion Analytics', 'Speed & Security Maintenance', 'Ongoing Feature Iterations']
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-slate-200/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1E89C1]">
            <span className="h-2 w-2 rounded-full bg-[#1E89C1]" />
            <span className="tracking-widest uppercase">The Methodology</span>
          </div>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-[#102A43] sm:text-4xl">
            Our 8-Step Engineering &amp; Delivery Process
          </h2>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            From initial concept to measurable market momentum, our transparent lifecycle guarantees zero guesswork and predictable, on-time delivery.
          </p>
        </div>

        {/* Desktop Step Nav Bar */}
        <div className="mt-12 hidden lg:grid lg:grid-cols-8 gap-2 border-b border-slate-200 pb-4">
          {steps.map((st, i) => {
            const isActive = activeStep === i;
            return (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`flex flex-col items-start p-2.5 rounded-xl text-left transition-all ${
                  isActive
                    ? 'bg-[#F1F8FC] border border-[#1E89C1]/30 ring-1 ring-[#1E89C1]/20'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-[#F37B20]' : 'text-slate-400'}`}>
                    {st.num}
                  </span>
                  <div className={`${isActive ? 'text-[#1E89C1]' : 'text-slate-400'}`}>
                    {st.icon}
                  </div>
                </div>
                <span className={`mt-2 text-xs font-bold ${isActive ? 'text-[#102A43]' : 'text-slate-700'}`}>
                  {st.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Step Detailed Card */}
        <div className="mt-8 rounded-3xl border border-[rgba(30,137,193,0.18)] bg-[#F8FAFC] p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1E89C1] text-white font-mono text-sm font-bold">
                  {steps[activeStep].num}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-bold text-[#102A43]">
                    Phase {steps[activeStep].num}: {steps[activeStep].title}
                  </h3>
                  <span className="text-xs font-semibold text-[#1E89C1]">
                    {steps[activeStep].tagline}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700">
                {steps[activeStep].desc}
              </p>

              <div className="mt-6">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Key Deliverables
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {steps[activeStep].deliverables.map((deliv, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 shadow-2xs"
                    >
                      ✓ {deliv}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center items-center rounded-2xl bg-white border border-slate-200/80 p-6 text-center shadow-xs">
              <span className="text-xs font-bold text-slate-400 uppercase">Phase Progression</span>
              <div className="mt-3 font-display text-4xl font-extrabold text-[#1E89C1]">
                {Math.round(((activeStep + 1) / 8) * 100)}%
              </div>
              <span className="mt-1 text-xs text-slate-500">
                Step {activeStep + 1} of 8 Completed
              </span>

              <div className="mt-6 flex gap-2 w-full">
                <button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((p) => Math.max(0, p - 1))}
                  className="flex-1 rounded-xl border border-slate-200 py-2 text-xs font-semibold text-slate-700 disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  disabled={activeStep === steps.length - 1}
                  onClick={() => setActiveStep((p) => Math.min(steps.length - 1, p + 1))}
                  className="flex-1 rounded-xl bg-[#1E89C1] py-2 text-xs font-semibold text-white disabled:opacity-40"
                >
                  Next Step
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Horizontal Snap List */}
        <div className="mt-6 flex gap-3 overflow-x-auto pb-4 lg:hidden">
          {steps.map((st, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={`shrink-0 rounded-xl px-4 py-2 text-xs font-bold ${
                activeStep === i
                  ? 'bg-[#1E89C1] text-white'
                  : 'border border-slate-200 bg-white text-slate-700'
              }`}
            >
              {st.num} {st.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
