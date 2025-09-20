'use client'

import Image from 'next/image';
import estilos from '@/app/ui/_components/navbar.module.css';
import { Profile } from '@/components/profile';
import { usePathname } from 'next/navigation';

export default function NavBar({ username }: { username: string }) {
  const pathname = usePathname();
  const address = pathname.split('/');

  let index = 0;
  if (address.length > 2) {
    index = 2
  } else {
    index = 1
  }
  return (
    <nav 
      className={`${estilos.navigation} grid relative bg-primaria w-full pt-2 pb-2 pl-16 pr-16 gap-4`}
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
          <p className='uppercase text-secundaria font-bold text-sm'>{username}</p>
        </div>
      </div>
      <div 
        className={`${estilos.titulo_container} flex content-center w-full`}
      >
        <h1 className='text-2xl uppercase font-bold tracking-widest text-secundaria'>{address[index]}</h1>
      </div>
      <div 
        className={`${estilos.menu_container} flex w-full`}
      >
        <Profile />
      </div>
    </nav>
  );
}