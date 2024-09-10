
"use client";
import Modal from "@/components/Modals";
import * as Dialog from "@radix-ui/react-dialog";
import { ModalAnimatedContent } from "@/components/Modals";
import { HTMLAttributes } from "react";


interface EditBrandsProps extends HTMLAttributes<HTMLDivElement> {}

function TermsServices({ children }: EditBrandsProps) {
 

  return (
    <Modal>
      <Dialog.Trigger className="text-primary border-b border-transparent pb-[2px] hover:border-primary">Ver termos e serviços</Dialog.Trigger>
      <ModalAnimatedContent className="top-1/2 -translate-y-1/2 max-h-[90vh]">
        <div className="flex justify-between items-center shadow px-4 py-5">
          <h1 className="font-bold text-2xl">Termos e Serviços</h1>
          <Dialog.Close>
            <i className="ri-close-line text-xl"></i>
          </Dialog.Close>
        </div>
        
      </ModalAnimatedContent>
    </Modal>
  );
}

export default TermsServices;
