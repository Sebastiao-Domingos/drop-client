'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface NavLinkProps {
  href: string;
  children?: ReactNode;
  onClick?: () => void;
  basePath?: string;
  className?: string;
}

export default function NavLink({
  children,
  href,
  onClick,
  basePath = '/dashboard',
  className = '',
}: NavLinkProps) {
  const path = usePathname();

  return (
    <Link
      href={href}
      onClick={(evt) => {
        if (href.endsWith('#')) {
          evt.preventDefault();
        }
        onClick && onClick();
      }}
      className={twMerge(
        'relative w-full p-2 rounded hover:bg-green-900/20 dark:hover:bg-gray-900 hover:text-primary',
        'transition-colors flex flex-row items-center gap-2 text-gray-500',
        (path === href ||
          (path.startsWith(href.replaceAll('#', '')) && href !== basePath)) &&
          'bg-green-900/20 dark:bg-gray-900 text-primary font-bold',
        className
      )}
    >
      {children}
    </Link>
  );
}
