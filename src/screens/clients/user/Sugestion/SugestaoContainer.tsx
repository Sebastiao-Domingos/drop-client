"use client";

import React from "react";
import { numberToMoney } from "@/helpers/functions/numberToMoney";
import { useGetSugestaoItemEncomendaClient } from "@/hooks/encomenda/cliente/sugestaoItemProdutoEncomenda/useGetSugestaoItemEncomenda";
import * as Accordion from "@radix-ui/react-accordion";
import { ItemBody } from "./Item";
import { ModalDeny } from "./ModalDeny";
import Link from "next/link";
import ImageWithFallback from "@/components/ImageWithFallback";
import { LoadingModal } from "@/components/Alert/Loading";
import { SugestaoEstado } from "@/controllers/encomenda/cliente/SugestaoItemEncomendaProdutoController";

interface SugestaoContainerProps {
  estado: SugestaoEstado;
}

function SugestaoContainer({ estado }: SugestaoContainerProps) {
  const { data, result } = useGetSugestaoItemEncomendaClient(estado);
  return (
    <>
      <LoadingModal isLoading={result.isPending} />
      {result.isSuccess && data?.length === 0 && (
        <p className="text-center font-bold">Nenhuma sugestão</p>
      )}
      {result.isSuccess && data?.length !== 0 && (
        <>
          <Accordion.Root
            className="shadow rounded overflow-x-auto"
            type={"single"}
            collapsible
          >
            {data?.map((item, index) => (
              <Accordion.Item
                key={item.id + index}
                className="mb-3 w-full"
                value={item.id}
              >
                <Accordion.AccordionHeader className="border dark:border-gray-800 dark:bg-slate-950 last:border-none rounded rounded-b-none">
                  <Accordion.Trigger className="group w-full p-4 text-primary flex flex-row items-center gap-2 hover:bg-gray-50 dark:bg-gray-950/30 dark:hover:bg-gray-800">
                    <div className="w-full flex flex-col gap-2">
                      <div className="mr-auto flex flex-col md:flex-row">
                        <h2 className="text-start">
                          Encomenda:{" "}
                          <Link
                            className="font-bold underline"
                            href={`/user/commissions/${
                              item.item_encomenda.encomenda_id
                            }/${encodeURIComponent(
                              item.item_encomenda.encomenda.codigo
                            )}`}
                          >
                            {item.item_encomenda.encomenda.codigo}
                          </Link>
                        </h2>
                      </div>
                    </div>
                    <i className="group-data-[state=open]:rotate-180 transition-transform transition-transform-[] ri-arrow-drop-down-line ml-auto"></i>
                  </Accordion.Trigger>
                </Accordion.AccordionHeader>
                <Accordion.AccordionContent className="bg-gray-100/20 dark:bg-transparent border">
                  <div className="mb-3 p-4 bg-red-600/10">
                    <h3>Item indisponível</h3>
                  </div>
                  <div className="w-full flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 px-4 pb-4">
                    <div className="relative mx-auto md:mx-0 w-[50px] h-[50px] bg-slate-600 rounded-full overflow-hidden">
                      <ImageWithFallback
                        src={item.item_encomenda.produto.imagem}
                        alt={item.item_encomenda.produto.nome}
                        width={50}
                        height={50}
                        className="w-full h-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        priority
                      />
                    </div>
                    <div className="flex flex-col items-start gap-1">
                      <p className="p-1 md:ml-4 rounded text-xs md:text-sm text-primary">
                        Produto:{" "}
                        <span className="font-bold">
                          {item.item_encomenda.produto.nome}
                        </span>
                      </p>
                      <div className="space-x-2 flex">
                        <p className="p-1 md:ml-4 rounded text-xs md:text-sm text-primary">
                          Preço:{" "}
                          <span className="font-bold">
                            {numberToMoney(item.item_encomenda.produto.preco)}
                          </span>
                        </p>
                        <p className="p-1 md:ml-4 rounded text-xs md:text-sm text-primary">
                          Quantidade:{" "}
                          <span className="font-bold">
                            {item.item_encomenda.quantidade
                              .toString()
                              .padStart(2, "0")}
                          </span>
                        </p>
                        {item.item_encomenda.produto.roupa && (
                          <>
                            <p className="p-1 md:ml-4 rounded text-xs md:text-sm text-primary">
                              Tamanho:{" "}
                              <span className="font-bold">
                                {item.item_encomenda.tamanho?.toUpperCase()}
                              </span>
                            </p>
                            <p className="flex flex-wrap items-center p-1 md:ml-4 rounded text-xs md:text-sm text-primary">
                              Cor:{" "}
                              <span
                                style={{
                                  backgroundColor: item.item_encomenda.cor!,
                                }}
                                className="inline-block w-6 h-6 rounded-full transition border"
                              ></span>
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <hr className="my-3 dark:border-t-gray-800" /> */}
                  <div className="flex justify-between items-center p-4 bg-primary/10 border-t dark:border-t-gray-800">
                    {item.nota}
                  </div>
                  <div className="mb-3 flex justify-between items-center p-4 bg-primary/10 border-t dark:border-t-gray-800">
                    <h3>Produtos sugeridos</h3>
                    {estado === "pendente" && <ModalDeny id={item.id} />}
                  </div>
                  <ul className="w-full">
                    {item.itens_sugestao.map((itemSugerido, index) => (
                      <ItemBody
                        estado={estado}
                        quantidade={item.item_encomenda.quantidade}
                        key={index}
                        itemSugerido={itemSugerido}
                        sugestao_id={item.id}
                      />
                    ))}
                  </ul>
                </Accordion.AccordionContent>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </>
      )}
    </>
  );
}

export default SugestaoContainer;
