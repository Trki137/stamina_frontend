import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-brands-svg-icons";

type ButtonType = {
  text?: string;

  icon?: IconDefinition;
  handleClick?: () => void;
  myStyle?: string;
};

export default function Button({
  handleClick,
  text,
  icon,
  myStyle,
}: ButtonType) {
  return (
    <button
      className={
        myStyle
          ? myStyle
          : "block text-sm font-medium leading-5 bg-[#917543] w-full text-white mx-auto px-4 py-2 rounded-lg text-center duration-300 ease-in-out active:scale-95"
      }
      type="button"
      onClick={handleClick}
    >
      {text}
      {icon && <FontAwesomeIcon icon={icon} className="px:1" />}
    </button>
  );
}
