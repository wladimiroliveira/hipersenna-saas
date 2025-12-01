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
import { editUser } from "@/components/models/editUser.model";

export function EditUserMenu({ user }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [clickSubmit, setClickSubmit] = useState(false);

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      name: user.name,
      username: user.username,
      branch_id: String(user.branch_id),
    },
  });

  // Função de edição
  const onSubmitForm = async (data) => {
    if (clickSubmit) return;
    setClickSubmit(true);

    const userInfo = {
      name: data.name,
      username: data.username,
      password: data.password,
      branch_id: parseInt(data.branch_id),
    };

    if (!userInfo.password?.trim()) delete userInfo.password;

    const result = await editUser(user.id, userInfo);
    console.log("Resposta edição:", result);

    setClickSubmit(false);
    setOpenEdit(false);
  };

  // ✅ Função de exclusão
  const handleDelete = async () => {
    try {
      const res = await fetch("/api/v1/deleteuser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user.id }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Usuário excluído:", data);
        setOpenDelete(false);
        // opcional: recarregar a tabela
        window.location.reload();
      } else {
        console.error("Erro ao excluir:", res.statusText);
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
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
        <DropdownMenuContent className="border-primaria" align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpenEdit(true)}>Editar usuário</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDelete(true)}>
            <span className="text-red-500 flex items-center gap-1">
              <Trash2 size={14} /> Excluir usuário
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-primaria" />
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
                      <SelectTrigger className="border-primaria w-full">
                        <SelectValue placeholder="Selecionar" />
                      </SelectTrigger>
                      <SelectContent className="border-primaria">
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
            <Button onClick={() => setOpenDelete(false)} variant="outline" className="border-primaria text-primaria">
              Cancelar
            </Button>
            <Button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Confirmar Exclusão
              <Trash2 size={16} />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
