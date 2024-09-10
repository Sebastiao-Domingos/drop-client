"use client";
import { useGetDataUsuario } from "@/hooks/useGetClientes";
import { LoadingIcon } from "@/components/Alert";
import Link from "next/link";
import TermsServices from "./TermsServices";
import { useGetEnvio } from "@/hooks/useGetEnvio";
import { numberToMoney } from "@/helpers/functions/numberToMoney";
import { useState } from "react";
import { EnvioResponse } from "@/services/encomenda/cliente/envio";
import { toast } from "react-toastify";

function Send() {
  const { data, result } = useGetDataUsuario();
  const { data: dataEnvio, result: resultEnvio } = useGetEnvio();
  const [envioID, setEnvio] = useState<EnvioResponse>();

  return (
    <div className="w-full md:max-w-[1000px] m-auto py-2 md:py-4 /bg-white">
      {/* <HeaderContentCostumer title="Endereço" checked={2} /> */}
      <h3 className="text-primary font-bold py-1 border-l-2 pl-2 my-5 md:text-xl">
        Selecionar o modo de envio
      </h3>

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

            <div className="mt-6">
              <form action="" className="space-y-8">
                {resultEnvio.isSuccess &&
                  dataEnvio?.map((envio) => (
                    <div
                      key={envio.id}
                      onChange={() => {
                        setEnvio(envio);
                      }}
                      className="min-h-[100px] flex items-center shadow px-4 py-2 bg-white/60 rounded"
                    >
                      <div className="w-[70px] flex">
                        <input
                          type="radio"
                          name="envio"
                          id={envio.id}
                          className="m-auto"
                          onChange={() => {
                            setEnvio(envio);
                          }}
                          checked={envio.id === envioID?.id}
                        />
                      </div>
                      <label
                        htmlFor={envio.id}
                        className="w-full px-4 border-x cursor-pointer"
                      >
                        <span className="font-bold text-sm text-primary block">
                          {envio.nome}
                        </span>
                        <span className="text-sm block">
                          Tempo de envio: {envio.tempo_envio} -{" "}
                          {envio.disponibilidade}
                        </span>
                      </label>
                      <div className="/w-[70px] px-2 flex">
                        <span className="m-auto text-center whitespace-nowrap text-xs font-bold italic">
                          {numberToMoney(envio.preco_envio)}
                        </span>
                      </div>
                    </div>
                  ))}

                {/* <div className="min-h-[100px] flex items-center shadow px-4 py-2 bg-white/60 rounded">
                  <div className="w-[70px] flex">
                    <input
                      type="radio"
                      name="send"
                      id="costumer"
                      className="m-auto"
                    />
                  </div>
                  <label
                    htmlFor="costumer"
                    className="w-full px-4 border-x cursor-pointer"
                  >
                    <span className="font-bold text-sm text-primary block">
                      Entrega em Casa / Escritório
                    </span>
                    <span className="text-sm block">
                      Tempo de envio: Entrega até 24/48h após pagamento - Dias
                      úteis das 8h às 16h30 e Sábados das 9h às 13h O melhor
                      preço e velocidade
                    </span>
                  </label>
                  <div className="w-[70px] flex">
                    <span className="m-auto italic">Grátis</span>
                  </div>
                </div>
                <div className="min-h-[100px] flex items-center shadow px-4 py-2 bg-white/60 rounded">
                  <div className="w-[70px] flex">
                    <input
                      type="radio"
                      name="send"
                      id="factory"
                      className="m-auto"
                    />
                  </div>
                  <label
                    htmlFor="factory"
                    className="w-full px-4 border-x cursor-pointer"
                  >
                    <span className="font-bold text-sm text-primary block">
                      Levantar na Loja
                    </span>
                    <span className="text-sm block">
                      Tempo de envio: Disponível para Levantamento em Loja –
                      24/48h Após o Pagamento
                    </span>
                  </label>
                  <div className="w-[70px] flex">
                    <span className="m-auto italic">Grátis</span>
                  </div>
                </div> */}

                <div className="space-y-2">
                  <h3 className="uppercase">Termos e serviços</h3>
                  <div className="space-x-3">
                    <input type="checkbox" name="" id="condition" />
                    <label htmlFor="#" className="text-sm">
                      Eu concordo e aceito incondicionalmente os termos de
                      serviços. ( {<TermsServices />}){" "}
                    </label>
                  </div>
                </div>
              </form>
              <div className="flex justify-between items-center mt-6">
                <Link
                  href="/user/checkout"
                  className="p-2 md:px-4 rounded /bg-primary/50 text-primary border border-primary hover:border-red-600 text-center"
                >
                  <i className="ri-arrow-left-s-line mr-3"></i>Voltar
                </Link>
                <Link
                  href="/user/resume"
                  className="p-2 md:px-4 rounded bg-primary/70 hover:bg-primary/90 text-white text-center"
                  onClick={(evt) => {
                    if (!envioID) {
                      toast("Deve selecionar pelo menos uma forma de envio!", {
                        type: "warning",
                      });
                      evt.preventDefault();
                      return;
                    }

                    localStorage.setItem("envio", JSON.stringify(envioID));
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

export default Send;
