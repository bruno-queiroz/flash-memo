import ModalContainer from "./ModalContainer";
import { useFlashMemoStore } from "../context/zustandStore";
import Input from "./Input";
import { useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import { patchRenameDeck } from "../fetch/patchRenameDeck";

const EditDeckNameModal = () => {
  const deckNameInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { mutateAsync: renameDeckMutate } = useMutation(
    ({ deckId, deckName }: { deckId: string; deckName: string }) =>
      patchRenameDeck(deckId, deckName),
    {
      onSuccess: () => queryClient.invalidateQueries("decksData"),
    }
  );

  const { deckName, deckId } = useFlashMemoStore((state) => state.deckData);
  const isEditDeckNameModalOpen = useFlashMemoStore(
    (state) => state.isEditDeckNameModalOpen
  );
  const setIsEditDeckNameModalOpen = useFlashMemoStore(
    (state) => state.setIsEditDeckNameModalOpen
  );
  const setNotificationContent = useFlashMemoStore(
    (state) => state.setNotificationContent
  );
  const onEditDeckName = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (deckNameInputRef.current) {
      try {
        const data = await renameDeckMutate({
          deckId,
          deckName: deckNameInputRef.current.value,
        });

        setNotificationContent({
          isNotificationShowing: true,
          isOk: true,
          msg: data?.msg,
        });
        setIsEditDeckNameModalOpen(false);
      } catch (err) {
        const errorMsg = (err as Error).message;

        setNotificationContent({
          isNotificationShowing: true,
          isOk: false,
          msg: errorMsg,
        });
      }
    }
  };

  useEffect(() => {
    if (deckNameInputRef.current && deckName) {
      deckNameInputRef.current.value = deckName;
    }
  }, [deckName]);

  return (
    <ModalContainer
      {...{
        isModalOpen: isEditDeckNameModalOpen,
        setIsModalOpen: setIsEditDeckNameModalOpen,
      }}
    >
      <form className="flex flex-col gap-4" onSubmit={onEditDeckName}>
        <h3 className="text-2xl font-semibold">Edit Deck Name</h3>

        <Input
          labelText="Deck Name"
          isSecondVariant
          ref={deckNameInputRef}
          required
        />
        <div className="flex justify-end">
          <button className="py-2 px-4 w-[78px] font-semibold rounded dark:bg-neutral-700 bg-gray-200  dark:text-white">
            Edit
          </button>
        </div>
      </form>
    </ModalContainer>
  );
};

export default EditDeckNameModal;
