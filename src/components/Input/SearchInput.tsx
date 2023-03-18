import React, { ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

type SearchInputType = {
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchInput({ value, handleChange }: SearchInputType) {
  return (
    <div className="flex items-center">
      <div className="relative w-[90%] m-auto mt-3">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
          placeholder="Search..."
          onChange={handleChange}
          value={value}
        />
      </div>
    </div>
  );
}
