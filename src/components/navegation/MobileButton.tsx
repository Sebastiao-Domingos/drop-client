import React, { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

interface MobileButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: string;
  // as?: "button" | typeof Link;
  href?: string;
  isChecked?: boolean;
}

const MobileButton = React.forwardRef<HTMLButtonElement, MobileButtonProps>(
  function MobileButton(
    {
      title,
      icon,
      href = '#',
      // as = "button",
      className,
      isChecked,
      ...others
    },
    ref
  ) {
    // const Component = as;
    return (
      <button
        ref={ref}
        className={twJoin(
          `outline-none text-white border-t-2 ${
            isChecked ? 'border-t-slate-400/70' : 'border-t-transparent'
          }`,
          className
        )}
        {...others}
      >
        <i className={`text-lg ${icon}`}></i>
        <p className="text-xs">{title}</p>
      </button>
    );
  }
);

export default MobileButton;
