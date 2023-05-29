import { ReactNode, createContext, useState } from "react";

export const ModalContainerContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>]
>([false, () => ""]);

export const ModalContainerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <ModalContainerContext.Provider value={useState(false)}>
      {children}
    </ModalContainerContext.Provider>
  );
};
