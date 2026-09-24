import React from 'react';
import { Phone, MessageSquare, ArrowUpRight } from 'lucide-react';

interface MobileStickyBarProps {
  phone: string;
  whatsapp: string;
  onEnquireClick: () => void;
}

export function MobileStickyBar({ phone, whatsapp, onEnquireClick }: MobileStickyBarProps) {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const cleanWhatsapp = whatsapp.replace(/[^0-9]/g, '');

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex h-14 items-center justify-around border-t border-slate-200 bg-white/95 px-3 py-1 shadow-lg backdrop-blur-md md:hidden">
      <a
        href={`tel:${cleanPhone}`}
        className="flex flex-1 items-center justify-center gap-1.5 py-1 text-xs font-semibold text-slate-700 active:scale-95"
      >
        <Phone className="h-4 w-4 text-[#1E89C1]" />
        <span>Call</span>
      </a>

      <div className="h-6 w-[1px] bg-slate-200" />

      <a
        href={`https://wa.me/${cleanWhatsapp}?text=Hi%20DIGEGAIN,%20I%20am%20interested%20in%20your%20website%20services.`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-1.5 py-1 text-xs font-semibold text-[#42A83D] active:scale-95"
      >
        <MessageSquare className="h-4 w-4 fill-[#42A83D] stroke-none" />
        <span>WhatsApp</span>
      </a>

      <div className="h-6 w-[1px] bg-slate-200" />

      <button
        onClick={onEnquireClick}
        className="flex flex-1 items-center justify-center gap-1.5 py-1 text-xs font-bold text-[#F37B20] active:scale-95"
      >
        <span>Enquire</span>
        <ArrowUpRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
