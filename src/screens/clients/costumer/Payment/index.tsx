"use client";
import { useGetDataUsuario } from "@/hooks/useGetClientes";
import { HeaderContentCostumer } from "../Checkout";
import { LoadingIcon } from "@/components/Alert";
import Link from "next/link";
import Image from "next/image";
// import Table, { TBody, THead, Tr } from "@/components/Table";
// import { useGetCarrinho } from "@/hooks/useGetCarrinho";
// import { numberToMoney } from "@/helpers/functions/numberToMoney";
import { useGetModoPagamento } from "@/hooks/useActionModoPagamento";
import { twJoin } from "tailwind-merge";
import { useState } from "react";
import { ModoPagamentoResponse } from "@/services/encomenda/admin/modo_pagamento";
import { toast } from "react-toastify";

function Payment() {
  const { data, result } = useGetDataUsuario();
  // const { data: carrinho, ...resultCarrinho } = useGetCarrinho();
  const { data: pagamentos, result: pagamentosResult } = useGetModoPagamento();
  const [pagamento, setPagamento] = useState<ModoPagamentoResponse>();

  return (
    <div className="w-full md:max-w-[1000px] m-auto p-2 md:p-4">
      <HeaderContentCostumer title="Pagamento" checked={3} />

      {result.isLoading && (
        <div className="w-full flex justify-center text-xl">
          <LoadingIcon />
        </div>
      )}

      {result.isError && (
        <div className="w-full text-center">
          <p className="text-red-400">
            Upsi! , Ocorreu um erro ao carregar os dados
          </p>
        </div>
      )}

      {result.isSuccess && (
        <div className="space-y-12">
          <div className="pt-2">
            <ul className="flex gap-2 flex-wrap text-xs text-primary/60 italic">
              <li>{data?.usuario.nome}</li>/
              <li>
                {
                  data?.usuario.enderecos_entrega.filter(
                    (endereco) => endereco.predefinido
                  )[0].endereco.municipio.provincia.nome
                }
              </li>
              /
              <li>
                {
                  data?.usuario.enderecos_entrega.filter(
                    (endereco) => endereco.predefinido
                  )[0].endereco.municipio.nome
                }
              </li>
              /
              <li>
                {
                  data?.usuario.enderecos_entrega.filter(
                    (endereco) => endereco.predefinido
                  )[0].endereco.rua
                }{" "}
                <span className="italic">
                  (
                  {
                    data?.usuario.enderecos_entrega.filter(
                      (endereco) => endereco.predefinido
                    )[0].endereco.ponto_referencia
                  }
                  )
                </span>
              </li>
            </ul>

            <p className="text-center font-bold mt-6">
              Escolha a forma como deseja efectuar o pagamento!
            </p>

            <div className="mt-6">
              <div className="space-y-6">
                <div className="overflow-auto py-4">
                  {/* <Table>
                    <THead className="bg-white/70">
                      <td className="pl-4">Produto</td>
                      <td>Descrição</td>
                      <td className="min-w-[80px] w-[50%]">Preço unit.</td>
                      <td>Qtd</td>
                      <td className="pr-4">Total</td>
                    </THead>
                    <TBody>
                      {carrinho?.carrinho.map((compra, index) => (
                        <Tr key={index}>
                          <td className="pl-4 py-4  min-w-[60px] w-[15%]">
                            <Image
                              src={compra.produto.imagem}
                              width={100}
                              height={100}
                              priority
                              alt={compra.produto.nome}
                              className="w-auto h-[60px]"
                            ></Image>
                          </td>
                          <td className="w-auto md:min-w-[500px]">
                            {compra.produto.nome}
                          </td>
                          <td className="min-w-[80px] w-[20%]">
                            {numberToMoney(compra.produto.preco)}
                          </td>
                          <td className="min-w-[60px] w-[15%]">
                            {compra.quantidade}
                          </td>
                          <td className="pr-4 min-w-[60px] w-[45%]">
                            {numberToMoney(
                              (
                                Number(compra.produto.preco) * compra.quantidade
                              ).toString()
                            )}
                          </td>
                        </Tr>
                      ))}
                      <Tr className="">
                        <td
                          colSpan={2}
                          className="p-6 text-center text-primary font-bold md:text-xl"
                        >
                          Total geral{" "}
                        </td>
                        <td
                          colSpan={3}
                          className=" text-center text-primary font-bold md:text-2xl"
                        >
                          {numberToMoney(carrinho?.valor_total)}
                        </td>
                      </Tr>
                    </TBody>
                  </Table> */}
                </div>
                <div className="flex items-center justify-between gap-9 flex-wrap">
                  {pagamentosResult.isSuccess &&
                    pagamentos?.map((pagamentoData) => (
                      <button
                        key={pagamentoData.id}
                        className={twJoin(
                          "w-full flex items-center pl-2 md:w-[48%] h-[100px] bg-blue-600 rounded shadow bg-[url('/images/payment-method/express.jpg')] bg-center bg-cover bg-no-repeat hover:outline hover:outline-4 outline-red-600",
                          pagamento !== undefined &&
                            pagamento.id === pagamentoData.id
                            ? "outline outline-4"
                            : ""
                        )}
                        onClick={() => setPagamento(pagamentoData)}
                      >
                        <Image
                          src={pagamentoData.imagem} //{"/images/payment-method/express.png"}
                          width={80}
                          height={80}
                          alt={"Foto de express"}
                        />
                        <span className="text-white font-bold">
                          {pagamentoData.nome}
                        </span>
                      </button>
                    ))}
                  {/* <button className="w-full md:w-[48%] h-[100px] bg-blue-600 rounded shadow bg-[url('/images/payment-method/banco.jpg')] bg-cover bg-center bg-no-repeat text-white">
                    Banco
                  </button>
                  <button className="w-full items-center pl-2 md:w-[48%] h-[100px] bg-blue-600 rounded shadow bg-[url('/images/payment-method/express.jpg')] bg-center bg-cover bg-no-repeat">
                    <Image
                      src={"/images/payment-method/express.png"}
                      width={80}
                      height={80}
                      alt={"Foto de express"}
                    />
                  </button>
                  <button className="flex items-center pl-2 w-full md:w-[48%] h-[100px] bg-blue-600 rounded shadow bg-[url('/images/payment-method/multicaixa.jpg')] bg-center bg-cover bg-no-repeat')]">
                    <Image
                      src={"/images/payment-method/mult.png"}
                      width={80}
                      height={80}
                      alt={"Foto de express"}
                    />
                  </button> */}
                </div>
              </div>
              <div className="flex justify-between items-center mt-6">
                <Link
                  href="/user/send"
                  className="p-2 md:px-4 rounded /bg-primary/50 text-primary border border-primary hover:border-red-600 text-center"
                >
                  <i className="ri-arrow-left-s-line mr-3"></i>Voltar
                </Link>
                <Link
                  href="/user/resume"
                  className="p-2 md:px-4 rounded bg-primary/70 hover:bg-primary/90 text-white text-center"
                  onClick={(evt) => {
                    if (pagamento === undefined) {
                      evt.preventDefault();
                      toast(
                        "Por favor selecione uma forma de pagamento antes de continuar!",
                        { type: "warning" }
                      );

                      return;
                    }

                    localStorage.setItem(
                      "pagamento",
                      JSON.stringify(pagamento)
                    );
                  }}
                >
                  Próximo <i className="ri-arrow-right-s-line ml-3"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;
