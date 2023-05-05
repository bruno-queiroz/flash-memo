import React, { ReactNode } from "react";

export interface ModalContainerProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

const ModalContainer = ({
  isModalOpen,
  setIsModalOpen,
  children,
}: ModalContainerProps) => {
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div
        className={`${
          isModalOpen ? "block" : "hidden"
        } fixed top-0 bottom-0 left-0 right-0 w-full h-full bg-[rgba(0,0,0,0.7)] z-10`}
        onClick={closeModal}
      />

      <dialog
        open={isModalOpen}
        className="max-w-[500px] w-full dark:bg-neutral-800 dark:text-white rounded absolute top-0 modal-animation z-10"
      >
        {children}
      </dialog>
    </>
  );
};

export default ModalContainer;
