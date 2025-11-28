import { cookies } from "next/headers";

export async function deleteToken(cookie) {
  const cookieStore = await cookies();
  cookieStore.delete(cookie);
}
