import { numberToMoney } from "@/helpers/functions/numberToMoney";
import { useCountdown } from "@/hooks/useCountdown";
import { Promocao } from "@/services/promocao";
import Image from "next/image";

interface PromoflashProps {
  promocao: Promocao;
}

function Promoflash({ promocao }: PromoflashProps) {
  const { countdown } = useCountdown(new Date(promocao.data_fim).getTime());

  return (
    <div className="relative bg-white dark:bg-slate-400 flex flex-col md:flex-row items-center h-auto lg:h-[338px] border rounded-3xl overflow-hidden shadow-lg my-12">
      <div className="md:w-1/4 p-6 sm:p-0 md:p-3 lg:p-6">
        <Image
          src={"/images/mini-logo.svg"}
          alt="dunorte"
          height={200}
          width={200}
          priority
          className="max-w-[180px] mx-auto h-auto"
        />
      </div>
      <div className="w-full flex text-center md:text-left md:justify-between flex-col lg:flex-row md:ml-auto py-6 sm:py-0 md:w-3/4 h-full md:rounded-s-[50px] bg-[#e8474c]">
        <div className="flex flex-col h-full justify-between bottom-3 gap-3 sm:gap-0 py-3 sm:py-6 text-white px-2 sm:px-8">
          <p className="text-4xl font-bold uppercase">
            {/* PROMOFLASH */}
            {promocao.nome}
          </p>
          {!countdown.isOver && (
            <div>
              <p className="font-bold">TERMINA EM:</p>
              <div className="flex text-center justify-center">
                <div>
                  <span
                    suppressHydrationWarning
                    className="text-4xl sm:text-6xl xl:text-8xl font-bold"
                  >
                    {countdown.days}
                  </span>
                  <p className="text-[10px] sm:text-sm">DIAS</p>
                </div>
                <span className="self-center text-xl md:text-3xl font-bold px-2 md:px-4">
                  :
                </span>
                <div>
                  <span
                    suppressHydrationWarning
                    className="text-4xl sm:text-6xl xl:text-8xl font-bold"
                  >
                    {countdown.hours}
                  </span>
                  <p className="text-[10px] sm:text-sm">HORAS</p>
                </div>
                <span className="self-center text-xl md:text-3xl font-bold px-2 md:px-4">
                  :
                </span>
                <div>
                  <span
                    suppressHydrationWarning
                    className="text-4xl sm:text-6xl xl:text-8xl font-bold"
                  >
                    {countdown.minutes}
                  </span>
                  <p className="text-[10px] sm:text-sm">MINUTOS</p>
                </div>
                <span className="self-center text-xl md:text-3xl font-bold px-2 md:px-4">
                  :
                </span>
                <div>
                  <span
                    suppressHydrationWarning
                    className="text-4xl sm:text-6xl xl:text-8xl font-bold"
                  >
                    {countdown.seconds}
                  </span>
                  <p className="text-[10px] sm:text-sm">SEGUNDOS</p>
                </div>
              </div>
            </div>
          )}
          {countdown.isOver && (
            <p className="text-center text-4xl font-bold uppercase">
              Promoção expirada
            </p>
          )}
          <p className="text-[10px] md:text-sm">
            * Limitado ao stock existente ou em campanha, podendo este terminar
            antes do período indicado.
          </p>
        </div>
        {/* <div>
        </div> */}
        <div className="lg:self-center p-2 text-white font-bold sm:px-6 lg:pl-0 lg:pr-8 md:py-6 md:pr-8 space-y-2">
          <p className="text-2xl md:text-4xl line-clamp-2 uppercase">
            {/* Nome do produto */}
            Desconto
          </p>
          <p className="text-2xl md:text-4xl lg:text-6xl font-bold lg:text-right">
            {!promocao.percentagem && numberToMoney(promocao.desconto)}
            {promocao.percentagem &&
              promocao.desconto.toString().padStart(2, "0") + "%"}
            {/* 1.200,<span className="text-xl md:text-3xl">00kz</span> */}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Promoflash;
