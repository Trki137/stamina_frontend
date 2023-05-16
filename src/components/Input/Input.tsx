import React, { ChangeEvent } from "react";
import { userInputType } from "../../@types/LoginTypes";

type InputType = {
  inputInfo: userInputType;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error: null | string;
};

export default function Input({ inputInfo, handleChange, error }: InputType) {
  const inputClass = error
    ? "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-[1px] border-red-600 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"
    : "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#917543] peer";

  return (
    <div>
      <div className="relative">
        <input
          type={inputInfo.type}
          value={inputInfo.value}
          name={inputInfo.name}
          onChange={handleChange}
          className={inputClass}
          style={{}}
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_outlined"
          style={{ color: error ? "#E53E3E" : "#9E9E9E" }}
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#917543] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
          {inputInfo.label}
        </label>
      </div>
      <p id="outlined_error_help" className="mt-2 text-xs text-red-600">
        {error}
      </p>
    </div>
  );
}
