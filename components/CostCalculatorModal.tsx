"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles, CheckCircle, Calculator } from "lucide-react";
import { SERVICES, LOCATIONS } from "@/lib/data";
import { Analytics } from "@/lib/analytics";
import confetti from "canvas-confetti";

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceSlug?: string;
}

export const CostCalculatorModal: React.FC<CalculatorModalProps> = ({
  isOpen,
  onClose,
  initialServiceSlug,
}) => {
  const [propertyType, setPropertyType] = useState<"Apartment" | "Villa / Townhouse" | "Commercial" | "Penthouse">("Villa / Townhouse");
  const [acUnits, setAcUnits] = useState<number>(4);
  const [selectedServices, setSelectedServices] = useState<string[]>(
    initialServiceSlug ? [initialServiceSlug] : ["ac-repair"]
  );
  const [urgency, setUrgency] = useState<"EMERGENCY_NOW" | "WITHIN_24_HRS" | "SCHEDULED">("EMERGENCY_NOW");
  const [selectedCity, setSelectedCity] = useState("Dubai");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("Dubai Marina");

  // Contact form
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("+971 5");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState("");

  useEffect(() => {
    if (initialServiceSlug && !selectedServices.includes(initialServiceSlug)) {
      setSelectedServices((prev) => [...prev, initialServiceSlug]);
    }
  }, [initialServiceSlug]);

  if (!isOpen) return null;

  // Real-time dynamic AED calculation
  let basePrice = 0;
  let propertyMultiplier = 1.0;
  if (propertyType === "Villa / Townhouse") propertyMultiplier = 1.45;
  if (propertyType === "Penthouse") propertyMultiplier = 1.35;
  if (propertyType === "Commercial") propertyMultiplier = 1.8;

  const breakdown: { name: string; cost: number }[] = [];

  for (const slug of selectedServices) {
    const srv = SERVICES.find((s) => s.slug === slug);
    if (srv) {
      let cost = srv.basePriceAED * propertyMultiplier;
      if (slug === "ac-repair" || slug === "ac-duct-cleaning" || slug === "ac-maintenance") {
        cost = srv.basePriceAED + Math.max(0, acUnits - 1) * (srv.basePriceAED * 0.4);
      }
      const roundedCost = Math.round(cost);
      breakdown.push({ name: srv.name, cost: roundedCost });
      basePrice += roundedCost;
    }
  }

  if (urgency === "EMERGENCY_NOW") {
    breakdown.push({ name: "24/7 Priority Emergency Dispatch SLA (<30 Mins)", cost: 99 });
    basePrice += 99;
  }

  const estimatedTotalAED = Math.max(180, Math.round(basePrice));

  const toggleService = (slug: string) => {
    setSelectedServices((prev) =>
      prev.includes(slug) ? (prev.length > 1 ? prev.filter((s) => s !== slug) : prev) : [...prev, slug]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || phone.length < 9) {
      alert("Please enter a valid full name and UAE contact phone number (+971 5X XXX XXXX)");
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
          email: email || `${fullName.toLowerCase().replace(/\s+/g, ".")}@client.ae`,
          city: selectedCity,
          neighborhood: selectedNeighborhood,
          propertyType,
          serviceSlug: selectedServices[0],
          urgency,
          estimatedAED: estimatedTotalAED,
          message: `Interactive Quote calculated: AED ${estimatedTotalAED} for ${selectedServices.join(", ")} in ${selectedNeighborhood}`,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSubmittedLeadId(data.lead?.id || `lead-${Date.now()}`);
        setIsSuccess(true);
        Analytics.trackQuoteSubmit({
          service: selectedServices.join(", "),
          location: `${selectedNeighborhood}, ${selectedCity}`,
          estimatedAED: estimatedTotalAED,
          urgency,
        });

        // Trigger confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#2563eb", "#10b981", "#d97706", "#0f172a"],
          });
        } catch (err) {
          // ignore
        }
      }
    } catch (err) {
      alert("Error submitting request. Please call our hotline +971 4 399 8877");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white border border-surfaceBorder shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-surfaceBorder bg-surface flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-brand-600">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-heading font-extrabold text-slate-900">
                Instant AED Cost Calculator & Booking
              </h3>
              <p className="text-xs text-slate-500">
                Transparent UAE rates • Zero hidden callout fees
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white border border-surfaceBorder text-slate-400 hover:text-slate-700 flex items-center justify-center transition shadow-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-white">
          {isSuccess ? (
            <div className="text-center py-10 space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-heading font-extrabold text-slate-900">
                Booking Request Confirmed!
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you, <strong className="text-slate-900">{fullName}</strong>. Your inquiry (<span className="text-brand-700 font-mono text-xs">{submittedLeadId}</span>) has been routed to our Operations Control Room.
              </p>
              <div className="p-4 rounded-2xl bg-surface border border-surfaceBorder max-w-md mx-auto text-xs text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Assigned Hub:</span>
                  <span className="font-bold text-slate-900">{selectedNeighborhood}, {selectedCity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Estimated Total:</span>
                  <span className="font-extrabold text-emerald-700 font-heading text-sm">AED {estimatedTotalAED}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Arrival SLA:</span>
                  <span className="font-bold text-emerald-700">
                    {urgency === "EMERGENCY_NOW" ? "< 30 Minutes Guaranteed" : "Within 24 Hours"}
                  </span>
                </div>
              </div>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Property Type */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  1. Property Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(["Apartment", "Villa / Townhouse", "Commercial", "Penthouse"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setPropertyType(type)}
                      className={`p-3 rounded-xl text-xs font-bold transition flex items-center justify-center text-center ${
                        propertyType === type
                          ? "bg-brand-600 text-white shadow-sm"
                          : "bg-surface text-slate-700 border border-surfaceBorder hover:bg-surfaceHover"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Select Services */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  2. Select Required Services (Multi-Select)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-48 overflow-y-auto p-1">
                  {SERVICES.map((srv) => {
                    const isSelected = selectedServices.includes(srv.slug);
                    return (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => toggleService(srv.slug)}
                        className={`p-2.5 rounded-xl text-left text-xs transition border flex items-center justify-between ${
                          isSelected
                            ? "bg-blue-50 border-brand-500 text-brand-900 font-bold"
                            : "bg-surface border-surfaceBorder text-slate-700 hover:bg-surfaceHover"
                        }`}
                      >
                        <span className="truncate pr-2">{srv.name}</span>
                        <span className="text-[11px] font-bold text-slate-900 shrink-0">
                          +AED {srv.basePriceAED}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: AC Units & Priority */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    AC Units Count: {acUnits}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={acUnits}
                    onChange={(e) => setAcUnits(parseInt(e.target.value))}
                    className="w-full accent-brand-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>1 Unit</span>
                    <span>5 Units</span>
                    <span>10+ Units</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Priority Dispatch SLA
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as any)}
                    className="w-full bg-surface text-slate-900 border border-surfaceBorder rounded-xl p-2.5 text-xs font-bold focus:outline-none focus:border-brand-500"
                  >
                    <option value="EMERGENCY_NOW">🚨 Emergency Now (Arrival &lt;30 Mins)</option>
                    <option value="WITHIN_24_HRS">⚡ Standard (Within 24 Hours)</option>
                    <option value="SCHEDULED">📅 Scheduled Next Few Days</option>
                  </select>
                </div>
              </div>

              {/* Step 4: Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    City
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-surface text-slate-900 border border-surfaceBorder rounded-xl p-2.5 text-xs font-bold focus:outline-none focus:border-brand-500"
                  >
                    <option value="Dubai">Dubai</option>
                    <option value="Abu Dhabi">Abu Dhabi</option>
                    <option value="Sharjah">Sharjah</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Neighborhood
                  </label>
                  <select
                    value={selectedNeighborhood}
                    onChange={(e) => setSelectedNeighborhood(e.target.value)}
                    className="w-full bg-surface text-slate-900 border border-surfaceBorder rounded-xl p-2.5 text-xs font-bold focus:outline-none focus:border-brand-500"
                  >
                    {LOCATIONS.filter((l) => l.city.toLowerCase() === selectedCity.toLowerCase()).map((l) => (
                      <option key={l.id} value={l.neighborhood}>
                        {l.neighborhood}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Breakdown Box */}
              <div className="p-4 rounded-2xl bg-surface border border-surfaceBorder space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase border-b border-surfaceBorder pb-2">
                  <span>Transparent Rate Breakdown</span>
                  <span className="text-emerald-700 font-semibold">VAT Included</span>
                </div>
                {breakdown.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs text-slate-600">
                    <span>{item.name}</span>
                    <span className="font-bold text-slate-900 font-mono">AED {item.cost}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-surfaceBorder flex justify-between items-baseline">
                  <span className="text-sm font-bold text-slate-900">Estimated Total:</span>
                  <div className="text-right">
                    <span className="text-2xl font-heading font-extrabold text-brand-700">
                      AED {estimatedTotalAED}
                    </span>
                    <div className="text-[10px] text-slate-500">Includes 90-day parts warranty</div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 pt-1">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Customer Contact & Booking
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Full Name *"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full bg-surface text-slate-900 border border-surfaceBorder rounded-xl p-3 text-xs focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="UAE Phone (+971 5X XXX XXXX) *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full bg-surface text-slate-900 border border-surfaceBorder rounded-xl p-3 text-xs focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm tracking-wide shadow-card transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Dispatching to Operations...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Confirm Booking & Dispatch Technician (AED {estimatedTotalAED})</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
