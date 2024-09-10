import Modal from '../../../../components/Modals/index';

import * as Dialog from '@radix-ui/react-dialog';
import { twMerge } from 'tailwind-merge';
import { useForm } from 'react-hook-form';
import { HTMLAttributes } from 'react';
import LoadingStatus from '../../../../../@types/LoadingStatus';
import { useStatus } from '@/hooks/useLoadingStatus';
import { Button } from '@/components/Buttons/Button';
import { ClientePassword } from '@/services/users/password/ClientePassword';
import { useActionActualizarSenha } from '@/hooks/client/useActionActualizarSenha';
import { toast } from 'react-toastify';
import ModalCadastro from '@/components/ModalCadastrar';

interface EditProps extends HTMLAttributes<HTMLDivElement> {}

function EditPassword({ className = '', children, ...others }: EditProps) {
  const { handleSubmit, register, reset } = useForm<
    ClientePassword & { confirma_senha: string }
  >({});
  const { mutationUpdatePassword } = useActionActualizarSenha();

  const updateStatus = useStatus();

  const submitHandler = ({
    confirma_senha,
    nova_senha,
    senha_atual,
  }: ClientePassword & { confirma_senha: string }) => {
    updateStatus.setStatus(LoadingStatus.LOADING);

    if (confirma_senha !== nova_senha) {
      toast('Nova senha e confirmar senha não são compatíveis', {
        type: 'warning',
      });
      return;
    }

    mutationUpdatePassword.mutate(
      { nova_senha, senha_atual },
      {
        onSuccess() {
          updateStatus.setStatus(LoadingStatus.SUCCESS);
          reset();
        },
        onError(error) {
          updateStatus.setStatus(LoadingStatus.ERROR);
          toast(error.message, { type: 'error' });
        },
        onSettled() {
          setTimeout(() => {
            updateStatus.setStatus(LoadingStatus.DONE);
          }, 3000);
        },
      }
    );
  };

  return (
    <Modal className={twMerge('', className)} {...others}>
      <Dialog.Trigger className="uppercase text-xs pb-4 border-b dark:border-gray-800 hover:border-b-primary">
        {children}
      </Dialog.Trigger>
      <ModalCadastro
        status={updateStatus.status}
        type={'Usuário'}
        edit
        className="w-[95%] md:max-w-[600px]"
      >
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="my-6 px-4 text-xs md:text-sm"
        >
          <fieldset disabled={updateStatus.status === LoadingStatus.LOADING}>
            <div className="flex flex-col gap-3 mb-6">
              <label htmlFor="current_password" className="text-sm">
                Senha actual
              </label>
              <input
                id="current_password"
                className="p-3 md:p-3 border rounded outline-none focus:border-primary/60"
                type="password"
                {...register('senha_atual', { required: true })}
              />
            </div>

            <div className="flex flex-col gap-3 mb-6">
              <label htmlFor="new_password" className="text-sm">
                Nova senha
              </label>
              <input
                id="new_password"
                className="p-3 md:p-3 border rounded outline-none focus:border-primary/60"
                type="password"
                {...register('nova_senha', { required: true })}
              />
            </div>

            <div className="flex flex-col gap-3 mb-6">
              <label htmlFor="confirm_password" className="text-sm">
                Nova senha
              </label>
              <input
                id="confirm_password"
                className="p-3 md:p-3 border rounded outline-none focus:border-primary/60"
                type="password"
                {...register('confirma_senha', { required: true })}
              />
            </div>

            <div className="flex gap-4">
              <Dialog.Close asChild>
                <Button
                  label="Voltar"
                  type="button"
                  secondary
                  className="w-full p-3"
                />
              </Dialog.Close>
              <Button label="" type="submit" className="w-full p-3">
                Salvar
              </Button>
            </div>
          </fieldset>
        </form>
      </ModalCadastro>
    </Modal>
  );
}

export default EditPassword;
