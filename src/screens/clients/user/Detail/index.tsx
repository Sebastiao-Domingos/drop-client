"use client";
import Breadcrumb from "@/components/Breadcrumb";
import Edit from "./Edit";
import BreadcrumbItem from "@/components/Breadcrumb/BreadcrumbItem";
import { LoadingIcon } from "@/components/Alert";
import { useGetDataUsuario } from "@/hooks/useGetClientes";
import { formatPhoneNumber } from "@/helpers/functions/formatPhoneNumber";
import { useRouter } from "next/navigation";
import EditPassword from "./EditPassword";

function Detail() {
  const { data, result } = useGetDataUsuario();
  const navigator = useRouter();
  return (
    <div>
      <div>
        <Breadcrumb className="text-[12px] md:text-sm">
          <BreadcrumbItem href="/user/perfil" name="A minha conta" />
          <BreadcrumbItem href="/user/detail" name="Os meus dados" />
        </Breadcrumb>
      </div>
      <h2 className="uppercase font-bold">Os meus Dados</h2>
      {!result.isLoading ? (
        <>
          <div className="bg-white/80 dark:bg-gray-900 rounded mt-8 max-w-[45rem]">
            <ul className="flex flex-col">
              <li className="flex justify-between p-4 border-b dark:border-gray-800">
                <span className="flex flex-col gap-2 text-[12px]">
                  <span className="font-bold">Nome</span>
                  <span>{data?.usuario.nome}</span>
                </span>
                <Edit
                  atributo={1}
                  cliente={{
                    nome: data?.usuario.nome!,
                  }}
                  valueCliente={data?.usuario.nome!}
                >
                  <span>Editar</span>
                </Edit>
              </li>
              <li className="flex justify-between p-4 border-b dark:border-gray-800">
                <span className="flex flex-col gap-2 text-[12px]">
                  <span className="font-bold">Email</span>
                  <span>
                    {data?.contactos.filter(
                      (contacto) => contacto.tipo_contacto.nome === "Email"
                    )[0]?.conteudo || "Sem email"}{" "}
                  </span>
                </span>
                {/* <Edit
                  atributo={2}
                  valueCliente={
                    data?.contactos.filter(
                      (contacto) => contacto.tipo_contacto.nome === "Email"
                    )[0]?.conteudo!
                  }
                  cliente={{
                    email: data?.contactos.filter(
                      (contacto) => contacto.tipo_contacto.nome === "Email"
                    )[0]?.conteudo,
                  }}
                >
                  <span>Editar</span>
                </Edit> */}
              </li>
              <li className="flex justify-between p-4 border-b dark:border-gray-800">
                <span className="flex flex-col gap-2 text-[12px]">
                  <span className="font-bold">Palavra-passe</span>
                  <span>***********************</span>
                </span>
                <EditPassword
                // valueCliente={
                //   data?.usuario.enderecos_entrega.filter(
                //     (endereco) => endereco.predefinido
                //   )[0].endereco.rua!
                // }
                // atributo={3}
                // cliente={{
                //   rua: data?.usuario.enderecos_entrega.filter(
                //     (endereco) => endereco.predefinido
                //   )[0].endereco.rua!,
                // }}
                >
                  <span>Editar</span>
                </EditPassword>
              </li>
              <li className="flex justify-between p-4 border-b dark:border-gray-800">
                <span className="flex flex-col gap-2 text-[12px]">
                  <span className="font-bold">Whatsapp</span>
                  <span>
                    {formatPhoneNumber(
                      data?.contactos.filter(
                        (contacto) => contacto.tipo_contacto.nome === "Whatsapp"
                      )[0].conteudo!
                    )}
                  </span>
                </span>
                {/* <Edit
                  valueCliente={data?.usuario.nome!}
                  atributo={1}
                  cliente={{
                    nome: data?.usuario.nome!,
                  }}
                >
                  <span>Editar</span>
                </Edit> */}
              </li>
              <li className="flex justify-start flex-wrap gap-4 md:gap-10 p-4 border-b dark:border-gray-800">
                <span className="flex gap-4 md:gap-10">
                  <span className="flex flex-col gap-2 text-[12px]">
                    <span className="font-bold">País</span>
                    <span>Angola</span>
                  </span>
                  <span className="flex flex-col gap-2 text-[12px] border-l pl-4 md:pl-10  dark:border-l-gray-800">
                    <span className="font-bold">Província</span>
                    <span>
                      {
                        data?.usuario.enderecos_entrega[0].endereco.municipio
                          .provincia.nome
                      }
                    </span>
                  </span>
                  <span className="flex flex-col gap-2 text-[12px] border-l pl-4 md:pl-10 dark:border-l-gray-800">
                    <span className="font-bold">Município</span>
                    <span>
                      {
                        data?.usuario.enderecos_entrega[0].endereco.municipio
                          .nome
                      }
                    </span>
                  </span>
                </span>

                <button
                  className="uppercase text-xs pb-4 border-b dark:border-gray-800 hover:border-b-primary ml-auto"
                  onClick={() => navigator.push("/user/locality/edit")}
                >
                  Editar
                </button>
              </li>
              <li className="flex justify-between p-4 border-b dark:border-gray-800">
                <span className="flex flex-col gap-2 text-[12px]">
                  <span className="font-bold">NIF</span>
                  <span>{data?.usuario.nif}</span>
                </span>
              </li>
              <li className="flex justify-between p-4">
                <span className="flex flex-col gap-2 text-[12px]">
                  <span className="font-bold">
                    IBAM (Opcional -indica o IBAM para o reembolsos)
                  </span>
                  <span>-</span>
                </span>
                <Edit
                  valueCliente={data?.usuario.nome!}
                  atributo={1}
                  cliente={{
                    nome: data?.usuario.nome!,
                    email: data?.usuario.email!,
                    bairro: data?.usuario.enderecos_entrega.filter(
                      (endereco) => endereco.predefinido
                    )[0].endereco.bairro!,
                    ponto_referencia: data?.usuario.enderecos_entrega.filter(
                      (endereco) => endereco.predefinido
                    )[0].endereco.ponto_referencia!,
                    municipio_id: data?.usuario.enderecos_entrega.filter(
                      (endereco) => endereco.predefinido
                    )[0].endereco.municipio_id!,
                    rua: data?.usuario.enderecos_entrega.filter(
                      (endereco) => endereco.predefinido
                    )[0].endereco.rua!,
                  }}
                >
                  <span>Editar</span>
                </Edit>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center text-2xl mt-8">
          <LoadingIcon />
        </div>
      )}
    </div>
  );
}

export default Detail;
