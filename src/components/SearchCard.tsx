import { Card } from "../fetch/getStudyDeck";
import { RiDeleteBin7Line as DeleteIcon } from "react-icons/ri";
import moment from "moment";
import { useFlashMemoStore } from "../context/zustandStore";
import { useMutation, useQueryClient } from "react-query";
import { deleteCard } from "../fetch/deleteCard";
import LoadSpinner from "./LoadSpinner";

const SearchCard = ({ front, back, reviewAt, id }: Card) => {
  const queryClient = useQueryClient();
  const setIsEditModalOpen = useFlashMemoStore(
    (state) => state.setIsEditModalOpen
  );
  const isUserLogged = useFlashMemoStore((state) => state.isUserLogged);
  const setNotificationContent = useFlashMemoStore(
    (state) => state.setNotificationContent
  );
  const { mutateAsync: deleteCardMutate, isLoading } = useMutation(
    ({ cardId, isUserLogged }: { cardId: string; isUserLogged: boolean }) =>
      deleteCard(cardId, isUserLogged),
    {
      onSuccess: () => queryClient.invalidateQueries("searchCards"),
    }
  );

  const setCardEditData = useFlashMemoStore((state) => state.setCardEditData);

  const openEditModal = () => {
    setCardEditData({ front, back, id });
    setIsEditModalOpen(true);
  };

  const deleteSeletedCard = async () => {
    try {
      const data = await deleteCardMutate({ cardId: id, isUserLogged });
      setNotificationContent({
        isNotificationShowing: true,
        isOk: true,
        msg: data?.msg,
      });
    } catch (err) {
      const errMsg = (err as Error).message;

      setNotificationContent({
        isNotificationShowing: true,
        isOk: true,
        msg: errMsg,
      });
    }
  };

  const ReviewAtNotNull = reviewAt || 1000;
  const isCardAvailable =
    new Date().getTime() < new Date(ReviewAtNotNull).getTime();

  return (
    <article className="bg-gray-200 dark:bg-neutral-900 rounded px-4 pb-4">
      <div className="py-4">
        <h2>{front}</h2>
      </div>
      <div className="border-b-2 border-b-gray-400 dark:border-b-neutral-700" />
      <div className="py-4">
        <p>{back}</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <button
            className="bg-primary-yellow py-1 px-3 rounded font-semibold text-neutral-900"
            onClick={openEditModal}
          >
            Edit
          </button>
          <button
            className="bg-gray-300 dark:bg-neutral-800 rounded py-1 px-3"
            onClick={deleteSeletedCard}
          >
            {isLoading ? <LoadSpinner /> : <DeleteIcon />}
          </button>
        </div>
        <div>
          <span>Review in:</span>{" "}
          <span>
            {isCardAvailable ? moment(reviewAt).fromNow(true) : "available"}
          </span>
        </div>
      </div>
    </article>
  );
};

export default SearchCard;
