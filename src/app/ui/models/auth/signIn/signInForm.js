"use client";

import { useState } from "react";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "./signInFunction";
import { AlertAuth } from "@/app/ui/models/auth/alertsAuth";
import { useForm } from "react-hook-form";

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
    const { response, result } = await signIn(data);
    setUser(data.username);
    setReply({ response, result });
    setShowResponse(true);
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
      <div className="pt-6">
        {showResponse && <AlertAuth response={reply.response.status} message={reply.result.message} />}
      </div>
    </form>
  );
}
