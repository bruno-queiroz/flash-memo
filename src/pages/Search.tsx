import React from "react";
import SearchCard from "../components/SearchCard";

const Search = () => {
  return (
    <section className="flex flex-col items-center p-4 dark:text-gray-300 text-black">
      <h1 className="font-bold text-center text-4xl text-dark-blue dark:text-aqua-blue">
        Search a Card
      </h1>
      <div className="max-w-[900px] w-full">
        <form className="flex flex-col gap-4 items-center mx-auto mt-8">
          <label className="flex items-center gap-3">
            <span>Select a deck</span>
            <select className="bg-gray-200 dark:bg-neutral-900 p-1">
              <option value="test">test</option>
              <option value="test2">test2</option>
            </select>
          </label>
          <div className="flex gap-2 w-full">
            <input
              type="text"
              aria-label="search card"
              className="bg-gray-200 dark:bg-neutral-900 w-full p-2"
            />
            <button className="bg-dark-blue dark:bg-aqua-blue dark:text-neutral-900 font-semibold text-white p-2 rounded-tr">
              Search
            </button>
          </div>
        </form>

        <div className="flex flex-col gap-4 mt-8">
          <SearchCard />
        </div>
      </div>
    </section>
  );
};

export default Search;
