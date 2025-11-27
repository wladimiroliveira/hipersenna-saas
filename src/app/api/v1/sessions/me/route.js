import { getToken } from "@/lib/getToken";

export async function DELETE(request) {
  try {
    let token = await getToken(request);
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions/me`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseValue = await responseResult.json();
    return Response.json([responseValue]);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
