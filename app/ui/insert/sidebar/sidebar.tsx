import estilos from '@/app/ui/vencimento/sidebar/sidebar.module.css';
import { BotaoLink } from '@/app/ui/vencimento/sidebar/links/links';
import '@/app/ui/globals.css';

export default function SideBar(){
  return (
    <aside className={estilos.sidebar_container}>
      <div className={estilos.titulo_container}>
        <h1 className={estilos.titulo}>Inserir Dados</h1>
        <p>Sistema de prevenção de vencimento</p>
      </div>
      <div className={estilos.links_container}>
        <BotaoLink href='/vencimento' texto='Voltar' src='/links/back-arrow.svg' height={20} width={20} alt='Back arrow' className='back'/>
      </div>
    </aside>
  );
}