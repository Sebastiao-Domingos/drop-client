// "use client"; // Error components must be Client Components

import { useEffect } from "react";

function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-[480px] p-3 mx-auto my-4 space-y-3 text-center rounded shadow">
      <h2 className="font-bold text-xl">UPS! Ocorreu um erro</h2>
      {/* <p>{error.name}</p>
      <p>{error.digest}</p> */}
      {process.env.NODE_ENV !== "production" && (
        <p className="text-red-600 font-bold">{error.message}</p>
      )}
      <button
        className="inline-block mx-auto p-3 bg-primary text-white rounded"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Tentar novamente
      </button>
    </div>
  );
}

export default Error;
