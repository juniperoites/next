"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ServiceData, LocationData, ServiceFAQ } from "@/lib/types";
import { useModal } from "./AppShell";
import {
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageSquare,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { Analytics } from "@/lib/analytics";
import { BUSINESS_SETTINGS } from "@/lib/data";

interface LocalizedProps {
  service: ServiceData;
  location: LocationData;
  allServices: ServiceData[];
  allLocations: LocationData[];
  faqs: ServiceFAQ[];
}

export const LocalizedLandingPageClient: React.FC<LocalizedProps> = ({
  service,
  location,
  allServices,
  allLocations,
  faqs,
}) => {
  const { openQuoteModal } = useModal();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleWhatsApp = () => {
    Analytics.trackWhatsAppClick(service.name, `${location.neighborhood}, ${location.city}`);
    window.open(
      `https://wa.me/${BUSINESS_SETTINGS.whatsappNumber}?text=Hello%20Al-Safwa%2C%20I%20need%20urgent%20${encodeURIComponent(
        service.name
      )}%20in%20${encodeURIComponent(location.neighborhood)}%2C%20${encodeURIComponent(location.city)}`,
      "_blank"
    );
  };

  const handlePhone = () => {
    Analytics.trackPhoneCallClick(service.name, `${location.neighborhood}, ${location.city}`);
    window.location.href = `tel:${BUSINESS_SETTINGS.phone.replace(/[^0-9+]/g, "")}`;
  };

  const otherNeighborhoods = allLocations.filter(
    (l) => l.city.toLowerCase() === location.city.toLowerCase() && l.id !== location.id
  );

  return (
    <div className="min-h-screen bg-surface pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-surfaceBorder py-3 px-4 sm:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2">
          <Link href="/" className="hover:text-brand-600 transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/areas" className="hover:text-brand-600 transition">
            {location.city}
          </Link>
          <span>/</span>
          <span className="text-brand-700 font-bold">{location.neighborhood}</span>
          <span>/</span>
          <span className="text-slate-900 font-bold">{service.name}</span>
        </div>
      </div>

      {/* Localized Hero */}
      <section className="py-12 bg-white border-b border-surfaceBorder relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl">
            {/* Live Location ETA Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-700 font-semibold">
                {location.techniciansOnDuty || 5} Technicians Active in {location.neighborhood}
              </span>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                Avg ETA: ~{location.avgResponseMins} Mins
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
              24/7 {service.name} in{" "}
              <span className="text-brand-700">
                {location.neighborhood}, {location.city}
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              DEWA-certified rapid emergency technicians stationed in <strong className="text-slate-900 font-bold">{location.neighborhood}</strong> providing hospital-grade troubleshooting, genuine OEM parts, and a 90-day comprehensive guarantee.
            </p>

            {/* Price & ETA Badges */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="p-3 rounded-xl bg-surface border border-surfaceBorder flex items-baseline gap-2 shadow-subtle">
                <span className="text-xs text-slate-500 font-semibold">Starting From:</span>
                <span className="text-xl font-heading font-extrabold text-slate-900">
                  AED {service.basePriceAED}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">{service.priceUnit}</span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-800 font-bold">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>{location.avgResponseMins} Mins Guaranteed SLA</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={() => openQuoteModal(service.slug)}
                className="px-7 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-card transition"
              >
                Instant AED Quote for {location.neighborhood}
              </button>

              <button
                onClick={handleWhatsApp}
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Dispatch Now</span>
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
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Overview */}
          <div className="p-7 rounded-3xl bg-white border border-surfaceBorder shadow-subtle space-y-4">
            <h2 className="text-xl font-heading font-extrabold text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-600" />
              <span>Specialized Care for {location.neighborhood} Residences</span>
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
              {service.fullContent}
            </p>
          </div>

          {/* Included Features */}
          <div className="p-7 rounded-3xl bg-white border border-surfaceBorder shadow-subtle space-y-4">
            <h2 className="text-xl font-heading font-extrabold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Standard Deliverables & Guarantees</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {service.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-surface border border-surfaceBorder text-xs text-slate-800 font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Localized FAQs */}
          <div className="p-7 rounded-3xl bg-white border border-surfaceBorder shadow-subtle space-y-4">
            <h2 className="text-xl font-heading font-extrabold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>{location.neighborhood} Frequently Asked Questions</span>
            </h2>

            <div className="space-y-3 pt-2">
              {faqs.map((faq, idx) => {
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

          {/* Other Neighborhoods */}
          {otherNeighborhoods.length > 0 && (
            <div className="p-7 rounded-3xl bg-white border border-surfaceBorder shadow-subtle space-y-4">
              <h2 className="text-xl font-heading font-extrabold text-slate-900">
                Other {location.city} Service Hubs
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                {otherNeighborhoods.map((loc) => (
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
          )}
        </div>

        {/* Right Sticky Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-28 p-6 rounded-3xl bg-white border-2 border-brand-500 shadow-premium space-y-5">
            <div>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                ● Live Dispatch Active
              </span>
              <h3 className="text-xl font-heading font-extrabold text-slate-900 mt-2">
                Book in {location.neighborhood}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Technician on standby. Upfront AED quote with 90-day parts warranty.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-surface border border-surfaceBorder space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">Target Area:</span>
                <span className="font-bold text-slate-900">{location.neighborhood}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">Response ETA:</span>
                <span className="font-bold text-emerald-700">~{location.avgResponseMins} Mins</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">Base Tariff:</span>
                <span className="font-extrabold text-slate-900 font-heading text-sm">
                  From AED {service.basePriceAED}
                </span>
              </div>
            </div>

            <button
              onClick={() => openQuoteModal(service.slug)}
              className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs shadow-card transition"
            >
              Get Instant Quote & Dispatch
            </button>

            <button
              onClick={handleWhatsApp}
              className="w-full py-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold text-xs transition flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Direct Hotline</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
