import React, { useEffect, useRef } from "react";
import Form from "../components/Form";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { postSignIn } from "../fetch/postSignIn";
import { UserForm } from "./SignUp";
import LoginErrorMessage from "../components/LoginErrorMessage";
import LoadSpinner from "../components/LoadSpinner";
import { useFlashMemoStore } from "../context/zustandStore";
import SessionExpiredModal from "../components/SessionExpiredModal";

const SignIn = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const {
    mutateAsync: userSignInMutate,
    error,
    isLoading,
  } = useMutation((user: UserForm) => postSignIn(user));
  const navigate = useNavigate();
  const setIsUserLogged = useFlashMemoStore((state) => state.setIsUserLogged);

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nameInputRef.current && passwordInputRef.current) {
      const user = {
        name: nameInputRef.current?.value,
        password: passwordInputRef.current?.value,
      };

      try {
        await userSignInMutate(user);

        setIsUserLogged(true);
        navigate("/decks");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <section className="flex flex-col items-center justify-center p-4">
      <SessionExpiredModal />
      <h1 className="text-4xl font-bold my-8 dark:text-aqua-blue text-dark-blue text-center">
        Sign In
      </h1>

      <Form onSubmit={signIn}>
        <Input labelText="Your Name" required ref={nameInputRef} />
        <Input
          labelText="Your Password"
          type="password"
          required
          ref={passwordInputRef}
        />
        <button className="bg-primary-yellow py-2 px-4 min-w-[80px] rounded w-[max-content] mx-auto mt-4 text-white">
          {isLoading ? <LoadSpinner /> : "Sign In"}
        </button>
        <LoginErrorMessage errorMessage={(error as Error)?.message} />
        <Link to="/sign-up" className="text-center dark:text-gray-300 ">
          Don't have an account? click here
        </Link>
      </Form>
    </section>
  );
};

export default SignIn;
