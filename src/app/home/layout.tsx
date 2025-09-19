import { roboto } from '@/app/ui/fonts';
import NavBar from '../ui/_components/navbar';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Braah_One } from 'next/font/google';

export default async function Layout({ 
  children 
}: Readonly<{
  children: React.ReactNode
}>){
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect('/')
  }

  return (
    <html lang='pt-br'>
      <body className={`${roboto.className} antialiased`}>
        <header>
          <NavBar 
            tipoUsuario={`${session.user.username}`}
            module='HOME'
          />
        </header>
        <div className='grow md:overflow-y-hidden'>
          {children}
        </div>
      </body>
    </html>
  );
}