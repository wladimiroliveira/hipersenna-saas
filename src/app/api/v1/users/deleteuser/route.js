import { cookies } from "next/headers";

export async function DELETE(request) {
  try {
    let cookieStore;
    let tokenValue;
    const requestBody = await request.json();
    const { id, token } = requestBody[0];
    if (!token) {
      cookieStore = await cookies();
      tokenValue = cookieStore.get("token")?.value;
    } else {
      tokenValue = token;
    }

    if (!id) {
      return Response.json({ error: "ID do usuário não fornecido" }, { status: 400 });
    }

    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    });
    const responseValue = await responseResult.json();
    return Response.json([
      {
        status: responseResult.status,
        ...responseValue,
      },
    ]);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
