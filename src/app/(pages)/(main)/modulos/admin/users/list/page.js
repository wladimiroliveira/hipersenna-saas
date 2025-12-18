"use client";

import { DataTable } from "@/components/views/dataTable.view";
import { columns } from "@/app/(pages)/(main)/modulos/admin/users/list/columns";
import { getAllUsers } from "@/lib/models/users.model";
import { Suspense, useEffect, useState } from "react";

export default function Page() {
  const [users, setUsers] = useState(false);

  useEffect(() => {
    async function handleGetUsers() {
      const { users } = await getAllUsers();
      setUsers(users);
    }
    handleGetUsers();
  }, []);

  return (
    <div className="min-h-[90vh] pl-4 pr-4">
      <div className="pt-12 pb-12">
        <h1 className="text-4xl text-primaria font-bold">Lista de Usuários</h1>
      </div>
      <div className="max-w-[1060px] m-auto">
        <Suspense
          fallback={
            <div>
              <p>Loading...</p>
            </div>
          }
        >
          <DataTable columns={columns} data={users} searchColumn={"name"} />
        </Suspense>
      </div>
    </div>
  );
}
