import { cookies } from "next/headers";
import { deleteUser } from "@/app/ui/models/auth/deleteUser/deleteUserFunction";

export async function DELETE(request) {
  const { id } = await request.json();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!id) {
    return Response.json({ error: "ID do usuário não fornecido" }, { status: 400 });
  }

  const response = await deleteUser(id, token);
  return Response.json(response);
}
