import React, { Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button/Button";
import { SearchBarUser } from "../../@types/UserType";
import axios from "axios";
import { backend_paths } from "../../api/backend_paths";

type UserProfileBarType = {
  user: SearchBarUser;

  setUsers: Dispatch<SetStateAction<SearchBarUser[]>>;
};
export default function UserProfileBar({ user, setUsers }: UserProfileBarType) {
  const handleUnFollow = (userId: number) => {
    let currentUserId = localStorage.getItem("staminaUser");
    if (currentUserId == null) return;
    currentUserId = JSON.parse(currentUserId).userid;

    const data = {
      followed: userId,
      followedBy: currentUserId,
    };

    axios
      .post(`${backend_paths.USERS_URL}/unfollow`, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setUsers((prevUsers) => {
          const newData = [...prevUsers];
          const index = newData.findIndex((user) => user.userid === userId);
          const followers = parseInt(newData[index].followedby) - 1;
          newData[index].followedby = `${followers}`;
          newData[index].isfollowing = "0";
          return newData;
        });
      });
  };
  const handleFollow = (userId: number) => {
    let currentUserId = localStorage.getItem("staminaUser");
    if (currentUserId == null) return;
    currentUserId = JSON.parse(currentUserId).userid;

    const data = {
      followed: userId,
      followedBy: currentUserId,
    };

    axios
      .post(`${backend_paths.USERS_URL}/follow`, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setUsers((prevUsers) => {
          const newData = [...prevUsers];
          const index = newData.findIndex((user) => user.userid === userId);
          const followers = parseInt(newData[index].followedby) + 1;
          newData[index].followedby = `${followers}`;
          newData[index].isfollowing = "1";
          return newData;
        });
      });
  };

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
        {user.isfollowing === "0" && (
          <Button text="Follow" handleClick={() => handleFollow(user.userid)} />
        )}

        {user.isfollowing === "1" && (
          <Button
            text="Unfollow"
            handleClick={() => handleUnFollow(user.userid)}
          />
        )}
      </div>
    </div>
  );
}
