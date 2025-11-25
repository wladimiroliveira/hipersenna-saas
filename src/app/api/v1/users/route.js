import { getToken } from "@/lib/getToken";

export async function GET(request) {
  try {
    let token = await getToken(request);
    const resposneResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const { user } = await resposneResult.json();
    return Response.json(user);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function POST(request) {
  let responseBody = [{}];
  let cookieStore;
  try {
    let token = await getToken(request);
    const [data] = await request.json();
    const { userInfo } = data;
    const createUserResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: userInfo.name,
        username: userInfo.username,
        password: userInfo.password,
        branch_id: userInfo.branch_id,
        winthor_id: userInfo.winthor_id,
      }),
    });
    const createUserValue = await createUserResult.json();
    responseBody[0] = {
      ...createUserValue,
    };

    if (createUserValue.userCreated?.username) {
      const roleInsertResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user-roles`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          user_id: createUserValue.userCreated.id,
          role_id: userInfo.role,
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
