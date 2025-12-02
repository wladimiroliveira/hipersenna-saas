"use server";

import { getToken } from "@/lib/token/getToken";

export async function editUser(id, body) {
  const token = await getToken();
  try {
    const responseResult = await fetch(`${process.env.API_URL}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const responseValue = await responseResult.json();
    return {
      ok: responseResult.ok,
      status: responseResult.status,
      ...responseValue,
    };
  } catch (err) {
    return err;
  }
}
