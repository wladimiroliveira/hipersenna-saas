"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { clsx } from "clsx";

import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "../ui/spinner";
import { EyeClosedIcon, EyeIcon } from "lucide-react";

export function SignInForm({ onSubmitData, loading }) {
  const [inputType, setInputType] = useState("password");

  const { register, handleSubmit: onSubmit } = useForm();
  const getData = (data) => {
    onSubmitData([data]);
  };
  return (
    <div className="w-[80%] m-auto">
      <form onSubmit={onSubmit(getData)} className="w-full max-w-md m-auto">
        <FieldSet className="gap-6">
          <h2 className="text-2xl font-semibold text-primaria">Login</h2>
          <FieldGroup className="gap-2">
            <Field className="gap-0">
              <FieldLabel htmlFor="username" className="font-normal text-base text-primaria">
                Nome de Usuário
              </FieldLabel>
              <Input
                id="username"
                type="text"
                placeholder="Nome de Usuário"
                {...register("username")}
                className="bg-[url(/signin/user.svg)] bg-no-repeat bg-[.7rem] pl-8 pr-8"
                required
              />
            </Field>
            <Field className="gap-0">
              <FieldLabel htmlFor="password" className="font-normal text-base text-primaria">
                Senha
              </FieldLabel>
              <div className="flex flex-row gap-4 rounded-md">
                <Input
                  id="password"
                  type={inputType}
                  placeholder="********"
                  {...register("password")}
                  className="bg-[url(/signin/lock.svg)] bg-no-repeat bg-[.7rem] pl-8 pr-8"
                  required
                />
                <Button
                  type="button"
                  tabIndex={-1}
                  variant="outline"
                  onClick={() => {
                    inputType === "password" ? setInputType("text") : setInputType("password");
                  }}
                >
                  {inputType === "password" ? <EyeClosedIcon /> : <EyeIcon />}
                </Button>
              </div>
            </Field>
          </FieldGroup>
          <Button type="submit" disabled={loading} className="flex flex-row-reverse">
            {loading ? <Spinner /> : "Login"}
          </Button>
        </FieldSet>
      </form>
    </div>
  );
}
