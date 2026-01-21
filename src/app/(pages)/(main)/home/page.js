"use client";

import { ModulesContainer } from "@/components/views/modulesContainer.view";
import modules from "@/files/modules.json";

export default function Page() {
  return (
    <div className="flex flex-col gap-10 mt-12">
      <div>
        <h1 className="text-center text-3xl">
          Bem Vindo(a) ao <br />
          <strong>GHS Sistema</strong>
        </h1>
      </div>
      <ModulesContainer modules={modules} />
    </div>
  );
}
