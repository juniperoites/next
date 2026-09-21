"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Sparkles,
  CheckCircle,
  Calculator,
  ArrowRight,
  ArrowLeft,
  Phone,
  User,
  MapPin,
  Clock,
  ShieldCheck,
  Building,
  Home,
  Fan,
  Droplets,
  Zap,
  Hammer,
  Paintbrush,
  Shield,
  Check,
} from "lucide-react";
import { Analytics } from "@/lib/analytics";
import confetti from "canvas-confetti";

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceSlug?: string;
}

const PRIMARY_SERVICES = [
  {
    slug: "ac-repair",
    name: "AC Repair & Cooling",
    basePrice: 180,
    icon: Fan,
    color: "text-blue-600 bg-blue-50 border-blue-200",
  },
  {
    slug: "emergency-plumbing-repair",
    name: "Plumbing & Leaks",
    basePrice: 199,
    icon: Droplets,
    color: "text-cyan-600 bg-cyan-50 border-cyan-200",
  },
  {
    slug: "electrical-repair-troubleshooting",
    name: "Electrical & Breaker",
    basePrice: 175,
    icon: Zap,
    color: "text-amber-600 bg-amber-50 border-amber-200",
  },
  {
    slug: "handyman-carpentry-assembly",
    name: "Handyman & Carpentry",
    basePrice: 150,
    icon: Hammer,
    color: "text-slate-700 bg-slate-100 border-slate-200",
  },
  {
    slug: "interior-exterior-villa-painting",
    name: "Villa Painting (Jotun)",
    basePrice: 450,
    icon: Paintbrush,
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
  },
  {
    slug: "amc-packages",
    name: "365-Day AMC Contract",
    basePrice: 349,
    icon: Shield,
    color: "text-purple-600 bg-purple-50 border-purple-200",
  },
];

const DUBAI_AREAS = [
  "Dubai Marina & JBR",
  "Palm Jumeirah",
  "Downtown Dubai & Business Bay",
  "Jumeirah Village Circle (JVC)",
  "Arabian Ranches & Damac Hills",
  "Dubai Hills Estate & Meydan",
  "Al Barsha & Tecom",
  "Mirdif & Silicon Oasis",
];

const ABU_DHABI_AREAS = [
  "Yas Island",
  "Saadiyat Island",
  "Al Reem Island",
  "Corniche & Downtown",
  "Khalifa City",
  "Al Raha Beach",
];

