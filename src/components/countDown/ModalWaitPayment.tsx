"use client";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import React from "react";
import CountDownComponent from ".";
interface loginProps {
  isOpened?: boolean;
  closeModal: () => void;
}

export default function ModalWaitPayment({ isOpened, closeModal }: loginProps) {
  if (!isOpened) {
    return;
  }

  return (
    <div className={`absolute inset-0 bg-black/70 z-50 backdrop-blur-sm `}>
      <div className="w-full sm:max-w-[420px] bg-slate-200 dark:bg-gray-950 rounded-lg overflow-hidden shadow-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="p-3 flex items-center border-b border-b-slate-300 dark:border-b-gray-800">
          <div className="w-full h-full flex justify-center items-center">
            {/* <CountDownComponent setStatus={setIsOpened} /> */}
            <div className="max-w-[600px] flex flex-col justify-center items-center gap-4 shadow rounded p-8">
              <h1 className="text-center md:text-2xl font-bold text-primary">
                Abra o teu Express para efectuar o pagamento
              </h1>
              <div className="timer-wrapper">
                <CountdownCircleTimer
                  isPlaying
                  duration={90}
                  colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                  colorsTime={[80, 60, 30, 0]}
                  onComplete={closeModal}
                  strokeWidth={16}
                >
                  {renderTime}
                </CountdownCircleTimer>
              </div>
              <p className="text-center">
                O pagamento deve ser efectuado dentro de 90 segundos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const renderTime = ({ remainingTime }: { remainingTime: number }) => {
  if (remainingTime === 0) {
    return <div className="text-red-500">Terminou!...</div>;
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="">Faltam</div>
      <div className="text-2xl font-bold">{remainingTime}</div>
      <div className="">segundos</div>
    </div>
  );
};
