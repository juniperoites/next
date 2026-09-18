"use client";

import React from "react";
import { TestimonialData } from "@/lib/types";
import { Star, ShieldCheck, MapPin, Sparkles } from "lucide-react";

interface TestimonialsProps {
  testimonials: TestimonialData[];
}

export const TestimonialsSection: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <section id="testimonials" className="py-16 sm:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-brand-700 border border-blue-200 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified UAE Client Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            Trusted by Royal Estates & Homeowners
          </h2>
          <p className="mt-3 text-slate-600 text-sm">
            Read real feedback from villa owners, penthouse residents, and property managers in Palm Jumeirah, Emirates Hills, and Saadiyat Island.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="clean-card rounded-3xl p-7 flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars & Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>

                  {test.verifiedPurchase && (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <ShieldCheck className="w-3 h-3" /> Verified Client
                    </span>
                  )}
                </div>

                <p className="text-slate-700 text-sm leading-relaxed italic">
                  "{test.reviewText}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-surfaceBorder flex items-center justify-between">
                <div>
                  <div className="font-heading font-bold text-slate-900 text-base">
                    {test.authorName}
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-600" />
                    <span>{test.neighborhood}, {test.city}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                    {test.serviceName.split(" & ")[0]}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">{test.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
