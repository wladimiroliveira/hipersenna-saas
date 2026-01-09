"use client";

import { useState } from "react";
import clsx from "clsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ArrowRight, BrushCleaningIcon, ChevronDownIcon, FilterIcon, Search, SearchIcon } from "lucide-react";
import { PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Spinner } from "../ui/spinner";
import { searchProd } from "../services/searchProd.service";

export function ValidityFilter({ onClear, mainLoading, onSubmitData }) {
  const [openDtInsert, setDtOpenInsert] = useState(false);
  const [openDtValidity, setDtOpenValidity] = useState(false);
  const [modality, setModality] = useState("validityDt");
  const [prodModality, setProdModality] = useState("codprod");
  const [prodIdent, setProdIdent] = useState("");
  const [prodDesc, setProdDesc] = useState("...");
  const [dateRangeInsert, setDateRangeInsert] = useState(false);
  const [dateRangeValidity, setDateRangeValidity] = useState(false);
  const [searchProdLoading, setSearchProdLoading] = useState(false);

  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
    control,
    reset,
    resetField,
  } = useForm({
    defaultValues: {
      consultby: "validityDt",
      branch_id: "0",
      prodModality: "codprod",
    },
  });

  async function handleSearchProdDesc(data) {
    try {
      setSearchProdLoading(true);
      if (!data?.id || !data?.type) {
        return;
      }
      const queryValue = await searchProd(data?.id, data?.type);
      queryValue[0].descricao ? setProdDesc(queryValue[0].descricao) : setProdDesc("Produto não encontrado");
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setSearchProdLoading(false);
    }
  }
  const handleSubmit = (data) => {
    const validityDate = dateRangeValidity
      ? {
          from: new Date(dateRangeValidity?.from).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" }),
          to: new Date(dateRangeValidity?.to).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" }),
        }
      : null;
    const insertDate = dateRangeInsert
      ? {
          from: new Date(dateRangeInsert?.from).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" }),
          to: new Date(dateRangeInsert?.to).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" }),
        }
      : null;
    onSubmitData({ ...data, validityDate, insertDate });
  };

  return (
    <div>
      <div className="max-w-[880px]">
        <form onSubmit={onSubmit(handleSubmit)} className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-primaria">Consultar Validades</h2>
          <div className="flex flex-col pt-4 pb-8 justify-center items-center lg:flex-row">
            <FieldSet className="flex-row w-full flex-wrap justify-between lg:justify-start gap-2 ">
              <div className="flex flex-col max-w-55 w-full h-full gap-2">
                <FieldGroup className="gap-0">
                  <FieldLabel htmlFor="consultby">Consultar validades por</FieldLabel>
                  <Controller
                    name="consultby"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setModality(value);
                        }}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecionar modalidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="validityDt">Intervalo de Datas</SelectItem>
                          <SelectItem value="daysQt">Qt. dias para vencer</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FieldGroup>
                <FieldGroup>
                  <div
                    className={clsx("transition-colors", {
                      "pointer-events-auto block relative": modality === "validityDt",
                      "pointer-events-none hidden absolute": modality === "daysQt",
                    })}
                  >
                    <FieldLabel htmlFor="dateRange">Data de Validade</FieldLabel>
                    <div className="flex flex-col">
                      <Popover open={openDtValidity} onOpenChange={setDtOpenValidity}>
                        <PopoverTrigger asChild>
                          <Button variant="outline" id="dateRange" className="justify-between font-normal">
                            {dateRangeValidity.from && dateRangeValidity.to ? (
                              <span className="flex items-center gap-2">
                                {format(dateRangeValidity.from, "dd/MM/yyyy")}
                                <ArrowRight className="w-4 h-4" />
                                {format(dateRangeValidity.to, "dd/MM/yyyy")}
                              </span>
                            ) : dateRangeValidity.from ? (
                              format(dateRangeValidity.from, "dd/MM/yyyy")
                            ) : (
                              "Selecione o intervalo"
                            )}
                            <ChevronDownIcon className="text-gray-500/50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="range"
                            numberOfMonths={2}
                            fromYear={new Date().getFullYear() - 10}
                            toYear={new Date().getFullYear() + 10}
                            selected={dateRangeValidity}
                            onSelect={(range) => {
                              if (!range?.from) {
                                setDateRangeValidity({ from: undefined, to: undefined });
                                return;
                              }
                              setDateRangeValidity(range);
                            }}
                            captionLayout="dropdown"
                            className="rounded-md"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div
                    className={clsx("transition-colors", {
                      "pointer-events-auto hidden absolute": modality === "validityDt",
                      "pointer-events-auto block relative": modality === "daysQt",
                    })}
                  >
                    <FieldLabel htmlFor="qt_days">Qt. dias para vencer</FieldLabel>
                    <Input
                      id="qt_days"
                      type="number"
                      className="w-full"
                      placeholder="Qt. dias"
                      {...register("qt_days")}
                    />
                  </div>
                </FieldGroup>
              </div>
              <div className="flex flex-col gap-2 w-55">
                <FieldGroup className="w-full gap-0">
                  <FieldLabel htmlFor="consultby">Filial:</FieldLabel>
                  <Controller
                    name="branch_id"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value} modal={false}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione a Filial" />
                        </SelectTrigger>
                        <SelectContent className="border-1">
                          <SelectItem value="0">Todas</SelectItem>
                          <SelectItem value="1">Matriz</SelectItem>
                          <SelectItem value="2">Faruk</SelectItem>
                          <SelectItem value="3">Carajás</SelectItem>
                          <SelectItem value="4">VS10</SelectItem>
                          <SelectItem value="5">Xinguara</SelectItem>
                          <SelectItem value="6">DP6</SelectItem>
                          <SelectItem value="7">Cidade Jardim</SelectItem>
                          <SelectItem value="8">Canaã</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FieldGroup>
                <FieldGroup className="flex flex-col w-full gap-0">
                  <FieldLabel htmlFor="dateRangeInsert">Data de Inserção</FieldLabel>
                  <div className="flex flex-col gap-3">
                    <Popover open={openDtInsert} onOpenChange={setDtOpenInsert}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="dateRangeInsert"
                          className="w-full justify-between font-normal hover:bg-transparent text-primaria"
                        >
                          {dateRangeInsert.from && dateRangeInsert.to ? (
                            <span className="flex items-center gap-2">
                              {format(dateRangeInsert.from, "dd/MM/yyyy")}
                              <ArrowRight className="w-4 h-4" />
                              {format(dateRangeInsert.to, "dd/MM/yyyy")}
                            </span>
                          ) : dateRangeInsert.from ? (
                            format(dateRangeInsert.from, "dd/MM/yyyy")
                          ) : (
                            "Selecione o intervalo"
                          )}
                          <ChevronDownIcon className="text-gray-500/50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          numberOfMonths={2}
                          selected={dateRangeInsert}
                          onSelect={(range) => {
                            if (!range?.from) {
                              setDateRangeInsert({ from: undefined, to: undefined });
                              return;
                            }
                            setDateRangeInsert(range);
                          }}
                          captionLayout="dropdown"
                          className="rounded-md"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </FieldGroup>
              </div>
              <FieldGroup className="max-w-70 w-full gap-0">
                <FieldLabel htmlFor="prod">Produto</FieldLabel>
                <div className="flex flex-col h-full justify-between gap-2">
                  <div className="flex gap-2">
                    <Controller
                      name="prodModality"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={(e) => {
                            field.onChange(e);
                            setProdModality(e);
                            resetField("prod");
                            setProdIdent("");
                            onClear();
                          }}
                          value={field.value}
                          modal={false}
                        >
                          <SelectTrigger>
                            <FilterIcon />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="codprod">Código</SelectItem>
                            <SelectItem value="codauxiliar">Código de barras</SelectItem>
                            <SelectItem value="descricao">Descrição</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <Input
                      id="prod"
                      type={prodModality === "descricao" ? "text" : "number"}
                      placeholder={
                        prodModality === "descricao"
                          ? "Descrição"
                          : prodModality === "codprod"
                            ? "Código"
                            : "Código de barras"
                      }
                      className="min-w-26"
                      {...register("prod", {
                        onChange: (e) => {
                          setProdIdent(e.target.value);
                        },
                      })}
                    />
                    <Button
                      disabled={searchProdLoading}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSearchProdDesc({ id: prodIdent, type: prodModality });
                      }}
                    >
                      {searchProdLoading ? <Spinner /> : <SearchIcon />}
                    </Button>
                  </div>
                  <div>
                    <FieldLabel>Descrição</FieldLabel>
                    <span className="w-full block text-sm border-1 italic border-input p-2 rounded-md">{prodDesc}</span>
                  </div>
                </div>
              </FieldGroup>
            </FieldSet>
            <div className="flex pt-5 gap-2 lg:flex-col-reverse">
              <Button
                variant="outline"
                className="border-terciaria text-terciaria hover:bg-hover-terciaria hover:cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  onClear();
                  reset({
                    branch_id: "0",
                    dias: "",
                    prod: "",
                  });
                  setProdModality("codprod");
                  setModality("validityDt");
                  setDateRangeInsert(false);
                  setDateRangeValidity(false);
                }}
              >
                <BrushCleaningIcon /> Limpar
              </Button>
              <Button disabled={mainLoading} className="hover:cursor-pointer" type="submit">
                {mainLoading ? (
                  <Spinner />
                ) : (
                  <>
                    <Search /> Consultar
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
