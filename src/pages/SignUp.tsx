import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import Input from "../components/Input";
import { useMutation } from "react-query";
import { postSignUp } from "../fetch/postSignUp";
import LoginErrorMessage from "../components/LoginErrorMessage";
import LoadSpinner from "../components/LoadSpinner";
import { useFlashMemoStore } from "../context/zustandStore";

export interface UserForm {
  name: string;
  password: string;
}

const SignUp = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const {
    mutateAsync: newUserMutation,
    isLoading,
    error,
  } = useMutation((user: UserForm) => postSignUp(user));

  const setIsUserLogged = useFlashMemoStore((state) => state.setIsUserLogged);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nameInputRef.current && passwordInputRef.current) {
      const newUser = {
        name: nameInputRef.current?.value,
        password: passwordInputRef.current?.value,
      };

      try {
        await newUserMutation(newUser);

        setIsUserLogged(true);
        navigate("/decks");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <section className="flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold my-8 dark:text-white text-dark-blue text-center">
        Sign Up
      </h1>
      <Form onSubmit={onSubmit}>
        <Input
          labelText="Your Name"
          required
          type="text"
          ref={nameInputRef}
          autoFocus
        />
        <Input
          labelText="Create your password"
          required
          type="password"
          ref={passwordInputRef}
        />

        <button className="bg-primary-yellow py-2 px-4 rounded w-[max-content] mx-auto mt-4 text-white font-semibold">
          {isLoading ? <LoadSpinner /> : "Sign Up"}
        </button>
        <LoginErrorMessage errorMessage={(error as Error)?.message} />
        <Link to="/sign-in" className="text-center dark:text-gray-300 ">
          Already have an account? click here
        </Link>
      </Form>
    </section>
  );
};

export default SignUp;
