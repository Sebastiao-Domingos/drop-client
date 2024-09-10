import SubProdutoController from "@/controllers/SubProduto";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

const controller = new SubProdutoController();

function useGetSubproduto(subcategoria_id: string = "") {
  const { data, ...result } = useQuery({
    queryKey: ["subproduto", subcategoria_id],
    queryFn: () => controller.obter(subcategoria_id),
    placeholderData: keepPreviousData,
  });

  const body = data;

  return { result, body };
}

export { useGetSubproduto };
