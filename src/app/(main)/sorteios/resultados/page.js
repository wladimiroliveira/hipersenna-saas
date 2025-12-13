"use client";

import { Button } from "@/components/ui/button";
import { FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
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
    defaultValues: {},
  });

  return (
    <div>
      <h1 className="text-2xl font-bold p-4 text-center">Rifas sorteadas</h1>
      <div className="w-40 m-auto">
        <FieldSet>
          <FieldGroup className="flex flex-col gap-2 items-center">
            <FieldLabel htmlFor="branch_id">Selecione a filial do sorteio</FieldLabel>
            <Controller
              name="branch_id"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setBranchId(value);
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
            <Button className="bg-quartenaria hover:bg-hover-quartenaria cursor-pointer" type="submit" size="lg">
              Pesquisar
              <SearchIcon />
            </Button>
          </FieldGroup>
        </FieldSet>
      </div>
      <div className="p-4">
        <p className="text-center">
          <Link className="italic underline text-quartenaria hover:text-hover-quartenaria" href="../sorteios/">
            Clique aqui
          </Link>{" "}
          para voltar para a tela de sorteio
        </p>
      </div>
    </div>
  );
}
