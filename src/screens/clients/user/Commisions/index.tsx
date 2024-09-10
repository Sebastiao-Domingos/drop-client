"use client";
import { LoadingIcon } from "@/components/Alert";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbItem from "@/components/Breadcrumb/BreadcrumbItem";
import { useGetEncomendaCliente } from "@/hooks/useGetEncomendaCliente";
import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import * as Tabs from "@radix-ui/react-tabs";
import TableRowEncomenda from "./TableRowEncomenda";
import { Estado } from "@/services/encomenda/admin/estado_encomenda";
import Select from "react-select";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const options: { value: Estado; label: string }[] = [
  {
    value: "Confirmação",
    label: "Confirmação",
  },
  {
    value: "Expedição",
    label: "Expedição",
  },
  {
    value: "Pagamento",
    label: "Pagamento",
  },
  {
    value: "Tratamento",
    label: "Tratamento",
  },
  {
    value: "Processamento",
    label: "Processamento",
  },
  {
    value: "Pendente",
    label: "Pendente",
  },
  {
    value: "Expedida",
    label: "Expedida",
  },
];

function getSelectedEstados(searchParams: URLSearchParams) {
  return searchParams.has("estados")
    ? options.filter((option) =>
        searchParams.getAll("estados").includes(option.value)
      )
    : options;
}

