import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

type TextareaType = {
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  error?: boolean;
};

export default function Textarea({
  placeholder,
  value,
  setValue,
  error,
}: TextareaType) {
  const className = error
    ? "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-red-800 border-2 focus:ring-blue-500 focus:border-blue-500 "
    : "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 ";

  return (
    <textarea
      rows={4}
      className={className}
      placeholder={placeholder}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
        setValue(e.target.value)
      }
      value={value}
    ></textarea>
  );
}
