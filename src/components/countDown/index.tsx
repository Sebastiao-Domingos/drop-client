import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

type CountDownComponent = {
  setStatus: (value: boolean) => void;
};
export default function CountDownComponent({ setStatus }: CountDownComponent) {
  return (
    <div>
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
            onComplete={() => setStatus(false)}
            strokeWidth={16}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
        <p className="text-center">
          Deves efectuar o pagamento dentro de 90 segundos, caso contrário não
          será possível
        </p>
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
