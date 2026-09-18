import { NextRequest, NextResponse } from "next/server";
import { getLeads, createLead, updateLeadStatus } from "@/lib/store";
import { z } from "zod";

const leadSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Valid UAE phone number required"),
  city: z.string().min(2),
  neighborhood: z.string().min(2),
  propertyType: z.enum(["Apartment", "Villa / Townhouse", "Commercial", "Penthouse"]),
  serviceSlug: z.string().optional(),
  amcTier: z.string().optional(),
  urgency: z.enum(["EMERGENCY_NOW", "WITHIN_24_HRS", "SCHEDULED"]),
  estimatedAED: z.number().optional(),
  message: z.string().optional(),
  gtmEventId: z.string().optional(),
});

export async function GET() {
  try {
    const leads = await getLeads();
    return NextResponse.json({ success: true, count: leads.length, leads });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = leadSchema.parse(body);

    const newLead = await createLead(validated);

    return NextResponse.json({
      success: true,
      message: "Lead successfully registered and CRM notification dispatched.",
      lead: newLead,
      crmStatus: "DISPATCHED_TO_OPERATIONS",
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.errors || error.message },
      { status: 400 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ success: false, error: "Missing id or status" }, { status: 400 });
    }

    await updateLeadStatus(id, status);
    return NextResponse.json({ success: true, message: "Lead status updated" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
