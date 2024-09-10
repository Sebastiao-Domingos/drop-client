import EncomendaController from "@/controllers/encomenda";
import { EncomendaClienteFiltro } from "@/services/encomenda";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useFakeRealtimeData } from "./useFakeRealtimeData";

const TIMEOUT_INTERVAL = 30 * 1000;

function useGetEncomendaCliente(initFiltro: Partial<EncomendaClienteFiltro>) {
  const controller = new EncomendaController();
  const [filter, setFiltro] = useState(initFiltro);
  const { data, ...result } = useQuery({
    queryKey: ["encomenda", filter],
    queryFn: () => controller.encomendasPorCliente(filter),
    placeholderData: keepPreviousData,
  });

  useFakeRealtimeData(["encomenda", filter], true, TIMEOUT_INTERVAL);

  function filtro(newFilter: Partial<EncomendaClienteFiltro>) {
    setFiltro((prev) => ({ ...prev, ...newFilter }));
  }

  return { data, result, filtro };
}

export { useGetEncomendaCliente };
