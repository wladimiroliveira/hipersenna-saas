"use client";

import { PenIcon, PlusIcon, SaveIcon, Trash2Icon } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

export function EditRoleMenu({ role }) {
  const [openEdit, setOpenEdit] = useState(false);

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      name: role.name,
      description: role.description,
    },
  });

  async function onSubmitForm(data) {
    console.log(data);
  }

  return (
    <div>
      <Button
        variant="ghost"
        className="cursor-pointer"
        onClick={() => {
          setOpenEdit(true);
        }}
      >
        <PenIcon />
      </Button>
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="sm:max-w-[425px] text-primaria">
          <DialogHeader>
            <DialogTitle>Editar cargo</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-2">
            <Label>Nome</Label>
            <Input {...register("name")} />
            <Label>Descrição</Label>
            <Textarea {...register("description")} />
            <DialogFooter className="flex justify-between pt-4">
              <Button type="submit" className="bg-primaria">
                Salvar <SaveIcon />
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function DeleteRoleMenu({ role }) {
  const [openEdit, setOpenEdit] = useState(false);

  async function onSubmitForm(data) {
    console.log(data);
  }

  return (
    <div>
      <Button
        variant="ghost"
        className="cursor-pointer"
        onClick={() => {
          setOpenEdit(true);
        }}
      >
        <Trash2Icon className="text-red-700" />
      </Button>
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="sm:max-w-[425px] text-primaria">
          <DialogHeader>
            <DialogTitle>Excluir cargo</DialogTitle>
          </DialogHeader>
          <div>
            <p>
              Tem certeza de que deseja excluir o cargo <strong>{role.name}</strong>
            </p>
          </div>
          <DialogFooter className="flex justify-between pt-4">
            <Button type="submit" className="bg-red-700 cursor-pointer hover:bg-red-800">
              Excluir <Trash2Icon />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function CreateRoleMenu() {
  const [openCreate, setOpenCreate] = useState(false);

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmitForm(data) {
    console.log(data);
  }

  return (
    <div>
      <Button
        variant="ghost"
        className="bg-quartenaria text-secundaria hover:text-secundaria cursor-pointer hover:bg-hover-quartenaria"
        onClick={() => {
          setOpenCreate(true);
        }}
      >
        Novo Cargo
        <PlusIcon />
      </Button>
      <Dialog open={openCreate} onOpenChange={setOpenCreate}>
        <DialogContent className="sm:max-w-[425px] text-primaria">
          <DialogHeader>
            <DialogTitle>Criar cargo</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-2">
            <Label>Nome</Label>
            <Input {...register("name")} placeholder="Digite o nome do cargo" />
            <Label>Descrição</Label>
            <Textarea {...register("description")} placeholder="Digite a descrição do cargo" />
            <DialogFooter className="flex justify-between pt-4">
              <Button type="submit" className="bg-quartenaria cursor-pointer hover:bg-hover-quartenaria">
                Criar <SaveIcon />
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
