import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { EncomendaCliente } from "@/services/encomenda";
import Modal, { ModalAnimatedContent } from "@/components/Modals";
import * as Dialog from "@radix-ui/react-dialog";
import { numberToMoney } from "@/helpers/functions/numberToMoney";
import { useActionEncomendaCancelar } from "@/hooks/encomenda/cliente/useActionEncomendaCancelar";
import { Estado } from "@/services/encomenda/admin/estado_encomenda";
import Link from "next/link";
import { reuseOrderClient } from "@/actions/reuse-order-client";
import LoadingStatus from "../../../../../@types/LoadingStatus";
import { useStatus } from "@/hooks/useLoadingStatus";
import { toast } from "react-toastify";
import { DEFAULT_TOAST_TIME_VISIBILITY } from "@/helpers/constants";

interface TableRowProps {
  encomenda: EncomendaCliente;
}

export function precoTotal(quantidade: number, preco: string) {
  return (quantidade * Number(preco)).toString();
}

export function getCorEstado(estado: Estado) {
  switch (estado) {
    case "Cancelada":
      return "#ef4444";
    case "Processamento":
      return "#fa0";
    case "Pagamento":
      return "#699E00";
    case "Tratamento":
      return "#00ffaa8f";
    case "Confirmação":
      return "#0af";
    case "Expedição":
      return "#00f";
    case "Expedida":
      return "#a0f";
    case "Entregue":
      return "#00FF0088";
    case "Pendente":
    default:
      return "#AEAEAE";
  }
}

