import React from 'react';
import { Bot, Sparkles, MessageSquare, Zap, BarChart2, Shield } from 'lucide-react';

export function AiCapabilitiesSection() {
  const capabilities = [
    {
      icon: <Bot className="h-5 w-5 text-[#1E89C1]" />,
      title: '24/7 Customer Assistance & Triage',
      desc: 'Smart, context-aware digital receptionists that answer service questions, guide clients to the right booking slot, and resolve FAQs at midnight.'
    },
    {
      icon: <Zap className="h-5 w-5 text-[#F37B20]" />,
      title: 'Intelligent Lead Qualification',
      desc: 'Automatically evaluate incoming customer requirements, score budget fit, and immediately dispatch high-value opportunities to your sales WhatsApp.'
    },
    {
      icon: <MessageSquare className="h-5 w-5 text-[#42A83D]" />,
      title: 'Automated Enquiry Handling',
      desc: 'Eliminate repetitive email replies. Deliver instant quotes, appointment confirmations, and customized project onboarding kits automatically.'
    },
    {
      icon: <Sparkles className="h-5 w-5 text-[#1E89C1]" />,
      title: 'Semantic Search & Recommendations',
      desc: 'Help customers find exactly what they want on large catalogs or complex service menus using everyday natural language queries.'
    },
    {
      icon: <BarChart2 className="h-5 w-5 text-[#F37B20]" />,
      title: 'Operational Business Intelligence',
      desc: 'Automatic weekly summaries of booking trends, customer acquisition cost, peak traffic hours, and drop-off points delivered straight to your inbox.'
    },
    {
      icon: <Shield className="h-5 w-5 text-[#42A83D]" />,
      title: 'Private & Secure Server-Side Execution',
      desc: 'Zero API keys exposed in the browser. All client data and inquiries remain strictly confidential with compliant enterprise-grade routing.'
    }
  ];

  return (
    <section className="py-24 bg-[#081827] text-white relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1E89C1]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#38BDF8]">
            <Sparkles className="h-4 w-4" />
            <span className="tracking-widest uppercase">Pragmatic AI Engineering</span>
          </div>
          <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl text-white">
            Practical AI. Measurable Business Efficiency.
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            At DIGEGAIN, AI is never a gimmick or novelty chatbot. We embed machine intelligence into key operational bottlenecks — reducing manual response times from hours to seconds and triaging qualified leads directly into your revenue pipeline.
          </p>
        </div>

        {/* Visual AI Automation Pipeline Architecture */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-[#1E3A5F] bg-[#0B1C2D] shadow-2xl">
          <img
            src="/images/ai-automation-pipeline.svg"
            alt="DIGEGAIN Automated AI Triage and Real-Time Routing Architecture"
            className="h-auto w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-800 bg-[#0F2438]/80 p-6 backdrop-blur-sm transition-all hover:border-[#1E89C1]/50 hover:bg-[#132D46]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                {item.icon}
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Transparent Manifesto Box */}
        <div className="mt-12 rounded-2xl border border-[rgba(243,123,32,0.3)] bg-gradient-to-r from-[#183654] to-[#12283C] p-6 text-center sm:p-8">
          <p className="text-xs font-semibold tracking-wider text-[#F37B20] uppercase">
            Our Engineering Philosophy
          </p>
          <blockquote className="mt-2 text-sm sm:text-base font-medium text-slate-100 max-w-3xl mx-auto italic">
            &ldquo;We integrate AI where it creates measurable operational efficiency, improves the customer conversion experience, or accelerates business decisions — never as an unnecessary gimmick.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}
