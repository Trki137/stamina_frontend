import React, { Dispatch, SetStateAction } from "react";
import ModalRow from "./ModalRow";
import { FollowerOrFollowing } from "../../@types/UserType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

type ModalListType = {
  users: FollowerOrFollowing[];

  setModalActive: Dispatch<SetStateAction<number>>;
  title: string;
};
export default function ModalList({
  users,
  setModalActive,
  title,
}: ModalListType) {
  return (
    <div
      id="defaultModal"
      className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-96 md:h-full flex justify-center items-center"
    >
      <div className="relative w-5/12 h-96 max-w-sm  md:h-auto">
        <div className="relative bg-white h-96 rounded-lg shadow-2xl overflow-auto">
          <div className="flex justify-between items-center p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900 mx-auto">
              {title}
            </h3>
            <FontAwesomeIcon
              icon={faTimes}
              onClick={() => setModalActive(0)}
              className="cursor-pointer"
            />
          </div>
          {users.map((user) => (
            <ModalRow
              key={user.userid}
              setModalActive={setModalActive}
              user={user}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
