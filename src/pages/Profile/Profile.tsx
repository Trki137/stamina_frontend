import React, { useState } from "react";
import ProfileHead from "./ProfileHead";
import Tab from "../../components/Tab/Tab";

export default function Profile() {
  const [tabIndexActive, setTabIndexActive] = useState<number>(0);
  return (
    <div className="w-full">
      <div className="w-10/12 m-auto">
        <ProfileHead />
        <Tab
          setTabIndexActive={setTabIndexActive}
          tabIndexActive={tabIndexActive}
          headElements={["Challenge", "Event"]}
        />
      </div>
    </div>
  );
}

