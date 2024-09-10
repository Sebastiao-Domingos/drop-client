'use client';
// import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Submenu from './Submenu';
import { twMerge } from 'tailwind-merge';
import * as Dialog from '@radix-ui/react-dialog';
import NavLink from '@/@types/NavLink';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const list: NavLink[] = [
  {
    name: 'Novidades',
    href: '/news',
    icon: 'ri-file-list-3-line',
  },
  {
    name: 'Stock-out',
    href: '/stockout',
    icon: 'ri-stack-line',
  },
  {
    name: 'Outlet',
    href: '/outlet',
    icon: 'ri-list-settings-line',
  },
  {
    name: 'Mais Vendidos',
    href: '/bestseller',
    icon: 'ri-star-line',
  },
  {
    name: 'Tá barato',
    href: '/promotion',
    icon: 'ri-flashlight-line',
  },
];

export default function SubmenuMobile({
  setOpened,
  children,
}: {
  children: React.ReactNode;
  setOpened: (type: boolean) => void;
}) {
  const path = usePathname();
  return (
    <Dialog.Root onOpenChange={(e) => setOpened(e)}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          {/* <Dialog.Title /> */}
          {/* <Dialog.Description /> */}
          {/* <Submenu className="block md:hidden dark:bg-gray-900" /> */}
          <div
            //   md:pl-4
            // hidden bottom-[82px] left-0 right-0 p-2
            className={twMerge(
              'block md:hidden dark:bg-gray-900 fixed left-0 right-0 bottom-[70px] p-2 z-50 bg-gray-100 md:static md:top-[82px] md:h-[45px] /md:flex md:pl-16'
            )}
          >
            {/* "grid grid-cols-3 gap-4 sm:flex sm:items-center sm:space-x-4 " */}
            <ul
              className={twMerge(
                'grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-3 md:flex md:items-center md:space-x-4 '
              )}
            >
              {list.map((item) => (
                <li
                  key={item.name}
                  className={twMerge('text-center hover:text-primary ')}
                >
                  <Dialog.Close asChild>
                    <Link
                      href={item.href!}
                      className={`flex items-center gap-3 ${
                        path === item.href && 'text-primary font-bold'
                      }`}
                    >
                      <i className={`text-lg ${item.icon}`}></i>
                      <p className="text-xs">{item.name}</p>
                    </Link>
                  </Dialog.Close>
                </li>
              ))}
            </ul>
          </div>
          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
