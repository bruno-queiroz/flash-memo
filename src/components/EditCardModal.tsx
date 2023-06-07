import { useEffect, useRef } from "react";
import Form from "./Form";
import LoadSpinner from "./LoadSpinner";
import { useMutation, useQueryClient } from "react-query";
import { patchCardContent } from "../fetch/patchCardContent";
import { Card } from "../fetch/getStudyDeck";
import ModalContainer from "./ModalContainer";
import { useFlashMemoStore } from "../context/zustandStore";

const EditCardModal = () => {
  const isEditModalOpen = useFlashMemoStore((state) => state.isEditModalOpen);
  const isUserLogged = useFlashMemoStore((state) => state.isUserLogged);
  const setIsEditModalOpen = useFlashMemoStore(
    (state) => state.setIsEditModalOpen
  );
  const {
    back,
    front,
    id: cardId,
  } = useFlashMemoStore((state) => state.cardEditData);

  const setNotificationContent = useFlashMemoStore(
    (state) => state.setNotificationContent
  );

  const cardFrontInputRef = useRef<HTMLTextAreaElement>(null);
  const cardBackInputRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();

  const {
    isLoading: isEditCardLoading,
    error: editCardError,
    mutateAsync: editCardMutate,
  } = useMutation(
    ({
      newCard,
      cardId,
      isUserLogged,
    }: {
      newCard: Pick<Card, "front" | "back">;
      cardId: string;
      isUserLogged: boolean;
    }) => patchCardContent(newCard, cardId, isUserLogged),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("searchCards");
        queryClient.invalidateQueries("studyDeck");
      },
    }
  );

  const editCard = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (cardFrontInputRef.current && cardBackInputRef.current) {
      const newCard = {
        front: cardFrontInputRef.current.value,
        back: cardBackInputRef.current.value,
      };

      if (newCard.front === front && newCard.back === back) {
        setNotificationContent({
          isNotificationShowing: true,
          isOk: true,
          msg: "No changes",
        });
        setIsEditModalOpen(false);
        return;
      }

      try {
        const data = await editCardMutate({ newCard, cardId, isUserLogged });

        setNotificationContent({
          isNotificationShowing: true,
          isOk: true,
          msg: data?.msg,
        });
        setIsEditModalOpen(false);
      } catch (err) {
        const errorMsg = (editCardError as Error).message;

        setNotificationContent({
          isNotificationShowing: true,
          isOk: false,
          msg: errorMsg,
        });
      }
    }
  };

  useEffect(() => {
    if (
      front &&
      back &&
      cardFrontInputRef.current &&
      cardBackInputRef.current
    ) {
      cardFrontInputRef.current.value = front;
      cardBackInputRef.current.value = back;
    }
  }, [front, back]);

  return (
    <>
      <ModalContainer
        {...{
          isModalOpen: isEditModalOpen,
          setIsModalOpen: setIsEditModalOpen,
        }}
      >
        <Form className="flex flex-col items-center gap-4" onSubmit={editCard}>
          <h2 className="font-semibold text-center text-2xl text-dark-blue dark:text-white">
            Edit Card
          </h2>
          <label className="flex flex-col gap-2 w-full">
            <span>Card Front</span>
            <textarea
              required
              ref={cardFrontInputRef}
              className="dark:bg-neutral-900 bg-white p-2"
            />
          </label>
          <label className="flex flex-col gap-2 w-full">
            <span>Card Back</span>
            <textarea
              required
              ref={cardBackInputRef}
              className="dark:bg-neutral-900 bg-white p-2"
            />
          </label>
          <button className="bg-primary-yellow py-2 px-4 rounded w-[80px] mx-auto mt-4 text-white">
            {isEditCardLoading ? <LoadSpinner /> : "Edit"}
          </button>
        </Form>
      </ModalContainer>
    </>
  );
};

export default EditCardModal;
