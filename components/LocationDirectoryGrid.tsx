"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LocationData, ServiceData } from "@/lib/types";
import { MapPin, Clock, ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";

interface LocationGridProps {
  locations: LocationData[];
  services: ServiceData[];
}

export const LocationDirectoryGrid: React.FC<LocationGridProps> = ({ locations, services }) => {
  const [activeCity, setActiveCity] = useState<string>("Dubai");
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string>("ac-repair");

  const cities = ["Dubai", "Abu Dhabi", "Sharjah"];
  const currentCityLocations = locations.filter(
    (l) => l.city.toLowerCase() === activeCity.toLowerCase()
  );

  const currentService = services.find((s) => s.slug === selectedServiceSlug) || services[0];

  return (
    <section id="locations-grid" className="py-16 sm:py-20 bg-surface border-y border-surfaceBorder relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-brand-700 border border-blue-200 text-xs font-bold tracking-wider uppercase mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>UAE Coverage & Local Hubs</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
              Rapid Response Across UAE Neighborhoods
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-xl">
              Dedicated mobile squads stationed in prime residential and commercial communities across Dubai, Abu Dhabi, and Sharjah.
            </p>
          </div>

          {/* Service Selector */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="text-xs font-semibold text-slate-600">Select Service:</span>
            <select
              value={selectedServiceSlug}
              onChange={(e) => setSelectedServiceSlug(e.target.value)}
              className="bg-white text-slate-800 border border-surfaceBorder rounded-xl px-3.5 py-2 text-xs font-bold focus:outline-none focus:border-brand-500 shadow-subtle cursor-pointer"
            >
              {services.map((srv) => (
                <option key={srv.id} value={srv.slug}>
                  {srv.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* City Filter Tabs */}
        <div className="flex items-center gap-2 mb-8 border-b border-surfaceBorder pb-4">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setActiveCity(city)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                activeCity === city
                  ? "bg-brand-600 text-white shadow-sm"
                  : "bg-white hover:bg-surfaceHover text-slate-700 border border-surfaceBorder"
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>{city}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeCity === city ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"}`}>
                {locations.filter((l) => l.city.toLowerCase() === city.toLowerCase()).length}
              </span>
            </button>
          ))}
        </div>

        {/* Location Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentCityLocations.map((loc) => {
            const dynamicUrl = `/services/${selectedServiceSlug}/${loc.citySlug}/${loc.neighborhoodSlug}`;

            return (
              <Link
                key={loc.id}
                href={dynamicUrl}
                className="clean-card p-5 rounded-2xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold text-brand-700 bg-brand-50 border border-brand-200 px-2 py-0.5 rounded">
                      {loc.city}
                    </span>
                    {loc.isHighDemand && (
                      <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                        High Demand
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-heading font-bold text-slate-900 group-hover:text-brand-600 transition">
                    {loc.neighborhood}
                  </h3>
                  <div className="text-xs text-slate-500 mt-1">
                    {currentService?.name}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-surfaceBorder flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                    <Clock className="w-3.5 h-3.5 text-brand-600" />
                    <span>ETA: ~{loc.avgResponseMins} mins</span>
                  </div>

                  <div className="flex items-center gap-1 text-brand-600 font-bold group-hover:translate-x-1 transition-transform">
                    <span>Explore Page</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
