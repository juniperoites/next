"use client";

import React from "react";
import {
  CategoryData,
  ServiceData,
  LocationData,
  AMCPackageData,
  PortfolioItemData,
  TestimonialData,
} from "@/lib/types";
import { HeroSection } from "./HeroSection";
import { ServiceCategoryGrid } from "./ServiceCategoryGrid";
import { LocationDirectoryGrid } from "./LocationDirectoryGrid";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { AMCComparisonTable } from "./AMCComparisonTable";
import { TestimonialsSection } from "./TestimonialsSection";
import { useModal } from "./AppShell";
import {
  Phone,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Zap,
  Clock,
  Award,
  CheckCircle2,
  FileCheck,
  ChevronRight,
  Building,
  Home,
  Check,
} from "lucide-react";
import { Analytics } from "@/lib/analytics";
import { BUSINESS_SETTINGS } from "@/lib/data";

interface HomePageClientProps {
  categories: CategoryData[];
  services: ServiceData[];
  locations: LocationData[];
  amcPackages: AMCPackageData[];
  portfolioItems: PortfolioItemData[];
  testimonials: TestimonialData[];
}

export const HomePageClient: React.FC<HomePageClientProps> = ({
  categories,
  services,
  locations,
  amcPackages,
  portfolioItems,
  testimonials,
}) => {
  const { openQuoteModal } = useModal();

  const handleWhatsApp = () => {
    Analytics.trackWhatsAppClick("Bottom CTA", "Dubai, Abu Dhabi & Sharjah");
    window.open(
      `https://wa.me/${BUSINESS_SETTINGS.whatsappNumber}?text=Hello%20Al-Safwa%2C%20I%20would%20like%20to%20inquire%20about%20your%20technical%20services`,
      "_blank"
    );
  };

  const handlePhone = () => {
    Analytics.trackPhoneCallClick("Bottom CTA", "UAE Toll-Free");
    window.location.href = `tel:${BUSINESS_SETTINGS.phone.replace(/[^0-9+]/g, "")}`;
  };

  return (
    <div className="space-y-0">
      {/* 1. Hero Section with Live Radar, Visual Showcase & Quick Booking Widget */}
      <HeroSection onOpenQuoteModal={openQuoteModal} />

      {/* 2. Core 20+ Services Grid with Image Headers, Search & Category Filter Tabs */}
      <ServiceCategoryGrid
        services={services}
        categories={categories}
        onBookService={(slug) => openQuoteModal(slug)}
      />

      {/* 3. "Why UAE Homeowners & Businesses Trust Al-Safwa" Feature Grid */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-surfaceBorder relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-brand-800 border border-blue-200 text-xs font-bold uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5 text-brand-600" />
              <span>Engineering Excellence in UAE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
              Why UAE Property Owners Trust Al-Safwa
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Built on uncompromising standards of quality, transparency, and rapid response across Dubai, Abu Dhabi, and Sharjah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            <div className="p-7 rounded-3xl bg-white border border-surfaceBorder shadow-subtle hover:border-brand-300 transition">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-brand-600 mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-900">
                DEWA & Municipality Certified
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                All electrical, HVAC, and plumbing works are carried out by certified engineers complying with DEWA, SEWA, and UAE Fire Safety codes.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-surfaceBorder shadow-subtle hover:border-emerald-300 transition">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-900">
                Sub-30 Min Rapid Response
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                With mobile maintenance squads stationed across Dubai Marina, JVC, Downtown, and Palm Jumeirah, emergency help is always minutes away.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-surfaceBorder shadow-subtle hover:border-amber-300 transition">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-5">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-900">
                100% Upfront Transparent AED Pricing
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                No surprise bills or hidden travel surcharges. Get a clear, itemized quote with VAT breakdown before any work begins on-site.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-surfaceBorder shadow-subtle hover:border-indigo-300 transition">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 mb-5">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-900">
                90-Day Parts & Workmanship Warranty
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                We stand behind every repair. If any issue reoccurs within 90 days, our master technician returns to fix it completely free of charge.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-surfaceBorder shadow-subtle hover:border-cyan-300 transition">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 mb-5">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-900">
                Genuine OEM Parts & Calibrated Tools
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                We carry genuine factory parts for Daikin, O-General, Carrier, Grohe, Schneider, and Jotun, fitted with precision diagnostic gear.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-surfaceBorder shadow-subtle hover:border-purple-300 transition">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 mb-5">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-900">
                365-Day AMC Facility Contracts
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Full annual maintenance contracts for luxury villas, apartments, and commercial buildings with priority booking and SLA waivers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "How It Works in 3 Simple Steps" Section */}
      <section className="py-16 sm:py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-brand-700 border border-blue-200 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simple, Fast & Frictionless</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
              How It Works in 3 Easy Steps
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              From initial dispatch request to guaranteed completion in three seamless stages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="clean-card rounded-3xl p-8 relative flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white font-extrabold font-heading text-xl flex items-center justify-center mb-6 shadow-md">
                  1
                </div>
                <h3 className="text-xl font-heading font-bold text-slate-900">
                  Book Online or Call
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  Select your required service, request a 24/7 emergency technician, or calculate an instant custom AED estimate via our smart quote engine.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-surfaceBorder text-xs font-bold text-brand-700 flex items-center gap-1">
                <span>Instant dispatch confirmation</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            <div className="clean-card rounded-3xl p-8 relative flex flex-col justify-between border-brand-300">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 font-extrabold font-heading text-xl flex items-center justify-center mb-6 shadow-md">
                  2
                </div>
                <h3 className="text-xl font-heading font-bold text-slate-900">
                  Master Technician Dispatched
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  Our DEWA-certified technician arrives at your property in our fully-equipped mobile van with calibrated diagnostic tools and genuine parts.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-surfaceBorder text-xs font-bold text-amber-700 flex items-center gap-1">
                <span>Avg arrival: &lt; 25 minutes</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            <div className="clean-card rounded-3xl p-8 relative flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-extrabold font-heading text-xl flex items-center justify-center mb-6 shadow-md">
                  3
                </div>
                <h3 className="text-xl font-heading font-bold text-slate-900">
                  Precision Fix & Warranty
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  The issue is resolved to perfection. You receive a digital DEWA-compliant invoice and 90-day warranty on all parts and labor.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-surfaceBorder text-xs font-bold text-emerald-700 flex items-center gap-1">
                <span>90-Day Warranty Protection</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Interactive Before/After Split Transformation Slider */}
      <BeforeAfterSlider portfolioItems={portfolioItems} />

      {/* 6. Annual Maintenance Contracts (AMC) Pricing & Comparison */}
      <AMCComparisonTable
        packages={amcPackages}
        onSelectPackage={(tier) => openQuoteModal(tier)}
      />

      {/* 7. Programmatic Location Hubs (Dubai, Abu Dhabi, Sharjah) */}
      <LocationDirectoryGrid locations={locations} services={services} />

      {/* 8. Verified UAE Customer Testimonials */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 9. Bottom High-Converting CTA Banner */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-brand-950 via-brand-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15),transparent_50%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-amber-300 border border-white/20 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guaranteed Emergency SLA Across UAE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight">
            Ready for Fast, Professional Property Maintenance?
          </h2>
          <p className="mt-4 text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Book an instant appointment, calculate custom repair pricing, or request emergency technician dispatch in under 2 minutes.
          </p>

          <div className="mt-9 flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={() => openQuoteModal()}
              className="px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-card hover:shadow-premium transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Calculate Instant AED Quote
            </button>

            <button
              onClick={handleWhatsApp}
              className="px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition flex items-center gap-2 shadow-sm"
            >
              <MessageSquare className="w-5 h-5" />
              <span>WhatsApp Direct Hotline</span>
            </button>

            <button
              onClick={handlePhone}
              className="px-6 py-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm transition flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-brand-600" />
              <span>{BUSINESS_SETTINGS.phone}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
