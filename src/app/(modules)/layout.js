import { Navigation } from "@/components/views/navigation.view";
import { Footer } from "@/components/views/footer.view";

export default async function Layout({ children }) {
  return (
    <>
      <header>
        <nav className="w-full fixed z-1">
          <Navigation />
        </nav>
      </header>
      <div className="pt-[64px] max-w-[1260px] m-auto">
        <div
          className="pl-4 pr-4"
          style={{
            minHeight: "calc(100vh - 64px)",
          }}
        >
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}
