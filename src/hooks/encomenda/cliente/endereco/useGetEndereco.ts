import EnderecoController from "@/controllers/encomenda/cliente/EnderecoController";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

function useGetEndereco() {
  const controller = new EnderecoController();

  const { data, ...result } = useQuery({
    queryKey: ["enderecos"],
    queryFn: controller.obter,
    placeholderData: keepPreviousData,
  });

  return { result, data };
}

export { useGetEndereco };
