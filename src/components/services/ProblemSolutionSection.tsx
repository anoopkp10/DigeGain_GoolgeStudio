import React from 'react';
import { XCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export function ProblemSolutionSection({ onExploreSolutions }: { onExploreSolutions: () => void }) {
  const comparisons = [
    {
      problem: 'Website does not generate leads or phone calls',
      solution: 'High-converting user journeys with clear intent-focused CTAs',
      impact: '+140% Qualified Inbound Enquiries'
    },
    {
      problem: 'Manual booking headaches & staff scheduling errors',
      solution: 'Automated 24/7 calendar booking engine with instant slots',
      impact: 'Zero Double-Bookings'
    },
    {
      problem: 'Slow, outdated, template-heavy website (3-6s load times)',
      solution: 'Custom lightweight Next.js/Node architecture (<1.2s load)',
      impact: '100% Core Web Vitals Pass'
    },
    {
      problem: 'Poor mobile experience drives away 70% of potential customers',
      solution: 'Mobile-first ergonomics with touch-friendly one-tap actions',
      impact: '3.8x Mobile Conversion'
    },
    {
      problem: 'Missed enquiries over weekends, nights, and peak lunch hours',
      solution: 'Direct WhatsApp integration & instant email notification routing',
      impact: '0 Missed Opportunities'
    },
    {
      problem: 'Disjointed operations and messy spreadsheets for orders',
      solution: 'Centralized admin operations dashboard with live status updates',
      impact: '4 hrs/day Saved in Manual Work'
    }
  ];

  return (
    <section id="solutions" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#1E89C1]">
            <span className="h-2 w-2 rounded-full bg-[#F37B20]" />
            <span className="tracking-widest uppercase">The Shift</span>
          </div>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-[#102A43] sm:text-4xl">
            Where Traditional Websites Fail vs. How DIGEGAIN Solves It
          </h2>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            A website shouldn&apos;t just be a digital brochure. It must be an active revenue generator and workflow engine for your business.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {comparisons.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:border-[#1E89C1]/40 hover:shadow-lg"
            >
              <div>
                {/* Traditional Problem */}
                <div className="flex items-start gap-3 border-b border-slate-100 pb-4">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-red-500 uppercase">
                      Traditional Problem
                    </span>
                    <p className="mt-1 text-xs font-medium text-slate-700">
                      {item.problem}
                    </p>
                  </div>
                </div>

                {/* DIGEGAIN Solution */}
                <div className="flex items-start gap-3 pt-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#42A83D]" />
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-[#42A83D] uppercase">
                      DIGEGAIN Digital System
                    </span>
                    <p className="mt-1 text-xs font-semibold text-slate-900">
                      {item.solution}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quantified Business Metric Tag */}
              <div className="mt-6 rounded-xl bg-[#F1F8FC] p-3 text-center">
                <span className="text-[11px] font-bold text-[#1E89C1]">
                  {item.impact}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onExploreSolutions}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1E89C1] px-6 py-3 text-xs font-bold text-white shadow-md transition-all hover:bg-[#156B97]"
          >
            <span>DISCUSS YOUR BUSINESS WORKFLOW</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
