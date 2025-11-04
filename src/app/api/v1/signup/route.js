import { cookies } from "next/headers";

export async function POST(request) {
  try {
    let token;
    const body = await request.json();
    if (!body.token) {
      const cookieStore = await cookies();
      token = cookieStore.get("token")?.value;
    } else {
      token = body.token;
    }
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
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
  }
}
