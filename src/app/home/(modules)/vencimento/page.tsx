import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if ( !session ) {
    redirect('/')
  } else if ( session.user.access_level !== 1 ) {
    redirect('/')
  }

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}