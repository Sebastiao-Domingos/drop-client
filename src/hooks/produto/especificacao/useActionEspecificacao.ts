import EspecificacaoController from "@/controllers/produto/Especificacao";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useActionEspecificacao(referencia: string) {
  const controller = new EspecificacaoController();
  const queryClient = useQueryClient();

  const mutationCreate = useMutation({
    mutationFn: controller.criar,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["produtos", { referencia }],
      });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: controller.apagar,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["produtos", { referencia }],
      });
    },
  });

  return { mutationCreate, mutationDelete };
}

export default useActionEspecificacao;
