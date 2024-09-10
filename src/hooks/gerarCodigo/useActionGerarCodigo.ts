import GerarCodigoController from "@/controllers/gerarCodigo";
import { useMutation } from "@tanstack/react-query";

function useActionGerarCodigo() {
  const controller = new GerarCodigoController();

  const mutationNovoCodigo = useMutation({
    mutationFn: controller.novoCodigo,
  });

  return { mutationNovoCodigo };
}

export default useActionGerarCodigo;
