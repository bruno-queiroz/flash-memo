const CardNotFound = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div className="grid place-items-center bg-gray-200 dark:bg-neutral-900 rounded p-4">
      {errorMessage}
    </div>
  );
};

export default CardNotFound;
