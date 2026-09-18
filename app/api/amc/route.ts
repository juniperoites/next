import { NextRequest, NextResponse } from "next/server";
import { getAMCPackages, createLead } from "@/lib/store";

export async function GET() {
  try {
    const packages = await getAMCPackages();
    return NextResponse.json({ success: true, count: packages.length, packages });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, city, neighborhood, propertyType, tier, billingCycle } = body;

    if (!fullName || !email || !phone || !tier) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const packages = await getAMCPackages();
    const selectedPkg = packages.find((p) => p.tier === tier);
    const annualPrice = selectedPkg?.priceAnnualAED || 3850;
    const estimated = billingCycle === "monthly" ? selectedPkg?.priceMonthlyAED || 349 : annualPrice;

    const lead = await createLead({
      fullName,
      email,
      phone,
      city: city || "Dubai",
      neighborhood: neighborhood || "Palm Jumeirah",
      propertyType: propertyType || "Villa / Townhouse",
      amcTier: tier,
      urgency: "SCHEDULED",
      estimatedAED: estimated,
      message: `AMC Application for [${selectedPkg?.name || tier}] - Billing: ${billingCycle || "Annual"}`,
    });

    return NextResponse.json({
      success: true,
      message: "AMC Application received. Account manager assigned.",
      lead,
      contractEstimatedAED: estimated,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
