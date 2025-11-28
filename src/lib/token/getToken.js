import { cookies } from "next/headers";

export async function getToken(request) {
  const authorization = request?.headers.get("authorization");
  let token = authorization?.replace("Bearer ", "");
  if (!token || !request) {
    const cookieStore = await cookies();
    token = cookieStore.get("token")?.value;
  }
  return token;
}
