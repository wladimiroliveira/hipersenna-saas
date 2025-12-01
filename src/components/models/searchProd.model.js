"use server";

import { getToken } from "@/lib/token/getToken";

export async function searchProd(id, type) {
  try {
    const token = await getToken();
    const responseResult = await fetch(`${process.env.API_URL}/products?${type}=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const responseValue = await responseResult.json();
    return responseValue;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
