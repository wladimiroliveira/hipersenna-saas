import { cookies } from "next/headers";

export async function POST(request) {
  let cookieStore;
  let tokenValue;
  try {
    const requestBody = await request.json();
    const { token } = requestBody[0];
    if (!token) {
      cookieStore = await cookies();
      tokenValue = cookieStore.get("token").value;
    } else {
      tokenValue = token;
    }
    const responseResult = await fetch(`${process.env.API_URL}/users/me`, {
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
  } catch (err) {
    console.error(err);
    throw err;
  }
}
