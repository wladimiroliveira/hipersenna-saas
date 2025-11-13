import { cookies } from "next/headers";

export async function POST(request) {
  try {
    let cookieStore;
    let tokenValue;
    const requestBody = await request.json();
    const { token } = requestBody[0];

    if (!token) {
      cookieStore = await cookies();
      tokenValue = cookieStore.get("token").value;
    } else {
      tokenValue = token;
    }
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/signout`, {
      method: "POST",
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
