"use server";

import { getToken } from "./getToken.service";

export async function getBonus(url) {
  try {
    const token = await getToken();
    const responseResult = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseValue = await responseResult.json();
    return {
      ok: responseResult?.ok,
      status: responseResult?.status,
      bonus: Array.isArray(responseValue) ? [...responseValue] : responseValue,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
