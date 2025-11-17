"use client";

import { useState } from "react";
import { SignUpForm } from "@/components/views/signUp.view";
import { ErrorAlert, SuccessAlert } from "@/components/views/alert.view";

export function SignUpController() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({});
  const [alertKey, setAlertKey] = useState(0);

  async function handleSubmit(data) {
    try {
      setLoading(true);
      const responseResult = await fetch("/api/v1/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            ...data[0],
            role: parseInt(data[0].role),
            branch_id: parseInt(data[0].branch_id),
            winthor_id: parseInt(data[0].winthor_id),
          },
        ]),
      });
      const responseValue = await responseResult.json();
      if (responseValue[0].status === 201) {
        setAlert({
          type: "success",
          statusCode: responseValue[0].status,
          title: "Sucesso",
          desc: responseValue[0].message,
        });
        setAlertKey((prev) => prev + 1);
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
    <div className="flex flex-row items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center gap-15 w-[40%] bg-secundaria">
        <SignUpForm onSubmitData={handleSubmit} loading={loading} />
      </div>
      {alert?.type === "success" && <SuccessAlert key={alertKey} title={alert.title} desc={alert.desc} />}
      {alert?.type === "error" && (
        <ErrorAlert key={alertKey} statusCode={alert.statusCode} title={alert.title} desc={alert.desc} />
      )}
    </div>
  );
}
