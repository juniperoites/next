"use client";

import React from "react";
import { AMCPackageData } from "@/lib/types";
import { AMCComparisonTable } from "@/components/AMCComparisonTable";
import { useModal } from "@/components/AppShell";
import { ShieldCheck } from "lucide-react";

interface AMCProps {
  packages: AMCPackageData[];
}

export const AMCPageClient: React.FC<AMCProps> = ({ packages }) => {
  const { openQuoteModal } = useModal();

  return (
    <div className="min-h-screen bg-surface pb-20">
      <section className="py-14 bg-white border-b border-surfaceBorder text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-brand-700 border border-blue-200 text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>365-Day Complete Property Protection</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 tracking-tight">
            Annual Maintenance Contracts (AMC)
          </h1>
          <p className="mt-4 text-slate-600 text-base">
            Choose the right maintenance contract for your villa or apartment with guaranteed 24/7 priority emergency response.
          </p>
        </div>
      </section>

      <AMCComparisonTable packages={packages} onSelectPackage={(tier) => openQuoteModal(tier)} />
    </div>
  );
};
