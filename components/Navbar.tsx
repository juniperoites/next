"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Phone,
  MessageSquare,
  ShieldCheck,
  Wrench,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Clock,
  Lock,
  ArrowRight,
  Fan,
  Droplets,
  Zap,
  Hammer,
  Paintbrush,
  Layers,
  Shield,
  CheckCircle2,
  Headphones,
} from "lucide-react";
import { CATEGORIES, BUSINESS_SETTINGS } from "@/lib/data";
import { BusinessSettingsData } from "@/lib/types";
import { Analytics } from "@/lib/analytics";

interface NavbarProps {
  onOpenQuoteModal?: (serviceSlug?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [settings, setSettings] = useState<BusinessSettingsData>(BUSINESS_SETTINGS);

  // Sync with live DB business settings if updated
  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data.settings) {
          setSettings(data.settings);
        }
      })
      .catch(() => {});
  }, []);

  const handleWhatsAppClick = () => {
    Analytics.trackWhatsAppClick("Navbar Header", "UAE");
    const num = settings.whatsappNumber.replace(/[^0-9]/g, "");
    window.open(
      `https://wa.me/${num}?text=Hello%20Al-Safwa%2C%20I%20need%20urgent%20technical%20services%20in%20UAE`,
      "_blank"
    );
  };

  const handlePhoneClick = () => {
    Analytics.trackPhoneCallClick("Navbar Header", "UAE");
    window.location.href = `tel:${settings.emergencyHotline || settings.phone}`;
  };

  const getCategoryDetails = (slug: string) => {
    switch (slug) {
      case "ac-services":
        return {
          icon: <Fan className="w-5 h-5 text-blue-600" />,
          bg: "bg-blue-50 border-blue-100",
          tag: "Most Requested",
          tagColor: "bg-blue-100 text-blue-800",
          quick: "AC Repair • Coil Cleaning • Duct Disinfection",
        };
      case "plumbing":
        return {
          icon: <Droplets className="w-5 h-5 text-cyan-600" />,
          bg: "bg-cyan-50 border-cyan-100",
          tag: "24/7 Rapid",
          tagColor: "bg-cyan-100 text-cyan-800",
          quick: "Leak Detection • Water Heater • Pump Overhaul",
        };
      case "electrical":
        return {
          icon: <Zap className="w-5 h-5 text-amber-600" />,
          bg: "bg-amber-50 border-amber-100",
          tag: "DEWA Certified",
          tagColor: "bg-amber-100 text-amber-900",
          quick: "DB Tripping • Wiring • Breaker Diagnostics",
        };
      case "handyman":
        return {
          icon: <Hammer className="w-5 h-5 text-slate-700" />,
          bg: "bg-slate-100 border-slate-200",
          tag: "Multi-Skill",
          tagColor: "bg-slate-200 text-slate-800",
          quick: "Furniture Assembly • TV Mounting • Locks",
        };
      case "painting-waterproofing":
        return {
          icon: <Paintbrush className="w-5 h-5 text-emerald-600" />,
          bg: "bg-emerald-50 border-emerald-100",
          tag: "Jotun Luxury",
          tagColor: "bg-emerald-100 text-emerald-800",
          quick: "Villa Exterior • Interior • Roof Waterproofing",
        };
      case "renovation-fitout":
        return {
          icon: <Layers className="w-5 h-5 text-purple-600" />,
          bg: "bg-purple-50 border-purple-100",
          tag: "Turnkey",
          tagColor: "bg-purple-100 text-purple-800",
          quick: "Kitchen & Bath • Marble Polish • Tiling",
        };
      case "amc-packages":
        return {
          icon: <Shield className="w-5 h-5 text-amber-600" />,
          bg: "bg-amber-50 border-amber-200",
          tag: "Save 15%",
          tagColor: "bg-amber-200 text-amber-950 font-extrabold",
          quick: "365-Day Villa & Apartment Contracts",
        };
      default:
        return {
          icon: <Sparkles className="w-5 h-5 text-brand-600" />,
          bg: "bg-brand-50 border-brand-100",
          tag: "Specialized",
          tagColor: "bg-brand-100 text-brand-800",
          quick: "Deep Sanitization • Swimming Pool Care",
        };
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-surfaceBorder shadow-subtle transition-all">
      {/* Top UAE Trust & Emergency Bar */}
      <div className="bg-slate-950 py-1.5 px-4 text-xs text-slate-200 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Left: Dispatch status & SLA */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              24/7 Rapid Emergency Dispatch Active
            </span>
            <span className="hidden sm:inline-block text-slate-700">|</span>
            <span className="hidden sm:flex items-center gap-1 text-slate-300 font-medium">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> Avg Arrival: 25 Mins (Dubai & Abu Dhabi)
            </span>
            <span className="hidden md:inline-block text-slate-700">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> DEWA Licensed • {settings.dedLicense || "DED License #892147"}
            </span>
          </div>

          {/* Right: Phone & Admin CMS */}
          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={handlePhoneClick}
              className="flex items-center gap-1.5 text-amber-300 hover:text-white font-bold transition px-2 py-0.5 rounded hover:bg-slate-800 text-[11px] sm:text-xs"
              title="Call 24/7 Emergency Hotline"
            >
              <Phone className="w-3 h-3 text-amber-400 animate-pulse" />
              <span className="font-mono tracking-tight">{settings.phone}</span>
            </button>
            <span className="text-slate-700">|</span>
            <Link
              href="/admin"
              className="flex items-center gap-1 text-slate-300 hover:text-white transition px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-[11px] font-semibold"
            >
              <Lock className="w-2.5 h-2.5 text-amber-400" />
              <span>Admin CMS</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-slate-900 via-brand-950 to-slate-950 text-white p-0.5 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform duration-200 border border-slate-700/50 shrink-0">
            <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 leading-tight">
                AL-SAFWA
              </span>
              <span className="text-[9px] uppercase font-extrabold tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                UAE
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-bold tracking-tight whitespace-nowrap">
              Technical Services & Facility Care
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          <Link
            href="/"
            className="text-xs xl:text-sm font-bold text-slate-700 hover:text-brand-600 transition whitespace-nowrap"
          >
            Home
          </Link>

          {/* Mega Menu Trigger */}
          <div
            className="relative py-2"
            onMouseEnter={() => setServicesDropdown(true)}
            onMouseLeave={() => setServicesDropdown(false)}
          >
            <button
              onClick={() => setServicesDropdown(!servicesDropdown)}
              className={`flex items-center gap-1 text-xs xl:text-sm font-bold transition whitespace-nowrap ${
                servicesDropdown ? "text-brand-600" : "text-slate-700 hover:text-brand-600"
              }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  servicesDropdown ? "rotate-180 text-brand-600" : "text-slate-400"
                }`}
              />
            </button>

            {/* REAL WIDE 2-COLUMN + SPOTLIGHT MEGA MENU */}
            {servicesDropdown && (
              <div
                className="absolute -left-20 xl:left-1/2 xl:-translate-x-1/3 top-full w-[840px] max-w-[92vw] rounded-3xl bg-white border border-surfaceBorder shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 z-50 overflow-hidden"
              >
                {/* Mega Menu Header */}
                <div className="bg-surface px-6 py-3 border-b border-surfaceBorder flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-600" />
                    <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider font-heading">
                      Technical Services Catalog (21+ Specializations)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px]">
                      ⚡ Instant Booking & 25-Min Dispatch
                    </span>
                  </div>
                </div>

                {/* Mega Menu Grid Body */}
                <div className="p-6 grid grid-cols-12 gap-6">
                  {/* Left & Center: 2 Columns of Categories (8 Total) */}
                  <div className="col-span-8 grid grid-cols-2 gap-3">
                    {CATEGORIES.map((cat) => {
                      const details = getCategoryDetails(cat.slug);
                      return (
                        <Link
                          key={cat.id}
                          href={`/services/${cat.slug}`}
                          onClick={() => setServicesDropdown(false)}
                          className="group/card p-3 rounded-2xl border border-surfaceBorder hover:border-brand-300 hover:bg-brand-50/50 transition-all flex items-start gap-3"
                        >
                          <div
                            className={`w-10 h-10 rounded-xl ${details.bg} border flex items-center justify-center shrink-0 group-hover/card:scale-105 transition-transform duration-200`}
                          >
                            {details.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-0.5">
                              <span className="text-xs font-bold text-slate-900 group-hover/card:text-brand-600 transition truncate">
                                {cat.name}
                              </span>
                              <span
                                className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded shrink-0 ${details.tagColor}`}
                              >
                                {details.tag}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 line-clamp-1 leading-snug">
                              {details.quick}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Right Column: Featured Spotlight & Direct Hotline */}
                  <div className="col-span-4 flex flex-col justify-between space-y-3">
                    {/* AMC Spotlight Card */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-brand-950 text-white shadow-md relative overflow-hidden">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-extrabold tracking-wider uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full">
                          Featured AMC
                        </span>
                        <span className="text-xs font-heading font-extrabold text-amber-400">
                          15% OFF
                        </span>
                      </div>
                      <h4 className="font-heading font-bold text-sm text-white">
                        Annual Villa & Apartment Care
                      </h4>
                      <p className="text-[11px] text-slate-300 mt-1 leading-tight">
                        Unlimited emergency callouts, zero labor charges & 4x AC overhaul visits.
                      </p>
                      <Link
                        href="/amc"
                        onClick={() => setServicesDropdown(false)}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 transition underline underline-offset-2"
                      >
                        <span>View AMC Tiers</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    {/* Quick Hotline Card */}
                    <div className="p-3.5 rounded-2xl bg-surface border border-surfaceBorder flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                          <Headphones className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-slate-900">24/7 Operations Desk</div>
                          <div className="text-[10px] text-slate-500 font-mono">{settings.phone}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setServicesDropdown(false);
                          handlePhoneClick();
                        }}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] transition"
                      >
                        Call Now
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mega Menu Footer Banner */}
                <div className="bg-slate-50 px-6 py-3 border-t border-surfaceBorder flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-600 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>90-Day Parts & Labor Warranty on all technical maintenance services.</span>
                  </div>
                  <Link
                    href="/#all-services"
                    onClick={() => setServicesDropdown(false)}
                    className="font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                  >
                    <span>View Full Directory</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/amc"
            className="text-xs xl:text-sm font-bold text-slate-700 hover:text-brand-600 transition flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>AMC Packages</span>
            <span className="text-[9px] font-extrabold text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300 whitespace-nowrap">
              Save 15%
            </span>
          </Link>

          <Link
            href="/projects"
            className="text-xs xl:text-sm font-bold text-slate-700 hover:text-brand-600 transition whitespace-nowrap"
          >
            Projects
          </Link>

          <Link
            href="/areas"
            className="text-xs xl:text-sm font-bold text-slate-700 hover:text-brand-600 transition whitespace-nowrap"
          >
            Service Areas
          </Link>

          <Link
            href="/reviews"
            className="text-xs xl:text-sm font-bold text-slate-700 hover:text-brand-600 transition whitespace-nowrap"
          >
            Reviews
          </Link>

          <Link
            href="/blog"
            className="text-xs xl:text-sm font-bold text-slate-700 hover:text-brand-600 transition whitespace-nowrap"
          >
            Blog
          </Link>

          <Link
            href="/contact"
            className="text-xs xl:text-sm font-bold text-slate-700 hover:text-brand-600 transition whitespace-nowrap"
          >
            Contact
          </Link>
        </nav>

        {/* Right Action Button */}
        <div className="hidden lg:flex items-center shrink-0">
          <button
            onClick={handleWhatsAppClick}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm hover:shadow-md transition-all transform active:scale-95 whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Direct</span>
          </button>
        </div>

        {/* Mobile Menu Triggers */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={handleWhatsAppClick}
            className="p-2.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 shadow-sm"
            title="WhatsApp Dispatch"
          >
            <MessageSquare className="w-5 h-5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-surface border border-surfaceBorder text-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-surfaceBorder bg-white p-5 space-y-4 shadow-2xl animate-in slide-in-from-top-3 max-h-[80vh] overflow-y-auto">
          <div className="space-y-1 font-semibold text-sm text-slate-800">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-xl font-bold hover:bg-surface"
            >
              Home
            </Link>
            <Link
              href="/#all-services"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-xl font-bold hover:bg-surface flex items-center justify-between"
            >
              <span>Services Directory</span>
              <span className="text-xs text-brand-600 font-bold bg-brand-50 px-2 py-0.5 rounded-full">21 Services</span>
            </Link>
            <Link
              href="/amc"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-xl font-bold hover:bg-surface flex items-center justify-between"
            >
              <span>AMC Maintenance Contracts</span>
              <span className="text-xs text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded-full">Save 15%</span>
            </Link>
            <Link
              href="/areas"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-xl font-bold hover:bg-surface"
            >
              Service Areas (Dubai & Abu Dhabi)
            </Link>
            <Link
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-xl font-bold hover:bg-surface"
            >
              Our Projects & Case Studies
            </Link>
            <Link
              href="/reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-xl font-bold hover:bg-surface"
            >
              Customer Reviews (4.9★)
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-xl font-bold hover:bg-surface"
            >
              Blog & Maintenance Guides
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-xl font-bold hover:bg-surface"
            >
              About Al-Safwa UAE
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-xl font-bold hover:bg-surface"
            >
              Contact Us
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-xl text-xs font-bold text-brand-700 bg-brand-50 border border-brand-200"
            >
              Admin Operations Console
            </Link>
          </div>

          <div className="pt-3 border-t border-surfaceBorder space-y-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenQuoteModal) onOpenQuoteModal();
              }}
              className="w-full py-3 rounded-xl bg-brand-600 text-white font-bold text-xs tracking-wide shadow-md"
            >
              Get Instant AED Price Calculation
            </button>
            <button
              onClick={handlePhoneClick}
              className="w-full py-3 rounded-xl bg-surface border border-surfaceBorder text-slate-900 font-bold text-xs flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-brand-600" />
              <span>Call Hotline: {settings.phone}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
