import React, { SelectHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

// function Select({ className = "", children, ...others }: SelectProps) {
//   return (
//     <select
//       className={twMerge(
//         "p-2 rounded text-primary shadow cursor-pointer outline-none",
//         className
//       )}
//       {...others}
//     >
//       {children}
//     </select>
//   );
// }

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", children, ...others }, ref) => {
    return (
      <select
        ref={ref}
        className={twMerge(
          "p-2 rounded text-primary shadow cursor-pointer outline-none border focus:border-primary/30 dark:focus:border-primary",
          className
        )}
        {...others}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = "MySelect";

export default Select;
