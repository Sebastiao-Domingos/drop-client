import EnvioController from "@/controllers/encomenda/envio/Envio";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

function useGetEnvio() {
  const controller = new EnvioController();
  const { data, ...result } = useQuery({
    queryKey: ["envios"],
    queryFn: controller.obter,
    placeholderData: keepPreviousData,
  });

  return { result, data };
}

export {useGetEnvio} ;