function Commissions() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data, result, filtro } = useGetEncomendaCliente({
    currentPage: 1,
    estado: searchParams.has("estados")
      ? [...getSelectedEstados(searchParams).map((option) => option.value), ""]
      : [
          "Confirmação",
          "Expedição",
          "Pagamento",
          "Tratamento",
          "Processamento",
          "Pendente",
          "Expedida",
        ],
  });

  const {
    data: encomendasFinalizadas,
    result: resultEncomendasFinalizadas,
    filtro: filtroEncomendasFinalizadas,
  } = useGetEncomendaCliente({
    currentPage: 1,
    estado: ["Entregue", ""],
  });

  return (
    <div>
      <Breadcrumb className="text-sm">
        <BreadcrumbItem href="/user/perfil" name="Minha Conta" />
        <BreadcrumbItem href="/user/commissions" name="As minhas encomendas" />
      </Breadcrumb>
      <div>
        <h2 className="uppercase font-bold">Minhas encomendas</h2>
      </div>
      <div className="w-full">
        <Tabs.Root
          onValueChange={(value) => {
            if (value === "encomendas-correntes") {
              filtro({
                estado: [
                  "",
                  ...getSelectedEstados(searchParams).map(
                    (option) => option.value
                  ),
                ],
              });
            }
          }}
          className="w-full mt-10"
          defaultValue="encomendas-correntes"
        >
          <Tabs.List className="border-b dark:border-b-gray-800 overflow-auto flex flex-nowrap">
            <Tabs.Trigger
              value="encomendas-correntes"
              className="pb-2 truncate px-3 hover:text-primary border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]=font-bold data-[state=active]:text-primary"
            >
              Encomendas em curso
            </Tabs.Trigger>
            <Tabs.Trigger
              value="encomendas-concluidas"
              className="pb-2 truncate px-3 hover:text-primary border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:font-bold data-[state=active]:text-primary"
            >
              Encomendas concluídas
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="encomendas-correntes" className="mt-6">
            <Select
              options={options}
              defaultValue={getSelectedEstados(searchParams)}
              isMulti
              className="bg-slate-950"
              isClearable={true}
              closeMenuOnSelect={false}
              onChange={(values) => {
                if (values.length > 0) {
                  const params = new URLSearchParams();

                  for (let i = 0; i < values.length; i++) {
                    const { value } = values[i];

                    params.append("estados", value);
                  }

                  router.push(`?${params.toString()}`, {
                    scroll: false,
                  });

                  filtro({
                    estado: ["", ...values.map(({ value }) => value)],
                    currentPage: 1,
                  });
                }
              }}
              classNames={{
                control: () => "dark:!bg-slate-950 dark:!border-slate-800",
                container: () => "mb-4",
                multiValue: () => "dark:!bg-slate-800",
                multiValueLabel: () => "dark:!text-slate-200",
                menu: () => "dark:!bg-gray-900",
              }}
            />
            {result.isPending && (
              <div className="w-full flex items-center justify-center text-3xl">
                <LoadingIcon />
              </div>
            )}
            {result.isError && (
              <p className="text-red-600 text-center">
                Erro ao carregar as encomendas!
              </p>
            )}
            {result.isSuccess && data?.encomenda.length === 0 && (
              <div className="py-8">
                <p className="text-xs md:text-sm">Encomendas Sem Resultados</p>
              </div>
            )}

            {result.isSuccess && data?.encomenda.length !== 0 && (
              <>
                <TableContainer component={Paper} className="mt-2">
                  <Table>
                    <TableHead>
                      <TableRow className="font-bold bg-blue-200/50">
                        <TableCell className="!font-bold">Cod.</TableCell>
                        <TableCell className="!font-bold">
                          Qtd. produtos
                        </TableCell>
                        <TableCell className="!font-bold">Estado</TableCell>
                        <TableCell className="!font-bold">Envio</TableCell>
                        {/* <TableCell>Preço envio</TableCell>
                      <TableCell>Total</TableCell> */}
                        <TableCell className="!font-bold">Detalhes</TableCell>
                        <TableCell className="!font-bold"></TableCell>
                        {/* <TableCell className="!font-bold"></TableCell> */}
                      </TableRow>
                    </TableHead>

                    <TableBody className="dark:bg-gray-900">
                      {data?.encomenda.map((encomenda) => (
                        <TableRowEncomenda
                          key={encomenda.id}
                          encomenda={encomenda}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <div className="w-full flex flex-col justify-center items-center gap-6 md:flex-row mt-6">
                  <Pagination
                    onChange={(_, page) => {
                      filtro({ currentPage: page });
                    }}
                    // defaultPage={data!.currentPage}
                    page={Number(data!.currentPage)}
                    count={data!.lastPage}
                    color="primary"
                  />
                  {result.isPlaceholderData && <p>Carregando...</p>}
                </div>
              </>
            )}
          </Tabs.Content>
          <Tabs.Content value="encomendas-concluidas" className="mt-6">
            {resultEncomendasFinalizadas.isPending && (
              <div className="w-full flex items-center justify-center text-3xl">
                <LoadingIcon />
              </div>
            )}
            {resultEncomendasFinalizadas.isError && (
              <p className="text-red-600 text-center">
                Erro ao carregar as encomendas!
              </p>
            )}
            {resultEncomendasFinalizadas.isSuccess &&
              encomendasFinalizadas?.encomenda.length === 0 && (
                <div className="py-8">
                  <p className="text-xs md:text-sm">
                    Nenhuma encomenda encontrada
                  </p>
                </div>
              )}
            {resultEncomendasFinalizadas.isSuccess &&
              encomendasFinalizadas?.encomenda.length !== 0 && (
                <>
                  <TableContainer component={Paper} className="mt-2">
                    <Table>
                      <TableHead>
                        <TableRow className="font-bold bg-blue-200/50">
                          <TableCell className="!font-bold">Cod.</TableCell>
                          <TableCell className="!font-bold">
                            Qtd. produtos
                          </TableCell>
                          <TableCell className="!font-bold">Estado</TableCell>
                          <TableCell className="!font-bold">Envio</TableCell>
                          {/* <TableCell>Preço envio</TableCell>
                      <TableCell>Total</TableCell> */}
                          <TableCell className="!font-bold">Detalhes</TableCell>
                          <TableCell className="!font-bold"></TableCell>
                          {/* <TableCell className="!font-bold"></TableCell> */}
                        </TableRow>
                      </TableHead>

                      <TableBody className="dark:bg-gray-900">
                        {encomendasFinalizadas?.encomenda.map((encomenda) => (
                          <TableRowEncomenda
                            key={encomenda.id}
                            encomenda={encomenda}
                          />
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <div className="w-full flex flex-col justify-center items-center gap-6 md:flex-row mt-6">
                    <Pagination
                      onChange={(_, page) => {
                        filtroEncomendasFinalizadas({ currentPage: page });
                      }}
                      // defaultPage={data!.currentPage}
                      page={Number(encomendasFinalizadas!.currentPage)}
                      count={encomendasFinalizadas!.lastPage}
                      color="primary"
                    />
                    {resultEncomendasFinalizadas.isPlaceholderData && (
                      <p>Carregando...</p>
                    )}
                  </div>
                </>
              )}
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}

export default React.memo(Commissions);
