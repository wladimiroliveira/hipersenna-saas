"use client";

import { DataTable } from "./datatable";
import { columns } from "@/app/(pages)/(main)/modulos/admin/users/list/columns";
import { getAllUsers } from "@/components/services/users.service";
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
    <div className="pt-10 pl-4 pr-4">
      <div className="flex flex-row w-full pt-0 p-8">
        <div className="w-full m-auto">
          <h1 className="text-2xl text-primaria font-bold">Lista de Usuários</h1>
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
    </div>
  );
}
