"use client";

import React, { useState, useRef, useCallback } from "react";
import { PortfolioItemData } from "@/lib/types";
import { Sparkles, ArrowLeftRight, CheckCircle2, Clock, MapPin } from "lucide-react";

interface BeforeAfterProps {
  portfolioItems: PortfolioItemData[];
}

export const BeforeAfterSlider: React.FC<BeforeAfterProps> = ({ portfolioItems }) => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeProject = portfolioItems[selectedProjectIndex] || portfolioItems[0];

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
    <section id="before-after" className="py-16 sm:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-brand-700 border border-blue-200 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Project Transformations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            Before & After Transformation Gallery
          </h2>
          <p className="mt-3 text-slate-600 text-sm">
            Drag the slider horizontally to inspect verified project restorations across Palm Jumeirah, Emirates Hills, and Downtown Dubai.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {portfolioItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedProjectIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                selectedProjectIndex === idx
                  ? "bg-brand-600 text-white shadow-sm"
                  : "bg-surface hover:bg-surfaceHover text-slate-700 border border-surfaceBorder"
              }`}
            >
              {item.title.split(" - ")[0]}
            </button>
          ))}
        </div>

        {/* Main Split-View Slider Card */}
        <div className="max-w-5xl mx-auto clean-card p-6 sm:p-8 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Slider (7 Columns) */}
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
              className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-card border border-surfaceBorder select-none cursor-ew-resize group"
            >
              {/* After Image */}
              <div className="absolute inset-0">
                <img
                  src={activeProject.afterImage}
                  alt={`${activeProject.title} After`}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 right-4 z-10 px-3 py-1 rounded-lg bg-emerald-600 text-white font-extrabold text-xs shadow-md">
                  AFTER / RESTORED
                </span>
              </div>

              {/* Before Image */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <img
                  src={activeProject.beforeImage}
                  alt={`${activeProject.title} Before`}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-lg bg-red-600 text-white font-extrabold text-xs shadow-md">
                  BEFORE / DAMAGED
                </span>
              </div>

              {/* Split Line & Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-900 border-2 border-white text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <ArrowLeftRight className="w-4 h-4" />
                </div>
              </div>
            </div>
            <div className="text-center mt-2.5 text-xs text-slate-500 flex items-center justify-center gap-1 font-medium">
              <ArrowLeftRight className="w-3.5 h-3.5" /> Drag handle left or right to compare
            </div>
          </div>

          {/* Project Details (5 Columns) */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-brand-700 font-bold mb-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{activeProject.locationName}</span>
              </div>
              <h3 className="text-xl font-heading font-extrabold text-slate-900 leading-snug">
                {activeProject.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeProject.description}
              </p>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-3 py-3 border-y border-surfaceBorder text-xs">
              <div>
                <span className="text-slate-400 block text-[11px] font-semibold">Property Type:</span>
                <span className="font-bold text-slate-800">{activeProject.clientType}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] font-semibold">Execution Time:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {activeProject.completionTime}
                </span>
              </div>
            </div>

            {/* Outcomes */}
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Key Performance Results:
              </div>
              {activeProject.resultsAchieved.map((result, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{result}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
