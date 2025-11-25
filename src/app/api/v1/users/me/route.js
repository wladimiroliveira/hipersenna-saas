import { cookies } from "next/headers";

export async function GET(request) {
  try {
    const authorization = request.headers.get("authorization");
    let token = authorization?.replace("Bearer ", "");
    if (!token) {
      const cookieStore = await cookies();
      token = cookieStore.get("token").value;
    }
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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
