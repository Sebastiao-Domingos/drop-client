'use client';
import Link from 'next/link';
import { Dispatch, HTMLAttributes, useState } from 'react';
import Image from 'next/image';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  RedirectType,
  redirect,
  usePathname,
  useRouter,
} from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '@/hooks/useAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthenticationProvider from '@/contexts/AuthenticationProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const links = [
  {
    title: 'Home',
    icon: 'ri-home-8-line',
    url: '/',
  },
  {
    title: 'A Minha Conta',
    icon: 'ri-user-line',
    url: '/user/perfil',
  },
  {
    title: 'Os meus dados',
    icon: 'ri-profile-line',
    url: '/user/detail',
  },
  {
    title: 'Minha localização',
    icon: 'ri-map-pin-user-line',
    url: '/user/locality',
  },
  {
    title: 'Sugestões',
    icon: 'ri-bookmark-line',
    url: '/user/sugestion',
  },
];

const links2 = [
  {
    title: 'carrinho de compras',
    icon: 'ri-shopping-cart-line',
    url: '/user/shopcarts',
  },
  {
    title: 'As minhas encomendas',
    icon: 'ri-briefcase-line',
    url: '/user/commissions',
  },
  {
    title: 'Trocas e Devoluções',
    icon: 'ri-repeat-fill',
    url: '/user/devolution',
  },
  {
    title: 'Encomendas canceladas',
    icon: 'ri-repeat-fill',
    url: '/user/canceled',
  },
  {
    title: 'Descontos e cupões',
    icon: 'ri-percent-line',
    url: '/user/discounts',
  },
  {
    title: 'Favoritos',
    icon: 'ri-user-line',
    url: '/user/favourites',
  },
  {
    title: 'Faturas',
    icon: 'ri-article-line',
    url: '/user/invoices',
  },
  // {
  //   title: "Parceria",
  //   icon: "ri-service-line",
  //   url: "#",
  // },
  // {
  //   title: "Os teus interesses",
  //   icon: "ri-palette-line",
  //   url: "#",
  // },
];

const queryClient = new QueryClient();

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <AuthenticationProvider type="cliente">
        <Screen>{children}</Screen>
      </AuthenticationProvider>
    </QueryClientProvider>
  );
}

