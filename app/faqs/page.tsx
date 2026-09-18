import React from "react";
import type { Metadata } from "next";
import { HelpCircle, ChevronDown, Phone, MessageSquare } from "lucide-react";
import { BUSINESS_SETTINGS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQs) | Al-Safwa UAE",
  description: "Find answers to common questions about UAE technical services, AC repair warranties, emergency response times, and AMC maintenance contracts.",
};

const FAQS_LIST = [
  {
    category: "Emergency & Response Times",
    questions: [
      {
        q: "How fast can an emergency technician reach my property in Dubai?",
        a: "We maintain dedicated mobile response squads stationed in key hubs (Dubai Marina, JVC, Downtown, Palm Jumeirah, and Arabian Ranches), guaranteeing arrival within 25 to 35 minutes 24/7.",
      },
      {
        q: "Do you charge extra callout fees for night or weekend emergency repairs?",
        a: "No hidden callout charges. Our emergency tariffs are transparently stated before our dispatch team deploys.",
      },
    ],
  },
  {
    category: "AC & HVAC Maintenance",
    questions: [
      {
        q: "Why is my AC blowing warm air in Dubai?",
        a: "Warm air is typically caused by a failed start capacitor, low refrigerant due to micro-leaks, dirty condenser coils clogged with desert dust, or a faulty thermostat. Our technicians can diagnose and rectify this within 45 minutes on-site.",
      },
      {
        q: "How often should I clean my AC ducts in UAE villas?",
        a: "Due to high desert humidity and sand particulates, Dubai Municipality and HVAC health standards recommend deep duct cleaning and anti-bacterial sanitization every 12 to 18 months.",
      },
    ],
  },
  {
    category: "Licensing & Warranties",
    questions: [
      {
        q: "Are your technicians DEWA and Municipality certified?",
        a: "Yes, all our engineers and electricians are licensed by DEWA and certified by Dubai Municipality for residential and commercial works.",
      },
      {
        q: "What warranty do you offer on repair works?",
        a: "All mechanical, electrical, and plumbing repairs include a comprehensive 90-day parts and workmanship warranty.",
      },
    ],
  },
  {
    category: "Annual Maintenance Contracts (AMC)",
    questions: [
      {
        q: "What is included in the Gold Villa Care AMC?",
        a: "The Gold Villa Care plan includes 4 comprehensive quarterly preventative visits covering HVAC, plumbing, and electrical systems, UNLIMITED 24/7 emergency callouts with 30-min priority SLA, free AC duct sanitization, water tank cleaning, and AED 600 in complimentary spare parts.",
      },
    ],
  },
];

export default function FAQsPage() {
  return (
    <div className="min-h-screen bg-surface pb-20">
      <section className="py-14 bg-white border-b border-surfaceBorder text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-brand-700 border border-blue-200 text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help & Knowledge Center</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-slate-600 text-base">
            Everything you need to know about our technical services, pricing, response times, and AMC packages.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-10 space-y-10">
        {FAQS_LIST.map((group, idx) => (
          <div key={idx} className="space-y-4">
            <h2 className="text-lg font-heading font-extrabold text-slate-900 border-b border-surfaceBorder pb-2">
              {group.category}
            </h2>

            <div className="space-y-3">
              {group.questions.map((faq, qIdx) => (
                <div key={qIdx} className="clean-card rounded-2xl p-5 bg-white">
                  <h3 className="font-heading font-bold text-slate-900 text-sm">
                    {faq.q}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Still have questions banner */}
        <div className="clean-card p-8 rounded-3xl bg-white text-center space-y-4">
          <h3 className="text-xl font-heading font-extrabold text-slate-900">
            Still Have Questions?
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Our customer support and engineering dispatch team is available 24/7 on WhatsApp or toll-free hotline.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <a
              href={`https://wa.me/${BUSINESS_SETTINGS.whatsappNumber}?text=Hello%20Al-Safwa%2C%20I%20have%20a%20question`}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm"
            >
              Ask on WhatsApp
            </a>
            <a
              href={`tel:${BUSINESS_SETTINGS.phone.replace(/[^0-9+]/g, "")}`}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm"
            >
              Call {BUSINESS_SETTINGS.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
