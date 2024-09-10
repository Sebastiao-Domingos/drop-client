import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface FullModalProps extends HTMLAttributes<HTMLDivElement> {}

export default function FullModal({
  children,
  className = "",
  ...outers
}: FullModalProps) {
  return (
    <div
      {...outers}
      // certificar de remover o hidden
      className={twMerge(
        "fixed hidden z-50 right-0 left-0 top-0 bottom-[82px] bg-gray-100 p-4",
        className
      )}
    >
      {children}
    </div>
  );
}
