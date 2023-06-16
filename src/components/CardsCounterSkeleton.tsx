import React from "react";

const CardsCounterSkeleton = () => {
  return (
    <div className="flex gap-1">
      <span className="bg-[#05668d] w-[7px] h-[18px]"></span>
      <span className="bg-[#00a5cf] w-[7px] h-[18px]"></span>
      <span className="bg-[#25a18e] w-[7px] h-[18px]"></span>
    </div>
  );
};

export default CardsCounterSkeleton;
