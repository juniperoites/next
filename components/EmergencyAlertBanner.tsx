"use client";

import React from "react";
import { Flame, Phone, ArrowRight } from "lucide-react";
import { BUSINESS_SETTINGS } from "@/lib/data";
import { Analytics } from "@/lib/analytics";

interface EmergencyAlertBannerProps {
  onOpenEmergencyModal?: () => void;
}

export const EmergencyAlertBanner: React.FC<EmergencyAlertBannerProps> = ({
  onOpenEmergencyModal,
}) => {
  const handleEmergencyCall = () => {
    Analytics.trackPhoneCallClick("Emergency Banner", "Dubai & Abu Dhabi");
    window.location.href = `tel:${(BUSINESS_SETTINGS.emergencyHotline || BUSINESS_SETTINGS.phone).replace(/[^0-9+]/g, "")}`;
  };

  return (
    <div className="bg-slate-950 text-white border-y border-slate-800 py-3 px-4 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
        {/* Alert Text */}
        <div className="flex items-center gap-2.5 text-center md:text-left flex-wrap justify-center">
          <div className="w-7 h-7 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0 animate-pulse">
            <Flame className="w-4 h-4 fill-red-400" />
          </div>
          <span className="font-heading font-extrabold text-white">
            AC Failure or Major Water Pipe Leak in Dubai/AD?
          </span>
          <span className="text-slate-400 hidden lg:inline">|</span>
          <span className="text-slate-300 text-xs">
            Al-Safwa Emergency Crews mobilized in under 25 minutes. Guaranteed rapid arrival across all UAE sectors.
          </span>
        </div>

        {/* Emergency CTA */}
        <button
          onClick={handleEmergencyCall}
          className="shrink-0 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95 text-slate-950 font-heading font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
        >
          <Phone className="w-3.5 h-3.5 animate-bounce" />
          <span>Call Emergency Dispatch</span>
        </button>
      </div>
    </div>
  );
};
