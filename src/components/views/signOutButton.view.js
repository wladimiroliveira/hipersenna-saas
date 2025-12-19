"use client";

import { signOut } from "@/components/services/signOut.service";
import { useUserStore } from "@/store/user.store";
import { redirect } from "next/navigation";
import { useState } from "react";

export function SignOutButton({ children, className }) {
  const [clickSubmit, setClickSubmit] = useState(false);
  async function out() {
    try {
      if (clickSubmit) {
        return;
      }
      setClickSubmit(true);
      const signOutValue = await signOut();
      if (signOutValue.ok) {
        useUserStore.persist.clearStorage();
        redirect("/login");
      }
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setClickSubmit(false);
    }
  }
  return (
    <button onClick={out} className={className}>
      {children}
    </button>
  );
}
