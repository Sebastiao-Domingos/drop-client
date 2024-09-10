import EncomendaClienteController from "@/controllers/encomenda/cliente/EncomendaClienteController";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

function useGetEncomendaClienteDetalhe(encomenda_id: string) {
  const controller = new EncomendaClienteController();
  const [filter, setFiltro] = useState(encomenda_id);
  const { data, ...result } = useQuery({
    queryKey: ["encomenda", filter],
    queryFn: () => controller.encomendaDetalhe(filter),
    placeholderData: keepPreviousData,
  });

  function filtro(encomenda: string) {
    setFiltro((prev) => encomenda);
  }

  return { data, result, filtro };
}

export { useGetEncomendaClienteDetalhe };