function TableRowEncomenda({ encomenda }: TableRowProps) {
  return (
    <TableRow key={encomenda.id} className="">
      <TableCell className="cursor-help">
        <Tooltip title={encomenda.codigo} arrow>
          <Link
            href={`/user/commissions/${encomenda.id}/${encodeURIComponent(
              encomenda.codigo
            )}`}
            className="underline decoration-dotted"
          >
            {encomenda.codigo}
          </Link>
        </Tooltip>
      </TableCell>
      <TableCell className="dark:text-slate-400">
        {encomenda.itens_encomenda.reduce(
          (value, curr) => value + curr.quantidade,
          0
        )}
      </TableCell>
      <TableCell>
        <Tooltip title={encomenda.estado_encomenda.descricao} arrow>
          <span
            className="p-1 shadow rounded text-white text-xs cursor-default"
            style={{
              backgroundColor: getCorEstado(encomenda.estado_encomenda.nome),
            }}
          >
            {encomenda.estado_encomenda.nome}
          </span>
        </Tooltip>
      </TableCell>
      <TableCell>
        <span>{encomenda.envio.tipo}</span>
        <Tooltip
          title={
            "Custo de envio: " +
            numberToMoney(encomenda.envio.preco_envio.toString())
          }
          arrow
        >
          <span className="w-4 h-4 inline-flex justify-center items-center p-1 ml-2 border-2 bg-gray-300 dark:bg-transparent shadow rounded-full cursor-help">
            <span className="material-symbols-outlined text-white text-xs">
              question_mark
            </span>
          </span>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Modal>
          <Dialog.Trigger className="text-primary underline">
            Outros
          </Dialog.Trigger>
          <ModalAnimatedContent>
            <div className="p-6">
              <TableContainer className="max-h-[260px] md:max-h-[270px]">
                <Table>
                  <TableHead className="bg-blue-200 sticky top-0">
                    <TableRow>
                      <TableCell className="!font-bold dark:text-slate-900"></TableCell>
                      <TableCell className="!font-bold dark:text-slate-900">
                        Qtd
                      </TableCell>
                      <TableCell className="!font-bold dark:text-slate-900">
                        Preço unit.
                      </TableCell>
                      <TableCell className="!font-bold dark:text-slate-900">
                        Total
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {encomenda.itens_encomenda.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <span className="whitespace-nowrap line-clamp-1">
                            {item.produto.nome}
                          </span>
                        </TableCell>
                        <TableCell className="dark:text-slate-400">
                          {item.quantidade}
                        </TableCell>
                        <TableCell className="whitespace-nowrap dark:text-slate-400">
                          {numberToMoney(item.preco_venda)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap dark:text-slate-400">
                          {numberToMoney(
                            precoTotal(item.quantidade, item.preco_venda)
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className="mt-3 flex flex-row justify-between">
                <span>Total:</span>
                <span className="font-bold">
                  {numberToMoney(
                    encomenda.itens_encomenda
                      .reduce(
                        (value, curr) =>
                          value +
                          Number(precoTotal(curr.quantidade, curr.preco_venda)),
                        0
                      )
                      .toString()
                  )}
                </span>
              </div>
            </div>
          </ModalAnimatedContent>
        </Modal>
      </TableCell>
      <TableCell>
        <CancelarEncomendaButton encomenda={encomenda} />
        <PagarEncomendaButton encomenda={encomenda} />
        <ReutilizarEncomendaButton encomenda={encomenda} />
      </TableCell>
    </TableRow>
  );
}

function CancelarEncomendaButton({
  encomenda,
}: {
  encomenda: EncomendaCliente;
}) {
  const { mutationCancelarEncomenda } = useActionEncomendaCancelar();

  if (encomenda.estado_encomenda.nome !== "Pendente") {
    return <></>;
  }

  return (
    <>
      <button
        onClick={() => {
          mutationCancelarEncomenda.mutate(encomenda.id, {
            onError(error) {
              toast(error.message || "Erro ao cancelar encomenda", {
                type: "error",
              });
            },
            onSuccess() {
              toast("Encomenda cancelada", {
                type: "success",
                autoClose: DEFAULT_TOAST_TIME_VISIBILITY,
              });
            },
          });
        }}
        disabled={mutationCancelarEncomenda.isPending}
        className="bg-red-600 text-white text-xs p-1 rounded shadow transition-colors hover:bg-red-700 disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed"
      >
        Cancelar
      </button>
    </>
  );
}

function PagarEncomendaButton({ encomenda }: { encomenda: EncomendaCliente }) {
  if (encomenda.estado_encomenda.nome !== "Pagamento") {
    return <></>;
  }

  return (
    <>
      <Link
        href={`/payment/${encomenda.id}/${encomenda.codigo.replace("/", "-")}`}
        className=" bg-blue-600 text-white text-xs p-1 rounded shadow transition-colors hover:bg-blue-700 "
      >
        Pagar
      </Link>
    </>
  );
}

function ReutilizarEncomendaButton({
  encomenda,
}: {
  encomenda: EncomendaCliente;
}) {
  const { setStatus, status } = useStatus();

  if (encomenda.estado_encomenda.nome !== "Entregue") {
    return <></>;
  }

  return (
    <>
      <button
        onClick={async () => {
          setStatus(LoadingStatus.LOADING);

          const datas = encomenda.itens_encomenda.map((item) => ({
            produto_id: item.produto.id,
            quantidade: item.quantidade,
            cor: item.cor === null ? undefined : item.cor,
            tamanho: item.tamanho === null ? undefined : item.tamanho,
          }));

          const result = await reuseOrderClient(datas);

          if (result === 200) {
            toast("Encomenda adicionada ao carrinho!", {
              type: "success",
              autoClose: DEFAULT_TOAST_TIME_VISIBILITY,
              onClose: () => {
                setStatus(LoadingStatus.DONE);
              },
            });
          } else {
            toast(result, {
              type: "error",
              onClose: () => {
                setStatus(LoadingStatus.DONE);
              },
            });
          }
        }}
        disabled={status === LoadingStatus.LOADING}
        className="bg-green-600 text-white text-xs p-1 rounded shadow transition-colors hover:bg-green-700 disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed"
      >
        Recomprar
      </button>
    </>
  );
}

export default TableRowEncomenda;
