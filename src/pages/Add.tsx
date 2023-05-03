import React from "react";
import Form from "../components/Form";

const Add = () => {
  return (
    <section className="flex gap-4 flex-col items-center dark:text-gray-300 text-black">
      <h1 className="font-bold text-center text-4xl text-dark-blue dark:text-aqua-blue">
        Add
      </h1>

      <Form>
        <label className="flex flex-col gap-2">
          <span>Deck</span>
          <select className="dark:bg-neutral-800 bg-white p-1">
            <option value="test">Test</option>
            <option value="test2">Test2</option>
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span>Card Front</span>
          <textarea className="dark:bg-neutral-800 bg-white p-2"></textarea>
        </label>
        <label className="flex flex-col gap-2">
          <span>Card Back</span>
          <textarea className="dark:bg-neutral-800 bg-white p-2"></textarea>
        </label>
        <button className="bg-primary-yellow py-2 px-4 rounded w-[max-content] mx-auto mt-4 text-white">
          Create
        </button>
      </Form>
    </section>
  );
};

export default Add;
