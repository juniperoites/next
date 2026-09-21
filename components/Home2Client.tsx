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
  Bath,
  Utensils,
  Sofa,
  Sun,
  Activity,
  UserCheck,
  Calendar,
  Compass,
  Navigation,
  CheckCircle,
  XCircle,
  Percent,
  TrendingDown,
  Gauge,
  Sparkle,
  Truck,
  Flame,
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

  // 1. Live GPS Van Dispatch Console State
  const [selectedHubIndex, setSelectedHubIndex] = useState(0);

  const fleetHubs = [
    {
      community: "Dubai Marina & JBR",
      vanId: "DXB-VAN-04",
      vanType: "Mercedes Sprinter Mobile Unit #4",
      leadEngineer: "Eng. Tariq Al-Khatib (DEWA Master Lead)",
      status: "Stationed & Ready",
      eta: "16 Mins",
      activeJobs: "2 Units Active in Area",
      availableTechs: 3,
      coords: "25.0805° N, 55.1403° E",
    },
    {
      community: "Downtown Dubai & Business Bay",
      vanId: "DXB-VAN-01",
      vanType: "Ford Transit Rapid Response #1",
      leadEngineer: "Eng. Rashid Qasim (HVAC & DB Specialist)",
      status: "Stationed & Ready",
      eta: "14 Mins",
      activeJobs: "4 Units Active in Area",
      availableTechs: 4,
      coords: "25.1972° N, 55.2744° E",
    },
    {
      community: "Palm Jumeirah",
      vanId: "DXB-VAN-08",
      vanType: "Luxury Villa VIP Unit #8",
      leadEngineer: "Eng. Marcus Weber (Plumbing & Chiller Lead)",
      status: "Stationed & Ready",
      eta: "18 Mins",
      activeJobs: "2 Units Active in Area",
      availableTechs: 2,
      coords: "25.1124° N, 55.1390° E",
    },
    {
      community: "Arabian Ranches & Dubai Hills",
      vanId: "DXB-VAN-06",
      vanType: "Heavy Equipment Maintenance Van #6",
      leadEngineer: "Eng. Samer Noureldin (Villa Systems Lead)",
      status: "Stationed & Ready",
      eta: "20 Mins",
      activeJobs: "3 Units Active in Area",
      availableTechs: 3,
      coords: "25.0560° N, 55.2600° E",
    },
    {
      community: "Jumeirah & Al Wasl",
      vanId: "DXB-VAN-03",
      vanType: "DEWA Electrical Diagnostics Van #3",
      leadEngineer: "Eng. Farhan Siddiqui (Senior Electrician)",
      status: "Stationed & Ready",
      eta: "15 Mins",
      activeJobs: "2 Units Active in Area",
      availableTechs: 2,
      coords: "25.2048° N, 55.2530° E",
    },
  ];

  const currentHub = fleetHubs[selectedHubIndex];

  // 2. Interactive 3D Villa Blueprint & Hotspot Explorer State
  const [selectedHotspot, setSelectedHotspot] = useState<string>("ac-roof");

  const villaHotspots = [
    {
      id: "ac-roof",
      title: "Rooftop Central AC & Duct System",
      zone: "HVAC & Climate Control",
      icon: <Fan className="w-5 h-5 text-blue-600" />,
      symptom: "AC blowing warm air, bad odor from ducts, or frozen indoor coil.",
      procedure: "12-bar antimicrobial chemical coil restoration, gas pressure optimization, and capacitor swap.",
      price: "150 AED Fixed",
      eta: "20 Mins",
      slug: "ac-repair-troubleshooting",
      image: "/images/technician_ac.jpg",
      specs: ["Hydro-jet coil clean", "R410A Refrigerant check", "PCB & thermostat test", "90-Day cooling warranty"],
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    },
    {
      id: "water-heater",
      title: "Master Bathroom & Italian Water Heater",
      zone: "Sanitary & Water Heating",
      icon: <Droplets className="w-5 h-5 text-cyan-600" />,
      symptom: "Water dripping from false ceiling, water heater not heating or tripping main switch.",
      procedure: "Acoustic non-invasive leak isolation & Ariston Italian 50L/80L heater replacement with safety valve.",
      price: "150 AED Fixed",
      eta: "15 Mins",
      slug: "emergency-plumbing-repair",
      image: "/images/water_heater_after.jpg",
      specs: ["Ariston OEM heating element", "Safety pressure relief valve", "CPVC heat fusion pipe", "Zero ceiling damage"],
      badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-200",
    },
    {
      id: "electrical-db",
      title: "Main DEWA Electrical Distribution Board",
      zone: "High-Voltage Power Safety",
      icon: <Zap className="w-5 h-5 text-amber-600" />,
      symptom: "Main breaker tripping repeatedly, buzzing switchboard, or sudden partial blackout in villa.",
      procedure: "Megger insulation resistance test, load phase rebalancing, and ABB/Schneider breaker upgrade.",
      price: "150 AED Fixed",
      eta: "25 Mins",
      slug: "electrical-db-short-circuit",
      image: "/images/db_box_after.jpg",
      specs: ["DEWA compliant load test", "Schneider RCBO breaker", "Surge protection check", "Thermal heat scan"],
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    },
    {
      id: "living-tv",
      title: "Living Room & 85\" TV Wall Mounting",
      zone: "Precision Assembly & Handyman",
      icon: <Hammer className="w-5 h-5 text-purple-600" />,
      symptom: "Heavy TV bracket mounting on gypsum/block, chandelier hanging, or custom Italian furniture.",
      procedure: "Laser-leveled stud detection, Fischer heavy toggle anchors, and concealed in-wall cable conduit.",
      price: "110 AED Fixed",
      eta: "30 Mins",
      slug: "furniture-assembly-tv-mounting",
      image: "/images/hero_technician.jpg",
      specs: ["Laser leveled alignment", "Fischer German anchors", "Concealed cable conduit", "100kg load test"],
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    },
    {
      id: "villa-paint",
      title: "Villa Exterior & Interior Silk Painting",
      zone: "Architectural Decor & Coatings",
      icon: <Paintbrush className="w-5 h-5 text-emerald-600" />,
      symptom: "Scuffed walls, peeling paint, move-out handover, or premium designer repaint.",
      procedure: "Laser edge line masking, 3-stage dustless wall sanding, primer coat + 2x Jotun Fenomastic Silk.",
      price: "689 AED Fixed",
      eta: "Same-Day Start",
      slug: "villa-painting-decor",
      image: "/images/villa_paint_after.jpg",
      specs: ["Jotun Velvet Silk paint", "Zero paint odor / Low-VOC", "Floor & furniture wrap", "Laser border lines"],
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    },
  ];

  const currentHotspotData = villaHotspots.find((h) => h.id === selectedHotspot) || villaHotspots[0];

  // 3. Interactive AMC Savings Calculator State
  const [acUnitsCount, setAcUnitsCount] = useState<number>(4);
  const [propertyType, setPropertyType] = useState<"villa" | "apartment">("villa");

  const calculateAmcSavings = () => {
    // Normal breakdown cost per AC unit per year (4 services + 1 emergency repair avg ~ 650 AED)
    const costWithoutAmc = acUnitsCount * 620 + (propertyType === "villa" ? 1800 : 800);
    const amcCost = propertyType === "villa" ? 2890 : 1190;
    const netSavings = Math.max(costWithoutAmc - amcCost, 450);
    return { costWithoutAmc, amcCost, netSavings };
  };

  const savings = calculateAmcSavings();

  const handleWhatsApp = (context = "Home 2 Page") => {
    Analytics.trackWhatsAppClick(context, currentHub.community);
    const num = BUSINESS_SETTINGS.whatsappNumber.replace(/[^0-9]/g, "");
    window.open(
      `https://wa.me/${num}?text=Hello%20Al-Safwa%2C%20I%20need%20urgent%20service%20in%20${encodeURIComponent(
        currentHub.community
      )}%20(${encodeURIComponent(currentHotspotData.title)})`,
      "_blank"
    );
  };

  const handlePhone = () => {
    Analytics.trackPhoneCallClick("Home 2 Direct Hotline", "UAE");
    window.location.href = `tel:${BUSINESS_SETTINGS.phone.replace(/[^0-9+]/g, "")}`;
  };

  return (
    <div className="bg-[#F8FAFC] text-slate-900 min-h-screen selection:bg-brand-600 selection:text-white font-sans antialiased overflow-x-hidden">
      {/* 1. TOP LIVE FLEET RADAR BAR */}
      <div className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 text-xs py-2.5 px-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-extrabold text-slate-950 tracking-tight text-[11px] sm:text-xs">
              LIVE FLEET RADAR:
            </span>
            <span className="text-slate-600 hidden sm:inline text-xs">
              18 Technical Vans in Dubai • Nearest: <strong className="text-slate-950 font-bold">{currentHub.vanType}</strong> ({currentHub.eta})
            </span>
            <span className="text-slate-600 sm:hidden text-[11px]">18 Active Vans in Dubai</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[11px] hidden md:inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>90-Day Money-Back Warranty</span>
            </span>
            <button
              onClick={handlePhone}
              className="font-extrabold text-slate-900 hover:text-brand-600 flex items-center gap-1.5 text-[11px] sm:text-xs transition"
            >
              <Phone className="w-3.5 h-3.5 text-brand-600" />
              <span>{BUSINESS_SETTINGS.phone}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. LUXURY HERO: HIGH-STATUS BENTO CONSOLE */}
      <section className="relative pt-12 pb-24 overflow-hidden bg-gradient-to-b from-[#EFF3FA] via-[#F8FAFC] to-[#F8FAFC]">
        {/* Soft Modern Glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-brand-200/30 via-sky-200/30 to-amber-100/30 blur-[110px] pointer-events-none rounded-full" />
        <div className="absolute top-48 right-10 w-[350px] h-[350px] bg-emerald-200/25 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Typography */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-extrabold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>DUBAI'S 5-STAR RESIDENTIAL & VILLA MAINTENANCE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-[1.12] font-heading">
              Precision Property Care. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-blue-600 to-emerald-600">
                At Your Villa in 25 Minutes.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              AC cooling overhauls, emergency plumbing, DEWA electrical diagnostics, and villa painting. Fixed upfront pricing with 90-day parts & labor warranty.
            </p>
          </div>

          {/* HERO INTERACTIVE APP CONSOLE: LIVE GPS DISPATCH & BOOKING CARD */}
          <div className="max-w-5xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between pb-5 border-b border-slate-100 gap-3 flex-wrap">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-black text-slate-950 uppercase tracking-wider font-heading">
                  Live Dispatch Terminal • Select Your Community:
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                ⚡ Zero Callout Surcharge
              </span>
            </div>

            {/* Community Selector Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 mt-5">
              {fleetHubs.map((hub, idx) => {
                const isSelected = selectedHubIndex === idx;
                return (
                  <button
                    key={hub.community}
                    onClick={() => setSelectedHubIndex(idx)}
                    className={`p-3 rounded-2xl text-left transition-all duration-200 border flex flex-col justify-between ${
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]"
                        : "bg-slate-50/80 hover:bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    <span className="text-xs font-extrabold leading-snug">{hub.community}</span>
                    <div className="mt-3 flex items-center justify-between text-[11px]">
                      <span className={isSelected ? "text-emerald-400 font-bold" : "text-emerald-700 font-bold"}>
                        ETA: {hub.eta}
                      </span>
                      <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-slate-400"}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active GPS Van Status Box */}
            <div className="mt-6 bg-gradient-to-r from-slate-50 via-white to-blue-50/40 border border-slate-200/80 rounded-2xl p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left Details */}
              <div className="md:col-span-8 space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{currentHub.vanId}</span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-blue-100 border border-blue-300 text-blue-900 text-xs font-bold">
                    ⏱️ Arrives in {currentHub.eta}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-200/80 text-slate-800 text-xs font-semibold">
                    📍 {currentHub.community}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 font-heading">
                    {currentHub.vanType}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    <strong className="text-slate-900 font-bold">Assigned Lead:</strong> {currentHub.leadEngineer} • Fully stocked with European diagnostic tools & genuine OEM spare parts.
                  </p>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex items-center gap-3 pt-2 flex-wrap">
                  <button
                    onClick={() => openQuoteModal("emergency-dispatch")}
                    className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-brand-500/20 flex items-center gap-2 transition transform active:scale-95"
                  >
                    <span>Dispatch Van to My Villa ({currentHub.eta})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleWhatsApp(`Dispatch Van: ${currentHub.vanId} to ${currentHub.community}`)}
                    className="px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center gap-2 transition transform active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Dispatch</span>
                  </button>
                </div>
              </div>

              {/* Right Mini Map Indicator */}
              <div className="md:col-span-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                  <span className="font-bold text-slate-700">Hub Telemetry</span>
                  <span className="text-[10px] text-emerald-700 font-mono font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    ONLINE
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Available Engineers:</span>
                    <strong className="text-slate-900">{currentHub.availableTechs} Master Techs</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>GPS Coordinates:</span>
                    <span className="font-mono text-[11px] text-slate-500">{currentHub.coords}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Warranty:</span>
                    <strong className="text-emerald-700">90 Days Full</strong>
                  </div>
                </div>
                <div className="pt-1">
                  <span className="text-[11px] text-slate-500 italic block text-center">
                    Guaranteed on-time arrival across {currentHub.community.split("&")[0]}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Feature Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-8">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-black text-slate-900">25-Min Dispatch</div>
                <div className="text-[11px] text-slate-500">Across Dubai & Abu Dhabi</div>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-black text-slate-900">90-Day Warranty</div>
                <div className="text-[11px] text-slate-500">Parts & labor covered</div>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <Star className="w-5 h-5 fill-emerald-500 text-emerald-500" />
              </div>
              <div>
                <div className="text-xs font-black text-slate-900">4.95 ★ Rating</div>
                <div className="text-[11px] text-slate-500">1,480+ Happy residents</div>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-black text-slate-900">DEWA Certified</div>
                <div className="text-[11px] text-slate-500">Master qualified team</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NOVEL CREATIVE FEATURE: 3D VILLA BLUEPRINT & HOTSPOT DIAGNOSTIC EXPLORER */}
      <section className="py-24 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-extrabold">
              <Compass className="w-3.5 h-3.5" />
              <span>VILLA BLUEPRINT DIAGNOSTIC EXPLORER</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-heading">
              Click Any Villa Hotspot to Diagnose & Fix
            </h2>
            <p className="text-sm text-slate-600">
              Interactive architectural exploration: Choose any critical system in a Dubai villa to see genuine causes, engineering solutions, and fixed upfront rates.
            </p>
          </div>

          {/* Hotspot Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-w-5xl mx-auto mb-8">
            {villaHotspots.map((spot) => {
              const isSelected = selectedHotspot === spot.id;
              return (
                <button
                  key={spot.id}
                  onClick={() => setSelectedHotspot(spot.id)}
                  className={`p-3.5 rounded-2xl text-left transition-all border flex flex-col justify-between ${
                    isSelected
                      ? "bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    {spot.icon}
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isSelected ? "bg-slate-800 text-white" : "bg-slate-200 text-slate-700"}`}>
                      {spot.eta}
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="text-xs font-black">{spot.zone}</div>
                    <div className={`text-[11px] font-bold mt-0.5 ${isSelected ? "text-amber-300" : "text-brand-600"}`}>
                      {spot.price}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Hotspot Deep-Dive Display */}
          <div className="max-w-5xl mx-auto bg-slate-50/80 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Photo */}
            <div className="lg:col-span-5 relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 shadow-md group">
              <Image src={currentHotspotData.image} alt={currentHotspotData.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-slate-950 font-bold text-xs shadow-sm">
                  {currentHotspotData.zone}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="font-extrabold bg-emerald-600 px-2.5 py-1 rounded-lg">
                  {currentHotspotData.price}
                </span>
                <span className="font-bold text-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> 90-Day Warranty
                </span>
              </div>
            </div>

            {/* Right Diagnostic Specifications */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <span className="text-xs font-bold text-brand-600 tracking-wide uppercase">
                  Verified Technical Procedure
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-heading mt-1">
                  {currentHotspotData.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  <strong className="text-slate-900 font-bold">Reported Symptom:</strong> {currentHotspotData.symptom}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  <strong className="text-brand-600 font-bold">Engineering Fix:</strong> {currentHotspotData.procedure}
                </p>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                {currentHotspotData.specs.map((spec, i) => (
                  <div key={i} className="bg-white border border-slate-200/80 rounded-xl p-2.5 flex items-center gap-2 shadow-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-xs text-slate-700 font-semibold">{spec}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-3 pt-3 flex-wrap">
                <button
                  onClick={() => openQuoteModal(currentHotspotData.slug)}
                  className="px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs shadow-md transition"
                >
                  Book This Fix ({currentHotspotData.price})
                </button>

                <button
                  onClick={() => handleWhatsApp(`Inquire Hotspot: ${currentHotspotData.title}`)}
                  className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md flex items-center gap-2 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Technician</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NOVEL CREATIVE FEATURE: GAMIFIED AMC SAVINGS CALCULATOR */}
      <section className="py-24 bg-[#EFF3FA] border-t border-slate-200/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-extrabold">
                <Percent className="w-3.5 h-3.5 text-emerald-700" />
                <span>ANNUAL SAVINGS SIMULATOR</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-heading">
                How Much Will You Save with an Annual Contract?
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                Emergency callouts and ad-hoc contractor visits in Dubai add up rapidly. See your exact savings when switching to a fixed Al-Safwa Annual Maintenance Contract.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">
                    Unlimited 24/7 emergency callouts with zero labor fees.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">
                    4x Quarterly AC deep chemical coil pressure overhauls included.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">
                    Plumbing leak prevention, water heater inspections, and DEWA load safety audits.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Interactive Simulator Card */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              {/* Step 1: Property Type */}
              <div>
                <label className="text-xs font-black text-slate-900 uppercase tracking-wider block mb-2 font-heading">
                  1. Select Property Type:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPropertyType("apartment")}
                    className={`py-3 px-4 rounded-xl text-xs font-bold text-center transition border ${
                      propertyType === "apartment"
                        ? "bg-slate-900 text-white border-slate-900 shadow-md"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    🏢 Apartment (1-3 Beds)
                  </button>
                  <button
                    onClick={() => setPropertyType("villa")}
                    className={`py-3 px-4 rounded-xl text-xs font-bold text-center transition border ${
                      propertyType === "villa"
                        ? "bg-slate-900 text-white border-slate-900 shadow-md"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    🏡 Luxury Villa / Townhouse
                  </button>
                </div>
              </div>

              {/* Step 2: AC Units Interactive Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-black text-slate-900 uppercase tracking-wider font-heading">
                    2. Number of AC Units in Home:
                  </label>
                  <span className="text-sm font-extrabold text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200">
                    {acUnitsCount} AC Units
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={acUnitsCount}
                  onChange={(e) => setAcUnitsCount(parseInt(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-bold mt-1">
                  <span>1 Unit</span>
                  <span>5 Units</span>
                  <span>10+ Units</span>
                </div>
              </div>

              {/* Calculation Output Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium">Standard Ad-Hoc Cost/Yr:</div>
                    <div className="text-lg sm:text-xl font-bold text-rose-700 line-through">
                      AED {savings.costWithoutAmc}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium">Fixed AMC Package/Yr:</div>
                    <div className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading">
                      AED {savings.amcCost}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                      Your Guaranteed Net Savings:
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-emerald-600 font-heading">
                      + AED {savings.netSavings} / year
                    </div>
                  </div>

                  <button
                    onClick={() => openQuoteModal("amc-package")}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition"
                  >
                    Lock In This Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VISUAL BEFORE & AFTER TRANSFORMATION SHOWCASE */}
      <section className="py-24 bg-white border-t border-slate-200/80">
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

      {/* 6. COMPARISON TABLE: AL-SAFWA VS ROADSIDE CONTRACTORS */}
      <section className="py-24 bg-[#FAFBFD] border-t border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-extrabold text-brand-700 uppercase tracking-wider bg-brand-50 border border-brand-200 px-3 py-1 rounded-full">
              The Quality Standard
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-heading">
              Why Dubai Homeowners Switch to Al-Safwa
            </h2>
            <p className="text-sm text-slate-600">
              See the direct difference between roadside freelance handymen and our certified master engineering fleet.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-12 bg-slate-900 text-white p-4 sm:p-5 text-xs font-black uppercase tracking-wider">
              <div className="col-span-4 sm:col-span-5">Feature & Standard</div>
              <div className="col-span-4 sm:col-span-4 text-center text-emerald-400">Al-Safwa Master Fleet</div>
              <div className="col-span-4 sm:col-span-3 text-center text-slate-400">Other Contractors</div>
            </div>

            <div className="divide-y divide-slate-100 text-xs sm:text-sm">
              {[
                {
                  feature: "Emergency Dispatch Window",
                  safwa: "⚡ Guaranteed 25 Minutes (GPS Tracked)",
                  other: "3 - 5 Hours (Often Delayed)",
                },
                {
                  feature: "Pricing Transparency",
                  safwa: "💰 100% Upfront Fixed Rates (0 AED Callout)",
                  other: "Hidden Travel Fees & Inflated Quotes",
                },
                {
                  feature: "Warranty Guarantee",
                  safwa: "🛡️ 90-Day Unconditional Parts & Labor",
                  other: "Zero Warranty (No Callback Answer)",
                },
                {
                  feature: "Technical Qualifications",
                  safwa: "🎖️ DEWA & Municipality Master Certified",
                  other: "Unlicensed Freelance Labor",
                },
                {
                  feature: "Cleanliness & Protection",
                  safwa: "✨ Shoe Covers, Floor Wrap & Zero Residue",
                  other: "Dirty Floors & Unprotected Furniture",
                },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-12 p-4 sm:p-5 items-center hover:bg-slate-50/80 transition">
                  <div className="col-span-4 sm:col-span-5 font-bold text-slate-900">{row.feature}</div>
                  <div className="col-span-4 sm:col-span-4 text-center font-extrabold text-emerald-700 bg-emerald-50/60 py-1.5 px-2 rounded-lg border border-emerald-200 text-xs">
                    {row.safwa}
                  </div>
                  <div className="col-span-4 sm:col-span-3 text-center text-slate-500 text-xs">
                    {row.other}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. VERIFIED CUSTOMER STORIES */}
      <section className="py-24 bg-white border-t border-slate-200/80">
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
                className="bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition"
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

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
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

      {/* 8. BOTTOM HIGH-CONVERTING ACTION STRIP */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-brand-950 to-slate-950 text-white text-center relative overflow-hidden">
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
