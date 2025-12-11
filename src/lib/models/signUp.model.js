"use server";

import { getToken } from "@/lib/token/getToken";

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
      if (userResult.ok) {
        try {
          const roleUserResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user-roles`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              user_id: responseValue[0].id,
              role_id: data[1].role,
            }),
          });
          const roleUserValue = await roleUserResult.json();
          if (roleUserResult.ok) {
            responseValue[0] = {
              ...responseValue[0],
              role_response: `User ${responseValue[0].username} receive role ${data[1].role}`,
            };
          }
        } catch (err) {
          console.error(err);
          throw err;
        }
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
