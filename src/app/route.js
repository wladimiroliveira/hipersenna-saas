import { getSession } from "@/backend/auth/getSession";
import { redirect } from "next/navigation";

export async function GET() {
  const session = await getSession();
  if (session) {
    return redirect("/home");
  }
}
