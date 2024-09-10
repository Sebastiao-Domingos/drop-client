import ClienteSenhaController from "@/controllers/cliente/ActualizarSenha";
import { useMutation } from "@tanstack/react-query";

function useActionActualizarSenha() {
  const controller = new ClienteSenhaController();

  const mutationUpdatePassword = useMutation({
    mutationFn: controller.actualizar,
  });
  return { mutationUpdatePassword };
}

export { useActionActualizarSenha };
