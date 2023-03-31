import React, { ChangeEvent, useState } from "react";
import { userInputType } from "../../@types/LoginTypes";
import Input from "../../components/Input/Input";
import Textarea from "../../components/Input/Textarea";
import ProfileButton from "../../components/Button/ProfileButton";
import ProfileModal from "../../components/Modal/ProfileModal";

type SaveTrainingModalType = {
  handleClose: () => void;
  handleSave: (data: { description: string; name: string }) => void;
};
export default function SaveTrainingModal({
  handleSave,
  handleClose,
}: SaveTrainingModalType) {
  const [input, setInput] = useState<userInputType>({
    name: "name",
    value: "",
    label: "Name",
    type: "text",
  });
  const [description, setDescription] = useState<string>("");

  return (
    <ProfileModal title="Save" setModalActive={handleClose}>
      <div>
        <div className=" mx-auto px-10 my-7">
          <Input
            inputInfo={input}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInput((prevValue) => ({
                ...prevValue,
                value: e.target.value,
              }))
            }
            error={null}
          />

          <Textarea
            placeholder={"Training description"}
            value={description}
            setValue={setDescription}
          />
          <div className="w-1/2 mx-auto mt-3">
            <ProfileButton
              text={"Save"}
              handleClick={() =>
                handleSave({ description: description, name: input.value })
              }
            />
          </div>
        </div>
      </div>
    </ProfileModal>
  );
}
