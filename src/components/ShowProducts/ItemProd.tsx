import Image from "next/image";
import { twMerge } from "tailwind-merge";
interface ItemProds {
  name: string;
  url: string;
  className?: string;
}
export default function ItemProd({ className = "", name, url }: ItemProds) {
  return (
    <div className={twMerge("flex flex-col w-[8rem] items-center", className)}>
      <div className="w-[7rem] h-[7rem] flex rounded-full shadow">
        <Image
          src={url}
          width="50"
          height="50"
          alt="imagem do produto"
          priority={true}
          className=" m-auto md:w-[60px] md:h-[60px]"
        />
      </div>
      <p className="mt-2 text-sm">{name}</p>
    </div>
  );
}
