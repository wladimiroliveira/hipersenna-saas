"use server";

import { getToken } from "@/lib/token/getToken";
import { deleteToken } from "@/lib/token/deleteToken";

export async function signOut() {
  try {
    const token = await getToken();
    const responseResult = await fetch(`${process.env.API_URL}/sessions/me`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseValue = await responseResult.json();
    if (responseResult.ok) {
      await deleteToken("token");
    }
    return {
      ok: responseResult.ok,
      status: responseResult.status,
      ...responseValue,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
