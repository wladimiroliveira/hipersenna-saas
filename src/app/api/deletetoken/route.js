import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    if (!cookieStore.get("token").value) {
      return Response.json([
        {
          status: 200,
          ok: true,
          redirect: "/",
        },
        { message: "Token deleted" },
      ]);
    } else {
      return Response.json([
        {
          status: 400,
          ok: false,
          redirect: false,
        },
        {
          message: "Don't delete the token",
        },
      ]);
    }
  } catch (err) {
    console.error(err);
  }
}
