import { useMutation, useQueryClient } from "react-query";
import { useFlashMemoStore } from "../context/zustandStore";
import ModalContainer from "./ModalContainer";
import { deleteDeck } from "../fetch/deleteDeck";
import LoadSpinner from "./LoadSpinner";

const DeleteDeckModal = () => {
  const { deckName } = useFlashMemoStore((state) => state.deckData);
  const deckData = useFlashMemoStore((state) => state.deckData);
  const queryClient = useQueryClient();

  const { mutateAsync: deleteDeckMutate, isLoading } = useMutation(
    (deckId: string) => deleteDeck(deckId),
    {
      onSuccess: () => queryClient.invalidateQueries("decksData"),
    }
  );

  const setNotificationContent = useFlashMemoStore(
    (state) => state.setNotificationContent
  );
  const isDeleteDeckModalOpen = useFlashMemoStore(
    (state) => state.isDeleteDeckModalOpen
  );
  const setIsDeleteDeckModalOpen = useFlashMemoStore(
    (state) => state.setIsDeleteDeckModalOpen
  );

  const deleteSelectedDeck = async () => {
    try {
      const data = await deleteDeckMutate(deckData.deckId);
      setNotificationContent({
        isNotificationShowing: true,
        isOk: true,
        msg: data.msg,
      });
    } catch (err) {
      const errMsg = (err as Error).message;
      setNotificationContent({
        isNotificationShowing: true,
        isOk: false,
        msg: errMsg,
      });
    } finally {
      setIsDeleteDeckModalOpen(false);
    }
  };

  const closeModal = () => {
    setIsDeleteDeckModalOpen(false);
  };
  return (
    <ModalContainer
      {...{
        isModalOpen: isDeleteDeckModalOpen,
        setIsModalOpen: setIsDeleteDeckModalOpen,
      }}
    >
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
        <button
          className="py-2 px-4 min-w-[78px] rounded bg-red-500 text-white"
          onClick={deleteSelectedDeck}
          disabled={isLoading}
        >
          {isLoading ? <LoadSpinner /> : "Delete"}
        </button>
      </div>
    </ModalContainer>
  );
};

export default DeleteDeckModal;
