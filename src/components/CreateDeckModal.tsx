import React, { useEffect, useRef } from "react";
import ModalContainer from "./ModalContainer";
import Input from "./Input";
import { useMutation, useQueryClient } from "react-query";
import { DeckForm, postDeck } from "../fetch/postDeck";
import { useFlashMemoStore } from "../context/zustandStore";

const DIALOG_ANIMATION_TIME = 150;

const CreateDeckModal = () => {
  const isCreateDeckModalOpen = useFlashMemoStore(
    (state) => state.isCreateDeckModalOpen
  );
  const setIsCreateDeckModalOpen = useFlashMemoStore(
    (state) => state.setIsCreateDeckModalOpen
  );
  const setNotificationContent = useFlashMemoStore(
    (state) => state.setNotificationContent
  );

  const deckNameRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { mutateAsync: createDeckMutate } = useMutation(
    (newDeck: DeckForm) => postDeck(newDeck),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("decksData");
      },
    }
  );

  const createDeck = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (deckNameRef.current?.value) {
      const newDeck = {
        deckName: deckNameRef.current.value,
      };
      try {
        const data = await createDeckMutate(newDeck);
        setNotificationContent({
          isNotificationShowing: true,
          isOk: true,
          msg: data?.msg,
        });
        setIsCreateDeckModalOpen(false);
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
    if (isCreateDeckModalOpen && deckNameRef.current) {
      deckNameRef.current.value = "";
      setTimeout(() => {
        deckNameRef.current?.focus();
      }, DIALOG_ANIMATION_TIME);
    }
  }, [isCreateDeckModalOpen]);

  return (
    <ModalContainer
      {...{
        isModalOpen: isCreateDeckModalOpen,
        setIsModalOpen: setIsCreateDeckModalOpen,
      }}
    >
      <form className="flex flex-col" onSubmit={createDeck}>
        <h3 className="text-2xl font-semibold mb-4">Create Deck</h3>
        <Input
          labelText="Deck Name"
          isSecondVariant={true}
          required
          ref={deckNameRef}
        />
        <button className="bg-primary-yellow py-2 px-4 rounded w-[max-content] mx-auto mt-4 text-white">
          Create
        </button>{" "}
      </form>
    </ModalContainer>
  );
};

export default CreateDeckModal;
