import MarcaController from "@/controllers/Marca";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

const controller = new MarcaController();

function useGetMarca(subproduto: string = "") {
  const { data, ...result } = useQuery({
    queryKey: ["marca", subproduto],
    queryFn: () => controller.obter(subproduto),
    placeholderData: keepPreviousData,
  });

  const body = data;

  return { result, body };
}

export { useGetMarca };
