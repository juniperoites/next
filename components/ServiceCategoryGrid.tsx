"use client";

import React from "react";
import Link from "next/link";
import { ServiceData, CategoryData } from "@/lib/types";
import {
  Fan,
  Droplets,
  Zap,
  Paintbrush,
  Hammer,
  Wrench,
  CheckCircle2,
  Phone,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { BUSINESS_SETTINGS } from "@/lib/data";
import { Analytics } from "@/lib/analytics";

interface ServiceGridProps {
  services?: ServiceData[];
  categories?: CategoryData[];
  onBookService: (serviceSlug: string) => void;
  selectedCity?: string;
  selectedLocation?: string;
}

interface CuratedServiceItem {
  id: string;
  slug: string;
  title: string;
  price: number;
  category: string;
  icon: React.ReactNode;
  iconBg: string;
  description: string;
  checklist: [string, string];
}

const CURATED_SERVICES: CuratedServiceItem[] = [
  {
    id: "srv-ac",
    slug: "ac-repair",
    title: "AC Repair & Coil Cleaning",
    price: 150,
    category: "HVAC & Cooling",
    icon: <Fan className="w-5 h-5 text-blue-600" />,
    iconBg: "bg-blue-50 border-blue-200",
    description:
      "Airflow boost & chemical coil cleaning, comprehensive diagnostic checks with 100% gas top-up, and micro-bubble pressure cleaning for total calmness.",
    checklist: [
      "4.9-Star rated by 1,200+ customers",
      "Same-day & 2-hour arrival available",
    ],
  },
  {
    id: "srv-plumb",
    slug: "emergency-plumbing-repair",
    title: "Emergency Plumbing Services",
    price: 150,
    category: "Sanitary & Leaks",
    icon: <Droplets className="w-5 h-5 text-cyan-600" />,
    iconBg: "bg-cyan-50 border-cyan-200",
    description:
      "Acoustic leak detection, water heater tender element replacement, high-pressure drain unblocking, submerged pump, and sanitary fixtures.",
    checklist: [
      "Thermal camera inspection for zero wall tearing",
      "Pumps & valves stocked on tech service vans",
    ],
  },
  {
    id: "srv-elec",
    slug: "electrical-db-short-circuit",
    title: "Electrical & DB Short Circuit Fixes",
    price: 150,
    category: "DEWA Certified",
    icon: <Zap className="w-5 h-5 text-amber-600" />,
    iconBg: "bg-amber-50 border-amber-200",
    description:
      "DEWA-compliant distribution board rewires, emergency short-circuit tracing, resolutions, luxury chandelier mounts, and server station earthings.",
    checklist: [
      "Megger insulation testing reports provided",
      "Certified DEWA licensed electrical engineers",
    ],
  },
  {
    id: "srv-paint",
    slug: "villa-painting-decor",
    title: "Villa & Apartment Painting",
    price: 689,
    category: "Jotun Luxury",
    icon: <Paintbrush className="w-5 h-5 text-emerald-600" />,
    iconBg: "bg-emerald-50 border-emerald-200",
    description:
      "Odor-certified ultra-low VOC paints, Jotun Luxury plastic coating, furniture masking with heavy plastic drop wrap, and symmetry-laser line finishing.",
    checklist: [
      "100% spotless clean finish guarantee",
      "Surface filler & hairline crack repairs",
    ],
  },
  {
    id: "srv-handy",
    slug: "furniture-assembly-tv-mounting",
    title: "Handyman & Precision Carpentry",
    price: 110,
    category: "General Maintenance",
    icon: <Hammer className="w-5 h-5 text-slate-700" />,
    iconBg: "bg-slate-100 border-slate-200",
    description:
      "Laser-leveled TV bracket mounting, custom IKEA & Italian furniture assembly, smart motorized curtain installation, door locks, and glass panels.",
    checklist: [
      "Heavy-duty wall anchors & stud safety checkers",
      "Fast 60-minute quick-fix service",
    ],
  },
  {
    id: "srv-appliance",
    slug: "major-appliance-repair",
    title: "Major Home Appliance Repair",
    price: 189,
    category: "Electronics & Motors",
    icon: <Wrench className="w-5 h-5 text-purple-600" />,
    iconBg: "bg-purple-50 border-purple-200",
    description:
      "In-home diagnostic for Bosch, Siemens, Miele, Samsung, and LG appliances. Washers, coolers, refrigerators, oven igniters, and dishwashers.",
    checklist: [
      "Genuine OEM spare parts with manufacturer serials",
      "Same-day fix on 92% of first visits",
    ],
  },
];

export const ServiceCategoryGrid: React.FC<ServiceGridProps> = ({
  onBookService,
}) => {
  const handleDirectCall = (serviceTitle: string) => {
    Analytics.trackPhoneCallClick(`Service Card - ${serviceTitle}`, "UAE");
    window.location.href = `tel:${BUSINESS_SETTINGS.phone.replace(/[^0-9+]/g, "")}`;
  };

  return (
    <section id="services" className="py-14 sm:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-amber-400 border border-slate-800 text-xs font-bold uppercase tracking-wider mb-2.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>ISO 9001 &amp; DEWA Certified</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-950 tracking-tight">
              Commercial-Grade Services for Luxury Residences
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              Direct technical solutions delivered with calibrated tools, high-accuracy digital diagnostics, and unconditional manufacturer-grade parts on all technical services.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onBookService("ac-repair")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-heading font-bold text-xs shadow-sm transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Price Guide</span>
            </button>
          </div>
        </div>

        {/* 6 Curated Commercial-Grade Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CURATED_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="rounded-3xl p-6 bg-white border border-slate-200/90 hover:border-brand-400 hover:shadow-xl transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                {/* Header: Icon & Starting Price */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl ${srv.iconBg} border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200`}
                  >
                    {srv.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                      From
                    </span>
                    <span className="font-heading font-extrabold text-lg text-slate-900">
                      AED {srv.price}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-slate-950 group-hover:text-brand-600 transition leading-snug">
                  {srv.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                  {srv.description}
                </p>

                {/* 2 Verification Bullet Points */}
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{srv.checklist[0]}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{srv.checklist[1]}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onBookService(srv.slug)}
                  className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-heading font-extrabold text-xs shadow-sm hover:shadow transition-all text-center"
                >
                  Book Now
                </button>
                <button
                  onClick={() => handleDirectCall(srv.title)}
                  className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition flex items-center justify-center"
                  title="Call for this service"
                >
                  <Phone className="w-4 h-4 text-slate-700" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
