"use client";

import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertAuth } from "@/app/ui/models/auth/alertsAuth";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { signUp } from "./signUpFunction";

export function SignUpForm() {
  const [reply, setReply] = useState({});
  const [showResponse, setShowResponse] = useState(false);
  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
    control,
  } = useForm();
  const handleSubmit = async (data) => {
    const userInfo = {
      name: data.name,
      username: data.username,
      password: data.password,
      branch_id: parseInt(data.branch_id),
      winthor_id: parseInt(data.winthor_id),
    };
    const result = await signUp(userInfo);
    setReply(result);
    setShowResponse(true);
    useEffect(() => {
      console.log("reply atualizado:", reply);
    }, [reply]);
  };
  return (
    <form onSubmit={onSubmit(handleSubmit)} className="w-full max-w-md m-auto">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Nome Completo</FieldLabel>
            <FieldDescription>Digite o nome completo do usuário</FieldDescription>
            <Input id="name" type="text" placeholder="Nome completo" {...register("name")} required />
          </Field>
          <Field>
            <FieldLabel htmlFor="username">Nome de Usuário</FieldLabel>
            <FieldDescription>Escreva um nome de usuário único</FieldDescription>
            <Input id="username" type="text" placeholder="Nome de Usuário" {...register("username")} required />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            <FieldDescription>Digite uma senha de no mínimo 8 dígitos</FieldDescription>
            <Input id="password" type="password" placeholder="********" {...register("password")} required />
          </Field>
        </FieldGroup>
        <FieldGroup className="flex flex-row">
          <Field>
            <FieldLabel htmlFor="winthor_id">Matrícula</FieldLabel>
            <FieldDescription>Digite a matrícula do usuário</FieldDescription>
            <Input
              id="winthor_id"
              type="number"
              placeholder="Matrícula do winthor"
              {...register("winthor_id")}
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="branch_id">Filial</FieldLabel>
            <FieldDescription>Selecione a filial do usuário</FieldDescription>
            <Controller
              name="branch_id"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Filial" />
                  </SelectTrigger>
                  <SelectContent>
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
        </FieldGroup>
        <Button>Cadastrar</Button>
      </FieldSet>
      <div className="pt-6">{showResponse && <AlertAuth response={reply[0].status} message={reply[1].message} />}</div>
    </form>
  );
}
