import { generateCountdown } from "@/helpers/functions/generateCountdown";
import { useState, useEffect } from "react";

function useCountdown(futureTime: number) {
  const [countdown, setCountdown] = useState(generateCountdown(futureTime));

  useEffect(() => {
    const timer = setTimeout(() => {
      const count = generateCountdown(futureTime);

      if (!count.isOver) {
        setCountdown(count);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [countdown, futureTime]);

  return { countdown };
}

export { useCountdown };
