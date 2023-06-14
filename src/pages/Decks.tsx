import { DeckStatus } from "../components/DeckStatus";
import CreateDeckModal from "../components/CreateDeckModal";
import { useQuery } from "react-query";
import { getDecks } from "../fetch/getDecks";
import { useFlashMemoStore } from "../context/zustandStore";
import DeleteDeckModal from "../components/DeleteDeckModal";
import CRUDNotification from "../components/CRUDNotification";
import EditDeckNameModal from "../components/EditDeckNameModal";
import DeckSkeleton from "../components/DeckSkeleton";

const Decks = () => {
  const { data: decks, isLoading } = useQuery(["decksData"], () => getDecks());
  const setIsCreateDeckModalOpen = useFlashMemoStore(
    (state) => state.setIsCreateDeckModalOpen
  );

  return (
    <section className="flex flex-col gap-6 items-center p-4 dark:text-gray-300 min-h-screen">
      <CRUDNotification />
      <DeleteDeckModal />
      <CreateDeckModal />
      <EditDeckNameModal />
      <h1 className="font-bold text-center text-4xl text-dark-blue dark:text-white">
        Decks
      </h1>

      <div className="flex flex-col gap-2 max-w-[900px] w-full">
        {isLoading ? (
          <DeckSkeleton />
        ) : (
          decks?.data?.map((deck) => <DeckStatus {...deck} key={deck.id} />)
        )}
      </div>

      <button
        type="button"
        className="bg-primary-yellow py-2 px-4 rounded w-[max-content] mx-auto mt-4 text-white font-semibold"
        onClick={() => setIsCreateDeckModalOpen(true)}
      >
        Create Deck
      </button>
    </section>
  );
};

export default Decks;
