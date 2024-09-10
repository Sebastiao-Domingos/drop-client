"use client";

import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbItem from "@/components/Breadcrumb/BreadcrumbItem";
import Select from "@/components/Select";
import { DEFAULT_TOAST_TIME_VISIBILITY } from "@/helpers/constants";
import { useActionEndereco } from "@/hooks/encomenda/cliente/endereco/useActionEndereco";
import { useGetMunicipio } from "@/hooks/useGetMunicipio";
import useGetPais from "@/hooks/useGetPais";
import { useGetProvincias } from "@/hooks/useGetProvincia";
import { Endereco } from "@/services/encomenda/cliente/Endereco";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function Create() {
  const { mutationCreate } = useActionEndereco();
  const { data: paises, result: resultPais } = useGetPais();
  const { body: provincias, result: resultProvincia } = useGetProvincias();
  const {
    data: municipios,
    result: resultMuncipio,
    setProvincia: filtrarMunicipio,
  } = useGetMunicipio("");

  const [pais, setPais] = useState("");

  const { register, handleSubmit } = useForm<Endereco>();

  const submit = (data: Endereco) => {
    data.latitude = "0";
    data.longitude = "0";

    mutationCreate.mutate(data, {
      onSettled() {
        toast("Endereço cadastrado", {
          type: "success",
          autoClose: DEFAULT_TOAST_TIME_VISIBILITY,
        });
      },
      onError(error) {
        toast(error.message || "Erro ao cadastrar endereço", { type: "error" });
      },
    });
  };

  return (
    <div className="w-full space-x-4">
      <div>
        <Breadcrumb className="text-[12px] md:text-sm">
          <BreadcrumbItem href="/user/perfil" name="A minha conta" />
          <BreadcrumbItem href="/user/locality" name="A minha morada" />
          <BreadcrumbItem
            href="/user/locality/create"
            name="Cadastrar endereço"
          />
        </Breadcrumb>
      </div>
      <div>
        <h2 className="uppercase font-bold">Cadastrar endereço</h2>
        <span className="text-[12px]">
          Os capmos com <span className="text-red-600">*</span> são obrigatórios
        </span>
      </div>

      <div className="mx-auto mt-6">
        <form onSubmit={handleSubmit(submit)}>
          <fieldset
            disabled={mutationCreate.isPending}
            className="w-full sm:w-[380px] pr-4 space-y-4"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="nome">
                Nome do endereço <span className="text-red-600">*</span>
              </label>
              <input
                {...register("descricao", { required: true })}
                type="text"
                id="nome"
                className="p-2 rounded shadow outline-none focus:border border-primary"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="pais">
                País <span className="text-red-600">*</span>
              </label>
              <Select
                className="p-2 outline-none bg-slate-200 rounded w-full"
                id="pais"
                onChange={(evt) => {
                  setPais(evt.target.value);
                }}
              >
                <option value="">Selecione o país</option>
                {resultPais.isSuccess &&
                  paises?.map((pais) => (
                    <option key={pais.id} value={pais.id}>
                      {pais.nome}
                    </option>
                  ))}
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="provincia">
                Província <span className="text-red-600">*</span>
              </label>
              <Select
                className="p-2 outline-none bg-slate-200 rounded w-full"
                id="provincia"
                onChange={(evt) => {
                  filtrarMunicipio(evt.target.value);
                }}
              >
                <option value="">Selecione a província</option>
                {resultProvincia.isSuccess &&
                  provincias
                    ?.filter((provincia) => provincia.pais_id === pais)
                    .map((provincia) => (
                      <option key={provincia.id} value={provincia.id}>
                        {provincia.nome}
                      </option>
                    ))}
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="municipio">
                Município <span className="text-red-600">*</span>
              </label>
              <Select
                {...register("municipio_id", { required: true })}
                className="p-2 outline-none bg-slate-200 rounded w-full"
                id="municipio"
              >
                <option value="">Selecione o município</option>
                {resultMuncipio.isSuccess &&
                  municipios?.map((municipio) => (
                    <option key={municipio.id} value={municipio.id}>
                      {municipio.nome}
                    </option>
                  ))}
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="bairro">
                Bairro <span className="text-red-600">*</span>
              </label>
              <input
                {...register("bairro", { required: true })}
                type="text"
                id="bairro"
                className="p-2 rounded shadow outline-none focus:border border-primary"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="rua">
                Rua <span className="text-red-600">*</span>
              </label>
              <input
                {...register("rua", { required: true })}
                type="text"
                id="rua"
                className="p-2 rounded shadow outline-none focus:border border-primary"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="referencia">
                Ponto de referência <span className="text-red-600">*</span>
              </label>
              <input
                {...register("ponto_referencia", { required: true })}
                type="text"
                id="referencia"
                className="p-2 rounded shadow outline-none focus:border border-primary"
              />
            </div>
            <button className="px-6 py-2 rounded bg-primary text-white disabled:bg-gray-400">
              Salvar
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default Create;
