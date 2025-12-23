"use server";

import { cookies } from "next/headers";
import { deleteToken } from "@/components/services/deleteToken.service";

export async function drawRaffles(branch_id) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/raffles/draw/${branch_id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseValue = await responseResult.json();
    if (
      responseValue?.message === "Token inválido ou expirado" ||
      responseValue?.message === "Autenticação falhou: jwt expired"
    ) {
      await deleteToken();
    }
    return {
      ok: responseResult.ok,
      status: responseResult.status,
      ...responseValue,
    };
  } catch (err) {
    console.error(err);
  }
}
