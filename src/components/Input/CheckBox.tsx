import React, { useEffect, useState } from "react";

type CheckBoxType = {
  name: string;
  value: string;
  handleChange: (value: string) => void;
  clear: boolean;
};
export default function CheckBox({
  name,
  value,
  handleChange,
  clear,
}: CheckBoxType) {
  const [checked, setChecked] = useState<boolean>(false);
  useEffect(() => {
    setChecked(false);
  }, [clear]);

  return (
    <div className="flex items-center mt-1">
      <input
        checked={checked}
        onChange={(e) => {
          setChecked((prevChecked) => !prevChecked);
          handleChange(e.target.name);
        }}
        name={name}
        type="checkbox"
        value={value}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
      />
      <label
        htmlFor="checked-checkbox"
        className="ml-2 text-sm font-medium text-gray-900"
      >
        {value}
      </label>
    </div>
  );
}
