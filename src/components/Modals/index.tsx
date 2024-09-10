"use client";

import {
  HTMLAttributes,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  onOpenChange?: (state: boolean) => void;
  open?: boolean;
}

const ModalVisibleStateContext = createContext({
  visible: false,
});

function Modal({ onOpenChange, children, open }: ModalProps) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ModalVisibleStateContext.Provider value={{ visible: modalVisible }}>
      <Dialog.Root
        onOpenChange={(e) => {
          setModalVisible(e);
          onOpenChange && onOpenChange(e);
        }}
        open={open}
      >
        {children}
      </Dialog.Root>
    </ModalVisibleStateContext.Provider>
  );
}

function ModalAnimatedContent({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const modalVisiblestate = useContext(ModalVisibleStateContext);
  return (
    <AnimatePresence>
      {modalVisiblestate.visible && (
        <Dialog.Portal forceMount>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed z-50" asChild>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          </Dialog.Overlay>
          <Dialog.Content
            className={twMerge(
              "bg-white dark:bg-gray-900 fixed top-12 w-[90vw] lg:w-1/2 left-1/2 -translate-x-1/2 rounded shadow-md max-h-[80vh] z-50",
              className
            )}
            asChild
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
              }}
            >
              {children}
            </motion.div>
          </Dialog.Content>
        </Dialog.Portal>
      )}
    </AnimatePresence>
  );
}

export { ModalAnimatedContent };
export default Modal;
