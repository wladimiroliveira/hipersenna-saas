import { getToken } from "@/lib/getToken";
import { cookies } from "next/headers";

export async function GET(request) {
  try {
    let token = await getToken(request);
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseValue = await responseResult.json();

    return Response.json(responseValue);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
