import React from "react";

type ChallengePlaceholderType = {
  addMinHeight: boolean;
  handleOpenModal: () => void;
};

export default function ChallengePlaceholder({
  addMinHeight,
  handleOpenModal,
}: ChallengePlaceholderType) {
  const className = addMinHeight
    ? "cursor-pointer flex items-center min-h-[380px] justify-center relative mx-auto h-auto w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow px-5 hover:shadow-lg"
    : "cursor-pointer flex items-center justify-center relative mx-auto h-auto w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow px-5 hover:shadow-lg";

  return (
    <div onClick={handleOpenModal} className={className}>
      <div className="text-[25px] border rounded-full px-[12px] text-center">
        +
      </div>
    </div>
  );
}
