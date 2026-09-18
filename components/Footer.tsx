"use client";

import React from "react";
import Link from "next/link";
import { Wrench, Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import { SERVICES, LOCATIONS, BUSINESS_SETTINGS } from "@/lib/data";

export const Footer: React.FC = () => {
  const topServices = SERVICES.slice(0, 6);
  const topLocations = LOCATIONS.slice(0, 6);

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 text-xs">
      {/* Top Credentials Bar */}
      <div className="border-b border-slate-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-6 text-slate-200">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <strong>DED Commercial License:</strong> #892147
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <strong>DEWA Approved Contractor:</strong> #EC-9941
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <strong>Dubai Municipality:</strong> #DM-2023-4881
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <strong>ISO 9001:2015</strong> Certified Quality
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-[11px] text-slate-400">Accepted:</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200 font-bold text-[10px]">
              Apple Pay
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200 font-bold text-[10px]">
              Visa / MC
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200 font-bold text-[10px]">
              Bank Transfer
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200 font-bold text-[10px]">
              Cash on Service
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Col 1: Brand Info (2 cols wide) */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-brand-600 text-white p-0.5 shadow-md flex items-center justify-center">
              <Wrench className="w-5 h-5 text-amber-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-xl tracking-tight text-white">
                AL-SAFWA TECHNICAL
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                UAE Premier Facility Management & AMC
              </span>
            </div>
          </Link>

          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            High-end residential and commercial technical maintenance across Dubai, Abu Dhabi, and Sharjah. DEWA-certified master technicians, genuine OEM parts, and guaranteed 24/7 rapid emergency dispatch.
          </p>

          <div className="pt-2 space-y-2 text-slate-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{BUSINESS_SETTINGS.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Toll Free 24/7: {BUSINESS_SETTINGS.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{BUSINESS_SETTINGS.email}</span>
            </div>
          </div>
        </div>

        {/* Col 2: Specialized Services */}
        <div>
          <h4 className="font-heading font-bold text-white text-sm mb-4">
            Technical Services
          </h4>
          <ul className="space-y-2">
            {topServices.map((srv) => (
              <li key={srv.id}>
                <Link
                  href={`/services/${srv.slug}`}
                  className="hover:text-amber-400 transition"
                >
                  {srv.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Coverage Hubs */}
        <div>
          <h4 className="font-heading font-bold text-white text-sm mb-4">
            Service Areas
          </h4>
          <ul className="space-y-2">
            {topLocations.map((loc) => (
              <li key={loc.id}>
                <Link
                  href={`/services/ac-repair/${loc.citySlug}/${loc.neighborhoodSlug}`}
                  className="hover:text-amber-400 transition"
                >
                  {loc.neighborhood} ({loc.city})
                </Link>
              </li>
            ))}
            <li>
              <Link href="/areas" className="text-amber-400 font-bold hover:underline">
                View All UAE Areas →
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Quick Portals */}
        <div>
          <h4 className="font-heading font-bold text-white text-sm mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2">
            <li>
              <Link href="/amc" className="hover:text-amber-400 transition">
                AMC Maintenance Plans
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-amber-400 transition">
                Our Projects & Portfolio
              </Link>
            </li>
            <li>
              <Link href="/reviews" className="hover:text-amber-400 transition">
                Customer Testimonials
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-amber-400 transition">
                Blog & Guides
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-amber-400 transition">
                About Our Company
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-amber-400 transition">
                Contact & Office Map
              </Link>
            </li>
            <li>
              <Link href="/admin" className="text-amber-400 font-bold hover:underline">
                Admin CMS Portal
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            © {new Date().getFullYear()} Al-Safwa Technical Services & Facility Management L.L.C. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/faqs" className="hover:underline">
              FAQs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
