import { getToken } from "@/lib/getToken";

export async function PATCH(request, { params }) {
  try {
    let token = await getToken(request);
    const { id } = await params;
    const [data] = await request.json();
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles/id/${id}`, {
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
