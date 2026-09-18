import { NextRequest, NextResponse } from "next/server";
import { getServices, saveService, deleteService } from "@/lib/store";

export async function GET() {
  const services = await getServices();
  return NextResponse.json({ success: true, services });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.slug) {
      return NextResponse.json({ success: false, error: "Name and slug are required" }, { status: 400 });
    }
    const saved = await saveService(body);
    return NextResponse.json({ success: true, message: "Service saved successfully", service: saved });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing service id" }, { status: 400 });
    }
    await deleteService(id);
    return NextResponse.json({ success: true, message: "Service deleted successfully" });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 400 });
  }
}
