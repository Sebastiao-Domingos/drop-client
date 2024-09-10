'use client';

import Image from 'next/image';
import IPaymentMethod from './IPaymentMethod';
import { useState } from 'react';
import LoadingStatus from '../../../../../@types/LoadingStatus';
import { useStatus } from '@/hooks/useLoadingStatus';
import ModalWaitPayment from '@/components/countDown/ModalWaitPayment';
import { usePathname, useRouter } from 'next/navigation';
import { isEmptyString } from '@/helpers/functions/isEmptyString';
import { paymentAction } from '@/actions/payment';
import { toast } from 'react-toastify';
import { DEFAULT_TOAST_TIME_VISIBILITY } from '@/helpers/constants';
import { Button } from '@/components/Buttons/Button';
import InputPhoneNumber from '@/components/InputPhoneNumber';

interface ExpressProps extends IPaymentMethod {
  encomenda_id: string;
}

function Express({ deselectedOption, encomenda_id }: ExpressProps) {
  const [telefone, setTelefone] = useState('');

  const [modalStatus, setModalStatus] = useState({
    showNotPayed: false,
    showModal: false,
    dialogAwaitStatus: false,
  });

  const { status, setStatus } = useStatus();
  const router = useRouter();

  const pathname = usePathname();

  return (
    <div className="min-w-full sm:min-w-[480px] my-10 mx-auto bg-white dark:bg-slate-950 shadow-md rounded-lg overflow-hidden">
      <div className="relative bg-primary">
        <button
          className="p-3 text-white bg-white/10 w-12 h-12 rounded-full absolute top-1/2 left-6 -translate-y-1/2"
          onClick={deselectedOption}
        >
          <i className="ri-arrow-left-line"></i>
        </button>
        <div className="space-y-2 p-6">
          <div className="flex justify-center">
            <Image
              width={120}
              height={120}
              alt="dunorte solutions"
              src={'/images/logobranco.svg'}
              className="w-[120px] h-auto"
              priority
            />
          </div>
          <p className="text-white text-center text-sm">
            Digite o número do seu multicaixa express
          </p>
        </div>
      </div>
      <div className="p-6 flex flex-col items-start xs:flex-row xs:justify-center gap-6">
        <div className="w-full space-y-2">
          <label htmlFor="telefone">Número do telefone</label>
          {/**
           * 

           <input
             type="text"
             name="telefone"
             id="telefone"
             className="w-full p-2 border rounded outline-none focus:border-primary/50 dark:focus:border-primary disabled:cursor-progress"
             placeholder="Telefone"
             onChange={(evt) => {
               setTelefone(evt.target.value);
             }}
             disabled={status === LoadingStatus.LOADING}
           />

           */}
          <InputPhoneNumber
            defaultCountry="ao"
            className="!mb-2 rounded focus-within:ring-1 ring-primary"
            name="telefoone"
            required
            value={telefone}
            onChange={(phone) => {
              phone = phone.replace('+', '');

              setTelefone(phone);
            }}
            disabled={status === LoadingStatus.LOADING}
          />
        </div>
      </div>
      <div className="border-t dark:border-t-gray-800 p-6">
        <ModalWaitPayment
          closeModal={() =>
            setModalStatus((prev) => ({ ...prev, dialogAwaitStatus: false }))
          }
          isOpened={modalStatus.dialogAwaitStatus}
        />
        <Button
          label=""
          className="w-full"
          onClick={async () => {
            // setTimer(90);
            setStatus(LoadingStatus.LOADING);

            if (
              isEmptyString(telefone) ||
              telefone.length < 10 ||
              isNaN(Number(telefone))
            ) {
              toast('Telefone inválido!', {
                type: 'warning',
                autoClose: DEFAULT_TOAST_TIME_VISIBILITY,
              });
              setStatus(LoadingStatus.DONE);
              return;
            }

            setModalStatus((prev) => ({ ...prev, dialogAwaitStatus: true }));

            const response = await paymentAction({
              encomenda_id,
              telefone,
            });

            setModalStatus((prev) => ({ ...prev, dialogAwaitStatus: false }));
            //setDialogAwaitStatus(false);

            if (response === 200) {
              setModalStatus((prev) => ({
                ...prev,
                showModal: true,
                showNotPayed: false,
              }));
              toast('Pagamento efectuado com sucesso!', {
                type: 'success',
                autoClose: DEFAULT_TOAST_TIME_VISIBILITY,
                onClose() {
                  setModalStatus((prev) => ({
                    ...prev,
                    dialogAwaitStatus: false,
                    showModal: false,
                  }));

                  setStatus(LoadingStatus.SUCCESS);
                  router.push(`${pathname}/success`);
                },
              });
            } else {
              toast('O pagamento não efectuado, tente novamente!', {
                type: 'error',
                onClose() {
                  setModalStatus((prev) => ({
                    ...prev,
                    dialogAwaitStatus: false,
                    showModal: false,
                  }));
                },
              });

              setStatus(LoadingStatus.ERROR);
              setModalStatus((prev) => ({
                ...prev,
                showNotPayed: true,
                showModal: false,
              }));

              setTimeout(() => {
                setModalStatus((prev) => ({
                  ...prev,
                  showNotPayed: false,
                  showModal: false,
                }));
                setStatus(LoadingStatus.DONE);
              }, 4000);
            }
          }}
          disabled={status === LoadingStatus.LOADING}
        >
          Confirmar
        </Button>
      </div>
    </div>
  );
}

export default Express;
