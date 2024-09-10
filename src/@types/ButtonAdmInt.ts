import { HTMLAttributes } from "react";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  title: string;
  icon: string;
}

export default ButtonProps;
