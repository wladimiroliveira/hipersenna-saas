import { cookies } from "next/headers";

export async function getAllUsers() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  try {
    const usersResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const usersValue = await usersResult.json();
    return usersValue;
  } catch (err) {
    console.error(err);
  }
}
