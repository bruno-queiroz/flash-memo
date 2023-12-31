import { useMutation, useQuery, useQueryClient } from "react-query";
import Form from "../components/Form";
import { getDecks } from "../fetch/getDecks";
import { useEffect, useRef } from "react";
import { CardForm, createCard } from "../fetch/createCard";
import LoadSpinner from "../components/LoadSpinner";
import CRUDNotification from "../components/CRUDNotification";
import { useFlashMemoStore } from "../context/zustandStore";

const Add = () => {
  const { data: decks } = useQuery(["decksData"], () => getDecks());
  const queryClient = useQueryClient();
  const {
    mutate: cardMutate,
    isLoading,
    isSuccess,
    isError,
    error,
    data: postCardResponse,
  } = useMutation((newCard: CardForm) => createCard(newCard), {
    onSuccess: () => queryClient.invalidateQueries("decksData"),
  });

  const cardSelectRef = useRef<HTMLSelectElement>(null);
  const cardFrontInputRef = useRef<HTMLTextAreaElement>(null);
  const cardBackInputRef = useRef<HTMLTextAreaElement>(null);

  const setNotificationContent = useFlashMemoStore(
    (state) => state.setNotificationContent
  );

  const submitCard = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newCard = {
      deckId: cardSelectRef.current?.value,
      front: cardFrontInputRef.current?.value,
      back: cardBackInputRef.current?.value,
    };

    if (newCard?.back && newCard?.front && newCard?.deckId) {
      cardMutate(newCard as CardForm);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      if (postCardResponse?.msg) {
        setNotificationContent({
          isNotificationShowing: true,
          isOk: postCardResponse?.isOk,
          msg: postCardResponse?.msg,
        });
      }

      if (cardFrontInputRef.current && cardBackInputRef.current) {
        cardFrontInputRef.current.value = "";
        cardBackInputRef.current.value = "";
        return;
      }
    }
    if (isError) {
      const errorMessage = (error as Error).message;

      if (errorMessage) {
        setNotificationContent({
          isNotificationShowing: true,
          isOk: false,
          msg: errorMessage,
        });
      }
    }
  }, [isSuccess, isError]);

  return (
    <section className="flex gap-4 flex-col p-4 items-center dark:text-gray-300 text-black">
      <h1 className="font-bold text-center text-4xl text-neutral-800 dark:text-white">
        Add
      </h1>
      <CRUDNotification />

      <Form onSubmit={submitCard}>
        <label className="flex flex-col gap-2">
          <span>Deck</span>
          <select
            required
            autoFocus
            className="dark:bg-neutral-800 bg-white p-1"
            ref={cardSelectRef}
          >
            {decks?.data?.map((deck) => (
              <option value={deck?.id} key={deck?.id}>
                {deck?.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span>Card Front</span>
          <textarea
            required
            ref={cardFrontInputRef}
            className="dark:bg-neutral-800 bg-white p-2"
          ></textarea>
        </label>
        <label className="flex flex-col gap-2">
          <span>Card Back</span>
          <textarea
            required
            ref={cardBackInputRef}
            className="dark:bg-neutral-800 bg-white p-2"
          ></textarea>
        </label>
        <button className="bg-primary-yellow py-2 px-4 rounded w-[80px] mx-auto mt-4 text-white font-semibold">
          {isLoading ? <LoadSpinner /> : "Create"}
        </button>
      </Form>
    </section>
  );
};

export default Add;
