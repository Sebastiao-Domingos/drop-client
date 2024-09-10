'use client';
import React from 'react-dom';
import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import Menu from './Menu';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import { useGetCategoria } from '@/hooks/useGetCategoria';
import { MenuCategoryLoaderMobile } from '../Skeleton/Loaders/MenuCategoryLoader';
import MobileButton from './MobileButton';

interface MenuCategoriaProps {
  setOpened?: (state: boolean) => void;
  isOpened?: boolean;
}

function MenuCategory({ setOpened, isOpened }: MenuCategoriaProps) {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog.Root
      onOpenChange={(state) => {
        setIsOpen(state);

        if (setOpened) setOpened(state);
      }}
    >
      <Dialog.Trigger asChild>
        <MobileButton
          title={'Produtos'}
          icon={isOpen ? 'ri-close-line' : 'ri-product-hunt-line'}
          className="text-white"
          isChecked={isOpen}
        />
      </Dialog.Trigger>
      <Dialog.Overlay className="hidden" />
      <Dialog.DialogContent className="fixed">
        {/* <Menu className="" /> */}
        <div
          className={twMerge(
            ' overflow-auto fixed group right-0 left-0 top-0 bg-gray-100 dark:bg-gray-900 p-4 pt-0 bottom-[81px] md:w-11 md:overflow-hidden md:pl-2 md:hover:w-60 /md:hover:w-80 md:hover:shadow md:block md:top-0 md:bottom-0 transition-all !z-[999]'
            // className
          )}
        >
          <div className=" sticky top-0 bg-inherit flex justify-between mb-5 items-center border-b-2 border-gray-200 dark:border-b-gray-800 md:hidden pt-5 pb-3">
            <h3 className="text-primary font-bold text-2xl">Produtos</h3>

            <Dialog.Close>
              <i className="ri-close-line"></i>
            </Dialog.Close>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-3 md:hidden md:max-h-full hover:overflow-y-auto">
            <MenuCategoryMobile />
          </div>
        </div>
      </Dialog.DialogContent>
    </Dialog.Root>
  );
}

function MenuCategoryMobile() {
  const { result, body } = useGetCategoria();
  const path = usePathname();

  if (result.isLoading) {
    return <MenuCategoryLoaderMobile />;
  }

  if (result.isError) {
    return (
      <span className="text-center text-red-600 flex flex-col gap-2 items-center md:flex-row">
        <span className={`material-symbols-outlined text-base`}>
          brightness_alert
        </span>
        <span className="whitespace-nowrap text-xs md:hidden md:group-hover:inline-block line-clamp-1">
          Erro ao carregar categorias
        </span>
      </span>
    );
  }

  return (
    <>
      {result.isSuccess &&
        body?.map((categoria) => (
          <Dialog.Close key={categoria.id} asChild>
            <Link
              title={categoria.nome}
              href={`/category/${categoria.id}/${encodeURIComponent(
                categoria.nome.replaceAll(' ', '-')
              )}?categoria=${categoria.nome}`}
              className={`hover:text-primary flex flex-col justify-between gap-2 border dark:border-gray-800 rounded p-2 h-[100px]`}
            >
              <span
                className={`/self-start m-auto material-symbols-outlined text-2xl md:text-3xl hover:font-bold ${
                  '/category/' + categoria.id + '/subcategory' === path
                    ? 'text-black'
                    : 'text-primary'
                }`}
              >
                {categoria.icone}
              </span>
              <span
                className={`m-auto text-xs text-center line-clamp-2 text-slate-700 ${
                  '/category/' + categoria.id + '/subcategory' === path
                    ? 'font-bold'
                    : 'font-normal'
                }`}
              >
                {categoria.nome}
              </span>
            </Link>
          </Dialog.Close>
        ))}
    </>
  );
}

export { Menu };

export default MenuCategory;
