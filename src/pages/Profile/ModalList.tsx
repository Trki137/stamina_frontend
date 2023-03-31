import React, { Dispatch, SetStateAction } from "react";
import ModalRow from "./ModalRow";
import { FollowerOrFollowing } from "../../@types/UserType";
import Modal from "../../components/Modal/Modal";

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
    <Modal title={title} modalChange={() => setModalActive(0)}>
      {users.map((user) => (
        <ModalRow
          key={user.userid}
          setModalActive={setModalActive}
          user={user}
        />
      ))}
    </Modal>
  );
}
