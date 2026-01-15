import { Toaster } from "@/components/ui/sonner";
import "../globals.css";
import { roboto } from "@/components/fonts";

export const metadata = {
  title: "GHS Sistema",
  description: "Em construção",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${roboto.className} antialiased`}>
        <Toaster position="top-center" />
        <main>{children}</main>
      </body>
    </html>
  );
}
