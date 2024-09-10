import Modal from './../../../../components/Modals/index';

import * as Dialog from '@radix-ui/react-dialog';
import { twMerge } from 'tailwind-merge';
import { useForm } from 'react-hook-form';
import { HTMLAttributes, useState } from 'react';
import LoadingStatus from '../../../../../@types/LoadingStatus';
import { useStatus } from '@/hooks/useLoadingStatus';
import { ClientUpdateData } from '@/services/users/Cliente';
import { useActionCliente } from '@/hooks/client/useActionClient';
import { logger } from '@/Logger';
import { Button } from '@/components/Buttons/Button';
import ModalCadastro from '@/components/ModalCadastrar';

interface EditProps extends HTMLAttributes<HTMLDivElement> {
  cliente: ClientUpdateData;
  atributo?: number;
  valueCliente: string;
}

function Edit({
  className = '',
  cliente,
  atributo,
  valueCliente,
  children,
  ...others
}: EditProps) {
  const { mutationUpdate } = useActionCliente();

  const [valor, setValor] = useState(valueCliente);
  const { handleSubmit } = useForm<ClientUpdateData>({});

  const updateStatus = useStatus();
  const submitHandler = (data: ClientUpdateData) => {
    switch (atributo) {
      case 1:
        cliente.nome = valor;
        break;
      case 2:
        cliente.email = valor;
        break;
      case 3:
        cliente.rua = valor;
        break;
      case 4:
        cliente.nome = valor;
        break;
      default:
        break;
    }
    data = cliente;

    mutationUpdate.mutate(data, {
      onSuccess() {
        updateStatus.setStatus(LoadingStatus.SUCCESS);
      },
      onError(error) {
        updateStatus.setStatus(LoadingStatus.ERROR);
        logger.info(error);
      },
      onSettled() {
        setTimeout(() => {
          updateStatus.setStatus(LoadingStatus.DONE);
        }, 3000);
      },
    });
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
          action="#"
          method="post"
        >
          <fieldset disabled={updateStatus.status === LoadingStatus.LOADING}>
            <div className="flex flex-col gap-3 mb-6">
              <input
                className="p-3 md:p-3 border rounded outline-none focus:border-primary/60"
                type="text"
                value={valor}
                onInput={(e) => setValor(e.currentTarget.value)}
                placeholder="Dados do cliente"
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

export default Edit;
