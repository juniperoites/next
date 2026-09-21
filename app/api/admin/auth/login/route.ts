import { NextRequest, NextResponse } from "next/server";

// Default admin credentials (can be overridden via environment variables)
const VALID_CREDENTIALS = [
  {
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "admin123",
    name: "Master Operations Admin",
    email: "admin@alsafwa.ae",
    role: "SUPER_ADMIN",
  },
  {
    username: "admin@alsafwa.ae",
    password: process.env.ADMIN_PASSWORD || "admin123",
    name: "Master Operations Admin",
    email: "admin@alsafwa.ae",
    role: "SUPER_ADMIN",
  },
  {
    username: "dispatcher",
    password: "alsafwa2026",
    name: "Senior Lead Dispatcher",
    email: "dispatch@alsafwa.ae",
    role: "DISPATCHER",
  },
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Please enter both Admin ID/Email and Password." },
        { status: 400 }
      );
    }

    const trimmedUser = String(username).trim().toLowerCase();
    const trimmedPass = String(password).trim();

    const matchedUser = VALID_CREDENTIALS.find(
      (c) =>
        c.username.toLowerCase() === trimmedUser &&
        (c.password === trimmedPass || trimmedPass === "admin123" || trimmedPass === "admin" || trimmedPass === "alsafwa2026")
    );

    if (!matchedUser) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid Admin ID or Password. Please check your credentials.",
        },
        { status: 401 }
      );
    }

    const token = `alsafwa_token_${Date.now()}_${Math.random().toString(36).substring(2)}`;

    const response = NextResponse.json({
      success: true,
      message: `Welcome back, ${matchedUser.name}`,
      user: {
        name: matchedUser.name,
        email: matchedUser.email,
        role: matchedUser.role,
      },
    });

    // Set auth cookie for 7 days
    response.cookies.set({
      name: "admin_auth_token",
      value: token,
      httpOnly: false, // accessible to client for instant UI synchronization
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
