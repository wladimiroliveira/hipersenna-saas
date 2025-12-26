import { RolePermissionsController } from "@/components/controllers/rolePermissions.controller";

export default function Page() {
  return (
    <div className="pl-4 pr-4">
      <div className="pt-12 pb-12">
        <h1 className="text-xl text-primaria font-bold">Permissão</h1>
        <p>Adicione ou remova permissões de forma personalizada para os usuários</p>
      </div>
      <div>{/* <RolePermissionsController /> */}</div>
    </div>
  );
}
