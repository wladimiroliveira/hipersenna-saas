import { SignUpForm } from "@/app/ui/models/auth/signUp/signUpForm";

export default function Page() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full h-lvh p-8">
        <SignUpForm />
      </div>
    </div>
  );
}
