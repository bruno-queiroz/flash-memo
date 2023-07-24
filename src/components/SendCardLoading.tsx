const Spinner = () => {
  return (
    <div
      className={`w-[20px] mx-auto h-[20px] rounded-[50%] border-t-neutral-950 dark:border-t-white border-t-[4px] bg-transparent border-l-neutral-950 dark:border-l-white border-l-[4px] border-transparent border-[4px] animate-spin`}
    />
  );
};

const SendCardLoading = () => {
  return (
    <span className="flex gap-2 border-l-neutral-800 items-center text-neutral-800 dark:text-white">
      Sending card... <Spinner />
    </span>
  );
};

export default SendCardLoading;
