"use server";

import { getToken } from "@/lib/token/getToken";

export async function deleteUser(id) {
  const token = await getToken();
  try {
    const responseResult = await fetch(`${process.env.API_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseValue = await responseResult.json();
    return {
      ok: responseResult.ok,
      status: responseResult.status,
      ...responseValue,
    };
  } catch (err) {
    return { error: err.message };
  }
}
