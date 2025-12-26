"use client";

import { ModulesContainer } from "@/components/views/modulesContainer.view";
import modules from "@/files/modules.json";

export default function Page() {
  return (
    <div className="flex flex-col gap-10 pt-12">
      <div>
        <h1 className="text-2xl text-center text-primaria font-bold">Usuários</h1>
      </div>
      <div>
        <ModulesContainer title="Módulos Admin" modules={modules[0].submodules[0].submodules} />
      </div>
    </div>
  );
}
