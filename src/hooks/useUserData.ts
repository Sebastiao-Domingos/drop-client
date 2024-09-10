import SessionController from "@/controllers/Session";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const controller = new SessionController();

function useUserData() {
  const client = useQueryClient();

  const { data, ...result } = useQuery({
    queryKey: ["user"],
    queryFn: controller.getUserData,
    placeholderData: keepPreviousData,
    retry: false,
  });

  function refresh() {
    client
      .invalidateQueries({
        queryKey: ["user"],
      })
      .then(() => {
        window.location.href = window.location.pathname;
      });
  }
  return { user: data, refresh, ...result };
}

export { useUserData };
