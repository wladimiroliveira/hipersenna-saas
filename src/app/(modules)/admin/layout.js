import { Navigation } from "@/app/ui/components/navigation";
import { cookies } from "next/headers";
import { getSession } from "@/app/ui/models/auth/getSession/getSessionFunction";
import { Footer } from "@/app/ui/components/footer";

export default async function Layout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const session = await getSession(token);
  return (
    <>
      <header>
        <nav className="w-full">
          <Navigation username={session[1].username} token={token} />
        </nav>
      </header>
      <div>
        {children}
        <Footer />
      </div>
    </>
  );
}
