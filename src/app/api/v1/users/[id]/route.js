import { getToken } from "@/lib/getToken";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    let token = await getToken(request);
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users?id=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseValue = await responseResult.json();
    return Response.json(responseValue);
  } catch (err) {
    console.error("\nError on get user by id endpoint:\n\n", err);
  }
}

export async function DELETE(request, { params }) {
  try {
    let token = await getToken(request);
    const { id } = await params;
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseValue = await responseResult.json();
    return Response.json([
      {
        ...responseValue,
      },
    ]);
  } catch (err) {
    console.error("Error on delete user route", err);
    throw err;
  }
}

export async function PATCH(request, { params }) {
  try {
    let token = await getToken(request);
    const { id } = await params;
    const [data] = await request.json();
    const { userInfo } = data;
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
      method: "PATCH",
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
    const responseValue = await responseResult.json();
    return Response.json([responseValue]);
  } catch (err) {
    console.error("Error on delete user route", err);
    throw err;
  }
}
