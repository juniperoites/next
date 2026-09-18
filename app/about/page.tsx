import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Award, Users, Wrench, Clock, CheckCircle2, Phone, MessageSquare } from "lucide-react";
import { BUSINESS_SETTINGS } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us | Al-Safwa Technical Services UAE",
  description: "Learn about Al-Safwa Technical Services, UAE's premier facility management and maintenance contractor with DEWA certified engineers and ISO 9001:2015 accreditation.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface pb-20">
      {/* Header */}
      <section className="py-16 bg-white border-b border-surfaceBorder text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-brand-700 border border-blue-200 text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Established UAE Technical Services Contractor</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-slate-900 tracking-tight">
            Setting the Benchmark for Property Maintenance in the UAE
          </h1>
          <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Founded with a vision to deliver rapid, transparent, and certified engineering maintenance across Dubai, Abu Dhabi, and Sharjah.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-12 space-y-12">
        {/* Story & Credentials */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
              Over a Decade of Engineering Excellence
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Al-Safwa Technical Services is a fully licensed and insured facility management contractor registered under Dubai Economy & Tourism ({BUSINESS_SETTINGS.dedLicense}) and approved by Dubai Electricity & Water Authority ({BUSINESS_SETTINGS.dewaLicense}).
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              We operate a mobile fleet of 45+ fully equipped service vans staffed by certified HVAC engineers, licensed master wiremen, thermal leak specialists, and precision fit-out artisans.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-3 text-xs font-bold text-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>DEWA & ADDC Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Dubai Municipality Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>ISO 9001:2015 Accredited</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Genuine OEM Parts</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="clean-card rounded-3xl p-8 bg-white space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-heading font-extrabold text-brand-700">15,000+</div>
                  <div className="text-xs text-slate-500 font-semibold mt-1">Properties Maintained</div>
                </div>
                <div>
                  <div className="text-3xl font-heading font-extrabold text-brand-700">25 Mins</div>
                  <div className="text-xs text-slate-500 font-semibold mt-1">Average Emergency SLA</div>
                </div>
                <div>
                  <div className="text-3xl font-heading font-extrabold text-brand-700">150+</div>
                  <div className="text-xs text-slate-500 font-semibold mt-1">Full-Time Engineers</div>
                </div>
                <div>
                  <div className="text-3xl font-heading font-extrabold text-brand-700">4.9 ★</div>
                  <div className="text-xs text-slate-500 font-semibold mt-1">Customer Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="clean-card p-8 rounded-3xl bg-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-heading font-extrabold text-slate-900">
              Need to Discuss an Annual Contract or Emergency Repair?
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Our operations directors and senior engineers are available 24/7.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition"
            >
              Contact Our Team
            </Link>
            <a
              href={`tel:${BUSINESS_SETTINGS.phone.replace(/[^0-9+]/g, "")}`}
              className="px-5 py-3 rounded-xl bg-surface hover:bg-surfaceHover border border-surfaceBorder text-slate-800 font-bold text-xs"
            >
              {BUSINESS_SETTINGS.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
