'use client';

import InputPhoneNumber from '@/components/InputPhoneNumber';
import { AuthenticationContext } from '@/contexts/AuthenticationProvider';
import { SessionData } from '@/controllers/Session';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import LoadingStatus from '../../../../@types/LoadingStatus';
import { useSearchParams } from 'next/navigation';
import CreateStatus from '@/components/status/CreateStatus';

function LoginScreen() {
  const { login, loginStatus, errorMessage } = useContext(
    AuthenticationContext
  );

  const searchParams = useSearchParams();
  const [whatsapp, setWhatsapp] = useState('');

  const { handleSubmit, register } = useForm<SessionData>();

  const submitHandler = (data: SessionData) => {
    data.contacto = whatsapp.replace('+', '');
    data.tipo_usuario = 'cliente';
    login(data);
  };

  useEffect(() => {
    if (loginStatus === LoadingStatus.SUCCESS) {
      window.location.href = searchParams.get('url') || '/';
    }
  }, [loginStatus, searchParams]);
  return (
    <div
      className={twMerge(
        'my-10 mx-auto bg-white dark:bg-gray-950 rounded-lg shadow max-w-sm'
      )}
    >
      <div className="p-6 font-bold text-2xl text-center border-b dark:border-b-gray-800">
        Login
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
          <div>
            <label className="inline-block mb-2 font-bold">Senha</label>
            <div className="relative">
              <i className="absolute text-gray-400 text-xl top-2 sm:top-1 left-2 ri-lock-2-line"></i>
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
      <div className="w-full flex flex-col gap-4 mb-4 p-6 pt-0">
        <Link
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
    </div>
  );
}

export default LoginScreen;
