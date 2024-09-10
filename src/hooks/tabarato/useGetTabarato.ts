import TabaratoController from "@/controllers/tabarato";
import { SearchTabaratoParms, TabaratoDataResponse } from "@/services/tabarato";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";

const controller = new TabaratoController();

function useGetTabarato(filter: Partial<SearchTabaratoParms>) {
  const [query, setQuery] = useState<Partial<SearchTabaratoParms>>(filter);
  const { data, ...result } = useQuery<TabaratoDataResponse>({
    queryKey: ["promocao", query],
    queryFn: () => controller.obter(query),
    placeholderData: keepPreviousData,
  });

  function filtro(query: Partial<SearchTabaratoParms>) {
    if (query.currentPage) {
      setQuery({ currentPage : query.currentPage});
    } else {
      setQuery((prev) => ({ ...prev, ...query }));
    }
  }

  return { filtro, query, result, data };
}

export { useGetTabarato };
