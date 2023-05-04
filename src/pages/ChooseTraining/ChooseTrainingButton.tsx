import React from "react";

type ChooseTrainingButtonType = {
  handleClick: () => void;
};

export default function ChooseTrainingButton({
  handleClick,
}: ChooseTrainingButtonType) {
  return (
    <button
      onClick={handleClick}
      className="border border-gray-400 text-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline"
    >
      SELECT WORKOUT
    </button>
  );
}
