"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export function InsercaoVencimentoForm({ handleSubmitInfos, handleSearchProd, prod, prodList, loadings }) {
  const [prodMod, setProdMod] = useState("codprod");
  const [codprod, setcodprod] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: {
      prodMod: "prodMod",
      codprod: "",
      quant: "",
    },
  });

  function searchProd() {
    handleSearchProd(prodMod, codprod);
  }

  function submitInfos(data) {
    resetField("codprod");
    resetField("prodMod");
    resetField("quant");
    resetField("dataValidade");
    handleSubmitInfos(data);
  }

  return (
    <div className="w-fit">
      <form onSubmit={handleSubmit(submitInfos)} className="w-xs">
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
                    disabled={Array.isArray(prodList) && prodList?.length > 0}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filial" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Filial:</SelectLabel>
                        <SelectItem value="1">1 - Matriz</SelectItem>
                        <SelectItem value="2">2 - Faruk</SelectItem>
                        <SelectItem value="3">3 - Carajás</SelectItem>
                        <SelectItem value="4">4 - VS10</SelectItem>
                        <SelectItem value="5">5 - Xinguara</SelectItem>
                        <SelectItem value="6">6 - DP6</SelectItem>
                        <SelectItem value="7">7 - Cidade Jardim</SelectItem>
                        <SelectItem value="8">8 - Canaã</SelectItem>
                      </SelectGroup>
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
                          resetField("codprod");
                        }}
                        value={field.value}
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue>
                            <FilterIcon />
                          </SelectValue>
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
                    {...register("codprod", {
                      onChange: (e) => {
                        setcodprod(e.target.value);
                      },
                    })}
                    required
                  />
                  <Button
                    disabled={loadings?.searchProdLoading}
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
              <Controller
                name="dataValidade"
                control={control}
                rules={{ required: "Data de validade é obrigatória" }}
                render={({ field }) => (
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
                          {field.value ? new Date(field.value).toLocaleDateString("pt-BR") : "Dt de Validade"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode="single"
                          fromYear={new Date().getFullYear() - 10}
                          toYear={new Date().getFullYear() + 10}
                          selected={field.value}
                          onSelect={field.onChange}
                          captionLayout="dropdown"
                          className="rounded-sm"
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.dataValidade && <p className="text-sm text-red-300">{errors.dataValidade.message}</p>}
                  </Field>
                )}
              />
              <Field>
                <Label>Quantidade</Label>
                <Input type="number" placeholder="00" {...register("quant")} required />
              </Field>
            </FieldGroup>
            <Button disabled={!prod} type="submit" className="cursor-pointer">
              {loadings?.insertProdLoading ? <Spinner /> : "Inserir"}
            </Button>
          </FieldGroup>
        </FieldGroup>
      </form>
    </div>
  );
}
