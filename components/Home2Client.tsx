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
  Radio,
  Sliders,
  Check,
  Tv,
  ThermometerSnowflake,
  Flame,
  Bath,
  Utensils,
  Sofa,
  Sun,
  Eye,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  Headphones,
  BadgeCheck,
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

  // 1. Hero Magic Diagnostic Problem Switcher
  const [heroIssueIdx, setHeroIssueIdx] = useState(0);

  const heroIssues = [
    {
      id: "ac",
      icon: <Fan className="w-5 h-5 text-blue-600" />,
      tabName: "❄️ AC Blowing Warm Air",
      title: "AC Deep Cooling Restoration & Coil Decontamination",
      symptom: "AC blowing ambient room air, whistling sound, or ice formation on evaporator coils.",
      solution: "Gas pressure diagnostics, capacitor & fan motor replacement, and 12-bar chemical pressure coil wash.",
      eta: "18 - 25 Mins",
      price: "150 AED",
      slug: "ac-repair-troubleshooting",
      image: "/images/technician_ac.jpg",
      badge: "High Priority Dispatch",
      accent: "from-blue-500/10 to-blue-500/5 text-blue-700 border-blue-200",
    },
    {
      id: "plumbing",
      icon: <Droplets className="w-5 h-5 text-cyan-600" />,
      tabName: "💧 Water Leak / Heater Failure",
      title: "Thermal Leak Detection & Water Heater Overhaul",
      symptom: "Water dripping from false ceiling, no hot water, or heater breaker tripping continuously.",
      solution: "Non-invasive thermal imaging leak location & Italian Ariston heater swap with certified safety valve.",
      eta: "15 - 20 Mins",
      price: "150 AED",
      slug: "emergency-plumbing-repair",
      image: "/images/water_heater_after.jpg",
      badge: "Emergency Water Isolation",
      accent: "from-cyan-500/10 to-cyan-500/5 text-cyan-700 border-cyan-200",
    },
    {
      id: "electrical",
      icon: <Zap className="w-5 h-5 text-amber-600" />,
      tabName: "⚡ DB Tripping / Sparking",
      title: "DEWA Certified Electrical DB Diagnostics",
      symptom: "Main circuit breaker trips on heavy load, burning smell from switchboard, or partial villa blackout.",
      solution: "Megger insulation resistance test, phase load balancing, and ABB/Schneider breaker replacement.",
      eta: "20 - 30 Mins",
      price: "150 AED",
      slug: "electrical-db-short-circuit",
      image: "/images/db_box_after.jpg",
      badge: "DEWA Certified",
      accent: "from-amber-500/10 to-amber-500/5 text-amber-700 border-amber-200",
    },
    {
      id: "painting",
      icon: <Paintbrush className="w-5 h-5 text-emerald-600" />,
      tabName: "🎨 Villa & Apartment Painting",
      title: "Luxury Jotun Velvet Silk Villa Painting",
      symptom: "Scuffed walls, peeling paint, move-out handover repainting, or new modern designer accent color.",
      solution: "Laser line tape masking, 3-stage wall sanding, primer coat + 2x Jotun Silk finish.",
      eta: "Same-Day Start",
      price: "689 AED",
      slug: "villa-painting-decor",
      image: "/images/villa_paint_after.jpg",
      badge: "Jotun Silk Certified",
      accent: "from-emerald-500/10 to-emerald-500/5 text-emerald-700 border-emerald-200",
    },
    {
      id: "handyman",
      icon: <Hammer className="w-5 h-5 text-purple-600" />,
      tabName: "🔨 Handyman & TV Mounting",
      title: "Precision TV Wall Mounting & Custom Assembly",
      symptom: "75\"-85\" TV bracket mounting, IKEA/Italian furniture assembly, chandelier hanging.",
      solution: "Stud sensor cable detection, heavy-duty Fischer toggle anchors & laser leveling.",
      eta: "30 - 45 Mins",
      price: "110 AED",
      slug: "furniture-assembly-tv-mounting",
      image: "/images/hero_technician.jpg",
      badge: "Laser Leveled",
      accent: "from-purple-500/10 to-purple-500/5 text-purple-700 border-purple-200",
    },
  ];

  const currentHeroIssue = heroIssues[heroIssueIdx];

  // 2. Interactive Room-by-Room Diagnostic Studio State
  const [selectedRoom, setSelectedRoom] = useState<"living" | "kitchen" | "bathroom" | "villa">("living");

  const roomDiagnostics = {
    living: {
      name: "Living Room & Bedrooms",
      icon: <Sofa className="w-5 h-5 text-brand-600" />,
      bg: "bg-blue-50/60 border-blue-200",
      description: "HVAC comfort, acoustic TV setups, lighting ambiance, and flawless wall aesthetics.",
      issues: [
        {
          name: "AC Duct Whistling / Odor",
          fix: "Antimicrobial duct sanitization & blower wheel dynamic balance",
          price: "150 AED",
          slug: "ac-repair-troubleshooting",
        },
        {
          name: "Large TV Wall Mounting (65\"-85\")",
          fix: "Fischer heavy load anchors + concealed in-wall cable route",
          price: "110 AED",
          slug: "furniture-assembly-tv-mounting",
        },
        {
          name: "Chandelier & Dimmer Switch Setup",
          fix: "Load-rated ceiling anchor + smart automation switch pairing",
          price: "130 AED",
          slug: "electrical-db-short-circuit",
        },
        {
          name: "Jotun Accent Wall Repaint",
          fix: "Zero-VOC Jotun Velvet Silk coat with laser edge line masking",
          price: "299 AED",
          slug: "villa-painting-decor",
        },
      ],
    },
    kitchen: {
      name: "Kitchen & Laundry Zone",
      icon: <Utensils className="w-5 h-5 text-amber-600" />,
      bg: "bg-amber-50/60 border-amber-200",
      description: "High-power appliances, grease traps, under-sink valves, and water purification.",
      issues: [
        {
          name: "Under-Sink Pipe Leak / Smell",
          fix: "High-durability P-trap rebuild & silicone sealing check",
          price: "150 AED",
          slug: "emergency-plumbing-repair",
        },
        {
          name: "Kitchen Ring Main Breaker Trip",
          fix: "Oven/Microwave circuit load rebalancing & breaker upgrade",
          price: "150 AED",
          slug: "electrical-db-short-circuit",
        },
        {
          name: "Dishwasher / Washing Machine Hookup",
          fix: "Pressure regulator valve installation & anti-flood test",
          price: "120 AED",
          slug: "emergency-plumbing-repair",
        },
        {
          name: "Exhaust Fan / Hood Motor Repair",
          fix: "Centrifugal fan impeller clean & capacitor swap",
          price: "140 AED",
          slug: "ac-repair-troubleshooting",
        },
      ],
    },
    bathroom: {
      name: "Bathrooms & Water Heating",
      icon: <Bath className="w-5 h-5 text-cyan-600" />,
      bg: "bg-cyan-50/60 border-cyan-200",
      description: "Continuous hot water, zero ceiling drips, high-pressure mixers, and sanitary care.",
      issues: [
        {
          name: "Water Heater Not Heating / Leaking",
          fix: "Italian Ariston 50L/80L heater replacement + safety valve",
          price: "150 AED",
          slug: "emergency-plumbing-repair",
        },
        {
          name: "Shower Mixer / Low Water Pressure",
          fix: "Cartridge overhaul & pressure booster pump optimization",
          price: "150 AED",
          slug: "emergency-plumbing-repair",
        },
        {
          name: "Ceiling False Access Leak Investigation",
          fix: "Acoustic sensor inspection & CPVC joint heat fusion fix",
          price: "180 AED",
          slug: "emergency-plumbing-repair",
        },
        {
          name: "Silicone Grout & Anti-Mould Sealing",
          fix: "Hospital-grade anti-fungal silicone bead application",
          price: "110 AED",
          slug: "furniture-assembly-tv-mounting",
        },
      ],
    },
    villa: {
      name: "Villa Exterior & Roof Infrastructure",
      icon: <Sun className="w-5 h-5 text-emerald-600" />,
      bg: "bg-emerald-50/60 border-emerald-200",
      description: "Sun protection, booster pumps, weatherproof electricals, and perimeter care.",
      issues: [
        {
          name: "Water Tank Booster Pump Failure",
          fix: "Grundfos/ESPA pressure switch calibration & capacitor fix",
          price: "190 AED",
          slug: "emergency-plumbing-repair",
        },
        {
          name: "Outdoor Weatherproof Light Wiring",
          fix: "IP66 waterproof junction box & surge protection install",
          price: "150 AED",
          slug: "electrical-db-short-circuit",
        },
        {
          name: "Villa Boundary Wall Crack & Repaint",
          fix: "Elastomeric weatherproof crack filler + UV-resistant paint",
          price: "790 AED",
          slug: "villa-painting-decor",
        },
        {
          name: "Roof Drain Gutter Blockage Clearance",
          fix: "High-pressure jetting & leaf guard mesh installation",
          price: "220 AED",
          slug: "emergency-plumbing-repair",
        },
      ],
    },
  };

  // 3. Interactive Pricing Terminal (Light Theme)
  const [calcService, setCalcService] = useState<string>("ac");
  const [calcProperty, setCalcProperty] = useState<string>("2bed");
  const [calcLocation, setCalcLocation] = useState<string>("Dubai Marina");
  const [calcUrgency, setCalcUrgency] = useState<"emergency" | "scheduled">("emergency");

  const calculateEstimate = () => {
    let base = 150;
    if (calcService === "ac") base = 150;
    if (calcService === "plumbing") base = 160;
    if (calcService === "electrical") base = 150;
    if (calcService === "painting") base = 650;
    if (calcService === "handyman") base = 110;

    let propMultiplier = 1;
    if (calcProperty === "studio") propMultiplier = 0.9;
    if (calcProperty === "1bed") propMultiplier = 1.0;
    if (calcProperty === "2bed") propMultiplier = 1.25;
    if (calcProperty === "villa") propMultiplier = 1.8;
    if (calcProperty === "luxury") propMultiplier = 2.4;

    return Math.round(base * propMultiplier);
  };

  // 4. AMC Toggle
  const [amcPeriod, setAmcPeriod] = useState<"annual" | "monthly">("annual");

  const amcTiers = [
    {
      name: "Apartment Essential",
      subtitle: "1 - 3 Bedroom Apartments",
      priceAnnual: 1190,
      priceMonthly: 115,
      popular: false,
      badge: "Essential Care",
      features: [
        "2x Scheduled AC Deep Chemical Cleans",
        "2x Plumbing & Drainage Checkups",
        "1x Electrical Load & Safety Audit",
        "Unlimited Emergency Callouts (24/7)",
        "2-Hour Guaranteed Response Window",
        "15% Off Any Replacement Spare Parts",
      ],
    },
    {
      name: "Executive Villa Care",
      subtitle: "3 - 5 Bedroom Luxury Villas",
      priceAnnual: 2890,
      priceMonthly: 275,
      popular: true,
      badge: "Most Popular in UAE",
      features: [
        "4x Comprehensive AC Overhauls (Quarterly)",
        "3x Plumbing & Water Heater Health Checks",
        "2x DEWA Electrical DB Load Audits",
        "1x Roof & Gutter Drainage Clearance",
        "Priority 30-Minute Dispatch Window",
        "Zero Labor Charges on All Normal Repairs",
        "Dedicated Facility Account Supervisor",
      ],
    },
    {
      name: "Presidential Estate VIP",
      subtitle: "Mansions, Penthouses & Compounds",
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
    { name: "Dubai Marina & JBR", activeVans: 3, avgEta: "18 mins" },
    { name: "Downtown & Business Bay", activeVans: 4, avgEta: "15 mins" },
    { name: "Palm Jumeirah", activeVans: 2, avgEta: "20 mins" },
    { name: "Arabian Ranches & Dubai Hills", activeVans: 3, avgEta: "22 mins" },
    { name: "Jumeirah Golf Estates & Damac Hills", activeVans: 2, avgEta: "25 mins" },
    { name: "Al Barsha, JVT & JVC", activeVans: 3, avgEta: "16 mins" },
    { name: "Mirdif & Dubai Silicon Oasis", activeVans: 2, avgEta: "24 mins" },
    { name: "Abu Dhabi Islands & Yas", activeVans: 2, avgEta: "35 mins" },
  ];

  const handleWhatsApp = (context = "Home 2 Creative Light") => {
    Analytics.trackWhatsAppClick(context, calcLocation);
    const num = BUSINESS_SETTINGS.whatsappNumber.replace(/[^0-9]/g, "");
    window.open(
      `https://wa.me/${num}?text=Hello%20Al-Safwa%2C%20I%20need%20urgent%20service%20for%20${encodeURIComponent(
        calcService.toUpperCase()
      )}%20in%20${encodeURIComponent(calcLocation)}`,
      "_blank"
    );
  };

  const handlePhone = () => {
    Analytics.trackPhoneCallClick("Home 2 Direct Call", "UAE");
    window.location.href = `tel:${BUSINESS_SETTINGS.phone.replace(/[^0-9+]/g, "")}`;
  };

  return (
    <div className="bg-[#FAFBFD] text-slate-900 min-h-screen selection:bg-brand-600 selection:text-white font-sans antialiased overflow-x-hidden">
      {/* 1. TOP DISPATCH STATUS BAR (LIGHT & CRISP) */}
      <div className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 text-xs py-2.5 px-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-extrabold text-slate-900 tracking-tight text-[11px] sm:text-xs">
              ⚡ LIVE DISPATCH ACTIVE:
            </span>
            <span className="text-slate-600 hidden sm:inline text-xs font-medium">
              18 Mobile Service Units in Dubai • Avg Arrival: <strong className="text-slate-900 font-bold">21 Mins</strong>
            </span>
            <span className="text-slate-600 sm:hidden text-[11px]">18 Vans on Dubai Roads</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[11px] hidden md:inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>90-Day Unconditional Warranty</span>
            </span>
            <button
              onClick={handlePhone}
              className="font-bold text-slate-800 hover:text-brand-600 flex items-center gap-1 text-[11px] sm:text-xs"
            >
              <Phone className="w-3.5 h-3.5 text-brand-600" />
              <span>{BUSINESS_SETTINGS.phone}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. CREATIVE HERO: THE BENTO SERVICE STUDIO */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-[#F3F6FC] via-[#FAFBFD] to-[#FAFBFD]">
        {/* Soft Modern Gradient Orbs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-brand-200/40 via-blue-200/30 to-amber-100/40 blur-[100px] pointer-events-none rounded-full" />
        <div className="absolute top-40 right-10 w-[300px] h-[300px] bg-emerald-200/30 blur-[90px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Main Hero Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/90 text-slate-800 text-xs font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span className="tracking-wide">DUBAI'S 5-STAR HOME & PROPERTY CARE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.12] font-heading">
              Flawless Technical Care. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-blue-600 to-emerald-600">
                At Your Villa in 25 Minutes.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              AC diagnostics, emergency plumbing, DEWA electrical overhauls, and luxury painting. Fixed upfront pricing with 90-day parts & labor warranty.
            </p>
          </div>

          {/* CREATIVE INTERACTIVE "PROBLEM-TO-SOLUTION" BENTO CONTROLLER */}
          <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-xl border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider font-heading">
                  Select Issue For Instant Diagnostic & Fixed Quote:
                </span>
              </div>
              <span className="text-[11px] font-bold text-brand-700 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full">
                ⚡ Zero Callout Surcharge
              </span>
            </div>

            {/* Quick Diagnostic Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 mt-5">
              {heroIssues.map((issue, idx) => {
                const isActive = heroIssueIdx === idx;
                return (
                  <button
                    key={issue.id}
                    onClick={() => setHeroIssueIdx(idx)}
                    className={`text-left p-3.5 rounded-2xl transition-all duration-200 flex flex-col justify-between border ${
                      isActive
                        ? "bg-gradient-to-b from-brand-600 to-brand-700 text-white border-brand-600 shadow-lg shadow-brand-500/25 scale-[1.02]"
                        : "bg-slate-50/80 hover:bg-slate-100/80 text-slate-700 border-slate-200/80 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-extrabold leading-snug">{issue.tabName}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[11px]">
                      <span className={`font-bold ${isActive ? "text-blue-100" : "text-brand-600"}`}>
                        From {issue.price}
                      </span>
                      <ChevronRight className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-slate-400"}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Diagnostic Live Visual Showcase */}
            <div className="mt-6 bg-[#FAFBFD] border border-slate-200/90 rounded-2xl p-5 sm:p-7 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left Details */}
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-bold">
                    ⚡ {currentHeroIssue.badge}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-200/70 text-slate-800 text-xs font-bold">
                    ⏱️ ETA: {currentHeroIssue.eta}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-extrabold">
                    💰 {currentHeroIssue.price} Fixed Labor
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 font-heading">
                    {currentHeroIssue.title}
                  </h3>
                  <div className="mt-2 space-y-1.5 text-xs sm:text-sm text-slate-600">
                    <p>
                      <strong className="text-slate-900 font-bold">Symptoms Identified:</strong>{" "}
                      {currentHeroIssue.symptom}
                    </p>
                    <p>
                      <strong className="text-brand-600 font-bold">Standard Procedure:</strong>{" "}
                      {currentHeroIssue.solution}
                    </p>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex items-center gap-3 pt-2 flex-wrap">
                  <button
                    onClick={() => openQuoteModal(currentHeroIssue.serviceSlug)}
                    className="px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-brand-500/20 flex items-center gap-2 transition transform active:scale-95"
                  >
                    <span>Instant Dispatch (25 Mins)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleWhatsApp(`Hero Diagnostic: ${currentHeroIssue.title}`)}
                    className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center gap-2 transition transform active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Engineer</span>
                  </button>

                  <button
                    onClick={handlePhone}
                    className="px-4 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs sm:text-sm flex items-center gap-2 transition"
                  >
                    <Phone className="w-4 h-4 text-brand-600" />
                    <span>{BUSINESS_SETTINGS.phone}</span>
                  </button>
                </div>
              </div>

              {/* Right Image */}
              <div className="md:col-span-5 relative h-52 sm:h-64 rounded-2xl overflow-hidden border border-slate-200 shadow-md group">
                <Image
                  src={currentHeroIssue.image}
                  alt={currentHeroIssue.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white font-bold">
                  <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 text-[11px]">
                    Verified Technical Procedure
                  </span>
                  <span className="text-emerald-300 font-extrabold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> 100% Fixed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Value Badges (4 Bento Cards) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-8">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-slate-900">25-Min Dispatch</div>
                <div className="text-[11px] text-slate-500">Across Dubai & Abu Dhabi</div>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-slate-900">90-Day Warranty</div>
                <div className="text-[11px] text-slate-500">Parts & labor covered</div>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <Star className="w-5 h-5 fill-emerald-500 text-emerald-500" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-slate-900">4.95 ★ Rating</div>
                <div className="text-[11px] text-slate-500">1,480+ Happy residents</div>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
                <BadgeCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-slate-900">DEWA Certified</div>
                <div className="text-[11px] text-slate-500">Master qualified team</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NOVEL CREATIVE FEATURE: ROOM-BY-ROOM VILLA DIAGNOSTIC STUDIO */}
      <section className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-extrabold">
              <Home className="w-3.5 h-3.5" />
              <span>INTERACTIVE PROPERTY EXPLORER</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-heading">
              Explore Common Issues by Room & Area
            </h2>
            <p className="text-sm text-slate-600">
              Select any zone in your apartment or villa to see transparent standard fixes, parts used, and fixed upfront labor rates.
            </p>
          </div>

          {/* Room Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mb-8">
            {(
              [
                { id: "living", label: "Living & Bed", icon: <Sofa className="w-4 h-4" /> },
                { id: "kitchen", label: "Kitchen & Laundry", icon: <Utensils className="w-4 h-4" /> },
                { id: "bathroom", label: "Bathrooms & Water", icon: <Bath className="w-4 h-4" /> },
                { id: "villa", label: "Villa & Roof", icon: <Sun className="w-4 h-4" /> },
              ] as const
            ).map((room) => {
              const isSelected = selectedRoom === room.id;
              return (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoom(room.id)}
                  className={`py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all border ${
                    isSelected
                      ? "bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  {room.icon}
                  <span>{room.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Room Detail Grid */}
          {(() => {
            const cur = roomDiagnostics[selectedRoom];
            return (
              <div className="max-w-5xl mx-auto bg-slate-50/70 border border-slate-200/90 rounded-3xl p-6 sm:p-8">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                      {cur.icon}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-950 font-heading">
                        {cur.name}
                      </h3>
                      <p className="text-xs text-slate-500">{cur.description}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 border border-emerald-300 px-3 py-1 rounded-full">
                    ⚡ Same-Day Resolution
                  </span>
                </div>

                {/* Issues Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {cur.issues.map((item, i) => (
                    <div
                      key={i}
                      className="bg-white border border-slate-200/80 rounded-2xl p-4.5 flex flex-col justify-between hover:border-brand-400 hover:shadow-md transition group space-y-3"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-brand-600 transition">
                            {item.name}
                          </h4>
                          <span className="text-xs font-extrabold text-amber-900 bg-amber-100 px-2 py-0.5 rounded shrink-0">
                            {item.price}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                          <strong className="text-slate-700">Solution:</strong> {item.fix}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> 90-Day Covered
                        </span>
                        <button
                          onClick={() => openQuoteModal(item.slug)}
                          className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                        >
                          <span>Book Fix</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* 4. INTERACTIVE COST ESTIMATOR TERMINAL */}
      <section className="py-20 bg-[#F4F7FC] border-t border-slate-200/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold">
                <Sliders className="w-3.5 h-3.5" />
                <span>UPFRONT TRANSPARENT PRICING</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-heading">
                Instant Price Estimator & Booking Terminal
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                No surprise invoices, hidden travel surcharges, or inflated parts. Customize your property size and service below to see your upfront fixed rate.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-700">
                    Includes digital thermal & diagnostic inspection report.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-700">
                    OEM genuine replacement parts with manufacturer serial warranty.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-700">
                    Card, Cash, Apple Pay & Tabby 4-month split available on site.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Interactive Card */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              {/* Step 1: Category */}
              <div>
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-2 font-heading">
                  1. Select Service Discipline:
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
                      onClick={() => setCalcService(c.id)}
                      className={`p-3 rounded-xl text-xs font-bold flex flex-col items-center gap-1.5 transition border ${
                        calcService === c.id
                          ? "bg-brand-600 text-white border-brand-600 shadow-md"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
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
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-2 font-heading">
                  2. Select Property Size:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { id: "studio", label: "Studio" },
                    { id: "1bed", label: "1-Bed Apt" },
                    { id: "2bed", label: "2-3 Bed Apt" },
                    { id: "villa", label: "3-4 Bed Villa" },
                    { id: "luxury", label: "5+ Bed Villa" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setCalcProperty(p.id)}
                      className={`py-2.5 px-2 rounded-xl text-xs font-bold text-center transition border ${
                        calcProperty === p.id
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
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
                  <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-2 font-heading">
                    3. Your Community Area:
                  </label>
                  <select
                    value={calcLocation}
                    onChange={(e) => setCalcLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-brand-600"
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
                  <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-2 font-heading">
                    4. Dispatch Speed:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setCalcUrgency("emergency")}
                      className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 border ${
                        calcUrgency === "emergency"
                          ? "bg-rose-50 text-rose-800 border-rose-300"
                          : "bg-slate-50 text-slate-700 border-slate-200"
                      }`}
                    >
                      <span>🚨 25-Min Urgent</span>
                    </button>

                    <button
                      onClick={() => setCalcUrgency("scheduled")}
                      className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 border ${
                        calcUrgency === "scheduled"
                          ? "bg-blue-50 text-blue-800 border-blue-300"
                          : "bg-slate-50 text-slate-700 border-slate-200"
                      }`}
                    >
                      <span>📅 Book Slot</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Price Calculation Output Strip */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-500 font-medium">Estimated Upfront Labor & Diagnostics:</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-heading">
                      {calculateEstimate()} AED
                    </span>
                    <span className="text-xs text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                      Zero Callout Fee
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Assigned: Mobile Van #4 stationed near {calcLocation}
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => openQuoteModal(`${calcService}-repair`)}
                    className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition"
                  >
                    Confirm Booking
                  </button>
                  <button
                    onClick={() => handleWhatsApp(`Booking Estimate: ${calculateEstimate()} AED for ${calcService}`)}
                    className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md transition"
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

      {/* 5. VISUAL BEFORE & AFTER TRANSFORMATION SHOWCASE */}
      <section className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wider bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
              Real Workmanship Proof
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-heading">
              Real Dubai Transformations (Before vs After)
            </h2>
            <p className="text-sm text-slate-600">
              Drag the interactive slider to inspect our restoration standards on AC coils, electrical distribution boards, water heaters, and luxury villa walls.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-3xl p-4 sm:p-8 shadow-lg">
            <BeforeAfterSlider />
          </div>
        </div>
      </section>

      {/* 6. ANNUAL MAINTENANCE CONTRACTS (AMC) */}
      <section className="py-20 bg-[#FAFBFD] border-t border-slate-200/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Zero Stress Property Care
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-heading">
              Annual Villa & Apartment Maintenance Contracts
            </h2>
            <p className="text-sm text-slate-600">
              Never worry about AC breakdowns, leaking pipes, or electrical outages again. Unlimited callouts and zero labor fees year-round.
            </p>

            {/* Billing Switch */}
            <div className="pt-4 flex items-center justify-center gap-3">
              <span className={`text-xs font-bold ${amcPeriod === "monthly" ? "text-slate-900" : "text-slate-400"}`}>
                Pay Monthly
              </span>
              <button
                onClick={() => setAmcPeriod(amcPeriod === "annual" ? "monthly" : "annual")}
                className="w-14 h-7 rounded-full bg-slate-200 p-1 flex items-center transition"
              >
                <div
                  className={`w-5 h-5 rounded-full bg-brand-600 transition-transform ${
                    amcPeriod === "annual" ? "translate-x-7" : "translate-x-0"
                  }`}
                />
              </button>
              <div className="flex items-center gap-1.5">
                <span className={`text-xs font-bold ${amcPeriod === "annual" ? "text-slate-900" : "text-slate-400"}`}>
                  Pay Annually
                </span>
                <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
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
                    ? "bg-white border-amber-400 shadow-xl shadow-amber-500/10 md:-translate-y-2"
                    : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 font-extrabold text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    ★ {tier.badge}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-slate-500">{tier.subtitle}</span>
                    <h3 className="text-xl font-bold text-slate-950 font-heading mt-0.5">{tier.name}</h3>
                  </div>

                  <div className="flex items-baseline gap-1 py-2 border-y border-slate-100">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-heading">
                      {amcPeriod === "annual" ? tier.priceAnnual : tier.priceMonthly}
                    </span>
                    <span className="text-xs text-slate-500 font-bold">
                      AED / {amcPeriod === "annual" ? "year" : "month"}
                    </span>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    {tier.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    onClick={() => openQuoteModal("amc-package")}
                    className={`w-full py-3 rounded-xl font-bold text-xs transition shadow-sm ${
                      tier.popular
                        ? "bg-amber-400 hover:bg-amber-500 text-slate-950"
                        : "bg-slate-900 hover:bg-slate-800 text-white"
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
              className="text-xs font-bold text-brand-600 hover:text-brand-700 transition inline-flex items-center gap-1 underline underline-offset-4"
            >
              <span>View full AMC scope breakdown and corporate facility contracts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. LIVE FLEET COVERAGE MAP */}
      <section className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-extrabold text-blue-700 uppercase tracking-wider bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              Full Coverage Map
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-heading">
              Active Vans in Your Dubai Neighborhood
            </h2>
            <p className="text-sm text-slate-600">
              Our decentralized mobile maintenance fleet is pre-stationed across major residential hubs for sub-25 minute arrival.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {communityHubs.map((hub) => (
              <div
                key={hub.name}
                className="bg-slate-50 border border-slate-200 hover:border-brand-500 rounded-2xl p-4 transition-all duration-200 space-y-3 group shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>{hub.activeVans} Vans Assigned</span>
                  </div>
                  <span className="text-[10px] text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded font-bold">
                    ETA: {hub.avgEta}
                  </span>
                </div>

                <div className="font-extrabold text-sm text-slate-900 group-hover:text-brand-600 transition">
                  {hub.name}
                </div>

                <button
                  onClick={() => {
                    setCalcLocation(hub.name.split("&")[0].trim());
                    handleWhatsApp(`Request van in ${hub.name}`);
                  }}
                  className="w-full py-1.5 rounded-lg bg-white hover:bg-brand-600 text-slate-700 hover:text-white border border-slate-200 text-xs font-semibold transition flex items-center justify-center gap-1"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Dispatch To My Villa</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CLIENT REVIEWS & VERIFIED STORIES */}
      <section className="py-20 bg-[#F4F7FC] border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="flex items-center justify-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-heading">
              Trusted by 1,480+ Dubai Residents & Landlords
            </h2>
            <p className="text-sm text-slate-600">
              Rated 4.95/5 for punctuality, technical competence, and pristine cleanups.
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
                className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(rev.rating)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                      Verified Customer
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    "{rev.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-extrabold text-slate-900">{rev.author}</div>
                    <div className="text-[11px] text-slate-500">{rev.location}</div>
                  </div>
                  <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-2 py-1 rounded border border-brand-200">
                    {rev.service}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. BOTTOM HIGH-CONVERTING ACTION STRIP */}
      <section className="py-16 bg-gradient-to-r from-slate-900 via-brand-950 to-slate-950 text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold backdrop-blur-md">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>24/7 Operations Desk Ready</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
            Need an Expert Technician at Your Property Right Now?
          </h2>

          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
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
              <Phone className="w-5 h-5 text-brand-600" />
              <span>Call Hotline: {BUSINESS_SETTINGS.phone}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
