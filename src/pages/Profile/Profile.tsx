import React, { useState } from "react";
import ProfileHead from "./ProfileHead";
import ProfileTab from "../../components/Button/ProfileTab";

export default function Profile() {
  const [tabIndexActive, setTabIndexActive] = useState<number>(0);
  return (
    <div className="w-full">
      <div className="w-10/12 m-auto">
        <ProfileHead />
        <ProfileTab
          setTabIndexActive={setTabIndexActive}
          tabIndexActive={tabIndexActive}
        />
      </div>
    </div>
  );
}
