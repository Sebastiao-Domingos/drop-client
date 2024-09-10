"use client";

import Table, { TBody, THead, Tr } from "@/components/Table";
import { numberToMoney } from "@/helpers/functions/numberToMoney";
import { useGetCarrinho } from "@/hooks/useGetCarrinho";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HeaderContentCostumer } from "../Checkout";
import { LoadingIcon } from "@/components/Alert";
import { useGetDataUsuario } from "@/hooks/useGetClientes";
import { useActionEncomenda } from "@/hooks/useActionEncomenda";
import { Encomenda } from "@/services/encomenda";
import { useRouter } from "next/navigation";
import { subtotalPorProduto } from "../../Product/Cart";
import { desconto } from "../../Product/Details/Preco";
import { toast } from "react-toastify";

function Resume() {
  const { data, result } = useGetDataUsuario();
  const { data: carrinho, ...resultCarrinho } = useGetCarrinho();
  const [dadosCompra, setDadosCompra] = useState<Encomenda>();

  const router = useRouter();

  const { mutationCreate } = useActionEncomenda();

  useEffect(() => {
    function carregar_dados() {
      let encomenda: any = localStorage.getItem("encomenda");

      if (encomenda) {
        encomenda = JSON.parse(encomenda);

        setDadosCompra(encomenda);
      } else {
        toast("UPS! Verifique os dados da encomenda e tente novamente!", {
          type: "warning",
        });
      }
    }
    carregar_dados();
  }, []);

  return (
    <div className="w-full md:max-w-[1000px] m-auto p-2 md:p-4 /bg-white">
      <HeaderContentCostumer title="Resumo" checked={2} />

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
            {/* <ul className="flex gap-2 flex-wrap text-xs text-primary/60 italic">
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
            </ul> */}

            <div className="mt-6">
              <div className="space-y-6">
                <div className="overflow-auto py-4">
                  <Table>
                    <THead className="bg-white/70 text-sm font-bold">
                      <td className="pl-4">Produto</td>
                      <td>Descrição</td>
                      <td>Detalhe</td>
                      <td className="min-w-[80px] w-[50%]">Preço unit.</td>
                      <td>Qtd</td>
                      <td className="pr-4">Total</td>
                    </THead>
                    <TBody>
                      {carrinho?.carrinho.map((compra, index) => (
                        <Tr key={index} className="text-sm">
                          <td className="pl-4 py-4 min-w-[60px] w-[15%]">
                            <Image
                              src={compra.produto.imagem}
                              width={50}
                              height={50}
                              priority
                              alt={compra.produto.nome}
                              className="w-auto h-[50px]"
                            ></Image>
                          </td>
                          <td className="w-auto md:min-w-[450px]">
                            {compra.produto.nome}
                          </td>
                          <td>
                            {compra.produto.roupa && (
                              <div className="flex flex-row gap-2">
                                <span>{compra.tamanho}</span>
                                <span
                                  style={{
                                    backgroundColor: compra.cor,
                                  }}
                                  className="w-4 h-4 rounded-full inline-block"
                                ></span>
                              </div>
                            )}
                          </td>
                          <td className="min-w-[80px] w-[20%]">
                            {numberToMoney(
                              desconto(
                                compra.produto.preco,
                                compra.produto.itens_promocao[0]?.promocao
                                  .desconto || "0",
                                compra.produto.itens_promocao[0]?.promocao
                                  .percentagem
                              )
                            )}
                          </td>
                          <td className="min-w-[60px] w-[15%]">
                            {compra.quantidade}
                          </td>
                          <td className="pr-4 min-w-[60px] w-[45%]">
                            {numberToMoney(
                              subtotalPorProduto(compra)
                                // Number(compra.produto.preco) * compra.quantidade
                                .toString()
                            )}
                          </td>
                        </Tr>
                      ))}
                    </TBody>
                  </Table>
                </div>
              </div>

              {/* Endereços */}
              {dadosCompra && (
                <div className="flex flex-col md:flex-row gap-4 border-b dark:border-b-gray-800">
                  <div className="w-full py-4 md:py-6 md:w-[50%]">
                    <fieldset disabled>
                      <h3 className="uppercase font-bold">
                        endereço de facturação
                      </h3>
                      <ul className="space-y-3 mb-8 mt-4 text-sm">
                        <li className="flex flex-row gap-1 items-center">
                          <span className="font-bold text-slate-500 whitespace-nowrap">
                            Pais:{" "}
                          </span>
                          <input
                            type="text"
                            name="pais"
                            id="pais_entrega"
                            value={"Angola"}
                            className="p-1 w-full disabled:bg-transparent"
                            readOnly
                          />
                        </li>
                        <li className="flex flex-row gap-1 items-center">
                          <span className="font-bold text-slate-500 whitespace-nowrap">
                            Bairro:
                          </span>

                          <input
                            type="text"
                            // name="bairro"
                            id="bairro"
                            defaultValue={
                              dadosCompra.dados_endereco_faturacao.bairro
                            }
                            className="p-1 w-full disabled:bg-transparent"
                          />
                        </li>
                        <li className="flex flex-row gap-1 items-center">
                          <span className="font-bold text-slate-500 whitespace-nowrap">
                            Rua :
                          </span>
                          <input
                            type="text"
                            // name="rua"
                            id="rua_faturacao"
                            defaultValue={
                              dadosCompra.dados_endereco_faturacao.rua
                            }
                            className="p-1 w-full disabled:bg-transparent"
                          />
                        </li>
                        <li className="flex flex-row gap-1 items-center">
                          <span className="font-bold text-slate-500 whitespace-nowrap">
                            Ponto de referência:
                          </span>
                          <input
                            type="text"
                            // name="rua"
                            id="referencia_faturacao"
                            defaultValue={
                              dadosCompra.dados_endereco_faturacao
                                .ponto_referencia
                            }
                            className="p-1 w-full disabled:bg-transparent"
                          />
                        </li>
                      </ul>
                    </fieldset>
                  </div>
                </div>
              )}

              {/* Envio e pagamento */}
              {dadosCompra && (
                <div className="flex flex-col md:flex-row gap-4 border-b dark:border-b-gray-800">
                  <div className="w-full py-4 md:py-6 md:w-[50%]">
                    <fieldset disabled>
                      <h3 className="uppercase font-bold">Forma de envio</h3>
                      <ul className="space-y-3 mb-8 mt-4 text-sm">
                        <li className="flex flex-row gap-1 items-center">
                          <span className="font-bold text-slate-500 whitespace-nowrap">
                            Envio:{" "}
                          </span>
                          <input
                            type="text"
                            name="envio"
                            id="pais_entrega"
                            value={dadosCompra.tipo_envio}
                            className="p-1 w-full disabled:bg-transparent uppercase"
                            readOnly
                          />
                        </li>
                        <li className="flex flex-row gap-1 items-center">
                          <span className="font-bold text-slate-500 whitespace-nowrap">
                            Preço:
                          </span>
                          <input
                            type="text"
                            // name="bairro"
                            id="preco"
                            value={numberToMoney("0")}
                            className="p-1 w-full disabled:bg-transparent"
                            readOnly
                          />
                        </li>
                      </ul>
                    </fieldset>
                  </div>
                </div>
              )}

              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="p-6 text-center text-primary font-bold md:text-xl">
                  Total geral:
                </span>
                {dadosCompra && (
                  <span className="p-6 text-center text-primary font-bold md:text-xl">
                    {numberToMoney(
                      (Number(carrinho?.valor_total!) + Number(0)).toString()
                    )}
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center mt-6">
                <Link
                  href="/user/checkout"
                  className="p-2 md:px-4 rounded /bg-primary/50 text-primary border border-primary hover:border-red-600 text-center"
                >
                  <i className="ri-arrow-left-s-line mr-3"></i>Voltar
                </Link>
                {dadosCompra && (
                  <Link
                    href="/user/conclusion"
                    className="p-2 md:px-4 rounded bg-primary/70 hover:bg-primary/90 text-white text-center"
                    onClick={(evt) => {
                      evt.preventDefault();
                      mutationCreate.mutate(dadosCompra, {
                        onSuccess(data) {
                          localStorage.removeItem("encomenda");

                          router.push(
                            "/user/conclusion?encomenda=" + data.codigo
                          );
                        },
                        onError(error) {
                          toast(
                            error.message ||
                              "Não foi possível efectuar a encomenda!",
                            { type: "error" }
                          );
                        },
                      });
                    }}
                  >
                    Concluir encomenda
                    {/* Próximo <i className="ri-arrow-right-s-line ml-3"></i> */}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Resume;
