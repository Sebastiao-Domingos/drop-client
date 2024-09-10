import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  title: string;
  subTitle?: string;
  icon: string;
  classParagraph?: string;
  isMenuOpened?: boolean;
}
function ButtonAdm({
  title,
  subTitle,
  icon,
  classParagraph,
  isMenuOpened,
  className,
  ...others
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        "flex items-center justify-center space-x-4",
        className
      )}
      {...others}
    >
      <i className={twMerge("text-xl text-primary", icon)}></i>

      {isMenuOpened && (
        <div>
          <p className={twMerge("text-sm text-left", classParagraph)}>
            {title}
          </p>
          {subTitle && <p className="text-sm">{subTitle}</p>}
        </div>
      )}
    </button>
  );
}

export default ButtonAdm;
