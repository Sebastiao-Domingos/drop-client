"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RedirectType, redirect, useRouter } from "next/navigation";

export default function BtnTopDown() {
  const [topDownVisible, setTopDownVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const content = document.getElementById("content");
    function changeTopDownState() {
      const offsetTop = content!.scrollTop; //window.scrollY;

      const screenSizeHeight = window.screen.height;

      if (offsetTop > screenSizeHeight / 4) {
        setTopDownVisible(true);
      } else {
        setTopDownVisible(false);
      }
    }

    content!.addEventListener("scroll", changeTopDownState);

    return () => {
      content!.removeEventListener("scroll", changeTopDownState);
    };
  }, [topDownVisible]);
  return (
    <>
      <AnimatePresence>
        {topDownVisible && (
          <motion.a
            onClick={() => {
              setTimeout(() => {
                router.back();
              }, 1500);
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            exit={{ opacity: 0 }}
            href="#top"
            className={`fixed bottom-[116px] right-4 md:bottom-10 animate-bounce w-[3rem] h-[3rem] shadow bg-primary rounded-full flex justify-center items-center p-2 z-50`}
          >
            <i className="ri-arrow-drop-up-line text-2xl text-white"></i>
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
