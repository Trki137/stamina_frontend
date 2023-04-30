import React from "react";

type ButtonType = {
  text: string;
  handleClick?: () => void;
  disabled?: boolean;
};

export default function ProfileButton({
  handleClick,
  text,
  disabled,
}: ButtonType) {
  return (
    <button
      className="block  text-sm font-medium leading-5 bg-[#917543] w-1/2 text-white mx-auto px-4 py-2 rounded-lg text-center duration-300 ease-in-out active:scale-95"
      type="button"
      onClick={handleClick}
      disabled={disabled ? disabled : false}
    >
      {text}
    </button>
  );
}
