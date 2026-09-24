import React, { useState } from 'react';
import { Calendar, CheckCircle2, TrendingUp, Sparkles, MessageSquare, Monitor, Smartphone, Layers, Eye } from 'lucide-react';

export function HeroVisual() {
  const [activeView, setActiveView] = useState<'interactive' | 'workstation' | 'devices'>('workstation');
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 12, y: y * 12 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto w-full max-w-xl lg:max-w-none"
      style={{ perspective: 1000 }}
    >
      {/* Background glow orbs */}
      <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-[#1E89C1]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-[#F37B20]/15 blur-3xl pointer-events-none" />

      {/* View Mode Switcher Pills */}
      <div className="mb-3 flex items-center justify-between px-2">
        <div className="flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white/90 p-1 shadow-xs backdrop-blur-md">
          <button
            onClick={() => setActiveView('workstation')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              activeView === 'workstation'
                ? 'bg-[#102A43] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Monitor className="h-3.5 w-3.5" />
            <span>Architecture</span>
          </button>
          <button
            onClick={() => setActiveView('devices')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              activeView === 'devices'
                ? 'bg-[#102A43] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>Multi-Device</span>
          </button>
          <button
            onClick={() => setActiveView('interactive')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              activeView === 'interactive'
                ? 'bg-[#102A43] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Live Sandbox</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold text-[#42A83D]">
          <span className="h-2 w-2 rounded-full bg-[#42A83D] animate-ping" />
          <span>Production Ready</span>
        </div>
      </div>

      {/* Main Display Container with 3D Parallax */}
      <div
        className="relative z-20 overflow-hidden rounded-2xl border border-[rgba(30,137,193,0.22)] bg-white shadow-2xl transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `rotateY(${mouseOffset.x}deg) rotateX(${-mouseOffset.y}deg)`,
        }}
      >
        {/* VIEW 1: High-Definition Architecture Workstation Image */}
        {activeView === 'workstation' && (
          <div className="group relative">
            <img
              src="/images/hero-modern-tech.svg"
              alt="DIGEGAIN Web Architecture & Booking Engine"
              className="h-auto w-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Interactive Overlay Hints */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between rounded-xl bg-slate-900/80 px-3.5 py-2 text-[11px] text-white backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#38BDF8]" />
                <span>Next-Gen Booking &amp; Revenue Operations</span>
              </div>
              <span className="font-mono text-[#FDBA74]">0.8s Core Web Vitals</span>
            </div>
          </div>
        )}

        {/* VIEW 2: Multi-Device Ecosystem Image (Laptop + Mobile + Tablet) */}
        {activeView === 'devices' && (
          <div className="relative">
            <img
              src="/images/home-web-showcase.svg"
              alt="DIGEGAIN Multi-Device Systems: Laptop, Mobile and Tablet"
              className="h-auto w-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between rounded-xl bg-slate-900/80 px-3.5 py-2 text-[11px] text-white backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
                <span>Responsive Phone + Tablet + Laptop Synchronization</span>
              </div>
              <span className="font-mono text-[#38BDF8]">Direct WhatsApp Tokens</span>
            </div>
          </div>
        )}

        {/* VIEW 3: Interactive Sandbox Mockup */}
        {activeView === 'interactive' && (
          <div className="p-4 sm:p-6">
            {/* Browser Top Window Bar */}
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex items-center gap-1.5 rounded-md bg-slate-100 px-3 py-1 text-[11px] font-mono text-slate-500">
                <span className="text-[#1E89C1]">https://</span>
                <span>booking.carewellclinic.com</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-[#42A83D]">
                <span className="h-2 w-2 rounded-full bg-[#42A83D] animate-ping" />
                <span>Interactive</span>
              </div>
            </div>

            {/* Mock Booking Interface Layout */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
              {/* Left Column: Doctor Profile & Date Slot */}
              <div className="space-y-3 sm:col-span-7">
                <div className="rounded-xl border border-slate-100 bg-[#F8FAFC] p-3.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold tracking-wider text-[#1E89C1] uppercase">
                        Consultant Booking
                      </span>
                      <h4 className="font-display text-sm font-bold text-slate-900">
                        Dr. Pradeep Menon, MD
                      </h4>
                      <p className="text-[11px] text-slate-500">Senior Cardiologist · Token #14</p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1E89C1]/10 text-[#1E89C1]">
                      <Calendar className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Time Slots Chips */}
                  <div className="mt-3 flex gap-2">
                    <span className="rounded-md bg-[#1E89C1] px-2.5 py-1 text-[11px] font-semibold text-white">
                      4:30 PM
                    </span>
                    <span className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600">
                      5:15 PM
                    </span>
                    <span className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600">
                      6:00 PM
                    </span>
                  </div>
                </div>

                {/* Direct WhatsApp Automated Action */}
                <div className="flex items-center justify-between rounded-xl border border-[rgba(66,168,61,0.2)] bg-[#F0FDF4] p-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#42A83D] text-white">
                      <MessageSquare className="h-4 w-4 fill-white stroke-none" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-900">Instant WhatsApp Token</div>
                      <div className="text-[10px] text-slate-500">Auto-sent with live clinic directions</div>
                    </div>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-[#42A83D]" />
                </div>
              </div>

              {/* Right Column: Live Pipeline Analytics */}
              <div className="flex flex-col justify-between space-y-3 sm:col-span-5">
                <div className="rounded-xl border border-slate-100 bg-white p-3.5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-slate-500">Inbound Inquiries</span>
                    <span className="flex items-center text-[11px] font-bold text-[#42A83D]">
                      <TrendingUp className="mr-0.5 h-3.5 w-3.5" />
                      +140%
                    </span>
                  </div>
                  <div className="mt-1 font-display text-2xl font-bold tabular-nums text-slate-900">
                    1,842
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-[#1E89C1] to-[#F37B20]" />
                  </div>
                </div>

                {/* AI Assistant Qualification Chip */}
                <div className="rounded-xl border border-[rgba(30,137,193,0.18)] bg-[#F1F8FC] p-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#1E89C1]">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>AI Qualification Active</span>
                  </div>
                  <p className="mt-1 text-[10px] leading-tight text-slate-600">
                    24/7 lead qualification &amp; priority scheduling triage.
                  </p>
                </div>
              </div>
            </div>

            {/* Lower Banner Inside Browser */}
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#1E89C1]" />
                <span>Architecture: Next.js + Node.js Engine</span>
              </div>
              <div className="font-semibold text-[#F37B20]">0 missed inquiries</div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Accent Card 1: Revenue Velocity (Offset bottom-left) */}
      <div
        className="absolute -bottom-6 -left-6 z-30 hidden rounded-xl border border-slate-100 bg-white p-3.5 shadow-xl sm:flex sm:items-center sm:gap-3"
        style={{
          transform: `translate3d(${mouseOffset.x * -0.6}px, ${mouseOffset.y * -0.6}px, 20px)`,
        }}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F37B20]/10 text-[#F37B20]">
          <TrendingUp className="h-5 w-5" />
        </div>
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase">Quarterly Direct Revenue</div>
          <div className="font-display text-base font-bold tabular-nums text-slate-900">
            ₹34.8 Lakhs
          </div>
        </div>
      </div>

      {/* Floating Accent Card 2: Sub-Second Performance (Offset top-right) */}
      <div
        className="absolute -top-6 -right-6 z-30 hidden rounded-xl border border-slate-100 bg-white p-3.5 shadow-xl sm:flex sm:items-center sm:gap-3"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.8}px, ${mouseOffset.y * 0.8}px, 30px)`,
        }}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#42A83D]/10 text-[#42A83D]">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase">Core Page Load Speed</div>
          <div className="font-display text-sm font-bold text-slate-900">
            0.8s <span className="text-[11px] font-normal text-[#42A83D]">(100% Score)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
