import React, { InputHTMLAttributes } from "react";

type InputProps = {
  labelText: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ labelText, ...rest }, ref) => {
    return (
      <label className="flex flex-col gap-2">
        <span className="dark:text-gray-300 text-black">{labelText}</span>
        <input
          {...rest}
          ref={ref}
          className="dark:bg-neutral-800 p-2 dark:text-gray-300"
        />
      </label>
    );
  }
);

export default Input;
