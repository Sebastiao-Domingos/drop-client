"use client";

import { numberToMoney } from "@/helpers/functions/numberToMoney";
import { useGetEncomendaClienteDetalhe } from "@/hooks/encomenda/cliente/useGetEncomendaClienteDetalhe";
import Image from "next/image";
import React from "react";
import { precoTotal } from "../Commisions/TableRowEncomenda";
import { dateFormat } from "@/helpers/functions/dateFormat";
import { totalCarrinho } from "./InvoicesTableBody";
import { Button } from "@/components/Buttons/Button";
import generatePDF, { Resolution, Margin, Options } from "react-to-pdf";

interface BillingProps {
  params: {
    bill: string;
  };
}

function Billing({ params }: BillingProps) {
  const { data, result } = useGetEncomendaClienteDetalhe(params.bill);

  if (result.isPending) return "Carregando";
  if (result.isError)
    return <p>Não foi possível carregar a fatura {params.bill}</p>;

  return (
    <>
      <div className="bg-white p-10 space-y-6 shadow-md w-full overflow-auto">
        <div className="flex flex-col gap-4 md:gap-0 md:flex-row">
          <div className="flex flex-col items-center">
            <Image
              src={"/images/logo_azul.svg"}
              width={36}
              height={36}
              alt="dunorte"
              className="h-auto w-28"
            />
            {/* <p className="font-bold mt-2 text-center text-xs">
            Dunorte Solutions
          </p> */}
          </div>
          <div className="ml-auto text-xs">
            <p className="font-bold">Outras informações</p>
            <p className="font-bold">
              Data de faturação: {dateFormat(data?.updated_at!)}
            </p>
          </div>
        </div>

        <table className="text-sm">
          <tbody>
            <tr className="border-b border-b-slate-200">
              <td className="py-2">Cliente: </td>
              <td className="py-2">{data?.cliente.nome}</td>
            </tr>
            <tr className="border-b border-b-slate-200">
              <td className="py-2">NIF/BI: </td>
              <td className="py-2">{data?.cliente.nif}</td>
            </tr>
            <tr className="border-b border-b-slate-200">
              <td className="py-2">Encomenda: </td>
              <td className="py-2">{data?.codigo}</td>
            </tr>
            <tr className="border-b border-b-slate-200">
              <td className="py-2">Endereço faturação: </td>
              <td className="py-2">
                {data?.endereco_faturacao.municipio.provincia.nome} /{" "}
                {data?.endereco_faturacao.municipio.nome} /{" "}
                {data?.endereco_faturacao.bairro} /{" "}
                {data?.endereco_faturacao.rua}
              </td>
            </tr>
          </tbody>
        </table>

        <table className="w-full text-sm">
          <thead className="bg-gray-400/30">
            <tr>
              <th>Produto</th>
              <th>Especif.</th>
              <th>Qtd</th>
              <th>Preço unit.</th>
              <th>Preço total</th>
            </tr>
          </thead>
          <tbody>
            {data?.itens_encomenda.map((item) => {
              return (
                <tr key={item.id} className="border-b border-b-slate-200">
                  <td className="py-2">{item.produto.nome}</td>
                  <td className="py-2">
                    {item?.tamanho && (
                      <>
                        {item.tamanho.toUpperCase()} {": "}
                      </>
                    )}
                    {item?.cor && (
                      <span
                        className="inline-block w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.cor }}
                      ></span>
                    )}
                  </td>
                  <td className="py-2">{item.quantidade}</td>
                  <td className="py-2">{numberToMoney(item.preco_venda)}</td>
                  <td className="py-2">
                    {numberToMoney(
                      precoTotal(item.quantidade, item.preco_venda)
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <table className="w-full text-sm bg-gray-400/30">
          <tbody>
            <tr className="">
              <td className="py-2">Total:</td>
              <td className="py-2 text-right">
                {numberToMoney(totalCarrinho(data?.itens_encomenda!))}
              </td>
            </tr>
          </tbody>
        </table>

        <p className="font-bold text-sm">
          OBS.: Esta fatura não é válida como comprovante em caso de reclamação
        </p>
      </div>
      {/* pdf file */}
      <div className="h-0 w-0 overflow-y-hidden">
        <div
          id="fatura"
          className="bg-white p-10 space-y-6 w-[1016px] overflow-auto"
        >
          <div className="flex">
            <div className="flex flex-col items-center">
              <Image
                src={"/images/logo_azul.svg"}
                width={36}
                height={36}
                alt="dunorte"
                className="h-auto w-28"
              />
              {/* <p className="font-bold mt-2 text-center text-xs">
            Dunorte Solutions
          </p> */}
            </div>
            <div className="ml-auto text-xs">
              <p className="font-bold">Outras informações</p>
              <p className="font-bold">
                Data de faturação: {dateFormat(data?.updated_at!)}
              </p>
            </div>
          </div>

          <table className="text-sm">
            <tbody>
              <tr className="border-b border-b-slate-200">
                <td className="py-2">Cliente: </td>
                <td className="py-2">{data?.cliente.nome}</td>
              </tr>
              <tr className="border-b border-b-slate-200">
                <td className="py-2">NIF/BI: </td>
                <td className="py-2">{data?.cliente.nif}</td>
              </tr>
              <tr className="border-b border-b-slate-200">
                <td className="py-2">Encomenda: </td>
                <td className="py-2">{data?.codigo}</td>
              </tr>
              <tr className="border-b border-b-slate-200">
                <td className="py-2">Endereço faturação: </td>
                <td className="py-2">
                  {data?.endereco_faturacao.municipio.provincia.nome} /{" "}
                  {data?.endereco_faturacao.municipio.nome} /{" "}
                  {data?.endereco_faturacao.bairro} /{" "}
                  {data?.endereco_faturacao.rua}
                </td>
              </tr>
            </tbody>
          </table>

          <table className="w-full text-sm">
            <thead className="bg-gray-400/30">
              <tr>
                <th>Produto</th>
                <th>Especif.</th>
                <th>Qtd</th>
                <th>Preço unit.</th>
                <th>Preço total</th>
              </tr>
            </thead>
            <tbody>
              {data?.itens_encomenda.map((item) => {
                return (
                  <tr key={item.id} className="border-b border-b-slate-200">
                    <td className="py-2">{item.produto.nome}</td>
                    <td className="py-2">
                      {item?.tamanho && (
                        <>
                          {item.tamanho.toUpperCase()} {": "}
                        </>
                      )}
                      {item?.cor && (
                        <span
                          className="inline-block w-4 h-4 rounded-full"
                          style={{ backgroundColor: item.cor }}
                        ></span>
                      )}
                    </td>
                    <td className="py-2">{item.quantidade}</td>
                    <td className="py-2">{numberToMoney(item.preco_venda)}</td>
                    <td className="py-2">
                      {numberToMoney(
                        precoTotal(item.quantidade, item.preco_venda)
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <table className="w-full text-sm bg-gray-400/30">
            <tbody>
              <tr className="">
                <td className="py-2">Total:</td>
                <td className="py-2 text-right">
                  {numberToMoney(totalCarrinho(data?.itens_encomenda!))}
                </td>
              </tr>
            </tbody>
          </table>

          <p className="font-bold text-sm">
            OBS.: Esta fatura não é válida como comprovante em caso de
            reclamação
          </p>
        </div>
      </div>
      <Button
        onClick={async () => {
          const options: Options = {
            filename: `fatura-${data?.codigo}.pdf`,
            method: "save",
            // default is Resolution.MEDIUM = 3, which should be enough, higher values
            // increases the image quality but also the size of the PDF, so be careful
            // using values higher than 10 when having multiple pages generated, it
            // might cause the page to crash or hang.
            resolution: Resolution.EXTREME,
            page: {
              // margin is in MM, default is Margin.NONE = 0
              margin: Margin.NONE,
              // default is 'A4'
              format: "A4",
              // default is 'portrait'
              orientation: "portrait",
            },
            canvas: {
              // default is 'image/jpeg' for better size performance
              mimeType: "image/jpeg",
              qualityRatio: 1,
            },
            // Customize any value passed to the jsPDF instance and html2canvas
            // function. You probably will not need this and things can break,
            // so use with caution.
            overrides: {
              // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
              pdf: {
                compress: true,
              },
              // see https://html2canvas.hertzen.com/configuration for more options
              canvas: {
                useCORS: true,
              },
            },
          };

          // you can also use a function to return the target element besides using React refs
          const getTargetElement = () => document.getElementById("fatura");

          const downloadPdf = () => generatePDF(getTargetElement, options);
          await downloadPdf();
        }}
        label="Imprimir"
        className="text-white mt-4"
      />
    </>
  );
}

export default Billing;
