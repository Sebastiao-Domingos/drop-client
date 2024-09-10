"use client";
import { LoadingIcon } from "@/components/Alert";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbItem from "@/components/Breadcrumb/BreadcrumbItem";
import { DEFAULT_TOAST_TIME_VISIBILITY } from "@/helpers/constants";
import { useActionEndereco } from "@/hooks/encomenda/cliente/endereco/useActionEndereco";
import { useGetEndereco } from "@/hooks/encomenda/cliente/endereco/useGetEndereco";
import { useGetDataUsuario } from "@/hooks/useGetClientes";
import { EnderecoData } from "@/services/encomenda/cliente/Endereco";
import Link from "next/link";
import { toast } from "react-toastify";

function Locality() {
  const { data, result } = useGetDataUsuario();
  const { data: enderecos, result: resultEndereco } = useGetEndereco();

  return (
    <div className="w-full space-x-1 md:space-x-4">
      <div>
        <Breadcrumb className="text-[12px] md:text-sm">
          <BreadcrumbItem href="/user/perfil" name="A minha conta" />
          <BreadcrumbItem href="/user/locality" name="Minha localização" />
        </Breadcrumb>
      </div>
      <h2 className="uppercase font-bold text-xs md:text-base">
        Meus endereços
      </h2>

      {!result.isLoading ? (
        <>
          <div className="w-full flex flex-col items-start justify-start flex-wrap md:flex-row gap-4 mt-8">
            <div className="flex flex-col justify-between text-sm w-full md:w-[16rem] h-[16rem] bg-white/40 rounded">
              <Link
                href="/user/locality/create"
                className="w-full h-full flex items-center justify-center border-2 border-dashed border-primary dark:border-gray-800 rounded group"
              >
                <span className="group-hover:text-primary text-center">
                  <span className="flex flex-col gap-8">
                    <i className="ri-add-circle-line text-2xl"></i>
                  </span>
                  <span className="uppercase text-[12px] p-2 border-b group-hover:border-b-primary dark:group-hover:border-gray-800">
                    Adicionar novo Endereço
                  </span>
                </span>
              </Link>
            </div>
            <div className="flex flex-col justify-between gap-3 text-sm w-full md:w-[280px] min-h-[16rem] rounded bg-white dark:bg-gray-900 p-5 md:ml-0">
              <div>
                <h4 className="uppercase font-bold">Meu Endereço</h4>
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

              <div className="space-x-2 text-right">
                <Link
                  href="/user/locality/edit"
                  className="p-2 border rounded w-[6rem]"
                >
                  <i className="ri-pencil-line"></i> <span>Editar</span>
                </Link>
                {/* <button className="p-2 border rounded w-[6rem]">
                  <i className="ri-delete-bin-line"></i> <span>Apagar</span>
                </button> */}
              </div>
            </div>

            {resultEndereco.isSuccess &&
              enderecos
                ?.filter((endereco) => !endereco.predefinido)
                .map((endereco) => (
                  <div
                    key={endereco.id}
                    className="flex flex-col justify-between gap-3 text-sm w-full md:w-[280px] min-h-[16rem] rounded bg-white dark:bg-gray-900 p-5"
                  >
                    <div>
                      <h4 className="uppercase font-bold">
                        {endereco.descricao}
                      </h4>
                      <div className="text-xs space-y-2 mt-3">
                        <div>
                          <p className="font-bold">Rua</p>
                          <p>
                            {endereco.endereco.rua} (
                            {endereco.endereco.ponto_referencia})
                          </p>
                        </div>
                        <div>
                          <p className="font-bold">Bairro</p>
                          <p>{endereco.endereco.bairro}</p>
                        </div>
                        <div>
                          <p className="font-bold">Município</p>
                          <p>{endereco.endereco.municipio.nome}</p>
                        </div>
                        <div>
                          <p className="font-bold">Província</p>
                          <p>{endereco.endereco.municipio.provincia.nome}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-x-2 text-right">
                      {/* <Link
                        href="/user/locality/edit"
                        className="p-2 border rounded w-[6rem]"
                      >
                        <i className="ri-pencil-line"></i> <span>Editar</span>
                      </Link> */}
                      <DeleteEnderecoButton endereco={endereco} />
                    </div>
                  </div>
                ))}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center text-2xl">
          <LoadingIcon />
        </div>
      )}
    </div>
  );
}

function DeleteEnderecoButton({ endereco }: { endereco: EnderecoData }) {
  const { mutationDelete } = useActionEndereco();

  return (
    <>
      <button
        onClick={() => {
          mutationDelete.mutate(endereco.id, {
            onError(error) {
              toast(error.message || "Erro ao eleminar endereço", {
                type: "error",
              });
            },
            onSuccess() {
              toast("Endereço eliminado", {
                type: "success",
                autoClose: DEFAULT_TOAST_TIME_VISIBILITY,
              });
            },
          });
        }}
        disabled={mutationDelete.isPending}
        className="text-red-600 hover:text-red-700 transition-colors"
      >
        <span className="material-symbols-outlined text-lg">delete</span>
      </button>
    </>
  );
}

export default Locality;
