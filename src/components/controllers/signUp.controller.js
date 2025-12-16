"use client";

import { useState } from "react";
import { SignUpForm } from "@/components/views/signUp.view";
import { signUpModel } from "@/lib/models/signUp.model";
import { ErrorAlert, SuccessAlert } from "@/components/views/alert.view";

export function SignUpController() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({});
  const [alertKey, setAlertKey] = useState(0);

  async function handleSubmit(data) {
    try {
      setLoading(true);
      const signUpValue = await signUpModel([
        {
          name: data[0].name,
          username: data[0].username,
          password: data[0].password,
          branch_id: Number(data[0].branch_id),
          winthor_id: Number(data[0].winthor_id),
          role_id: Number(data[0].role),
        },
      ]);
      console.log(signUpValue);
      if (signUpValue.ok) {
        setAlert({
          type: "success",
          statusCode: signUpValue.status,
          title: "Sucesso",
          desc: signUpValue.message,
        });
        setAlertKey((prev) => prev + 1);
      } else {
        setAlert({
          type: "error",
          statusCode: signUpValue.status,
          title: "Erro",
          desc: signUpValue.message,
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
    <div className="flex flex-row items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center gap-15 w-full bg-secundaria">
        <SignUpForm onSubmitData={handleSubmit} loading={loading} />
      </div>
      {alert?.type === "success" && <SuccessAlert key={alertKey} title={alert.title} desc={alert.desc} />}
      {alert?.type === "error" && (
        <ErrorAlert key={alertKey} statusCode={alert.statusCode} title={alert.title} desc={alert.desc} />
      )}
    </div>
  );
}
