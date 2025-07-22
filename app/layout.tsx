'use client'

import '@/app/ui/globals.css';
import { montserrat } from '@/app/ui/fonts';
import NavBar from '@/app/ui/navbar/navbar';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';
import {
  NavBarSkeleton,
} from '@/app/ui/skeletons';

export default function Layout({ 
  children 
}: {
  children: React.ReactNode
}){
  return (
    <html lang='pt-br'>
      <body className={`${montserrat.className} antialiased`}>
        <header className='cabecalho w-full'>
          <Suspense fallback={<NavBarSkeleton />}>
            <NavBar tipoUsuario={'operador'} linkAtivo={usePathname()} />
          </Suspense>
        </header>
        <div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
          <div className='flex-grow md:overflow-y-hidden '>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}