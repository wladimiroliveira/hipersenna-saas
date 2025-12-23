"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./datatable";
import { columns } from "./columns";
import { getPermissions } from "@/components/services/getPermissions.service";

async function getData() {
  const permissions = await getPermissions();
  if (!permissions?.ok) {
    alert("Erro ao carregar permissões");
    return;
  }
  return permissions?.permissions;
}

export default function Page() {
  const [roles, setRoles] = useState(false);
  async function getRoles() {
    const data = await getData();
    setRoles(data);
  }

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <div className="pl-4 pr-4">
      <div className="pt-12 pb-12">
        <h1 className="text-4xl text-primaria font-bold">Permissões</h1>
        <p>Adicione, remova, e edite permissões através da tabela abaixo</p>
      </div>
      <div className="flex flex-row w-full pt-0 p-8">
        <div className="w-full max-w-4xl m-auto">
          <DataTable columns={columns} data={roles} />
        </div>
      </div>
    </div>
  );
}
