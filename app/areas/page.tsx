import React from "react";
import type { Metadata } from "next";
import { getLocations, getServices } from "@/lib/store";
import { LocationDirectoryGrid } from "@/components/LocationDirectoryGrid";
import { MapPin, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Service Areas Across Dubai, Abu Dhabi & Sharjah | Al-Safwa UAE",
  description: "Explore our technical maintenance coverage across 500+ UAE neighborhoods including Dubai Marina, Palm Jumeirah, JVC, Downtown, and Yas Island.",
};

export default async function ServiceAreasPage() {
  const [locations, services] = await Promise.all([getLocations(), getServices()]);

  return (
    <div className="min-h-screen bg-surface pb-20">
      <section className="py-14 bg-white border-b border-surfaceBorder text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-brand-700 border border-blue-200 text-xs font-bold uppercase tracking-wider mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>UAE Wide Coverage</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 tracking-tight">
            Our UAE Service Areas
          </h1>
          <p className="mt-4 text-slate-600 text-base">
            Dedicated mobile response teams stationed in every major residential and commercial community with guaranteed rapid emergency SLAs.
          </p>
        </div>
      </section>

      <LocationDirectoryGrid locations={locations} services={services} />
    </div>
  );
}
