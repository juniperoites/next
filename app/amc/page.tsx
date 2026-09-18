import React from "react";
import type { Metadata } from "next";
import { getAMCPackages } from "@/lib/store";
import { AMCPageClient } from "@/components/AMCPageClient";

export const metadata: Metadata = {
  title: "Annual Maintenance Contracts (AMC) Dubai & UAE | Villa Protection",
  description: "365-Day comprehensive villa and apartment maintenance contracts with unlimited 24/7 emergency callouts, preventative AC visits, and free parts credit.",
};

export default async function AMCPage() {
  const packages = await getAMCPackages();

  return <AMCPageClient packages={packages} />;
}
