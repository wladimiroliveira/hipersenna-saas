"use client";

import { useState } from "react";
import estilos from "@/components/ui/styles/treatment.module.css";
import { Check, Clock10Icon, Save } from "lucide-react";
import clsx from "clsx";
import { UploadTable } from "@/components/services/xlsxHandler.service";
import { changeTreatment } from "@/components/services/treatment.service";

export function TreatmentController() {
  const [labelInsert, setLabelInsert] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [dataTable, setDataTable] = useState([]);
  const [sendButtonState, setSendBunttonState] = useState("waiting");

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
            onDragEnter={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setIsDragging(false);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);

              const file = e.dataTransfer.files[0];
              if (file) {
                setLabelInsert(file.name);
                setDataTable(file);
                setSendBunttonState("ready");
              }
            }}
          >
            <div
              className={`flex items-center pl-8 pr-8 justify-center border-1 border-dashed border-primaria m-4 rounded-sm ${isDragging ? "bg-gray-200" : ""}`}
            >
              <p className="text-center">
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
                setDataTable(value.target.files[0]);
                setSendBunttonState("ready");
              }}
              className="opacity-0"
            />
          </label>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={async (e) => {
              e.preventDefault();
              setSendBunttonState("sending");
              const products = await UploadTable(dataTable);
              const changeTreatmentValue = await changeTreatment(products);
              if (changeTreatmentValue.ok) {
                setSendBunttonState("sended");
                setLabelInsert("Dados salvos com sucesso. Selecione ou arraste um novo arquivo para inseri-lo");
              }
            }}
            disabled={sendButtonState === "ready" ? false : true}
            className={clsx(
              "flex flex-row gap-4 font-semibold transition-colors items-center border-1 borda-gay40 p-6 rounded-sm",
              {
                "text-gray-400 hover:text-gray-400": sendButtonState === "waiting",
                "bg-orange-400 border-0 text-lg text-secundaria hover:bg-orange-700 cursor-pointer":
                  sendButtonState === "ready",
                "bg-blue-400 border-0 text-lg text-secundaria": sendButtonState === "sending",
                "bg-green-400 border-0 text-lg text-secundaria": sendButtonState === "sended",
              },
            )}
          >
            {sendButtonState === "waiting" ? (
              <>
                Aguardando dados
                <Clock10Icon />
              </>
            ) : sendButtonState === "ready" ? (
              <>
                Salvar dados
                <Save className="text-secundaria" />
              </>
            ) : sendButtonState === "sending" ? (
              <>
                Salvando os dados
                <svg
                  className={clsx("size-5 animate-spin border-3 border-primaria border-t-secundaria rounded-[50%]", {})}
                  viewBox="0 0 24 24"
                ></svg>
              </>
            ) : (
              <>
                Dados salvos
                <Check />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
