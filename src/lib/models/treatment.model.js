"use server";

import { getToken } from "@/lib/token/getToken";

export async function changeTreatment(data) {
  console.log(data);
  try {
    const token = await getToken();
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/validities`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const responseValue = await responseResult.json();
    return {
      ...responseValue,
      ok: responseResult.ok,
      status: responseResult.status,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
