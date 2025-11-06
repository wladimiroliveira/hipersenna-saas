"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import { SignInForm } from "@/components/views/signIn.view";
import { signIn } from "@/components/models/signIn.model";
import { ErrorAlert, SuccessAlert } from "@/components/views/alert.view";

export function SignInController() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({});
  const [alertKey, setAlertKey] = useState(0);

  async function handleSubmit(data) {
    try {
      setLoading(true);
      const responseValue = await signIn(data);
      if (responseValue[0].status === 200) {
        setAlert({
          type: "success",
          statusCode: responseValue[0].status,
          title: "Sucesso",
          desc: responseValue[0].message,
        });
        setAlertKey((prev) => prev + 1);
        redirect("/home");
      } else {
        setAlert({
          type: "error",
          statusCode: responseValue[0].status,
          title: "Erro",
          desc: responseValue[0].message,
        });
        setAlertKey((prev) => prev + 1);
      }
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-row items-center justify-center min-h-lvh h-full">
      <div className="flex flex-col items-center justify-center gap-15 w-[40%] bg-secundaria">
        <h1 className="text-4xl font-bold text-primaria">GHS Sistema</h1>
        <SignInForm onSubmitData={handleSubmit} loading={loading} />
      </div>
      {alert?.type === "success" && <SuccessAlert key={alertKey} title={alert.title} desc={alert.desc} />}
      {alert?.type === "error" && (
        <ErrorAlert key={alertKey} statusCode={alert.statusCode} title={alert.title} desc={alert.desc} />
      )}
    </div>
  );
}
