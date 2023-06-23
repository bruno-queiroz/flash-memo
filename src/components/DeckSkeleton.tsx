const DeckSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 max-w-[900px] w-full mx-auto">
      <div className="flex h-[56px] p-4 items-center rounded-lg dark:bg-neutral-900 shadow-sm bg-gray-200">
        <div className="flex flex-1">
          <span className="w-[130px] h-[7px] bg-gray-500"></span>
        </div>
        <div className="flex gap-1">
          <span className="bg-gray-500 font-semibold w-[6px] h-[15px]"></span>
          <span className="bg-gray-500 font-semibold w-[6px] h-[15px]"></span>
          <span className="bg-gray-500 font-semibold w-[6px] h-[15px]"></span>
        </div>
      </div>

      <div className="flex h-[56px] p-4 items-center rounded-lg dark:bg-neutral-900 shadow-sm bg-gray-200">
        <div className="flex flex-1">
          <span className="w-[180px] h-[7px] bg-gray-500"></span>
        </div>
        <div className="flex gap-1">
          <span className="bg-gray-500 font-semibold w-[6px] h-[15px]"></span>
          <span className="bg-gray-500 font-semibold w-[6px] h-[15px]"></span>
          <span className="bg-gray-500 font-semibold w-[6px] h-[15px]"></span>
        </div>{" "}
      </div>
      <div className="flex h-[56px] p-4 items-center rounded-lg dark:bg-neutral-900 shadow-sm bg-gray-200">
        <div className="flex flex-1">
          <span className="w-[90px] h-[7px] bg-gray-500"></span>
        </div>
        <div className="flex gap-1">
          <span className="bg-gray-500 font-semibold w-[6px] h-[15px]"></span>
          <span className="bg-gray-500 font-semibold w-[6px] h-[15px]"></span>
          <span className="bg-gray-500 font-semibold w-[6px] h-[15px]"></span>
        </div>
      </div>
      <div className="flex h-[56px] p-4 items-center rounded-lg dark:bg-neutral-900 shadow-sm bg-gray-200">
        <div className="flex flex-1">
          <span className="w-[230px] h-[7px] bg-gray-500"></span>
        </div>
        <div className="flex gap-1">
          <span className="bg-gray-500 font-semibold w-[6px] h-[15px]"></span>
          <span className="bg-gray-500 font-semibold w-[6px] h-[15px]"></span>
          <span className="bg-gray-500 font-semibold w-[6px] h-[15px]"></span>
        </div>
      </div>
      <div className="flex h-[56px] p-4 items-center rounded-lg dark:bg-neutral-900 shadow-sm bg-gray-200">
        <div className="flex flex-1">
          <span className="w-[155px] h-[7px] bg-gray-500"></span>
        </div>
        <div className="flex gap-1">
          <span className="bg-gray-500 font-semibold w-[6px] h-[15px]"></span>
          <span className="bg-gray-500 font-semibold w-[6px] h-[15px]"></span>
          <span className="bg-gray-500 font-semibold w-[6px] h-[15px]"></span>
        </div>
      </div>
    </div>
  );
};

export default DeckSkeleton;
