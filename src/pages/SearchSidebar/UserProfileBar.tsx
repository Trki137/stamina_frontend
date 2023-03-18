import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button/Button";
import { SearchBarUser } from "../../@types/UserType";

type UserProfileBarType = {
  user: SearchBarUser;
};
export default function UserProfileBar({ user }: UserProfileBarType) {
  const handleFollow = (userId: number) => {
    console.log("Follow " + userId);
  };

  console.log(user.image);

  return (
    <div className="flex items-center p-5 cursor-pointer hover:bg-gray-200">
      <div className="w-2/12 text-gray-800">
        {user.image !== null && (
          <img
            src={`data:image/jpeg;base64,${user.image}`}
            className="w-10 h-10 rounded-full "
            alt="Can't access"
          />
        )}
        {user.image === null && (
          <FontAwesomeIcon
            icon={faUserCircle}
            className="w-9 h-9 rounded-full "
          />
        )}
      </div>
      <div className="w-5/12">
        <p className="text-md font-bold">{user.username}</p>
        <p className="flex flex-row items-center text-[0.5rem] font-extralight text-gray-400">
          Dean Trkulja
          <FontAwesomeIcon icon={faCircle} className="w-1 h-1 mx-1" />
          {user.followedby} pratitelja
        </p>
      </div>
      <div className="w-5/12 h-1/6">
        <Button text="Follow" handleClick={() => handleFollow(user.userid)} />
      </div>
    </div>
  );
}
