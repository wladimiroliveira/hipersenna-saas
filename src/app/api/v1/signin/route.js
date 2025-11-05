import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const requestBody = await request.json();
    const { username, password } = requestBody[0];
    const cookieStore = await cookies();
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const responseValue = await responseResult.json();
    cookieStore.set("token", responseValue.token, { secure: false });
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
