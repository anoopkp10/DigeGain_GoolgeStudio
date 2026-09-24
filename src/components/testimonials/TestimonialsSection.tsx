import React from 'react';
import { Star, Quote, MapPin, CheckCircle2 } from 'lucide-react';
import { TestimonialItem } from '../../types';

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="py-24 bg-[#F1F8FC]/60 border-t border-slate-200/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1E89C1]">
            <span className="h-2 w-2 rounded-full bg-[#42A83D]" />
            <span className="tracking-widest uppercase">Verified Client Outcomes</span>
          </div>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-[#102A43] sm:text-4xl">
            Trusted By Growing Kerala &amp; Global Businesses
          </h2>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            Hear directly from business owners whose operations and revenue transformed after deploying custom DIGEGAIN web systems.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex flex-col justify-between rounded-3xl border border-[rgba(30,137,193,0.18)] bg-white p-6 sm:p-8 shadow-sm transition-all hover:shadow-md"
            >
              <div>
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-[#42A83D]">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Verified Project</span>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="mt-6 text-sm leading-relaxed text-slate-700 italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>

              {/* Author & Business Metadata */}
              <div className="mt-8 border-t border-slate-100 pt-6 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-11 w-11 rounded-full border border-slate-200 object-cover"
                />
                <div>
                  <h4 className="font-display text-sm font-bold text-[#102A43]">
                    {t.name}
                  </h4>
                  <p className="text-xs font-medium text-slate-600">
                    {t.role}, <span className="text-[#1E89C1]">{t.company}</span>
                  </p>
                  <p className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                    <MapPin className="h-3 w-3" />
                    <span>{t.location}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
