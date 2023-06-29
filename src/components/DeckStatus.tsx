import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiDotsVerticalRounded as DotsIcon } from "react-icons/bi";
import { DeckStatusType } from "../fetch/getDecks";
import { useFlashMemoStore } from "../context/zustandStore";

export const DeckStatus = ({ name, cards, id }: DeckStatusType) => {
  const setIsDeleteDeckModalOpen = useFlashMemoStore(
    (state) => state.setIsDeleteDeckModalOpen
  );
  const setIsEditDeckNameModalOpen = useFlashMemoStore(
    (state) => state.setIsEditDeckNameModalOpen
  );
  const setDeckData = useFlashMemoStore((state) => state.setDeckData);
  const setNotificationContent = useFlashMemoStore(
    (state) => state.setNotificationContent
  );
  const deckData = useFlashMemoStore((state) => state.deckData);

  const [isOptionsActive, setIsOptionsActive] = useState(false);

  const openDeckOptions = () => {
    setIsOptionsActive(!isOptionsActive);
    setDeckData({ deckId: id, deckName: name });
  };

  const openDeckDeleteModal = () => {
    setIsDeleteDeckModalOpen(true);
  };

  const openEditNameDeckModal = () => {
    setIsEditDeckNameModalOpen(true);
  };

  useEffect(() => {
    const body = document.querySelector("body");

    const listener = (event: MouseEvent) => {
      const isTheOptionClicked =
        id === deckData.deckId &&
        (event.target as HTMLDivElement).id === "deck-option";

      if (isTheOptionClicked) return;

      setIsOptionsActive(false);
    };

    body?.addEventListener("click", listener);

    return () => body?.removeEventListener("click", listener);
  }, [deckData]);

  const checkDeckCardsAvailability = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!cards.newCards && !cards.resetedCards && !cards.reviewCards) {
      e.preventDefault();
      setNotificationContent({
        isNotificationShowing: true,
        isOk: false,
        msg: "No Cards to Study in this deck",
      });
    }
  };
  return (
    <article className="flex items-center rounded-lg text-neutral-800 dark:text-gray-300 dark:bg-neutral-900 shadow-md bg-gray-200">
      <Link
        to={`/study/${name}`}
        onClick={checkDeckCardsAvailability}
        className="flex-1 p-4 dark:hover:bg-neutral-950 font-semibold hover:bg-gray-300 transition-colors rounded-tl-lg rounded-bl-lg"
      >
        {name}
      </Link>

      <div className="flex gap-6 p-4">
        <div className="flex gap-1">
          <span className="text-[#05668d] font-semibold">{cards.newCards}</span>
          <span className="text-[#00a5cf] font-semibold">
            {cards.resetedCards}
          </span>
          <span className="text-[#25a18e] font-semibold">
            {cards.reviewCards}
          </span>
        </div>

        <div className="flex items-center relative">
          <button
            className="text-2xl text-dark-blue dark:text-white relative"
            onClick={openDeckOptions}
          >
            <DotsIcon />
            <div
              className="absolute w-full h-full bg-transparent top-0"
              id="deck-option"
            />
          </button>
          <div
            className={`absolute z-10 right-0 lg:left-[50%] flex-col top-[100%] lg:translate-x-[-50%] py-2 w-[120px] dark:bg-neutral-950 dark:text-white bg-dark-blue text-white rounded text-sm ${
              isOptionsActive ? "flex" : "hidden"
            }`}
          >
            <button
              className="p-2 hover:bg-[#1F5575] dark:hover:bg-neutral-900 transition-colors"
              onClick={openDeckDeleteModal}
            >
              Delete Deck
            </button>
            <button
              className="p-2 hover:bg-[#1F5575] dark:hover:bg-neutral-900 transition-colors"
              onClick={openEditNameDeckModal}
            >
              Rename Deck
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
