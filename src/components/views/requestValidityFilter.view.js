"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import {
  BarcodeIcon,
  BinaryIcon,
  Building2Icon,
  CalendarDaysIcon,
  CaseSensitiveIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import { Calendar } from "../ui/calendar";
import { getBonus } from "../services/bonus.service";
import { Spinner } from "../ui/spinner";

export function RequestValidityFilter({ handleFetch }) {
  const [loading, setLoading] = useState(false);
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
      depart: "",
      branch_id: "0",
      prod: "",
      buyer_id: "",
      fornec_id: "",
    },
  });

  const formatDate = (data) => {
    if (!data) return null;
    return new Date(data).toISOString().split("T")[0];
  };

  const fetchBonus = async (data) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (data?.prod) {
        params.append("codprod", data?.prod);
      }
      if (insertDate?.from && insertDate?.to) {
        params.append("dtbonusstart", formatDate(insertDate?.from));
        params.append("dtbonusend", formatDate(insertDate?.to));
      }
      if (validityDate?.from && validityDate?.to) {
        params.append("dtvalidstart", formatDate(validityDate?.from));
        params.append("dtvalidend", formatDate(validityDate?.to));
      }
      if (data?.branch_id > 0) {
        params.append("filial", data?.branch_id);
      }
      if (data?.depart) {
        params.append("dpart", data?.depart);
      }

      const url = `${process.env.NEXT_PUBLIC_API_URL}/bonus?${params.toString()}`;

      const responseValue = await getBonus(url);

      if (responseValue?.ok) {
        toast.success("Consulta realizada com sucesso!");
        handleFetch(responseValue?.bonus);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(fetchBonus)} className="flex flex-col">
      <p className="text-xs tracking-[4px] pt-2 pb-2 text-gray-400 uppercase ">Filtrar Bônus</p>
      <div className="flex flex-wrap gap-2">
        <div className="flex  gap-2 bg-gray-50 p-2 rounded-sm">
          {/* Data de Inserção */}
          <div>
            <Label htmlFor="dtInsert">Data de Inserção</Label>
            <Popover>
              <PopoverTrigger>
                <Button
                  variant="outline"
                  type="button"
                  className="flex w-48 items-center justify-between cursor-pointer"
                >
                  <CalendarDaysIcon />
                  <div className="flex w-full justify-between gap-2">
                    <p className="font-normal w-full text-right">
                      {insertDate?.from
                        ? new Date(insertDate?.from).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                          })
                        : "De"}
                    </p>
                    <p className="font-normal text-border w-full">|</p>
                    <p className="font-normal w-full text-left">
                      {insertDate?.to
                        ? new Date(insertDate?.to).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                          })
                        : "Até"}
                    </p>
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="range"
                  numberOfMonths={1}
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
                  className="flex w-48 items-center cursor-pointer"
                >
                  <CalendarDaysIcon />
                  <div className="flex w-full justify-between gap-2">
                    <p className="font-normal w-full text-right">
                      {validityDate?.from
                        ? new Date(validityDate?.from).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                          })
                        : "De"}
                    </p>
                    <p className="font-normal text-border w-full">|</p>
                    <p className="font-normal w-full text-left">
                      {validityDate?.to
                        ? new Date(validityDate?.to).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                          })
                        : "Até"}
                    </p>
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="range"
                  numberOfMonths={1}
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
              <Popover>
                <PopoverTrigger>
                  <Button size="icon" variant="outline" type="button" className="cursor-pointer">
                    <SlidersHorizontalIcon />{" "}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-fit">
                  <ul className="flex flex-col gap-2">
                    <li>
                      <Button
                        onClick={() => {
                          setProdMod("cod");
                          reset();
                        }}
                        variant={prodMod === "cod" ? "default" : "outline"}
                        className="w-full cursor-pointer justify-start"
                      >
                        <BinaryIcon /> Código
                      </Button>
                    </li>
                    <li>
                      <Button
                        onClick={() => {
                          setProdMod("barras");
                          reset();
                        }}
                        variant={prodMod === "barras" ? "default" : "outline"}
                        className="w-full cursor-pointer justify-start"
                      >
                        <BarcodeIcon /> Código de Barras
                      </Button>
                    </li>
                    <li>
                      <Button
                        onClick={() => {
                          setProdMod("desc");
                          reset();
                        }}
                        variant={prodMod === "desc" ? "default" : "outline"}
                        className="w-full cursor-pointer justify-start"
                      >
                        <CaseSensitiveIcon /> Descrição
                      </Button>
                    </li>
                  </ul>
                </PopoverContent>
              </Popover>
              <Input
                {...register("prod")}
                type={prodMod === "desc" ? "text" : "number"}
                placeholder={prodMod === "cod" ? "2010" : prodMod === "barras" ? "7546895231465" : "coca cola 250ml"}
                className="bg-white"
              />
              <Button size="icon" variant="outline" type="button" className="cursor-pointer">
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
        <Button disabled={loading} type="submit" variant="outline" className="cursor-pointer">
          {loading ? <Spinner /> : <SearchIcon />}
          Consultar
        </Button>
        <Button
          size="icon"
          type="button"
          variant="destructive"
          className="cursor-pointer"
          onClick={() => {
            reset();
            setInsertDate({ from: false, to: false });
            setValidityDate({ from: false, to: false });
            setProdMod("cod");
            setDiasVencer(false);
          }}
        >
          <Trash2Icon />
        </Button>
      </div>
    </form>
  );
}
