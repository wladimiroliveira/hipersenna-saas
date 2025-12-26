"use client";

import { getDrawResults } from "@/components/services/drawResults.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { SearchIcon } from "lucide-react";
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
    defaultValues: {
      branch_id: "",
    },
  });

  const [rafflesDrawn, setRafflesDrawn] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleShowResult(data) {
    try {
      setLoading(true);
      if (!data.branch_id) return setLoading(false);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/raffles?status=SORTEADO&branch_id=${data.branch_id}`;
      const responseValue = await getDrawResults(url);
      if (responseValue.ok) {
        setRafflesDrawn(responseValue?.raffles);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold p-4 text-center">Rifas sorteadas</h1>
      <form {...register} onSubmit={onSubmit(handleShowResult)} className="w-40 m-auto">
        <FieldSet>
          <FieldGroup className="flex flex-col gap-2 items-center">
            <FieldLabel htmlFor="branch_id" className="text-center">
              Selecione a filial do sorteio
            </FieldLabel>
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
            <Button
              className="bg-quartenaria hover:bg-hover-quartenaria cursor-pointer"
              disabled={loading}
              type="submit"
              size="lg"
            >
              {loading ? (
                <>
                  Pesquisando
                  <Spinner />
                </>
              ) : (
                <>
                  Pesquisar
                  <SearchIcon />
                </>
              )}
            </Button>
          </FieldGroup>
        </FieldSet>
      </form>
      <div>
        {rafflesDrawn ? (
          <div className="flex flex-row flex-wrap gap-4 justify-center p-4">
            {rafflesDrawn.map((raffle) => (
              <Card key={raffle?.id} className="w-lg">
                <CardHeader>
                  <CardTitle>
                    Rifa <strong>#{raffle.raffle_number}</strong>
                  </CardTitle>
                  <CardContent>
                    <ul>
                      <li>
                        CPF do Cliente: <strong>{raffle?.hsraffle_clients?.cpf}</strong>
                      </li>
                      <li>
                        Nome do Cliente: <strong>{raffle?.hsraffle_clients?.name}</strong>
                      </li>
                      <li>
                        Número de Telefone: <strong>{raffle?.hsraffle_clients?.telephone}</strong>
                      </li>
                      <li>
                        ID do Cliente: <strong>{raffle?.client_id}</strong>
                      </li>
                      <li>
                        Chave NFC: <strong>{raffle?.nfc_key}</strong>
                      </li>
                      <li>
                        Código da Rifa: <strong>{raffle?.raffle_number}</strong>
                      </li>
                      <li>
                        Filial: <strong>{raffle?.branch_id}</strong>
                      </li>
                      <li>
                        Status: <strong>{raffle?.status}</strong>
                      </li>
                      <li>
                        Data de sorteio: <strong>{new Date(raffle?.modified_at).toLocaleString("pt-BR")}</strong>
                      </li>
                    </ul>
                  </CardContent>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="p-4">
        <p className="text-center">
          <Link className="italic underline text-quartenaria hover:text-hover-quartenaria" href="../admin-sorteios/">
            Clique aqui
          </Link>{" "}
          para voltar para a tela de sorteio
        </p>
      </div>
    </div>
  );
}
