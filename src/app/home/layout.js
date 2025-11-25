import { Navigation } from "@/components/views/navigation.view";
import { getSession } from "@/backend/auth/getSession";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const session = await getSession();

  if (!session || session.error) {
    redirect("/login");
  }

  return (
    <>
      <header>
        <nav className="w-full fixed">
          <Navigation session={session} />
        </nav>
      </header>
      <div className="pt-[64px] max-w-[1260px] m-auto">{children}</div>
    </>
  );
}

// Estou resolvendo os problemas de autenticação, tentei entrar com um usuário sem permissões, apenas com a role = 3, e ele me retornou para a tela de login
