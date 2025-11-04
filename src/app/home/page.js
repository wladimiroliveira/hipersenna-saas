import { ModulesContainer } from "@/components/views/modulesContainer.view";
import modules from "@/lib/files/modules.json";

export default async function Page() {
  return (
    <div className="pl-8 pr-8">
      <div className="flex items-center justify-center" style={{ height: "calc(70vh - 60px)" }}>
        <h1 className="text-center text-4xl text-primaria">
          Bem Vindo(a) ao <br />
          <strong>GHS Sistema</strong>
        </h1>
      </div>
      <ModulesContainer title="Módulos" modules={modules} />
    </div>
  );
}
