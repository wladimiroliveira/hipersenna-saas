import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const body = await request.json();
    const cookieStore = await cookies();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    cookieStore.set("token", result.token, { secure: false });
    return Response.json([
      {
        status: response.status,
        ok: response.ok,
        redirect: response.redirected,
      },
      result,
    ]);
  } catch (err) {
    console.error(err);
  }
}
