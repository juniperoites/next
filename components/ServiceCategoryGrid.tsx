"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ServiceData, CategoryData } from "@/lib/types";
import {
  Sparkles,
  ArrowRight,
  Zap,
  CheckCircle2,
  Clock,
  Search,
  ShieldCheck,
  ChevronRight,
  Tag,
} from "lucide-react";

interface ServiceGridProps {
  services: ServiceData[];
  categories: CategoryData[];
  onBookService: (serviceSlug: string) => void;
  selectedCity?: string;
  selectedLocation?: string;
}

export const ServiceCategoryGrid: React.FC<ServiceGridProps> = ({
  services,
  categories,
  onBookService,
  selectedCity = "dubai",
  selectedLocation = "dubai-marina",
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredServices = services.filter((s) => {
    const matchesCategory =
      activeCategory === "all" ||
      s.categorySlug === activeCategory ||
      s.categoryId === activeCategory;

    const matchesSearch =
      searchQuery.trim() === "" ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.categoryName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="all-services" className="py-16 sm:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-brand-700 border border-blue-200 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Technical Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            Specialized Property Maintenance & Engineering
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Over 20+ specialized maintenance services executed by licensed engineers under strict Dubai Municipality and DEWA standards.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services (e.g. AC repair, water leak, DB tripping, Jotun painting, AMC...)"
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-surface border border-surfaceBorder text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition shadow-sm font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-10">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
              activeCategory === "all"
                ? "bg-brand-600 text-white shadow-sm"
                : "bg-surface hover:bg-surfaceHover text-slate-700 border border-surfaceBorder"
            }`}
          >
            <span>All Services</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeCategory === "all" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"}`}>
              {services.length}
            </span>
          </button>
          {categories.map((cat) => {
            const count = services.filter((s) => s.categorySlug === cat.slug || s.categoryId === cat.id).length;
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
                  isActive
                    ? "bg-brand-600 text-white shadow-sm"
                    : "bg-surface hover:bg-surfaceHover text-slate-700 border border-surfaceBorder"
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-12 clean-card rounded-2xl max-w-md mx-auto">
            <p className="text-slate-600 font-bold text-sm">No services found matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-3 text-xs font-bold text-brand-600 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredServices.map((service) => {
              const canonicalUrl = `/services/${service.slug}`;

              return (
                <div
                  key={service.id}
                  className="clean-card rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-brand-400 transition-all duration-300"
                >
                  <div>
                    {/* Visual Image Header */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                      <img
                        src={service.image || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold shadow-sm">
                          <Tag className="w-3 h-3 text-amber-400" />
                          {service.categoryName || "General"}
                        </span>

                        {service.emergencyAvailable ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-600 text-white text-[11px] font-bold shadow-md">
                            <Zap className="w-3 h-3" />
                            24/7 Emergency
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-200 text-[11px] font-semibold">
                            <Clock className="w-3 h-3" />
                            Scheduled
                          </span>
                        )}
                      </div>

                      {/* Bottom Image Title & Price */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                        <span className="text-[11px] font-extrabold text-white bg-emerald-600/90 backdrop-blur-md px-2.5 py-0.5 rounded-md shadow-sm">
                          ⚡ 30-Min On-Site SLA
                        </span>
                        {service.isPopular && (
                          <span className="text-[11px] font-extrabold text-amber-900 bg-amber-300 px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Popular
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6">
                      <h3 className="text-xl font-heading font-extrabold text-slate-900 group-hover:text-brand-600 transition leading-snug">
                        <Link href={canonicalUrl}>{service.name}</Link>
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {service.shortDesc}
                      </p>

                      {/* Feature Bullets */}
                      <ul className="mt-4 space-y-2">
                        {service.features.slice(0, 3).map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-1 font-medium">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Footer: Price & Booking Action */}
                  <div className="p-6 pt-4 border-t border-surfaceBorder bg-surface/40 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400">
                        Starting Tariff
                      </div>
                      <div className="text-lg font-heading font-extrabold text-slate-900">
                        AED {service.basePriceAED}{" "}
                        <span className="text-[11px] text-slate-500 font-normal">
                          {service.priceUnit ? `/ ${service.priceUnit.split(" ")[0]}` : ""}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={canonicalUrl}
                        className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-surface text-slate-700 text-xs font-bold border border-surfaceBorder transition shadow-xs"
                      >
                        Details
                      </Link>

                      <button
                        onClick={() => onBookService(service.slug)}
                        className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs shadow-sm hover:shadow transition transform active:scale-95 flex items-center gap-1"
                      >
                        <span>Book Now</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
