'use client';

import Link from 'next/link';
import Image from 'next/image';
import MobileButton from './MobileButton';
import SearchModal from '../Modals/SearchModal';
import LoginModal from '../Login';
import Submenu from './Submenu';
import MenuCategory from './MenuCategory';
import { usePathname, useRouter } from 'next/navigation';
import HelpModal from '../Help';
import SubmenuMobile from './SubmenuMobile';
import { useUserData } from '@/hooks/useUserData';
import { useGetCarrinho } from '@/hooks/useGetCarrinho';
import * as Popover from '@radix-ui/react-popover';
import ImageWithFallback from '../ImageWithFallback';
import { numberToMoney } from '@/helpers/functions/numberToMoney';
import { useContext, useRef, useState } from 'react';
import { useActionCart } from '@/hooks/useActionCart';
import { subtotalPorProduto } from '@/screens/clients/Product/Cart';
// import ThemeButton from "../ThemeButton";
import { ThemeContext } from '@/contexts/ThemeProvider';

export default function Navigation() {
  const [isBarato, setIsBarato] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isLogginModel, setIsLogginModel] = useState(false);
  const [isOpenHelpModel, setIsOpenHelpModel] = useState(false);
  const [isProduct, setIsProduct] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const { user } = useUserData();
  const resultCarrinho = useGetCarrinho();
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div className="relative">
        <header className="flex justify-center md:justify-start items-center px-4 py-4 bg-primary md:pl-16">
          <Link href="/">
            <Image
              src={
                theme === 'light'
                  ? '/images/logobranco.svg'
                  : '/images/logo-dark.svg'
              }
              alt="alogo"
              width="130"
              height="70"
              className="w-32"
              priority={true}
            />
          </Link>

          <SearchModal>
            <button className="hidden mx-auto ml-1/2 py-1 px-4 bg-white dark:bg-gray-900 rounded-full md:flex justify-between items-center  w-[50vw] max-w-[560px]   cursor-text outline-none">
              Faça aqui a tua pesquisa
              <i className="ri-search-line  text-2xl text-primary"></i>
            </button>
          </SearchModal>

          <div className="space-x-4 hidden md:flex md:flex-row">
            <Theme />
            <HelpModal setOpenModal={setIsOpenHelpModel}>
              <MobileButton
                title={'Ajuda'}
                icon={'ri-information-line'}
                className="text-white"
                isChecked={isOpenHelpModel}
              />
            </HelpModal>
            <CartMenuDesktop
              isOpenModalLoggin={isLogginModel || isOpenHelpModel}
            />
            {(user === undefined || user.tipo_usuario !== 'cliente') && (
              <LoginModal setOpened={setIsLogginModel}>
                <MobileButton
                  title={'Login'}
                  icon={'ri-user-3-line'}
                  className="text-white"
                  isChecked={isLogginModel}
                />
              </LoginModal>
            )}
            {user !== undefined && user.tipo_usuario === 'cliente' && (
              <Link href="/user/perfil" title={user.usuario.nome}>
                <MobileButton
                  isChecked={
                    path.includes('/user/') &&
                    !isBarato &&
                    isProduct &&
                    !isSearch
                  }
                  title={user.usuario.nome.split(' ')[0]}
                  icon={'ri-shield-user-line'}
                  className="text-white"
                />
              </Link>
            )}
          </div>
        </header>
        <Submenu className="bg-white dark:bg-gray-950" />
      </div>

      <div className="fixed z-50 md:hidden">
        <div className="ml-auto fixed bottom-0 left-0 right-0 bg-primary px-0 py-4">
          {/*Menu mobile*/}
          <div className="flex justify-evenly">
            <MenuCategory
              setOpened={setIsProduct}
              isOpened={isProduct && !isBarato && !isSearch && !isLogginModel}
            />

            <SubmenuMobile setOpened={setIsBarato}>
              <MobileButton
                isChecked={isBarato}
                title={'Tá barato'}
                icon={'ri-settings-2-line'}
                className="text-white"
                onClick={() => {
                  setIsBarato(true);
                  setIsSearch(false);
                  setIsProduct(false);
                }}
              />
            </SubmenuMobile>

            <div className="relative inline-block">
              <span className="absolute top-0 right-0 bg-white dark:bg-gray-900 rounded-full w-4 h-4 text-[10px] text-primary shadow flex items-center justify-center overflow-hidden">
                {resultCarrinho.isSuccess
                  ? resultCarrinho.data.carrinho.reduce(
                      (acc, curr) => curr.quantidade + acc,
                      0
                    ) > 99
                    ? '99+'
                    : resultCarrinho.data.carrinho.reduce(
                        (acc, curr) => curr.quantidade + acc,
                        0
                      )
                  : 0}
              </span>
              <MobileButton
                isChecked={
                  path.includes('/cart') &&
                  !isBarato &&
                  !isProduct &&
                  !isSearch &&
                  !isLogginModel
                }
                onClick={() => {
                  router.push('/cart');
                  setIsBarato(false);
                  setIsSearch(false);
                  setIsProduct(false);
                }}
                title={'Compras'}
                icon={'ri-shopping-cart-2-line'}
                className="text-white"
              />
            </div>

            <SearchModal setOpened={setIsSearch}>
              <MobileButton
                isChecked={
                  isSearch && !isBarato && !isProduct && !isLogginModel
                }
                title={'Pesquisa'}
                icon={'ri-search-line'}
                className="text-white"
                onClick={() => {
                  setIsBarato(false);
                  setIsSearch(true);
                  setIsProduct(false);
                }}
              />
            </SearchModal>
            {(user === undefined || user.tipo_usuario !== 'cliente') && (
              <LoginModal setOpened={setIsLogginModel}>
                <MobileButton
                  title={'Login'}
                  icon={'ri-user-3-line'}
                  className="text-white"
                  isChecked={isLogginModel}
                />
              </LoginModal>
            )}
            {user !== undefined && user.tipo_usuario === 'cliente' && (
              <Link href="/user/perfil" title={user.usuario.nome}>
                <MobileButton
                  isChecked={path.includes('/user/')}
                  title={user.usuario.nome.split(' ')[0]}
                  icon={'ri-shield-user-line'}
                  className="text-white"
                  onClick={() => {
                    setIsBarato(false);
                    setIsSearch(false);
                    setIsProduct(false);
                  }}
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

interface CartMenuDesktopProps {
  isOpenModalLoggin?: boolean;
}

function CartMenuDesktop({ isOpenModalLoggin }: CartMenuDesktopProps) {
  const pathName = usePathname();
  const resultCarrinho = useGetCarrinho();
  const { mutationRemover } = useActionCart();
  const triggerRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger asChild>
          <div className="relative inline-block" ref={triggerRef}>
            <span className="absolute top-0 right-0 bg-white dark:bg-gray-900 dark:text-slate-400 rounded-full w-4 h-4 text-[10px] text-primary shadow flex items-center justify-center overflow-hidden">
              {resultCarrinho.isSuccess
                ? resultCarrinho.data.carrinho.reduce(
                    (acc, curr) => curr.quantidade + acc,
                    0
                  ) > 99
                  ? '99+'
                  : resultCarrinho.data.carrinho.reduce(
                      (acc, curr) => curr.quantidade + acc,
                      0
                    )
                : 0}
            </span>
            <MobileButton
              title={'Compras'}
              icon={'ri-shopping-cart-2-line'}
              className="text-white"
              isChecked={pathName.includes('/cart') && !isOpenModalLoggin}
            />
          </div>
        </Popover.Trigger>
        <Popover.Anchor />
        <Popover.Portal>
          <Popover.Content className="w-80 max-h-[460px] px-4 pt-4 mr-2 bg-white dark:bg-gray-900 shadow rounded-lg">
            {resultCarrinho.isSuccess &&
              resultCarrinho.data.carrinho.length === 0 && (
                <p className="text-sm text-center pb-4">
                  Nenhum produto adicionado! 😟
                </p>
              )}

            {resultCarrinho.isSuccess &&
              resultCarrinho.data.carrinho.length !== 0 && (
                <div className="overflow-auto max-h-[calc(460px-136px-32px)]">
                  {resultCarrinho.data.carrinho.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-row gap-2 items-center border-b dark:border-gray-800 py-4 first:pt-0 last:border-b-0"
                    >
                      <div className="min-w-[70px] max-w-[70px] h-[70px] overflow-hidden">
                        <ImageWithFallback
                          src={item.produto.imagem}
                          alt={item.produto.nome}
                          width={70}
                          height={70}
                          className="w-auto h-auto"
                          priority
                        />
                      </div>
                      <div className="space-y-1 min-w-[143px] max-w-[143px]">
                        <Link
                          href={`/product/${item.produto.referencia}`}
                          className="text-primary text-sm hover:underline"
                          onClick={() => triggerRef.current?.click()}
                        >
                          {item.produto.nome}
                        </Link>
                        <p className="text-sm">
                          Qtd: {item.quantidade.toString().padStart(2, '0')}{' '}
                          {item.produto.roupa && (
                            <div className="inline-flex flex-row items-center gap-2">
                              <span>{item.tamanho}</span>
                              <span
                                style={{
                                  backgroundColor: item.cor,
                                }}
                                className="w-3 h-3 rounded-full inline-block"
                              ></span>
                            </div>
                          )}
                        </p>
                        <p className="font-bold text-xl text-primary">
                          {numberToMoney(
                            subtotalPorProduto({
                              ...item,
                              quantidade: 1,
                            }).toString()
                          )}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          mutationRemover.mutate(item.id);
                        }}
                        className="px-3"
                      >
                        <i className="ri-delete-bin-2-line text-red-600 text-lg"></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            <Popover.Arrow className="fill-white dark:fill-gray-900" />
            {resultCarrinho.isSuccess &&
              resultCarrinho.data.carrinho.length !== 0 && (
                <div className="pt-4 pb-4 sticky bottom-0 bg-white dark:bg-gray-900">
                  <div className="flex flex-row items-center gap-2 font-bold">
                    <span className="text-sm">Total</span>
                    <span className="text-2xl text-primary">
                      {numberToMoney(resultCarrinho.data.valor_total)}
                    </span>
                  </div>
                  <Link
                    href={'/cart'}
                    className="mt-4 flex items-center justify-center min-w-[100px] gap-2 p-2 bg-primary/50 hover:bg-primary/60 active:bg-primary/70 rounded shadow border"
                    onClick={() => triggerRef.current?.click()}
                  >
                    Carrinho
                  </Link>
                </div>
              )}
            {/* <Popover.Close /> */}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}

function Theme() {
  const { setTheme, theme } = useContext(ThemeContext);
  return (
    <MobileButton
      onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }}
      icon={theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line'}
      title={theme === 'dark' ? 'Claro' : 'Escuro'}
      className="text-white"
    />
  );
}
