"use client";

import React, { useState } from "react";
import { AMCPackageData } from "@/lib/types";
import { Check, Shield, Star } from "lucide-react";
import { Analytics } from "@/lib/analytics";

interface AMCProps {
  packages: AMCPackageData[];
  onSelectPackage: (tier: string) => void;
}

export const AMCComparisonTable: React.FC<AMCProps> = ({ packages, onSelectPackage }) => {
  const [billingCycle, setBillingCycle] = useState<"annual" | "monthly">("annual");

  const handlePackageClick = (pkg: AMCPackageData) => {
    Analytics.trackAMCInquiry(pkg.tier, pkg.priceAnnualAED);
    onSelectPackage(pkg.tier);
  };

  return (
    <section id="amc-packages" className="py-16 sm:py-20 bg-surface border-y border-surfaceBorder relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-brand-700 border border-blue-200 text-xs font-bold tracking-wider uppercase mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>365-Day Annual Maintenance Contracts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            Complete Villa & Apartment Protection Plans
          </h2>
          <p className="mt-3 text-slate-600 text-sm">
            Prevent catastrophic HVAC, plumbing, and electrical failures with DEWA-certified planned preventative maintenance and guaranteed 24/7 emergency response.
          </p>

          {/* Billing Switcher */}
          <div className="mt-7 inline-flex items-center p-1.5 rounded-2xl bg-white border border-surfaceBorder shadow-subtle">
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                billingCycle === "annual"
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>Annual Contract</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold uppercase">
                Save 15%
              </span>
            </button>
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                billingCycle === "monthly"
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Monthly Billing
            </button>
          </div>
        </div>

        {/* Packages Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {packages.map((pkg) => {
            const isFeatured = pkg.isFeatured || pkg.tier === "GOLD";
            const price = billingCycle === "annual" ? pkg.priceAnnualAED : pkg.priceMonthlyAED;
            const period = billingCycle === "annual" ? "/ year" : "/ month";

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-7 flex flex-col justify-between transition-all duration-200 ${
                  isFeatured
                    ? "bg-white border-2 border-brand-600 shadow-premium scale-105 z-10"
                    : "bg-white border border-surfaceBorder hover:border-slate-300 shadow-subtle"
                }`}
              >
                {/* Most Popular Ribbon */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-600 text-white font-extrabold text-[11px] tracking-wider uppercase shadow-md flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-white" />
                    <span>Most Popular in UAE Villas</span>
                  </div>
                )}

                <div>
                  <div className="text-xs font-bold text-brand-700 uppercase tracking-wider mb-1">
                    {pkg.tier} TIER
                  </div>
                  <h3 className="text-2xl font-heading font-extrabold text-slate-900">
                    {pkg.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 font-medium">
                    Best for: <strong className="text-slate-800">{pkg.targetPropertyType}</strong>
                  </p>

                  {/* Price */}
                  <div className="mt-5 pb-5 border-b border-surfaceBorder">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs text-slate-400 font-bold">AED</span>
                      <span className="text-4xl font-heading font-extrabold text-slate-900">
                        {price.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-500">{period}</span>
                    </div>
                    {billingCycle === "annual" && (
                      <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                        Includes VAT & Free 24/7 Emergency Surcharge Waiver
                      </div>
                    )}
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-2 py-4 border-b border-surfaceBorder text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] font-semibold">Emergency Calls:</span>
                      <span className="font-bold text-slate-900">
                        {pkg.emergencyCallouts === -1 ? "Unlimited 24/7" : `${pkg.emergencyCallouts} Callouts / Yr`}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px] font-semibold">Preventative Visits:</span>
                      <span className="font-bold text-slate-900">{pkg.visitsPerYear} Comprehensive</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="mt-5 space-y-2.5">
                    <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Included Package Coverage:
                    </div>
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0 mt-0.5 text-emerald-700 font-bold">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8">
                  <button
                    onClick={() => handlePackageClick(pkg)}
                    className={`w-full py-3.5 rounded-xl font-bold text-xs tracking-wide transition shadow-sm ${
                      isFeatured
                        ? "bg-brand-600 hover:bg-brand-700 text-white shadow-md"
                        : "bg-surface hover:bg-surfaceHover text-slate-800 border border-surfaceBorder font-bold"
                    }`}
                  >
                    Select {pkg.name} Plan
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
