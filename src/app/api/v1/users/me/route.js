import { cookies } from "next/headers";

export async function GET(request) {
  let tokenValue;
  let cookieStore;
  try {
    const params = request.nextUrl.searchParams;
    const allParams = Object.fromEntries(params.entries());
    const entries = Object.entries(allParams);
    if (!(entries.length > 1)) {
      cookieStore = await cookies();
      tokenValue = cookieStore.get("token").value;
    }
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      method: "GET",
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
