"use server";

import { NextResponse } from "next/server";
import { getToken } from "@/components/services/getToken.service";

export async function GET(req) {
  try {
    const token = await getToken();
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (responseResult.ok) {
      return NextResponse.redirect(new URL("/home", req.url));
    } else {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}
