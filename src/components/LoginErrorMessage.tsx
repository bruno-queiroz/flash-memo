const LoginNotification = ({ errorMessage }: { errorMessage?: string }) => {
  return <div className="text-red-500 text-center">{errorMessage}</div>;
};

export default LoginNotification;
