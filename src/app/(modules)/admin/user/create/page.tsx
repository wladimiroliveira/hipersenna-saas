import { SignupForm } from "@/app/ui/_components/signupForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session || session.user.access_level !== 1) {
    redirect('/')
  }

  return (
    <div>
      <SignupForm />
    </div>
  );
}