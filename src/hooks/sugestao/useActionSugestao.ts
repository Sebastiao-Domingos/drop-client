import SugestaoController from "@/controllers/produto/Sugestao";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const controller = new SugestaoController();

function useActionSugestao() {
  const queryAdmin = useQueryClient();

  const mutationCreateSugestacao = useMutation({
    mutationFn: controller.criarSugestaoFromFornecedor,
    onSuccess() {
      queryAdmin.invalidateQueries({ queryKey: ["sugestao"] });
    },
  });

  const mutationCreateStock = useMutation({
    mutationFn: controller.criarStock,
    onSuccess() {
      queryAdmin.invalidateQueries({ queryKey: ["sugestao"] });
    },
  });

  const mutationCreateStockWithProduto = useMutation({
    mutationFn: controller.criarStockWithProduto,
    onSuccess() {
      queryAdmin.invalidateQueries({ queryKey: ["sugestao"] });
    },
  });

  const mutationNegarSugestao = useMutation({
    mutationFn: controller.negarSugestao,
    onSuccess() {
      queryAdmin.invalidateQueries({ queryKey: ["sugestao"] });
    },
  });

  return {
    mutationCreateStock,
    mutationCreateStockWithProduto,
    mutationCreateSugestacao,
    mutationNegarSugestao,
  };
}

export { useActionSugestao };
