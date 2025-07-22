import Link from 'next/link';
import estilos from '@/app/ui/navbar/navbar.module.css';
import clsx from 'clsx';

const links = [
  { 
    name: 'Home',
    href: '/',
  },
  { name: 'Vencimento',
    href: '/vencimento',
    roles: ['usuario', '']
  },
  { name: 'Manutenção', href: '/manutencao' },
  { name: 'NFe', href: '/nfe' },
  { name: 'Promoções', href: '/promocoes' },
  { name: 'Ruptura', href: '/ruptura' },
  { name: 'Usuário', href: '/usuarios' }
];

export default function NavLinks({ ativo }: { ativo: string }) {
  return (
    <>
      {links.map((link) => (
        <li
          key={link.name}
          className={clsx(
            estilos.list_item,
            ativo === link.href && estilos.list_item_ativo
          )}
          id={link.name}
        >
          <Link href={link.href}>
            {link.name}
          </Link>
        </li>
      ))}
    </>
  );
}
