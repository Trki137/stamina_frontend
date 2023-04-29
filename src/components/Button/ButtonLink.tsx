import React from "react";
import { Link } from "react-router-dom";

type ButtonLinkType = {
  text: string;
  address: string;
};
export default function ButtonLink({ text, address }: ButtonLinkType) {
  return (
    <Link
      to={address}
      className="block  text-sm font-medium leading-5  bg-[#917543] w-1/2 text-white mx-auto px-4 py-2 rounded-lg text-center duration-300 ease-in-out active:scale-95"
    >
      {text}
    </Link>
  );
}