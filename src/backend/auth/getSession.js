import { getSessionData } from "@/lib/session";

export async function getSession() {
  return await getSessionData();
}
