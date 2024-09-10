import ClienteController from "@/controllers/Cliente";
import { SearchClienteParams } from "@/services/users/Cliente";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

function useGetClientes(params: Partial<SearchClienteParams>) {
  const controller = new ClienteController();
  const [query, setQuery] = useState<Partial<SearchClienteParams>>(params);

  const { data, ...result } = useQuery({
    queryKey: ["clientes", query],
    queryFn: () => controller.obter(query),
    placeholderData: keepPreviousData,
  });

  function filtro(query: Partial<SearchClienteParams>) {
    setQuery((prev) => ({ ...prev, ...query }));
  }

  return { result, data, filtro };
}

function useGetDataCliente(cliente_id: string) {
  const controller = new ClienteController();

  const { data, ...result } = useQuery({
    queryKey: ["cliente"],
    queryFn: () => controller.obterData(cliente_id),
    placeholderData: keepPreviousData,
  });

  return { data, result };
}

function useGetDataUsuario() {
  const controller = new ClienteController();

  const { data, ...result } = useQuery({
    queryKey: ["cliente"],
    queryFn: controller.obterDadosUsuario,
    placeholderData: keepPreviousData,
  });

  return { data, result };
}

export { useGetClientes, useGetDataCliente, useGetDataUsuario };
