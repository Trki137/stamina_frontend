import React, { useState } from "react";
import Tab from "../../components/Tab/Tab";
import HandInput from "./HandInput";
import FileInput from "./FileInput";

export default function InputData() {
  const [tabIndexActive, setTabIndexActive] = useState<number>(0);
  return (
    <div className="w-full">
      <div className="flex w-full">
        <Tab
          setTabIndexActive={setTabIndexActive}
          tabIndexActive={tabIndexActive}
          headElements={["By Hand", "File"]}
        />
      </div>
      {tabIndexActive === 0 && <HandInput />}
      {tabIndexActive === 1 && <FileInput />}
    </div>
  );
}
