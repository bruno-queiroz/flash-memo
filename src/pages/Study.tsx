import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Card, getStudyDeck } from "../fetch/getStudyDeck";
import { TiArrowBack as BackIcon } from "react-icons/ti";
import {
  CardAmountGroups,
  countCardAmountGroups,
} from "../utils/countCardAmountGroups";
import { checkCardGroup } from "../utils/checkCardGroup";
import { patchCardDates } from "../fetch/patchCardDates";
import { estimateNextReviewTime } from "../utils/estimateNextReviewTime";
import { RecallFeedback } from "../utils/multiplyReviewTime";
import { useFlashMemoStore } from "../context/zustandStore";
import EditCardModal from "../components/EditCardModal";
import CRUDNotification from "../components/CRUDNotification";

const Study = () => {
  const { deckName } = useParams();
  const setIsEditModalOpen = useFlashMemoStore(
    (state) => state.setIsEditModalOpen
  );
  const setNotificationContent = useFlashMemoStore(
    (state) => state.setNotificationContent
  );
  const setCardEditData = useFlashMemoStore((state) => state.setCardEditData);

  const { data: cards } = useQuery("studyDeck", () => getStudyDeck(deckName), {
    cacheTime: 0,
  });

  const [cardsCounter, setCardsCounter] = useState<CardAmountGroups>({
    resetedCards: 0,
    newCards: 0,
    reviewCards: 0,
  });
  const [resetedCards, setResetedCards] = useState<Card[]>([]);
  const [isResetedCardsBeingShown, setIsResetedCardsBeingShown] =
    useState(false);
  const [resetedCardsIndex, setResetedCardsIndex] = useState(0);
  const [isReturnOneCardDisable, setIsReturnOneCardDisable] = useState(false);
  const [isShowingAnswer, setIsShowingAnswer] = useState(false);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const reviewCard = async (recallFeedback: keyof RecallFeedback) => {
    if (cards?.data) {
      setIsShowingAnswer(false);
      const cardGroup = checkCardGroup(cards?.data?.[index]);

      const isTheFinalCard = index + 1 === cards?.data?.length;
      if (isTheFinalCard) {
        if (resetedCards.length === 0) {
          await patchCardDates(cards?.data?.[index], recallFeedback);
          navigate("/decks");
          return;
        }
        if (cardsCounter[cardGroup] === 1) {
          setCardsCounter({
            ...cardsCounter,
            [cardGroup]: cardsCounter[cardGroup] - 1,
          });
          setIsResetedCardsBeingShown(true);
          return;
        }

        const isTheFinalResetedCard =
          resetedCardsIndex + 1 === resetedCards.length;
        if (isTheFinalResetedCard) {
          await patchCardDates(resetedCards[resetedCardsIndex], recallFeedback);
          navigate("/decks");
          return;
        }
        setCardsCounter({
          ...cardsCounter,
          resetedCards: cardsCounter.resetedCards - 1,
        });

        setResetedCardsIndex(resetedCardsIndex + 1);

        return;
      }

      await patchCardDates(cards?.data?.[index], recallFeedback);

      setCardsCounter({
        ...cardsCounter,
        [cardGroup]: cardsCounter[cardGroup] - 1,
      });

      setIndex(index + 1);
    }
  };

  const onEasy = (recallFeedback: keyof RecallFeedback) => {
    reviewCard(recallFeedback);
  };

  const onHard = (recallFeedback: keyof RecallFeedback) => {
    reviewCard(recallFeedback);
  };

  const onGood = (recallFeedback: keyof RecallFeedback) => {
    reviewCard(recallFeedback);
  };

  const onReset = async () => {
    if (cards?.data) {
      const isTheFinalCard = index + 1 === cards?.data?.length;

      await patchCardDates(cards?.data?.[index], "reset");

      if (isTheFinalCard) {
        setIsResetedCardsBeingShown(true);
      }
      if (!isTheFinalCard) {
        setIndex(index + 1);
      }
      setIsShowingAnswer(false);
      const cardReseted = cards?.data?.[index];
      const cardGroupBeforeReset = checkCardGroup(cardReseted);

      setResetedCards([...resetedCards, cardReseted]);
      setCardsCounter({
        ...cardsCounter,
        [cardGroupBeforeReset]: cardsCounter[cardGroupBeforeReset] - 1,
        resetedCards: cardsCounter.resetedCards + 1,
      });
    }
  };

  const onReturnOneCard = () => {
    if (index - 1 < 0) return;
    if (cards?.data) {
      setIsShowingAnswer(false);

      if (isResetedCardsBeingShown) {
        const isTheFirstResetedCard = resetedCardsIndex === 0;

        if (isTheFirstResetedCard) {
          const lastCardItem = cards?.data?.length;
          const lastCardGroup = checkCardGroup(cards?.data?.[lastCardItem - 1]);

          setCardsCounter({
            ...cardsCounter,
            [lastCardGroup]: cardsCounter[lastCardGroup] + 1,
          });
          setIsResetedCardsBeingShown(false);

          const wasTheLastCardReseted = resetedCards.some(
            (card) => cards?.data?.[index]?.id === card.id
          );

          if (wasTheLastCardReseted) {
            setCardsCounter({
              ...cardsCounter,
              [lastCardGroup]: cardsCounter[lastCardGroup] + 1,
              resetedCards: cardsCounter.resetedCards - 1,
            });
            setResetedCards(
              resetedCards.filter(
                (card) => cards?.data?.[index]?.id !== card.id
              )
            );
          }

          return;
        }

        setCardsCounter({
          ...cardsCounter,
          resetedCards: cardsCounter.resetedCards + 1,
        });
        setResetedCardsIndex(resetedCardsIndex - 1);

        return;
      }
      const cardGroup = checkCardGroup(cards?.data?.[index - 1]);

      setCardsCounter({
        ...cardsCounter,
        [cardGroup]: cardsCounter[cardGroup] + 1,
      });

      const wasCardReseted = resetedCards.some(
        (card) => cards?.data?.[index - 1 ? index - 1 : 0]?.id === card.id
      );

      if (wasCardReseted) {
        setCardsCounter({
          ...cardsCounter,
          [cardGroup]: cardsCounter[cardGroup] + 1,
          resetedCards: cardsCounter.resetedCards - 1,
        });
        setResetedCards(
          resetedCards.filter(
            (card) => cards?.data?.[index - 1 ? index - 1 : 0]?.id !== card.id
          )
        );
      }
      setIndex(index - 1);
    }
  };

  useEffect(() => {
    if (index - 1 < 0) {
      setIsReturnOneCardDisable(true);
    } else {
      setIsReturnOneCardDisable(false);
    }
  }, [index]);

  useEffect(() => {
    const data = cards?.data;
    setCardsCounter(countCardAmountGroups(data));

    if (data?.length === 0) {
      navigate("/decks");
      setNotificationContent({
        isNotificationShowing: true,
        isOk: false,
        msg: "No Cards to Study in this deck",
      });
    }
  }, [cards]);

  const openEditCardModal = () => {
    if (cards) {
      setIsEditModalOpen(true);

      if (isResetedCardsBeingShown) {
        const { back, id, front } = resetedCards[resetedCardsIndex];
        setCardEditData({
          back,
          front,
          id,
        });
      }
      const { back, id, front } = cards.data[index];
      setCardEditData({
        back,
        front,
        id,
      });
    }
  };

  return (
    <section className="flex flex-col items-center gap-4 p-4 min-h-[85vh]">
      <EditCardModal />
      <CRUDNotification />
      <div className="flex items-center w-full md:w-[80%] justify-between text-lg font-semibold">
        <div className="flex gap-1">
          <span className="text-[#05668d] dark:text-[#ff8800]">
            {cardsCounter.newCards}
          </span>
          <span className="text-[#00a5cf] dark:text-[#ffaa00] ">
            {cardsCounter.resetedCards}
          </span>
          <span className="text-[#25a18e] dark:text-[#ffdd00] ">
            {cardsCounter.reviewCards}
          </span>
        </div>
        <div className="flex gap-4">
          <button
            className="py-[6px] px-4 bg-gray-200 dark:text-gray-300 dark:bg-neutral-900 rounded"
            disabled={isReturnOneCardDisable}
            onClick={onReturnOneCard}
          >
            <BackIcon />
          </button>
          <button
            className="py-[6px] px-4 bg-gray-200 dark:text-gray-300 dark:bg-neutral-900 rounded"
            onClick={openEditCardModal}
          >
            Edit
          </button>
        </div>
      </div>

      <div className="mx-auto w-full md:max-w-[80%]">
        <div className="flex flex-col gap-4  shadow-md w-full p-4 rounded-tl-md rounded-tr-md text-center bg-gray-200 dark:bg-neutral-900 dark:text-gray-300 ">
          <h2 className="py-2 font-semibold text-lg">
            {isResetedCardsBeingShown
              ? resetedCards[resetedCardsIndex]?.front
              : cards?.data?.[index]?.front}
          </h2>
          <div className="border-b-2 border-b-gray-400 dark:border-b-neutral-700 pb-2"></div>
        </div>
        <div
          className={`shadow-md w-full p-4  bg-gray-200 dark:bg-neutral-900 dark:text-gray-200  text-start transition-transform ease-in origin-top ${
            isShowingAnswer ? "scale-y-100 h-full" : "scale-y-0 h-[1px]"
          }`}
        >
          {isResetedCardsBeingShown
            ? resetedCards?.[resetedCardsIndex]?.back
            : cards?.data?.[index]?.back}
        </div>
      </div>

      <div className="flex gap-4 text-white mt-auto font-semibold ">
        {isShowingAnswer ? (
          <>
            <button
              className="py-2 px-4 rounded bg-red-500 h-[max-content] mt-auto"
              onClick={onReset}
              disabled={
                isResetedCardsBeingShown || cards?.data?.[index]?.wasCardReseted
              }
            >
              reset
            </button>
            <div className="flex flex-col">
              <span className="mx-auto mb-1 text-black dark:text-gray-300">
                {estimateNextReviewTime(
                  cards?.data?.[index]?.reviewAt,
                  cards?.data?.[index]?.reviewAwaitTime,
                  "hard"
                )}
              </span>
              <button
                className="py-2 px-4 rounded text-black bg-gray-300"
                onClick={() => onHard("hard")}
              >
                hard
              </button>
            </div>
            <div className="flex flex-col">
              <span className=" mx-auto mb-1 text-[#00a5cf]">
                {estimateNextReviewTime(
                  cards?.data?.[index]?.reviewAt,
                  cards?.data?.[index]?.reviewAwaitTime,
                  "good"
                )}
              </span>

              <button
                className="py-2 px-4 rounded bg-[#00a5cf]"
                onClick={() => onGood("good")}
              >
                good
              </button>
            </div>
            <div className="flex flex-col">
              <span className="text-[#25a18e] mx-auto mb-1">
                {estimateNextReviewTime(
                  cards?.data?.[index]?.reviewAt,
                  cards?.data?.[index]?.reviewAwaitTime,
                  "easy"
                )}
              </span>

              <button
                className="py-2 px-4 rounded bg-[#25a18e]"
                onClick={() => onEasy("easy")}
              >
                easy
              </button>
            </div>
          </>
        ) : (
          <button
            className="py-2 px-4 rounded bg-primary-yellow min-w-[315px]"
            onClick={() => setIsShowingAnswer(true)}
          >
            Show Answer
          </button>
        )}
      </div>
    </section>
  );
};

export default Study;