export const CostCalculatorModal: React.FC<CalculatorModalProps> = ({
  isOpen,
  onClose,
  initialServiceSlug,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedService, setSelectedService] = useState<string>("ac-repair");
  const [propertyType, setPropertyType] = useState<"Apartment" | "Villa" | "Commercial">("Villa");
  const [urgency, setUrgency] = useState<"EMERGENCY" | "STANDARD">("EMERGENCY");
  const [city, setCity] = useState<"Dubai" | "Abu Dhabi" | "Sharjah">("Dubai");
  const [neighborhood, setNeighborhood] = useState("Dubai Marina & JBR");

  // Contact Info
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState("");

  useEffect(() => {
    if (initialServiceSlug) {
      const match = PRIMARY_SERVICES.find((s) => s.slug === initialServiceSlug);
      if (match) setSelectedService(match.slug);
      else setSelectedService("ac-repair");
    }
  }, [initialServiceSlug]);

  useEffect(() => {
    if (city === "Dubai") setNeighborhood(DUBAI_AREAS[0]);
    else if (city === "Abu Dhabi") setNeighborhood(ABU_DHABI_AREAS[0]);
    else setNeighborhood("Al Majaz & Al Nahda");
  }, [city]);

  if (!isOpen) return null;

  // Calculate Price
  const currentServiceObj =
    PRIMARY_SERVICES.find((s) => s.slug === selectedService) || PRIMARY_SERVICES[0];

  let multiplier = 1.0;
  if (propertyType === "Villa") multiplier = 1.35;
  if (propertyType === "Commercial") multiplier = 1.6;

  let calculatedAED = Math.round(currentServiceObj.basePrice * multiplier);
  if (urgency === "EMERGENCY") {
    calculatedAED += 50; // Priority dispatch SLA
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || phone.length < 7) {
      alert("Please enter your name and UAE phone number");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          email: `${fullName.toLowerCase().replace(/\s+/g, ".")}@client.ae`,
          city,
          neighborhood,
          propertyType: propertyType === "Villa" ? "Villa / Townhouse" : propertyType,
          serviceSlug: selectedService,
          urgency: urgency === "EMERGENCY" ? "EMERGENCY_NOW" : "SCHEDULED",
          estimatedAED: calculatedAED,
          message: `Booking Request: ${currentServiceObj.name} for ${propertyType} in ${neighborhood}, ${city}. Estimated AED ${calculatedAED}`,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSubmittedLeadId(data.lead?.id || `lead-${Date.now()}`);
        setIsSuccess(true);
        Analytics.trackQuoteSubmit({
          service: currentServiceObj.name,
          location: `${neighborhood}, ${city}`,
          estimatedAED: calculatedAED,
          urgency: urgency === "EMERGENCY" ? "EMERGENCY_NOW" : "SCHEDULED",
        });

        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#2563eb", "#10b981", "#d97706", "#0f172a"],
          });
        } catch {}
      }
    } catch {
      alert("Failed to send booking. Please call our hotline +971 4 399 8877");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-white border border-surfaceBorder shadow-2xl overflow-hidden my-6">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-surfaceBorder bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-xs">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-slate-900 text-base">
                Quick Price Estimate & Booking
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                DEWA-Certified Engineers • 90-Day Warranty
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-xl bg-white border border-surfaceBorder text-slate-400 hover:text-slate-800 flex items-center justify-center transition shadow-xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Bar */}
        {!isSuccess && (
          <div className="px-6 pt-4 pb-2 bg-white flex items-center justify-between border-b border-surfaceBorder/60">
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                  step === 1 ? "bg-brand-600 text-white" : "bg-emerald-100 text-emerald-800"
                }`}
              >
                {step === 1 ? "1" : "✓"}
              </span>
              <span className={`text-xs font-bold ${step === 1 ? "text-slate-900" : "text-slate-500"}`}>
                Service & Property
              </span>
            </div>

            <div className="h-0.5 w-12 bg-slate-200" />

            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                  step === 2 ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-400"
                }`}
              >
                2
              </span>
              <span className={`text-xs font-bold ${step === 2 ? "text-slate-900" : "text-slate-400"}`}>
                Location & Booking
              </span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 bg-white">
          {isSuccess ? (
            /* Success Screen */
            <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-heading font-extrabold text-2xl text-slate-900">
                  Technician Request Dispatched!
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you, <strong className="text-slate-900">{fullName}</strong>. Our control room has assigned a master technician to your property.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface border border-surfaceBorder text-xs text-left space-y-2 max-w-sm mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Service:</span>
                  <span className="font-bold text-slate-900">{currentServiceObj.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Location:</span>
                  <span className="font-bold text-slate-900">{neighborhood}, {city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Estimated Price:</span>
                  <span className="font-extrabold text-emerald-700 text-sm font-heading">
                    AED {calculatedAED}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Response SLA:</span>
                  <span className="font-bold text-emerald-700">
                    {urgency === "EMERGENCY" ? "< 25 Mins Rapid Arrival" : "Within 24 Hours"}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleResetAndClose}
                  className="px-7 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* STEP 1: Select Service & Property Type */}
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in-50">
                  {/* Service Selection */}
                  <div>
                    <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-2.5">
                      1. Select Service
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {PRIMARY_SERVICES.map((s) => {
                        const Icon = s.icon;
                        const isSelected = selectedService === s.slug;
                        return (
                          <button
                            key={s.slug}
                            type="button"
                            onClick={() => setSelectedService(s.slug)}
                            className={`p-3 rounded-2xl border text-left transition flex items-center gap-3 ${
                              isSelected
                                ? "border-brand-600 bg-brand-50/70 shadow-xs ring-1 ring-brand-600"
                                : "border-surfaceBorder bg-surface hover:bg-surfaceHover text-slate-700"
                            }`}
                          >
                            <div
                              className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${s.color}`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-bold text-slate-900 truncate">
                                {s.name}
                              </div>
                              <div className="text-[11px] font-extrabold text-slate-600 mt-0.5">
                                From AED {s.basePrice}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Property Type Selection */}
                  <div>
                    <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-2">
                      2. Property Type
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["Apartment", "Villa", "Commercial"] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setPropertyType(type)}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold transition text-center border ${
                            propertyType === type
                              ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                              : "bg-surface border-surfaceBorder text-slate-700 hover:bg-surfaceHover"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Live Estimated Price Strip & Next Button */}
                  <div className="pt-2 border-t border-surfaceBorder flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">
                        Estimated Starting Price
                      </div>
                      <div className="font-heading font-extrabold text-xl text-brand-700">
                        AED {calculatedAED}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
                    >
                      <span>Continue to Booking</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Location, Urgency & Contact Form */}
              {step === 2 && (
                <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in-50">
                  {/* City & Area */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Emirate / City
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value as any)}
                        className="w-full bg-surface border border-surfaceBorder text-slate-900 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-brand-500"
                      >
                        <option value="Dubai">Dubai</option>
                        <option value="Abu Dhabi">Abu Dhabi</option>
                        <option value="Sharjah">Sharjah</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Neighborhood / Area
                      </label>
                      <select
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        className="w-full bg-surface border border-surfaceBorder text-slate-900 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-brand-500"
                      >
                        {city === "Dubai" &&
                          DUBAI_AREAS.map((a) => (
                            <option key={a} value={a}>
                              {a}
                            </option>
                          ))}
                        {city === "Abu Dhabi" &&
                          ABU_DHABI_AREAS.map((a) => (
                            <option key={a} value={a}>
                              {a}
                            </option>
                          ))}
                        {city === "Sharjah" && (
                          <>
                            <option value="Al Majaz">Al Majaz</option>
                            <option value="Al Nahda">Al Nahda</option>
                            <option value="Al Taawun">Al Taawun</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  {/* Urgency SLA */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Arrival Priority
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setUrgency("EMERGENCY")}
                        className={`p-2.5 rounded-xl border text-left text-xs transition ${
                          urgency === "EMERGENCY"
                            ? "bg-red-50 border-red-300 text-red-900 font-bold"
                            : "bg-surface border-surfaceBorder text-slate-700 hover:bg-surfaceHover"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-bold text-red-700">
                          <span>🚨 Emergency Priority</span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">&lt; 25 Min Arrival SLA</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setUrgency("STANDARD")}
                        className={`p-2.5 rounded-xl border text-left text-xs transition ${
                          urgency === "STANDARD"
                            ? "bg-blue-50 border-brand-300 text-brand-900 font-bold"
                            : "bg-surface border-surfaceBorder text-slate-700 hover:bg-surfaceHover"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-bold text-slate-900">
                          <span>⚡ Standard Booking</span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">Flexible Appointment</div>
                      </button>
                    </div>
                  </div>

                  {/* Customer Contact */}
                  <div className="space-y-3 pt-1">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Your Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="e.g. Mohammed Al-Falasi"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-surface border border-surfaceBorder text-xs text-slate-900 font-medium focus:outline-none focus:border-brand-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        UAE Contact Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          placeholder="+971 50 123 4567"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-surface border border-surfaceBorder text-xs text-slate-900 font-medium font-mono focus:outline-none focus:border-brand-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Summary & Submit */}
                  <div className="p-3.5 rounded-2xl bg-surface border border-surfaceBorder flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-500">
                        {currentServiceObj.name} ({propertyType})
                      </div>
                      <div className="font-heading font-extrabold text-lg text-brand-700">
                        AED {calculatedAED} <span className="text-[10px] text-slate-400 font-normal">incl. VAT</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-3 py-2 rounded-xl bg-white border border-surfaceBorder text-slate-600 font-bold text-xs hover:bg-surfaceHover transition"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition disabled:opacity-50"
                      >
                        {isSubmitting ? "Dispatching..." : "Confirm & Dispatch"}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
