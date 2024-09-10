"use client";
import CountDownComponent from "@/components/countDown";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

function WaitForPayment() {
  const [nota, setNota] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="min-h-screen w-full flex justify-center items-center dark:bg-slate-900">
      <div className="max-w-[480px] p-4 rounded shadow bg-white dark:bg-slate-950 space-y-8">
        <CountDownComponent setStatus={setNota} />
      </div>
    </div>
  );
}

export default WaitForPayment;
