import { NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function POST(req: Request) {
  const { key } = await req.json();

  if (!key) {
    return NextResponse.json(
      { message: "Admin key required" },
      { status: 400 },
    );
  }

  // Validate with backend
  const response = await fetch(`${API_URL}/admin/validate`, {
    headers: {
      "x-admin-key": key,
    },
  });

  if (!response.ok) {
    return NextResponse.json({ message: "Invalid admin key" }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });

  res.cookies.set("admin_key", key, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 2,
  });

  return res;
}
