"use client";

interface QrCodeExternalWebProps {
  closeModal: () => void;
  id: string;
  emis_base_url: string;
}

function QrCodeExternalWeb({
  closeModal,
  emis_base_url,
  id,
}: QrCodeExternalWebProps) {
  return (
    <div className={`absolute inset-0 bg-black/70 z-50 backdrop-blur-sm`}>
      <div className="w-full lg:w-[80vw] mx-auto h-[80vh] bg-slate-200 dark:bg-gray-950 rounded-lg overflow-hidden shadow-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-full lg:w-[80vw] h-[80vh]">
          <button
            onClick={closeModal}
            className="p-3 text-white bg-black/10 w-12 h-12 rounded-full absolute top-4 right-4"
          >
            <i className="ri-close-line"></i>
          </button>
          <iframe
            src={`${emis_base_url}/online-payment-gateway/portal/frame?token=${id}`}
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default QrCodeExternalWeb;
