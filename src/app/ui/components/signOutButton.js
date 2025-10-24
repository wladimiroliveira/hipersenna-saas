import { signOut } from "../models/auth/signOut/signOutFunction";
import { redirect } from "next/navigation";

export function SignOutButton({ children, className, token }) {
  function out(token) {
    signOut(token).then(redirect("/"));
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
