"use client";

import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import clsx from "clsx";

import roles from "@/files/roles.json";
import branches from "@/files/branches.json";

export function SignUpForm({ onSubmitData, loading }) {
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
      role: "",
    },
  });

  const getData = (data) => {
    onSubmitData([data]);
  };

  return (
    <form onSubmit={onSubmit(getData)} className="w-full max-w-md ml-auto mr-auto">
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
            <div className="flex flex-row border-1 border-primaria mb-2 rounded-md">
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
                    {branches.map((branch) => {
                      return (
                        <SelectItem key={branch.id} value={String(branch.number)}>
                          {branch.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
          <Field className="gap-0">
            <FieldLabel htmlFor="branch_id" className="text-primaria">
              Função
            </FieldLabel>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value} required>
                  <SelectTrigger className="border-primaria">
                    <SelectValue placeholder="Função" />
                  </SelectTrigger>
                  <SelectContent className="border-primaria">
                    {roles.map((role) => {
                      return (
                        <SelectItem key={role.id} value={String(role.id)}>
                          {role.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
        </FieldGroup>
        <Button
          className={clsx("flex flex-row-reverse", {
            "pointer-events-none bg-gray-600": loading === true,
            "pointer-events-auto": loading === false,
          })}
        >
          <div className="flex justify-end w-[45%]">
            <svg
              className={clsx("size-5 animate-spin border-3 border-secundaria border-t-primaria rounded-[50%]", {
                block: loading === true,
                hidden: loading === false,
              })}
              viewBox="0 0 24 24"
            ></svg>
          </div>
          <div className="flex w-[55%] justify-end">Cadastrar</div>
        </Button>
      </FieldSet>
    </form>
  );
}
