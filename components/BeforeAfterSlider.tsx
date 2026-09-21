"use client";

import React, { useState, useRef, useCallback } from "react";
import { PortfolioItemData } from "@/lib/types";
import { Sparkles, ArrowLeftRight, CheckCircle2, Clock, MapPin, ArrowRight } from "lucide-react";
import { useModal } from "./AppShell";

interface BeforeAfterProps {
  portfolioItems?: PortfolioItemData[];
}

const DEFAULT_PROJECTS: PortfolioItemData[] = [
  {
    id: "port-1",
    title: "AC Coil Chemical Decontamination & Airflow Boost",
    slug: "ac-coil-decontamination",
    categorySlug: "ac-services",
    locationName: "Palm Jumeirah Signature Villa",
    beforeImage: "/images/ac_coil_before.jpg",
    afterImage: "/images/ac_coil_after.jpg",
    completionTime: "2 Hours Turnaround",
    clientType: "6-Bedroom Beachfront Villa",
    description: "Eliminated severe humidity-induced bio-film and clogged evaporator coils. Restored airflow velocity by 40% and balanced indoor temperature across all suites.",
    resultsAchieved: [
      "Sub-20°C icy cooling restored during 48°C peak desert summer",
      "Airborne particulate matter (PM2.5) reduced by 94%",
      "22% monthly reduction in DEWA power bills",
    ],
  },
  {
    id: "port-2",
    title: "Distribution Board (DB) Rewiring & DEWA Safety Overhaul",
    slug: "db-rewiring-safety",
    categorySlug: "electrical",
    locationName: "Downtown Dubai Penthouse",
    beforeImage: "/images/db_box_before.jpg",
    afterImage: "/images/db_box_after.jpg",
    completionTime: "4 Hours Execution",
    clientType: "Duplex High-Rise Residence",
    description: "Resolved recurring nuisance breaker tripping under heavy kitchen and AC loads. Upgraded main isolators, surge suppressors, and certified cabling.",
    resultsAchieved: [
      "Zero circuit tripping after heavy appliance simultaneous usage",
      "Official DEWA compliance and thermal test certification",
      "Surge protection installed for sensitive smart TVs & audio servers",
    ],
  },
  {
    id: "port-3",
    title: "Luxury Interior Wall Repainting & Surface Leveling",
    slug: "villa-interior-repainting",
    categorySlug: "painting-waterproofing",
    locationName: "Arabian Ranches Luxury Villa",
    beforeImage: "/images/villa_paint_before.jpg",
    afterImage: "/images/villa_paint_after.jpg",
    completionTime: "2 Days Turnaround",
    clientType: "Standalone 5-Bed Family Villa",
    description: "Surface plaster restoration, hairline crack bridging, and Jotun Fenomastic zero-odor luxury paint application with laser-guided edge lines.",
    resultsAchieved: [
      "100% spotless, streak-free matte velvet finish",
      "Zero lingering chemical odors with ultra-low VOC formulation",
      "Complete furniture masking and spotless post-job cleanup",
    ],
  },
  {
    id: "port-4",
    title: "Central Water Heater Replacement & Acoustic Leak Seal",
    slug: "water-heater-replacement",
    categorySlug: "plumbing",
    locationName: "Dubai Hills Estate Villa",
    beforeImage: "/images/water_heater_before.jpg",
    afterImage: "/images/water_heater_after.jpg",
    completionTime: "90 Minutes Arrival & Fix",
    clientType: "Contemporary Townhouse",
    description: "Emergency replacement of corroded tank unit with high-efficiency Italian Ariston system, pressure relief valves, and reinforced braided flex hoses.",
    resultsAchieved: [
      "Zero ceiling water staining or secondary structural damage",
      "Safety pressure valves calibrated to official municipality specs",
      "5-Year manufacturer warranty card issued on-site",
    ],
  },
];

export const BeforeAfterSlider: React.FC<BeforeAfterProps> = ({ portfolioItems }) => {
  const { openQuoteModal } = useModal();
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = portfolioItems && portfolioItems.length > 0 ? portfolioItems : DEFAULT_PROJECTS;
  const activeProject = projects[selectedProjectIndex] || projects[0];

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section id="before-after" className="py-16 sm:py-24 bg-white relative overflow-hidden border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-amber-400 border border-slate-800 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive On-Site Transformations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-950 tracking-tight">
            Before &amp; After Transformation Gallery
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Drag the interactive slider horizontally to inspect verified project restorations across Palm Jumeirah, Emirates Hills, and Downtown Dubai.
          </p>
        </div>

        {/* Project Category Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {projects.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedProjectIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-heading font-bold transition-all shadow-xs ${
                selectedProjectIndex === idx
                  ? "bg-slate-950 text-amber-400 shadow-md scale-105"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/90"
              }`}
            >
              {item.title.split(" & ")[0]}
            </button>
          ))}
        </div>

        {/* Main Split-View Slider Container */}
        <div className="max-w-5xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Slider Visual (7 Columns) */}
          <div className="lg:col-span-7">
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              onTouchMove={handleTouchMove}
              className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white select-none cursor-ew-resize group bg-slate-900"
            >
              {/* After Image (Full Background) */}
              <div className="absolute inset-0">
                <img
                  src={activeProject.afterImage}
                  alt={`${activeProject.title} After Restoration`}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-heading font-extrabold text-xs shadow-md tracking-wider">
                  AFTER / RESTORED ✓
                </span>
              </div>

              {/* Before Image (Clipped Left Layer) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <img
                  src={activeProject.beforeImage}
                  alt={`${activeProject.title} Before Repair`}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-xl bg-red-600 text-white font-heading font-extrabold text-xs shadow-md tracking-wider">
                  BEFORE / DAMAGED ✕
                </span>
              </div>

              {/* Draggable Vertical Split Line & Knob */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_12px_rgba(0,0,0,0.7)]"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-slate-950 border-2 border-amber-400 text-amber-400 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <ArrowLeftRight className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="text-center mt-3 text-xs text-slate-500 flex items-center justify-center gap-1.5 font-medium">
              <ArrowLeftRight className="w-4 h-4 text-amber-500" />
              <span>Drag handle left or right to compare transformation</span>
            </div>
          </div>

          {/* Project Details & Performance Results (5 Columns) */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-brand-600 font-heading font-extrabold mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>{activeProject.locationName}</span>
              </div>
              <h3 className="text-xl font-heading font-extrabold text-slate-950 leading-snug">
                {activeProject.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeProject.description}
              </p>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-200/80 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px] font-semibold">Property Type:</span>
                <span className="font-bold text-slate-900">{activeProject.clientType}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] font-semibold">Execution Time:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {activeProject.completionTime}
                </span>
              </div>
            </div>

            {/* Key Verified Results */}
            <div className="space-y-2">
              <div className="text-xs font-heading font-extrabold text-slate-900 uppercase tracking-wider">
                Key Performance Results:
              </div>
              {activeProject.resultsAchieved.map((result, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{result}</span>
                </div>
              ))}
            </div>

            {/* Book Transformation CTA */}
            <div className="pt-3">
              <button
                onClick={() => openQuoteModal()}
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-heading font-extrabold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <span>Book Similar Service</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
