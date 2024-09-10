import Alert from ".";
import { AlertProps } from "@mui/material/Alert";

function Warning({ children, ...others }: AlertProps) {
  return (
    <Alert severity="warning" {...others}>
      {children}
    </Alert>
  );
}

export default Warning;
