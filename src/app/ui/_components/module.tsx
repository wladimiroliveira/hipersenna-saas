'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


export function Module(
  {
    href,
    titulo,
    texto,
    image,
    alt,
    width,
    height
  } : {
    href: string,
    titulo: string,
    texto: string,
    image: string,
    alt: string,
    width: number,
    height: number,
  }
){
  const pathname = usePathname();
  
  return (
    <Link href={`${pathname}${href}`} className="flex flex-col items-center justify-between text-center text-sm rounded-2xl border-1 border-secundaria cursor-pointer bg-primaria pt-4 pb-4 pl-2 pr-2 w-40 h-40 active:translate-y-0 hover:-translate-y-1 hover:shadow-sm transition">
      <h3 className="font-bold tracking-widest uppercase text-base leading-5">{titulo}</h3>
      <Image
        src={image}
        alt={alt}
        width={width}
        height={height}
        />
      <p className="text-sm leading-4">{texto}</p>
    </Link>
  );
}

export function Description({title, describe}: {title: string, describe: string}){
  return (
    <div className="flex flex-col gap-8 pl-8 pr-8">
      <h1 className="font-bold text-2xl">{title}</h1>
      <p className="text-quintenaria">{describe}</p>
    </div>
  );
}

export function VideoListItem(
  {
    href,
    title,
    rotina,
    processo,
  }: {
    href: string,
    title: string,
    rotina: string,
    processo: string,
  }){
  const pathname = usePathname();

  return (
    <li>
      <Link href={`${pathname}${href}`} className="flex flex-row justify-between items-center p-4 border-1 rounded-2xl transition-all hover:-translate-y-1 hover:bg-gray-50 hover:shadow-sm active:-translate-0">
        <div>
          <h3 className="uppercase text-base font-bold">{title}</h3>
          <p className="text-sm">Rotina: <strong>{rotina}</strong></p>
          <p className="text-sm">Processo: Nº <strong>{processo}</strong></p>
        </div>
      </Link>
    </li>
  );
}

export function LibVideos(
  {
    title,
    children
  }: {
    title: string,
    children: React.ReactNode,
  }
){
  return (
    <div>
      <div className="pt-8 pb-8">
        <h1 className="text-center font-bold text-2xl tracking-widest uppercase">{title}</h1>
      </div>
      <div className="m-auto md:max-w-6/12">
        <ul className="flex flex-col gap-4 pl-4 pr-4">
          {children}
        </ul> 
      </div>
    </div>
  );
}