import { ModulesContainer } from "@/components/views/modulesContainer.view";
import modules from "@/files/modules.json";
import { getUserInfo } from "@/backend/auth/getUserInfo";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getUserInfo();
  if (!session || session.error) {
    redirect("/login");
  }

  const permissions = session[0].hsusers_permissions;
  const role = session[0].hsusers_roles[0].role_id;
  if (permissions || role) {
    return (
      <div className="pl-4 pr-4">
        <div className="pt-12 pb-12">
          <h1 className="text-4xl text-primaria font-bold">Admin</h1>
        </div>
        <div>
          <ModulesContainer
            title="Módulos Admin"
            modules={modules[0].submodules}
            permissions={permissions}
            role={role}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="pl-4 pr-4">
        <div className="pt-12 pb-12">
          <h1 className="text-4xl text-primaria font-bold">Admin</h1>
        </div>
        <div></div>
      </div>
    );
  }
}
