import TipoContactoController from "@/controllers/TipoDeContacto";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

function useGetTipoContacto() {
  const controller = new TipoContactoController();
  const { data, ...result } = useQuery({
    queryKey: ["tipo-contacto"],
    queryFn: controller.obter,
    placeholderData: keepPreviousData,
  });

  return { result, data };
}

export { useGetTipoContacto };
