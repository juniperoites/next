"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Sparkles, Clock, ShieldCheck } from "lucide-react";

const HUBS = [
  "Dubai Marina & JBR",
  "Palm Jumeirah",
  "Downtown Dubai & DIFC",
  "Emirates Hills",
  "Arabian Ranches 1, 2 & 3",
  "Dubai Hills Estate",
  "Jumeirah Village Circle (JVC)",
  "Jumeirah Golf Estates",
  "Business Bay & City Walk",
  "Saadiyat & Yas Island (AD)",
  "Al Barsha & Al Safa",
  "Mirdif & Al Warqa",
];

export const CoverageHubsSection: React.FC = () => {
  return (
    <section id="coverage" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-amber-400 border border-slate-800 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>24/7 Rapid Coverage Grid</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-950 tracking-tight">
            Guaranteed 30-Minute Dispatch Across 24+ Communities
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Dedicated fleet vans stationed across primary UAE freehold master developments and high-rise districts.
          </p>
        </div>

        {/* Community Pills Grid */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 max-w-4xl mx-auto">
          {HUBS.map((hub, idx) => (
            <Link
              key={idx}
              href="/areas"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-brand-50 border border-slate-200 hover:border-brand-300 text-xs font-heading font-bold text-slate-800 hover:text-brand-600 shadow-xs transition-all transform hover:-translate-y-0.5"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{hub}</span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
