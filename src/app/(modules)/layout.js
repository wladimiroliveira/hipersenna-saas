import { Navigation } from "@/components/views/navigation.view";
import { getSession } from "@/backend/auth/getSession";

export default async function Layout({ children }) {
  const session = await getSession();

  return (
    <>
      <header>
        <nav className="w-full fixed">
          <Navigation session={session} />
        </nav>
      </header>
      <div className="pt-[64px] max-w-[1260px] m-auto">{children}</div>
    </>
  );
}
