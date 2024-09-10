import Modal from "@/components/Modals/index";
import * as Dialog from "@radix-ui/react-dialog";
import { ModalAnimatedContent } from "@/components/Modals";
import { HTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/Buttons/Button";
import { useActionSugestaoItemProdutoEncomendaClient } from "@/hooks/encomenda/cliente/sugestaoItemProdutoEncomenda/useActionValidateSugestaoItemProdutoEncomenda";
import { toast } from "react-toastify";
import { DEFAULT_TOAST_TIME_VISIBILITY } from "@/helpers/constants";

interface DeleteProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
}

export function ModalDeny({ id, className = "", ...others }: DeleteProps) {
  const [type, setType] = useState<"prosseguir" | "cancelar">();
  const { mutationValidate } = useActionSugestaoItemProdutoEncomendaClient();

  return (
    <Modal className={twMerge(className)} {...others}>
      <Dialog.Trigger asChild className="ml-auto mr-2">
        <Button
          label="Negar"
          secondary
          className="md:w-auto text-sm px-2 py-1 bg-gray-950 mr-0"
        />
      </Dialog.Trigger>

      <ModalAnimatedContent className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-[28rem]  flex flex-col justify-between items-center p-4">
        <h2 className="text-center mb-8 font-bold">
          Pretendes remover produto e continuar com a encomenda ou cancelar a
          encomenda?
        </h2>
        <div className="flex flex-col gap-4 w-full">
          <Dialog.Close asChild>
            <Button
              className="w-full block"
              label="Remover produto e continuar"
              onClick={() => {
                setType("prosseguir");
                mutationValidate.mutate(
                  {
                    sugestao_id: id,
                    acao: "nega",
                    denyData: { acao: "prosseguir" },
                  },
                  {
                    onSuccess() {
                      type === "prosseguir" &&
                        toast(
                          "Produto removido e prosseguindo com a encomenda",
                          {
                            type: "info",
                            autoClose: DEFAULT_TOAST_TIME_VISIBILITY,
                          }
                        );
                    },
                    onError(error) {
                      toast(error.message, {
                        type: "error",
                      });
                    },
                  }
                );
              }}
            />
          </Dialog.Close>
          <Dialog.Close asChild>
            <Button
              className="w-full block"
              label="Cancelar encomenda"
              secondary
              onClick={() => {
                setType("cancelar");

                mutationValidate.mutate(
                  {
                    sugestao_id: id,
                    acao: "nega",
                    denyData: { acao: "cancelar" },
                  },
                  {
                    onSuccess() {
                      type === "cancelar" &&
                        toast("Encomenda cancelada", {
                          type: "info",
                          autoClose: DEFAULT_TOAST_TIME_VISIBILITY,
                        });
                    },
                    onError(error) {
                      toast(error.message, { type: "error" });
                    },
                  }
                );
              }}
            />
          </Dialog.Close>
        </div>
      </ModalAnimatedContent>
    </Modal>
  );
}
