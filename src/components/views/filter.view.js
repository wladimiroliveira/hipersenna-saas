"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ArrowRight, BrushCleaningIcon, ChevronDownIcon, Search, SearchIcon } from "lucide-react";
import { PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";

export async function consultarDescricao(queryType, queryBody, token) {
  let url;
  if (queryType === "codigo") {
    url = `${process.env.NEXT_PUBLIC_API_URL}/products/?codprod="${queryBody}"`;
  } else if (queryType === "barras") {
    url = `${process.env.NEXT_PUBLIC_API_URL}/products/?codauxiliar="${queryBody}"`;
  } else {
    url = `${process.env.NEXT_PUBLIC_API_URL}/products/?descricao="${queryBody}"`;
  }

  const descResult = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return descResult;
}

export function ValidityFilter() {
  const [openInsert, setOpenInsert] = useState(false);
  const [openValidity, setOpenValidity] = useState(false);
  const [modality, setModality] = useState("1");
  const [clickSubmit, setClickSubmit] = useState(false);
  const [prodDesc, setProdDesc] = useState("consulte um produto...");
  const [prodModality, setProdModality] = useState("codigo");
  const [prodIdent, setProdIdent] = useState("");
  const [dateRangeInsert, setDateRangeInsert] = useState({
    from: undefined,
    to: undefined,
  });
  const [dateRangeValidity, setDateRangeValidity] = useState({
    from: undefined,
    to: undefined,
  });
  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      consultby: "1",
      branch_id: "0",
      prodModality: "codigo",
    },
  });

  useEffect(async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const descResult = await consultarDescricao(prodModality, prodIdent, token);
    console.log(descResult);
    setProdDesc(descResult);
  }, [prodModality, prodIdent]);

  const handleSubmit = async (data) => {
    if (!clickSubmit) {
      const fullData = {
        ...data,
        dateRangeInsert:
          dateRangeInsert.from && dateRangeInsert.to
            ? {
                from: format(dateRangeInsert.from, "yyyy-MM-dd"),
                to: format(dateRangeInsert.to, "yyyy-MM-dd"),
              }
            : undefined,
        dateRangeValidity:
          dateRangeValidity.from && dateRangeValidity.to
            ? {
                from: format(dateRangeValidity.from, "yyyy-MM-dd"),
                to: format(dateRangeValidity.to, "yyyy-MM-dd"),
              }
            : undefined,
      };

      const cleanedData = Object.fromEntries(
        Object.entries(fullData).filter(([_, value]) => {
          if (
            value === undefined ||
            value === null ||
            value === "" ||
            (typeof value === "undefined" &&
              !Array.isArray(value) &&
              Object.values(value).every((v) => v === undefined || v === null || v === ""))
          ) {
            return false;
          }
          return true;
        }),
      );

      setClickSubmit(true);
      console.log(cleanedData);
      if (true) {
        setClickSubmit(false);
      }
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={onSubmit(handleSubmit)} className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-primaria w-52">Consultar Validades</h2>
          <div className="flex justify-between items-center">
            <FieldSet className="flex-row w-full justify-start gap-2">
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
                        <SelectTrigger className="w-full border-1 border-primaria">
                          <SelectValue placeholder="Selecionar modalidade" />
                        </SelectTrigger>
                        <SelectContent className="border-1 border-primaria">
                          <SelectItem value="1">Intervalo de Datas</SelectItem>
                          <SelectItem value="2">Quantidade de Dias</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FieldGroup>
                <FieldGroup>
                  <div
                    className={clsx("transition-colors", {
                      "pointer-events-auto block relative": modality === "1",
                      "pointer-events-none hidden absolute": modality === "2",
                    })}
                  >
                    <FieldLabel htmlFor="dateRange">Data de Validade</FieldLabel>
                    <div className="flex flex-col">
                      <Popover open={openValidity} onOpenChange={setOpenValidity}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            id="dateRange"
                            className="justify-between font-normal hover:bg-transparent border-1 border-primaria"
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
                            <ChevronDownIcon />
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
                            className="border-1 border-primaria rounded-md"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div
                    className={clsx("transition-colors", {
                      "pointer-events-auto hidden absolute": modality === "1",
                      "pointer-events-auto block relative": modality === "2",
                    })}
                  >
                    <FieldLabel htmlFor="dias">Dias</FieldLabel>
                    <Input id="dias" type="number" className="w-full" placeholder="Quant. Dias" {...register("dias")} />
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
                            console.log(prodModality);
                          }}
                          value={field.value}
                          modal={false}
                        >
                          <SelectTrigger className="min-w-26 border-1 border-primaria">
                            <SelectValue placeholder="Tipo de Pesquisa" />
                          </SelectTrigger>
                          <SelectContent className="border-1 border-primaria">
                            <SelectItem value="codigo">Código</SelectItem>
                            <SelectItem value="barras">C. Barras</SelectItem>
                            <SelectItem value="desc">Desc.</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <Input
                      id="prod"
                      type="text"
                      placeholder={prodModality}
                      className="min-w-26"
                      {...register("prod", {
                        onChange: (e) => {
                          setProdIdent(e.target.value);
                        },
                      })}
                    />
                    <Button
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        consultarDescricao(prodModality, prodIdent);
                        console.log(prodIdent);
                      }}
                    >
                      <SearchIcon />
                    </Button>
                  </div>
                  <div>
                    <FieldLabel>Descrição</FieldLabel>
                    <span className="bg-primaria w-full block text-sm text-gray-300 p-2 rounded-md">{prodDesc}</span>
                  </div>
                </div>
              </FieldGroup>
              <div className="flex flex-col justify-between w-55">
                <FieldGroup className="w-full gap-0">
                  <FieldLabel htmlFor="consultby">Filial:</FieldLabel>
                  <Controller
                    name="branch_id"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value} modal={false}>
                        <SelectTrigger className="w-full border-1 border-primaria">
                          <SelectValue placeholder="Selecione a Filial" />
                        </SelectTrigger>
                        <SelectContent className="border-1 border-primaria">
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
                  <div className="flex flex-col gap-3 ">
                    <Popover open={openInsert} onOpenChange={setOpenInsert}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="dateRangeInsert"
                          className="w-full justify-between font-normal hover:bg-transparent border-1 border-primaria text-primaria"
                        >
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
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          numberOfMonths={2}
                          selected={dateRangeValidity}
                          onSelect={(range) => {
                            if (!range?.from) {
                              setDateRangeValidity({ from: undefined, to: undefined });
                              return;
                            }
                            setDateRangeValidity(range);
                          }}
                          captionLayout="dropdown"
                          className="border-1 border-primaria rounded-md"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </FieldGroup>
              </div>
            </FieldSet>
            <div className="flex flex-col pt-5 gap-2 ml-4">
              <Button className="bg-primaria hover:bg-hover-primaria hover:cursor-pointer" type="submit">
                <Search /> Consultar
              </Button>
              <Button
                variant="outline"
                className="border-terciaria text-terciaria hover:bg-hover-terciaria hover:cursor-pointer"
                onClick={(event) => {
                  reset({
                    consultby: "1",
                    branch_id: "0",
                    dias: "",
                    prod: "",
                  });
                  setModality("1");
                  setDateRangeInsert({ from: undefined, to: undefined });
                  setDateRangeValidity({ from: undefined, to: undefined });
                }}
              >
                <BrushCleaningIcon /> Limpar
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
