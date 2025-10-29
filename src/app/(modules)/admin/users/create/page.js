import { SignUpForm } from "@/app/ui/models/auth/signUp/signUpForm";

export default function Page() {
  return (
    <div className="pl-4 pr-4">
      <div className="pt-12 pb-12">
        <h1 className="text-4xl text-primaria font-bold">Criar usuário</h1>
      </div>
      <div className="flex flex-row w-full min-h-[90vh] pt-0 p-8">
        <SignUpForm />
      </div>
    </div>
  );
}
