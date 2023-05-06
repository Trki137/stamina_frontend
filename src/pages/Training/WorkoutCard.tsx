import React, { Dispatch, SetStateAction } from "react";

type WorkoutCardType = {
  middle: boolean;
  top: boolean;
  text: string;
  hidden: boolean;
  setActiveWorkoutIndex: Dispatch<SetStateAction<number>>;
};
export default function WorkoutCard({
  middle,
  top,
  text,
  hidden,
  setActiveWorkoutIndex,
}: WorkoutCardType) {
  let className = middle
    ? "cursor-pointer opacity-100 transition-all ease-in-out duration-[2000] translate-y-[0] w-full absolute z-20 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
    : top
    ? "cursor-pointer w-full absolute transition-all ease-in-out duration-[2000] translate-y-[-44px] scale-85 block max-w-sm p-6 bg-gray-50 border border-gray-200 rounded-lg opacity-60"
    : "cursor-pointer w-full absolute transition-all ease-in-out duration-[2000] translate-y-[44px] scale-85 block max-w-sm p-6 bg-gray-50 border border-gray-200 rounded-lg opacity-60";

  if (hidden) {
    className = top
      ? "z-[-1] opacity-0 translate-y-[-44px]"
      : "z-[-1] opacity-0 translate-y-[44px]";
  }
  const handleClick = () => {
    if (middle) return;
    setActiveWorkoutIndex((prev) => (top ? --prev : ++prev));
  };
  return (
    <div className={className} onClick={handleClick}>
      {text}
    </div>
  );
}
