import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Card, getStudyDeck } from "../fetch/getStudyDeck";
import { TiArrowBack as BackIcon } from "react-icons/ti";
import {
  CardAmountGroups,
  countCardAmountGroups,
} from "../utils/countCardAmountGroups";
import { checkCardGroup } from "../utils/checkCardGroup";
import { patchCardDates } from "../fetch/patchCardDates";
import { RecallFeedback } from "../utils/multiplyReviewTime";

const Study = () => {
  const { deckName } = useParams();
  const { data: cards } = useQuery("studyDeck", () => getStudyDeck(deckName));
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

  const reviewCard = async (recallFeedback: keyof RecallFeedback) => {
    if (cards?.data?.cards) {
      setIsShowingAnswer(false);
      const cardGroup = checkCardGroup(cards?.data?.cards[index]);

      const isTheFinalCard = index + 1 === cards?.data?.cards.length;
      if (isTheFinalCard) {
        if (resetedCards.length === 0) {
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
          return;
        }
        setCardsCounter({
          ...cardsCounter,
          resetedCards: cardsCounter.resetedCards - 1,
        });

        setResetedCardsIndex(resetedCardsIndex + 1);

        return;
      }

      await patchCardDates(cards?.data?.cards[index], recallFeedback);

      setCardsCounter({
        ...cardsCounter,
        [cardGroup]: cardsCounter[cardGroup] - 1,
      });

      setIndex(index + 1);
    }
  };

  const onReset = () => {
    if (cards?.data?.cards) {
      const isTheFinalCard = index + 1 === cards?.data?.cards.length;

      if (isTheFinalCard) {
        setIsResetedCardsBeingShown(true);
      }
      if (!isTheFinalCard) {
        setIndex(index + 1);
      }
      setIsShowingAnswer(false);
      const cardReseted = cards?.data?.cards[index];
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
    if (cards?.data?.cards) {
      setIsShowingAnswer(false);

      if (isResetedCardsBeingShown) {
        const isTheFinalResetedCard =
          resetedCardsIndex + 1 === resetedCards.length;

        const isTheFirstResetedCard = resetedCardsIndex === 0;

        if (isTheFirstResetedCard) {
          const lastCardItem = cards?.data?.cards.length;
          const lastCardGroup = checkCardGroup(
            cards?.data?.cards[lastCardItem - 1]
          );

          setCardsCounter({
            ...cardsCounter,
            [lastCardGroup]: cardsCounter[lastCardGroup] + 1,
          });
          setIsResetedCardsBeingShown(false);

          const wasTheLastCardReseted = resetedCards.some(
            (card) => cards?.data?.cards[index].id === card.id
          );

          if (wasTheLastCardReseted) {
            setCardsCounter({
              ...cardsCounter,
              [lastCardGroup]: cardsCounter[lastCardGroup] + 1,
              resetedCards: cardsCounter.resetedCards - 1,
            });
            setResetedCards(
              resetedCards.filter(
                (card) => cards?.data?.cards[index].id !== card.id
              )
            );
          }

          return;
        }

        if (isTheFinalResetedCard) {
        }
        setCardsCounter({
          ...cardsCounter,
          resetedCards: cardsCounter.resetedCards + 1,
        });
        setResetedCardsIndex(resetedCardsIndex - 1);

        return;
      }
      const cardGroup = checkCardGroup(cards?.data?.cards[index - 1]);

      setCardsCounter({
        ...cardsCounter,
        [cardGroup]: cardsCounter[cardGroup] + 1,
      });

      const wasCardReseted = resetedCards.some(
        (card) => cards?.data?.cards[index - 1 ? index - 1 : 0].id === card.id
      );

      if (wasCardReseted) {
        setCardsCounter({
          ...cardsCounter,
          [cardGroup]: cardsCounter[cardGroup] + 1,
          resetedCards: cardsCounter.resetedCards - 1,
        });
        setResetedCards(
          resetedCards.filter(
            (card) =>
              cards?.data?.cards[index - 1 ? index - 1 : 0].id !== card.id
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
    setCardsCounter(countCardAmountGroups(cards?.data?.cards));
  }, [cards]);

  return (
    <section className="flex flex-col items-center gap-4 p-4 min-h-[85vh]">
      <div className="flex items-center w-full md:w-[80%] justify-between text-lg font-semibold">
        <div className="flex gap-1">
          <span className="text-blue-500">{cardsCounter.newCards}</span>
          <span className="text-red-500">{cardsCounter.resetedCards}</span>
          <span className="text-green-500">{cardsCounter.reviewCards}</span>
        </div>
        <div className="flex gap-4">
          <button
            className="py-[6px] px-4 bg-gray-300 dark:text-gray-300 dark:bg-neutral-900 rounded"
            disabled={isReturnOneCardDisable}
            onClick={onReturnOneCard}
          >
            <BackIcon />
          </button>
          <button className="py-[6px] px-4 bg-gray-300 dark:text-gray-300 dark:bg-neutral-900 rounded">
            Edit
          </button>
        </div>
      </div>

      <div className="mx-auto w-full md:max-w-[80%]">
        <div className="flex flex-col gap-4  shadow-md w-full p-4 rounded-tl-md rounded-tr-md text-center bg-gray-300 dark:bg-neutral-900 dark:text-gray-300 ">
          <h2 className="py-2 font-semibold text-lg">
            {isResetedCardsBeingShown
              ? resetedCards[resetedCardsIndex]?.front
              : cards?.data?.cards?.[index]?.front}
          </h2>
          <div className="border-b-2 border-b-gray-400 dark:border-b-neutral-700 pb-2"></div>
        </div>
        <div
          className={`shadow-md w-full p-4  bg-gray-300 dark:bg-neutral-900 dark:text-gray-300  text-start transition-transform ease-in origin-top ${
            isShowingAnswer ? "scale-y-100 h-full" : "scale-y-0 h-[1px]"
          }`}
        >
          {isResetedCardsBeingShown
            ? resetedCards?.[resetedCardsIndex]?.back
            : cards?.data?.cards?.[index]?.back}
        </div>
      </div>

      <div className="flex gap-4 text-white mt-auto font-semibold">
        {isShowingAnswer ? (
          <>
            <button
              className="py-2 px-4 rounded bg-red-500"
              onClick={onReset}
              disabled={isResetedCardsBeingShown}
            >
              reset
            </button>
            <button className="py-2 px-4 rounded text-black bg-gray-300">
              hard
            </button>
            <button className="py-2 px-4 rounded text-black bg-green-500">
              good
            </button>
            <button className="py-2 px-4 rounded bg-blue-500" onClick={onEasy}>
              easy
            </button>
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
