import { Navigation } from "@/app/ui/components/navigation";
import { Footer } from "@/app/ui/components/footer";

export default async function Layout({ children }) {
  return (
    <>
      <header>
        <nav className="w-full fixed z-1">
          <Navigation />
        </nav>
      </header>
      <div className="pt-[64px] max-w-[1060px] m-auto">
        {children}
        <Footer />
      </div>
    </>
  );
}
