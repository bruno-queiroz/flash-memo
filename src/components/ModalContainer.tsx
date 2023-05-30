import React, { ReactNode, useEffect, useState } from "react";

export interface ModalContainerProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

const ModalContainer = ({
  children,
  isModalOpen,
  setIsModalOpen,
}: ModalContainerProps) => {
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogAnimationEnd = (
    event: React.AnimationEvent<HTMLDialogElement>
  ) => {
    if (event.animationName === "close-modal-animation") {
      setIsDialogOpen(false);
      return;
    }
  };
  useEffect(() => {
    if (isModalOpen) {
      setIsDialogOpen(true);
    }
  }, [isModalOpen]);

  return (
    <>
      <div
        className={`${
          isModalOpen ? "translate-y-0" : "translate-y-[-100%]"
        } fixed bottom-0 left-0 right-0 w-full h-full bg-[rgba(0,0,0,0.2)] z-10`}
        onClick={closeModal}
      />

      <dialog
        open={isDialogOpen}
        onAnimationEnd={dialogAnimationEnd}
        className={`fixed max-w-[500px] w-full dark:bg-neutral-800 dark:text-white rounded top-0 z-10 ${
          isModalOpen ? "show-modal-animation" : "close-modal-animation"
        }`}
      >
        {children}
      </dialog>
    </>
  );
};

export default ModalContainer;
