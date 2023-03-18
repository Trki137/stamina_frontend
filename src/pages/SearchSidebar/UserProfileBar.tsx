import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button/Button";

export default function UserProfileBar() {
  const handleFollow = () => {
    console.log("Follow");
  };

  return (
    <div className="flex items-center p-5 cursor-pointer hover:bg-gray-200">
      <div className="w-2/12 text-gray-800">
        <FontAwesomeIcon
          icon={faUserCircle}
          className="w-9 h-9 rounded-full "
        />
      </div>
      <div className="w-5/12">
        <p className="text-md font-bold">Trki</p>
        <p className="flex flex-row items-center text-[0.5rem] font-extralight text-gray-400">
          Dean Trkulja
          <FontAwesomeIcon icon={faCircle} className="w-1 h-1 mx-1" />
          350 pratitelja
        </p>
      </div>
      <div className="w-5/12 h-1/6">
        <Button text="Follow" handleClick={handleFollow} />
      </div>
    </div>
  );
}
