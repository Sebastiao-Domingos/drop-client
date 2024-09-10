import Alert from ".";
import { AlertProps } from "@mui/material/Alert";

function Failed({ children, ...others }: AlertProps) {
  return (
    <Alert severity="error" {...others}>
      {children}
    </Alert>
  );
}

export default Failed;
