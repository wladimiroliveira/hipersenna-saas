"use server";

import { getToken } from "@/components/services/getToken.service";
import { deleteToken } from "@/components/services/deleteToken.service";

export async function changeTreatment(data) {
  try {
    const token = await getToken();
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/validities`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const responseValue = await responseResult.json();
    if (
      responseValue?.message === "Token inválido ou expirado" ||
      responseValue?.message === "Autenticação falhou: jwt expired"
    ) {
      await deleteToken();
    }
    return {
      ...responseValue,
      ok: responseResult.ok,
      status: responseResult.status,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
