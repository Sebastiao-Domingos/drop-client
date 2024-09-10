"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface BtnNotficationProps extends ComponentProps<"button"> {
  url: string;
  quantidate: number;
  isSuccess: boolean;
}

export function NotificationButton({
  url,
  isSuccess,
  quantidate,
  ...others
}: BtnNotficationProps) {
  const navigator = useRouter();
  const path = usePathname();
  return (
    <button
      className={twMerge(
        `p-2 rounded hover:text-primary ${path === url && "bg-primary/20"}`,
        others.className
      )}
      onClick={() => navigator.push(url)}
      {...others}
    >
      {/* <i className="ri-notification-2-line  md:text-3xl font-bold"></i> */}
      <span className="material-symbols-outlined text-2xl">notifications</span>
      {/* !result.isSuccess && data?.totalNaoVisto !== 0 && */}
      {isSuccess && quantidate !== 0 && (
        <span className="w-4 h-4 absolute -top-2 right-4 translate-y-1/2 translate-x-2/3 bg-red-500 rounded-full text-[10px] text-white flex  justify-center items-center">
          {quantidate! < 100 && quantidate.toString().padStart(2, "0")}
          {quantidate! >= 100 && "99+"}
        </span>
      )}
    </button>
  );
}
