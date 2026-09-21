"use client";

import React from "react";
import { TestimonialData } from "@/lib/types";
import { Star, ShieldCheck, MapPin, Sparkles } from "lucide-react";

interface TestimonialsProps {
  testimonials?: TestimonialData[];
}

const DEFAULT_REVIEWS = [
  {
    id: "rev-1",
    name: "Alexander M.",
    role: "Villa Owner",
    location: "Dubai Hills Estate",
    service: "AC Repair & Coil Clean",
    rating: 5,
    text: "Our master bedroom AC unit shut down completely on a Friday afternoon in August. City-wide emergency arrival in 25 minutes, identified a blown capacitor, replaced it with an OEM part, and the system was ice-cold in under 45 minutes total.",
    avatar: "AM",
  },
  {
    id: "rev-2",
    name: "Fatima Al-Mansoor",
    role: "Penthouse Resident",
    location: "Palm Jumeirah",
    service: "DB Tripping & Electrical",
    rating: 5,
    text: "I called after experiencing continuous breaker tripping. Their lead engineer arrived with full PPE and advanced diagnostic kit, traced the earth fault in minutes, and repaired the distribution board cleanly. Absolutely top-tier service.",
    avatar: "FA",
  },
  {
    id: "rev-3",
    name: "Tariq Al-Qasimi",
    role: "Property Asset Manager",
    location: "Downtown Dubai",
    service: "Executive Villa AMC",
    rating: 5,
    text: "I manage 14 luxury units in Downtown and Marina. Al-Safwa handles all emergency callouts, scheduled filter cleans, and rapid leak repairs. Their digital reports and fast response have made our tenants happy and operations effortless.",
    avatar: "TQ",
  },
];

export const TestimonialsSection: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const reviewsToDisplay = testimonials && testimonials.length > 0 ? testimonials : DEFAULT_REVIEWS;

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-white relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Google Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-amber-400 border border-slate-800 text-xs font-bold uppercase tracking-wider mb-2.5">
              <span>Client Experiences</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-950 tracking-tight">
              Endorsed by Over 2,450 UAE Property Owners
            </h2>
          </div>

          {/* Google 4.9 Rating Badge */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/90 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-heading font-extrabold text-brand-600 text-lg shadow-xs">
              G
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                ))}
                <span className="font-heading font-extrabold text-slate-900 text-xs ml-1">
                  4.9 / 5.0
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                On Verified Google Reviews &amp; TrustIndex
              </div>
            </div>
          </div>
        </div>

        {/* 3 Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsToDisplay.slice(0, 3).map((item, idx) => {
            const author = "authorName" in item ? (item as any).authorName : (item as any).name;
            const reviewText = "reviewText" in item ? (item as any).reviewText : (item as any).text;
            const location = "neighborhood" in item ? `${(item as any).neighborhood}, ${(item as any).city}` : (item as any).location;
            const serviceName = "serviceName" in item ? (item as any).serviceName : (item as any).service;
            const initials = author.split(" ").map((n: string) => n[0]).join("").substring(0, 2);

            return (
              <div
                key={idx}
                className="rounded-3xl p-7 bg-slate-50 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars & Verified Pill */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <span className="flex items-center gap-1 text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3" /> Verified Client
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    &ldquo;{reviewText}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="mt-6 pt-5 border-t border-slate-200/80 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-amber-400 font-heading font-extrabold text-xs flex items-center justify-center shrink-0">
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-heading font-bold text-sm text-slate-900 truncate">
                      {author}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {location} • {serviceName}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
