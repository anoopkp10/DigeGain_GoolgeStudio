import React from 'react';
import { MapPin, Star, Phone, Globe, ExternalLink, ShieldCheck } from 'lucide-react';
import { ContactData } from '../../types';

interface GoogleBusinessCardProps {
  contact: ContactData;
}

export function GoogleBusinessCard({ contact }: GoogleBusinessCardProps) {
  const cleanPhone = contact.phone.replace(/[^0-9]/g, '');

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-md">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#1E89C1] font-bold">
            G
          </div>
          <div>
            <h4 className="font-display text-base font-bold text-[#102A43]">
              DIGEGAIN
            </h4>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="font-medium text-amber-500 flex items-center">
                5.0 <Star className="h-3 w-3 fill-amber-400 text-amber-400 ml-0.5" />
              </span>
              <span>· Web Development &amp; Software Company</span>
            </div>
          </div>
        </div>

        <a
          href={contact.googleBusinessProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 rounded-xl bg-[#F1F8FC] px-3 py-1.5 text-xs font-bold text-[#1E89C1] hover:bg-[#E1EFF8] transition-colors"
        >
          <span>View on Google</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {/* Info list */}
      <div className="mt-4 space-y-2.5 text-xs text-slate-600">
        <div className="flex items-start gap-2.5">
          <MapPin className="h-4 w-4 text-[#1E89C1] shrink-0 mt-0.5" />
          <span>
            {contact.address}, {contact.city}, {contact.state} {contact.country}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <Phone className="h-4 w-4 text-[#42A83D] shrink-0" />
          <a href={`tel:${cleanPhone}`} className="hover:text-slate-900 font-medium">
            {contact.phone}
          </a>
        </div>
        <div className="flex items-center gap-2.5">
          <Globe className="h-4 w-4 text-[#F37B20] shrink-0" />
          <span>Service Areas: Kerala, Pan-India, UAE &amp; Global Remote</span>
        </div>
        <div className="flex items-center gap-2.5 text-slate-500">
          <ShieldCheck className="h-4 w-4 text-[#42A83D] shrink-0" />
          <span>Verified Business Profile · Mon - Sat: 9:00 AM - 7:00 PM IST</span>
        </div>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4 flex gap-3">
        <a
          href={contact.googleBusinessProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center rounded-xl bg-slate-100 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
        >
          Get Directions
        </a>
        <a
          href={contact.googleBusinessProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center rounded-xl border border-slate-200 py-2 text-xs font-semibold text-slate-700 hover:border-slate-300 transition-colors"
        >
          Write a Review
        </a>
      </div>
    </div>
  );
}
