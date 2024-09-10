import { useGetCategoria } from '@/hooks/useGetCategoria';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import MenuCategoryLoader from '../Skeleton/Loaders/MenuCategoryLoader';

interface MenuProps {
  className?: string;
}

const Menu = React.forwardRef<HTMLDivElement, MenuProps>(function Menu(
  { className = '' },
  ref
) {
  const { result, body } = useGetCategoria();
  return (
    <>
      <div
        ref={ref}
        className={twMerge(
          'overflow-auto fixed group z-50 right-0 left-0 top-0 bg-gray-100 dark:bg-gray-900 p-4 pt-0 bottom-[66px] md:w-14 md:overflow-hidden md:pl-2 md:hover:w-60 /md:hover:w-80 md:hover:shadow md:block md:top-0 md:bottom-0 transition-all',
          className
        )}
      >
        <div className="sticky top-0 bg-inherit flex justify-between mb-5 items-center border-b-2 border-gray-200 dark:border-b-gray-800 md:hidden pt-5 pb-3">
          <h3 className="text-primary font-bold text-2xl">Produtos</h3>
        </div>

        <div className="hidden md:grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-3 md:grid-cols-1 md:max-h-full hover:overflow-y-auto  ">
          {result.isError && (
            <span className="text-center text-red-600 flex flex-col gap-2 items-center md:flex-row">
              <span className={`material-symbols-outlined text-base`}>
                brightness_alert
              </span>
              <span className="whitespace-nowrap text-xs md:hidden md:group-hover:inline-block line-clamp-1">
                Erro ao carregar categorias
              </span>
            </span>
          )}

          {result.isLoading && <MenuCategoryLoader />}

          {result.isSuccess &&
            body?.map((categoria) => {
              const link = `/category/${categoria.id}/${encodeURIComponent(
                categoria.nome.replaceAll(' ', '-')
              )}?categoria=${categoria.nome}`;
              return (
                <LinkMenu
                  icon={categoria.icone}
                  nome={categoria.nome}
                  id={categoria.id!}
                  url={link}
                  key={categoria.id!}
                />
              );
            })}
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-3 md:hidden md:max-h-full hover:overflow-y-auto">
          {result.isError && (
            <span className="text-center text-red-600 flex flex-col gap-2 items-center md:flex-row">
              <span className={`material-symbols-outlined text-base`}>
                brightness_alert
              </span>
              <span className="whitespace-nowrap text-xs md:hidden md:group-hover:inline-block line-clamp-1">
                Erro ao carregar categorias
              </span>
            </span>
          )}
        </div>
      </div>
    </>
  );
});

Menu.displayName = 'MenuDesktop';

export default Menu;

interface LinkMenuProps {
  url: string;
  nome: string;
  icon: string;
  id: string;
}

const LinkMenu = React.forwardRef<HTMLAnchorElement, LinkMenuProps>(
  function LinkMenu({ url, nome, icon, id, ...props }, ref) {
    const path = usePathname();
    return (
      <Link
        title={nome}
        href={url}
        ref={ref}
        {...props}
        className={`text-primary flex flex-row flex-nowrap gap-2 items-center p-1 rounded hover:bg-primary/20 min-w-[120px] ${
          ((url.includes(path) && path !== '/') ||
            path.includes(url.split('?')[0])) &&
          'bg-slate-100/100 dark:bg-gray-900 font-bold'
        }`}
      >
        <span
          className={`self-start material-symbols-outlined text-base md:text-3xl hover:font-bold`}
        >
          {icon}
        </span>
        <span
          className={`text-xs md:text-sm md:invisible md:group-hover:visible line-clamp-2 text-slate-700 dark:text-slate-400 ${
            '/category/' + id + '/subcategory' === path
              ? 'font-bold'
              : 'font-normal'
          }`}
        >
          {nome}
        </span>
      </Link>
    );
  }
);

LinkMenu.displayName = 'LinkMenu';
