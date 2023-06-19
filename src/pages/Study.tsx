import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
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
import LoadSpinner from "../components/LoadSpinner";
import CardsCounterSkeleton from "../components/CardsCounterSkeleton";

interface CardDatesMutation {
  card: Card;
  recallFeedback: keyof RecallFeedback;
}

const Study = () => {
  const { deckName } = useParams();
  const setIsEditModalOpen = useFlashMemoStore(
    (state) => state.setIsEditModalOpen
  );
  const { mutateAsync: cardDatesMutation, isLoading } = useMutation(
    ({ card, recallFeedback }: CardDatesMutation) =>
      patchCardDates(card, recallFeedback)
  );
  const setNotificationContent = useFlashMemoStore(
    (state) => state.setNotificationContent
  );
  const setCardEditData = useFlashMemoStore((state) => state.setCardEditData);

  const { data: cards, isLoading: studyDeckIsLoading } = useQuery(
    "studyDeck",
    () => getStudyDeck(deckName),
    {
      cacheTime: 0,
    }
  );

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
          try {
            await cardDatesMutation({
              card: cards?.data?.[index],
              recallFeedback,
            });
            navigate("/decks");
            setNotificationContent({
              isNotificationShowing: true,
              isOk: true,
              msg: "Deck Study Completed",
            });
            return;
          } catch (err) {
            const errMsg = (err as Error).message;

            setNotificationContent({
              isNotificationShowing: true,
              isOk: false,
              msg: errMsg,
            });
          }
        }
        if (cardsCounter[cardGroup] === 1) {
          try {
            await cardDatesMutation({
              card: cards?.data?.[index],
              recallFeedback,
            });
            setCardsCounter({
              ...cardsCounter,
              [cardGroup]: cardsCounter[cardGroup] - 1,
            });
            setIsResetedCardsBeingShown(true);
            return;
          } catch (err) {
            const errMsg = (err as Error).message;

            setNotificationContent({
              isNotificationShowing: true,
              isOk: false,
              msg: errMsg,
            });
          }
        }

        const isTheFinalResetedCard =
          resetedCardsIndex + 1 === resetedCards.length;
        if (isTheFinalResetedCard) {
          try {
            await cardDatesMutation({
              card: resetedCards[resetedCardsIndex],
              recallFeedback,
            });
            navigate("/decks");
            setNotificationContent({
              isNotificationShowing: true,
              isOk: true,
              msg: "Deck Study Completed",
            });
            return;
          } catch (err) {
            const errMsg = (err as Error).message;

            setNotificationContent({
              isNotificationShowing: true,
              isOk: false,
              msg: errMsg,
            });
          }
        }
        setCardsCounter({
          ...cardsCounter,
          resetedCards: cardsCounter.resetedCards - 1,
        });

        setResetedCardsIndex(resetedCardsIndex + 1);

        return;
      }

      try {
        await cardDatesMutation({ card: cards?.data?.[index], recallFeedback });
        setCardsCounter({
          ...cardsCounter,
          [cardGroup]: cardsCounter[cardGroup] - 1,
        });

        setIndex(index + 1);
      } catch (err) {
        const errMsg = (err as Error).message;

        setNotificationContent({
          isNotificationShowing: true,
          isOk: false,
          msg: errMsg,
        });
      }
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

      try {
        await cardDatesMutation({
          card: cards?.data?.[index],
          recallFeedback: "reset",
        });

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
      } catch (err) {
        const errMsg = (err as Error).message;

        setNotificationContent({
          isNotificationShowing: true,
          isOk: false,
          msg: errMsg,
        });
      }
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

  const dynamicCard = isResetedCardsBeingShown
    ? resetedCards[resetedCardsIndex]
    : cards?.data?.[index];

  let cardGroup = "";

  if (dynamicCard) {
    cardGroup = checkCardGroup(dynamicCard);
  }

  return (
    <section className="flex flex-col items-center gap-4 p-4 min-h-[85vh] max-w-[1300px] mx-auto">
      <EditCardModal />
      <CRUDNotification />
      <div className="flex items-center w-full md:w-[80%] justify-between text-lg font-semibold">
        {studyDeckIsLoading ? (
          <CardsCounterSkeleton />
        ) : (
          <div className="flex gap-1">
            <span
              className={`text-[#05668d] px-2 ${
                cardGroup === "newCards" &&
                !isResetedCardsBeingShown &&
                "border-gray-400 dark:border-gray-300 border-[2px]"
              }`}
            >
              {cardsCounter.newCards}
            </span>
            <span
              className={`text-[#00a5cf] px-2 ${
                (cardGroup === "resetedCards" &&
                  "border-gray-400 dark:border-gray-300 border-[2px]") ||
                (isResetedCardsBeingShown &&
                  "border-gray-400 dark:border-gray-300 border-[2px]")
              }`}
            >
              {cardsCounter.resetedCards}
            </span>
            <span
              className={`text-[#25a18e] px-2 ${
                cardGroup === "reviewCards" &&
                !isResetedCardsBeingShown &&
                "border-gray-400 dark:border-gray-300 border-[2px]"
              }`}
            >
              {cardsCounter.reviewCards}
            </span>
          </div>
        )}
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
            {studyDeckIsLoading ? (
              <div className="h-[12px] w-[200px] bg-gray-500 mx-auto" />
            ) : (
              <>{dynamicCard?.front}</>
            )}
          </h2>
          <div className="border-b-2 border-b-gray-400 dark:border-b-neutral-700 pb-2"></div>
        </div>
        <div
          className={`shadow-md w-full p-4  bg-gray-200 dark:bg-neutral-900 dark:text-gray-200  text-start transition-transform ease-in origin-top ${
            isShowingAnswer ? "scale-y-100 h-full" : "scale-y-0 h-[1px]"
          }`}
        >
          <p className={`${isShowingAnswer ? "block" : "hidden"}`}>
            {dynamicCard?.back}
          </p>
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
          <>
            {isLoading ? (
              <span>
                Sending card <LoadSpinner />
              </span>
            ) : (
              <button
                className="py-2 px-4 rounded bg-primary-yellow min-w-[315px]"
                onClick={() => setIsShowingAnswer(true)}
                disabled={studyDeckIsLoading}
              >
                {studyDeckIsLoading ? <LoadSpinner /> : "Show Answer"}
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Study;
