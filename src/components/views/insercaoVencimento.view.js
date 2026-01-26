"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Field, FieldDescription, FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { CalendarDaysIcon } from "lucide-react";
import { FilterIcon } from "lucide-react";
import { SearchIcon } from "lucide-react";
import { Spinner } from "../ui/spinner";

export function InsercaoVencimentoForm({ handleSearchProd, prod, loadings }) {
  const [date, setDate] = useState(false);
  const [prodMod, setProdMod] = useState("codprod");
  const [codprod, setCodprod] = useState(false);

  const { register, control, handleSubmit, reset, resetField } = useForm({
    defaultValues: {
      prodMod: "prodMod",
      codProd: "codProd",
      quant: "quant",
    },
  });

  function searchProd() {
    handleSearchProd(prodMod, codprod);
  }

  return (
    <div>
      <form className="max-w-xs">
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Inserir Vencimentos</FieldLegend>
            <FieldDescription>Preecha o formulário abaixo com os dados dos produtos</FieldDescription>
          </FieldSet>
          <FieldGroup>
            <Field>
              <Label>Filial</Label>
              <Controller
                control={control}
                name="branch_id"
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filial" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Matriz</SelectItem>
                      <SelectItem value="2">2 - Faruk</SelectItem>
                      <SelectItem value="3">3 - Carajás</SelectItem>
                      <SelectItem value="4">4 - VS10</SelectItem>
                      <SelectItem value="5">5 - Xinguara</SelectItem>
                      <SelectItem value="6">6 - DP6</SelectItem>
                      <SelectItem value="7">7 - Cidade Jardim</SelectItem>
                      <SelectItem value="8">8 - Canaã</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
            <Field>
              <Label>Produto</Label>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <Controller
                    control={control}
                    name="prodMod"
                    render={({ field }) => (
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setProdMod(value);
                          resetField("codProd");
                        }}
                        value={field.value}
                      >
                        <SelectTrigger className="bg-white">
                          <FilterIcon />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="codprod">Código Interno</SelectItem>
                          <SelectItem value="codauxiliar">Código de Barras</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />

                  <Input
                    type={prodMod === "desc" ? "text" : "number"}
                    placeholder={
                      prodMod === "desc" ? "queijo mussa..." : prodMod === "codprod" ? "4558" : "7568954125689"
                    }
                    {...register("codProd", {
                      onChange: (e) => {
                        setCodprod(e.target.value);
                      },
                    })}
                  />
                  <Button
                    size="icon"
                    className="cursor-pointer"
                    type="button"
                    variant="outline"
                    onClick={() => {
                      searchProd();
                    }}
                  >
                    {loadings?.searchProdLoading ? <Spinner /> : <SearchIcon />}
                  </Button>
                </div>
                <div>
                  {prod && (
                    <div className="border p-2 rounded-md shadow-xs">
                      <p className="text-sm truncate font-semibold">{prod?.descricao}</p>
                      <p className="text-xs text-gray-400">
                        Cod. Int. {prod?.codprod} - Cod. Aux. {prod?.codAuxiliar}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Field>
            <FieldGroup className="flex-row gap-4">
              <Field>
                <Label>Data de validade</Label>
                <Popover>
                  <PopoverTrigger>
                    <Button
                      variant="outline"
                      type="button"
                      className="flex w-full justify-start items-center cursor-pointer"
                    >
                      <CalendarDaysIcon />
                      <div className="flex justify-between gap-2">
                        <p className="font-normal w-fit text-right">
                          {date
                            ? new Date(date).toLocaleDateString("pt-BR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              })
                            : "Dt de Validade"}
                        </p>
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      fromYear={new Date().getFullYear() - 10}
                      toYear={new Date().getFullYear() + 10}
                      selected={date}
                      onSelect={setDate}
                      captionLayout="dropdown"
                      className="rounded-sm"
                    />
                  </PopoverContent>
                </Popover>
              </Field>
              <Field>
                <Label>Quantidade</Label>
                <Input type="num" placeholder="00" />
              </Field>
            </FieldGroup>
            <Button className="cursor-pointer">Inserir</Button>
          </FieldGroup>
        </FieldGroup>
      </form>
    </div>
  );
}
