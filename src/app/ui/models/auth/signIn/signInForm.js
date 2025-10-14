"use client";

import { useState } from "react";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "./signInFunction";
import { AlertAuth } from "@/app/ui/models/auth/alertsAuth";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";

export function SignInForm() {
  const [user, setUser] = useState("");
  const [reply, setReply] = useState({});
  const [showResponse, setShowResponse] = useState(false);

  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm();
  const handleSubmit = async (data) => {
    const result = await signIn(data);
    setUser(data.username);
    setReply(result);
    setShowResponse(true);
    if (result[0].ok) {
      redirect("/home");
    }
  };
  return (
    <form onSubmit={onSubmit(handleSubmit)} className="w-full max-w-md m-auto">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="username">Nome de Usuário</FieldLabel>
            <FieldDescription>Escreva um nome de usuário único</FieldDescription>
            <Input id="username" type="text" placeholder="Nome de Usuário" {...register("username")} />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            <FieldDescription>Digite uma senha de no mínimo 8 dígitos</FieldDescription>
            <Input id="password" type="password" placeholder="********" {...register("password")} />
          </Field>
        </FieldGroup>
        <Button>Entrar</Button>
      </FieldSet>
      <div className="pt-6">{showResponse && <AlertAuth response={reply[0].status} message={reply[1].message} />}</div>
    </form>
  );
}
