import AtributoController from "@/controllers/Atributo";
import CarrossselController from "@/controllers/carrossel";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

const controller = new CarrossselController();

function useGetCarrossel() {
  const { data, ...result } = useQuery({
    queryKey: ["carrossel"],
    queryFn: () => controller.obter(),
    placeholderData: keepPreviousData,
  });

  const body = data;

  return { result, body };
}

export { useGetCarrossel };
