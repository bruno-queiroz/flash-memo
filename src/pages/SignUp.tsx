import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import Input from "../components/Input";
import { useMutation } from "react-query";
import { postUser } from "../fetch/postUser";
import LoginNotification from "../components/LoginNotification";
import LoadSpinner from "../components/LoadSpinner";

export interface UserForm {
  name: string;
  password: string;
}

const SignUp = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const {
    mutate: newUserMutation,
    isLoading,
    data,
  } = useMutation((user: UserForm) => postUser(user));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nameInputRef.current && passwordInputRef.current) {
      const newUser = {
        name: nameInputRef.current?.value,
        password: passwordInputRef.current?.value,
      };
      newUserMutation(newUser);
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
        Sign Up
      </h1>
      <Form onSubmit={onSubmit}>
        <Input labelText="Your Name" required type="text" ref={nameInputRef} />
        <Input
          labelText="Create your password"
          required
          type="password"
          ref={passwordInputRef}
        />

        <button className="bg-primary-yellow py-2 px-4 rounded w-[max-content] mx-auto mt-4 text-white">
          {isLoading ? <LoadSpinner /> : "Sign Up"}
        </button>
        <LoginNotification {...data} />
        <Link to="/sign-in" className="text-center dark:text-gray-300 ">
          Already have an account? click here
        </Link>
      </Form>
    </section>
  );
};

export default SignUp;
