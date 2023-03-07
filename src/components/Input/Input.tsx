import React, { ChangeEvent } from "react";

type InputType = {
  type: string;
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
};

export default function Input({ type, value, handleChange, label }: InputType) {
  return (
    <div className="relative">
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={handleChange}
          id="floating_outlined"
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#917543] peer"
          placeholder=" "
        />
        <label
          htmlFor="floating_outlined"
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#917543] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
          {label}
        </label>
      </div>
    </div>
  );
}
