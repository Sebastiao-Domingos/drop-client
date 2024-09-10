import { createContext, useState } from "react";

export const SelectWithInputTextContext = createContext({
  visibleList: false,
  setVisibleList: (visiblityState: boolean) => {},
  value: "",
  contains: "",
  setValue: (value: string) => {},
  setInput: (value: string) => {},
});

interface SelectWithInputTextProvider {
  children: React.ReactNode;
}

function SelectWithInputTextProvider({
  children,
}: SelectWithInputTextProvider) {
  return (
    <></>
    // <SelectWithInputTextContext.Provider
    //   value={{
    //     value,
    //     setValue,
    //     visibleList,
    //     setVisibleList: (value) => {
    //       console.log("olas");

    //       setListVisiblity(value);
    //     },
    //   }}
    // >
    //   {children}
    // </SelectWithInputTextContext.Provider>
  );
}

export { SelectWithInputTextProvider };
