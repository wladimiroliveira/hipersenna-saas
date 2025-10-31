"use client";

import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertAuth } from "@/app/ui/models/auth/alertsAuth";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { signUp } from "./signUpFunction";
import clsx from "clsx";

export function SignUpForm() {
  const [reply, setReply] = useState({});
  const [clickSubmit, setClickSubmit] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [inputType, setInputType] = useState("password");
  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      password: "",
      branch_id: "",
      winthor_id: "",
      access_level: "",
    },
  });
  const handleSubmit = async (data) => {
    if (!clickSubmit) {
      setClickSubmit(true);
      const userInfo = {
        name: data.name,
        username: data.username,
        password: data.password,
        branch_id: parseInt(data.branch_id),
        winthor_id: parseInt(data.winthor_id),
        access_level: parseInt(data.access_level),
      };
      const result = await signUp(userInfo);
      setReply(result);
      setShowResponse(true);
      setClickSubmit(false);
      if (result[0].ok) {
        reset();
      }
    }
  };
  return (
    <form onSubmit={onSubmit(handleSubmit)} className="w-full max-w-md ml-auto mr-auto">
      <FieldSet className="gap-0">
        <FieldGroup className="gap-0">
          <h2 className="text-2xl text-primaria font-semibold mb-4">Criar</h2>
          <Field className="gap-0">
            <FieldLabel htmlFor="name" className="text-primaria">
              Nome Completo
            </FieldLabel>
            <Input id="name" type="text" placeholder="Nome completo" {...register("name")} required className="mb-2" />
          </Field>
          <Field className="gap-0">
            <FieldLabel htmlFor="username" className="text-primaria">
              Nome de Usuário
            </FieldLabel>
            <Input
              id="username"
              type="text"
              placeholder="Nome de Usuário"
              {...register("username")}
              required
              className="mb-2"
            />
          </Field>
          <Field className="gap-0">
            <FieldLabel htmlFor="password" className="text-primaria">
              Senha
            </FieldLabel>
            <div className="flex flex-row border-1 border-primaria rounded-md">
              <Input
                id="password"
                type={inputType}
                placeholder="********"
                {...register("password")}
                className="bg-[url(/signin/lock.svg)] bg-no-repeat bg-[.7rem] pl-8 pr-8 border-0"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (inputType === "password") {
                    setInputType("text");
                  } else {
                    setInputType("password");
                  }
                }}
                className={clsx(
                  "bg-no-repeat bg-center w-[36px] h-[36px] bg-transparent hover:bg-transparent cursor-pointer",
                  {
                    "bg-[url(/signin/open-eye.svg)] bg-no-repeat bg-center": inputType === "text",
                    "bg-[url(/signin/close-eye.svg)] bg-no-repeat bg-center": inputType === "password",
                  },
                )}
              ></button>
            </div>
          </Field>
          <Field className="gap-0">
            <FieldLabel htmlFor="winthor_id" className="text-primaria">
              Matrícula
            </FieldLabel>
            <Input
              id="winthor_id"
              type="number"
              placeholder="Matrícula do winthor"
              {...register("winthor_id")}
              required
              className="mb-2"
            />
          </Field>
        </FieldGroup>
        <FieldGroup className="flex flex-row mb-4">
          <Field className="gap-0">
            <FieldLabel htmlFor="branch_id" className="text-primaria">
              Filial
            </FieldLabel>
            <Controller
              name="branch_id"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value} required>
                  <SelectTrigger className="border-primaria">
                    <SelectValue placeholder="Seleciona a filial" />
                  </SelectTrigger>
                  <SelectContent className="border-primaria">
                    <SelectItem value="1">Matriz</SelectItem>
                    <SelectItem value="2">Faruk</SelectItem>
                    <SelectItem value="3">Carajás</SelectItem>
                    <SelectItem value="4">VS10</SelectItem>
                    <SelectItem value="5">Xinguara</SelectItem>
                    <SelectItem value="7">Cidade Jardim</SelectItem>
                    <SelectItem value="8">Canaã</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
          <Field className="gap-0">
            <FieldLabel htmlFor="branch_id" className="text-primaria">
              Nível de Acesso
            </FieldLabel>
            <Controller
              name="access_level"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value} required>
                  <SelectTrigger className="border-primaria">
                    <SelectValue placeholder="Seleciona a filial" />
                  </SelectTrigger>
                  <SelectContent className="border-primaria">
                    <SelectItem value="1">Admin</SelectItem>
                    <SelectItem value="2">Ti</SelectItem>
                    <SelectItem value="3">Gerente</SelectItem>
                    <SelectItem value="4">Encarregado</SelectItem>
                    <SelectItem value="5">Fiscal de Caixa</SelectItem>
                    <SelectItem value="6">Operador(a) de Caixa</SelectItem>
                    <SelectItem value="7">Estoquista</SelectItem>
                    <SelectItem value="8">Repositor</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
        </FieldGroup>
        <Button
          className={clsx("flex flex-row-reverse", {
            "pointer-events-none bg-gray-600": clickSubmit === true,
            "pointer-events-auto": clickSubmit === false,
          })}
        >
          <div className="flex justify-end w-[45%]">
            <svg
              className={clsx("size-5 animate-spin border-3 border-secundaria border-t-primaria rounded-[50%]", {
                block: clickSubmit === true,
                hidden: clickSubmit === false,
              })}
              viewBox="0 0 24 24"
            ></svg>
          </div>
          <div className="flex w-[55%] justify-end">Cadastrar</div>
        </Button>
      </FieldSet>
      <div className="pt-6">{showResponse && <AlertAuth response={reply[0].status} message={reply[1].message} />}</div>
    </form>
  );
}
