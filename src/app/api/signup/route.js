import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const body = await request.json();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
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
