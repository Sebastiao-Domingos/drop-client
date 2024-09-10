import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

function useFakeRealtimeData(
  queryKey: any[],
  enabled: boolean = true,
  time: number = 15 * 1000 // segundo * milissegundos
) {
  const client = useQueryClient();
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => {
    if (!enabled) return;
    timer.current = setTimeout(() => {
      client.invalidateQueries({ queryKey });
    }, time);

    return () => {
      clearTimeout(timer.current);
    };
  }, [queryKey, client, time]);
}

export { useFakeRealtimeData };
