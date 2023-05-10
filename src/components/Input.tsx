import React, { InputHTMLAttributes } from "react";

type InputProps = {
  labelText: string;
  isSecondVariant?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ labelText, isSecondVariant, ...rest }, ref) => {
    return (
      <label className="flex flex-col gap-2">
        <span className="dark:text-gray-300 text-black">{labelText}</span>
        <input
          {...rest}
          ref={ref}
          className={`${
            isSecondVariant
              ? "dark:bg-neutral-700 bg-gray-400"
              : "dark:bg-neutral-800"
          } p-2 dark:text-gray-300`}
        />
      </label>
    );
  }
);

export default Input;
