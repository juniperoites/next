"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { AMCPackageData } from "@/lib/types";
import { Analytics } from "@/lib/analytics";

interface AMCComparisonProps {
  packages?: AMCPackageData[];
  onSelectPackage: (tierSlug: string) => void;
}

export const AMCComparisonTable: React.FC<AMCComparisonProps> = ({
  onSelectPackage,
}) => {
  const [selectedBilling] = useState<"annual" | "monthly">("annual");

  const handleSelect = (tier: string) => {
    Analytics.trackAMCTierSelection(tier, selectedBilling);
    onSelectPackage(tier);
  };

  return (
    <section id="amc-packages" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Tailored Maintenance Blueprint</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-950 tracking-tight">
            Select Your Maintenance Blueprint
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            From single emergency callouts to guaranteed round-the-clock annual maintenance blueprints for high-value properties.
          </p>
        </div>

        {/* 3 Blueprint Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* 1. Standard Callout (White Card) */}
          <div className="rounded-3xl p-7 bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Pay As You Go
              </div>
              <h3 className="font-heading font-extrabold text-xl text-slate-900">
                Standard Callout
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-heading font-extrabold text-slate-950">
                  AED 149
                </span>
                <span className="text-xs text-slate-500 font-medium">/ single visit</span>
              </div>
              <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                Ideal for minor appliance repairs, faucet drips, or quick one-off troubleshooting visits.
              </p>

              {/* Feature List */}
              <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✓
                  </div>
                  <span>1-hour comprehensive diagnostic audit</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✓
                  </div>
                  <span>Transparent itemized parts quotation</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✓
                  </div>
                  <span>30-day work warranty report</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✓
                  </div>
                  <span>24-hour phone booking hotline</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleSelect("standard-callout")}
              className="mt-8 w-full py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 font-heading font-bold text-xs transition"
            >
              Select Callout
            </button>
          </div>

          {/* 2. Executive Villa AMC (Dark Luxury Featured Card) */}
          <div className="rounded-3xl p-7 bg-slate-950 text-white border-2 border-amber-400 shadow-2xl relative flex flex-col justify-between transform lg:-translate-y-2">
            {/* Top Featured Pill */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-slate-950 font-heading font-extrabold text-[10px] uppercase tracking-wider shadow-md">
              Most Popular For Villas
            </div>

            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                Annual Comprehensive
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-white">
                Executive Villa AMC
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
                  AED 2,890
                </span>
                <span className="text-xs text-slate-400 font-medium">/ year</span>
              </div>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                Standalone or compound villas across Dubai Hills, Palm Jumeirah, and Emirates Living.
              </p>

              {/* Feature List */}
              <div className="mt-6 pt-6 border-t border-slate-800 space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-slate-200 font-semibold">
                  <div className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✓
                  </div>
                  <span><strong className="text-amber-400">UNLIMITED</strong> Emergency Callouts (Zero Labor Fee)</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-200">
                  <div className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✓
                  </div>
                  <span>4x Scheduled AC preventative coil deep cleans</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-200">
                  <div className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✓
                  </div>
                  <span>2x Comprehensive electrical &amp; plumbing safety sweeps</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-200">
                  <div className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✓
                  </div>
                  <span>Guaranteed 30-minute priority arrival</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-200">
                  <div className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✓
                  </div>
                  <span>20% discount on all spare parts &amp; materials</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleSelect("executive-villa-amc")}
              className="mt-8 w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 active:scale-95 text-slate-950 font-heading font-extrabold text-xs sm:text-sm shadow-lg transition-all"
            >
              Start My Family AMC
            </button>
          </div>

          {/* 3. Premium Apartment AMC (White Card) */}
          <div className="rounded-3xl p-7 bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Annual Care
              </div>
              <h3 className="font-heading font-extrabold text-xl text-slate-900">
                Premium Apartment AMC
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-heading font-extrabold text-slate-950">
                  AED 1,399
                </span>
                <span className="text-xs text-slate-500 font-medium">/ year</span>
              </div>
              <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                Specialized engineers for Downtown, Marina, Business Bay, and DIFC high-rise towers.
              </p>

              {/* Feature List */}
              <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✓
                  </div>
                  <span>4x Full air conditioning maintenance checks</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✓
                  </div>
                  <span>2x Scheduled AC evaporator deep cleans</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✓
                  </div>
                  <span>Free routine plumbing &amp; electrical parts audits</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✓
                  </div>
                  <span>90-day parts replacement guarantee</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleSelect("premium-apartment-amc")}
              className="mt-8 w-full py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 font-heading font-bold text-xs transition"
            >
              Select Apartment Plan
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
