import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    console.log(token);
    if (!token) {
      a;
      return Response.json(
        {
          ok: false,
          status: 401,
          message: "Token ausente",
        },
        {
          status: 401,
        },
      );
    }
    const response = await fetch(`${process.env.API_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
