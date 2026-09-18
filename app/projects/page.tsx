import React from "react";
import type { Metadata } from "next";
import { getPortfolioItems } from "@/lib/store";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Sparkles, MapPin, Clock, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Projects & Portfolio | Al-Safwa Technical Services UAE",
  description: "View verified before and after project transformations across Palm Jumeirah, Emirates Hills, and Downtown Dubai.",
};

export default async function ProjectsPage() {
  const portfolioItems = await getPortfolioItems();

  return (
    <div className="min-h-screen bg-surface pb-20">
      <section className="py-14 bg-white border-b border-surfaceBorder text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-brand-700 border border-blue-200 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified UAE Project Case Studies</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 tracking-tight">
            Our Projects & Transformations
          </h1>
          <p className="mt-4 text-slate-600 text-base">
            Explore high-end residential and commercial technical maintenance projects completed across the UAE.
          </p>
        </div>
      </section>

      {/* Interactive Slider */}
      <BeforeAfterSlider portfolioItems={portfolioItems} />

      {/* Projects List Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6">
        <h2 className="text-2xl font-heading font-extrabold text-slate-900 mb-6">
          Recent Completed Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <div key={item.id} className="clean-card rounded-3xl overflow-hidden bg-white flex flex-col justify-between">
              <img src={item.afterImage} alt={item.title} className="h-48 w-full object-cover" />
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-700 mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.locationName}</span>
                  </div>
                  <h3 className="font-heading font-bold text-slate-900 text-base leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-3">{item.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-surfaceBorder flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-semibold">{item.clientType}</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {item.completionTime}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
