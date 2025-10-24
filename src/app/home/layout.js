import { Navigation } from "@/app/ui/components/navigation";

export default function Layout({ children }) {
  return (
    <>
      <header>
        <nav className="w-full">
          <Navigation username="wladimir.moraes" />
        </nav>
      </header>
      <div>{children}</div>
    </>
  );
}
