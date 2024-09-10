"use client";

import * as Dialog from "@radix-ui/react-dialog";
import React, { Dispatch, SetStateAction, useState } from "react";
import Modal, { ModalAnimatedContent } from "../Modals";
import { QrScanner } from "@yudiel/react-qr-scanner";

interface SearchModalProps {
  onSuccess : ( valor : string) => void
  openModal : boolean,
  setOpenModal : (openState : boolean) => void
}

function ModalQrCode({ onSuccess, openModal, setOpenModal}: SearchModalProps) { 
  // const [opened , setOpened] = useState(openModal)
  return (<>
      {  openModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center" >
          <div className="p-4 w-full bg-transparent">
              <button className="absolute ml-auto top-8 right-4 text-2xl flex items-center justify-center text-white"
                onClick={ () => 
                  setOpenModal( false )}
              >
                <i className="ri-close-line"></i>
              </button>
              <div className="flex">
                  <QrScanner
                      tracker={false}
                      onDecode={(result) => {
                          onSuccess(result)
                          setOpenModal( false )
                      }}
                      onError={(error) => console.log(error?.message)}
                      videoStyle={
                          { width : "100%", background : "rgba(12,12,12,.1)" , height :"100%"}
                      }
                  />
              </div>
          </div>
        </div>
      )}
  </>
  );
}

export default ModalQrCode;

function ModalAntigoQr({ onSuccess, openModal, setOpenModal}: SearchModalProps){

  return <Modal open = {openModal} >
      <Dialog.Trigger>
        Ler
      </Dialog.Trigger>
      <ModalAnimatedContent className="p-4 w-full bg-transparent">
          <Dialog.Close className="absolute ml-auto top-4 right-4 text-2xl flex items-center justify-center text-white"
            onClick={ () => 
              setOpenModal( false )}
          >
            <i className="ri-close-line"></i>
          </Dialog.Close>
          <Dialog.Content className="">
            <div className="flex">
                <QrScanner
                    tracker={false}
                    onDecode={(result) => {
                        onSuccess(result)
                        setOpenModal( false )
                    }}
                    onError={(error) => console.log(error?.message)}
                    videoStyle={
                        { width : "100%", background : "rgba(0,0,0,.1)" , height :"100%"}
                    }
                />
            </div>
          </Dialog.Content>
      </ModalAnimatedContent>
    </Modal>
}
