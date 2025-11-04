import Image from "next/image";
import { SignInForm } from "@/components/views/signIn.view";

export default function Page() {
  return (
    <div className="flex flex-row items-center justify-center min-h-lvh h-full">
      <div className="flex flex-col items-center justify-center gap-15 w-[40%] bg-secundaria">
        <h1 className="text-4xl font-bold text-primaria">GHS Sistema</h1>
        <SignInForm />
      </div>
      <div className="flex items-center justify-center w-[60%] h-lvh bg-primaria">
        <Image src="/homepage/person.svg" alt="Person" width={400} height={310} />
      </div>
    </div>
  );
}
