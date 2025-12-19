"use server";

import { getToken } from "@/components/services/getToken.service";

export async function searchProd(id, type) {
  try {
    const token = await getToken();
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?${type}=${id}`, {
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
