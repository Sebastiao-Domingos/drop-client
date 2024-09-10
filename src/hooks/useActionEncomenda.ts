import EncomendaController from "@/controllers/encomenda";
import { useMutation } from "@tanstack/react-query";

function useActionEncomenda() {
  const controller = new EncomendaController();

  const mutationCreate = useMutation({
    mutationFn: controller.encomendar,
  });

  return { mutationCreate };
}

export { useActionEncomenda };
