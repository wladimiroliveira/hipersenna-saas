import { cookies } from "next/headers";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const authorization = request.headers.get("authorization");
    let token = authorization?.replace("Bearer ", "");
    if (!token) {
      const cookieStore = await cookies();
      token = cookieStore.get("token")?.value;
    }
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users?id=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseValue = await responseResult.json();
    return Response.json([
      {
        status: responseResult.status,
        ...responseValue,
      },
    ]);
  } catch (err) {
    console.error("Error on get user by id:\n", err);
  }
}

export async function DELETE(request, { params }) {
  try {
    const authorization = request.headers.get("authorization");
    let token = authorization?.replace("Bearer ", "");
    const { id } = await params;
    if (!token) {
      const cookieStore = await cookies();
      token = cookieStore.get("token")?.value;
    }
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/id/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseValue = await responseResult.json();
    return Response.json([
      {
        status: responseResult.status,
      },
    ]);
  } catch (err) {
    console.error("Error on delete user route", err);
    throw err;
  }
}

export async function PATCH(request, { params }) {
  try {
    const authorization = request.headers.get("authorization");
    let token = authorization?.replace("Bearer ", "");
    const { id } = await params;
    const [data] = await request.json();
    const { userInfo } = data;
    if (!token) {
      const cookieStore = await cookies();
      token = cookieStore.get("token")?.value;
    }
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/id/${id}`, {
      method: "PATCH",
      headers: {
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
    return Response.json([
      {
        status: responseResult.status,
      },
    ]);
  } catch (err) {
    console.error("Error on delete user route", err);
    throw err;
  }
}
