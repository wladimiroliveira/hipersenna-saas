import { cookies } from "next/headers";

export async function POST(request) {
  let responseBody = [{}];
  try {
    let tokenValue;
    const requestBody = await request.json();
    const { token, info, roles, permissions } = requestBody[0];
    if (!token) {
      const cookieStore = await cookies();
      tokenValue = cookieStore.get("token")?.value;
    } else {
      tokenValue = token;
    }

    // Create User Process
    const createUserResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenValue}`,
      },
      body: JSON.stringify(info),
    });
    const createUserValue = await createUserResult.json();
    responseBody[0] = {
      status: createUserResult.status,
      ...createUserValue,
    };
    // Insert Role in new user
    if (roles && createUserValue.userCreated?.id) {
      const roleInsertResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user-roles`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${tokenValue}` },
        body: JSON.stringify({
          user_id: createUserValue.userCreated.id,
          role_id: roles,
        }),
      });
      const roleInsertValue = await roleInsertResult.json();
      responseBody[0].assinedRole = `User ${createUserValue.userCreated.username} received role ${roleInsertValue.role_id}`;
    }

    if (permissions && createUserValue.userCreated?.id) {
      const permissionsInsertResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user-permissions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenValue}`,
        },
        body: JSON.stringify({
          permission_id: permissions,
          user_id: createUserValue.userCreated.id,
        }),
      });
      const permissionsInsertValue = await permissionsInsertResult.json();
      responseBody[0].permissions = `${permissionsInsertValue.count} permissions added to ${createUserValue.userCreated.username}`;
    }

    return Response.json(responseBody);
  } catch (err) {
    console.error(err);
  }
}
