import React, { useEffect, useRef } from "react";
import Form from "../components/Form";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { postSignIn } from "../fetch/postSignIn";
import { UserForm } from "./SignUp";
import Notification from "../components/Notification";
import LoadSpinner from "../components/LoadSpinner";

const SignIn = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const {
    mutate: userSignInMutate,
    data,
    isLoading,
  } = useMutation((user: UserForm) => postSignIn(user));

  const signIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      name: nameInputRef.current?.value!,
      password: passwordInputRef.current?.value!,
    };

    if (user.name && user.password) {
      userSignInMutate(user);
    }
  };

  useEffect(() => {
    if (data?.isOk) {
      navigate("/decks");
    }
  }, [data]);

  return (
    <section className="flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold my-8 dark:text-aqua-blue text-dark-blue text-center">
        Sign In
      </h1>

      <Form onSubmit={signIn}>
        <Input labelText="Your Name" required ref={nameInputRef} />
        <Input labelText="Your Password" required ref={passwordInputRef} />
        <button className="bg-primary-yellow py-2 px-4 min-w-[80px] rounded w-[max-content] mx-auto mt-4 text-white">
          {isLoading ? <LoadSpinner /> : "Sign In"}
        </button>
        <Notification {...data} />
        <Link to="/sign-up" className="text-center dark:text-gray-300 ">
          Don't have an account? click here
        </Link>
      </Form>
    </section>
  );
};

export default SignIn;
