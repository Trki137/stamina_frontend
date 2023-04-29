import React, { Dispatch, SetStateAction } from "react";
import Modal from "../../components/Modal/Modal";

type CreateChallengeModalType = {
  setActive: Dispatch<SetStateAction<boolean>>;
};
export default function CreateChallengeModal({
  setActive,
}: CreateChallengeModalType) {
  return (
    <Modal title={"Create challenge"} modalChange={() => setActive(false)}>
      <p>Modal</p>
    </Modal>
  );
}