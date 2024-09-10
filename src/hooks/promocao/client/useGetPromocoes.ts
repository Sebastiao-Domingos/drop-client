import PromocaoController from "@/controllers/promocao";
import { useQuery } from "@tanstack/react-query";

function useGetPromocoes() {
  const controller = new PromocaoController();

  const { data, ...result } = useQuery({
    queryFn: controller.obterPromocoesValidas,
    queryKey: ["promocao", "cliente"],
  });

  return { data, result };
}

export { useGetPromocoes };
