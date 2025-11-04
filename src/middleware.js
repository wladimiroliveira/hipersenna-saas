import { NextResponse } from "next/server";
import { getSession } from "@/components/models/getSession.model";

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const url = request.nextUrl.clone();
  url.pathname = "/";
  // Se não tiver token, redireciona para /
  if (!token) {
    return NextResponse.rewrite(url);
  }

  const session = await getSession(token);
  if (!session[0]?.ok) {
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
