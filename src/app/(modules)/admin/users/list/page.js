import { DataTable } from "@/app/(modules)/admin/users/list/dataTable";
import { columns } from "@/app/(modules)/admin/users/list/columns";
import { getAllUsers } from "@/app/ui/models/auth/getUser/getAllUsers";

export default async function Page() {
  const usersDefine = await getAllUsers();
  return (
    <div className="min-h-[90vh]">
      <div className="p-12">
        <h1 className="text-4xl text-primaria font-bold">Lista de Usuários</h1>
      </div>
      <div className="max-w-[1060px] m-auto">
        <DataTable columns={columns} data={usersDefine} />
      </div>
    </div>
  );
}
