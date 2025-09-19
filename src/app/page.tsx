import Image from 'next/image';
import { LoginForm } from './ui/_components/loginForm';

export default function Page() {
  return (
    <div>
      <div>
        <Image
          src='/logo-hipersenna-amarela.svg'
          alt='Logo hipersenna'
          height={34}
          width={50}
        />
      </div>
      <div>
        <h1>Login</h1>
        <p>Entre com suas credenciais para acessar o sistema</p>
      </div>
      <div>
        <LoginForm />
      </div>
    </div>
  );
}