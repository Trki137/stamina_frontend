import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

type TextareaType = {
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

export default function Textarea({
  placeholder,
  value,
  setValue,
}: TextareaType) {
  return (
    <textarea
      rows={4}
      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder={placeholder}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
        setValue(e.target.value)
      }
      value={value}
    ></textarea>
  );
}
