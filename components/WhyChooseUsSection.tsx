"use client";

import React from "react";
import { Clock, Users, Tag, ShieldCheck, CheckCircle2 } from "lucide-react";

export const WhyChooseUsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (5 cols): Real UAE Technician Photo with Dubai Skyline */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 aspect-[4/3] group">
              <img
                src="/images/technician_ac.jpg"
                alt="Al-Safwa Certified Engineer Servicing Villa AC Unit in Dubai"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

              {/* Floating Bottom Status Pill */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs font-heading font-extrabold text-slate-900">
                    Active Works Engineers
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    Clean uniform, sanitized shoe covers &amp; certified toolkit
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): 4 Feature Grid Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-amber-400 border border-slate-800 text-xs font-bold uppercase tracking-wider mb-2.5">
                <span>The Al-Safwa Difference</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-950 tracking-tight leading-tight">
                Why Discerning Residents Choose Us Over Ordinary Handymen
              </h2>
            </div>

            {/* 4 Cards Grid (2x2) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              {/* Card 1 */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-brand-300 transition shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-brand-600 flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                  30-Min Rapid Arrival
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Local UAE fleet stationed nearby right from your community for immediate dispatch.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-brand-300 transition shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                  100% In-House Team
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Zero third-party freelancers. Every technician is directly employed, verified, and criminal-record screened.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-brand-300 transition shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                  <Tag className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                  Transparent Upfront Pricing
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Fixed-rate approved written quotations before any tool touches your equipment. No hidden fees.
                </p>
              </div>

              {/* Card 4 */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-brand-300 transition shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                  90-Day Free Warranty
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  If the repaired item encounters issues within 90 days, our crew returns to resolve it immediately with zero callout fee.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
