import { Navigation } from "@/app/ui/components/navigation";
import { Footer } from "@/app/ui/components/footer";

export default async function Layout({ children }) {
  return (
    <>
      <header>
        <nav className="w-full">
          <Navigation />
        </nav>
      </header>
      <div>
        {children}
        <Footer />
      </div>
    </>
  );
}
