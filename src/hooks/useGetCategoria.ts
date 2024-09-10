import CategoriaController from "@/controllers/Categoria";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

const controller = new CategoriaController();

function useGetCategoria() {
  const { data, ...result } = useQuery({
    queryKey: ["categorias"],
    queryFn: () => controller.obter(),
    placeholderData: keepPreviousData,
  });

  const body = data;

  return { result, body };
}

export { useGetCategoria };
