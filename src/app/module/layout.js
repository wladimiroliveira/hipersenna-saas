import { Navigation } from "@/components/views/navigation.view";
import { getUserInfo } from "@/backend/auth/getUserInfo";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const session = await getUserInfo();
  if (!session || session.error) {
    redirect("/login");
  }

  const username = session[0].username;
  const permissions = session[0].hsusers_permissions;
  const role = session[0].hsusers_roles[0].role_id;

  return (
    <>
      <header>
        <nav className="w-full fixed">
          <Navigation username={username} permissions={permissions} role={role} />
        </nav>
      </header>
      <div className="pt-[64px] max-w-[1260px] m-auto">{children}</div>
    </>
  );
}
