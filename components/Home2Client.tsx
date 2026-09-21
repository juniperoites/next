"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CategoryData,
  ServiceData,
  LocationData,
  AMCPackageData,
  PortfolioItemData,
  TestimonialData,
} from "@/lib/types";
import { useModal } from "./AppShell";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import {
  Fan,
  Droplets,
  Zap,
  Paintbrush,
  Hammer,
  Wrench,
  ShieldCheck,
  Clock,
  Star,
  CheckCircle2,
  Phone,
  MessageSquare,
  ArrowRight,
  Sparkles,
  MapPin,
  Building2,
  Home,
  Layers,
  ChevronRight,
  Shield,
  Award,
} from "lucide-react";
import { BUSINESS_SETTINGS } from "@/lib/data";
import { Analytics } from "@/lib/analytics";

interface Home2Props {
  categories?: CategoryData[];
  services?: ServiceData[];
  locations?: LocationData[];
  amcPackages?: AMCPackageData[];
  portfolioItems?: PortfolioItemData[];
  testimonials?: TestimonialData[];
}

export const Home2Client: React.FC<Home2Props> = ({
  categories = [],
  services = [],
  locations = [],
  amcPackages = [],
  portfolioItems = [],
  testimonials = [],
}) => {
  const { openQuoteModal } = useModal();

  // Hero Quick Booking Bar state
  const [selectedService, setSelectedService] = useState<string>("ac-repair");
  const [selectedLocation, setSelectedLocation] = useState<string>("Dubai Marina");
  const [activePropertyType, setActivePropertyType] = useState<"apt" | "villa" | "commercial">("villa");

  // Calculator State
  const [calcService, setCalcService] = useState<string>("ac-cleaning");
  const [calcSize, setCalcSize] = useState<string>("3bed");

  const calculateEstimate = () => {
    let base = 150;
    if (calcService === "ac-repair") base = 180;
    if (calcService === "ac-cleaning") base = 150;
    if (calcService === "plumbing") base = 160;
    if (calcService === "electrical") base = 150;
    if (calcService === "painting") base = 650;
    if (calcService === "handyman") base = 120;

    let multiplier = 1;
    if (calcSize === "1bed") multiplier = 1;
    if (calcSize === "2bed") multiplier = 1.3;
    if (calcSize === "3bed") multiplier = 1.7;
    if (calcSize === "villa") multiplier = 2.4;

    return Math.round(base * multiplier);
  };

  const handleWhatsApp = (context = "Home 2 Page") => {
    Analytics.trackWhatsAppClick(context, selectedLocation);
    window.open(
      `https://wa.me/${BUSINESS_SETTINGS.whatsappNumber}?text=Hello%20Al-Safwa%2C%20I%20need%20urgent%20service%20in%20${encodeURIComponent(selectedLocation)}`,
      "_blank"
    );
  };

  const handlePhone = () => {
    Analytics.trackPhoneCallClick("Home 2 Direct Hotline", "UAE");
    window.location.href = `tel:${BUSINESS_SETTINGS.phone.replace(/[^0-9+]/g, "")}`;
  };

  const servicesList = [
    {
      slug: "ac-repair",
      name: "AC Repair & Coil Deep Clean",
      price: 150,
      icon: <Fan className="w-5 h-5 text-blue-600" />,
      bg: "bg-blue-50 border-blue-200",
      desc: "Fast cooling restoration, gas charging, capacitor replacement, and microbial duct sanitization.",
      tag: "Most Requested",
      tagColor: "bg-blue-100 text-blue-800",
    },
    {
      slug: "emergency-plumbing-repair",
      name: "Emergency Plumbing & Leaks",
      price: 150,
      icon: <Droplets className="w-5 h-5 text-cyan-600" />,
      bg: "bg-cyan-50 border-cyan-200",
      desc: "Thermal acoustic leak detection, water heater overhauls, high-pressure drain unblocking.",
      tag: "24/7 Rapid",
      tagColor: "bg-cyan-100 text-cyan-800",
    },
    {
      slug: "electrical-db-short-circuit",
      name: "Electrical & DB Short Circuit",
      price: 150,
      icon: <Zap className="w-5 h-5 text-amber-600" />,
      bg: "bg-amber-50 border-amber-200",
      desc: "DEWA-compliant distribution board rewires, breaker troubleshooting, and surge safety checks.",
      tag: "DEWA Certified",
      tagColor: "bg-amber-100 text-amber-900",
    },
    {
      slug: "villa-painting-decor",
      name: "Villa & Apartment Painting",
      price: 689,
      icon: <Paintbrush className="w-5 h-5 text-emerald-600" />,
      bg: "bg-emerald-50 border-emerald-200",
      desc: "Jotun luxury low-VOC velvet coatings, laser-guided straight lines, and full furniture protection.",
      tag: "Jotun Luxury",
      tagColor: "bg-emerald-100 text-emerald-800",
    },
    {
      slug: "furniture-assembly-tv-mounting",
      name: "Handyman & Precision Assembly",
      price: 110,
      icon: <Hammer className="w-5 h-5 text-slate-700" />,
      bg: "bg-slate-100 border-slate-200",
      desc: "Laser-leveled TV bracket mounting, custom Italian furniture assembly, and lock installations.",
      tag: "Multi-Skill",
      tagColor: "bg-slate-200 text-slate-800",
    },
    {
      slug: "major-appliance-repair",
      name: "Major Home Appliance Care",
      price: 189,
      icon: <Wrench className="w-5 h-5 text-purple-600" />,
      bg: "bg-purple-50 border-purple-200",
      desc: "In-home repair for Bosch, Siemens, Miele, Samsung, and LG washers, ovens, and fridges.",
      tag: "OEM Parts",
      tagColor: "bg-purple-100 text-purple-800",
    },
  ];

  const communities = [
    { name: "Dubai Marina & JBR", time: "18 mins", vans: 3 },
    { name: "Palm Jumeirah", time: "22 mins", vans: 2 },
    { name: "Downtown & DIFC", time: "15 mins", vans: 4 },
    { name: "Dubai Hills Estate", time: "20 mins", vans: 3 },
    { name: "Arabian Ranches 1, 2, 3", time: "25 mins", vans: 2 },
    { name: "JVC & JVT", time: "18 mins", vans: 3 },
    { name: "Emirates Hills & Meadows", time: "20 mins", vans: 2 },
    { name: "Saadiyat & Yas Island (AD)", time: "25 mins", vans: 3 },
  ];

  return (
    <div className="bg-white text-slate-900 selection:bg-amber-100 selection:text-amber-900">
      
      {/* 1. ULTRA-CLEAN MODERN HERO SECTION */}
      <section className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-slate-50/60 via-white to-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Status Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-medium shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-amber-300 font-bold">24/7 Rapid Dispatch:</span>
                <span className="text-slate-200">Average 25-Min Arrival Across UAE</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-slate-950 leading-[1.1]">
                Master Technical Care For <br />
                <span className="bg-gradient-to-r from-brand-600 via-brand-700 to-amber-500 bg-clip-text text-transparent">
                  Modern UAE Residences
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                DEWA-certified engineers, transparent fixed pricing, and an unconditional 90-day guarantee on every single AC, electrical, plumbing, and painting repair.
              </p>

              {/* Quick Interactive Booking Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xl shadow-slate-100/80 max-w-xl space-y-3.5">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  ⚡ Instant Service Selector
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Select Service</label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="ac-repair">❄️ AC Repair &amp; Coil Cleaning (From AED 150)</option>
                      <option value="emergency-plumbing-repair">🚿 Emergency Plumbing &amp; Leaks (From AED 150)</option>
                      <option value="electrical-db-short-circuit">⚡ Electrical &amp; DB Fixing (From AED 150)</option>
                      <option value="villa-painting-decor">🎨 Villa &amp; Apt Painting (From AED 689)</option>
                      <option value="furniture-assembly-tv-mounting">🔨 Handyman &amp; TV Mount (From AED 110)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Your Location</label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="Dubai Marina">📍 Dubai Marina &amp; JBR (18 mins)</option>
                      <option value="Palm Jumeirah">📍 Palm Jumeirah (22 mins)</option>
                      <option value="Downtown Dubai">📍 Downtown &amp; Business Bay (15 mins)</option>
                      <option value="Dubai Hills Estate">📍 Dubai Hills Estate (20 mins)</option>
                      <option value="Arabian Ranches">📍 Arabian Ranches (25 mins)</option>
                      <option value="JVC">📍 Jumeirah Village Circle (18 mins)</option>
                      <option value="Yas Island (Abu Dhabi)">📍 Saadiyat &amp; Yas Island (25 mins)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                  <button
                    onClick={() => openQuoteModal(selectedService)}
                    className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-heading font-extrabold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2"
                  >
                    <span>Request 25-Min Dispatch</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleWhatsApp("Hero Quick Selector")}
                    className="w-full sm:w-auto py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-heading font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* 4 Minimal Trust Bullets */}
              <div className="flex flex-wrap items-center gap-5 pt-2 text-xs font-bold text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>4.9/5.0 (2,450+ Reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>90-Day Free Warranty</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-brand-600" />
                  <span>DEWA Licensed Engineers</span>
                </div>
              </div>

            </div>

            {/* Right Visual Card (5 Cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 aspect-[4/3] group">
                <img
                  src="/images/hero_technician.jpg"
                  alt="Certified UAE Technical Engineer at Dubai Luxury Residence"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                {/* Floating Top Pill */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1.5 rounded-full bg-slate-900/90 text-white backdrop-blur-md text-xs font-bold border border-white/20">
                    🇦🇪 Dubai &amp; Abu Dhabi
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold">
                    ✓ Verified In-House
                  </span>
                </div>

                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-white/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-extrabold flex items-center justify-center text-sm shadow-sm">
                      ⚡
                    </div>
                    <div>
                      <div className="text-xs font-heading font-extrabold text-slate-900">
                        Rapid Emergency Squad
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Stocked with OEM Parts &amp; Digital Diagnostics
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handlePhone}
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-brand-600 text-white transition"
                    title="Call emergency hotline"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. CORE SERVICES MINIMALIST BENTO GRID */}
      <section className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Precision Engineering</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-slate-950 tracking-tight">
                Specialized Technical Services
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              Every job is performed with calibrated digital tools, OEM certified replacement components, and an unconditional 90-day warranty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((srv, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-brand-400 hover:shadow-xl hover:bg-white transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${srv.bg} border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                      {srv.icon}
                    </div>
                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${srv.tagColor}`}>
                      {srv.tag}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-lg text-slate-900 group-hover:text-brand-600 transition">
                    {srv.name}
                  </h3>
                  
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {srv.desc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-baseline justify-between text-xs">
                    <span className="text-slate-400 font-bold uppercase text-[10px]">Fixed Starting Rate</span>
                    <span className="font-heading font-extrabold text-base text-slate-950">
                      From AED {srv.price}
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/80 flex items-center gap-2">
                  <button
                    onClick={() => openQuoteModal(srv.slug)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-brand-600 text-white font-heading font-bold text-xs transition text-center"
                  >
                    Book Service
                  </button>
                  <Link
                    href={`/services/${srv.slug}`}
                    className="p-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition"
                    title="View details"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. TRANSPARENT INSTANT COST CALCULATOR STRIP */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 border border-white/20 text-xs font-bold uppercase tracking-wider mb-2.5">
              <span>Zero Surprise Pricing</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-heading font-extrabold tracking-tight">
              Instant AED Cost Estimator
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Select your service and property layout to get an instant realistic quote preview.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Controls (7 cols) */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">1. Select Maintenance Job</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: "ac-repair", label: "AC Repair" },
                    { id: "ac-cleaning", label: "AC Coil Clean" },
                    { id: "plumbing", label: "Plumbing Leak" },
                    { id: "electrical", label: "Electrical DB" },
                    { id: "painting", label: "Full Painting" },
                    { id: "handyman", label: "Handyman" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setCalcService(s.id)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition border ${
                        calcService === s.id
                          ? "bg-brand-600 text-white border-brand-500 shadow-sm"
                          : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">2. Property Layout</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "1bed", label: "Studio / 1BR" },
                    { id: "2bed", label: "2 - 3 Bedroom" },
                    { id: "3bed", label: "Townhouse" },
                    { id: "villa", label: "Luxury Villa" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setCalcSize(p.id)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition border ${
                        calcSize === p.id
                          ? "bg-amber-500 text-slate-950 border-amber-400 font-extrabold"
                          : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Estimation Result (5 cols) */}
            <div className="md:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 text-center space-y-4">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Estimated Transparent Rate
              </div>
              <div className="text-4xl sm:text-5xl font-heading font-extrabold text-white">
                AED {calculateEstimate()}
              </div>
              <div className="text-[11px] text-emerald-400 font-medium flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Includes Diagnostic + 90-Day Guarantee
              </div>
              <button
                onClick={() => openQuoteModal(calcService)}
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-heading font-extrabold text-xs sm:text-sm shadow-md transition"
              >
                Confirm Booking with This Rate
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 4. INTERACTIVE BEFORE & AFTER COMPARISON SLIDER */}
      <BeforeAfterSlider portfolioItems={portfolioItems} />

      {/* 5. 365-DAY ANNUAL MAINTENANCE CONTRACTS (AMC TIERS) */}
      <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider mb-2.5">
              <Shield className="w-3.5 h-3.5 text-amber-600" />
              <span>Year-Round Property Protection</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-950 tracking-tight">
              Annual Villa &amp; Apartment Care (AMC)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Unlimited emergency callouts, scheduled AC chemical deep cleaning, and zero labor charges.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Tier 1 */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Essential Care</div>
                <h3 className="font-heading font-extrabold text-xl text-slate-900">Apartment AMC</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-heading font-extrabold text-slate-950">AED 1,399</span>
                  <span className="text-xs text-slate-500">/ year</span>
                </div>
                <div className="mt-6 pt-5 border-t border-slate-100 space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">✓ 4x Scheduled AC preventative checks</div>
                  <div className="flex items-center gap-2">✓ 2x Evaporator chemical coil flushes</div>
                  <div className="flex items-center gap-2">✓ Priority 30-minute dispatch</div>
                  <div className="flex items-center gap-2">✓ 90-Day parts guarantee</div>
                </div>
              </div>
              <button
                onClick={() => openQuoteModal("premium-apartment-amc")}
                className="mt-8 w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs transition"
              >
                Select Apartment AMC
              </button>
            </div>

            {/* Tier 2 (Featured) */}
            <div className="p-7 rounded-3xl bg-slate-950 text-white border-2 border-amber-400 shadow-2xl relative flex flex-col justify-between transform lg:-translate-y-2">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider">
                Most Popular For Villas
              </div>
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Complete Security</div>
                <h3 className="font-heading font-extrabold text-2xl text-white">Executive Villa AMC</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-heading font-extrabold text-white">AED 2,890</span>
                  <span className="text-xs text-slate-400">/ year</span>
                </div>
                <div className="mt-6 pt-5 border-t border-slate-800 space-y-2.5 text-xs text-slate-200">
                  <div className="flex items-center gap-2 font-bold text-amber-400">✓ UNLIMITED Emergency Callouts (Zero Labor)</div>
                  <div className="flex items-center gap-2">✓ 4x AC overhaul visits + chemical washing</div>
                  <div className="flex items-center gap-2">✓ 2x Electrical &amp; Plumbing Safety Sweeps</div>
                  <div className="flex items-center gap-2">✓ 20% discount on all spare parts &amp; materials</div>
                </div>
              </div>
              <button
                onClick={() => openQuoteModal("executive-villa-amc")}
                className="mt-8 w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-heading font-extrabold text-xs transition shadow-lg"
              >
                Start My Villa AMC
              </button>
            </div>

            {/* Tier 3 */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Royal Coverage</div>
                <h3 className="font-heading font-extrabold text-xl text-slate-900">Luxury Estate VIP</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-heading font-extrabold text-slate-950">AED 5,490</span>
                  <span className="text-xs text-slate-500">/ year</span>
                </div>
                <div className="mt-6 pt-5 border-t border-slate-100 space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">✓ Unlimited emergency callouts 24/7</div>
                  <div className="flex items-center gap-2">✓ Dedicated master engineer assigned</div>
                  <div className="flex items-center gap-2">✓ AED 1,000 complimentary spare parts buffer</div>
                  <div className="flex items-center gap-2">✓ Bi-monthly HVAC, pool &amp; water pump audits</div>
                </div>
              </div>
              <button
                onClick={() => openQuoteModal("luxury-estate-amc")}
                className="mt-8 w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs transition"
              >
                Select Luxury VIP
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 6. REAL-TIME COVERAGE & FLEET DISPATCH RADAR */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Fleet Radar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-950 tracking-tight">
              Rapid Response Fleet Across UAE
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {communities.map((c, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between hover:border-brand-300 transition"
              >
                <div>
                  <div className="text-xs font-heading font-extrabold text-slate-900">{c.name}</div>
                  <div className="text-[11px] text-emerald-600 font-bold mt-0.5">
                    ⚡ {c.time} avg arrival
                  </div>
                </div>
                <span className="px-2 py-1 rounded-lg bg-white border border-slate-200 text-[10px] font-bold text-slate-600">
                  {c.vans} Vans On-Duty
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. HIGH-CONVERTING BOTTOM ACTION STRIP */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>24/7 Priority SLA Across UAE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-white leading-tight">
            Need Expert Maintenance Right Now?
          </h2>

          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Our certified master technicians are ready for immediate dispatch across Dubai &amp; Abu Dhabi.
          </p>

          <div className="pt-4 flex flex-wrap justify-center items-center gap-3.5">
            <button
              onClick={() => openQuoteModal()}
              className="px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-heading font-extrabold text-xs sm:text-sm shadow-lg transition"
            >
              Book Service in 30 Seconds
            </button>

            <button
              onClick={() => handleWhatsApp("Bottom Banner Home 2")}
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-heading font-bold text-xs sm:text-sm transition flex items-center gap-2 shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </button>

            <button
              onClick={handlePhone}
              className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call Hotline: {BUSINESS_SETTINGS.phone}</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
