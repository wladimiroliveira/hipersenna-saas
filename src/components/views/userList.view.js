"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { EyeClosedIcon, EyeIcon, UserPlusIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { getRoles } from "../services/role.service";
import branches from "@/files/branches.json";
import { Spinner } from "../ui/spinner";
import { ErrorAlert, SuccessAlert } from "./alert.view";
import { signUpModel } from "../services/signUp.service";
import { useRolesStore } from "@/store/roles.store";

export function CreateUserModal() {
  const [openCreate, setOpenCreate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({});
  const [alertKey, setAlertKey] = useState(0);
  const [inputType, setInputType] = useState("password");
  const router = useRouter();
  const { roles } = useRolesStore.getState();

  async function onSubmitForm(data) {
    try {
      setLoading(true);
      const createUserValue = await signUpModel({
        ...data,
        branch_id: Number(data?.branch_id),
        role_id: Number(data?.role_id),
        winthor_id: Number(data?.winthor_id),
      });
      if (createUserValue.ok) {
        setOpenCreate(false);
        router.refresh();
        setAlert({
          type: "success",
          statusCode: createUserValue.status,
          title: "Sucesso",
          desc: "Usuário criado com sucesso!",
        });
        setAlertKey((prev) => prev + 1);
      } else {
        setOpenCreate(false);
        setAlert({
          type: "error",
          statusCode: createUserValue?.status,
          title: "Erro",
          desc: createUserValue?.message,
        });
        setAlertKey((prev) => prev + 1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      password: "",
      branch_id: "",
      winthor_id: "",
      role_id: "",
    },
  });

  return (
    <div>
      <Button
        type="button"
        onClick={() => {
          setOpenCreate(true);
        }}
        className="bg-quartenaria text-secundaria hover:text-secundaria hover:bg-hover-quartenaria cursor-pointer"
      >
        Novo Usuário
        <UserPlusIcon />
      </Button>
      <Dialog open={openCreate} onOpenChange={setOpenCreate}>
        <DialogContent className="sm:max-w-md text-primaria">
          <DialogHeader>
            <DialogTitle>Criar Usuário</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name" className="text-primaria">
                    Nome Completo
                  </FieldLabel>
                  <Input id="name" type="text" placeholder="Nome completo" {...register("name")} required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="username" className="text-primaria">
                    Nome de Usuário
                  </FieldLabel>
                  <Input id="username" type="text" placeholder="Nome de Usuário" {...register("username")} required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="password" className="text-primaria">
                    Senha
                  </FieldLabel>
                  <div className="flex gap-2">
                    <Input
                      id="password"
                      type={inputType}
                      placeholder="********"
                      {...register("password")}
                      className="bg-[url(/signin/lock.svg)] bg-no-repeat bg-[.7rem] pl-8 pr-8"
                    />
                    <Button
                      tabIndex={-1}
                      type="button"
                      variant="outline"
                      className="text-primaria"
                      onClick={(e) => {
                        e.preventDefault();
                        inputType === "password" ? setInputType("text") : setInputType("password");
                      }}
                    >
                      {inputType === "password" ? <EyeClosedIcon /> : <EyeIcon />}
                    </Button>
                  </div>
                </Field>

                <Field>
                  <FieldLabel htmlFor="winthor_id">Matrícula</FieldLabel>
                  <Input
                    id="winthor_id"
                    type="number"
                    placeholder="Matrícula do winthor"
                    {...register("winthor_id")}
                    required
                  />
                </Field>
              </FieldGroup>
              <FieldGroup className="flex-row">
                <Field>
                  <FieldLabel htmlFor="branch_id">Filial</FieldLabel>
                  <Controller
                    name="branch_id"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a filial" />
                        </SelectTrigger>
                        <SelectContent>
                          {branches.map((branch) => (
                            <SelectItem key={branch?.id} value={String(branch?.number)}>
                              {branch?.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="role_id">Cargo</FieldLabel>
                  <Controller
                    name="role_id"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Cargo" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles ? (
                            roles.map((role) => (
                              <SelectItem key={role?.id} value={String(role?.id)} className="capitalize">
                                {role?.name}
                              </SelectItem>
                            ))
                          ) : (
                            <></>
                          )}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>
              </FieldGroup>
              <Button type="submit" disabled={loading}>
                {loading ? <Spinner /> : "Criar Usuário"}
              </Button>
            </FieldSet>
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
