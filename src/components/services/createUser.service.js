"use server";

export async function createUser(data, cpf) {
  try {
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/raffle-clients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, cpf }),
    });
    const responseValue = await responseResult.json();
    return {
      ok: responseResult?.ok,
      status: responseResult?.status,
      message: responseResult?.message,
      user: { ...responseValue },
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
