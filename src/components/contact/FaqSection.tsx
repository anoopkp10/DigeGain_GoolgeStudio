import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FaqItem } from '../../types';

interface FaqSectionProps {
  faqs: FaqItem[];
}

export function FaqSection({ faqs }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 bg-white border-t border-slate-200/80">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#1E89C1]">
            <HelpCircle className="h-4 w-4" />
            <span className="tracking-widest uppercase">Everything You Need To Know</span>
          </div>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-[#102A43] sm:text-4xl">
            Frequently Answered Questions
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Direct, transparent answers regarding our custom website engineering, timeline, booking integrations, and ownership.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="overflow-hidden rounded-2xl border border-slate-200 transition-colors"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-bold text-[#102A43] hover:bg-slate-50 transition-colors"
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#1E89C1] transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 bg-[#F8FAFC] p-5 text-xs sm:text-sm leading-relaxed text-slate-600 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
