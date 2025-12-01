"use server";

import { getToken } from "@/lib/token/getToken";

export async function deleteUser(id) {
  const token = await getToken();
  try {
    const response = await fetch(`${process.env.API_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    return result;
  } catch (err) {
    return { error: err.message };
  }
}
