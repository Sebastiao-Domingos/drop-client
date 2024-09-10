import ClienteController from "@/controllers/Cliente";
import { useMutation } from "@tanstack/react-query";

function useActionRequisitarNovoCodigo() {
  const controller = new ClienteController();

  const mutationNovoCodigo = useMutation({
    mutationFn: controller.novoCodigo,
  });

  return { mutationNovoCodigo };
}

export default useActionRequisitarNovoCodigo;
