"use client";

import { useStatus } from "@/hooks/useLoadingStatus";
import { RedirectType, redirect } from "next/navigation";
import LoadingStatus from "../../../../../@types/LoadingStatus";
import { useEffect } from "react";
import Link from "next/link";
import { LoadingIcon } from "@/components/Alert";
import { useGetDataUsuario } from "@/hooks/useGetClientes";
import { useGetEncomendaCliente } from "@/hooks/useGetEncomendaCliente";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableRowEncomenda from "../Commisions/TableRowEncomenda";
import { formatPhoneNumber } from "@/helpers/functions/formatPhoneNumber";

function Perfil() {
  const { status, setStatus } = useStatus();
  const { data, result } = useGetDataUsuario();
  const { data: dataEncomenda, result: resultEncomenda } =
    useGetEncomendaCliente({
      currentPage: 1,
      peerPage: 2,
      estado: [
        "Confirmação",
        "Expedição",
        "Pagamento",
        "Pendente",
        "Processamento",
        "Tratamento",
      ],
    });

  useEffect(() => {
    if (status !== LoadingStatus.SUCCESS) return;
    redirect("/", RedirectType.replace);
  }, [status]);

  return (
    <div className="w-full space-x-4">
      {result.isSuccess && (
        <>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex flex-col text-sm w-full md:w-[30%] h-[14rem] rounded bg-white dark:bg-gray-900 p-4">
              <h4>
                Seja-vindo à sua área pessoal,{" "}
                <span className="font-bold">{data?.usuario.nome}</span>
              </h4>

              <button
                onClick={() => {
                  fetch("/api/session/logout", { method: "POST" })
                    .then((res) => setStatus(LoadingStatus.SUCCESS))
                    .catch((err) => setStatus(LoadingStatus.ERROR));
                }}
                className="mt-auto p-2 bg-slate-200 dark:bg-gray-950/60 dark:hover:bg-gray-950"
              >
                Terminar a sessão
              </button>
            </div>
            <div className="w-full md:w-[30%] h-[14rem] bg-green-600 dark:bg-green-800 rounded p-4 text-white">
              <div className="flex justify-starts flex-row items-center gap-1">
                <h4>CUPÕES DISPONÍVEIS</h4>
                <span className="-rotate-45">
                  <i className="ri-price-tag-line text-2xl"></i>
                </span>
                <span className="text-xl">0</span>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-start md:flex-row gap-4 mt-8">
            <div className="flex flex-col text-sm w-full md:w-[30%] rounded bg-white dark:bg-gray-900 p-5 -ml-4">
              <h4 className="uppercase mb-3">
                Dados de{" "}
                <span className="font-bold">
                  {data?.usuario.nome.split(" ")[0]}
                </span>
              </h4>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <h5 className="uppercase text-sm font-bold">Contactos</h5>
                  <div className="text-[12px] mt-3">
                    {/* <p className="font-bold">{data?.usuario.nome}</p> */}
                    <ul>
                      {data?.contactos.map((cont) => (
                        <li className="" key={cont.id}>
                          <span>
                            {cont.tipo_contacto.nome.substring(0, 6)}:{" "}
                          </span>
                          <span className="font-bold line-clamp-1">
                            {formatPhoneNumber(cont.conteudo) || cont.conteudo}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="w-1/2 border-l dark:border-l-gray-800 pl-4">
                  <h5 className="uppercase text-sm font-bold">Endereço</h5>
                  <div className="text-xs space-y-2 mt-3">
                    <div>
                      <p className="font-bold">Rua</p>
                      <p>
                        {
                          data?.usuario.enderecos_entrega.filter(
                            (endereco) => endereco.predefinido
                          )[0].endereco.rua
                        }{" "}
                        (
                        {
                          data?.usuario.enderecos_entrega.filter(
                            (endereco) => endereco.predefinido
                          )[0].endereco.ponto_referencia
                        }
                        )
                      </p>
                    </div>
                    <div>
                      <p className="font-bold">Bairro</p>
                      <p>
                        {
                          data?.usuario.enderecos_entrega.filter(
                            (endereco) => endereco.predefinido
                          )[0].endereco.bairro
                        }
                      </p>
                    </div>
                    <div>
                      <p className="font-bold">Município</p>
                      <p>
                        {
                          data?.usuario.enderecos_entrega.filter(
                            (endereco) => endereco.predefinido
                          )[0].endereco.municipio.nome
                        }
                      </p>
                    </div>
                    <div>
                      <p className="font-bold">Província</p>
                      <p>
                        {
                          data?.usuario.enderecos_entrega.filter(
                            (endereco) => endereco.predefinido
                          )[0].endereco.municipio.provincia.nome
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Link href="/user/detail" className="p-2 border rounded w-[5rem]">
                <i className="ri-pencil-line"></i> <span>Editar</span>
              </Link>
            </div>

            <div className="flex flex-col justify-between gap-3 text-sm w-full md:w-[60%] min-h-[16rem] rounded bg-white dark:bg-gray-900 p-5 -ml-4 md:ml-0">
              <div className="flex justify-between items-center">
                <h4 className="uppercase mb-2 font-bold">Encomendas</h4>
                {resultEncomenda.isSuccess && (
                  <span className="p-1 text-xs text-white font-bold bg-slate-300 dark:bg-gray-900 rounded-3xl">
                    {dataEncomenda?.total}
                  </span>
                )}
              </div>

              {resultEncomenda.isError && (
                <p className="text-red-600 text-center">
                  Erro ao carregar as encomendas!
                </p>
              )}
              {resultEncomenda.isSuccess &&
                dataEncomenda?.encomenda.length === 0 && (
                  <div className="py-8">
                    <p className="text-xs md:text-sm">
                      Encomendas Sem Resultados
                    </p>
                  </div>
                )}
              {resultEncomenda.isSuccess &&
                dataEncomenda?.encomenda.length !== 0 && (
                  <>
                    <TableContainer className="mt-2">
                      <Table>
                        <TableHead>
                          <TableRow className="font-bold bg-blue-200/50">
                            <TableCell className="!font-bold">Cod.</TableCell>
                            <TableCell className="!font-bold">
                              Qtd produtos
                            </TableCell>
                            <TableCell className="!font-bold">Estado</TableCell>
                            <TableCell className="!font-bold">Envio</TableCell>
                            <TableCell className="!font-bold">
                              Detalhes
                            </TableCell>
                            <TableCell className="!font-bold"></TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {dataEncomenda?.encomenda.map((encomenda) => (
                            <TableRowEncomenda
                              key={encomenda.id}
                              encomenda={encomenda}
                            />
                            // <TableRow key={encomenda.id}>
                            //   <TableCell className="cursor-help">
                            //     <Tooltip title={encomenda.id} arrow>
                            //       <span>{encomenda.codigo}</span>
                            //     </Tooltip>
                            //   </TableCell>
                            //   <TableCell>
                            //     {encomenda.itens_encomenda.reduce(
                            //       (value, curr) => value + curr.quantidade,
                            //       0
                            //     )}
                            //   </TableCell>
                            //   <TableCell>
                            //     <Tooltip
                            //       title={encomenda.estado_encomenda.descricao}
                            //       arrow
                            //     >
                            //       <span className="p-1 shadow rounded text-white text-xs bg-gray-400 cursor-default">
                            //         {encomenda.estado_encomenda.nome}
                            //       </span>
                            //     </Tooltip>
                            //   </TableCell>
                            //   <TableCell>
                            //     {encomenda.envio.nome}
                            //     <Tooltip
                            //       title={
                            //         "Disponibilidade: " +
                            //         encomenda.envio.disponibilidade
                            //       }
                            //       arrow
                            //     >
                            //       <span className="w-4 h-4 inline-flex justify-center items-center p-1 ml-2 border-2 bg-gray-300 shadow rounded-full cursor-help">
                            //         <span className="material-symbols-outlined text-white text-xs">
                            //           question_mark
                            //         </span>
                            //       </span>
                            //     </Tooltip>
                            //   </TableCell>
                            //   <TableCell>
                            //     <Modal>
                            //       <Dialog.Trigger className="text-blue-600 underline">
                            //         Outros
                            //       </Dialog.Trigger>
                            //       <ModalAnimatedContent>
                            //         <div className="p-6">
                            //           <TableContainer className="max-h-[260px] md:max-h-[270px]">
                            //             <Table>
                            //               <TableHead className="bg-blue-200 sticky top-0">
                            //                 <TableRow>
                            //                   <TableCell className="!font-bold"></TableCell>
                            //                   <TableCell className="!font-bold">
                            //                     Qtd
                            //                   </TableCell>
                            //                   <TableCell className="!font-bold">
                            //                     Preço unit.
                            //                   </TableCell>
                            //                   <TableCell className="!font-bold">
                            //                     Total
                            //                   </TableCell>
                            //                 </TableRow>
                            //               </TableHead>

                            //               <TableBody>
                            //                 {encomenda.itens_encomenda.map(
                            //                   (item) => (
                            //                     <TableRow key={item.id}>
                            //                       <TableCell>
                            //                         {item.id.split("-")[0]}...
                            //                       </TableCell>
                            //                       <TableCell>
                            //                         {item.quantidade}
                            //                       </TableCell>
                            //                       <TableCell className="whitespace-nowrap">
                            //                         {numberToMoney(
                            //                           item.preco_venda
                            //                         )}
                            //                       </TableCell>
                            //                       <TableCell className="whitespace-nowrap">
                            //                         {numberToMoney(
                            //                           precoTotal(
                            //                             item.quantidade,
                            //                             item.preco_venda
                            //                           )
                            //                         )}
                            //                       </TableCell>
                            //                     </TableRow>
                            //                   )
                            //                 )}
                            //               </TableBody>
                            //             </Table>
                            //           </TableContainer>
                            //           <div className="mt-3 flex flex-row justify-between">
                            //             <span>Total:</span>
                            //             <span className="font-bold">
                            //               {numberToMoney(
                            //                 encomenda.itens_encomenda
                            //                   .reduce(
                            //                     (value, curr) =>
                            //                       value +
                            //                       Number(
                            //                         precoTotal(
                            //                           curr.quantidade,
                            //                           curr.preco_venda
                            //                         )
                            //                       ),
                            //                     0
                            //                   )
                            //                   .toString()
                            //               )}
                            //             </span>
                            //           </div>
                            //         </div>
                            //       </ModalAnimatedContent>
                            //     </Modal>
                            //   </TableCell>
                            // </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </>
                )}
              <Link
                href="/user/commissions"
                className="p-2 border rounded w-full text-xs text-center"
              >
                Ver encomendas
              </Link>
            </div>
          </div>
        </>
      )}

      {result.isLoading && (
        <div className="w-full flex items-center justify-center text-3xl">
          <LoadingIcon />
        </div>
      )}

      {result.isError && <div>{result.error.message}</div>}
    </div>
  );
}

export default Perfil;
