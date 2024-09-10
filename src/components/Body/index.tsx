import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface BodyProps extends HTMLAttributes<HTMLDivElement> {}

function Body({ children, className = "", ...others }: BodyProps) {
  return (
    <div
      className={twMerge(
        "md:w-[calc(100vw-44px)] xl:w-[calc(100vw-60px)] md:ml-auto lg:p-4 overflow-hidden",
        className
      )}
      {...others}
    >
      {children}
    </div>
  );
}

export default Body;
