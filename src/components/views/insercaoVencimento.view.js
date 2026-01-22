"use client";

import { useState } from "react";
import { Field, FieldDescription, FieldGroup, FieldLegend, FieldSet } from "../ui/field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { SlidersHorizontalIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CaseSensitiveIcon } from "lucide-react";
import { BarcodeIcon } from "lucide-react";
import { BinaryIcon } from "lucide-react";
import { CalendarDaysIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

export function InsercaoVencimentoForm() {
  const [date, setDate] = useState(false);
  const [prodMod, setProdMod] = useState("cod");

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
              <Label>Filial *</Label>
              <Select>
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
            </Field>
            <Field>
              <Label>Produto *</Label>
              <div className="flex gap-2">
                <Input
                  type={prodMod === "desc" ? "text" : "number"}
                  placeholder={prodMod === "desc" ? "queijo mussa..." : prodMod === "cod" ? "4558" : "7568954125689"}
                />
                <Popover>
                  <PopoverTrigger>
                    <Button type="button" variant="outline" size="icon">
                      <SlidersHorizontalIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col gap-2 w-50">
                    <Button
                      className="flex justify-start text-sm"
                      variant={prodMod === "cod" ? "default" : "outline"}
                      type="button"
                      onClick={() => {
                        setProdMod("cod");
                      }}
                    >
                      <BinaryIcon /> Código
                    </Button>
                    <Button
                      className="flex justify-start text-sm"
                      variant={prodMod === "barras" ? "default" : "outline"}
                      type="button"
                      onClick={() => {
                        setProdMod("barras");
                      }}
                    >
                      <BarcodeIcon /> Código de Barras
                    </Button>
                    <Button
                      className="flex justify-start text-sm"
                      variant={prodMod === "desc" ? "default" : "outline"}
                      type="button"
                      onClick={() => {
                        setProdMod("desc");
                      }}
                    >
                      <CaseSensitiveIcon /> Descrição
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>
            </Field>
            <FieldGroup className="flex-row gap-4">
              <Field>
                <Label>Data de validade * </Label>
                <Popover>
                  <PopoverTrigger>
                    <Button variant="outline" type="button" className="flex items-center cursor-pointer">
                      <CalendarDaysIcon />
                      <div className="flex justify-between gap-2">
                        <p className="font-normal w-fit text-right">
                          {date
                            ? new Date(date).toLocaleDateString("pt-BR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              })
                            : "Data de Validade"}
                        </p>
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      captionLayout="dropdown"
                      className="rounded-sm"
                    />
                  </PopoverContent>
                </Popover>
              </Field>
              <Field>
                <Label>Quantidade *</Label>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </FieldGroup>
      </form>
    </div>
  );
}
