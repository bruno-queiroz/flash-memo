import React from "react";
import { Link } from "react-router-dom";
import Form from "../components/Form";
import Input from "../components/Input";

const SignUp = () => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("oi");
  };
  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold my-8 dark:text-aqua-blue text-dark-blue text-center">
        Sign Up
      </h1>
      <Form onSubmit={onSubmit}>
        <Input labelText="Your Name" required type="text" />
        <Input labelText="Create your password" required type="password" />

        <button className="bg-primary-yellow py-2 px-4 rounded w-[max-content] mx-auto mt-4 text-white">
          Sign Up
        </button>
        <Link to="/sign-in" className="text-center dark:text-gray-300 ">
          Already have an account? click here
        </Link>
      </Form>
    </section>
  );
};

export default SignUp;
