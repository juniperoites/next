import { NextRequest, NextResponse } from "next/server";
import { getBusinessSettings, updateBusinessSettings } from "@/lib/store";

export async function GET() {
  const settings = await getBusinessSettings();
  return NextResponse.json({ success: true, settings });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = await updateBusinessSettings(body);
    return NextResponse.json({
      success: true,
      message: "Business settings & hotline numbers updated successfully",
      settings: updated,
    });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 400 });
  }
}
