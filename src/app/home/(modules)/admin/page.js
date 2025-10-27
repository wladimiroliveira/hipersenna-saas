import { ModulesContainer } from "@/app/ui/components/modulesContainer";
import modules from "@/lib/files/modules.json";

export default function Page() {
  return (
    <div>
      <div className="p-12">
        <h1 className="text-4xl text-primaria font-bold">Admin</h1>
      </div>
      <div className="pl-12 pr-12">
        <ModulesContainer title="Módulos Admin" modules={modules[0].submodules} />
      </div>
    </div>
  );
}
