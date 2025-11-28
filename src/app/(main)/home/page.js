"use client";

import { ModulesContainer } from "@/components/views/modulesContainer.view";
import { useUserInfo } from "@/lib/auth-client";
import modules from "@/files/modules.json";

export default function Page() {
  const userInfo = useUserInfo();
  console.log(userInfo);

  if (!userInfo) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="pl-8 pr-8">
      <div className="flex items-center justify-center" style={{ height: "calc(50vh - 60px)" }}>
        <h1 className="text-center text-4xl text-primaria">
          Bem Vindo(a) ao {userInfo.username || "Usuário"} <br />
          <strong>GHS Sistema</strong>
        </h1>
      </div>
      <ModulesContainer modules={modules} access={userInfo} />
    </div>
  );
}
