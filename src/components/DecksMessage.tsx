const DecksMessage = ({ message }: { message: string }) => {
  return (
    <div className="dark:bg-neutral-900 shadow-md bg-gray-200 px-4 py-8 rounded w-full text-center mx-auto">
      {message}
    </div>
  );
};

export default DecksMessage;
