import { cookies } from "next/headers";

export async function PATCH(request) {
  try {
    let cookieStore;
    let tokenValue;
    const requestBody = await request.json();
    const { id, token, info } = requestBody[0];
    if (!token) {
      cookieStore = await cookies();
      tokenValue = cookieStore.get("token")?.value;
    } else {
      tokenValue = token;
    }
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenValue}`,
      },
      body: JSON.stringify(info),
    });
    const responseValue = await responseResult.json();
    return Response.json([{ status: responseResult.status, ...responseValue }]);
  } catch (err) {
    return err;
  }
}
