"use server";

import { cookies } from "next/headers";

export async function signIn(data) {
  try {
    const cookieStore = await cookies();
    const { username, password } = data[0];
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const responseValue = await responseResult.json();
    cookieStore.set("token", responseValue.token, { secure: false });
    return {
      ok: responseResult.ok,
      status: responseResult.status,
      responseValue,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
