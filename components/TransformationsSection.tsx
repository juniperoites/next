"use client";

import React from "react";

interface TransformationItem {
  id: string;
  title: string;
  location: string;
  beforeTag: string;
  afterTag: string;
  desc: string;
  beforeImg: string;
  afterImg: string;
}

const TRANSFORMATIONS: TransformationItem[] = [
  {
    id: "trans-ac",
    title: "AC Coil Chemical Decontamination",
    location: "Palm Jumeirah Signature Villa",
    beforeTag: "BEFORE / CLOGGED",
    afterTag: "AFTER / RESTORED",
    desc: "Restored airflow and total cooling efficiency in under 2 hours.",
    beforeImg: "/images/ac_coil_before.jpg",
    afterImg: "/images/ac_coil_after.jpg",
  },
  {
    id: "trans-db",
    title: "DB Box Rewiring & Safety Overhaul",
    location: "Downtown Dubai Penthouse",
    beforeTag: "BEFORE / HAZARD",
    afterTag: "AFTER / DEWA CERTIFIED",
    desc: "Resolved frequent tripping and integrated clean load-isolating breakers.",
    beforeImg: "/images/db_box_before.jpg",
    afterImg: "/images/db_box_after.jpg",
  },
  {
    id: "trans-heater",
    title: "Heater Replacement & Pressure Valve",
    location: "Dubai Hills Estate Villa",
    beforeTag: "BEFORE / CORRODED",
    afterTag: "AFTER / ITALIAN BRASS",
    desc: "Replaced leaking central tank with high-efficiency Italian Ariston system.",
    beforeImg: "/images/water_heater_before.jpg",
    afterImg: "/images/water_heater_after.jpg",
  },
  {
    id: "trans-paint",
    title: "Luxury Interior Wall Repainting",
    location: "Arabian Ranches Luxury Villa",
    beforeTag: "BEFORE / DAMAGED",
    afterTag: "AFTER / JOTUN VELVET",
    desc: "Transformed walls with zero-odor luxury Jotun Fenomastic paint coating.",
    beforeImg: "/images/villa_paint_before.jpg",
    afterImg: "/images/villa_paint_after.jpg",
  },
];

export const TransformationsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-amber-400 border border-slate-800 text-xs font-bold uppercase tracking-wider mb-2.5">
              <span>On-Site Technical Proof</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-950 tracking-tight">
              Real Transformations Across UAE Residences
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Actual verified daily maintenance jobs executed by our lead engineers on-site.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRANSFORMATIONS.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Visual Before/After Dual Split Box */}
                <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden grid grid-cols-2">
                  {/* Left (Before) */}
                  <div className="relative h-full overflow-hidden border-r border-white/40">
                    <img
                      src={item.beforeImg}
                      alt={`${item.title} Before`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="px-1.5 py-0.5 rounded bg-red-600/90 text-white font-heading font-extrabold text-[9px] tracking-wide uppercase shadow-sm">
                        BEFORE
                      </span>
                    </div>
                  </div>

                  {/* Right (After) */}
                  <div className="relative h-full overflow-hidden">
                    <img
                      src={item.afterImg}
                      alt={`${item.title} After`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 right-2">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white font-heading font-extrabold text-[9px] tracking-wide uppercase shadow-sm">
                        AFTER ✓
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {item.location}
                  </div>
                  <h3 className="font-heading font-extrabold text-base text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
