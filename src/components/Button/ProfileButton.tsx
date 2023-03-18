import React from "react";

type ButtonType = {
  text: string;
  handleClick?: () => void;
};

export default function ProfileButton({ handleClick, text }: ButtonType) {
  return (
    <button
      className="block text-center w-full text-sm font-medium leading-5 text-center bg-[#917543] w-1/2 text-white mx-auto px-4 py-2 rounded-lg text-center duration-300 ease-in-out active:scale-95"
      type="button"
      onClick={handleClick}
    >
      {text}
    </button>
  );
}
