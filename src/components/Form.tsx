import React, { FormHTMLAttributes } from "react";

type FormProps = {
  children: React.ReactNode;
} & FormHTMLAttributes<HTMLFormElement>;

const Form = ({ children, ...rest }: FormProps) => {
  return (
    <form
      className="flex flex-col w-full gap-4 max-w-[600px] p-4 rounded bg-gray-200 shadow-md dark:bg-neutral-900"
      {...rest}
    >
      {children}
    </form>
  );
};

export default Form;
