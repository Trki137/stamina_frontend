import React from "react";

import Select from "react-tailwindcss-select";
import { SelectValue } from "react-tailwindcss-select/dist/components/type";

type SelectType = {
  placeholder: string | undefined;
  options:
    | {
        value: string;
        label: string;
      }[]
    | null;

  onChange: (value: SelectValue) => void;

  value: SelectValue;
  isMultiple: boolean;
  fixedWidth: boolean;
  searchable?: boolean;
};

export default function MySelect({
  placeholder,
  options,
  onChange,
  value,
  isMultiple,
  fixedWidth,
  searchable,
}: SelectType) {
  const className = fixedWidth
    ? "relative h-10 w-full min-w-[200px]"
    : "relative h-10 ";
  return (
    <div className={className}>
      {options && (
        <Select
          placeholder={placeholder}
          primaryColor={"sky"}
          options={options}
          value={value}
          onChange={onChange}
          isMultiple={isMultiple}
          isSearchable={searchable ? searchable : false}
        />
      )}
    </div>
  );
}
