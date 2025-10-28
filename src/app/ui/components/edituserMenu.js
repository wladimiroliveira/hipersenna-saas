"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { MoreHorizontal } from "lucide-react";
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

import branchs from "@/lib/files/branchs.json";
import accessLevels from "@/lib/files/accessLevels.json";
import { editUser } from "@/app/ui/models/auth/editUser/editUserFunction";

export function EditUserMenu({ user }) {
  const [open, setOpen] = useState(false);
  const [clickSubmit, setClickSubmit] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      username: user.username,
      branch_id: String(user.branch_id),
      access_level: String(user.access_level),
    },
  });

  const onSubmitForm = async (data) => {
    if (clickSubmit) return;
    setClickSubmit(true);

    const userInfo = {
      name: data.name,
      username: data.username,
      password: data.password,
      branch_id: parseInt(data.branch_id),
      access_level: parseInt(data.access_level),
    };

    if (!userInfo.password || userInfo.password.trim() === "") {
      delete userInfo.password;
    }

    console.log("Enviando:", userInfo);

    const result = await editUser(user.id, userInfo);
    console.log("Resposta:", result);

    setClickSubmit(false);
    setOpen(false);
  };

  return (
    <div className="text-primaria">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpen(true)}>Editar usuário</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
            Copiar ID do usuário
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] text-primaria">
          <DialogHeader>
            <DialogTitle>Editar usuário</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" {...register("name")} />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="username">Nome de Usuário</Label>
              <Input id="username" {...register("username")} />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" {...register("password")} />
            </div>

            <div className="flex flex-row justify-between gap-4">
              <div className="flex-1">
                <Label>Filial</Label>
                <Controller
                  name="branch_id"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleciona a filial" />
                      </SelectTrigger>
                      <SelectContent>
                        {branchs.map((branch) => (
                          <SelectItem key={branch.id} value={`${branch.number}`}>
                            {branch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="flex-1">
                <Label>Nível de Acesso</Label>
                <Controller
                  name="access_level"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o nível" />
                      </SelectTrigger>
                      <SelectContent>
                        {accessLevels.map((access) => (
                          <SelectItem key={access.id} value={`${access.id}`}>
                            {access.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" className="bg-primaria">
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
