"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SelectWithInputTextContext } from "./SelectWithInputTextContext";
import { isEmptyString } from "@/helpers/functions/isEmptyString";
import Option from "./Option";
import { twMerge } from "tailwind-merge";

interface SelectWithInputTextProps {
  children?: React.ReactNode;
  placeholderText?: string;
  onValueChange?: (value?: string) => void;
}

function SelectWithInputText({
  children,
  onValueChange,
  placeholderText,
}: SelectWithInputTextProps) {
  const [value, setValue] = useState("");
  const [input, setInputText] = useState("");

  const ulRef = useRef<HTMLUListElement>(null);

  const [visibleList, setListVisiblity] = useState(false);

  useEffect(() => {
    onValueChange && onValueChange(isEmptyString(value) ? undefined : value);
  }, [value, onValueChange]);

  useEffect(() => {
    if (visibleList) {
      const bounding = ulRef.current?.getBoundingClientRect()!;

      const topTop =
        window.screen.height - (bounding.y + bounding.height) < 220;

      ulRef.current!.style.transform = topTop ? "translateY(-100%)" : "";
      ulRef.current!.style.top = topTop ? "0" : "";
    }
  }, [visibleList]);

  return (
    <SelectWithInputTextContext.Provider
      value={{
        contains: input,
        value,
        setValue,
        setInput: setInputText,
        visibleList,
        setVisibleList: setListVisiblity,
      }}
    >
      <div className={twMerge("relative w-full", visibleList ? "z-50" : "")}>
        <div className="flex flex-row overflow-hidden rounded border dark:border-gray-800">
          <input
            type="text"
            className="w-full p-3"
            placeholder={placeholderText}
            onChange={(evt) => {
              if (ulRef.current) {
                const bounding = ulRef.current?.getBoundingClientRect()!;
                const topTop =
                  window.screen.height - (bounding.y + bounding.height) < 220;
                ulRef.current!.style.transform = topTop
                  ? "translateY(-100%)"
                  : "";
                ulRef.current!.style.top = topTop ? "0" : "";
              }

              setInputText(evt.target.value);
              setListVisiblity(true);
              setValue("");
            }}
            // onFocus={(evt) => {
            //   if (isEmptyString(evt.target.value)) {
            //     setListVisiblity(false);
            //   } else {
            //     setListVisiblity(true);
            //   }
            // }}
            // onBlur={() => {
            //   setListVisiblity(false);
            // }}
            value={input}
          />
          <button
            type="button"
            className="py-3 px-5 bg-white dark:bg-gray-950 flex justify-center items-center"
            onClick={() => setListVisiblity(!visibleList)}
          >
            <i
              className={twMerge(
                "ri-arrow-drop-down-line",
                visibleList ? "rotate-180" : ""
              )}
            ></i>
          </button>
          {/* <input type="hidden" name=""  /> */}
        </div>

        {visibleList && (
          <ul
            ref={ulRef}
            className={twMerge(
              "absolute overflow-auto max-h-[180px] w-full bg-white dark:bg-gray-950 shadow rounded-b py-2"
              // listToTop.current ? "-translate-y-full top-0 shadow" : ""
              // bottom-0 translate-y-full
            )}
          >
            {children}
          </ul>
        )}
      </div>

      {
        visibleList && (
          // createPortal(
          <div
            className="fixed inset-0 bg-transparent z-40 pointer-events-auto"
            onClick={() => {
              setListVisiblity(false);
            }}
          ></div>
        )
        // ,
        //   document.body
        // )
      }
    </SelectWithInputTextContext.Provider>
  );
}

export default SelectWithInputText;
export { Option };
