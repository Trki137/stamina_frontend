import React from "react";

import Select from "react-tailwindcss-select";
import { SelectValue } from "react-tailwindcss-select/dist/components/type";

type SelectType = {
  placeholder: string;
  options:
    | {
        value: string;
        label: string;
      }[]
    | null;

  onChange: (value: SelectValue) => void;

  value: SelectValue;
  isMultiple: boolean;
};

export default function MySelect({
  placeholder,
  options,
  onChange,
  value,
  isMultiple,
}: SelectType) {
  return (
    <div className="relative h-10 w-72 min-w-[200px]">
      {options && (
        <Select
          placeholder={placeholder}
          primaryColor={"sky"}
          options={options}
          value={value}
          onChange={onChange}
          isMultiple={isMultiple}
        />
      )}
    </div>
  );
}
