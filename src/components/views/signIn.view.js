"use client";

import { useState } from "react";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "@/components/models/signIn.model";
import { AlertAuth } from "@/components/views/alertsAuth.view";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import clsx from "clsx";

export function SignInForm() {
  const [reply, setReply] = useState({});
  const [clickSubmit, setClickSubmit] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [inputType, setInputType] = useState("password");

  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm();
  const handleSubmit = async (data) => {
    if (!clickSubmit) {
      setClickSubmit(true);
      const signInValue = await signIn(data);
      setReply(signInValue);
      setShowResponse(true);
      if (signInValue[0].status === 200) {
        redirect("/home");
      } else {
        setClickSubmit(false);
      }
    }
  };
  return (
    <div className="w-[80%] m-auto">
      <form onSubmit={onSubmit(handleSubmit)} className="w-full max-w-md m-auto">
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
              />
            </Field>
            <Field className="gap-0">
              <FieldLabel htmlFor="password" className="font-normal text-base text-primaria">
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
            <div className="flex w-[55%] justify-end">Login</div>
          </Button>
        </FieldSet>
        <div className="pt-6">
          {showResponse && <AlertAuth response={reply[0].status} message={reply[0].message} />}
        </div>
      </form>
    </div>
  );
}
