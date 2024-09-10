import Link from "next/link";
import { HTMLAttributes } from "react";

type TypeMenu = {
  title: string;
  icon: string;
  url: string;
};

interface MenuProps extends HTMLAttributes<HTMLMenuElement> {
  links: TypeMenu[];
}

function ClientPerfilMenu({ links }: MenuProps) {
  return (
    <nav className="px-2 py-4 w-full md:w-[17rem] bg-slate-100">
      <ul className="flex flex-col">
        {links.map((link) => (
          <Li key={link.title} link={link} />
        ))}
      </ul>
    </nav>
  );
}

export default ClientPerfilMenu;

interface LiProps extends HTMLAttributes<HTMLLIElement> {
  link: TypeMenu;
}
function Li({ link }: LiProps) {
  return (
    <li
      key={link.title}
      className="flex gap-4 items-center py-2 border-b dark:border-b-gray-800 last:border-0 hover:px-2 hover:bg-slate-200"
    >
      <i className={link.icon}></i>
      <Link href={link.url}>{link.title}</Link>
    </li>
  );
}
