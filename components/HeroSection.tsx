"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Clock,
  Zap,
  Phone,
  MessageSquare,
  Sparkles,
  MapPin,
  CheckCircle2,
  ChevronRight,
  Activity,
  Award,
  ThumbsUp,
  ArrowRight,
  Flame,
  Star,
} from "lucide-react";
import { Analytics } from "@/lib/analytics";
import { BUSINESS_SETTINGS } from "@/lib/data";

interface HeroSectionProps {
  onOpenQuoteModal: (serviceSlug?: string) => void;
  locationName?: string;
  cityName?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenQuoteModal,
  locationName = "Dubai, Abu Dhabi & Sharjah",
  cityName = "UAE",
}) => {
  const [activeTechIndex, setActiveTechIndex] = useState(0);
  const [selectedQuickService, setSelectedQuickService] = useState("ac-repair");
  const [selectedQuickCity, setSelectedQuickCity] = useState("Dubai");

  const radarHubs = [
    { area: "Dubai Marina & JBR", techs: 8, eta: "18 mins" },
    { area: "Palm Jumeirah & Al Sufouh", techs: 7, eta: "15 mins" },
    { area: "Downtown Dubai & Business Bay", techs: 9, eta: "20 mins" },
    { area: "JVC, Emirates Hills & Arabian Ranches", techs: 8, eta: "22 mins" },
    { area: "Dubai Hills Estate & Meydan", techs: 6, eta: "18 mins" },
    { area: "Yas Island & Saadiyat (Abu Dhabi)", techs: 5, eta: "25 mins" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTechIndex((prev) => (prev + 1) % radarHubs.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [radarHubs.length]);

  const currentHub = radarHubs[activeTechIndex];

  const handleWhatsApp = () => {
    Analytics.trackWhatsAppClick("Hero CTA", locationName);
    window.open(
      `https://wa.me/${BUSINESS_SETTINGS.whatsappNumber}?text=Hello%20Al-Safwa%2C%20I%20need%20urgent%20service%20in%20${encodeURIComponent(
        locationName
      )}`,
      "_blank"
    );
  };

  const handlePhone = () => {
    Analytics.trackPhoneCallClick("Hero CTA", locationName);
    window.location.href = `tel:${BUSINESS_SETTINGS.phone.replace(/[^0-9+]/g, "")}`;
  };

  const quickServices = [
    { label: "AC Repair & Cooling", slug: "ac-repair", tag: "Most Requested" },
    { label: "Emergency Plumbing", slug: "emergency-plumbing-repair", tag: "24/7 Fast" },
    { label: "Electrical DB Tripping", slug: "electrical-repair-troubleshooting", tag: "DEWA Certified" },
    { label: "Villa Painting & Jotun", slug: "interior-exterior-villa-painting", tag: "Luxury Finish" },
    { label: "Water Leak Detection", slug: "leak-detection-waterproofing", tag: "Acoustic Scanner" },
    { label: "365-Day Villa AMC", slug: "amc-packages", tag: "Save 15%" },
  ];

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pt-10 lg:pb-20 bg-gradient-to-b from-blue-50/70 via-slate-50/50 to-white border-b border-surfaceBorder">
      {/* Decorative Grid Pattern & Glows */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,#000_75%,transparent_100%)] opacity-70" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-80 bg-blue-400/10 blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Live Radar Ticker */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/95 border border-brand-200/80 shadow-sm backdrop-blur-md hover:border-brand-400 transition">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-slate-800">
              Live UAE Radar:
            </span>
            <span className="text-xs font-extrabold text-brand-700 transition-all duration-300">
              {currentHub.techs} Vans Active in {currentHub.area}
            </span>
            <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-300">
              ETA: {currentHub.eta}
            </span>
          </div>
        </div>

        {/* Hero 2-Column Split Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column (7 cols): Content & CTAs */}
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-blue-100/80 text-brand-900 border border-blue-200/80 text-xs font-bold tracking-wider uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>UAE Premier Facility Management & Technical Services</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-heading font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Fast, Certified & Trusted{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 via-brand-800 to-indigo-900">
                Technical Services in {cityName}
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              DEWA-approved master engineers for 24/7 AC repair, plumbing emergencies, electrical DB diagnostics, Jotun luxury painting, and 365-day villa maintenance across <strong className="text-slate-900 font-bold">{locationName}</strong>.
            </p>

            {/* Trust Checkmarks */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 gap-y-2.5 gap-x-4 text-xs sm:text-sm text-slate-700 font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Sub-30 Min Rapid Arrival</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>DEWA & Municipality Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>90-Day Parts & Labor Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>4.9★ (4,800+ Verified UAE Clients)</span>
              </div>
            </div>

            {/* Quick Service Jump Chips */}
            <div className="mt-6">
              <div className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 mb-2">
                Popular Instant Services:
              </div>
              <div className="flex flex-wrap gap-2">
                {quickServices.map((qs) => (
                  <button
                    key={qs.slug}
                    onClick={() => onOpenQuoteModal(qs.slug)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-brand-50 border border-slate-200 hover:border-brand-300 text-xs font-bold text-slate-700 hover:text-brand-700 shadow-sm transition"
                  >
                    <span>{qs.label}</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-extrabold">
                      {qs.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Conversion CTA Group */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={() => onOpenQuoteModal()}
                className="px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm shadow-card hover:shadow-premium transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Get Free Instant Quote</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsApp}
                className="px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-sm transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                <span>WhatsApp 24/7</span>
              </button>

              <button
                onClick={handlePhone}
                className="px-5 py-4 rounded-xl bg-white hover:bg-surface border border-surfaceBorder text-slate-800 font-bold text-sm shadow-subtle transition flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-brand-600" />
                <span>{BUSINESS_SETTINGS.phone}</span>
              </button>
            </div>
          </div>

          {/* Right Column (5 cols): Visual Showcase & Quick Booking Card */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Luxury Image Card with Overlays */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80"
                  alt="Al-Safwa Master HVAC & Technical Maintenance Team UAE"
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                {/* Floating Top Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md text-white border border-white/20 text-xs font-bold shadow-lg">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>#1 Rated UAE Maintenance</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-600/90 text-white text-[11px] font-extrabold shadow-md">
                    <Zap className="w-3 h-3" />
                    <span>24/7 Mobile Squad</span>
                  </div>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                    <span className="text-xs font-bold text-white ml-1">4.9 / 5.0 (4,800+ UAE Reviews)</span>
                  </div>
                  <div className="text-sm font-heading font-bold text-slate-100">
                    Precision Diagnostics • Genuine OEM Parts • Digital Invoice
                  </div>
                </div>
              </div>

              {/* Instant Price & Booking Widget Box */}
              <div className="mt-4 p-5 rounded-2xl bg-white border border-surfaceBorder shadow-premium">
                <div className="flex items-center justify-between pb-3 border-b border-surfaceBorder">
                  <div className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                    <span>Instant Price & Slot Finder</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    100% Free Quote
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Select Service</label>
                    <select
                      value={selectedQuickService}
                      onChange={(e) => setSelectedQuickService(e.target.value)}
                      className="w-full text-xs font-bold bg-surface border border-surfaceBorder rounded-lg p-2 text-slate-800 focus:outline-none focus:border-brand-500"
                    >
                      <option value="ac-repair">Air Conditioning Repair</option>
                      <option value="ac-maintenance">AC Coil Chemical Wash</option>
                      <option value="emergency-plumbing-repair">Plumbing & Leak Fix</option>
                      <option value="electrical-repair-troubleshooting">Electrical DB Repair</option>
                      <option value="interior-exterior-villa-painting">Villa Jotun Painting</option>
                      <option value="amc-packages">365-Day AMC Contract</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">City / Region</label>
                    <select
                      value={selectedQuickCity}
                      onChange={(e) => setSelectedQuickCity(e.target.value)}
                      className="w-full text-xs font-bold bg-surface border border-surfaceBorder rounded-lg p-2 text-slate-800 focus:outline-none focus:border-brand-500"
                    >
                      <option value="Dubai">Dubai</option>
                      <option value="Abu Dhabi">Abu Dhabi</option>
                      <option value="Sharjah">Sharjah</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => onOpenQuoteModal(selectedQuickService)}
                  className="w-full mt-3 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs shadow-sm transition flex items-center justify-center gap-1.5"
                >
                  <span>Check Availability & Price in {selectedQuickCity}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Trust Metric Cards */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          <div className="p-4.5 rounded-2xl bg-white border border-surfaceBorder shadow-subtle flex items-center gap-3.5 hover:border-brand-200 transition">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-brand-600 shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-heading font-extrabold text-slate-900">25 Mins</div>
              <div className="text-xs text-slate-500 font-semibold">Avg Emergency Arrival</div>
            </div>
          </div>

          <div className="p-4.5 rounded-2xl bg-white border border-surfaceBorder shadow-subtle flex items-center gap-3.5 hover:border-emerald-200 transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-heading font-extrabold text-slate-900">90-Day</div>
              <div className="text-xs text-slate-500 font-semibold">Parts & Workmanship Guarantee</div>
            </div>
          </div>

          <div className="p-4.5 rounded-2xl bg-white border border-surfaceBorder shadow-subtle flex items-center gap-3.5 hover:border-indigo-200 transition">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-heading font-extrabold text-slate-900">DEWA Certified</div>
              <div className="text-xs text-slate-500 font-semibold">Licensed Master Engineers</div>
            </div>
          </div>

          <div className="p-4.5 rounded-2xl bg-white border border-surfaceBorder shadow-subtle flex items-center gap-3.5 hover:border-amber-200 transition">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
              <ThumbsUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-heading font-extrabold text-slate-900">15,000+</div>
              <div className="text-xs text-slate-500 font-semibold">Properties Maintained in UAE</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
