import React, { useContext } from "react";
import { SelectWithInputTextContext } from "./SelectWithInputTextContext";

interface OptionProps {
  value: string;
  displayText: string;
  children: React.ReactNode;
}

function Option({ value, children, displayText }: OptionProps) {
  const { setValue, setVisibleList, setInput, contains } = useContext(
    SelectWithInputTextContext
  );

  if (!Array.isArray(children) && React.Children.count(children) > 1) {
    throw new Error("Option deve ter somente um valor");
  }

  return (
    <>
      {displayText.toLowerCase().includes(contains.toLowerCase()) && (
        <li
          className="p-4 hover:bg-primary/10 text-sm md:text-md rounded cursor-pointer"
          onClick={() => {
            setValue(value);
            setInput(displayText);
            setVisibleList(false);
          }}
        >
          {children}
        </li>
      )}
    </>
  );
}

export default Option;
