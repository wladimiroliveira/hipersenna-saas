import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (!token && (req.nextUrl.pathname.startsWith("/home") || req.nextUrl.pathname.startsWith("/modulos"))) {
    return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_APP_URL}/login`, req.url));
  }

  return NextResponse.next();
}
