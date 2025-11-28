"use client";

import { ModulesContainer } from "@/components/views/modulesContainer.view";
import modules from "@/files/modules.json";
import { useUserInfo } from "@/lib/auth-client";

export default function Page() {
  const userInfo = useUserInfo();

  if (!userInfo) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="pl-4 pr-4">
      <div className="pt-12 pb-12">
        <h1 className="text-4xl text-primaria font-bold">Vencimento</h1>
      </div>
      <div>
        <ModulesContainer title="Módulos Vencimento" modules={modules[1].submodules} access={userInfo} />
      </div>
    </div>
  );
}
