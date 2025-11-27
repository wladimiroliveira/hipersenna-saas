import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("token")?.value;
    const [data] = await request.json();
    const { username, password } = data;
    if (!token) {
      const signIn = await fetch("http://localhost:3000/api/v1/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            username,
            password,
          },
        ]),
      }).then((r) => r.json());
      token = signIn[0].token;
    }
    return Response.json([{ token }]);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
