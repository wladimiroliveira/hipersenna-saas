import { ModulesContainer } from "@/app/ui/components/modulesContainer";
import modules from "@/lib/files/modules.json";

export default function Page() {
  return (
    <div className="pl-4 pr-4">
      <div className="pt-12 pb-12">
        <h1 className="text-4xl text-primaria font-bold">Vencimento</h1>
      </div>
      <div>
        <ModulesContainer title="Módulos" modules={modules[1].submodules} />
      </div>
    </div>
  );
}
