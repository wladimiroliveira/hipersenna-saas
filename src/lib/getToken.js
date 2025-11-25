import { cookies } from "next/headers";

export async function getToken(request) {
  const authorization = request.headers.get("authorization");
  let token = authorization?.replace("Bearer ", "");
  if (!token) {
    const cookieStore = request.headers.get("authorization");
    token = cookieStore.get("token")?.value;
  }
  return token;
}
