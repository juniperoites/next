"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  AlertCircle,
  Radio,
  Sliders,
  Check,
  Flame,
  Activity,
  ThumbsUp,
  UserCheck,
  Calendar,
  Compass,
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

  // 1. Hero Quick Diagnostic Tabs
  const [heroDiagnosticIndex, setHeroDiagnosticIndex] = useState(0);

  const heroIssues = [
    {
      id: "ac-cooling",
      tabLabel: "❄️ AC Blowing Warm Air",
      title: "AC Deep Diagnostics & Chemical Coil Restoration",
      symptom: "AC blowing warm air, low airflow, or ice on indoor evaporator coils.",
      solution: "Full gas pressure check, capacitor testing, and 12-bar chemical pressure coil wash.",
      eta: "18 - 25 Mins",
      price: "150 AED",
      serviceSlug: "ac-repair-troubleshooting",
      image: "/images/technician_ac.jpg",
      badge: "High Priority Dispatch",
    },
    {
      id: "plumbing-leak",
      tabLabel: "💧 Water Leak / Heater Issue",
      title: "Rapid Thermal Leak Isolation & Heater Overhaul",
      symptom: "Ceiling dripping, low water pressure, or water heater not heating / tripping breaker.",
      solution: "Acoustic sensor leak isolation, Italian Ariston element replacement & pressure testing.",
      eta: "15 - 20 Mins",
      price: "150 AED",
      serviceSlug: "emergency-plumbing-repair",
      image: "/images/water_heater_after.jpg",
      badge: "Emergency Response",
    },
    {
      id: "power-trip",
      tabLabel: "⚡ DB Switch / Power Tripping",
      title: "DEWA Certified Electrical DB Troubleshooting",
      symptom: "Main breaker tripping continuously, sparking socket, or partial blackout in villa.",
      solution: "Megger insulation resistance test, load rebalancing, and Schneider breaker replacement.",
      eta: "20 - 30 Mins",
      price: "150 AED",
      serviceSlug: "electrical-db-short-circuit",
      image: "/images/db_box_after.jpg",
      badge: "DEWA Certified",
    },
    {
      id: "villa-paint",
      tabLabel: "🎨 Villa & Apartment Painting",
      title: "Luxury Jotun Velvet Silk Villa Painting",
      symptom: "Scuffed walls, peeling paint, move-out handover repainting, or new modern accent color.",
      solution: "Laser line tape masking, 3-stage wall sanding, primer coat + 2x Jotun Silk finish.",
      eta: "Same-Day Start",
      price: "689 AED",
      serviceSlug: "villa-painting-decor",
      image: "/images/villa_paint_after.jpg",
      badge: "Jotun Silk Certified",
    },
    {
      id: "handyman-mounting",
      tabLabel: "🔨 Handyman & TV Mounting",
      title: "Precision TV Wall Mounting & Custom Assembly",
      symptom: "75\"-85\" TV bracket mounting, IKEA/Italian furniture assembly, chandelier hanging.",
      solution: "Stud sensor cable detection, heavy-duty Fischer toggle anchors & laser leveling.",
      eta: "30 - 45 Mins",
      price: "110 AED",
      serviceSlug: "furniture-assembly-tv-mounting",
      image: "/images/hero_technician.jpg",
      badge: "Laser Leveled",
    },
  ];

  const currentHeroIssue = heroIssues[heroDiagnosticIndex];

  // 2. Interactive Calculator / Booking Terminal State
  const [calcCategory, setCalcCategory] = useState<string>("ac");
  const [calcProperty, setCalcProperty] = useState<string>("2bed");
  const [calcUrgency, setCalcUrgency] = useState<"emergency" | "scheduled">("emergency");
  const [calcLocation, setCalcLocation] = useState<string>("Dubai Marina");

  const calculateCost = () => {
    let base = 150;
    if (calcCategory === "ac") base = 150;
    if (calcCategory === "plumbing") base = 160;
    if (calcCategory === "electrical") base = 150;
    if (calcCategory === "painting") base = 650;
    if (calcCategory === "handyman") base = 110;

    let propMultiplier = 1;
    if (calcProperty === "studio") propMultiplier = 0.9;
    if (calcProperty === "1bed") propMultiplier = 1.0;
    if (calcProperty === "2bed") propMultiplier = 1.25;
    if (calcProperty === "villa") propMultiplier = 1.8;
    if (calcProperty === "luxury") propMultiplier = 2.4;

    const urgencyAdd = calcUrgency === "emergency" ? 0 : 0; // Flat transparent pricing
    return Math.round(base * propMultiplier + urgencyAdd);
  };

  // 3. Service Deep-Dive Tabs
  const [activeServiceTab, setActiveServiceTab] = useState<number>(0);

  const luxuryServices = [
    {
      title: "Air Conditioning Engineering",
      subtitle: "Chiller, Split & Ducted Central AC Care",
      desc: "Dubai's climate requires pristine condenser performance. We provide high-pressure coil decontamination, ecological R410A refrigerant top-up, fan motor replacement, and airflow balancing.",
      price: "From 150 AED",
      slug: "ac-repair-troubleshooting",
      image: "/images/technician_ac.jpg",
      icon: <Fan className="w-6 h-6 text-blue-400" />,
      features: [
        "Hydro-pressure coil sanitization with antimicrobial wash",
        "Digital laser temperature differential testing (Delta T)",
        "Capacitor, thermostat, and PCB circuit board diagnostics",
        "Full 90-Day parts and labor cooling guarantee",
      ],
      tag: "Top Rated AC Specialists",
    },
    {
      title: "Emergency Plumbing Infrastructure",
      subtitle: "Thermal Leak Detection & Water Heating",
      desc: "Instant mitigation for ceiling leaks, booster pump failures, and faulty water heaters. Our plumbers carry specialized acoustic listening gear and replacement Italian heating elements on every van.",
      price: "From 150 AED",
      slug: "emergency-plumbing-repair",
      image: "/images/water_heater_after.jpg",
      icon: <Droplets className="w-6 h-6 text-cyan-400" />,
      features: [
        "Non-invasive acoustic & thermal infrared leak detection",
        "Ariston & Atlantic water heater replacement with safety valve",
        "High-pressure sanitary drain jetting & trap clearance",
        "Grundfos & ESPA booster pump diagnostics and repairs",
      ],
      tag: "24/7 Rapid Response",
    },
    {
      title: "DEWA Electrical Engineering",
      subtitle: "Distribution Boards & Short Circuit Isolation",
      desc: "Electrical safety is non-negotiable. Our certified engineers inspect, diagnose, and resolve breaker tripping, load imbalances, neutral faults, and LED architectural lighting installations.",
      price: "From 150 AED",
      slug: "electrical-db-short-circuit",
      image: "/images/db_box_after.jpg",
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      features: [
        "Megger insulation & ground loop impedance safety check",
        "Schneider & ABB RCBO/MCB circuit breaker replacement",
        "Phase load balancing to stop recurring DEWA trippings",
        "Smart home automation switches & dimmer integration",
      ],
      tag: "DEWA Certified",
    },
    {
      title: "Jotun Luxury Villa Painting",
      subtitle: "Interior & Exterior Protective Coatings",
      desc: "Transform your home with immaculate surface preparation, crack filling, laser masking, and multiple coats of Jotun Fenomastic silk finish. 100% dust-free sanding system.",
      price: "From 689 AED",
      slug: "villa-painting-decor",
      image: "/images/villa_paint_after.jpg",
      icon: <Paintbrush className="w-6 h-6 text-emerald-400" />,
      features: [
        "Full floor and luxury furniture wrap with heavy-duty drop sheets",
        "3-step gypsum crack repair and ultra-fine smooth sanding",
        "Authentic Jotun Fenomastic zero-odor luxury paint applied",
        "Post-service deep cleanup and detailed wall inspection",
      ],
      tag: "Jotun Velvet Silk",
    },
    {
      title: "Precision Handyman & Smart Fixtures",
      subtitle: "Heavy TV Mounting, Assembly & Carpentry",
      desc: "Heavy-duty TV wall mounting with concealed in-wall cable management, customized furniture assembly, lock replacements, and delicate interior fixtures installed flawlessly.",
      price: "From 110 AED",
      slug: "furniture-assembly-tv-mounting",
      image: "/images/hero_technician.jpg",
      icon: <Hammer className="w-6 h-6 text-purple-400" />,
      features: [
        "Laser-level mounting on drywall, block, concrete, or tile",
        "Concealed trunking for power, HDMI, and optical cords",
        "IKEA, West Elm, and Italian designer furniture assembly",
        "Heavy decorative mirror & crystal chandelier anchor fittings",
      ],
      tag: "Laser Guided",
    },
  ];

  // 4. AMC Billing Toggle
  const [amcBillingPeriod, setAmcBillingPeriod] = useState<"annual" | "monthly">("annual");

  const amcTiers = [
    {
      name: "Apartment Care",
      target: "1 - 3 Bedroom Apartments",
      priceAnnual: 1190,
      priceMonthly: 115,
      popular: false,
      badge: "Standard Essential",
      features: [
        "2x Scheduled AC Deep Chemical Cleans",
        "2x Plumbing & Drainage Checkups",
        "1x Electrical Load & Safety Audit",
        "Unlimited Emergency Callouts",
        "2-Hour Guaranteed Response Time",
        "15% Discount on Spare Parts",
      ],
    },
    {
      name: "Executive Villa Care",
      target: "3 - 5 Bedroom Luxury Villas",
      priceAnnual: 2890,
      priceMonthly: 275,
      popular: true,
      badge: "Most Popular in Dubai",
      features: [
        "4x Comprehensive AC Overhauls (Quarterly)",
        "3x Plumbing & Water Heater Health Checks",
        "2x DEWA Electrical DB Load Audits",
        "1x Roof & Gutter Drainage Clearance",
        "Priority 30-Minute Dispatch Window",
        "Zero Labor Charges on All Repairs",
        "Dedicated Facility Account Supervisor",
      ],
    },
    {
      name: "Presidential Estate VIP",
      target: "Mansions, Penthouses & Large Compounds",
      priceAnnual: 4990,
      priceMonthly: 475,
      popular: false,
      badge: "VIP White-Glove",
      features: [
        "6x Bi-Monthly AC Chemical Service",
        "Full Water Booster Pump & Filtration Checks",
        "Continuous Thermal Electrical Monitoring",
        "Interior & Exterior Minor Touchup Painting",
        "Immediate VIP 15-Minute Response",
        "Zero Labor Fees + 25% Off Major Parts",
        "24/7 Dedicated Senior Engineering Lead",
      ],
    },
  ];

  // 5. Community Response Hub
  const communityHubs = [
    { name: "Dubai Marina & JBR", activeVans: 3, avgEta: "18 mins", status: "Active Dispatch" },
    { name: "Downtown Dubai & Business Bay", activeVans: 4, avgEta: "15 mins", status: "Active Dispatch" },
    { name: "Palm Jumeirah", activeVans: 2, avgEta: "20 mins", status: "Active Dispatch" },
    { name: "Arabian Ranches & Dubai Hills", activeVans: 3, avgEta: "22 mins", status: "Active Dispatch" },
    { name: "Jumeirah Golf Estates & Damac Hills", activeVans: 2, avgEta: "25 mins", status: "Active Dispatch" },
    { name: "Al Barsha, JVT & JVC", activeVans: 3, avgEta: "16 mins", status: "Active Dispatch" },
    { name: "Mirdif & Dubai Silicon Oasis", activeVans: 2, avgEta: "24 mins", status: "Active Dispatch" },
    { name: "Abu Dhabi Islands & Yas", activeVans: 2, avgEta: "35 mins", status: "Active Dispatch" },
  ];

  const handleWhatsApp = (context = "Home 2 Page") => {
    Analytics.trackWhatsAppClick(context, calcLocation);
    const num = BUSINESS_SETTINGS.whatsappNumber.replace(/[^0-9]/g, "");
    window.open(
      `https://wa.me/${num}?text=Hello%20Al-Safwa%2C%20I%20need%20urgent%20service%20for%20${encodeURIComponent(
        calcCategory.toUpperCase()
      )}%20in%20${encodeURIComponent(calcLocation)}`,
      "_blank"
    );
  };

  const handlePhone = () => {
    Analytics.trackPhoneCallClick("Home 2 Direct Call", "UAE");
    window.location.href = `tel:${BUSINESS_SETTINGS.phone.replace(/[^0-9+]/g, "")}`;
  };

  return (
    <div className="bg-[#0B0F19] text-slate-100 min-h-screen selection:bg-brand-500 selection:text-white font-sans antialiased">
      {/* 1. TOP LIVE OPS TICKER */}
      <div className="bg-gradient-to-r from-brand-950 via-slate-900 to-brand-950 border-b border-slate-800/80 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] sm:text-[11px]">
              Live Dispatch Radar:
            </span>
            <span className="text-slate-300 hidden sm:inline">
              18 Mobile Service Units currently active across Dubai & Abu Dhabi
            </span>
            <span className="text-slate-300 sm:hidden">18 Vans active in Dubai</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-slate-400 hidden md:inline">
              ⚡ Avg Response: <strong className="text-white">21 Minutes</strong>
            </span>
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>90-Day Guarantee</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. ULTRA-MODERN LUXURY HERO SECTION */}
      <section className="relative pt-10 pb-20 overflow-hidden bg-radial-glow">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-500/10 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Main Hero Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>DUBAI'S 5-STAR PROPERTY & FACILITY MAINTENANCE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-heading">
              World-Class Technical Care <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
                At Your Doorstep in 25 Mins.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Certified master engineers for AC cooling overhauls, emergency plumbing, DEWA electrical, and villa maintenance with 100% transparent pricing.
            </p>
          </div>

          {/* INTERACTIVE DIAGNOSTIC PROBLEM SELECTOR (THE "WOW" CONTROLLER) */}
          <div className="max-w-5xl mx-auto bg-slate-900/90 backdrop-blur-xl border border-slate-700/70 rounded-3xl p-4 sm:p-7 shadow-2xl shadow-black/60">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Select Your Issue For Instant Dispatch:
                </span>
              </div>
              <span className="text-[11px] text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
                Live Pricing & Verified Diagnosis
              </span>
            </div>

            {/* Diagnostic Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mt-4">
              {heroIssues.map((issue, idx) => {
                const isActive = heroDiagnosticIndex === idx;
                return (
                  <button
                    key={issue.id}
                    onClick={() => setHeroDiagnosticIndex(idx)}
                    className={`text-left p-3 rounded-2xl transition-all duration-200 flex flex-col justify-between border ${
                      isActive
                        ? "bg-brand-600 text-white border-brand-400 shadow-lg shadow-brand-600/30 scale-[1.02]"
                        : "bg-slate-800/60 hover:bg-slate-800 text-slate-300 border-slate-700/60 hover:border-slate-600"
                    }`}
                  >
                    <span className="text-xs font-bold leading-snug">{issue.tabLabel}</span>
                    <div className="mt-2 flex items-center justify-between text-[10px]">
                      <span className={isActive ? "text-blue-100" : "text-slate-400"}>From {issue.price}</span>
                      <ChevronRight className={`w-3 h-3 ${isActive ? "text-white" : "text-slate-500"}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Issue Visual Card Display */}
            <div className="mt-6 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left Info */}
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                    ⚡ {currentHeroIssue.badge}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
                    ⏱️ ETA: {currentHeroIssue.eta}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-extrabold">
                    💰 {currentHeroIssue.price} Fixed Labor
                  </span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-heading">
                    {currentHeroIssue.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                    <strong className="text-slate-200">Symptom:</strong> {currentHeroIssue.symptom}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                    <strong className="text-emerald-400">Resolution:</strong> {currentHeroIssue.solution}
                  </p>
                </div>

                {/* Call-to-actions */}
                <div className="flex items-center gap-3 pt-2 flex-wrap">
                  <button
                    onClick={() => openQuoteModal(currentHeroIssue.serviceSlug)}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-blue-600 hover:from-brand-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-brand-600/30 flex items-center gap-2 transition transform active:scale-95"
                  >
                    <span>Instant Booking Dispatch</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleWhatsApp(`Hero Diagnostic: ${currentHeroIssue.title}`)}
                    className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition transform active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Dispatch</span>
                  </button>

                  <button
                    onClick={handlePhone}
                    className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm flex items-center gap-2 transition"
                  >
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>{BUSINESS_SETTINGS.phone}</span>
                  </button>
                </div>
              </div>

              {/* Right Visual Image */}
              <div className="md:col-span-5 relative h-48 sm:h-56 rounded-xl overflow-hidden border border-slate-700 group shadow-inner">
                <Image
                  src={currentHeroIssue.image}
                  alt={currentHeroIssue.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-white font-bold border border-white/10">
                    Verified Technical Procedure
                  </span>
                  <span className="text-emerald-400 font-extrabold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 100% Resolved
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Trust Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-8">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">25-Min Dispatch</div>
                <div className="text-[11px] text-slate-400">All Dubai communities</div>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">90-Day Warranty</div>
                <div className="text-[11px] text-slate-400">Parts & labor covered</div>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                <Star className="w-5 h-5 fill-emerald-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">4.95 ★ Rating</div>
                <div className="text-[11px] text-slate-400">1,480+ Happy residents</div>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">DEWA Certified</div>
                <div className="text-[11px] text-slate-400">Master qualified team</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE LIVE BOOKING & COST TERMINAL (THE CALCULATOR) */}
      <section className="py-16 bg-slate-950 border-t border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                <Sliders className="w-3.5 h-3.5" />
                <span>UPFRONT TRANSPARENT PRICING</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
                Instant Price Estimator & Booking Terminal
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                No surprise bills or hidden travel surcharges. Select your service category, property size, and location to see your transparent upfront labor cost immediately.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-300">
                    Includes full diagnostic inspection with digital report.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-300">
                    Genuine OEM replacement parts with manufacturer serials.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-300">
                    Cash, Credit Card, Apple Pay & Tabby/Tamara 4-split available on arrival.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Interactive Card */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              {/* Step 1: Category */}
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                  1. Select Service Category:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { id: "ac", label: "AC Cooling", icon: <Fan className="w-4 h-4" /> },
                    { id: "plumbing", label: "Plumbing", icon: <Droplets className="w-4 h-4" /> },
                    { id: "electrical", label: "Electrical", icon: <Zap className="w-4 h-4" /> },
                    { id: "painting", label: "Painting", icon: <Paintbrush className="w-4 h-4" /> },
                    { id: "handyman", label: "Handyman", icon: <Hammer className="w-4 h-4" /> },
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setCalcCategory(c.id)}
                      className={`p-3 rounded-xl text-xs font-bold flex flex-col items-center gap-1.5 transition border ${
                        calcCategory === c.id
                          ? "bg-brand-600 text-white border-brand-400 shadow-md"
                          : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750"
                      }`}
                    >
                      {c.icon}
                      <span>{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Property Type */}
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                  2. Select Property Layout:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { id: "studio", label: "Studio" },
                    { id: "1bed", label: "1-Bed Apt" },
                    { id: "2bed", label: "2-3 Bed Apt" },
                    { id: "villa", label: "3-4 Bed Villa" },
                    { id: "luxury", label: "5+ Bed Mansion" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setCalcProperty(p.id)}
                      className={`py-2.5 px-2 rounded-xl text-xs font-bold text-center transition border ${
                        calcProperty === p.id
                          ? "bg-emerald-600 text-white border-emerald-400 shadow-md"
                          : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Location Hub */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                    3. Your Community Area:
                  </label>
                  <select
                    value={calcLocation}
                    onChange={(e) => setCalcLocation(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="Dubai Marina">Dubai Marina & JBR</option>
                    <option value="Downtown Dubai">Downtown & Business Bay</option>
                    <option value="Palm Jumeirah">Palm Jumeirah</option>
                    <option value="Arabian Ranches">Arabian Ranches & Damac Hills</option>
                    <option value="Dubai Hills Estate">Dubai Hills Estate</option>
                    <option value="Jumeirah Lakes Towers">JLT & Meadows</option>
                    <option value="JVC">JVC & Al Barsha</option>
                    <option value="Abu Dhabi City">Abu Dhabi Islands</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                    4. Dispatch Priority:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setCalcUrgency("emergency")}
                      className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 border ${
                        calcUrgency === "emergency"
                          ? "bg-rose-600/90 text-white border-rose-400"
                          : "bg-slate-800 text-slate-300 border-slate-700"
                      }`}
                    >
                      <span>🚨 25-Min Urgent</span>
                    </button>

                    <button
                      onClick={() => setCalcUrgency("scheduled")}
                      className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 border ${
                        calcUrgency === "scheduled"
                          ? "bg-blue-600/90 text-white border-blue-400"
                          : "bg-slate-800 text-slate-300 border-slate-700"
                      }`}
                    >
                      <span>📅 Pick Slot</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Price Calculation Output Strip */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-400">Estimated Upfront Labor & Inspection:</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
                      {calculateCost()} AED
                    </span>
                    <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Zero Callout Fee
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Assigned: Mobile Van #4 stationed in {calcLocation}
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => openQuoteModal(`${calcCategory}-repair`)}
                    className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-lg transition"
                  >
                    Confirm Booking
                  </button>
                  <button
                    onClick={() => handleWhatsApp(`Booking Estimate: ${calculateCost()} AED for ${calcCategory}`)}
                    className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md transition"
                    title="WhatsApp Estimate"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LUXURY SERVICES TABBED DEEP-DIVE SHOWCASE */}
      <section className="py-20 bg-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-extrabold text-brand-400 uppercase tracking-wider bg-brand-500/10 border border-brand-500/30 px-3 py-1 rounded-full">
              Full Spectrum Facility Care
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
              Engineering Excellence Across 5 Core Domains
            </h2>
            <p className="text-sm text-slate-300">
              Each discipline is operated by specialized, dedicated crews equipped with top European test equipment.
            </p>
          </div>

          {/* Service Selector Tabs */}
          <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
            {luxuryServices.map((srv, idx) => (
              <button
                key={srv.title}
                onClick={() => setActiveServiceTab(idx)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold transition flex items-center gap-2 border ${
                  activeServiceTab === idx
                    ? "bg-brand-600 text-white border-brand-400 shadow-lg shadow-brand-600/30"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750"
                }`}
              >
                {srv.icon}
                <span>{srv.title.split(" ")[0]}</span>
              </button>
            ))}
          </div>

          {/* Active Service Showcase Card */}
          {(() => {
            const cur = luxuryServices[activeServiceTab];
            return (
              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Photo */}
                <div className="lg:col-span-6 relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                  <Image src={cur.image} alt={cur.title} fill className="object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-amber-400 text-xs font-bold">
                      {cur.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md p-3.5 rounded-xl border border-slate-700/80 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-400">Starting Price</div>
                      <div className="text-sm font-extrabold text-white">{cur.price}</div>
                    </div>
                    <button
                      onClick={() => openQuoteModal(cur.slug)}
                      className="px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center gap-1"
                    >
                      <span>Book Service</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Right Details */}
                <div className="lg:col-span-6 space-y-5">
                  <div>
                    <span className="text-xs font-bold text-brand-400 tracking-wide uppercase">
                      {cur.subtitle}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mt-1">
                      {cur.title}
                    </h3>
                    <p className="text-sm text-slate-300 mt-3 leading-relaxed">{cur.desc}</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Technical Inclusions:
                    </div>
                    {cur.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs sm:text-sm text-slate-300">{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-4">
                    <Link
                      href={`/services/ac-services/${cur.slug}`}
                      className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center gap-2 transition"
                    >
                      <span>View Technical Scope</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => handleWhatsApp(`Service Inquiry: ${cur.title}`)}
                      className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition shadow-md"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Specialist</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* 5. INTERACTIVE BEFORE & AFTER SLIDER SHOWCASE */}
      <section className="py-20 bg-slate-950 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
              Proof in Visual Results
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
              Real Dubai Transformations (Before vs After)
            </h2>
            <p className="text-sm text-slate-300">
              Drag the interactive slider to inspect our restoration standards on AC coils, electrical distribution boards, water heaters, and luxury villa walls.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-8 shadow-2xl">
            <BeforeAfterSlider />
          </div>
        </div>
      </section>

      {/* 6. ANNUAL MAINTENANCE CONTRACTS (AMC) */}
      <section className="py-20 bg-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
              Zero Stress Property Care
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
              Annual Villa & Apartment Maintenance Contracts
            </h2>
            <p className="text-sm text-slate-300">
              Never worry about AC breakdowns, leaking pipes, or electrical outages again. Unlimited callouts and zero labor fees year-round.
            </p>

            {/* Billing Switch */}
            <div className="pt-4 flex items-center justify-center gap-3">
              <span className={`text-xs font-bold ${amcBillingPeriod === "monthly" ? "text-white" : "text-slate-400"}`}>
                Pay Monthly
              </span>
              <button
                onClick={() => setAmcBillingPeriod(amcBillingPeriod === "annual" ? "monthly" : "annual")}
                className="w-14 h-7 rounded-full bg-slate-800 border border-slate-700 p-1 flex items-center transition"
              >
                <div
                  className={`w-5 h-5 rounded-full bg-brand-500 transition-transform ${
                    amcBillingPeriod === "annual" ? "translate-x-7" : "translate-x-0"
                  }`}
                />
              </button>
              <div className="flex items-center gap-1.5">
                <span className={`text-xs font-bold ${amcBillingPeriod === "annual" ? "text-white" : "text-slate-400"}`}>
                  Pay Annually
                </span>
                <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                  Save 15%
                </span>
              </div>
            </div>
          </div>

          {/* 3 Tier Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {amcTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 border relative ${
                  tier.popular
                    ? "bg-gradient-to-b from-slate-900 to-brand-950/80 border-amber-400/80 shadow-2xl shadow-amber-500/10 md:-translate-y-2"
                    : "bg-slate-950/90 border-slate-800 hover:border-slate-700"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                    ★ {tier.badge}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-slate-400">{tier.target}</span>
                    <h3 className="text-xl font-bold text-white font-heading mt-0.5">{tier.name}</h3>
                  </div>

                  <div className="flex items-baseline gap-1 py-2 border-y border-slate-800">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
                      {amcBillingPeriod === "annual" ? tier.priceAnnual : tier.priceMonthly}
                    </span>
                    <span className="text-xs text-slate-400 font-bold">
                      AED / {amcBillingPeriod === "annual" ? "year" : "month"}
                    </span>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    {tier.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80">
                  <button
                    onClick={() => openQuoteModal("amc-package")}
                    className={`w-full py-3 rounded-xl font-bold text-xs transition shadow-md ${
                      tier.popular
                        ? "bg-amber-400 hover:bg-amber-300 text-slate-950"
                        : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                    }`}
                  >
                    Subscribe to {tier.name}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/amc"
              className="text-xs font-bold text-brand-400 hover:text-brand-300 transition inline-flex items-center gap-1 underline underline-offset-4"
            >
              <span>View complete AMC scope breakdown and commercial contracts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. LIVE COMMUNITY DISPATCH RADAR */}
      <section className="py-20 bg-slate-950 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-extrabold text-blue-400 uppercase tracking-wider bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-full">
              Full Coverage Map
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
              Active Vans in Your Dubai Neighborhood
            </h2>
            <p className="text-sm text-slate-300">
              Our decentralized mobile maintenance fleet is pre-stationed across major residential hubs for sub-25 minute arrival.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {communityHubs.map((hub) => (
              <div
                key={hub.name}
                className="bg-slate-900 border border-slate-800 hover:border-brand-500/60 rounded-2xl p-4 transition-all duration-200 space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>{hub.activeVans} Vans Assigned</span>
                  </div>
                  <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    ETA: {hub.avgEta}
                  </span>
                </div>

                <div className="font-bold text-sm text-white group-hover:text-brand-400 transition">
                  {hub.name}
                </div>

                <button
                  onClick={() => {
                    setCalcLocation(hub.name.split("&")[0].trim());
                    handleWhatsApp(`Request van in ${hub.name}`);
                  }}
                  className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-brand-600 text-slate-200 hover:text-white text-xs font-semibold transition flex items-center justify-center gap-1"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Dispatch To My Villa</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CLIENT REVIEWS & VERIFIED STORIES */}
      <section className="py-20 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="flex items-center justify-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
              Trusted by 1,480+ Dubai Residents & Landlords
            </h2>
            <p className="text-sm text-slate-300">
              Rated 4.95/5 on Google & Trustpilot for punctuality, technical competence, and pristine cleanups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                quote:
                  "Our master bedroom AC stopped cooling at 11 PM during July heat. Al-Safwa's technician arrived in 18 minutes, identified a blown capacitor, replaced it with an OEM part, and restored 19°C chill. Lifesavers!",
                author: "Tariq Al-Mansoor",
                location: "Palm Jumeirah Villa",
                service: "Emergency AC Repair",
                rating: 5,
              },
              {
                quote:
                  "Signed up for their Executive Villa AMC last year. They performed quarterly deep AC pressure washes, fixed recurring DB circuit trips, and resolved water heater issues without charging a single dirham of labor.",
                author: "Elena Rostova",
                location: "Dubai Hills Estate",
                service: "Executive Villa AMC",
                rating: 5,
              },
              {
                quote:
                  "Immaculate painting of our 4-bedroom villa in Arabian Ranches. The crew used laser levels for borders, protected all hardwood furniture, and left the property spotless. Zero paint odor.",
                author: "David MacIntyre",
                location: "Arabian Ranches 2",
                service: "Jotun Silk Painting",
                rating: 5,
              },
            ].map((rev, i) => (
              <div
                key={i}
                className="bg-slate-950 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Verified Customer
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                    "{rev.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{rev.author}</div>
                    <div className="text-[11px] text-slate-400">{rev.location}</div>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-800 px-2 py-1 rounded">
                    {rev.service}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. HIGH-CONVERTING BOTTOM ACTION STRIP */}
      <section className="py-16 bg-gradient-to-r from-brand-900 via-slate-900 to-emerald-950 border-t border-slate-800 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold backdrop-blur-md">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>24/7 Operations Desk Ready</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
            Need an Expert Technician at Your Property Right Now?
          </h2>

          <p className="text-sm text-slate-200 max-w-xl mx-auto leading-relaxed">
            Call our emergency dispatch desk or message on WhatsApp. A certified master technician will be at your location in under 25 minutes.
          </p>

          <div className="flex items-center justify-center gap-4 pt-2 flex-wrap">
            <button
              onClick={() => handleWhatsApp("Bottom Call to Action")}
              className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-xl flex items-center gap-2 transition transform active:scale-95"
            >
              <MessageSquare className="w-5 h-5" />
              <span>WhatsApp Instant Dispatch</span>
            </button>

            <button
              onClick={handlePhone}
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-sm shadow-xl flex items-center gap-2 transition transform active:scale-95"
            >
              <Phone className="w-5 h-5 text-emerald-600" />
              <span>Call Hotline: {BUSINESS_SETTINGS.phone}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
