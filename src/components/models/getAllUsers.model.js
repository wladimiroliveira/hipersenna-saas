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
    const users = responseValue.map(
      (resValue) =>
        (resValue = {
          ...resValue,
          hsusers_roles: resValue.hsusers_roles[0].role_id,
        }),
    );
    return users;
  } catch (err) {
    console.error(err);
  }
}
