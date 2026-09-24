import React from 'react';
import { MessageSquare } from 'lucide-react';

interface WhatsAppButtonProps {
  phone: string;
  defaultMessage?: string;
  className?: string;
}

export function WhatsAppButton({
  phone,
  defaultMessage = 'Hi DIGEGAIN, I am interested in your website development and digital growth services.',
  className = ''
}: WhatsAppButtonProps) {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with DIGEGAIN on WhatsApp"
      className={`fixed bottom-24 right-6 z-40 flex items-center gap-2 rounded-full bg-[#42A83D] px-4 py-3 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#389433] hover:shadow-2xl md:bottom-8 md:right-8 ${className}`}
    >
      <MessageSquare className="h-5 w-5 fill-white stroke-none" />
      <span className="hidden text-sm font-semibold tracking-wide sm:inline">WhatsApp</span>
    </a>
  );
}
