import React, { useState } from 'react';
import { Send, Phone, MessageSquare, Mail, MapPin, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ContactData } from '../../types';
import { submitEnquiry } from '../../lib/api';
import { GoogleBusinessCard } from './GoogleBusinessCard';

interface ContactSectionProps {
  contact: ContactData;
  standalone?: boolean;
}

export function ContactSection({ contact, standalone = false }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    phone: '',
    email: '',
    businessType: 'Clinic / Healthcare',
    requirement: 'Booking & Appointment System',
    message: '',
    honeypot: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [enquiryId, setEnquiryId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const cleanPhone = contact.phone.replace(/[^0-9]/g, '');

  const businessTypes = [
    'Clinic / Healthcare / Doctor',
    'Restaurant / Cafe / Cloud Kitchen',
    'Hotel / Resort / Homestay',
    'Salon / Spa / Wellness',
    'Professional / Legal / Financial Consultant',
    'E-commerce / Retail / Artisanal Brand',
    'Real Estate & Architecture',
    'Education / Training / Academy',
    'Logistics / Fleet / Operations',
    'Other Service Business'
  ];

  const requirements = [
    'Booking & Appointment System',
    'New High-Performance Business Website',
    'Product & Order Catalog System',
    'Custom Operations Dashboard',
    'Website Redesign & Speed Optimization',
    'AI-Enabled Web Experience & Chatbot',
    'Custom Full-Stack Web Application',
    'Other / Enterprise System'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setErrorMessage('Please provide your Name, Phone Number, and Email.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await submitEnquiry(formData);
      if (res.success) {
        setSubmitted(true);
        setEnquiryId(res.enquiryId || `ENQ-${Date.now().toString().slice(-6)}`);
        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        setErrorMessage(res.message || 'Submission failed. Please try again.');
      }
    } catch (err: any) {
      setErrorMessage('Network error while submitting. Please message us on WhatsApp directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className={`py-24 ${standalone ? 'pt-32 bg-[#F8FAFC]' : 'bg-white'}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1E89C1]">
            <span className="h-2 w-2 rounded-full bg-[#F37B20]" />
            <span className="tracking-widest uppercase">Start Your Project</span>
          </div>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-[#102A43] sm:text-4xl">
            Let&apos;s Build Your Business Growth Engine
          </h2>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            Tell us about your business, current operational bottlenecks, and what you aim to achieve. We will respond within 4 hours with an actionable roadmap.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Comprehensive Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
              {submitted ? (
                <div className="py-8 text-center space-y-4 animate-fade-in">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F0FDF4] text-[#42A83D]">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#102A43]">
                    Enquiry Received Successfully!
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    Reference ID: <strong className="text-[#1E89C1]">{enquiryId}</strong>
                  </p>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, <strong>{formData.name}</strong>. Our senior technical consultant will review your requirement for <strong>{formData.business || 'your business'}</strong> and reach out via phone/WhatsApp within 4 hours.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                    <a
                      href={`https://wa.me/${cleanPhone}?text=Hi%20DIGEGAIN,%20I%20just%20submitted%20inquiry%20${enquiryId}%20and%20wanted%20to%20follow%20up.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#42A83D] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#389433] transition-colors"
                    >
                      <MessageSquare className="h-4 w-4 fill-white stroke-none" />
                      <span>Chat on WhatsApp Now</span>
                    </a>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          business: '',
                          phone: '',
                          email: '',
                          businessType: 'Clinic / Healthcare',
                          requirement: 'Booking & Appointment System',
                          message: '',
                          honeypot: ''
                        });
                      }}
                      className="rounded-xl border border-slate-200 px-6 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      Submit Another Project
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot field (hidden from genuine users) */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {errorMessage && (
                    <div className="rounded-xl bg-red-50 p-3 text-xs text-red-600 font-medium">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Dr. Rajesh Pillai"
                        className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 outline-none transition-colors focus:border-[#1E89C1] focus:ring-1 focus:ring-[#1E89C1]"
                      />
                    </div>

                    {/* Business Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700">
                        Business / Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.business}
                        onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                        placeholder="e.g. Malabar Care Polyclinic"
                        className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 outline-none transition-colors focus:border-[#1E89C1] focus:ring-1 focus:ring-[#1E89C1]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700">
                        Phone Number (WhatsApp) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 97477 92223"
                        className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 outline-none transition-colors focus:border-[#1E89C1] focus:ring-1 focus:ring-[#1E89C1]"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. rajesh@carewellclinic.com"
                        className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 outline-none transition-colors focus:border-[#1E89C1] focus:ring-1 focus:ring-[#1E89C1]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Business Type */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700">
                        Business Domain
                      </label>
                      <select
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 outline-none transition-colors focus:border-[#1E89C1] focus:ring-1 focus:ring-[#1E89C1]"
                      >
                        {businessTypes.map((type, i) => (
                          <option key={i} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Website Requirement */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700">
                        Core Requirement
                      </label>
                      <select
                        value={formData.requirement}
                        onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 outline-none transition-colors focus:border-[#1E89C1] focus:ring-1 focus:ring-[#1E89C1]"
                      >
                        {requirements.map((req, i) => (
                          <option key={i} value={req}>
                            {req}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700">
                      Project Details &amp; Operational Goals
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe your current setup, target launch date, and key features needed (e.g. WhatsApp notifications, doctor schedule, custom menu)..."
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 outline-none transition-colors focus:border-[#1E89C1] focus:ring-1 focus:ring-[#1E89C1]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F37B20] py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-orange-500/20 hover:bg-[#D9630E] transition-all disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>TRANSMITTING REQUIREMENT...</span>
                    ) : (
                      <>
                        <span>SUBMIT PROJECT INQUIRY</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Direct Contact & Location Details */}
          <div className="space-y-6 lg:col-span-5">
            {/* Direct Instant Channels Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
              <h3 className="font-display text-lg font-bold text-[#102A43]">
                Direct Contact Pathways
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Prefer an instant phone or WhatsApp conversation? Reach out directly.
              </p>

              <div className="mt-6 space-y-4">
                <a
                  href={`tel:${cleanPhone}`}
                  className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1E89C1]/10 text-[#1E89C1]">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Call Direct</span>
                    <div className="font-display text-sm font-bold text-slate-900">
                      {contact.phone}
                    </div>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${cleanPhone}?text=Hi%20DIGEGAIN,%20I%20would%20like%20to%20discuss%20a%20website%20project.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-[rgba(66,168,61,0.2)] bg-[#F0FDF4] p-3.5 hover:bg-[#E6F9EC] transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#42A83D] text-white">
                    <MessageSquare className="h-5 w-5 fill-white stroke-none" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#2E872A] uppercase">WhatsApp Consultation</span>
                    <div className="font-display text-sm font-bold text-slate-900">
                      Chat on WhatsApp Now
                    </div>
                  </div>
                </a>

                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F37B20]/10 text-[#F37B20]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Email Inquiries</span>
                    <div className="font-display text-sm font-bold text-slate-900">
                      {contact.email}
                    </div>
                  </div>
                </a>
              </div>

              {/* Operating hours */}
              <div className="mt-6 border-t border-slate-100 pt-4 flex items-center gap-2 text-xs text-slate-500">
                <Clock className="h-4 w-4 text-[#1E89C1]" />
                <span>Operating Hours: Mon – Sat, 9:00 AM – 7:00 PM IST</span>
              </div>
            </div>

            {/* Google Business Profile Card */}
            <GoogleBusinessCard contact={contact} />
          </div>
        </div>
      </div>
    </section>
  );
}
