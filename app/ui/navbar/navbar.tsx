import '@/app/ui/globals.css'
import estilos from '@/app/ui/navbar/navbar.module.css';
import Image from 'next/image';
import NavLinks from '@/app/ui/navbar/navlinks';

export default function NavBar({ tipoUsuario, linkAtivo }: { tipoUsuario: string, linkAtivo: string }){
  
  const ativo = linkAtivo;
  
  return (
    <nav className={estilos.navigation}>
      <div className={estilos.logo_container}>
        <div className="img_container">
          <Image 
            src='/navbar/logo-hipersenna.png'
            height={50}
            width={70}
            alt='Logo HiperSenna'
            className='logo_hipersenna'
          />
        </div>
        <div className={estilos.text_container}>
          <p>{tipoUsuario}</p>
        </div>
      </div>
      <div className={estilos.links_container}>
        <ul className={estilos.list_links}>
          {<NavLinks ativo={ativo} />}
        </ul>
      </div>
    </nav>
  );
}