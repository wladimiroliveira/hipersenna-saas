"use server";

import { cookies } from "next/headers";

export async function getAllUsers() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  try {
    const responseResult = await fetch(`${process.env.API_URL}/users/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseValue = await responseResult.json();
    return [
      {
        ...responseValue[0],
        ok: responseResult.ok,
        status: responseResult.status,
        hsusers_roles: responseValue[0].hsusers_roles[0].role_id,
      },
    ];
  } catch (err) {
    console.error(err);
  }
}
