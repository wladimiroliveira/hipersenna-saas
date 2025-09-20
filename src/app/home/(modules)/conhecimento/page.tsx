'use client'

import { Suspense } from "react";
import { Module } from "@/app/ui/_components/module";
import { ModuleSkeleton } from "@/app/ui/_components/skeletons";

export default function Page(){
  return (
    <div 
      className="flex flex-col items-center pt-7 pb-7 pl-4 pr-4"
      style={{
        maxWidth: "1200px",
        margin: "auto"
      }}
    >
      <div 
        className="flex flex-col items-center gap-5"
        style={{
          maxWidth: "615px"
        }}
      >
        <h1 className="text-xl uppercase font-bold tracking-widest text-center md:text-2xl">Base de conhecimento <br /> HiperSenna</h1>
        <p className="text-sm text-center text-quintenaria md:text-base">A nossa base de conhecimento foi criada para apoiar você no dia a dia do <strong>HiperSenna</strong>. Nela, você encontrará <strong>treinamentos, tutoriais e orientações práticas</strong> sobre diferentes processos e atividades, disponíveis a <strong>qualquer hora e em qualquer lugar</strong>. O objetivo é oferecer um recurso simples e acessível, para que todos possam aprender, revisar e se atualizar sempre que necessário, de forma ilimitada e no seu próprio ritmo.</p>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-10 mt-10">
        <Suspense fallback={<ModuleSkeleton />}>
          <Module
            href='/frentecaixa'
            titulo="Frente de caixa"
            texto="Trilha de carreira de um(a) fiscal de caixa"
            image="/frente-caixa-hipersenna.svg"
            alt="Checkout"
            width={40}
            height={40}
          />
        </Suspense>
        <Suspense fallback={<ModuleSkeleton />}>
          <Module 
            href='/estoque'
            titulo="Estoque"
            texto="Trilha de carreira de um(a) estoquista"
            image="/box.svg"
            alt="Box"
            width={40}
            height={40}
          />
        </Suspense>
        <Suspense fallback={<ModuleSkeleton />}>
          <Module 
            href='/gerencia'
            titulo="Gerência"
            texto="Trilha de carreira de um(a) gerente"
            image="/person.svg"
            alt="Person"
            width={40}
            height={40}
          />
        </Suspense>
      </div>
    </div>
  );
}