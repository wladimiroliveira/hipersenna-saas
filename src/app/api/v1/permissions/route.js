import { cookies } from "next/headers";

export async function GET(request) {
  let tokenValue;
  let cookieStore;
  try {
    const params = request.nextUrl.searchParams;
    const allParams = Object.fromEntries(params.entries());
    const entries = Object.entries(allParams);
    if (!(entries.length > 1)) {
      cookieStore = await cookies();
      tokenValue = cookieStore.get("token").value;
    }
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user-permissions/id/${entries[0][1]}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    });
    const responseValue = await responseResult.json();
    return Response.json([
      {
        status: responseResult.status,
        permissions: responseValue,
      },
    ]);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function POST(request) {
  let tokenValue;
  let cookieStore;
  try {
    const data = await request.json();
    if (!data[1]?.token) {
      cookieStore = await cookies();
      tokenValue = cookieStore.get("token").value;
    }
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user-permissions`, {
      method: "POST",
      headers: {
        "Content-Type": `application/json`,
        Authorization: `Bearer ${tokenValue}`,
      },
      body: JSON.stringify({
        user_id: data[0].user_id,
        permission_id: data[0].permissions,
      }),
    });
    const responseValue = await responseResult.json();
    console.log(responseValue);
    return Response.json([
      {
        status: "status",
        ...responseValue,
      },
    ]);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function DELETE(request) {
  let tokenValue;
  let cookieStore;
  try {
    const data = await request.json();
    if (!data[1]?.token) {
      cookieStore = await cookies();
      tokenValue = cookieStore.get("token").value;
    }
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user-permissions`, {
      method: "DELETE",
      headers: {
        "Content-Type": `application/json`,
        Authorization: `Bearer ${tokenValue}`,
      },
      body: JSON.stringify({
        user_id: data[0].user_id,
        permission_id: data[0].permissions,
      }),
    });
    const responseValue = await responseResult.json();
    console.log(responseValue);
    return Response.json([
      {
        status: "status",
        ...responseValue,
      },
    ]);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
