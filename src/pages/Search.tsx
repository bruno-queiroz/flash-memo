import React, { useRef } from "react";
import SearchCard from "../components/SearchCard";
import { getSearchedCards } from "../fetch/getSearchedCards";
import { useQuery } from "react-query";
import { getDecks } from "../fetch/getDecks";
import CardNotFound from "../components/CardNotFound";
import EditCardModal from "../components/EditCardModal";
import CRUDNotification from "../components/CRUDNotification";
import LoadDot from "../components/LoadDot";

const Search = () => {
  const deckSelectRef = useRef<HTMLSelectElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { data, refetch, isError, error, isFetching } = useQuery(
    ["searchCards"],
    () =>
      getSearchedCards(
        deckSelectRef.current?.value,
        searchInputRef.current?.value
      ),
    {
      retry: 0,
    }
  );

  const { data: decks } = useQuery("decksData", () => getDecks());

  const onSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (deckSelectRef.current?.value && searchInputRef.current?.value) {
      refetch();
    }
  };

  return (
    <>
      <CRUDNotification />
      <EditCardModal />

      <section className="flex flex-col items-center p-4 dark:text-gray-300 text-black">
        <h1 className="font-bold text-center text-4xl text-dark-blue dark:text-white">
          Search a Card
        </h1>
        <div className="max-w-[900px] w-full">
          <form
            className="flex flex-col gap-4 items-center mx-auto mt-8"
            onSubmit={onSearch}
          >
            <label className="flex items-center gap-3">
              <span>Select a deck</span>
              <select
                className="bg-gray-200 dark:bg-neutral-900 p-1"
                ref={deckSelectRef}
              >
                {decks?.data?.map((deck) => (
                  <option value={deck?.id} key={deck?.id}>
                    {deck?.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex gap-2 w-full">
              <input
                type="text"
                aria-label="search card"
                autoFocus
                className="bg-gray-200 dark:bg-neutral-900 w-full p-2"
                ref={searchInputRef}
                required
              />
              <button className="bg-dark-blue dark:bg-aqua-blue dark:text-neutral-900 font-semibold text-white p-2 rounded-tr">
                Search
              </button>
            </div>
          </form>

          <div className="flex flex-col gap-4 mt-8">
            {isFetching ? (
              <LoadDot />
            ) : isError ? (
              <CardNotFound errorMessage={(error as Error).message} />
            ) : (
              data?.data?.cards?.map((card) => (
                <SearchCard {...card} key={card?.id} />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
