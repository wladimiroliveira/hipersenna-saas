import '@/app/ui/globals.css';
import estilos from '@/app/ui/vencimento/sidebar/links/links.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Links(){
  return (
    <div className='flex flex-col gap-6'>
      <BotaoLink href='vencimento/insert' texto='Inserir Dados' src='/links/dashicons_insert.svg' height={20} width={20} alt='Insert' className='insert_icon' />
      <BotaoLink href='vencimento/analise' texto='Analisar Dados' src='/links/icon-park-twotone_analysis.svg' height={20} width={20} alt='Análise' className='analise_icon' />
      <BotaoLink href='vencimento/bonus' texto='Analisar Bônus' src='/links/lets-icons_paper.svg' height={20} width={20} alt='Bônus' className='bonus_icon' />
      <BotaoLink href='vencimento/insert' texto='Minhas nserções' src='/links/tdesign_personal-information-filled.svg' height={20} width={20} alt='Myself' className='myself_icon' />
    </div>
  );
}


export function BotaoLink({
  href,
  texto,
  src = '',
  height,
  width,
  alt = '',
  className
}:{
  href: string,
  texto?: string,
  src?: string,
  height?: GLfloat,
  width?: GLfloat,
  alt?: string,
  className: string
}) {
  return (
  <Link href={href} className={estilos.linkBotao}>
    {texto}
    <Image 
      src={src}
      height={height}
      width={width}
      alt={alt}
      className={className}
    />
  </Link>
  );
}