import ProdutoController, { SearchProdutoFilter } from "@/controllers/Produto";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";

const controller = new ProdutoController();

function useGetProduto<T>(filter: Partial<SearchProdutoFilter>) {
  const [query, setQuery] = useState<Partial<SearchProdutoFilter>>(filter);

  const { data, ...result } = useQuery<any>({
    queryKey: ["produtos", query],
    queryFn: () => controller.obter(query),
    placeholderData: keepPreviousData,
  });

  const body: T = data;

  function filtro(query: Partial<SearchProdutoFilter>) {
    if (query.referencia) {
      setQuery({ referencia: query.referencia });
    } else {
      setQuery((prev) => ({ ...prev, ...query, referencia: undefined }));
    }
  }

  return { filtro, query, result, body };
}

export { useGetProduto };
