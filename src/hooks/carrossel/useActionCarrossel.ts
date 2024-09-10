import CarrossselController from "@/controllers/carrossel";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const controller = new CarrossselController();

function useActionCarrossel() {
  const queryClient = useQueryClient();

  const mutationCreate = useMutation({
    mutationFn: controller.criar,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["carrossel"] });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: controller.apagar,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["carrossel"] });
    },
  });

  return { mutationCreate, mutationDelete };
}

export { useActionCarrossel };
