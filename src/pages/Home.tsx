import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="flex flex-col">
      <main className="flex flex-col gap-6 items-center text-center py-36 px-4">
        <div className="max-w-[500px]">
          <h1 className="text-4xl font-bold text-dark-blue mb-4">
            <span className="text-aqua-blue">Memorize</span> anything you need
          </h1>
          <p className="text-gray-900">
            Flash Memo can help you improve your vocabulary, ace exams, enhance
            your study skills, and achieve even more.
          </p>
        </div>

        <Link
          to="/sign-up"
          className="px-4 py-3 text-white font-semibold rounded bg-primary-yellow"
        >
          Sign up now
        </Link>
      </main>
      <section className="flex flex-col items-center text-center py-36 bg-[#5fa8d3] px-4">
        <h2 className="text-[1.6rem] font-bold text-white mb-4">
          A <span className="text-primary-yellow">Flash Cards</span> and{" "}
          <span className="text-primary-yellow">Spaced Repetetition</span> based
          app
        </h2>
        <p className="max-w-[500px] text-white">
          Spaced repetition helps you remember information more effectively and
          for longer periods of time by spacing out review sessions at optimal
          intervals based on your performance, saving time and improving
          retention compared to cramming or passive studying.
        </p>
      </section>
    </section>
  );
};

export default Home;
