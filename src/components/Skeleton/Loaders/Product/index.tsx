import { numberToMoney } from "@/helpers/functions/numberToMoney";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ProductProps extends HTMLAttributes<HTMLDivElement> {}

function ProductLoader({ className = "", ...others }: ProductProps) {
  return (
    <div
      className={twMerge(
        "w-full /md:group-[.col]:min-w-[240px] /group-[.col]:max-w-[256px] /group-[.row]:min-w-[256px] bg-white dark:bg-gray-800 rounded-lg overflow-hidden border transition-all hover:border-primary shadow-lg snap-center",
        className
      )}
      {...others}
    >
      <div className="p-2 md:p-4 relative">
        {/* imagem */}
        <div className="relative w-full h-[180px] xs:h-[180px] sm:h-[200px] md:h-[250px] overflow-hidden animate-pulse rounded-lg">
          <div className="absolute w-full h-full bg-slate-600"></div>
        </div>
        <div className="flex justify-between items-center my-2 space-x-1">
          <span className="w-5 h-5 p-1 rounded-full flex justify-center items-center bg-slate-600 animate-pulse"></span>
          <span className="p-1 rounded bg-slate-600 animate-pulse">
            <div className="min-w-[80px] h-[10px]"></div>
          </span>
        </div>
      </div>

      <div className="px-2 md:px-4">
        <div>
          <div className="h-8 md:h-12 animate-pulse">
            <div className="w-full h-1/2 rounded mb-1 bg-slate-600"></div>
            <div className="w-2/3 h-1/2 rounded bg-slate-600"></div>
          </div>

          <div className="h-[10px] w-1/3 rounded bg-slate-600 animate-pulse mt-2"></div>
        </div>

        <div className="flex flex-row justify-between md:items-center gap-1 md:gap-2 my-3">
          {/* prices */}
          <div className="w-3/4">
            <div className="h-7 w-full rounded bg-slate-600 animate-pulse"></div>
            <div className="h-3 w-full rounded bg-slate-600 animate-pulse mt-2"></div>
          </div>

          {/* shop and stack buttons */}
          <div className="text-primary space-x-2">
            <div className="h-6 w-6 rounded bg-slate-600"></div>
          </div>
        </div>

        {/* condição do produto */}
        <div className="space-x-2 flex flex-row mb-2">
          <span className="animate-pulse">
            <div className="h-[9px] w-16 rounded bg-slate-600"></div>
          </span>
          <span className="animate-pulse">
            <div className="h-[9px] w-16 rounded bg-slate-600"></div>
          </span>
          <span className="animate-pulse">
            <div className="h-[9px] w-16 rounded bg-slate-600"></div>
          </span>
        </div>
      </div>

      <div className="animate-pulse">
        <div className="h-6 w-full bg-slate-600"></div>
      </div>
    </div>
  );
}
export default ProductLoader;
