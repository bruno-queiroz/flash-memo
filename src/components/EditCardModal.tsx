import { useContext, useEffect, useRef, useState } from "react";
import Form from "./Form";
import LoadSpinner from "./LoadSpinner";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getSingleCard } from "../fetch/getSingleCard";
import { patchCardContent } from "../fetch/patchCardContent";
import { Card } from "../fetch/getStudyDeck";
import { NotificationContext } from "../context/NotificationContext";

const EditCardModal = ({ cardId }: { cardId: string }) => {
  const [_, setNotificationContent] = useContext(NotificationContext);
  const cardFrontInputRef = useRef<HTMLTextAreaElement>(null);
  const cardBackInputRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();

  const { data: card, isSuccess: isGetSingleCardSuccess } = useQuery(
    "getSingleQuery",
    () => getSingleCard(cardId)
  );

  const {
    isLoading: isEditCardLoading,
    isError: isEditCardError,
    error: editCardError,
    mutate: editCardMutate,
  } = useMutation(
    ({
      newCard,
      cardId,
    }: {
      newCard: Pick<Card, "front" | "back">;
      cardId: string;
    }) => patchCardContent(newCard, cardId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("searchCards");
      },
    }
  );

  const editCard = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (cardFrontInputRef.current && cardBackInputRef.current) {
      const newCard = {
        front: cardFrontInputRef.current.value,
        back: cardBackInputRef.current.value,
      };

      editCardMutate({ newCard, cardId });
    }
  };

  useEffect(() => {
    if (
      isGetSingleCardSuccess &&
      cardFrontInputRef.current &&
      cardBackInputRef.current
    ) {
      cardFrontInputRef.current.value = card?.data?.front;
      cardBackInputRef.current.value = card?.data?.back;
    }
  }, [isGetSingleCardSuccess]);

  useEffect(() => {
    if (isEditCardError) {
      const errorMsg = (editCardError as Error).message;

      setNotificationContent({
        isNotificationShowing: true,
        isOk: false,
        msg: errorMsg,
      });
      return;
    }
  }, [isEditCardError]);

  return (
    <>
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
    </>
  );
};

export default EditCardModal;
