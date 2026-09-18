import React from "react";
import type { Metadata } from "next";
import { getTestimonials } from "@/lib/store";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { Star, ShieldCheck, CheckCircle2, ThumbsUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Client Reviews & Testimonials | Al-Safwa UAE",
  description: "Read verified customer reviews from luxury homeowners and property managers across Palm Jumeirah, Emirates Hills, and Saadiyat Island.",
};

export default async function ReviewsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="min-h-screen bg-surface pb-20">
      <section className="py-14 bg-white border-b border-surfaceBorder text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-brand-700 border border-blue-200 text-xs font-bold uppercase tracking-wider mb-4">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>4.9 / 5 Star Overall Rating</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 tracking-tight">
            Verified UAE Customer Testimonials
          </h1>
          <p className="mt-4 text-slate-600 text-base">
            Over 850+ verified reviews from residential villa owners, penthouse residents, and property managers.
          </p>
        </div>
      </section>

      <TestimonialsSection testimonials={testimonials} />
    </div>
  );
}
