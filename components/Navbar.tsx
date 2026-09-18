"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { CATEGORIES, BUSINESS_SETTINGS } from "@/lib/data";
import { Analytics } from "@/lib/analytics";

interface NavbarProps {
  onOpenQuoteModal?: (serviceSlug?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  const handleWhatsAppClick = () => {
    Analytics.trackWhatsAppClick("Navbar Header", "UAE");
    window.open(
      `https://wa.me/${BUSINESS_SETTINGS.whatsappNumber}?text=Hello%20Al-Safwa%2C%20I%20need%20urgent%20technical%20services%20in%20UAE`,
      "_blank"
    );
  };

  const handlePhoneClick = () => {
    Analytics.trackPhoneCallClick("Navbar Header", "UAE");
    window.location.href = `tel:${BUSINESS_SETTINGS.phone.replace(/[^0-9+]/g, "")}`;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-surfaceBorder shadow-subtle transition-all">
      {/* Top UAE Trust Bar */}
      <div className="bg-slate-900 py-1.5 px-4 text-xs text-slate-200">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              24/7 Rapid Emergency Dispatch Active
            </span>
            <span className="hidden sm:inline-block text-slate-600">|</span>
            <span className="hidden sm:flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> Avg Arrival: 25 Mins (Dubai & Abu Dhabi)
            </span>
            <span className="hidden md:inline-block text-slate-600">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> DEWA Licensed • {BUSINESS_SETTINGS.dedLicense}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={handlePhoneClick}
              className="flex items-center gap-1.5 text-amber-300 hover:text-white font-bold transition"
            >
              <Phone className="w-3 h-3" />
              <span>{BUSINESS_SETTINGS.phone}</span>
            </button>
            <Link
              href="/admin"
              className="hidden lg:flex items-center gap-1 text-slate-300 hover:text-white transition px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[11px] font-medium"
            >
              <Lock className="w-2.5 h-2.5 text-amber-400" />
              <span>Admin CMS</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-brand-900 text-white p-0.5 shadow-md flex items-center justify-center group-hover:bg-brand-800 transition">
            <Wrench className="w-6 h-6 text-amber-400" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-extrabold text-xl tracking-tight text-slate-900">
                AL-SAFWA
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-300">
                UAE
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-semibold tracking-wide">
              Technical Services & Property Maintenance
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          <Link href="/" className="text-sm font-semibold text-slate-700 hover:text-brand-600 transition">
            Home
          </Link>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesDropdown(true)}
            onMouseLeave={() => setServicesDropdown(false)}
          >
            <button
              onClick={() => setServicesDropdown(!servicesDropdown)}
              className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-brand-600 transition py-2"
            >
              <span>Services</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdown ? "rotate-180 text-brand-600" : ""}`} />
            </button>

            {servicesDropdown && (
              <div className="absolute left-0 top-full w-84 rounded-2xl bg-white border border-surfaceBorder p-3 shadow-premium animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5">
                  Core Maintenance Categories
                </div>
                <div className="space-y-1 mt-1">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/services/${cat.slug}`}
                      onClick={() => setServicesDropdown(false)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-surfaceHover transition group/item"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-600 shrink-0">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-800 group-hover/item:text-brand-600 transition">
                          {cat.name}
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1">
                          {cat.description}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-surfaceBorder px-3 py-1">
                  <Link
                    href="/#all-services"
                    onClick={() => setServicesDropdown(false)}
                    className="text-xs font-bold text-brand-600 hover:underline flex items-center justify-between"
                  >
                    <span>View all 20+ specialized services</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/amc" className="text-sm font-semibold text-slate-700 hover:text-brand-600 transition">
            AMC Packages
          </Link>
          <Link href="/projects" className="text-sm font-semibold text-slate-700 hover:text-brand-600 transition">
            Our Projects
          </Link>
          <Link href="/areas" className="text-sm font-semibold text-slate-700 hover:text-brand-600 transition">
            Service Areas
          </Link>
          <Link href="/reviews" className="text-sm font-semibold text-slate-700 hover:text-brand-600 transition">
            Reviews
          </Link>
          <Link href="/blog" className="text-sm font-semibold text-slate-700 hover:text-brand-600 transition">
            Blog
          </Link>
          <Link href="/about" className="text-sm font-semibold text-slate-700 hover:text-brand-600 transition">
            About Us
          </Link>
          <Link href="/contact" className="text-sm font-semibold text-slate-700 hover:text-brand-600 transition">
            Contact
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={handleWhatsAppClick}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold text-xs transition"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>WhatsApp Dispatch</span>
          </button>

          <button
            onClick={() => (onOpenQuoteModal ? onOpenQuoteModal() : window.location.assign("/quote"))}
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs tracking-wide shadow-md hover:shadow-lg transition transform active:scale-95 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant AED Quote</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={handleWhatsAppClick}
            className="p-2 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-surface border border-surfaceBorder text-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-surfaceBorder bg-white p-5 space-y-3 shadow-premium animate-in slide-in-from-top-3">
          <div className="space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-bold text-slate-800 hover:bg-surface"
            >
              Home
            </Link>
            <Link
              href="/#all-services"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-bold text-slate-800 hover:bg-surface"
            >
              Services Directory (20+ Services)
            </Link>
            <Link
              href="/amc"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-bold text-slate-800 hover:bg-surface"
            >
              AMC Maintenance Packages
            </Link>
            <Link
              href="/areas"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-bold text-slate-800 hover:bg-surface"
            >
              Service Areas (Dubai, Abu Dhabi, Sharjah)
            </Link>
            <Link
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-bold text-slate-800 hover:bg-surface"
            >
              Our Projects & Before/After
            </Link>
            <Link
              href="/reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-bold text-slate-800 hover:bg-surface"
            >
              Reviews & Testimonials
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-bold text-slate-800 hover:bg-surface"
            >
              Blog & Maintenance Guides
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-bold text-slate-800 hover:bg-surface"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-bold text-slate-800 hover:bg-surface"
            >
              Contact Us
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-xs font-bold text-brand-700 bg-blue-50 border border-blue-200"
            >
              Admin CMS Control Room
            </Link>
          </div>

          <div className="pt-3 border-t border-surfaceBorder space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenQuoteModal) onOpenQuoteModal();
              }}
              className="w-full py-3 rounded-xl bg-brand-600 text-white font-bold text-sm shadow-md"
            >
              Get Instant AED Quote
            </button>
            <button
              onClick={handlePhoneClick}
              className="w-full py-3 rounded-xl bg-surface border border-surfaceBorder text-slate-800 font-semibold text-sm flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-brand-600" />
              <span>Call Emergency Hotline ({BUSINESS_SETTINGS.phone})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
