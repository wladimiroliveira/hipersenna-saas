"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import { SignInForm } from "@/components/views/signIn.view";
import { signIn } from "@/components/services/signIn.service";
import { useUserStore } from "@/store/user.store";
import { toast } from "sonner";

export function SignInController() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    try {
      setLoading(true);
      const signInValue = await signIn(data);
      if (signInValue.ok) {
        useUserStore.getState().setUser({
          id: signInValue?.id,
          name: signInValue?.name,
          username: signInValue?.username,
          winthor_id: signInValue?.winthor_id,
          branch_id: signInValue?.branch_id,
          role_id: signInValue?.role_id,
          permissions: signInValue?.user?.allPermissions,
        });
        redirect("/home");
      } else {
        toast.error("Erro", {
          description: signInValue?.message,
          action: {
            label: "Ok",
          },
        });
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
        <div className="flex items-center">
          <h1 className="text-4xl font-bold">GHS Sistema</h1>
        </div>
        <SignInForm onSubmitData={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}
