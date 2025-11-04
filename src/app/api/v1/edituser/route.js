import { cookies } from "next/headers";

export async function PATCH(request) {
  try {
    const body = await request.json();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${body[0]}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body[1]),
    });

    const result = await response.json();
    return Response.json([
      {
        result,
      },
      {
        response,
      },
    ]);
  } catch (err) {
    return err;
  }
}
