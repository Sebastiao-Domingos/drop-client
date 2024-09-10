import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { HTMLAttributes } from "react";
import Image from "next/image";

interface ItemProps extends HTMLAttributes<HTMLAnchorElement> {
  title: string;
  href: string;
  image: string;
}

function SubProductItem({
  title,
  href,
  image,
  className,
  ...others
}: ItemProps) {
  return (
    <Link
      href={href}
      className={twMerge(
        "p-4 shadow rounded hover:border hover:border-primary text-center w-[10rem] h-[12rem]",
        className
      )}
      {...others}
    >
      <Image
        src={image}
        width="100"
        height="100"
        alt="product"
        className="w-[300px]"
      />
      <p className="text-sm">{title}</p>
    </Link>
  );
}

export default SubProductItem;
