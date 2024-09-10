import ClienteController from "@/controllers/Cliente";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const controller = new ClienteController();

function useActionCliente() {
  const queryClient = useQueryClient();

  const mutationUpdate = useMutation({
    mutationFn: controller.atualizar,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["cliente"] });
    },
  });
  return { mutationUpdate};
}

export { useActionCliente };
