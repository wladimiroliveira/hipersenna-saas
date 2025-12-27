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
      <div className="pt-16 pl-8 pr-8 max-w-7xl m-auto">{children}</div>
    </>
  );
}
