import Image from "next/image";
import React, { HTMLAttributes, ImgHTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";

interface ImageWithFallback {
  children?: React.ReactNode;
  width: number;
  height: number;
  src: string;
  alt: string;
  priority?: true;
  loading?: "eager" | "lazy";
  className?: string;
  onClick?: () => void;
}

function ImageWithFallback({
  children,
  loading,
  priority,
  src,
  alt,
  width,
  height,
  className = "",
  onClick,
}: ImageWithFallback) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      {!imageLoaded &&
        (children ? (
          children
        ) : (
          <Image
            width={width}
            height={height}
            src={"/images/mini-logo.svg"}
            alt={alt}
            className={twMerge("w-full h-full", className)}
          />
        ))}
      <Image
        onLoad={() => {
          setImageLoaded(true);
        }}
        width={width}
        height={height}
        src={src}
        alt={alt}
        className={twMerge(
          "w-full h-full",
          className,
          imageLoaded ? "" : "hidden"
        )}
        loading={loading}
        priority={priority}
        onClick={onClick}
      />
    </>
  );
}

export default ImageWithFallback;
