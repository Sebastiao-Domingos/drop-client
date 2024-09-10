"use client";

import React, { ComponentProps, useEffect, useRef, useState } from "react";
import "@egjs/flicking/dist/flicking.css";

// Load worker code separately with worker-loader

export default function Page() {
  return (
    <InputOTP maxLength={6} className="border focus:border-primary bg-primary">
      <InputOTPGroup className="p-0 m-0">
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
      </InputOTPGroup>
      <InputOTPSeparator className="p-0 m-0" />
      <InputOTPGroup className="p-0 m-0">
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup className="p-0 m-0">
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}

function MyInputs() {
  return (
    <div className="flex gap-3 m-auto">
      <input
        className="p-2 border font-bold rounded outline-none focus:border-primary/60 w-8 text-center"
        type="text"
        placeholder="0"
      />
      <input
        className="p-2 border font-bold rounded outline-none focus:border-primary/60 w-8 text-center"
        type="text"
        placeholder="0"
      />
      <input
        className="p-2 border font-bold rounded outline-none focus:border-primary/60 w-8 text-center"
        type="text"
        placeholder="0"
      />
      <input
        className="p-2 border font-bold rounded outline-none focus:border-primary/60 w-8 text-center"
        type="text"
        placeholder="0"
      />
      <input
        className="p-2 border font-bold rounded outline-none focus:border-primary/60 w-8 text-center"
        type="text"
        placeholder="0"
      />
      <input
        className="p-2 border font-bold rounded outline-none focus:border-primary/60 w-8 text-center"
        type="text"
        placeholder="0"
      />
    </div>
  );
}

import "@egjs/flicking/dist/flicking.css";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const updateTransform = (e: any) => {
  e.currentTarget.panels.forEach((panel: any) => {
    const rotateVal = -panel.progress * 20;
    const sinRot = Math.sin(Math.abs((rotateVal * Math.PI) / 180));
    const depth = 150 * sinRot * sinRot;
    panel.element.style.transform = `translateZ(-${depth}px) rotateX(${rotateVal}deg)`;
  });
};

// export default function Page() {

//   return (
//     <>
//       <div>
//         <button
//           onClick={() => sendGTMEvent({ event: "buttonClicked", value: "xyz" })}
//         >
//           Send Event
//         </button>
//         <form action="#" method="get">
//           <Select
//             options={options}
//             defaultValue={{ value: "", label: "Seleciona" }}
//             name="teste"
//           ></Select>
//           <button>enviar</button>
//         </form>
//       </div>
//     </>
//   );
// }
