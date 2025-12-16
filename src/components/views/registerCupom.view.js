"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, usePathname } from "next/navigation";

import { createRaffleModel } from "@/components/services/createRaffle.service";

import { useCupomStore } from "@/store/cupom.store";
import { useCpfStore } from "@/store/cpf.store";
import { useRafflesStore } from "@/store/raffles.store";

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconSend } from "@tabler/icons-react";

import { Modal } from "@/components/views/modal.view";

export function RegisterCupomContainer({ onLoading }) {
  //React Hooks
  const router = useRouter();
  const [modalInfo, setModalInfo] = useState();
  const [open, setOpen] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);

  // Zustand Stores
  const { setCupom, clearCupom } = useCupomStore();
  const { setRaffles, clearRaffles } = useRafflesStore();
  const { setCpf, clearCpf } = useCpfStore();

  // Handle Functions
  function handleSetOpen(bool) {
    setOpen(bool);

    if (!bool && redirectPath) {
      console.log(redirectPath);
      router.push(redirectPath);
      setRedirectPath(null);
    }
  }

  async function handleCreateRaffle(data) {
    onLoading(true);
    const cpf = useCpfStore.getState();
    const createRaffleResult = await createRaffleModel(data, cpf.cpf);
    // console.log(createRaffleResult);
    if (createRaffleResult.ok) {
      clearRaffles();
      setRaffles(createRaffleResult?.raffles);
      return router.push("../festival-tv/success");
    }
    if (!createRaffleResult.ok && createRaffleResult.message) {
      if (createRaffleResult.status === 404 && createRaffleResult.message === "CPF não encontrado no sistema!") {
        clearCupom();
        setCupom(data);
        return router.push("../festival-tv/register");
      }
      if (createRaffleResult.message === "CPF inválido!") {
        setModalInfo({
          title: "Atenção",
          description: createRaffleResult.message,
        });

        setRedirectPath("../festival-tv");
        setOpen(true);
        return;
      }
      onLoading(false);
      setModalInfo({
        title: "Atenção",
        description: createRaffleResult.message,
      });
      setOpen(true);
    }
  }

  const form = useForm({
    defaultValues: {
      cupom: "",
      serie: "",
    },
  });

  return (
    <div>
      <Modal
        info={{
          title: modalInfo?.title,
          description: modalInfo?.description,
        }}
        onSetOpen={handleSetOpen}
        open={open}
      />
      <div className="mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreateRaffle)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="cupom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número do Cupom *</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="000000" {...field} required />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serie"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Série *</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="000" {...field} required />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="text-right">
              <Button type="submit" className="bg-red-700 hover:bg-red-800">
                Enviar <IconSend />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
