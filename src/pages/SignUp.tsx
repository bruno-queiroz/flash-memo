import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Form from "../components/Form";
import Input from "../components/Input";
import { useMutation } from "react-query";
import { postUser } from "../fetch/postUser";

export interface UserForm {
  name: string;
  password: string;
}

const SignUp = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const { mutate: newUserMutation } = useMutation((user: UserForm) =>
    postUser(user)
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = {
      name: nameInputRef.current?.value!,
      password: passwordInputRef.current?.value!,
    };

    if (newUser.name && newUser.password) {
      newUserMutation(newUser);
    }
  };
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
