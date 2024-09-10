import React from "react";
import Alert from ".";
import { AlertProps } from "@mui/material/Alert";

function Success({ children, ...others }: AlertProps) {
  return (
    <Alert severity="success" {...others}>
      {children}
    </Alert>
  );
}

export default Success;
