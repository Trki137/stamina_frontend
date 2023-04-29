import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Modal from "../../components/Modal/Modal";
import { CardChallengeType } from "../../@types/EventType";
import Textarea from "../../components/Input/Textarea";
import { userInputType } from "../../@types/LoginTypes";
import Input from "../../components/Input/Input";
import ProfileButton from "../../components/Button/ProfileButton";

type CreateChallengeModalType = {
  setActive: Dispatch<SetStateAction<boolean>>;
  setAllChallenges: Dispatch<SetStateAction<CardChallengeType[]>>;
};
export default function CreateChallengeModal({
  setActive,
  setAllChallenges,
}: CreateChallengeModalType) {
  const [description, setDescription] = useState<string>("");
  const [userInput, setUserInput] = useState<userInputType[]>([
    {
      name: "event_name",
      value: "",
      type: "text",
      label: "Event name",
    },
  ]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setUserInput((prevUserInput) => {
      const newUserInput = [...prevUserInput];
      const index = newUserInput.findIndex((input) => input.name === name);
      newUserInput[index].value = value;
      return newUserInput;
    });
  };
  return (
    <Modal title={"Create challenge"} modalChange={() => setActive(false)}>
      {userInput.map((input) => (
        <Input inputInfo={input} handleChange={handleChange} error={null} />
      ))}
      <Textarea
        placeholder={"Description..."}
        value={description}
        setValue={setDescription}
      />
      <ProfileButton text={"Create"} />
    </Modal>
  );
}
