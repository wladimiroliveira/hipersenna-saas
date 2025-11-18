import { cookies } from "next/headers";

export async function POST(request) {
  let responseBody = [{}];
  let cookieStore;
  let tokenValue;
  try {
    const data = await request.json([]);
    if (data[2]?.token) {
      tokenValue = data[2].token;
    } else {
      cookieStore = await cookies();
      tokenValue = cookieStore.get("token").value;
    }
    const userData = [
      {
        name: data[0].name,
        username: data[0].username,
        password: data[0].password,
        branch_id: data[0].branch_id,
        winthor_id: data[0].winthor_id,
      },
    ];
    const role = [
      {
        role: data[1].role,
      },
    ];
    const createUserResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenValue}`,
      },
      body: JSON.stringify(userData[0]),
    });
    const createUserValue = await createUserResult.json();
    responseBody[0] = {
      status: createUserResult.status,
      ...createUserValue,
    };

    if (createUserValue.userCreated?.username) {
      const roleInsertResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user-roles`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${tokenValue}` },
        body: JSON.stringify({
          user_id: createUserValue.userCreated.id,
          role_id: role[0].role,
        }),
      });
      const roleInsertValue = await roleInsertResult.json();
      responseBody[0].assinedRole = `User ${createUserValue.userCreated.username} received role ${roleInsertValue.role_id}`;
    }
    return Response.json(responseBody);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
