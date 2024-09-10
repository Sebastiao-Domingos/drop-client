"use client";

import {
  Table as MaterialTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useGetEncomendaClienteDetalhe } from "@/hooks/encomenda/cliente/useGetEncomendaClienteDetalhe";
import { getCorEstado, precoTotal } from "../TableRowEncomenda";
import { numberToMoney } from "@/helpers/functions/numberToMoney";
import { dateFormat } from "@/helpers/functions/dateFormat";
import Table, { TBody, Tr } from "@/components/Table";
import { Button } from "@/components/Buttons/Button";
import { reuseOrderClient } from "@/actions/reuse-order-client";
import { useStatus } from "@/hooks/useLoadingStatus";
import LoadingStatus from "../../../../../../@types/LoadingStatus";
import Link from "next/link";
import { toast } from "react-toastify";
import { DEFAULT_TOAST_TIME_VISIBILITY } from "@/helpers/constants";
import { LoadingModal } from "@/components/Alert/Loading";

interface CommissionsDetailsProps {
  params: {
    encomendaID: string;
    encomendaCodigo: string;
  };
}

function CommissionsDetails({ params }: CommissionsDetailsProps) {
  const { data, result } = useGetEncomendaClienteDetalhe(params.encomendaID);
  const { setStatus, status } = useStatus();

  return (
    <>
      {result.isPending && (
        <div>
          <LoadingModal isLoading={result.isPending} />
        </div>
      )}
      {result.isError && <p>{result.error.message}</p>}
      {result.isSuccess && (
        <div>
          <div className="space-y-2 w-full flex flex-col">
            <h1 className="font-bold text-xl">
              {decodeURIComponent(params.encomendaCodigo)}
            </h1>
            <Table className="w-auto /md:min-w-[550px]">
              <TBody>
                <Tr>
                  <td className="py-2 w-[50%] lg:w-[330px]">Estado</td>
                  <td className="py-2 border-l pl-8 dark:border-l-gray-800">
                    <span
                      className="p-1 shadow rounded text-white text-xs cursor-default"
                      style={{
                        backgroundColor: getCorEstado(
                          data!.estado_encomenda.nome
                        ),
                      }}
                    >
                      {data!.estado_encomenda.nome}
                    </span>
                  </td>
                </Tr>
                <Tr>
                  <td className="py-2 w-[50%] lg:w-[330px]">Pago</td>
                  <td className="py-2 border-l pl-8 dark:border-l-gray-800">
                    <span className="font-bold">
                      {data!.pago ? "SIM" : "NÃO"}
                    </span>
                  </td>
                </Tr>
                {data?.estado_encomenda.nome === "Pagamento" && (
                  <Tr>
                    <td className="py-2 w-[50%] lg:w-[330px]">
                      Link de pagamento
                    </td>
                    <td className="py-2 border-l pl-8 dark:border-l-gray-800">
                      <Link
                        href={`/payment/${data.id}/${data.codigo.replace(
                          "/",
                          "-"
                        )}`}
                        className="text-blue-600 underline hover:no-underline"
                      >
                        Pagar
                      </Link>
                    </td>
                  </Tr>
                )}
                <Tr>
                  <td className="py-2 w-[50%] lg:w-[330px]">Valor total</td>
                  <td className="py-2 border-l pl-8 dark:border-l-gray-800">
                    <span className="font-bold">
                      {numberToMoney(data!.valor_total.toString())}
                    </span>
                  </td>
                </Tr>
                <Tr>
                  <td className="py-2 w-[50%] lg:w-[330px]">
                    Data da encomenda
                  </td>
                  <td className="py-2 border-l pl-8 dark:border-l-gray-800">
                    <span className="font-bold">
                      {dateFormat(data!.created_at)}
                    </span>
                  </td>
                </Tr>
                <Tr>
                  <td className="py-2 w-[50%] lg:w-[330px]">
                    Forma de levantamento
                  </td>
                  <td className="py-2 border-l pl-8 dark:border-l-gray-800">
                    <span className="font-bold uppercase">
                      {data!.envio.tipo}
                    </span>
                  </td>
                </Tr>
                <Tr>
                  <td className="py-2 w-[50%] lg:w-[330px]">
                    Código da encomenda
                  </td>
                  <td className="py-2 border-l pl-8 dark:border-l-gray-800">
                    <span className="font-bold">{data!.codigo}</span>
                  </td>
                </Tr>
                <Tr>
                  <td className="py-2 w-[50%] lg:w-[330px]">
                    Descrição do estado
                  </td>
                  <td className="py-2 border-l pl-8 dark:border-l-gray-800">
                    <span className="font-bold">
                      {data!.estado_encomenda.descricao}
                    </span>
                  </td>
                </Tr>
                {data?.estado_encomenda.nome === "Entregue" && (
                  <Tr className="hover:bg-transparent dark:hover:bg-transparent">
                    <td className="py-2 w-[50%]" colSpan={2}>
                      <Button
                        disabled={status === LoadingStatus.LOADING}
                        label="Reutilizar encomenda"
                        onClick={async () => {
                          setStatus(LoadingStatus.LOADING);
                          const toastID = toast(
                            "Reutilizando dados da encomenda...",
                            { type: "info", autoClose: false }
                          );

                          const datas = data.itens_encomenda.map((item) => ({
                            produto_id: item.produto.id,
                            quantidade: item.quantidade,
                            cor: item.cor === null ? undefined : item.cor,
                            tamanho:
                              item.tamanho === null ? undefined : item.tamanho,
                          }));

                          const result = await reuseOrderClient(datas);
                          toast.dismiss(toastID);

                          if (result === 200) {
                            toast("Dados adicionandos ao carrinho!", {
                              type: "success",
                              autoClose: DEFAULT_TOAST_TIME_VISIBILITY,
                            });
                            setStatus(LoadingStatus.SUCCESS);
                          } else {
                            toast(result, {
                              type: "error",
                            });
                            setStatus(LoadingStatus.ERROR);
                          }
                        }}
                        className="w-full"
                      />
                    </td>
                  </Tr>
                )}
              </TBody>
            </Table>
          </div>

          {/* endereço */}
          <hr className="my-4 dark:border-t-slate-800 w-full" />
          <div className="space-y-2 w-full flex flex-col">
            <h2 className="font-bold uppercase">
              Endereço de {data!.envio.tipo}
            </h2>
            {data!.envio.tipo === "entrega" && (
              <Table className="w-auto md:min-w-[550px]">
                <TBody>
                  <Tr>
                    <td className="py-2 w-[50%] lg:w-[330px]">
                      Custo de envio
                    </td>
                    <td className="py-2 border-l pl-8 dark:border-l-gray-800">
                      <span className="font-bold">
                        {numberToMoney(data!.envio.preco_envio.toString())}
                      </span>
                    </td>
                  </Tr>
                  <Tr>
                    <td className="py-2 md:min-w-[50%] lg:w-[330px]">
                      Província
                    </td>
                    <td className="py-2 border-l pl-8 dark:border-l-gray-800">
                      <span className="font-bold">
                        {
                          data!.envio.endereco_entrega?.endereco.municipio
                            .provincia.nome
                        }
                      </span>
                    </td>
                  </Tr>
                  <Tr>
                    <td className="py-2 md:min-w-[50%] lg:w-[330px]">
                      Município
                    </td>
                    <td className="py-2 border-l pl-8 dark:border-l-gray-800">
                      <span className="font-bold">
                        {data!.envio.endereco_entrega?.endereco.municipio.nome}
                      </span>
                    </td>
                  </Tr>
                  <Tr>
                    <td className="py-2 md:min-w-[50%] lg:w-[330px]">Bairro</td>
                    <td className="py-2 border-l pl-8 dark:border-l-gray-800">
                      <span className="font-bold">
                        {data!.envio.endereco_entrega?.endereco.bairro}
                      </span>
                    </td>
                  </Tr>
                  <Tr>
                    <td className="py-2 md:min-w-[50%] lg:w-[330px]">Rua</td>
                    <td className="py-2 border-l pl-8 dark:border-l-gray-800">
                      <span className="font-bold">
                        {data!.envio.endereco_entrega?.endereco.rua}
                      </span>
                    </td>
                  </Tr>
                  <Tr>
                    <td className="py-2 md:min-w-[50%] lg:w-[330px]">
                      Ponto de referência
                    </td>
                    <td className="py-2 border-l pl-8 dark:border-l-gray-800">
                      <span className="font-bold">
                        {
                          data!.envio.endereco_entrega?.endereco
                            .ponto_referencia
                        }
                      </span>
                    </td>
                  </Tr>
                </TBody>
              </Table>
            )}
            {data!.envio.tipo === "recolha" && (
              <Table className="w-auto md:min-w-[550px]">
                <TBody>
                  <Tr>
                    <td className="py-2 md:min-w-[50%] lg:w-[330px]">Local</td>
                    <td className="py-2 md:min-w-[40%] border-l pl-8 dark:border-l-gray-800">
                      <span className="font-bold">
                        {data!.envio.endereco_recolha?.nome}
                      </span>
                    </td>
                  </Tr>
                  <Tr>
                    <td className="py-2 md:min-w-[50%] lg:w-[330px]">
                      Custo de envio
                    </td>
                    <td className="py-2 md:min-w-[40%] border-l pl-8 dark:border-l-gray-800">
                      <span className="font-bold">
                        {numberToMoney(data!.envio.preco_envio.toString())}
                      </span>
                    </td>
                  </Tr>
                  {/* <Tr>
                    <td className="py-2 md:min-w-[50%] lg:w-[330px]">Contacto</td>
                    <td className="py-2 md:min-w-[40%] border-l pl-8 dark:border-l-gray-800">
                      <span className="font-bold">
                        {formatPhoneNumber(
                          data!.envio.endereco_recolha?.contacto || ""
                        )}
                      </span>
                    </td>
                  </Tr> */}
                  <Tr>
                    <td className="w-auto py-2 md:min-w-[50%]">
                      Tempo de envio
                    </td>
                    <td className="py-2 md:min-w-[40%] border-l pl-8 dark:border-l-gray-800">
                      <span className="font-bold">
                        {data!.envio?.tempo_envio}
                      </span>
                    </td>
                  </Tr>
                  <Tr>
                    <td className="py-2 md:min-w-[50%] lg:w-[330px]">
                      Disponibilidade
                    </td>
                    <td className="py-2 md:min-w-[40%] border-l pl-8 dark:border-l-gray-800">
                      <span className="font-bold">
                        {data!.envio.endereco_recolha?.disponibilidade}
                      </span>
                    </td>
                  </Tr>
                  <Tr>
                    <td className="py-2 md:min-w-[50%] lg:w-[330px]">
                      Província
                    </td>
                    <td className="py-2 md:min-w-[40%] border-l pl-8 dark:border-l-gray-800">
                      <span className="font-bold">
                        {
                          data!.envio.endereco_recolha?.endereco.municipio
                            .provincia.nome
                        }
                      </span>
                    </td>
                  </Tr>
                  <Tr>
                    <td className="py-2 md:min-w-[50%] lg:w-[330px]">
                      Município
                    </td>
                    <td className="py-2 md:min-w-[40%] border-l pl-8 dark:border-l-gray-800">
                      <span className="font-bold">
                        {data!.envio.endereco_recolha?.endereco.municipio.nome}
                      </span>
                    </td>
                  </Tr>
                  <Tr>
                    <td className="py-2 md:min-w-[50%] lg:w-[330px]">Bairro</td>
                    <td className="py-2 md:min-w-[40%] border-l pl-8 dark:border-l-gray-800">
                      <span className="font-bold">
                        {data!.envio.endereco_recolha?.endereco.bairro}
                      </span>
                    </td>
                  </Tr>
                  <Tr>
                    <td className="py-2 md:min-w-[50%] lg:w-[330px]">Rua</td>
                    <td className="py-2 md:min-w-[40%] border-l pl-8 dark:border-l-gray-800">
                      <span className="font-bold">
                        {data!.envio.endereco_recolha?.endereco.rua}
                      </span>
                    </td>
                  </Tr>
                  <Tr>
                    <td className="py-2 md:min-w-[50%] lg:w-[330px]">
                      Ponto de referência
                    </td>
                    <td className="py-2 md:min-w-[40%] border-l pl-8 dark:border-l-gray-800">
                      <span className="font-bold">
                        {
                          data!.envio.endereco_recolha?.endereco
                            .ponto_referencia
                        }
                      </span>
                    </td>
                  </Tr>
                </TBody>
              </Table>
            )}
          </div>

          {/* produtos */}
          <div className="w-full">
            <h2 className="font-bold my-4 uppercase">Produtos</h2>
            <TableContainer className="max-h-[260px] md:max-h-[270px] w-full">
              <MaterialTable>
                <TableHead className="bg-blue-200 sticky top-0">
                  <TableRow>
                    <TableCell className="!font-bold"></TableCell>
                    <TableCell className="!font-bold">Detalhes</TableCell>
                    <TableCell className="!font-bold">Qtd</TableCell>
                    <TableCell className="!font-bold">Preço unit.</TableCell>
                    <TableCell className="!font-bold">Total</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody className="dark:bg-gray-900">
                  {data!.itens_encomenda.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <span className="whitespace-nowrap line-clamp-1 max-">
                          {item.produto.nome}
                        </span>
                      </TableCell>
                      <TableCell className="dark:text-slate-400">
                        {item.cor && (
                          <div className="flex flex-row gap-2">
                            <span>{item.tamanho}</span>
                            <span
                              style={{
                                backgroundColor: item.cor,
                              }}
                              className="w-4 h-4 rounded-full inline-block"
                            ></span>
                          </div>
                        )}
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
                  <TableRow>
                    <TableCell
                      className="whitespace-nowrap dark:text-slate-400 !text-right !font-bold"
                      colSpan={4}
                    >
                      <span className="border-r pr-4 ">Total da compra </span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap dark:text-slate-400 !text-left !font-bold">
                      {numberToMoney(
                        Number(
                          data!.itens_encomenda.reduce(
                            (acc, item) =>
                              acc + item.quantidade * Number(item.preco_venda),
                            0
                          )
                        ).toString()
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </MaterialTable>
            </TableContainer>
          </div>
        </div>
      )}
    </>
  );
}

export default CommissionsDetails;
