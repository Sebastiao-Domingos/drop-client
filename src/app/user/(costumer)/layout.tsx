'use client';
import Link from 'next/link';
import Image from 'next/image';
import { RedirectType, redirect } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthenticationProvider from '@/contexts/AuthenticationProvider';

const queryClient = new QueryClient();
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationProvider type="cliente">
        <Screen>{children}</Screen>
      </AuthenticationProvider>
    </QueryClientProvider>
  );
}

function Screen({ children }: { children: React.ReactNode }) {
  const { user, status } = useAuth();

  if (status === 'pending') {
    return <></>;
  }

  if (status !== 'success' || user?.tipo_usuario !== 'cliente') {
    redirect('/?error=Login+necessário', RedirectType.replace);
  }

  return (
    <>
      <div className="w-full bg-slate-100 dark:bg-gray-900">
        <header className="w-full bg-white dark:bg-gray-900 mb-8">
          <div className="flex py-2 px-4 border-b dark:border-b-gray-800">
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
            <Link href="/" className="">
              <Image
                src="/images/logo_azul.svg"
                alt="Logo ad dunorte"
                width={100}
                height={100}
                className="h-auto w-[10rem] md:w-[12rem]"
                property=""
              />
            </Link>
            <div className="">
              <Link href="/user/perfil">Minha conta</Link>
            </div>
          </div>
        </header>

        <div className="w-full min-h-[calc(100vh-200px)]">{children}</div>
        <div className="w-full bg-white mt-8 dark:bg-gray-900">
          <div className="flex py-6 border-b dark:border-b-gray-800">
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
              &copy; 2023 DUNORTE-JPP · TODOS OS DIREITOS RESERVADOS
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
