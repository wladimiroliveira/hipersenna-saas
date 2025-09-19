import Image from 'next/image';
import { LoginForm } from './ui/_components/loginForm';

export default function Page() {
  return (
    <div 
      className='flex flex-col w-full items-center text-center h-lvh justify-around pl-4 pr-4'
      style={{
        maxHeight: '70vh'
      }}
    >
      <div>
        <Image
          src='/logo-hipersenna.svg'
          alt='Logo hipersenna'
          height={34}
          width={50}
        />
      </div>
      <div>
        <h1 className='text-3xl font-bold text-secundaria'>Login</h1>
        <p className='text-sm text-quartenaria'>Entre com suas credenciais para acessar o sistema</p>
      </div>
      <div className='w-full'>
        <LoginForm />
      </div>
    </div>
  );
}