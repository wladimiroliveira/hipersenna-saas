import "../globals.css";
import { Navigation } from "@/components/views/navigation.view";
import { roboto } from "@/components/fonts";

export default function Layout({ children }) {
  return (
    <>
      <html lang="pt-BR">
        <body className={`${roboto.className} antialiased`}>
          <header>
            <nav className="w-full fixed">
              <Navigation />
            </nav>
          </header>
          <div className="pt-[64px] max-w-[1260px] m-auto">{children}</div>
        </body>
      </html>
    </>
  );
}
