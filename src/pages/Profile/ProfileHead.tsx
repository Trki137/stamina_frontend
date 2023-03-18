import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import ProfileButton from "../../components/Button/ProfileButton";
import axios from "axios";
import { backend_paths } from "../../api/backend_paths";
import ModalList from "./ModalList";
import { FollowerOrFollowing } from "../../@types/UserType";
import { useParams } from "react-router-dom";

type ProfileInfo = {
  username: string;
  email: string;
  description: string | null;
  image: string | null;
  name: string;
  numoffollowers: string;
  numoffollowing: string;
};
export default function ProfileHead() {
  const {id} = useParams();
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>();
  const [followingUser, setFollowingUser] = useState<FollowerOrFollowing[]>([]);
  const [followersUser, setFollowersUser] = useState<FollowerOrFollowing[]>([]);
  const [modalActive, setModalActive] = useState<number>(0);

  useEffect(() => {
    let currentUserId = localStorage.getItem("staminaUser");
    if (currentUserId == null) return;
    currentUserId = JSON.parse(currentUserId).userid;

    console.log(id);

    axios
        .get(`${backend_paths.USERS_URL}/${id}`)
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

  console.log(profileInfo);
  return (
      <React.Fragment>
        {modalActive > 0 && (
            <ModalList
                users={modalActive === 1 ? followersUser : followingUser}
                setModalActive={setModalActive}
                title={modalActive === 1 ? "Followers" : "Following"}
            />
        )}
        <div className="flex  flex-col w-9/12 justify-end items-start sm:w-11/12 md:w-9/12 m-auto">
          <div className=" flex w-full items-center justify-center gap-x-2 pt-10 pb-3">
            <div className="w-3/12 flex justify-center items-center">
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
            <div className="flex w-9/12   flex-col gap-y-4 justify-start">
              <div
                  className="flex flex-col max-w-[250px] w-full sm:flex-row   sm:items-center sm:justify-start sm:gap-x-8">
                <p className="text-2xl font-bold ">{profileInfo?.username}</p>
                <ProfileButton text="Edit profile"/>
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
          <div className=" sm:hidden">
            <p className="text-sm font-bold">{profileInfo?.name}</p>
            <p className="text-[0.7rem]">{profileInfo?.description}</p>
          </div>
        </div>
      </React.Fragment>
  );
}
