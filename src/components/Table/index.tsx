import { twMerge } from 'tailwind-merge';
import { HTMLAttributes } from 'react';

interface TableProps extends HTMLAttributes<HTMLTableElement> {}

function THead({ children, className }: TableProps) {
  return (
    <thead
      className={twMerge(
        'w-full h-[4.5rem] border-spacing-0 bg-primary/30 dark:bg-primary/70',
        className
      )}
    >
      <tr className="uppercase">{children}</tr>
    </thead>
  );
}

export { THead };

function TBody({ children, className }: TableProps) {
  return <tbody className={twMerge('', className)}>{children}</tbody>;
}

export { TBody };

function Tr({ children, className }: TableProps) {
  return (
    <tr
      className={twMerge(
        'even:bg-primary/5 dark:even:bg-gray-950/50 hover:bg-slate-100/40 dark:hover:bg-gray-950/30',
        className
      )}
    >
      {children}
    </tr>
  );
}

export { Tr };

function Table({ children, className, ...others }: TableProps) {
  return (
    <table className={twMerge('w-full mt-4 text-sm', className)} {...others}>
      {children}
    </table>
  );
}

export default Table;
