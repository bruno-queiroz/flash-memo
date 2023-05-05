import ModalContainer, { ModalContainerProps } from "./ModalContainer";

type DeleteDeckModalProps = {
  deckName: string;
} & Omit<ModalContainerProps, "children">;

const DeleteDeckModal = ({
  isModalOpen,
  setIsModalOpen,
  deckName,
}: DeleteDeckModalProps) => {
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <ModalContainer {...{ isModalOpen, setIsModalOpen }}>
      <h3 className="text-2xl font-semibold mb-4">Delete Deck</h3>
      <p>
        Wanna <span className="text-primary-yellow">delete `{deckName}`</span>{" "}
        deck? You'll lose all cards created in this deck
      </p>
      <div className="flex gap-4 mt-4 justify-end">
        <button
          className="py-2 px-4 rounded bg-gray-300 dark:bg-neutral-700"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button className="py-2 px-4 rounded bg-red-500 text-white">
          Delete
        </button>
      </div>
    </ModalContainer>
  );
};

export default DeleteDeckModal;
