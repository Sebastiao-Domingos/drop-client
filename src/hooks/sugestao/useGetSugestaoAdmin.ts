import SugestaoController, {
  SugestaoFiltro,
} from "@/controllers/produto/Sugestao";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const controller = new SugestaoController();

function useGetSugestaoAdmin(initial: Partial<SugestaoFiltro>) {
  const [query, setQuery] = useState<Partial<SugestaoFiltro>>(initial);

  const { data, ...result } = useQuery({
    queryKey: ["sugestao", query],
    queryFn: () => controller.obterAdministrador(query),
    placeholderData: keepPreviousData,
  });

  function filtro(query: Partial<SugestaoFiltro>) {
    setQuery((prev) => ({ ...prev, ...query }));
  }

  return { data, result, filtro };
}

export { useGetSugestaoAdmin };
