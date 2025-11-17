import { cookies } from "next/headers";

export async function GET(request) {
  const params = request.nextUrl.searchParams;
  const allParams = Object.fromEntries(params.entries());
  const entries = Object.entries(allParams);
  let token;
  let cookieStore;
  try {
    if (entries.length > 1) {
      token = entries[1][1];
    } else {
      cookieStore = await cookies();
      token = cookieStore.get("token").value;
      console.log(token);
    }
    const responseResult = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?${entries[0][0]}=${entries[0][1]}&codfilial=${6}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const responseValue = await responseResult.json();
    console.log(responseValue);
    return Response.json({
      status: responseValue.status,
      ...responseValue,
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}
