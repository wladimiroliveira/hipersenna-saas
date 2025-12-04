"use server";

import { getToken } from "@/lib/token/getToken";

export async function getMeSession() {
  try {
    const token = await getToken();
    const response = await fetch(`${process.env.API_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/jaon",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return [response, result];
  } catch (err) {
    console.error(err);
  }
}
