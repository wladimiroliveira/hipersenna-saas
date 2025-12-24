"use client";

import { useState } from "react";
import { MoreHorizontal, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";

import branches from "@/files/branches.json";
import roles from "@/files/roles.json";

import { editUser } from "@/components/services/users.service";
import { deleteUser } from "@/components/services/users.service";
import { ErrorAlert, SuccessAlert } from "./alert.view";
import { useRouter } from "next/navigation";

export function EditUserMenu({ user }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [clickSubmit, setClickSubmit] = useState(false);
  const [alert, setAlert] = useState({});
  const [alertKey, setAlertKey] = useState(0);

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      name: user.name,
      username: user.username,
      branch_id: String(user.branch_id),
      role_id: String(user.role_id),
    },
  });

  const router = useRouter();

  // Função de edição
  const onSubmitForm = async (data) => {
    if (clickSubmit) return;
    setClickSubmit(true);

    const userInfo = {
      name: data.name,
      username: data.username,
      password: data.password,
      branch_id: Number(data.branch_id),
      role_id: Number(data.role_id),
    };

    if (!userInfo.password?.trim()) delete userInfo.password;

    const editUserValue = await editUser(user.id, userInfo);
    if (editUserValue.ok) {
      setAlert({
        type: "success",
        statusCode: editUserValue.status,
        title: "Sucesso",
        desc: "Edição realizada com sucesso!",
      });
      setAlertKey((prev) => prev + 1);
      router.refresh();
    } else {
      setAlert({
        type: "error",
        statusCode: editUserValue.status,
        title: "Erro",
        desc: "Erro ao realizar edição.",
      });
      setAlertKey((prev) => prev + 1);
    }

    setClickSubmit(false);
    setOpenEdit(false);
  };

  // ✅ Função de exclusão
  const handleDelete = async () => {
    const deleteUserValue = await deleteUser(user.id);
    setOpenDelete(false);
    if (deleteUserValue.ok) {
      setAlert({
        type: "success",
        statusCode: deleteUserValue.status,
        title: "Sucesso",
        desc: "Usuário deletado com sucesso!",
      });
      setAlertKey((prev) => prev + 1);
      router.refresh();
    } else {
      setAlert({
        type: "error",
        statusCode: deleteUserValue.status,
        title: "Erro",
        desc: "Erro ao deletar usuário.",
      });
      setAlertKey((prev) => prev + 1);
    }
  };

  return (
    <div className="text-primaria">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpenEdit(true)}>Editar usuário</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDelete(true)}>
            <span className="text-red-500 flex items-center gap-1">
              <Trash2 size={14} /> Excluir usuário
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
            Copiar ID do usuário
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal de Edição */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="sm:max-w-[425px] text-primaria">
          <DialogHeader>
            <DialogTitle>Editar usuário</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-2">
            <Label>Nome</Label>
            <Input {...register("name")} />

            <Label>Usuário</Label>
            <Input {...register("username")} />

            <Label>Senha</Label>
            <Input type="password" placeholder="********" {...register("password")} />

            <div className="flex gap-4">
              <div className="flex-1">
                <Label>Filial</Label>
                <Controller
                  name="branch_id"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className=" w-full">
                        <SelectValue placeholder="Selecionar" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map((b) => (
                          <SelectItem key={b.id} value={`${b.number}`}>
                            {b.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="flex-1">
                <Label>Cargo</Label>
                <Controller
                  name="role_id"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className=" w-full">
                        <SelectValue placeholder="Selecionar" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((r) => (
                          <SelectItem key={r.id} value={`${r.id}`}>
                            {r.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <DialogFooter className="flex justify-between pt-4">
              <Button type="submit" className="bg-primaria">
                Salvar <Save />
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ✅ Modal de Confirmação de Exclusão */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent className="sm:max-w-[400px] text-primaria">
          <DialogHeader>
            <DialogTitle>Excluir Usuário</DialogTitle>
          </DialogHeader>
          <p>
            Tem certeza que deseja excluir o usuário <strong>{user.username}</strong>?
          </p>
          <DialogFooter className="flex justify-between pt-4">
            <Button onClick={() => setOpenDelete(false)} variant="outline" className=" text-primaria">
              Cancelar
            </Button>
            <Button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Confirmar Exclusão
              <Trash2 size={16} />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {alert?.type === "success" && <SuccessAlert key={alertKey} title={alert.title} desc={alert.desc} />}
      {alert?.type === "error" && (
        <ErrorAlert key={alertKey} statusCode={alert.statusCode} title={alert.title} desc={alert.desc} />
      )}
    </div>
  );
}
