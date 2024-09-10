import Link from "next/link";
import { HTMLAttributes } from "react";

interface BreadcrumbItemProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  name: string;
}

function BreadcrumbItem({ name, href, ...others }: BreadcrumbItemProps) {
  return (
    <li className="flex flex-row flex-nowrap items-center gap-2 group">
      <Link
        href={href}
        className="opacity-40 hover:opacity-100 whitespace-nowrap group-last:opacity-100 text-xs md:text-sm group-last:text-primary group-last:font-bold "
        {...others}
      >
        {name}
      </Link>
      <i className="ri-arrow-drop-right-line group-last:hidden"></i>
    </li>
  );
}

export default BreadcrumbItem;
