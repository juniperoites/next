import { NextRequest, NextResponse } from "next/server";
import { getServices } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const { propertyType, bedrooms, acUnits, selectedServiceSlugs, emergencySurge } = await req.json();

    const services = await getServices();
    let baseTotal = 0;
    const breakdown: { item: string; costAED: number }[] = [];

    // Base property scale factor
    let propertyMultiplier = 1.0;
    if (propertyType === "Villa / Townhouse") propertyMultiplier = 1.45;
    if (propertyType === "Penthouse") propertyMultiplier = 1.3;
    if (propertyType === "Commercial") propertyMultiplier = 1.8;

    // Calculate selected services
    if (Array.isArray(selectedServiceSlugs) && selectedServiceSlugs.length > 0) {
      for (const slug of selectedServiceSlugs) {
        const found = services.find((s) => s.slug === slug);
        if (found) {
          let itemCost = found.basePriceAED * propertyMultiplier;
          if (slug === "ac-repair" || slug === "ac-duct-cleaning") {
            const units = Math.max(1, acUnits || 1);
            itemCost = found.basePriceAED + (units - 1) * (found.basePriceAED * 0.4);
          }
          breakdown.push({ item: found.name, costAED: Math.round(itemCost) });
          baseTotal += itemCost;
        }
      }
    } else {
      // Default basic comprehensive tune-up
      baseTotal = 250 * propertyMultiplier;
      breakdown.push({ item: "Comprehensive Multi-Point MEP Inspection", costAED: Math.round(baseTotal) });
    }

    // Emergency Surge if urgent
    if (emergencySurge) {
      const surgeFee = 99;
      breakdown.push({ item: "24/7 Priority Emergency Dispatch SLA (<30 Mins)", costAED: surgeFee });
      baseTotal += surgeFee;
    }

    const estimatedAED = Math.max(150, Math.round(baseTotal));

    return NextResponse.json({
      success: true,
      estimatedAED,
      breakdown,
      currency: "AED",
      vatIncluded: true,
      estimatedResponseMins: emergencySurge ? 25 : 60,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
