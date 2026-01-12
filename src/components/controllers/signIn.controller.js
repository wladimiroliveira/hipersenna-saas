"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import { SignInForm } from "@/components/views/signIn.view";
import { signIn } from "@/components/services/signIn.service";
import { ErrorAlert, SuccessAlert } from "@/components/views/alert.view";
import { useUserStore } from "@/store/user.store";

export function SignInController() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({});
  const [alertKey, setAlertKey] = useState(0);

  async function handleSubmit(data) {
    try {
      setLoading(true);
      const signInValue = await signIn(data);
      if (signInValue.ok) {
        setAlert({
          type: "success",
          statusCode: signInValue.status,
          title: "Sucesso",
          desc: signInValue.message,
        });
        useUserStore.getState().setUser({
          id: signInValue?.id,
          name: signInValue?.name,
          username: signInValue?.username,
          winthor_id: signInValue?.winthor_id,
          branch_id: signInValue?.branch_id,
          role_id: signInValue?.role_id,
          permissions: signInValue?.user?.allPermissions,
        });
        setAlertKey((prev) => prev + 1);
        redirect("/home");
      } else {
        setAlert({
          type: "error",
          statusCode: signInValue.status,
          title: "Erro",
          desc: signInValue.message,
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
      <div className="flex flex-col items-center justify-center gap-15 w-full pb-40">
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
