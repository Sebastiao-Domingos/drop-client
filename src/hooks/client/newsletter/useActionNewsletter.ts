import NewsletterController from "@/controllers/cliente/newsletter";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const controller = new NewsletterController();

function useActionNewsletter() {
  const queryClient = useQueryClient();

  const mutationSubscribe = useMutation({
    mutationFn: controller.subscribe,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["newsletter"] });
    },
  });
  return { mutationSubscribe };
}

export { useActionNewsletter };
