import { NextRequest, NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out from Admin Console",
  });

  response.cookies.delete("admin_auth_token");
  return response;
}
