"use client";
import * as React from "react";
import * as Toast from "@radix-ui/react-toast";
import { useEffect, useRef, useState } from "react";

interface ToastProps {
  message: string;
  duration?: number;
  onClose?: () => void;
}
import * as ToastRadix from "@radix-ui/react-toast";

interface ToastProps {
  message: string;
  duration?: number;
  onClose?: () => void;
}
function ModalAviso({ message, duration, onClose }: ToastProps) {
  return (
    <ToastRadix.Provider duration={duration} swipeDirection="down">
      <ToastRadix.Root
        className="bg-slate-200 dark:bg-gray-900 border border-red-500 rounded-md shadow p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[swipe=move]:tranwhitevar(--radix-toast-swipe-move-x)] data-[swipe=cancel]:tranwhite data-[swipe=cancel]:transition-[transform_200ms_ease-out]"
        open={true}
        onOpenChange={onClose}
      >
        <ToastRadix.Title className="flex items-center [grid-area:_title] mb-[5px] font-medium text-[15px]">
          <i className="ri-error-warning-line text-red-500 md:text-2xl mr-2"></i>
          {message}
        </ToastRadix.Title>
        <ToastRadix.Action
          className="[grid-area:_action]"
          asChild
          altText="Goto schedule to undo"
        >
          <button className="inline-flex items-center justify-center rounded font-medium text-xs  px-[10px] leading-[25px] h-[25px] shadow-[inset_0_0_0_1px] hover:shadow-[inset_0_0_0_1px] focus:shadow-[0_0_0_2px]">
            <i className="ri-close-fill"></i>
          </button>
        </ToastRadix.Action>
      </ToastRadix.Root>
      <ToastRadix.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </ToastRadix.Provider>
  );
}

export default ModalAviso;
