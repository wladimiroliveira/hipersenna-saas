"use client";

import { useState } from "react";
import estilos from "@/components/ui/styles/treatment.module.css";

export default function Page() {
  const [labelInsert, setLabelInsert] = useState("");
  return (
    <div
      className="pl-4 pr-4"
      style={{
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <div className="pt-12 pb-12">
        <h1 className="text-4xl text-primaria font-bold">Inserir Tratativas</h1>
      </div>
      <div>
        <p>Arraste sua tabela atualizada para o centro da tela, para inserir as novas tratativas no sistema...</p>
        <div className="flex items-center justify-center h-[50vh]">
          <label
            htmlFor="file"
            className={`${estilos.label} w-[400px] h-[250px] bg-secundaria cursor-pointer rounded-xl transition-colors hover:bg-gray-200`}
          >
            <div className="flex items-center justify-center border-1 border-dashed border-primaria m-4 rounded-sm">
              <p>
                {labelInsert ? (
                  labelInsert
                ) : (
                  <>
                    <strong>Selecione um arquivo</strong> ou solte-o aqui
                  </>
                )}
              </p>
            </div>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={(value) => {
                setLabelInsert(value.target.files[0].name);
              }}
              className="opacity-0"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
