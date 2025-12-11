import { getToken } from "@/lib/token/getToken";

export async function GET(request) {
  try {
    let token = await getToken(request);
    const { searchParams } = new URL(request.url);
    const paramsObject = Object.fromEntries(searchParams.entries());

    let responseResult;
    if (!(paramsObject.userId && paramsObject.sessionId)) {
      responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    if (paramsObject.userId && !paramsObject.sessionId) {
      responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions?userId=${paramsObject.userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    if (paramsObject.sessionId && !paramsObject.userId) {
      responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions?sessionId=${paramsObject.sessionId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    const responseValue = await responseResult.json();
    return Response.json(responseValue);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function DELETE(request) {
  try {
    let token = await getToken(request);
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseValue = await responseResult.json();
    return Response.json([responseValue]);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
