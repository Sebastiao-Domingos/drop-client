import NavLink from "@/@types/NavLink";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const list: NavLink[] = [
  {
    name: "Novidades",
    href: "/news",
    icon: "ri-file-list-3-line",
  },
  {
    name: "Stock-out",
    href: "/stockout",
    icon: "ri-stack-line",
  },
  {
    name: "Outlet",
    href: "/outlet",
    icon: "ri-list-settings-line",
  },
  {
    name: "Mais Vendidos",
    href: "/bestseller",
    icon: "ri-star-line",
  },
  {
    name: "Tá barato",
    href: "/promotion",
    icon: "ri-flashlight-line",
  },
];

interface SubmenuProps extends React.ComponentProps<"div"> {}

export default function Submenu({ className = "", ...outers }: SubmenuProps) {
  const path = usePathname();
  return (
    <div
      //   md:pl-4
      // hidden bottom-[82px] left-0 right-0 p-2
      className={twMerge(
        "hidden fixed left-0 right-0 bottom-[70px] p-2 z-50 bg-gray-100 md:static md:top-[82px] md:h-[45px] md:flex md:pl-16",
        className
      )}
    >
      {/* "grid grid-cols-3 gap-4 sm:flex sm:items-center sm:space-x-4 " */}
      <ul
        className={twMerge(
          "grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-3 md:flex md:items-center md:space-x-4 "
        )}
      >
        {list.map((item) => (
          <li
            key={item.name}
            className={twMerge("text-center hover:text-primary ")}
          >
            <Link
              href={item.href!}
              className={`flex items-center gap-3 ${
                path === item.href && "text-primary font-bold"
              }`}
            >
              <i className={`text-lg ${item.icon}`}></i>
              <p className="text-xs">{item.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
