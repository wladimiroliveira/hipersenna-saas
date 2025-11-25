import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const [data] = await request.json();
    const { username, password } = data;
    const cookieStore = await cookies();
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signin`, {
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
