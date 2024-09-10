import EnderecoController from "@/controllers/encomenda/cliente/EnderecoController";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useActionEndereco() {
  const controller = new EnderecoController();

  const queryClient = useQueryClient();

  const mutationCreate = useMutation({
    mutationFn: controller.criar,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["enderecos"] });
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: controller.atualizar,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["enderecos"] });
    },
  });


  const mutationDelete = useMutation({
    mutationFn: controller.apagar,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["enderecos"] });
    },
  });

  return { mutationCreate, mutationDelete, mutationUpdate};
}

export { useActionEndereco };
