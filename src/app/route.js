"use server";

import { NextResponse } from "next/server";
import { getToken } from "@/lib/token/getToken";

export async function GET(req) {
  try {
    const token = await getToken();
    if (token) {
      return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_APP_URL}/modulos/admin-sorteios`, req.url));
    } else {
      return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_APP_URL}/login`, req.url));
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}
