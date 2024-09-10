import PaisController from "@/controllers/Pais";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

function useGetPais() {
  const controller = new PaisController();
  const { data, ...result } = useQuery({
    queryKey: ["paises"],
    queryFn: controller.obter,
    placeholderData: keepPreviousData,
  });

  return { result, data };
}

export default useGetPais;
