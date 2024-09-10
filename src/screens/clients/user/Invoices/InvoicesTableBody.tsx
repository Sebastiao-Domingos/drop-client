"use client";

import { TBody, Tr } from "@/components/Table";
import { dateFormat } from "@/helpers/functions/dateFormat";
import { numberToMoney } from "@/helpers/functions/numberToMoney";
import { useGetEncomendaCliente } from "@/hooks/useGetEncomendaCliente";
import React from "react";
import { precoTotal } from "../Commisions/TableRowEncomenda";
import { ItemEncomendaCliente } from "@/services/encomenda";
import Link from "next/link";

export function totalCarrinho(itens: ItemEncomendaCliente[]) {
  let total = 0;

  for (let i = 0; i < itens.length; i++) {
    const item = itens[i];
    total += Number(precoTotal(item.quantidade, item.preco_venda));
  }

  return total.toString();
}

function InvoicesTableBody() {
  const { data, result, filtro } = useGetEncomendaCliente({
    currentPage: 1,
    peerPage: 20,
    estado: ["Entregue", ""],
  });
  return (
    <TBody>
      {result.isSuccess &&
        data?.encomenda.map((encomenda) => (
          <Tr key={encomenda.id} className="hover:bg-primary/10">
            <td className="text-center px-2 md:pl-8 md:py-4 md:text-left">
              <Link
                className="underline decoration-dotted"
                href={`/user/invoices/${encomenda.id}`}
              >
                {encomenda.codigo}
              </Link>
            </td>
            <td className="text-center px-2 md:p-0 md:text-left">
              {encomenda.estado_encomenda.nome}
            </td>
            <td className="py-4 text-center px-2 md:p-0 md:text-left">
              {dateFormat(encomenda.updated_at)}
            </td>
            {/* <td className="py-4 text-center px-2 md:p-0 md:text-left">
              12/10/2023
            </td> */}
            <td className="py-4 text-center px-2 md:p-0 md:text-left">
              {numberToMoney(totalCarrinho(encomenda.itens_encomenda))}
            </td>
          </Tr>
        ))}
      {result.isSuccess && (
        <Tr className="hover:bg-primary/10">
          <td className="px-2 md:pl-8 md:py-4" colSpan={2}>
            <div className="flex w-full">
              <button
                onClick={() => {
                  filtro({
                    currentPage: data?.prevPage,
                  });
                }}
                disabled={data!.currentPage <= 1}
                className="ml-auto bg-primary px-2 py-1 rounded text-white disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
            </div>
          </td>
          <td className="px-2 md:p-0" colSpan={2}>
            <button
              disabled={data!.lastPage === data?.currentPage}
              onClick={() => {
                filtro({
                  currentPage: data?.nextPage,
                });
              }}
              className="bg-primary px-2 py-1 rounded text-white disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Próxima
            </button>
          </td>
        </Tr>
      )}
    </TBody>
  );
}

export default InvoicesTableBody;
