import { DataTable } from "@/components/views/dataTable.view";
import { columns } from "@/app/(main)/modulos/admin/users/list/columns";
import { getAllUsers } from "@/lib/models/users.model";

export default async function Page() {
  const { users } = await getAllUsers();

  if (!users) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-[90vh] pl-4 pr-4">
      <div className="pt-12 pb-12">
        <h1 className="text-4xl text-primaria font-bold">Lista de Usuários</h1>
      </div>
      <div className="max-w-[1060px] m-auto">
        <DataTable columns={columns} data={users} searchColumn={"name"} />
      </div>
    </div>
  );
}
