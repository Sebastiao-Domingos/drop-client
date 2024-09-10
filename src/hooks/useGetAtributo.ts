import AtributoController from "@/controllers/Atributo";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

const controller = new AtributoController();

function useGetAtributo() {
  const { data, ...result } = useQuery({
    queryKey: ["atributo"],
    queryFn: () => controller.obter(),
    placeholderData: keepPreviousData,
  });

  const body = data;

  return { result, body };
}

export { useGetAtributo };
