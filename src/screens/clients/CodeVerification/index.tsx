'use client';

import ClienteController from '@/controllers/Cliente';
import { useStatus } from '@/hooks/useLoadingStatus';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import LoadingStatus from '../../../../@types/LoadingStatus';
import { useRouter } from 'next/navigation';
import useActionGerarCodigo from '@/hooks/gerarCodigo/useActionGerarCodigo';
import { formatPhoneNumber } from '@/helpers/functions/formatPhoneNumber';
import { toast } from 'react-toastify';
import { DEFAULT_TOAST_TIME_VISIBILITY } from '@/helpers/constants';
import CreateStatus from '@/components/status/CreateStatus';

interface CodeVerificationProps {
  params: {
    whatsapp: string;
  };
}

const controller = new ClienteController();

function CodeVefication({ params }: CodeVerificationProps) {
  const { handleSubmit, register } = useForm<{
    whatsapp: string;
    codigo: string;
  }>();
  const { mutationNovoCodigo } = useActionGerarCodigo();

  const { status, setStatus } = useStatus();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: controller.validarContacto,
  });

  const submitHandler = (data: { whatsapp: string; codigo: string }) => {
    setStatus(LoadingStatus.LOADING);
    data.whatsapp = params.whatsapp;
    mutation.mutate(data, {
      onSuccess() {
        toast('Contacto verificado!', {
          type: 'success',
          autoClose: DEFAULT_TOAST_TIME_VISIBILITY,
        });
        router.push('/user/perfil');
      },
      onError(error) {
        toast(error.message || 'Ocorreu um erro ao verificar a conta', {
          type: 'error',
        });
      },
      onSettled() {
        setStatus(LoadingStatus.DONE);
      },
    });
  };

  return (
    <div className="min-h-[580px] w-full flex justify-center items-center">
      <div className="max-w-[480px] p-4 rounded shadow bg-white dark:bg-slate-950 space-y-8">
        {status === LoadingStatus.LOADING && (
          <CreateStatus
            status={status}
            textError={''}
            textLoading="Verificando"
            textSuccess=""
          />
        )}
        {mutation.isSuccess && (
          <div className="text-center space-y-4 cursor-default">
            <span className="material-symbols-outlined text-green-500 text-9xl">
              verified
            </span>

            <p className="text-slate-600 italic text-center">
              Conta verifica com sucesso!
              {/* <LoginModal>
                <span className="text-blue-600 cursor-pointer">
                  Fazer login
                </span>
              </LoginModal> */}
            </p>
          </div>
        )}
        {!mutation.isSuccess && (
          <>
            <div>
              <h1 className="text-4xl text-center mb-4">
                Código de verificação
              </h1>
              <p className="text-slate-600 italic text-center">
                Digite o código enviado para o whatsapp{' '}
                <span className="font-bold">
                  {formatPhoneNumber(params.whatsapp)}
                </span>{' '}
                para validar a sua conta!
              </p>
            </div>
            <form onSubmit={handleSubmit(submitHandler)}>
              <fieldset disabled={mutation.isPending} className="space-y-4">
                <input
                  type="text"
                  {...register('codigo', { required: true })}
                  className="w-full border rounded text-center p-2 disabled:bg-gray-200"
                  placeholder="Escreva aqui o seu código"
                  max={6}
                />
                <button
                  type="submit"
                  className="text-center text-primary hover:text-white w-full p-2 rounded border border-primary hover:bg-primary disabled:bg-gray-200 disabled:text-white transition-colors"
                >
                  Confirmar
                </button>
              </fieldset>
            </form>
            <div className="space-y-2">
              <p className="text-slate-600 text-xs text-center">
                Não recebi o código. Enviar novo código de verificação!
              </p>

              <button
                type="submit"
                className="text-center w-full p-2 rounded border disabled:cursor-progress"
                onClick={() => {
                  mutationNovoCodigo.mutate(
                    {
                      whatsapp: params.whatsapp,
                    },
                    {
                      onError(error) {
                        toast(error.message || 'Erro ao obter novo código!', {
                          type: 'error',
                        });
                      },
                      onSuccess(data) {
                        toast(data.message, {
                          type: 'success',
                          autoClose: DEFAULT_TOAST_TIME_VISIBILITY,
                        });
                      },
                    }
                  );
                }}
                disabled={mutationNovoCodigo.isPending}
              >
                {mutationNovoCodigo.isPending
                  ? 'Enviando novo código'
                  : 'Novo código'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CodeVefication;
