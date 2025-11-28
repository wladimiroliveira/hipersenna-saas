import { ModulesContainer } from "@/components/views/modulesContainer.view";
import modules from "@/files/modules.json";
import { getSession } from "@/backend/auth/getSession";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();
  if (!session || session.error) {
    redirect("/login");
  }
  return (
    <div className="pl-4 pr-4">
      <div className="pt-12 pb-12">
        <h1 className="text-4xl text-primaria font-bold">Admin</h1>
      </div>
      <div>
        <ModulesContainer title="Módulos Admin" modules={modules[0].submodules} session={session} />
      </div>
    </div>
  );
}
