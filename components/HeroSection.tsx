"use client";

import React from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Clock,
  Zap,
  Phone,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Star,
  Award,
  ArrowRight,
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
  locationName = "Dubai & Abu Dhabi",
  cityName = "UAE",
}) => {
  const handleWhatsApp = () => {
    Analytics.trackWhatsAppClick("Hero CTA", locationName);
    window.open(
      `https://wa.me/${BUSINESS_SETTINGS.whatsappNumber}?text=Hello%20Al-Safwa%2C%20I%20need%20urgent%20home%20repair%20and%20maintenance%20in%20UAE`,
      "_blank"
    );
  };

  const handlePhone = () => {
    Analytics.trackPhoneCallClick("Hero CTA", locationName);
    window.location.href = `tel:${BUSINESS_SETTINGS.phone.replace(/[^0-9+]/g, "")}`;
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-14 lg:pt-14 lg:pb-18 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/40 border-b border-surfaceBorder">
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#e2e8f060_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f060_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column (7 cols): Main Typography & CTA */}
          <div className="lg:col-span-7 text-left space-y-5">
            {/* Top Pill Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-emerald-800">
                24/7 Rapid Response Dispatch • Avg Arrival: 25 Mins
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-slate-950 leading-[1.12]">
              UAE&apos;s Most Trusted <br />
              <span className="text-slate-900">Home Repair &amp; </span>
              <span className="text-brand-600">Maintenance</span>
            </h1>

            {/* Description Subtext */}
            <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
              Certified European-standard technicians at your doorstep in 30 minutes across Dubai &amp; Abu Dhabi. Transparent upfront pricing, zero surprise charges, and an unconditional 90-day guarantee on all repairs.
            </p>

            {/* Action Buttons Row */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenQuoteModal()}
                className="px-6 sm:px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-heading font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <span>Book Service Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsApp}
                className="px-5 sm:px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-heading font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp: {BUSINESS_SETTINGS.whatsappNumber}</span>
              </button>
            </div>

            {/* Trust Metrics Row */}
            <div className="pt-4 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">4.9 / 5.0</div>
                  <div className="text-[10px] text-slate-500">2,450+ Reviews</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-brand-600 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">30-Min Rapid</div>
                  <div className="text-[10px] text-slate-500">Arrival Guarantee</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">90-Day Free</div>
                  <div className="text-[10px] text-slate-500">Repair Warranty</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">DEWA Licensed</div>
                  <div className="text-[10px] text-slate-500">&amp; Fully Insured</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): High-Quality Technician Image (NO FORM) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 aspect-[4/3] group">
              <img
                src="/images/hero_technician.jpg"
                alt="Al-Safwa Master Technical Specialist UAE"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 text-white backdrop-blur-md border border-white/20 text-xs font-bold shadow-lg">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Licensed UAE Specialist</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 text-white backdrop-blur-md text-xs font-bold shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span>Active On-Call</span>
                </div>
              </div>

              {/* Bottom Floating Info Card */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                    ✓
                  </div>
                  <div>
                    <div className="text-xs font-heading font-extrabold text-slate-900">
                      Master Technical Engineers
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Uniformed • ID Verified • Background Screened
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onOpenQuoteModal()}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-brand-600 text-white text-xs font-bold transition shadow-xs"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
