import { UserForm } from "../pages/SignUp";

interface SignInData {
  isOk?: boolean | undefined;
  msg?: string | undefined;
  data?: UserForm | undefined;
}

const LoginNotification = (data: SignInData) => {
  return (
    <div
      className={`text-red-500 text-center ${
        data?.isOk === true ? "hidden" : "block"
      }`}
    >
      {data?.msg}
    </div>
  );
};

export default LoginNotification;
