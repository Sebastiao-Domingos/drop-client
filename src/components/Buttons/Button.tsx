import React, { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { LoadingIcon } from '../Alert';

interface ButtonProps extends ComponentProps<'button'> {
  label: string;
  secondary?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, isLoading, children, className, secondary, ...others }, ref) => {
    return (
      <button
        disabled={isLoading}
        ref={ref}
        {...others}
        className={twMerge(
          `flex items-center justify-center min-w-[100px] gap-2 p-2 bg-primary/50 hover:bg-primary/60 active:bg-primary/70 rounded shadow border ${
            secondary &&
            'bg-transparent border-[1px] border-primary text-primary hover:bg-primary/5 active:bg-primary/10'
          }`,
          className
        )}
      >
        {!isLoading && children}
        {!isLoading && label}
        {isLoading && <LoadingIcon />}
      </button>
    );
  }
);

Button.displayName = 'ButtonRef';

export { Button };
