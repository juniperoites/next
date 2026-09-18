import { NextRequest, NextResponse } from "next/server";
import { getServices, updateServicePrice } from "@/lib/store";

export async function GET() {
  try {
    const services = await getServices();
    return NextResponse.json({ success: true, count: services.length, services });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { serviceId, basePriceAED, isActive } = await req.json();
    if (!serviceId || typeof basePriceAED !== "number") {
      return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 });
    }

    await updateServicePrice(serviceId, basePriceAED, isActive);
    return NextResponse.json({
      success: true,
      message: `Service pricing updated to AED ${basePriceAED}`,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
