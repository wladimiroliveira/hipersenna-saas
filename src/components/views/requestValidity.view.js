"use client";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "../ui/field";
import { BinaryIcon, CaseSensitiveIcon, PlusCircleIcon, SlidersHorizontalIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { toast } from "sonner";

export function RequestValidityAction({ getSelectedRows, rowSelection }) {
  const [open, setOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState(false);
  const [departSearchMod, setDepartSearchMod] = useState("cod");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const { handleSubmit, register, reset } = useForm();

  async function onSubmitForm(data) {
    console.log(data);
  }

  const handleAction = async () => {
    try {
      const data = await getSelectedRows();
      if (date) {
        console.log(date);
        setSelectedRows(data);
        setShowAlert(false);
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
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <FieldGroup>
              <FieldSet>
                <FieldLegend>Solicitar Vistoria</FieldLegend>
                <FieldDescription>Selecione o conferente que ficará reponsável por esta vistoria</FieldDescription>
              </FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="branch_id">Filial</FieldLabel>
                </Field>
                <Field>
                  <FieldLabel htmlFor="depart">Departamento</FieldLabel>
                  <div className="flex gap-4">
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
                    />
                  </div>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
