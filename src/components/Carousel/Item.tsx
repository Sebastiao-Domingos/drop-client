import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

interface ItemProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  srcMobile: string;
  alt: string;
  children?: React.ReactNode;
}

function Item({
  children,
  src,
  srcMobile,
  alt,
  className = "",
  ...others
}: ItemProps) {
  return (
    <div
      className={twMerge(
        "keen-slider__slide block w-full min-h-[320px] overflow-y-hidden",
        className
      )}
      {...others}
    >
      <Image
        src={src}
        alt={alt}
        width={1300}
        height={320}
        className="w-full /min-h-[320px] sm:h-auto hidden min-[639px]:block"
        loading="eager"
      />
      <Image
        src={srcMobile}
        alt={alt}
        width={1300}
        height={320}
        className="w-full min-h-[320px] sm:h-auto min-[639px]:hidden"
        loading="eager"
      />
      {children}
    </div>
  );
}

export default Item;
