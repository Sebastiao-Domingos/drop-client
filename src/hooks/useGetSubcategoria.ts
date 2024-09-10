import SubCategoriaController from "@/controllers/SubCategoria";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

const controller = new SubCategoriaController();

function useGetSubcategoria(categoria_id: string = "") {
  const { data, ...result } = useQuery({
    queryKey: ["subcategorias", categoria_id],
    queryFn: () => controller.obter(categoria_id),
    placeholderData: keepPreviousData,
  });

  const body = data;

  return { result, body };
}

export { useGetSubcategoria };
