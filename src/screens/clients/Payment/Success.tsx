import { useGetEncomendaClienteDetalhe } from '@/hooks/encomenda/cliente/useGetEncomendaClienteDetalhe';
import Link from 'next/link';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface PaymentSuccessProps {
  params: {
    encomenda: string;
    codigo: string;
  };
}

function PaymentSuccess({ params }: PaymentSuccessProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { result } = useGetEncomendaClienteDetalhe(params.encomenda);

  if (result.isPending) {
    return (
      <div className="w-screen h-screen flex justify-center items-center px-[10px] bg-gray-100 dark:bg-slate-900">
        <div className="min-w-[300px] sm:min-w-[480px] my-10 mx-auto bg-white dark:bg-slate-950 shadow-md rounded-lg overflow-hidden">
          <p className="text-center p-6">Carregando, por favor aguarde...</p>
        </div>
      </div>
    );
  }

  if (result.isError) {
    if (result.error.message === 'Usuário não autorizado') {
      redirect(`/login/?url=${pathname}`);
    }
    return (
      <div className="w-screen h-screen flex justify-center items-center px-[10px] bg-gray-100 dark:bg-slate-900">
        <div className="min-w-[300px] sm:min-w-[480px] space-y-4 my-10 mx-auto bg-white dark:bg-slate-950 shadow-md rounded-lg overflow-hidden">
          <p className="text-center p-6 pb-2">
            {result.error.message || 'Encomenda não encontrada!'}
          </p>
          <p className="text-center pb-6">
            <Link href="/" className="text-blue-600">
              Fazer compras!
            </Link>
          </p>
        </div>
      </div>
    );
  }

  setTimeout(() => {
    router.push('/user/perfil');
  }, 3000);

  return (
    <div className="min-h-screen w-full flex justify-center items-center dark:bg-slate-900">
      <div className="max-w-[480px] p-4 rounded shadow bg-white dark:bg-slate-950 space-y-8">
        <div className="text-center space-y-4 cursor-default">
          <span className="material-symbols-outlined text-green-500 text-9xl">
            verified
          </span>

          <p className="text-slate-600 text-center">
            Pagamento efectuado com sucesso!
            {/* <LoginModal>
                <span className="text-blue-600 cursor-pointer">
                  Fazer login
                </span>
              </LoginModal> */}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
