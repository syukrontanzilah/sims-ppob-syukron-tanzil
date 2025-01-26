import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");

  // console.log("Token in cookie:", token?.value);

  return token
    ? NextResponse.json({ message: "Cookie found", token: token.value })
    : NextResponse.json({ message: "No cookie found" });
}
