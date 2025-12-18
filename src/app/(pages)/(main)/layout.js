import "../../globals.css";
import { Navigation } from "@/components/views/navigation.view";

export default function Layout({ children }) {
  return (
    <>
      <header>
        <nav className="w-full fixed">
          <Navigation />
        </nav>
      </header>
      <div className="pt-16 max-w-7xl m-auto">{children}</div>
    </>
  );
}
