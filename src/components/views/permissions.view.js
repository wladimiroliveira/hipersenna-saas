"use client";

import { PenIcon, PlusIcon, SaveIcon, Trash2Icon } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ErrorAlert, SuccessAlert } from "./alert.view";
import { createPermission, deletePermission, patchPermission } from "../services/permissions.service";
import { useRouter } from "next/navigation";

export function EditPermissionsMenu({ permission }) {
  const router = useRouter();
  const [openEdit, setOpenEdit] = useState(false);
  const [alert, setAlert] = useState({});
  const [alertKey, setAlertKey] = useState(0);

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      id: permission.id,
      name: permission.name,
      description: permission.description,
    },
  });

  async function onSubmitForm(data) {
    const editPermissionsValue = await patchPermission(data);
    if (editPermissionsValue.ok) {
      setOpenEdit(false);
      router.refresh();
      setAlert({
        type: "success",
        statusCode: editPermissionsValue.status,
        title: "Sucesso",
        desc: "Permissão editada com sucesso!",
      });
      setAlertKey((prev) => prev + 1);
    } else {
      setOpenEdit(false);
      setAlert({
        type: "error",
        statusCode: editPermissionsValue.status,
        title: "Erro",
        desc: "Erro ao editar permissão",
      });
      setAlertKey((prev) => prev + 1);
    }
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
            <DialogTitle>Editar Permissão</DialogTitle>
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
      {alert?.type === "success" && <SuccessAlert key={alertKey} title={alert.title} desc={alert.desc} />}
      {alert?.type === "error" && (
        <ErrorAlert key={alertKey} statusCode={alert.statusCode} title={alert.title} desc={alert.desc} />
      )}
    </div>
  );
}

export function DeletePermissionsMenu({ permission }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [alert, setAlert] = useState({});
  const [alertKey, setAlertKey] = useState(0);

  const router = useRouter();

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      id: permission?.id,
      name: permission?.name,
      description: permission?.description,
    },
  });

  async function onSubmitForm(permission) {
    const deletePermissionValue = await deletePermission(permission);
    if (deletePermissionValue.ok) {
      setOpenEdit(false);
      router.refresh();
      setAlert({
        type: "success",
        statusCode: deletePermissionValue.status,
        title: "Sucesso",
        desc: "Permissão deletada com sucesso!",
      });
      setAlertKey((prev) => prev + 1);
    } else {
      setOpenEdit(false);
      setAlert({
        type: "error",
        statusCode: deletePermissionValue.status,
        title: "Erro",
        desc: "Erro ao deletar permissão",
      });
      setAlertKey((prev) => prev + 1);
    }
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
            <DialogTitle>Excluir Permissão</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div>
              <p>
                Tem certeza de que deseja excluir a permissão <strong>{permission?.name}</strong>
              </p>
            </div>
            <DialogFooter className="flex justify-between pt-4">
              <Button type="submit" className="bg-red-700 cursor-pointer hover:bg-red-800">
                Excluir <Trash2Icon />
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {alert?.type === "success" && <SuccessAlert key={alertKey} title={alert.title} desc={alert.desc} />}
      {alert?.type === "error" && (
        <ErrorAlert key={alertKey} statusCode={alert.statusCode} title={alert.title} desc={alert.desc} />
      )}
    </div>
  );
}

export function CreatePermissionsMenu() {
  const [openCreate, setOpenCreate] = useState(false);
  const [alert, setAlert] = useState({});
  const [alertKey, setAlertKey] = useState(0);

  const router = useRouter();

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmitForm(data) {
    const permissionCreateValue = await createPermission(data);
    if (permissionCreateValue.ok) {
      setOpenCreate(false);
      router.refresh();
      setAlert({
        type: "success",
        statusCode: permissionCreateValue.status,
        title: "Sucesso",
        desc: "Permissão criada com sucesso!",
      });
      setAlertKey((prev) => prev + 1);
    } else {
      setOpenCreate(false);
      setAlert({
        type: "error",
        statusCode: permissionCreateValue.status,
        title: "Erro",
        desc: "Erro ao criar permissão",
      });
      setAlertKey((prev) => prev + 1);
    }
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
        Nova Permissão
        <PlusIcon />
      </Button>
      <Dialog open={openCreate} onOpenChange={setOpenCreate}>
        <DialogContent className="sm:max-w-[425px] text-primaria">
          <DialogHeader>
            <DialogTitle>Criar Permissão</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-2">
            <Label>Nome</Label>
            <Input {...register("name")} placeholder="Digite o nome da permissão" />
            <Label>Descrição</Label>
            <Textarea {...register("description")} placeholder="Digite a descrição da permissão" />
            <DialogFooter className="flex justify-between pt-4">
              <Button type="submit" className="bg-quartenaria cursor-pointer hover:bg-hover-quartenaria">
                Criar <SaveIcon />
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {alert?.type === "success" && <SuccessAlert key={alertKey} title={alert.title} desc={alert.desc} />}
      {alert?.type === "error" && (
        <ErrorAlert key={alertKey} statusCode={alert.statusCode} title={alert.title} desc={alert.desc} />
      )}
    </div>
  );
}
