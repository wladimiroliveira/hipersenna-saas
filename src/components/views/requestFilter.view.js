"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import {
  BoxesIcon,
  Building2Icon,
  CalendarDaysIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  Trash2Icon,
} from "lucide-react";
import { Calendar } from "../ui/calendar";

export function RequestFilter() {
  const [prodMod, setProdMod] = useState("cod");
  const [diasVencer, setDiasVencer] = useState(false);
  const [insertDate, setInsertDate] = useState({
    from: false,
    to: false,
  });
  const [validityDate, setValidityDate] = useState({
    from: false,
    to: false,
  });

  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      diasVencer: "",
      branch_id: "0",
      prod: "",
      buyer_id: "",
      fornec_id: "",
    },
  });

  return (
    <form className="flex flex-col">
      <p className="text-xs tracking-[4px] pt-2 pb-2 text-gray-400 uppercase ">Filtrar Bônus</p>
      <div className="flex flex-wrap gap-2">
        <div className="flex  gap-2 bg-gray-50 p-2 rounded-sm">
          {/* Data de Inserção */}
          <div>
            <Label htmlFor="dtInsert">Data de Inserção</Label>
            <Popover>
              <PopoverTrigger>
                <Button variant="outline" type="button" className="flex items-center cursor-pointer">
                  <CalendarDaysIcon />
                  <p className="font-normal">
                    {insertDate?.from
                      ? new Date(insertDate?.from).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })
                      : "De"}
                  </p>
                  <p className="font-normal text-border">|</p>
                  <p className="font-normal">
                    {insertDate?.to
                      ? new Date(insertDate?.to).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })
                      : "Até"}
                  </p>
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="range"
                  numberOfMunts={2}
                  fromYear={new Date().getFullYear() - 10}
                  toYear={new Date().getFullYear() + 10}
                  selected={insertDate}
                  onSelect={(range) => {
                    if (!range?.from || !range?.to) {
                      setInsertDate({ from: undefined, to: undefined });
                      return;
                    }
                    setInsertDate(range);
                  }}
                  captionLayout="dropdown"
                  className="rounded-sm"
                />
              </PopoverContent>
            </Popover>
          </div>
          {/* Data de Validade */}
          <div className="flex flex-col items-start">
            <Label>Data de Validade</Label>
            <Popover>
              <PopoverTrigger>
                <Button
                  variant="outline"
                  disabled={diasVencer}
                  type="button"
                  className="flex items-center cursor-pointer"
                >
                  <CalendarDaysIcon />
                  <p className="font-normal">
                    {validityDate?.from
                      ? new Date(validityDate?.from).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })
                      : "De"}
                  </p>
                  <p className="font-normal text-border">|</p>
                  <p className="font-normal">
                    {validityDate?.to
                      ? new Date(validityDate?.to).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })
                      : "Até"}
                  </p>
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="range"
                  numberOfMunts={2}
                  fromYear={new Date().getFullYear() - 10}
                  toYear={new Date().getFullYear() + 10}
                  selected={validityDate}
                  onSelect={(range) => {
                    if (!range?.from || !range?.to) {
                      setValidityDate({ from: undefined, to: undefined });
                      return;
                    }
                    setValidityDate(range);
                  }}
                  captionLayout="dropdown"
                  className="rounded-sm"
                />
              </PopoverContent>
            </Popover>
          </div>
          {/* Dias para vencer */}
          <div className="flex flex-col items-start w-18">
            <Label>D/ vencer</Label>
            <Input
              {...register("diasVencer")}
              type="number"
              disabled={validityDate?.to || validityDate?.from}
              placeholder="00"
              className="bg-white bg-[url(/request_validity/clock-alert.svg)]  bg-no-repeat bg-[position:.7rem_center] bg-[length:16px_16px] pl-8 text-right"
              onChange={(e) => {
                setDiasVencer(e.target.value ?? undefined);
                console.log(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex  gap-2 bg-gray-50 p-2 rounded-sm">
          {/* Filial */}
          <div>
            <Label>Filial</Label>
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
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Filial" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">
                      <Building2Icon />
                      Todas
                    </SelectItem>
                    <SelectItem value="1">Matriz</SelectItem>
                    <SelectItem value="2">Faruk</SelectItem>
                    <SelectItem value="3">Carajás</SelectItem>
                    <SelectItem value="4">VS10</SelectItem>
                    <SelectItem value="5">Xinguara</SelectItem>
                    <SelectItem value="6">DP6</SelectItem>
                    <SelectItem value="7">Cd Jardim</SelectItem>
                    <SelectItem value="8">Canaã</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          {/* Departamento */}
          <div className="flex flex-col items-start w-20">
            <Label>Depart</Label>
            <Input
              {...register("depart")}
              type="number"
              placeholder="00"
              className="bg-white bg-[url(/request_validity/boxes.svg)]  bg-no-repeat bg-[position:.7rem_center] bg-[length:16px_16px] pl-8 text-right"
            />
          </div>
          <div className="flex flex-col items-start">
            <Label>Produto</Label>
            <div className="flex gap-2">
              <Button variant="outline" type="button" className="cursor-pointer">
                <SlidersHorizontalIcon />{" "}
              </Button>
              <Input
                {...register("prod")}
                type={prodMod === "desc" ? "text" : "number"}
                placeholder={prodMod === "cod" ? "2010" : prodMod === "barras" ? "7546895231465" : "coca cola 250ml"}
                className="bg-white"
              />
              <Button variant="outline" type="button" className="cursor-pointer">
                <SearchIcon />{" "}
              </Button>
            </div>
          </div>
        </div>
        <div className="flex  gap-2 bg-gray-50 p-2 rounded-sm">
          {/* Matr. Comprador */}
          <div className="w-20">
            <Label>Mtr. Compr.</Label>
            <Input
              {...register("buyer_id")}
              type="number"
              placeholder="00"
              className="bg-white bg-[url(/request_validity/bag-business.svg)]  bg-no-repeat bg-[position:.7rem_center] bg-[length:16px_16px] pl-8 text-right"
            />
          </div>
          {/* Matr. Comprador */}
          <div className="w-20">
            <Label>Mtr. Fornec.</Label>
            <Input
              {...register("fornec_id")}
              type="number"
              placeholder="00"
              className="bg-white bg-[url(/request_validity/box.svg)] bg-no-repeat bg-[position:.7rem_center] bg-[length:16px_16px] pl-8 text-right"
            />
          </div>
        </div>
      </div>
      <div className="p-2 flex gap-2">
        <Button type="submit" variant="outline" className="cursor-pointer">
          <SearchIcon />
          Consultar
        </Button>
        <Button type="submit" variant="outline" className="bg-red-100 cursor-pointer hover:bg-red-200">
          <Trash2Icon />
        </Button>
      </div>
    </form>
  );
}
