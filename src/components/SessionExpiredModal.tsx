import ModalContainer from "./ModalContainer";
import { useFlashMemoStore } from "../context/zustandStore";

const SessionExpiredModal = () => {
  const isSessionExpiredModalOpen = useFlashMemoStore(
    (state) => state.isSessionExpiredModalOpen
  );
  const setIsSessionExpiredModalOpen = useFlashMemoStore(
    (state) => state.setIsSessionExpiredModalOpen
  );

  const closeModal = () => {
    localStorage.removeItem("is-user-logged");
    setIsSessionExpiredModalOpen(false);
  };

  return (
    <ModalContainer
      {...{
        isModalOpen: isSessionExpiredModalOpen,
        setIsModalOpen: setIsSessionExpiredModalOpen,
      }}
    >
      <h1 className="text-2xl font-semibold mb-4 text-primary-yellow">
        Session expired
      </h1>

      <p>Session expired, you need to sign in again.</p>

      <div className="flex justify-end">
        <button
          className="py-2 px-4 w-[78px] font-semibold rounded dark:bg-neutral-700 bg-gray-200 mt-6  dark:text-white"
          onClick={closeModal}
        >
          Ok
        </button>
      </div>
    </ModalContainer>
  );
};

export default SessionExpiredModal;
