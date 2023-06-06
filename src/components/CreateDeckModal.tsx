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
  const isUserLogged = useFlashMemoStore((state) => state.isUserLogged);

  const deckNameRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { mutate: createDeckMutate } = useMutation(
    ({ newDeck, isUserLogged }: { newDeck: DeckForm; isUserLogged: boolean }) =>
      postDeck(newDeck, isUserLogged),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("decksData");
      },
    }
  );

  const createDeck = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (deckNameRef.current?.value) {
      const newDeck = {
        deckName: deckNameRef.current.value,
      };
      createDeckMutate({ newDeck, isUserLogged });
    }
  };

  useEffect(() => {
    if (isCreateDeckModalOpen && deckNameRef.current) {
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
