import { roboto } from '@/app/ui/fonts';
import NavBar from '../ui/_components/navbar';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { Navigation } from '../ui/_components/navigation';

export default async function Layout({ 
  children 
}: Readonly<{
  children: React.ReactNode
}>){
  const session = await auth.api.getSession({
    headers: await headers()
  })
  const username = session?.user.username
  const matricula = session?.user.matriculation

  if(!session) {
    redirect('/')
  }

  return (
    <html lang='pt-br'>
      <body className={`${roboto.className} antialiased`}>
        <header>
          <NavBar username={`${username}`}/>
          <Navigation />
        </header>
        <div className='grow md:overflow-y-hidden'>
          {children}
        </div>
      </body>
    </html>
  );
}