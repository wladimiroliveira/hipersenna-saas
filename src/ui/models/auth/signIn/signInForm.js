"use client";

import { useState } from "react";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { signUp } from "@/ui/components/auth/signUp/signUpFunction";
import { SignUpSuccess } from "@/ui/components/auth/signUp/alertsSignUp";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";

export function SignInForm() {
  const [user, setUser] = useState("");
  const [reply, setReply] = useState("");
  const [showResponse, setShowResponse] = useState(false);

  const {
    register,
    handleSubmit: onSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const handleSubmit = async (data) => {
    const { response, result } = await signUp(data);
    setUser(data.username);
    setReply(response.status);
    setShowResponse(true);
  };
  return (
    <form onSubmit={onSubmit(handleSubmit)} className="w-full max-w-md m-auto">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Nome Completo</FieldLabel>
            <FieldDescription>Escreva o nome completo do usuário</FieldDescription>
            <Input id="name" type="text" placeholder="Nome Completo" {...register("name")} />
          </Field>
          <Field>
            <FieldLabel htmlFor="username">Nome de Usuário</FieldLabel>
            <FieldDescription>Escreva um nome de usuário único</FieldDescription>
            <Input id="username" type="text" placeholder="Nome de Usuário" {...register("username")} />
          </Field>
          <Field>
            <FieldLabel htmlFor="winthor_id">Matrícula</FieldLabel>
            <FieldDescription>Insira a matrícula do WinThor do usuário</FieldDescription>
            <Input id="winthor_id" type="number" placeholder="Matrícula" {...register("winthor_id")} />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            <FieldDescription>Digite uma senha de no mínimo 8 dígitos</FieldDescription>
            <Input id="password" type="password" placeholder="********" {...register("password")} />
          </Field>
        </FieldGroup>
        <FieldGroup className="flex flex-row">
          <Field>
            <FieldLabel>Filial</FieldLabel>
            <Controller
              name="branch_id"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a filial" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Matriz</SelectItem>
                    <SelectItem value="2">2 - Faruk</SelectItem>
                    <SelectItem value="3">3 - Carajás</SelectItem>
                    <SelectItem value="4">4 - VS10</SelectItem>
                    <SelectItem value="5">5 - Xinguara</SelectItem>
                    <SelectItem value="7">7 - Cidade Jardim</SelectItem>
                    <SelectItem value="8">8 - Canaã</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
          <Field>
            <FieldLabel>Nível de acesso</FieldLabel>
            <Controller
              name="access_level"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o nível de acesso" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Admin</SelectItem>
                    <SelectItem value="2">TI</SelectItem>
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
        <Button>CADASTRAR</Button>
      </FieldSet>
      <div className="pt-6">{showResponse && <SignUpSuccess username={user} response={response.status} />}</div>
    </form>
  );
}
