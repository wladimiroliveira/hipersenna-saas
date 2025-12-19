"use server";

import { getToken } from "@/components/services/getToken.service";

export async function signUpModel(data) {
  try {
    let responseValue = [{}];
    try {
      const token = await getToken();
      const userResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data[0]),
      });

      const userValue = await userResult.json();
      if (userResult.ok) {
        responseValue[0] = {
          ...userValue,
          ok: userResult.ok,
          status: userResult.status,
          message: "Usuário criado com sucesso!",
        };
      } else {
        responseValue[0] = {
          ...userValue,
          ok: userResult.ok,
          status: userResult.status,
        };
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
    const completeData = JSON.parse(JSON.stringify(responseValue[0]));
    return completeData;
  } catch (err) {
    return err;
  }
}
