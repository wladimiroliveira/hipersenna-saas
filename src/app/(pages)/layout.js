import "../globals.css";
import { roboto } from "@/components/fonts";

export const metadata = {
  title: "GHS Sistema",
  description: "Em construção",
};

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <body className={`${roboto.className} antialiased`}>
          {children}
          <Toaster position="top-center" />
        </body>
      </ThemeProvider>
    </html>
  );
}
