'use client'

import Image from 'next/image';
import estilos from '@/app/ui/_components/navbar.module.css';
import { Profile } from '@/components/profile';
import { usePathname } from 'next/navigation';

export default function NavBar({ tipoUsuario, module }: { tipoUsuario: string, module: string }){
  return (
    <nav 
      className={`${estilos.navigation} grid relative bg-primaria w-full pt-4 pb-4 pl-8 pr-8 gap-4`}
    >
      <div 
        className={`${estilos.logo_container} flex items-center w-full gap-1`}
      >
        <div className=''>
          <Image 
            src='/navbar/logo-hipersenna.svg'
            height={30}
            width={50}
            alt='Logo HiperSenna'
            className='logo_hipersenna'
          />
        </div>
        <div className=''>
          <p className='uppercase text-secundaria font-bold text-sm'>{tipoUsuario}</p>
        </div>
      </div>
      <div 
        className={`${estilos.titulo_container} flex content-center w-full`}
      >
        <h1 className='text-2xl uppercase font-bold tracking-widest text-secundaria'>{module}</h1>
      </div>
      <div 
        className={`${estilos.menu_container} flex items-center w-full`}
      >
        <Profile />
      </div>
    </nav>
  );
}