"use client";

import { signOut } from "../models/auth/signOut/signOutFunction";
import { redirect } from "next/navigation";
import { useState } from "react";

export function SignOutButton({ children, className, token }) {
  const [clickSubmit, setClickSubmit] = useState(false);
  function out(token) {
    if (!clickSubmit) {
      signOut(token).then(redirect("/"));
    } else {
      setClickSubmit(true);
    }
  }
  return (
    <button
      onClick={() => {
        out(token);
      }}
      className={className}
    >
      {children}
    </button>
  );
}
