import { getToken } from "@/lib/token/getToken";

export async function PATCH(request, { params }) {
  try {
    let token = await getToken(request);
    const { id } = await params;
    const [data] = await request.json();
    const responseResult = await fetch(`${process.env.API_URL}/roles/${id}`, {
      method: "PATCH",
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

export async function DELETE(request, { params }) {
  try {
    let token = await getToken(request);
    const { id } = await params;
    const responseResult = await fetch(`${process.env.API_URL}/roles/${id}`, {
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
