import React, { Dispatch, SetStateAction } from "react";
import Modal from "../../components/Modal/Modal";

type CreateEventModalType = {
  setActive: Dispatch<SetStateAction<boolean>>;
};
export default function CreateEventModal({ setActive }: CreateEventModalType) {
  return (
    <Modal title={"Create event"} modalChange={() => setActive(false)}>
      <p>Modal</p>
    </Modal>
  );
}