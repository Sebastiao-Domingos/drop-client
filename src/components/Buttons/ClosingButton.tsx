import React, { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ComponentProps<"button"> {}

const ClosingButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...others }, ref) => {
    return (
      <button
        ref={ref}
        {...others}
        className={twMerge(
          `w-[30px] h-[30px] flex justify-center items-center rounded-full bg-primary/10 hover:bg-primary/30 active:bg-primary/20`,
          className
        )}
      >
        <i className="ri-close-line text-xl"></i>
      </button>
    );
  }
);

ClosingButton.displayName = "ButtonClosingRef";

export { ClosingButton };
