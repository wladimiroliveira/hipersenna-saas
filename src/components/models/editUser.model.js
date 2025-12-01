"use server";

import { getToken } from "@/lib/token/getToken";

export async function editUser(id, body) {
  console.log(body);
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
    const result = await responseResult.json();
    return result;
  } catch (err) {
    return err;
  }
}
