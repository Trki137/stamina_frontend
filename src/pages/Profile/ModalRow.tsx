import React, { Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { FollowerOrFollowing } from "../../@types/UserType";
import { Link } from "react-router-dom";
import { routes } from "../../api/paths";

type ModalRowType = {
  user: FollowerOrFollowing;
  setModalActive: Dispatch<SetStateAction<number>>;
};

export default function ModalRow({ user, setModalActive }: ModalRowType) {
  return (
    <div className="flex items-center border-b-[1px] border-gray-200 p-5 cursor-pointer hover:bg-gray-200">
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
        <Link
          to={`${routes.profile}/${user.userid}`}
          onClick={() => setModalActive(0)}
        >
          <p className="text-md font-bold">{user.username}</p>
        </Link>
        <p className="flex flex-row items-center text-[0.5rem] font-extralight text-gray-400">
          {user.name}
        </p>
      </div>
    </div>
  );
}
