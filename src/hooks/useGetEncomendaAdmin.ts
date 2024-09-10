import EncomendaController from "@/controllers/encomenda";
import { EncomendaClienteFiltro } from "@/services/encomenda";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useFakeRealtimeData } from "./useFakeRealtimeData";

function useGetEncomendaAdmin(
  initFiltro: Partial<EncomendaClienteFiltro>,
  realtimeEnabled = true
) {
  const controller = new EncomendaController();
  const [filter, setFiltro] = useState(initFiltro);
  useFakeRealtimeData(["encomenda", filter], realtimeEnabled);

  const { data, ...result } = useQuery({
    queryKey: ["encomenda", filter],
    queryFn: () => controller.encomendasAdmin(filter),
    placeholderData: keepPreviousData,
  });

  function filtro(newFilter: Partial<EncomendaClienteFiltro>) {
    setFiltro((prev) => ({ ...prev, ...newFilter }));
  }

  return { data, result, filtro };
}

export { useGetEncomendaAdmin };
