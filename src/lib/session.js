import { cookies } from "next/headers";

export async function getSessionData() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { error: "NO_TOKEN" };
    }

    const meResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      cache: "no-store",
      headers: { Authorization: `Bearer ${token}` },
    });

    const meValue = await meResult.json();

    if (meResult.status !== 200) {
      return { error: "INVALID_TOKEN" };
    }

    const roleResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users?id=${meValue.id}`, {
      cache: "no-store",
      headers: { Authorization: `Bearer ${token}` },
    });

    const roleValue = await roleResult.json();

    if (roleResult.status !== 200) {
      return { error: "ROLE_FETCH_FAIL" };
    }

    const permsResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user-permissions/id/${meValue.id}`, {
      cache: "no-store",
      headers: { Authorization: `Bearer ${token}` },
    });

    const permsValue = await permsResult.json();

    const permissions = permsResult.status === 200 ? permsValue.map((p) => p.permission_id) : [];

    return {
      id: meValue.id,
      name: meValue.name,
      username: meValue.username,
      winthor_id: meValue.winthor_id,
      branch_id: meValue.branch_id,
      role: roleValue.user[0].hsusers_roles[0].role_id,
      permissions,
    };
  } catch (err) {
    console.error(err);
    return { error: "SERVER_ERROR" };
  }
}
