import { Button } from '@/components/Buttons/Button';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

export type Payment = 'express' | 'qrcode';

interface PaymentOptionProps {
  payment?: Payment;
  setPaymentForm: (payment: Payment) => void;
  setSelectedOption: () => void;
}

function PaymentOption({
  setPaymentForm,
  setSelectedOption,
  payment,
}: PaymentOptionProps) {
  return (
    <div className="min-w-[300px] sm:min-w-[480px] my-10 mx-auto bg-white dark:bg-slate-950 shadow-md rounded-lg overflow-hidden">
      {/* header */}
      <div className="space-y-2 p-6 bg-primary">
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
          Escolha a forma em que deseja fazer o pagamento
        </p>
      </div>
      {/* content */}
      <div className="p-6 grid grid-cols-1 items-start xs:grid-cols-2 xs:justify-center gap-6">
        <div
          className={twMerge(
            'flex flex-row w-full xs:w-auto xs:flex-col items-center rounded shadow p-3 space-x-2 xs:space-y-4 xs:scale-75 xs:hover:scale-100 cursor-pointer transition-transform outline-dashed outline-0 outline-primary',
            payment === 'express' ? 'xs:scale-100 outline-2' : ''
          )}
          onClick={() => {
            setPaymentForm('express');
          }}
        >
          <Image
            width={180}
            height={180}
            alt="multicaixa express"
            src={'/images/payment-method/express.png'}
            className="w-12 xs:w-[120px] h-auto"
            priority
          />
          <p className="font-bold text-center text-slate-600">
            Multicaixa Express
          </p>
        </div>
        <div
          className={twMerge(
            'flex flex-row w-full xs:w-auto xs:flex-col items-center rounded shadow p-3 space-x-2 xs:space-y-4 xs:scale-75 xs:hover:scale-100 cursor-pointer transition-transform outline-dashed outline-0 outline-primary',
            payment === 'qrcode' ? 'xs:scale-100 outline-2' : ''
          )}
          onClick={() => {
            setPaymentForm('qrcode');
          }}
        >
          <Image
            width={180}
            height={180}
            alt="pagamento por qr code com multicaixa express"
            src={'/images/payment-method/emis-qr-code.png'}
            className="w-12 xs:w-[120px] h-auto bg-blend-multiply"
            priority
          />
          <p className="font-bold text-center text-slate-600">QR Code</p>
        </div>
      </div>
      {/* footer */}
      <div className="border-t dark:border-t-gray-800 p-6">
        <Button
          label=""
          onClick={setSelectedOption}
          className="w-full transition-colors"
        >
          Selecionar
        </Button>
      </div>
    </div>
  );
}

export default PaymentOption;
