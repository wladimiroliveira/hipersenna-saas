"use client";

import { set, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "../ui/field";
import branches from "@/files/branches.json";
import { BinaryIcon, CaseSensitiveIcon, PlusCircleIcon, SlidersHorizontalIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { toast } from "sonner";
import { TagIcon } from "lucide-react";
import { UserIcon } from "lucide-react";

export function RequestValidityAction({ getSelectedRows, rowSelection }) {
  const [open, setOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState(false);
  const [departSearchMod, setDepartSearchMod] = useState("cod");
  const [colabSearchMod, setColabSearchMod] = useState("matricula");

  const { handleSubmit, register, reset } = useForm();

  async function onSubmitForm(data) {
    console.log(data);
  }

  const handleAction = async () => {
    try {
      const data = await getSelectedRows();
      if (data) {
        console.log(data);
        setSelectedRows(data);
        setOpen(true);
      }
    } catch (err) {
      // Se houver mais de uma filial selecionada exibe um alerta
      toast.warning("Atenção!", {
        description: err?.message,
        action: {
          label: "Ok",
        },
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <Button
        disabled={Object.keys(rowSelection).length === 0}
        onClick={() => {
          setOpen(true);
          handleAction();
        }}
        variant="outline"
        className="cursor-pointer"
      >
        <PlusCircleIcon />
        Solicitar Vistoria
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Solicitar Vistoria</DialogTitle>
            <DialogDescription>Selecione o colaborador que deverá realizar esta vistoria</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <FieldGroup>
              <FieldSet>
                <Field>
                  <FieldLabel htmlFor="branch_id">Filial</FieldLabel>
                  <div className="border p-2 rounded-md shadow-xs bg-border text-sm">
                    <p>
                      {selectedRows?.branch_id} - {branches[selectedRows?.branch_id - 1]?.name}
                    </p>
                  </div>
                </Field>
                <Field>
                  <FieldLabel htmlFor="depart">Departamento</FieldLabel>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger>
                        <Button variant="outline" size="icon" className="cursor-pointer">
                          <SlidersHorizontalIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="flex flex-col gap-2 w-full">
                        <Button
                          variant={departSearchMod === "cod" ? "default" : "outline"}
                          className="flex justify-between"
                          type="button"
                          onClick={() => {
                            setDepartSearchMod("cod");
                          }}
                        >
                          <BinaryIcon />
                          Código
                        </Button>
                        <Button
                          variant={departSearchMod === "desc" ? "default" : "outline"}
                          className="flex justify-between"
                          type="button"
                          onClick={() => {
                            setDepartSearchMod("desc");
                          }}
                        >
                          <CaseSensitiveIcon />
                          Descrição
                        </Button>
                      </PopoverContent>
                    </Popover>
                    <Input
                      id="depart"
                      type={departSearchMod !== "cod" ? "text" : "number"}
                      placeholder={departSearchMod === "cod" ? "00" : "frios"}
                      {...register("department")}
                      required
                    />
                  </div>
                </Field>
                <Field>
                  <FieldLabel htmlFor="colab">Colaborador(a)</FieldLabel>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger>
                        <Button variant="outline" size="icon" className="cursor-pointer">
                          <SlidersHorizontalIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="flex flex-col gap-2 w-full">
                        <Button
                          variant={colabSearchMod === "matricula" ? "default" : "outline"}
                          className="flex justify-between cursor-pointer"
                          type="button"
                          onClick={() => {
                            setColabSearchMod("matricula");
                          }}
                        >
                          <TagIcon />
                          Matrícula
                        </Button>
                        <Button
                          variant={colabSearchMod === "name" ? "default" : "outline"}
                          className="flex justify-between cursor-pointer"
                          type="button"
                          onClick={() => {
                            setColabSearchMod("name");
                          }}
                        >
                          <UserIcon />
                          Nome
                        </Button>
                      </PopoverContent>
                    </Popover>
                    <Input
                      id="colab"
                      type={colabSearchMod !== "name" ? "text" : "number"}
                      placeholder={colabSearchMod === "name" ? "Carlos Silva" : "1234"}
                      {...register("colab")}
                      required
                    />
                  </div>
                </Field>
              </FieldSet>
              <Field orientation="horizontal">
                <Button type="submit">Enviar</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Cancelar
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