function Screen({ children }: { children: React.ReactNode }) {
  const [showModal, setShowModal] = useState(false);
  const { user, status } = useAuth();
  const pathname = usePathname();

  if (status === 'pending') {
    return <></>;
  }

  if (status !== 'success' || user?.tipo_usuario !== 'cliente') {
    redirect(`/login?url=${pathname}`, RedirectType.replace);
  }

  return (
    <>
      <div className="w-full min-h-screen bg-slate-100 dark:bg-gray-900">
        <header className="w-full bg-white dark:bg-gray-900 mb-8">
          <div className="flex py-2 px-4 border-b dark:border-gray-800">
            <ul className="ml-auto flex gap-4 text-[12px]">
              <li className="uppercase hover:text-primary">
                <Link href="#">Estado de encomenda</Link>
              </li>
              <li className="uppercase hover:text-primary">
                <Link href="#">Ajuda</Link>
              </li>
            </ul>
          </div>
          <div className="flex px-4 py-8 items-center justify-between">
            <div className="hidden md:block">
              <Link href="/" className="">
                <i className="ri-arrow-left-line"></i>{' '}
                <i className="ri-home-8-line text-2xl"></i>
              </Link>
            </div>
            <Image
              src="/images/logo_azul.svg"
              alt="Logo ad dunorte"
              width={100}
              height={100}
              className="h-auto w-[8rem] md:w-[12rem]"
              property=""
            />
            <div className="">
              <button
                className="block md:hidden text-2xl"
                onClick={() => setShowModal(!showModal)}
              >
                <i className="ri-menu-line"></i>
              </button>
              <UserModal>
                <button className="hidden md:flex items-center">
                  <span className="w-[25px] h-[25px] flex items-center justify-center rounded-full bg-slate-200 dark:bg-gray-950">
                    <i className="ri-user-3-line"></i>{' '}
                  </span>{' '}
                  <span className="text-[12px]">
                    Olá {user && user.usuario.nome}{' '}
                    <i className="ri-arrow-down-s-fill"></i>
                  </span>
                </button>
              </UserModal>
            </div>
          </div>
          <div
            className={`w-full md:hidden ${
              showModal ? 'block' : 'hidden'
            } md:w-auto px-4`}
          >
            <div className="">
              <p className="text-sm text-slate-400">Dados Pessoal</p>
              <ClientPerfilMenuMobile
                links={links}
                className="-mt-3"
                setClose={setShowModal}
              />
            </div>
            <div className="">
              <p className="text-sm text-slate-400">Dados de Compras</p>
              <ClientPerfilMenuMobile
                links={links2}
                className="-mt-3"
                setClose={setShowModal}
              />
            </div>
            {/* <div className="">
                <p className="text-sm text-slate-400">Condições</p>
                <ClientPerfilMenu links={links3} className="-mt-3" />
              </div> */}
          </div>
        </header>
        <div className="md:flex justify-between gap-8 px-4">
          <div className="w-full hidden md:block md:w-auto space-y-3">
            <ClientPerfilMenu links={links} className="sticky top-2" />
            <ClientPerfilMenu links={links2} className="sticky top-[234px]" />
            {/* <ClientPerfilMenu links={links3} /> */}
          </div>
          <div className="w-full min-h-[calc(100vh-296px)]">{children}</div>
        </div>
        <div className="w-full bg-white dark:bg-gray-900 mt-8">
          <div className="flex py-6 border-b dark:border-gray-800">
            <ul className="flex flex-col md:flex-row items-center gap-4 m-auto uppercase text-xs">
              <li className="hover:text-primary">
                <Link href="#">Ajuda</Link>
              </li>
              <li className="hover:text-primary">
                <Link href="#">Contacte-nos</Link>
              </li>
              <li className="hover:text-primary">
                <Link href="#">Condições gerais de venda</Link>
              </li>
              <li className="hover:text-primary">
                <Link href="#">Política de privacidade</Link>
              </li>
            </ul>
          </div>
          <div className="w-ful text-center p-2">
            <p className="text-[12px]">
              © 2023 DUNORTE-JPP · TODOS OS DIREITOS RESERVADOS
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

type TypeMenu = {
  title: string;
  icon: string;
  url: string;
};

interface MenuProps extends HTMLAttributes<HTMLMenuElement> {
  links: TypeMenu[];
}

function ClientPerfilMenu({ links, className = '' }: MenuProps) {
  return (
    <nav
      className={twMerge(
        'px-2 py-4  w-full md:w-[17rem] bg-white dark:bg-gray-900 rounded',
        className
      )}
    >
      <ul className="flex flex-col">
        {links.map((link) => (
          <Li key={link.title} link={link} />
        ))}
      </ul>
    </nav>
  );
}

interface MenuPropsMobile extends HTMLAttributes<HTMLMenuElement> {
  links: TypeMenu[];
  setClose: Dispatch<boolean>;
}

function ClientPerfilMenuMobile({
  links,
  setClose,
  className = '',
}: MenuPropsMobile) {
  return (
    <nav
      className={twMerge(
        'px-2 py-4  w-full md:w-[17rem] bg-white dark:bg-gray-900 rounded',
        className
      )}
    >
      <ul className="flex flex-col">
        {links.map((link) => (
          <LiMobile key={link.title} link={link} setClose={setClose} />
        ))}
      </ul>
    </nav>
  );
}

interface LiProps extends HTMLAttributes<HTMLLIElement> {
  link: TypeMenu;
}

function Li({ link, className = '' }: LiProps) {
  const path = usePathname();

  return (
    <li
      key={link.title}
      className={twMerge(
        `flex border-b last:border-0 hover:bg-slate-200 dark:hover:bg-gray-950/60 dark:border-gray-800  ${
          path.includes(link.url) &&
          'text-primary dark:text-primary pl-3 font-bold'
        }`,
        className
      )}
    >
      <Link
        href={link.url}
        className={`px-1 py-2 w-full text-[12px] space-x-4 ${
          path === link.url && 'text-primary dark:!text-primary pl-3 font-bold'
        }`}
      >
        <i className={link.icon}></i>
        <span>{link.title.toUpperCase()}</span>
      </Link>
    </li>
  );
}

interface LiPropsMobile extends HTMLAttributes<HTMLLIElement> {
  link: TypeMenu;
  setClose: Dispatch<boolean>;
}

function LiMobile({ link, setClose, className = '' }: LiPropsMobile) {
  const path = usePathname();

  const handle = () => {
    setClose(false);
  };

  return (
    <li
      key={link.title}
      className={twMerge(
        `flex border-b dark:border-b-gray-800 last:border-0 hover:bg-slate-200  dark:hover:bg-gray-950/60  ${
          path === link.url && 'text-primary dark:text-primary pl-3'
        }`,
        className
      )}
    >
      <Link
        href={link.url}
        className="px-1 py-2 w-full text-[12px] space-x-4"
        onClick={handle}
      >
        <i className={link.icon}></i>
        <span>{link.title.toUpperCase()}</span>
      </Link>
    </li>
  );
}

interface HelpLink {
  name: string;
  href: string;
}
const listHelp: HelpLink[] = [
  {
    name: 'A Minha Conta',
    href: '/user/perfil',
  },
  {
    name: 'As minhas encomendas',
    href: '/user/commissions',
  },
  {
    name: 'Terminar sessão',
    href: '#',
  },
];

function UserModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const path = usePathname();
  const { logout, status } = useAuth();

  if (status === 'error') {
    redirect('/', RedirectType.replace);
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={twMerge(
            'absolute top-[16px] -left-[105px] w-[180px] bg-white dark:bg-gray-900 border border-primary/40 rounded shadow z-50'
          )}
        >
          <div>
            <ul className="/space-y-4">
              {listHelp.map((item) => (
                <li
                  key={item.name}
                  className={twMerge(
                    `/pb-2 text-xs p-4 border-b border-transparent cursor-pointer hover:bg-primary/30  dark:hover:bg-gray-950/60  hover:text-white hover:last:border-transparent ease-in duration-150
                    ${path === item.href && 'text-primary dark:text-primary'}`
                  )}
                >
                  <DropdownMenu.Item
                    className="outline-none"
                    onClick={
                      item.href === '#'
                        ? () => logout()
                        : () => router.push(`${item.href}`)
                    }
                  >
                    {item.name}
                  </DropdownMenu.Item>
                </li>
              ))}
            </ul>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default Layout;
