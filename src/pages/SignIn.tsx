import React from "react";
import Form from "../components/Form";
import Input from "../components/Input";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <section className="flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold my-8 dark:text-aqua-blue text-dark-blue text-center">
        Sign In
      </h1>

      <Form>
        <Input labelText="Your Name" />
        <Input labelText="Your Password" />
        <button className="bg-primary-yellow py-2 px-4 rounded w-[max-content] mx-auto mt-4 text-white">
          Sign In
        </button>
        <Link to="/sign-up" className="text-center dark:text-gray-300 ">
          Don't have an account? click here
        </Link>
      </Form>
    </section>
  );
};

export default SignIn;
