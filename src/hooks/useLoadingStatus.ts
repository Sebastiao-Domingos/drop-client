import { useState } from "react";
import LoadingStatus from "../../@types/LoadingStatus";

function useStatus() {
  const [status, setStatus] = useState(LoadingStatus.DONE);
  return { status, setStatus };
}

export { useStatus };
