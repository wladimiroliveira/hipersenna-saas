import "../../globals.css";
import { Navigation } from "@/components/views/navigation.view";

export default function Layout({ children }) {
  return (
    <>
      <header>
        <nav className="w-full fixed z-10">
          <Navigation />
        </nav>
      </header>
      <main className="pt-16 pb-4 px-8 max-w-7xl m-auto">{children}</main>
    </>
  );
}
