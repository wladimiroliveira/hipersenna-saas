"use client";

import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import {
  BoxesIcon,
  Building2Icon,
  CalendarDaysIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  Trash2Icon,
} from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export function RequestFilter() {
  const [insertDate, setInsertDate] = useState({
    from: false,
    to: false,
  });
  const [prodMod, setProdMod] = useState("cod");

  return (
    <div className="flex flex-col">
      <p className="text-xs tracking-[4px] pt-2 pb-2 text-gray-400 uppercase ">Filtrar Bônus</p>
      <div className="flex flex-wrap gap-4">
        <div className="flex  gap-4 bg-gray-50 p-2 rounded-sm">
          {/* Data de Inserção */}
          <div>
            <Label>Data de Inserção</Label>
            <Popover>
              <PopoverTrigger>
                <Button variant="outline" className="flex items-center cursor-pointer">
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
                  <p className="font-normal">|</p>
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
            </Popover>
          </div>
          {/* Data de Validade */}
          <div className="flex flex-col items-start">
            <Label>Data de Validade</Label>
            <Popover>
              <PopoverTrigger>
                <Button variant="outline" className="flex items-center cursor-pointer">
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
                  <p className="font-normal">|</p>
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
            </Popover>
          </div>
          {/* Dias para vencer */}
          <div className="flex flex-col items-start w-26">
            <Label>Dias para vencer</Label>
            <Input
              type="number"
              placeholder="00"
              className="bg-white bg-[url(/request_validity/clock-alert.svg)]  bg-no-repeat bg-[position:.7rem_center] bg-[length:16px_16px] pl-8 text-right"
            />
          </div>
        </div>
        <div className="flex  gap-4 bg-gray-50 p-2 rounded-sm">
          {/* Filial */}
          <div>
            <Label>Filial</Label>
            <Select>
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
          </div>
          {/* Departamento */}
          <div className="flex flex-col items-start w-26">
            <Label>Departamento</Label>
            <Input
              type="number"
              placeholder="00"
              className="bg-white bg-[url(/request_validity/clock-alert.svg)]  bg-no-repeat bg-[position:.7rem_center] bg-[length:16px_16px] pl-8 text-right"
            />
          </div>
          <div className="flex flex-col items-start">
            <Label>Produto</Label>
            <div className="flex gap-2">
              <Button variant="outline">
                <SlidersHorizontalIcon />{" "}
              </Button>
              <Input
                type={prodMod === "desc" ? "text" : "number"}
                placeholder={prodMod === "cod" ? "2010" : prodMod === "barras" ? "7546895231465" : "coca cola 250ml"}
                className="bg-white"
              />
              <Button variant="outline">
                <SearchIcon />{" "}
              </Button>
            </div>
          </div>
        </div>
        <div className="flex  gap-4 bg-gray-50 p-2 rounded-sm">
          {/* Matr. Comprador */}
          <div className="w-30">
            <Label>Matr. Comprador</Label>
            <Input
              type="number"
              placeholder="00"
              className="bg-white bg-[url(/request_validity/bag-business.svg)]  bg-no-repeat bg-[position:.7rem_center] bg-[length:16px_16px] pl-8 text-right"
            />
          </div>
          {/* Matr. Comprador */}
          <div className="w-30">
            <Label>Matr. Comprador</Label>
            <Input
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
    </div>
  );
}
