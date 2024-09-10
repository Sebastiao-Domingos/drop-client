import RecuperarSenhaClienteController from "@/controllers/cliente/RecuperarSenha";
import { useMutation } from "@tanstack/react-query";

function useActionRecuperarSenha() {
  const controller = new RecuperarSenhaClienteController();

  const mutationUpdatePassword = useMutation({
    mutationFn: controller.recuperar,
  });
  return { mutationUpdatePassword };
}

export { useActionRecuperarSenha };
