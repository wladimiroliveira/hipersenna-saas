import { redirect } from "next/navigation";
import { getSession } from "../ui/models/auth/getSession/getSessionFunction";

export default async function Page() {
  const session = await getSession();
  if (!session.response.ok) {
    redirect("/");
  }
  return (
    <div>
      <h1>Parabéns</h1>
      <p>Seu usuário foi logado com sucesso.</p>
    </div>
  );
}
