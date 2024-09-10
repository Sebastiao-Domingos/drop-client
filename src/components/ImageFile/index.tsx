import { logger } from "@/Logger";
import { useState, createRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface ImageFileWithPreview {
  onSelectedImage: (filelist: FileList) => void;
  className?: string;
  children?: React.ReactNode;
}

function ImageFile({
  children,
  onSelectedImage,
  className = "",
}: ImageFileWithPreview) {
  const [imageSelected, setImageSelected] = useState<FileList>();
  const inputFile = createRef<HTMLInputElement>();

  useEffect(() => {
    logger.info("IMAGEM FILE");
    logger.info(imageSelected);
    if (imageSelected && imageSelected.item(0)) {
      onSelectedImage(imageSelected!);
      setImageSelected(undefined);
    }
  }, [imageSelected, onSelectedImage]);
  return (
    <div
      className={twMerge(
        "block bg-gray-400/30 hover:bg-gray-400/60 border-gray-600 cursor-pointer transition-colors rounded",
        className
      )}
    >
      <label
        className="flex p-3 items-center gap-2 cursor-pointer"
        htmlFor="image"
        onClick={(evt) => {
          evt.preventDefault();
          inputFile.current?.click();
        }}
      >
        <i className="ri-image-add-line"></i>
        {children === undefined ? (
          <span className="line-clamp-1 cursor-pointer">Selecionar imagem</span>
        ) : (
          children
        )}
      </label>
      <input
        onChange={(evt) => {
          setImageSelected(evt.target.files!);
        }}
        className="hidden"
        ref={inputFile}
        type="file"
        name="imagem_adicional"
        id="image"
        accept="image/jpeg, image/svg, image/png, image/webp"
      />
    </div>
  );
}

export default ImageFile;
