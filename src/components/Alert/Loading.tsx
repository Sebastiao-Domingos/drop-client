import { AlertProps } from "@mui/material/Alert";
import Alert from ".";
import { motion } from "framer-motion";
import { Children, ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

function Loading({ children, ...others }: AlertProps) {
  return (
    <Alert
      severity="info"
      onClose={undefined}
      icon={<LoadingIcon />}
      className="items-center"
      {...others}
    >
      {children}
    </Alert>
  );
}

export function LoadingIcon() {
  return (
    <motion.i
      animate={{ rotate: "359deg" }}
      transition={{ repeat: Infinity, duration: 1.5 }}
      className="ri-loader-line"
    ></motion.i>
  );
}

interface LoadingProps extends ComponentProps<"div"> {
  isLoading: boolean;
}
export function LoadingModal({
  isLoading,
  className,
  children,
  ...others
}: LoadingProps) {
  if (isLoading) {
    return (
      <div
        className={twMerge(
          "flex items-center justify-center w-full text-xl",
          className
        )}
        {...others}
      >
        <LoadingIcon />
        {children}
      </div>
    );
  }
  return <></>;
}

export default Loading;
