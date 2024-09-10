import SessionController from "@/controllers/Session";
import { useMutation } from "@tanstack/react-query";

const controller = new SessionController();

function useSession() {
  const mutation = useMutation({
    mutationFn: controller.login,
  });

  return { mutation };
}

export { useSession };
