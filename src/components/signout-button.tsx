'use client'
import { authClient } from '@/lib/authClients';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function ButtonSignOut() {
  const router = useRouter();

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace('/')
        }
      }
    })
  }

  return (
    <Button onClick={signOut} className='w-full'>
      Sair
    </Button>
  );
}