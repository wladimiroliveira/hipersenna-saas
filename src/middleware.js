import { NextResponse } from "next/server";
import { getSession } from "./app/ui/models/auth/getSession/getSessionFunction";

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const url = request.nextUrl.clone();
  url.pathname = "/";
  // Se não tiver token, redireciona para /
  if (!token) {
    return NextResponse.rewrite(url);
  }

  const session = await getSession(token);
  if (!session.response?.ok) {
    const response = NextResponse.rewrite(url);
    response.cookies.delete("token");
    return response;
  }
  // Se tiver token, segue normalmente
  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*", "/home"], // protege /home e subrotas
};
