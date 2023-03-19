import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import ProfileButton from "../../components/Button/ProfileButton";
import axios from "axios";
import { backend_paths } from "../../api/backend_paths";
import ModalList from "./ModalList";
import { FollowerOrFollowing } from "../../@types/UserType";
import { useParams } from "react-router-dom";
import Button from "../../components/Button/Button";

type ProfileInfo = {
  username: string;
  email: string;
  description: string | null;
  image: string | null;
  name: string;
  numoffollowers: string;
  numoffollowing: string;
  isfollowing: boolean;
};
export default function ProfileHead() {
  const { id } = useParams();
  const [currentUserId, setCurrentUserId] = useState<number>(0);
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({
    username: "",
    email: "",
    description: null,
    image: null,
    name: "",
    numoffollowers: "",
    numoffollowing: "",
    isfollowing: false,
  });
  const [followingUser, setFollowingUser] = useState<FollowerOrFollowing[]>([]);
  const [followersUser, setFollowersUser] = useState<FollowerOrFollowing[]>([]);
  const [modalActive, setModalActive] = useState<number>(0);

  const handleUnfollowFollow = (actionId: number) => {
    if (id === undefined || currentUserId === 0 || profileInfo === undefined)
      return;

    const data = {
      followed: id,
      followedBy: currentUserId,
    };
    let path;
    if (actionId === 1) path = `${backend_paths.USERS_URL}/unfollow`;
    else path = `${backend_paths.USERS_URL}/follow`;

    console.log(path);
    axios
      .post(path, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) =>
        setProfileInfo((prevProfileInfo) => {
          let newProfileInfo = { ...prevProfileInfo };
          newProfileInfo.isfollowing = !newProfileInfo.isfollowing;
          if (actionId === 1)
            newProfileInfo.numoffollowers = `${
              parseInt(newProfileInfo.numoffollowers) - 1
            }`;
          else
            newProfileInfo.numoffollowers = `${
              parseInt(newProfileInfo.numoffollowers) + 1
            }`;
          return newProfileInfo;
        })
      )
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let currentUserId = localStorage.getItem("staminaUser");
    if (currentUserId == null) return;
    currentUserId = JSON.parse(currentUserId).userid;
    setCurrentUserId(currentUserId === null ? 0 : parseInt(currentUserId));

    const body = {
      id: currentUserId,
    };

    axios
      .post(`${backend_paths.USERS_URL}/${id}`, body, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => res.data)
      .then((data) => setProfileInfo(data))
      .catch((err) => console.log(err));

    axios
      .get(`${backend_paths.USERS_URL}/followers/${id}`)
      .then((res) => res.data)
      .then((data) => setFollowersUser(data))
      .catch((err) => console.log(err));

    axios
      .get(`${backend_paths.USERS_URL}/following/${id}`)
      .then((res) => res.data)
      .then((data) => setFollowingUser(data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <React.Fragment>
      {modalActive > 0 && (
        <ModalList
          users={modalActive === 1 ? followersUser : followingUser}
          setModalActive={setModalActive}
          title={modalActive === 1 ? "Followers" : "Following"}
        />
      )}
      <div className="flex flex-col w-full justify-end items-start m-auto">
        <div className="flex w-fit min-w-[300px]  sm:min-w-[500px] items-center justify-center  gap-x-2 pt-10 pb-3 sm:mx-auto">
          <div className="w-1/2 sm:w-1/3 flex justify-center items-center">
            {profileInfo?.image && (
              <img
                src={`data:image/jpeg;base64,${profileInfo.image}`}
                className="w-full h-full max-w-[120px] max-h-[120px] p-1 rounded-full border-2"
                alt="Can't access"
              />
            )}
            {!profileInfo?.image && (
              <FontAwesomeIcon
                icon={faUserCircle}
                className="w-full h-full max-w-[120px] max-h-[120px] p-1 rounded-full border-2 border-gray-700 text-gray-700"
              />
            )}
          </div>
          <div className="flex max-w-1/2 flex-col gap-y-4 justify-start sm:w-fit">
            <div className="flex flex-col max-w-[250px] w-full sm:flex-row  sm:items-center sm:justify-start sm:gap-x-8">
              <p className="text-2xl font-bold ">{profileInfo?.username}</p>
              {id !== undefined && parseInt(id) === currentUserId && (
                <ProfileButton text="Edit profile" />
              )}
              {id !== undefined &&
                parseInt(id) !== currentUserId &&
                profileInfo?.isfollowing && (
                  <Button
                    text="Unfollow"
                    handleClick={() => handleUnfollowFollow(1)}
                  />
                )}
              {id !== undefined &&
                parseInt(id) !== currentUserId &&
                !profileInfo?.isfollowing && (
                  <Button
                    text="Follow"
                    handleClick={() => handleUnfollowFollow(0)}
                  />
                )}
            </div>
            <div className="hidden sm:flex sm:items-center sm:justify-start sm:gap-x-8">
              <p className="cursor-pointer" onClick={() => setModalActive(1)}>
                Followers: <b>{profileInfo?.numoffollowers}</b>
              </p>
              <p className="cursor-pointer" onClick={() => setModalActive(2)}>
                Following: <b>{profileInfo?.numoffollowing}</b>
              </p>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-start sm:gap-x-8">
              <p className="text-sm font-bold">{profileInfo?.name}</p>
              {profileInfo?.description && (
                <p className="text-[0.7rem]">{profileInfo?.description}</p>
              )}
            </div>
          </div>
        </div>
        <div className="ml-10 sm:hidden">
          <p className="text-sm font-bold">{profileInfo?.name}</p>
          <p className="text-[0.7rem]">{profileInfo?.description}</p>
        </div>
      </div>
    </React.Fragment>
  );
}
