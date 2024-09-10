import SugestaoController, {
  SugestaoFiltro,
} from "@/controllers/produto/Sugestao";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const controller = new SugestaoController();

function useGetSugestao(initial: Partial<SugestaoFiltro>) {
  const [query, setQuery] = useState(initial);

  const { data, ...result } = useQuery({
    queryFn: () => controller.obter(query),
    queryKey: ["sugestao", query],
    placeholderData : keepPreviousData
  });

  function filtro(query: Partial<SugestaoFiltro>) {
    setQuery((prev) => ({ ...prev, ...query }));
  }

  return { data, result, filtro };
}

export { useGetSugestao };
