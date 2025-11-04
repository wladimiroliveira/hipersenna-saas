import { Navigation } from "@/components/views/navigation.view";
import { Footer } from "@/components/views/footer.view";

export default async function Layout({ children }) {
  return (
    <>
      <header>
        <nav className="w-full fixed">
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
