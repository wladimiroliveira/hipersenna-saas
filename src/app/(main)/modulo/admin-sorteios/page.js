"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { drawRaffles } from "@/lib/models/draw.model";
import { DicesIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function Page() {
  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
    control,
    reset,
    resetField,
  } = useForm({
    defaultValues: {},
  });

  const [winner, setWinner] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDraw(data) {
    try {
      setLoading(true);
      const drawValue = await drawRaffles(data.branch_id);
      console.log(drawValue);
      if (drawValue.ok) {
        setWinner({
          id: drawValue?.id,
          client_id: drawValue?.client_id,
          nfc_key: drawValue?.nfc_key,
          raffle_number: drawValue?.raffle_number,
          branch_id: drawValue?.branch_id,
          status: drawValue?.status,
          created_at: drawValue?.created_at,
          modified_at: drawValue?.modified_at,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="">
        <h1 className="text-2xl font-bold text-center p-4">Sorteio</h1>
        <form onSubmit={onSubmit(handleDraw)} className="w-40 m-auto">
          <FieldSet>
            <FieldGroup className="flex flex-col gap-2 items-center">
              <FieldLabel htmlFor="branch_id">Selecione a filial do sorteio</FieldLabel>
              <Controller
                name="branch_id"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a filial" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 - Faruk</SelectItem>
                      <SelectItem value="4">4 - VS10</SelectItem>
                      <SelectItem value="5">5 - Xinguara</SelectItem>
                      <SelectItem value="8">8 - Canaã</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <Button className="bg-quartenaria hover:bg-hover-quartenaria cursor-pointer" type="submit" size="lg">
                Sortear
                <DicesIcon />
              </Button>
            </FieldGroup>
          </FieldSet>
        </form>
        <div>
          {winner ? (
            <div className="flex flex-col gap-2 w-fit max-w-150 m-auto mt-2 p-4 bg-gray-200 rounded-2xl">
              <h2 className="text-center text-lg font-bold">Nome do ganhador</h2>
              <ul>
                <li>ID do Cliente: {winner?.client_id}</li>
                <li>Chave NFC: {winner?.nfc_key}</li>
                <li>Número da Rifa: {winner?.raffle_number}</li>
                <li>Filial: {winner?.branch_id}</li>
                <li>Status: {winner?.status}</li>
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="p-4">
        <p className="text-center">
          <Link
            className="italic underline text-quartenaria hover:text-hover-quartenaria"
            href="../modulo/admin-sorteios/resultados"
          >
            Clique aqui
          </Link>{" "}
          para visualizar as rifas que já foram sorteadas
        </p>
      </div>
    </div>
  );
}
