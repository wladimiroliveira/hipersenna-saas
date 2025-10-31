"use client";

import { useState } from "react";
import clsx from "clsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ArrowRight, BrushCleaningIcon, ChevronDownIcon, Search } from "lucide-react";
import { PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";

export function ValidityFilter() {
  const [openInsert, setOpenInsert] = useState(false);
  const [openValidity, setOpenValidity] = useState(false);
  const [modality, setModality] = useState("1");
  const [clickSubmit, setClickSubmit] = useState(false);
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
    },
  });
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
          <div className="flex justify-between items-center w-full">
            <FieldSet className="flex-row w-full justify-start gap-2">
              <FieldGroup className="w-40 gap-0">
                <FieldLabel htmlFor="consultby">Consultar validades por:</FieldLabel>
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
                      <SelectTrigger className="w-40 border-1 border-primaria">
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
              <FieldGroup className="max-w-52">
                <div
                  className={clsx("max-w-52 transition-colors", {
                    "pointer-events-auto block relative": modality === "1",
                    "pointer-events-none hidden absolute": modality === "2",
                  })}
                >
                  <FieldLabel htmlFor="dateRange">Data de Inserção</FieldLabel>
                  <div className="flex flex-col">
                    <Popover open={openValidity} onOpenChange={setOpenValidity}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="dateRange"
                          className="w-52 justify-between font-normal hover:bg-transparent border-1 border-primaria"
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
                    "pointer-events-auto hidden relative": modality === "1",
                    "pointer-events-auto block absolute": modality === "2",
                  })}
                >
                  <FieldLabel htmlFor="dias">Dias</FieldLabel>
                  <Input id="dias" type="number" className="w-52" placeholder="Quant. Dias" {...register("dias")} />
                </div>
              </FieldGroup>
              <FieldGroup className="w-35 gap-0">
                <FieldLabel htmlFor="consultby">Filial:</FieldLabel>
                <Controller
                  name="branch_id"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value} modal={false}>
                      <SelectTrigger className="w-35 border-1 border-primaria">
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
              <FieldGroup className="flex flex-col max-w-52 gap-0">
                <FieldLabel htmlFor="dateRangeInsert">Data de Inserção</FieldLabel>
                <div className="flex flex-col gap-3 max-w-52">
                  <Popover open={openInsert} onOpenChange={setOpenInsert}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="dateRangeInsert"
                        className="w-52 justify-between font-normal hover:bg-transparent border-1 border-primaria text-primaria"
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
              <FieldGroup className="max-w-30 gap-0">
                <FieldLabel htmlFor="prod">Produto</FieldLabel>
                <Input id="prod" type="number" placeholder="codigo" {...register("prod")} />
              </FieldGroup>
            </FieldSet>
            <div className="flex flex-col gap-2">
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
