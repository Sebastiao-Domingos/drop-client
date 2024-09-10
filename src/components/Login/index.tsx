'use client';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import * as Dialog from '@radix-ui/react-dialog';
import Modal, { ModalAnimatedContent } from '../Modals';
import { createRef, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SessionData } from '@/controllers/Session';
import { AuthenticationContext } from '@/contexts/AuthenticationProvider';
import LoadingStatus from '../../../@types/LoadingStatus';
import { usePathname, useRouter } from 'next/navigation';
import InputPhoneNumber from '../InputPhoneNumber';
import CreateStatus from '../status/CreateStatus';

interface loginProps {
  children: React.ReactNode;
  setOpened?: (state: boolean) => void;
}

export default function LoginModal({ children, setOpened }: loginProps) {
  const pathname = usePathname();
  const trigger = createRef<HTMLButtonElement>();
  const { login, loginStatus, errorMessage } = useContext(
    AuthenticationContext
  );
  const router = useRouter();
  const [whatsapp, setWhatsapp] = useState('');

  const { handleSubmit, register } = useForm<SessionData>();

  const submitHandler = (data: SessionData) => {
    data.contacto = whatsapp.replace('+', '');
    data.tipo_usuario = 'cliente';
    login(data);
  };

  useEffect(() => {
    if (loginStatus === LoadingStatus.SUCCESS) {
      window.location.href = pathname;
    }
  }, [router, loginStatus, pathname]);

  return (
    <Modal
      onOpenChange={(visible) => {
        if (setOpened) setOpened(visible);
      }}
    >
      <Dialog.Trigger ref={trigger} asChild>
        {children}
      </Dialog.Trigger>
      <ModalAnimatedContent className="top-1/2 -translate-y-1/2 max-w-sm max-h-max">
        <div className="flex justify-between px-6 py-4 border-b dark:border-gray-800">
          <Dialog.Title className={twMerge('font-bold text-2xl ')}>
            Login
          </Dialog.Title>
          <Dialog.Close>
            <i className={twMerge('ri-close-line text-2xl')}></i>
          </Dialog.Close>
        </div>
        <form onSubmit={handleSubmit(submitHandler)} className="mb-8 p-6 pb-0">
          <fieldset disabled={loginStatus === LoadingStatus.LOADING}>
            <div>
              <label className="inline-block mb-2 font-bold">Contacto</label>
              <div className="relative">
                <i className="absolute text-gray-400 text-xl top-2 left-2 ri-phone-line"></i>
                <InputPhoneNumber
                  {...register('contacto')}
                  defaultCountry="ao"
                  className="!mb-2 rounded focus-within:ring-1 ring-primary"
                  // inputClassName={twMerge(
                  //   "!px-2 w-full !text-base rounded border border-gray-300 outline-0",
                  //   "w-full !py-[14px] !px-2 !rounded-e"
                  // )}
                  required
                  value={whatsapp}
                  onChange={(phone) => {
                    setWhatsapp(phone);
                  }}
                />
              </div>
            </div>
            <div className="mt-2">
              <label className="inline-block mb-2 font-bold">Senha</label>
              <div className="relative">
                <i className="absolute text-gray-400 text-xl top-2 sm:top-[0.3rem] left-2 ri-lock-2-line"></i>
                <input
                  type="password"
                  placeholder="Digite a palavra passe"
                  {...register('senha')}
                  className={twMerge(
                    'p-3 pl-8 sm:p-2 sm:pl-8 w-full mb-4 rounded border text-sm sm:text-base border-gray-300 outline-0 focus:ring-1 ring-primary'
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <Link
                onClick={() => {
                  trigger.current?.click();
                }}
                href="/reset-password"
                className={twMerge('text-sm text-primary')}
              >
                Recuperar a palavra-passe
              </Link>
            </div>

            <div className={twMerge('mt-6 flex flex-col space-y-4')}>
              <button
                type="submit"
                className={twMerge(
                  'h-12 shadow p-2 rounded-full bg-primary disabled:bg-gray-300 disabled:cursor-wait text-white flex justify-center hover:opacity-80 transition-opacity items-center'
                )}
              >
                Entrar <i className="ml-2 ri-login-box-line"></i>
              </button>
            </div>
          </fieldset>
        </form>
        <div className="w-full flex flex-col gap-4 px-6 pb-6">
          <Link
            onClick={() => {
              trigger.current?.click();
            }}
            href={'/signup'}
            className={twMerge(
              'h-12 shadow p-2 rounded-full bg-gray-500 text-white flex justify-center hover:opacity-80 items-center'
            )}
          >
            Registrar-se <i className="ml-2 ri-account-circle-line"></i>
          </Link>
          <CreateStatus
            status={loginStatus}
            textError={errorMessage || 'Dados inválidos!'}
            textLoading="Autenticando!"
            textSuccess="Usuário logado!"
          />
        </div>
      </ModalAnimatedContent>
    </Modal>
  );
}
