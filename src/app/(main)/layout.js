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
          <div className="pt-16 max-w-7xl m-auto">{children}</div>
        </body>
      </html>
    </>
  );
}
