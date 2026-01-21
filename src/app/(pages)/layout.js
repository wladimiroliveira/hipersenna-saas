import { Toaster } from "@/components/ui/sonner";
import "../globals.css";
import { roboto } from "@/components/fonts";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "GHS Sistema",
  description: "Em construção",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${roboto.className} antialiased`}>
        <Toaster position="top-center" />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
