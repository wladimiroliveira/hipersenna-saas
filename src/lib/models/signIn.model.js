"use server";

import { cookies } from "next/headers";

export async function signIn(data) {
  try {
    let responseValue = {};
    const cookieStore = await cookies();
    const { username, password } = data[0];
    const signInResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const signInValue = await signInResult.json();
    responseValue = {
      ok: signInResult.ok,
      status: signInResult.status,
      ...signInValue,
    };
    if (signInResult.ok) {
      cookieStore.set("token", signInValue.token, { secure: false });
      const meResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${signInValue.token}`,
        },
      });
      const meValue = await meResult.json();
      if (meResult.ok) {
        responseValue = {
          ...responseValue,
          ...meValue[0],
        };
      }
    }
    return responseValue;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
