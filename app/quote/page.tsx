import React from "react";
import type { Metadata } from "next";
import { getServices, getLocations } from "@/lib/store";
import { QuoteCalculatorPageClient } from "@/components/QuoteCalculatorPageClient";

export const metadata: Metadata = {
  title: "Request a Quote & Instant Price Calculator | Al-Safwa UAE",
  description: "Calculate instant transparent repair and maintenance prices in AED for UAE villas and apartments. Instant online booking.",
};

export default async function QuotePage() {
  const [services, locations] = await Promise.all([getServices(), getLocations()]);

  return <QuoteCalculatorPageClient services={services} locations={locations} />;
}
