"use client";

import React, { useState } from "react";
import { Phone, MessageSquare, Zap, X } from "lucide-react";
import { Analytics } from "@/lib/analytics";
import { BUSINESS_SETTINGS } from "@/lib/data";

interface EmergencyBannerProps {
  onOpenQuoteModal: () => void;
}

export const EmergencyCallbackBanner: React.FC<EmergencyBannerProps> = ({ onOpenQuoteModal }) => {
  const [minimized, setMinimized] = useState(false);

  const handleCall = () => {
    Analytics.trackEmergencyDispatch("UAE Hotlines", 25);
    window.location.href = `tel:${BUSINESS_SETTINGS.phone.replace(/[^0-9+]/g, "")}`;
  };

  const handleWhatsApp = () => {
    Analytics.trackWhatsAppClick("Emergency Floating Banner", "UAE Rapid Response");
    window.open(
      `https://wa.me/${BUSINESS_SETTINGS.whatsappNumber}?text=EMERGENCY%3A%20I%20need%20urgent%20technician%20dispatch%20immediately%20in%20UAE`,
      "_blank"
    );
  };

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="fixed bottom-6 left-6 z-40 px-4 py-3 rounded-full bg-red-600 text-white font-bold text-xs shadow-2xl flex items-center gap-2 hover:bg-red-700 transition animate-bounce"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
        <Zap className="w-4 h-4" />
        <span>24/7 Emergency Dispatch</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 left-4 sm:left-6 z-40 max-w-md w-[calc(100%-2rem)] sm:w-auto animate-in slide-in-from-bottom-5">
      <div className="rounded-2xl bg-white border-2 border-red-500 p-4 shadow-elevated">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-100 border border-red-200 flex items-center justify-center text-red-600 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  24/7 Urgent Breakdown?
                </span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <p className="text-[11px] text-slate-600">
                Rapid technician arrival in <strong className="text-emerald-700 font-bold">&lt; 30 mins</strong> across UAE
              </p>
            </div>
          </div>
          <button
            onClick={() => setMinimized(true)}
            className="text-slate-400 hover:text-slate-700 transition text-xs p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={handleCall}
            className="py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Hotline</span>
          </button>

          <button
            onClick={handleWhatsApp}
            className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
