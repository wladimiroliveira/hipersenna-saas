"use client";

import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./datatable";

async function getData() {
  return [
    {
      name: "Admin",
      description: "Top level role",
    },
    {
      name: "Pescador",
      description: "Top level role",
    },
    {
      name: "Corredor",
      description: "Top level role",
    },
    {
      name: "Admin",
      description: "Top level role",
    },
    {
      name: "Admin",
      description:
        "Top level role Top level role Top level role Top level role Top level role Top level role Top level role Top level role Top level role Top level role Top level role Top level role Top level role Top level role Top level role Top level role Top level role Top level role Top level role Top level role Top level role Top level role Top level role Top level role Top level role Top level role Top level role Top level role Top level role Top level role Top level role Top level role Top level role Top level role ",
    },
  ];
}

export default function Page() {
  const [roles, setRoles] = useState(false);

  useEffect(() => {
    async function getRoles() {
      const data = await getData();
      setRoles(data);
    }

    getRoles();
  }, []);

  return (
    <div className="pl-4 pr-4">
      <div className="pt-12 pb-12">
        <h1 className="text-4xl text-primaria font-bold">Cargos</h1>
        <p>Adicione, remova, e edite cargos através dos menus abaixo</p>
      </div>
      <div className="flex flex-row w-full pt-0 p-8">
        <div className="w-full max-w-xl m-auto">
          <DataTable columns={columns} data={roles} />
        </div>
      </div>
    </div>
  );
}
