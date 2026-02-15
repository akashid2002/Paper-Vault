import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const cookieStore = await cookies();
  const key = cookieStore.get("admin_key")?.value;

  if (!key) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { action } = await req.json();

  let endpoint = "";

  if (action === "approve") {
    endpoint = `/admin/papers/${id}/approve`;
  } else if (action === "reject") {
    endpoint = `/admin/papers/${id}/reject`;
  } else {
    return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "PATCH",
    headers: {
      "x-admin-key": key,
    },
  });

  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const cookieStore = await cookies();
  const key = cookieStore.get("admin_key")?.value;

  if (!key) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const response = await fetch(`${API_URL}/admin/papers/${id}/delete`, {
    method: "DELETE",
    headers: {
      "x-admin-key": key,
    },
  });

  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}
