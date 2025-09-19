import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ButtonSignOut } from './signout-button';

export function Profile() {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image
            src='/navbar/perfil.svg'
            alt='Menu Icon'
            width={35}
            height={35}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Meu Perfil</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem><ButtonSignOut /></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}