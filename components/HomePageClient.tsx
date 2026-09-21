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
import { EmergencyAlertBanner } from "./EmergencyAlertBanner";
import { ServiceCategoryGrid } from "./ServiceCategoryGrid";
import { AMCComparisonTable } from "./AMCComparisonTable";
import { WhyChooseUsSection } from "./WhyChooseUsSection";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { TransformationsSection } from "./TransformationsSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { CoverageHubsSection } from "./CoverageHubsSection";
import { useModal } from "./AppShell";
import {
  MessageSquare,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Analytics } from "@/lib/analytics";
import { BUSINESS_SETTINGS } from "@/lib/data";

interface HomePageClientProps {
  categories?: CategoryData[];
  services?: ServiceData[];
  locations?: LocationData[];
  amcPackages?: AMCPackageData[];
  portfolioItems?: PortfolioItemData[];
  testimonials?: TestimonialData[];
}

export const HomePageClient: React.FC<HomePageClientProps> = ({
  categories = [],
  services = [],
  amcPackages = [],
  portfolioItems = [],
  testimonials = [],
}) => {
  const { openQuoteModal } = useModal();

  const handleWhatsApp = () => {
    Analytics.trackWhatsAppClick("Bottom Action Banner", "Dubai, Abu Dhabi & Sharjah");
    window.open(
      `https://wa.me/${BUSINESS_SETTINGS.whatsappNumber}?text=Hello%20Al-Safwa%2C%20I%20need%20urgent%20home%20repair%20and%20maintenance`,
      "_blank"
    );
  };

  return (
    <div className="space-y-0 text-slate-900 bg-white">
      {/* 1. Hero Section (with High-Quality Technician Image, No Form) */}
      <HeroSection onOpenQuoteModal={openQuoteModal} />

      {/* 2. Emergency Red Alert Banner */}
      <EmergencyAlertBanner onOpenEmergencyModal={() => openQuoteModal("emergency-plumbing-repair")} />

      {/* 3. Commercial-Grade Services for Luxury Residences (6 Core Services) */}
      <ServiceCategoryGrid
        services={services}
        categories={categories}
        onBookService={(slug) => openQuoteModal(slug)}
      />

      {/* 4. Select Your Maintenance Blueprint (AMC Contract Plans) */}
      <AMCComparisonTable
        packages={amcPackages}
        onSelectPackage={(tier) => openQuoteModal(tier)}
      />

      {/* 5. Why Discerning Residents Choose Us Over Ordinary Handymen */}
      <WhyChooseUsSection />

      {/* 6. Interactive Before & After Transformation Slider */}
      <BeforeAfterSlider portfolioItems={portfolioItems} />

      {/* 7. Real On-Site Case Studies Grid */}
      <TransformationsSection />

      {/* 8. Endorsed by Over 2,450 UAE Property Owners (Testimonials) */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 9. Guaranteed 30-Minute Dispatch Across 24+ Communities */}
      <CoverageHubsSection />

      {/* 10. High-Impact Bottom CTA Banner */}
      <section className="py-16 sm:py-20 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 border border-white/20 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Immediate Technician Dispatch</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold tracking-tight text-white leading-tight">
            Don&apos;t Let Home Maintenance Ruin Your Day. <br className="hidden sm:inline" />
            Get It Fixed Right, The First Time.
          </h2>

          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Book now and have an ISO-certified technician inspect your issue within 25 minutes with our zero-surprise-pricing guarantee.
          </p>

          <div className="pt-4 flex flex-wrap justify-center items-center gap-3.5">
            <button
              onClick={() => openQuoteModal()}
              className="px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-heading font-extrabold text-xs sm:text-sm shadow-lg transition-all flex items-center gap-2"
            >
              <span>Book An Expert Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleWhatsApp}
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-heading font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Instant WhatsApp Chat</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
