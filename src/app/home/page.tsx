import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect('/')
  }

  return (
    <div>
      <div className="flex flex-col gap-8 pt-4 pb-4 text-center">
        <h1
          className="text-2xl leading-7 xl:text-3xl"
        >Olá <strong>{session.user.name},</strong><br/>seja bem vindo(a)<br/>ao ambiente <strong>HIPERSENNA</strong></h1>
        <p className="text-sm text-quartenaria">Confira os módulos disponíveis para o seu perfil</p>
      </div>
    </div>
  );
}