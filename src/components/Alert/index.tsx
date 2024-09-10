import { twMerge } from "tailwind-merge";
import Failed from "./Failed";
import Success from "./Success";
import Warning from "./Warning";
import { Alert as AlertMaterial, AlertProps } from "@mui/material";
import { useState } from "react";
import Loading, { LoadingIcon } from "./Loading";

function Alert({ children, className = "", ...others }: AlertProps) {
  const [visible, setVisible] = useState(true);
  return (
    <>
      {visible && (
        <AlertMaterial
          variant="outlined"
          className={twMerge("mt-2 flex items-center", className)}
          onClose={() => {
            setVisible(false);
          }}
          {...others}
        >
          {children}
        </AlertMaterial>
      )}
    </>
  );
}

export default Alert;

export {
  Failed as AlertFail,
  Success as AlertSuccess,
  Warning as AlertWarning,
  Loading as AlertLoading,
  LoadingIcon,
};
