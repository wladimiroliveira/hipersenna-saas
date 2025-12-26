"use server";

import { cookies } from "next/headers";
import { deleteToken } from "@/components/services/deleteToken.service";

export async function getDrawResults(url) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const responseResult = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseValue = await responseResult.json();
    if (responseResult?.status === 401) {
      await deleteToken();
    }
    return {
      ok: responseResult.ok,
      status: responseResult.status,
      raffles: [...responseValue],
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
