import { cookies } from "next/headers";
import { getSession } from "@/components/models/getSession.model";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const session = await getSession(token);
  return Response.json(session[1] ?? null);
}
