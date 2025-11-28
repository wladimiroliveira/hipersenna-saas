import { getToken } from "@/lib/token/getToken";

export async function GET(request) {
  try {
    const token = await getToken(request);
    const responseResult = await fetch(`${process.env.API_URL}/roles`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseValue = await responseResult.json();
    return Response.json([...responseValue]);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function POST(request) {
  try {
    const token = await getToken(request);
    const [data] = await request.json();
    const responseResult = await fetch(`${process.env.API_URL}/roles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        description: data.description,
      }),
    });
    const responseValue = await responseResult.json();
    return Response.json([responseValue]);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
