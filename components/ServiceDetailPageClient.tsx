"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ServiceData, LocationData } from "@/lib/types";
import { useModal } from "./AppShell";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Zap,
  Phone,
  MessageSquare,
  Sparkles,
  MapPin,
  ChevronDown,
  HelpCircle,
  FileCheck,
  Award,
  ArrowRight,
  Star,
} from "lucide-react";
import { Analytics } from "@/lib/analytics";
import { BUSINESS_SETTINGS } from "@/lib/data";

interface ServiceDetailProps {
  service: ServiceData;
  allServices: ServiceData[];
  locations: LocationData[];
  categorySlug: string;
}

export const ServiceDetailPageClient: React.FC<ServiceDetailProps> = ({
  service,
  allServices,
  locations,
  categorySlug,
}) => {
  const { openQuoteModal } = useModal();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleWhatsApp = () => {
    Analytics.trackWhatsAppClick(service.name, "UAE");
    window.open(
      `https://wa.me/${BUSINESS_SETTINGS.whatsappNumber}?text=Hello%20Al-Safwa%2C%20I%20need%20assistance%20with%20${encodeURIComponent(
        service.name
      )}%20in%20UAE`,
      "_blank"
    );
  };

  const handlePhone = () => {
    Analytics.trackPhoneCallClick(service.name, "UAE");
    window.location.href = `tel:${BUSINESS_SETTINGS.phone.replace(/[^0-9+]/g, "")}`;
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-surfaceBorder py-3 px-4 sm:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-brand-600 transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/#all-services" className="hover:text-brand-600 transition">
            Services
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">{service.name}</span>
        </div>
      </div>

      {/* Hero Header with Visual Showcase */}
      <section className="py-10 lg:py-14 bg-white border-b border-surfaceBorder relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-brand-700 border border-blue-200 text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{service.categoryName || "Technical Services"}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
                {service.name}
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                {service.shortDesc}
              </p>

              {/* Price & Rating Badge Bar */}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div className="inline-flex items-baseline gap-2 px-4 py-2.5 rounded-2xl bg-surface border border-surfaceBorder shadow-xs">
                  <span className="text-xs text-slate-500 font-semibold">Starting Tariff:</span>
                  <span className="text-2xl font-heading font-extrabold text-slate-900">
                    AED {service.basePriceAED}
                  </span>
                  <span className="text-xs text-slate-500">({service.priceUnit})</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span>4.9 / 5.0 (DEWA Approved Team)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  onClick={() => openQuoteModal(service.slug)}
                  className="px-7 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-card transition"
                >
                  Book Service & Calculate Quote
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Dispatch</span>
                </button>

                <button
                  onClick={handlePhone}
                  className="px-5 py-3.5 rounded-xl bg-white hover:bg-surface border border-surfaceBorder text-slate-800 font-bold text-xs transition flex items-center gap-2 shadow-subtle"
                >
                  <Phone className="w-4 h-4 text-brand-600" />
                  <span>Call Hotline</span>
                </button>
              </div>
            </div>

            {/* Right Visual Image Showcase */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] bg-slate-900">
                <img
                  src={service.image || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-bold">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-600/90 backdrop-blur-sm">
                    ⚡ 90-Day Guarantee
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-sm">
                    100% Genuine OEM Parts
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Engineering Scope */}
          <div className="p-7 rounded-3xl bg-white border border-surfaceBorder shadow-subtle space-y-4">
            <h2 className="text-xl font-heading font-extrabold text-slate-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-brand-600" />
              <span>Technical Scope & Engineering Protocol</span>
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
              {service.fullContent}
            </p>
          </div>

          {/* Included Features */}
          <div className="p-7 rounded-3xl bg-white border border-surfaceBorder shadow-subtle space-y-4">
            <h2 className="text-xl font-heading font-extrabold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Standard Service Deliverables & Guarantees</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-surface border border-surfaceBorder text-xs text-slate-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          {service.faqs && service.faqs.length > 0 && (
            <div className="p-7 rounded-3xl bg-white border border-surfaceBorder shadow-subtle space-y-4">
              <h2 className="text-xl font-heading font-extrabold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-600" />
                <span>Frequently Asked Questions</span>
              </h2>

              <div className="space-y-3 pt-2">
                {service.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl bg-surface border border-surfaceBorder overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-4 text-left flex items-center justify-between gap-4 font-heading font-bold text-sm text-slate-900 hover:text-brand-600 transition"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 transition-transform ${
                            isOpen ? "rotate-180 text-brand-600" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-surfaceBorder/60">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Location Hubs */}
          <div className="p-7 rounded-3xl bg-white border border-surfaceBorder shadow-subtle space-y-4">
            <h2 className="text-xl font-heading font-extrabold text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-600" />
              <span>Available Across UAE Neighborhoods</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
              {locations.map((loc) => (
                <Link
                  key={loc.id}
                  href={`/services/${service.slug}/${loc.citySlug}/${loc.neighborhoodSlug}`}
                  className="p-3 rounded-xl bg-surface hover:bg-surfaceHover border border-surfaceBorder text-xs text-slate-700 hover:text-brand-600 flex items-center justify-between transition font-medium"
                >
                  <span className="truncate">{loc.neighborhood}</span>
                  <span className="text-[10px] text-slate-400 font-mono">~{loc.avgResponseMins}m</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sticky Card (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-28 p-6 rounded-3xl bg-white border-2 border-brand-500 shadow-premium space-y-5">
            <div>
              <div className="text-xs font-bold text-brand-700 uppercase tracking-wider">
                Direct Booking
              </div>
              <h3 className="text-xl font-heading font-extrabold text-slate-900 mt-1">
                Need Fast On-Site Service?
              </h3>
              <p className="text-xs text-slate-500 mt-1.5">
                Our technicians are stationed in Dubai & Abu Dhabi with genuine replacement parts and calibrated diagnostic tools.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-surface border border-surfaceBorder space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">Emergency Response:</span>
                <span className="font-bold text-emerald-700">&lt; 30 Minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">Parts Warranty:</span>
                <span className="font-bold text-slate-900">90 Days Guarantee</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">Base Tariff:</span>
                <span className="font-extrabold text-slate-900 font-heading text-sm">
                  AED {service.basePriceAED}
                </span>
              </div>
            </div>

            <button
              onClick={() => openQuoteModal(service.slug)}
              className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs shadow-card transition"
            >
              Book Service Online (AED {service.basePriceAED})
            </button>

            <button
              onClick={handleWhatsApp}
              className="w-full py-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold text-xs transition flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Instant Dispatch</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
