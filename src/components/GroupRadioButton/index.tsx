import React from 'react';
import { twMerge } from 'tailwind-merge';

interface GroupRadioButtonProps {
  children: React.ReactNode;
}

function GroupRadioButton({ children }: GroupRadioButtonProps) {
  return (
    <div className="flex">
      <div className="rounded overflow-hidden shadow ">{children}</div>
    </div>
  );
}

GroupRadioButton.displayName = 'GroupButton';

interface RadionButtonProps extends React.ComponentPropsWithRef<'input'> {
  label: string;
  classcontainer?: string;
}

const RadionButton = React.forwardRef<HTMLInputElement, RadionButtonProps>(
  (props, ref) => {
    return (
      <label className="border-r last:border-0">
        <input ref={ref} type="radio" className="hidden peer" {...props} />
        <span
          className={twMerge(
            'cursor-pointer text-sm inline-block p-3 peer-checked:bg-primary bg-gray-400 hover:bg-gray-400/90 dark:hover:bg-gray-700/90 dark:bg-gray-800 text-white peer-checked:font-bold peer-checked:bg-gradient-to-t peer-checked:from-primary/60 peer-checked:to-primary',
            props.classcontainer
          )}
        >
          {props.label}
        </span>
      </label>
    );
  }
);

RadionButton.displayName = 'RadioButton';

export { RadionButton };

export default GroupRadioButton;
