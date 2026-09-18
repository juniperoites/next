import React from "react";
import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageSquare, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { BUSINESS_SETTINGS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us & 24/7 Hotlines | Al-Safwa UAE",
  description: "Contact Al-Safwa Technical Services UAE. 24/7 hotline +971 4 399 8877, direct WhatsApp dispatch, and office headquarters in Dubai Marina Plaza.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-surface pb-20">
      {/* Header */}
      <section className="py-14 bg-white border-b border-surfaceBorder text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-brand-700 border border-blue-200 text-xs font-bold uppercase tracking-wider mb-4">
            <Phone className="w-3.5 h-3.5" />
            <span>24/7 Client Dispatch & Support</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 tracking-tight">
            Contact Our UAE Operations Control Room
          </h1>
          <p className="mt-4 text-slate-600 text-base">
            Reach our central customer care and mobile response teams 24 hours a day, 7 days a week.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info Cards (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="clean-card p-6 rounded-3xl bg-white space-y-4">
            <h2 className="text-lg font-heading font-extrabold text-slate-900">
              Direct Emergency Hotlines
            </h2>

            <div className="space-y-3 text-xs">
              <a
                href={`tel:${BUSINESS_SETTINGS.phone.replace(/[^0-9+]/g, "")}`}
                className="p-3.5 rounded-2xl bg-surface hover:bg-surfaceHover border border-surfaceBorder flex items-center gap-3 transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-500 block font-semibold">Toll-Free 24/7 Line</span>
                  <span className="text-sm font-bold text-slate-900 font-mono group-hover:text-brand-600">
                    {BUSINESS_SETTINGS.phone}
                  </span>
                </div>
              </a>

              <a
                href={`https://wa.me/${BUSINESS_SETTINGS.whatsappNumber}?text=Hello%20Al-Safwa%2C%20I%20need%20urgent%20service`}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 flex items-center gap-3 transition text-emerald-900"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-emerald-700 block font-semibold">WhatsApp Direct Dispatch</span>
                  <span className="text-sm font-bold font-mono">
                    +{BUSINESS_SETTINGS.whatsappNumber}
                  </span>
                </div>
              </a>

              <div className="p-3.5 rounded-2xl bg-surface border border-surfaceBorder flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-500 block font-semibold">Customer Support Email</span>
                  <span className="text-xs font-bold text-slate-900 font-mono">
                    {BUSINESS_SETTINGS.email}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-surface border border-surfaceBorder flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-500 block font-semibold">Dubai Headquarters</span>
                  <span className="text-xs font-bold text-slate-900">
                    {BUSINESS_SETTINGS.address}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="clean-card p-8 rounded-3xl bg-white space-y-6">
            <div>
              <h2 className="text-xl font-heading font-extrabold text-slate-900">
                Send an Online Inquiry
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Fill in the form below and an engineer will contact you within 15 minutes.
              </p>
            </div>

            <form action="/api/leads" method="POST" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    placeholder="Your Name"
                    className="w-full bg-surface border border-surfaceBorder rounded-xl p-2.5 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number (+971) *</label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    placeholder="+971 50 123 4567"
                    className="w-full bg-surface border border-surfaceBorder rounded-xl p-2.5 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    name="email"
                    placeholder="name@domain.ae"
                    className="w-full bg-surface border border-surfaceBorder rounded-xl p-2.5 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Property Location *</label>
                  <input
                    type="text"
                    required
                    name="neighborhood"
                    placeholder="e.g. Dubai Marina / Palm Jumeirah"
                    className="w-full bg-surface border border-surfaceBorder rounded-xl p-2.5 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Message / Service Details</label>
                <textarea
                  rows={4}
                  name="message"
                  placeholder="Describe your maintenance requirement..."
                  className="w-full bg-surface border border-surfaceBorder rounded-xl p-2.5 text-xs text-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs shadow-card transition"
              >
                Submit Inquiry & Request Callback
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
