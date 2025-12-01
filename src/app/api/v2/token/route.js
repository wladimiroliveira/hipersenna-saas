import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    return token;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
