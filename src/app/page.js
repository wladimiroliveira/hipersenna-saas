import { SignInForm } from "@/app/ui/models/auth/signIn/signInForm";

export default function Page() {
  return (
    <div className="flex flex-col p-8 items-center justify-center min-h-lvh h-full">
      <SignInForm />
    </div>
  );
}
