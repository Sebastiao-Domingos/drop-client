import React from "react";
import { PhoneInput, PhoneInputProps } from "react-international-phone";
import "react-international-phone/style.css";
import { twMerge } from "tailwind-merge";

const InputPhoneNumber = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (props, ref) => (
    <PhoneInput
      {...{
        ...props,
        inputClassName: twMerge(
          "bg-slate-900 w-full dark:!border dark:!bg-gray-700 dark:!text-slate-400 !text-sm sm:!text-base !h-auto !border focus:!border-primary/50",
          props.inputClassName
        ),
        countrySelectorStyleProps: {
          buttonClassName:
            "dark:!bg-gray-700 !p-2 !h-auto !border !border-slate-300 !border focus:!border-primary/50",
          flagClassName: "!w-[18px] sm:!w-6",
        },
        className: "!h-auto !border-gray-300",
      }}
      inputRef={ref as any}
    />
  )
);

InputPhoneNumber.displayName = "InputNumberWithCountry";
// function InputPhoneNumber(props: PhoneInputProps) {
//   return <PhoneInput {...props} />;
// }

export default InputPhoneNumber;
