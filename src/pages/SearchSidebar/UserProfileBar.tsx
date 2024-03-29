import React, { Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { SearchBarUser } from "../../@types/UserType";
import axios from "axios";
import { backend_paths } from "../../api/backend_paths";
import { Link } from "react-router-dom";
import { routes } from "../../api/paths";
import Button from "../../components/Button/Button";

type UserProfileBarType = {
  user: SearchBarUser;

  setUsers: Dispatch<SetStateAction<SearchBarUser[]>>;

  handleSearchActiveChange: () => void;
};
export default function UserProfileBar({
  user,
  setUsers,
  handleSearchActiveChange,
}: UserProfileBarType) {
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

  const getImage = (image: string) => {
    if (!image.startsWith("http")) return `data:image/jpeg;base64,${image}`;
    else return image;
  };

  return (
    <div className="flex items-center p-5 cursor-pointer hover:bg-gray-200">
      <div className="w-2/12 text-gray-800">
        <Link
          to={`${routes.PROFILE}/${user.userid}`}
          onClick={handleSearchActiveChange}
        >
          {user.image !== null && (
            <img
              src={getImage(user.image)}
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
        </Link>
      </div>
      <div className="w-5/12">
        <Link
          to={`${routes.PROFILE}/${user.userid}`}
          onClick={handleSearchActiveChange}
        >
          <p className="text-md text-left font-bold">{user.username}</p>
        </Link>
        <p className="text-left flex flex-row items-center text-[0.5rem] font-extralight text-gray-400">
          {user.name}
          <FontAwesomeIcon
            icon={faCircle}
            className="w-1 h-1 mx-1 hidden xl:flex"
          />
          <span className="hidden xl:flex">{user.followedby} pratitelja</span>
        </p>
      </div>
      <div className="ml-auto text-right w-4/12 h-1/6">
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
