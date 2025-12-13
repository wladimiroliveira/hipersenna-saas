import { getToken } from "@/lib/token/getToken";
import { deleteToken } from "@/lib/token/deleteToken";

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
    if (!responseResult.ok) {
      if (responseResult.status === 401) {
        deleteToken("token");

        return new Response(null, {
          status: 401,
          headers: {
            "Set-Cookie": `token=; Path=/; Max-age=0; HttpOnly; Secure; SameSite=lax`,
          },
        });
      }
    }
    // console.log(responseValue);
    return Response.json({
      ...responseValue[0],
      ok: responseResult.ok,
      status: responseResult.status,
      hsusers_roles: responseValue[0].hsusers_roles[0].role_id,
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}
