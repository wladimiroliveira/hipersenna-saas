import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (!token && (req.nextUrl.pathname.startsWith("/home") || req.nextUrl.pathname.startsWith("/modulo"))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
