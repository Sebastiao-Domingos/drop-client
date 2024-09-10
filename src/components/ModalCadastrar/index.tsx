import Modal, { ModalAnimatedContent } from '@/components/Modals';
import * as Dialog from '@radix-ui/react-dialog';
import { twMerge } from 'tailwind-merge';
import { HTMLAttributes } from 'react';
import LoadingStatus from '../../../@types/LoadingStatus';
import { Button } from '@/components/Buttons/Button';
import CreateStatus from '../status/CreateStatus';

interface ModalCadastroProps extends HTMLAttributes<HTMLDivElement> {
  status: LoadingStatus;
  type: string;
  edit?: boolean;
  errorMessage?: string;
}
function ModalCadastro({
  status,
  errorMessage,
  type,
  edit,
  className = '',
  children,
}: ModalCadastroProps) {
  return (
    <ModalAnimatedContent
      className={twMerge(
        'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md w-[70vw] lg:max-h-[90vh] overflow-auto',
        className
      )}
    >
      <div className="rounded-b mt-0">
        <CreateStatus
          status={status}
          textError={
            errorMessage ||
            `Erro ao ${edit ? 'atualizar' : 'cadastrar'} a/o ${type}`
          }
          textLoading={`${edit ? 'Atualizando' : 'Cadastrando'} a/o ${type}`}
          textSuccess={`${type} ${
            edit ? 'atualizado' : 'cadastrado'
          } com sucesso!`}
        />
      </div>

      <div className="sticky top-0 flex justify-between items-center shadow px-4 py-5 dark:border-b bg-white dark:bg-gray-900 dark:border-b-gray-800 z-10">
        <div>
          <h2 className="font-bold text-lg sm:text-2xl">
            {' '}
            {edit ? 'Atualizar' : 'Adicionar'} {type}
          </h2>
          {!edit && (
            <p className="text-xs">
              Os campos marcados com (<span className="text-red-600">*</span>)
              são obrigatórios
            </p>
          )}
        </div>
        <Dialog.Close>
          <i className="ri-close-line text-xl"></i>
        </Dialog.Close>
      </div>

      {children}
    </ModalAnimatedContent>
  );
}

export default ModalCadastro;

interface TriggerProps extends HTMLAttributes<HTMLButtonElement> {
  title: string;
  useDefaultIcon?: boolean;
}
function Trigger({
  title,
  useDefaultIcon = true,
  className = '',
  children,
}: TriggerProps) {
  return (
    <Dialog.Trigger asChild>
      <Button label={title}>
        {useDefaultIcon && <i className="ri-add-circle-line"></i>}
        {children}
      </Button>
    </Dialog.Trigger>
  );
}

export { Trigger };
