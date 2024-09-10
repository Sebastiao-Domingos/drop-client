"use client";
import { useState } from "react";
import ItemProd from "./ItemProd";
import { twMerge } from "tailwind-merge";
import Destaque from "./Destaque";

const products = [
  { name: "Mala 1", url: "/images/VIPU16BC.png-300x300.png" },
  { name: "Mala 2", url: "/images/ASUSA.png-300x300.png" },
  { name: "Mala 3", url: "/images/VICO230V.png-300x300.png" },
  { name: "Mala 4", url: "/images/asdual.png-300x300.png" },
  { name: "Mala 5", url: "/images/VICO230V.png-300x300.png" },
  { name: "Mala 6", url: "/images/ASUSA.png-300x300.png" },
  { name: "Mala 7", url: "/images/VIPU16BC.png-300x300.png" },
  { name: "Mala 8", url: "/images/VICO230V.png-300x300.png" },
  { name: "Mala 9", url: "/images/asdual.png-300x300.png" },
  { name: "Mala 10", url: "/images/VIPU16BC.png-300x300.png" },
  { name: "Mala 12", url: "/images/ASUSA.png-300x300.png" },
  { name: "Mala 13", url: "/images/VICO230V.png-300x300.png" },
  { name: "Mala 14", url: "/images/asdual.png-300x300.png" },
  { name: "Mala 15", url: "/images/VICO230V.png-300x300.png" },
  { name: "Mala 16", url: "/images/ASUSA.png-300x300.png" },
  { name: "Mala 17", url: "/images/VIPU16BC.png-300x300.png" },
  { name: "Mala 18", url: "/images/VICO230V.png-300x300.png" },
  { name: "Mala 19", url: "/images/asdual.png-300x300.png" },
];

export default function ShowProducts() {
  const [isShowed, setIsShowed] = useState(false);
  return (
    <div
      // fixed top:0  left-0 bottom-0 right-0   md:left-120px bg-gray-100 pb-8 w-full
      className={twMerge(
        `${
          isShowed && "animate-go"
        } fixed top-0 bottom-0 left-0 right-0 md:left-[220px]  `
      )}
    >
      <div className="w-full p-2 h-full overflow-y-auto">
        <div className="flex items-center justify-between border-b mb-2">
          <div className="flex items-center py-4">
            <button
              onClick={() => setIsShowed(!isShowed)}
              className="hidden md:block bg-primary rounded-r-full p-1 w-[3rem] text-white text-2xl "
            >
              <i className="ri-arrow-left-s-line"></i>
            </button>
            <h2 className="text-2xl ml-4">Nome</h2>
          </div>
          <div className="hidden md:block border-l md:w-[26%] lg:w-[18%] /w-[18%]">
            <h2 className="text-xl ml-4 ">Em destaque</h2>
          </div>
        </div>
        <div className="flex">
          <div className="w-full">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-6 w-full">
              {products.map((item) => (
                <ItemProd key={item.name} {...item} className="w-[100px]" />
              ))}
            </div>
          </div>
          <Destaque />
        </div>
      </div>
    </div>
  );
}
