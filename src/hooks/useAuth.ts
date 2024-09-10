import { useUserData } from "./useUserData";

function useAuth() {
  const { user, status, refresh } = useUserData();

  const logout = async () => {
    await fetch("/api/session/logout", { method: "POST" }).then(() => {
      refresh();
    });
  };

  return { user, status, logout };
}

export { useAuth };
