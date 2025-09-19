import '@/app/globals.css';
import type { Metadata } from "next";
import { roboto } from '@/app/ui/fonts';

export const metadata: Metadata = {
  title: "HiperSenna",
  description: "Excelência e qualidade",
};

export default function Layout({ 
  children 
}: Readonly<{
  children: React.ReactNode
}>){
  return (
    <html lang='pt-br'>
      <body className={`${roboto.className} antialiased`}>
        <div className='grow md:overflow-y-hidden'>
          {children}
        </div>
      </body>
    </html>
  );
}