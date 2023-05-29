import React, { ReactNode, useContext, useEffect, useState } from "react";
import { NotificationContext } from "../context/NotificationContext";
import CRUDNotification from "./CRUDNotification";
import { ModalContainerContext } from "../context/ModalContainerContext";

export interface ModalContainerProps {
  children: ReactNode;
}

const ModalContainer = ({ children }: ModalContainerProps) => {
  const [isModalOpen, setIsModalOpen] = useContext(ModalContainerContext);
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

  const [notificationContent, setNotificationContent] =
    useContext(NotificationContext);
  return (
    <>
      <div
        className={`${
          isModalOpen ? "translate-y-0" : "translate-y-[-100%]"
        } fixed bottom-0 left-0 right-0 w-full h-full bg-[rgba(0,0,0,0.2)] z-10`}
        onClick={closeModal}
      />
      <CRUDNotification
        {...notificationContent}
        {...{ setNotificationContent }}
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
