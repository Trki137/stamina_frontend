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

type Error = {
  name: string;
  message: string;
};
export default function SaveTrainingModal({
  handleSave,
  handleClose,
}: SaveTrainingModalType) {
  const [error, setError] = useState<Error[]>([]);
  const [input, setInput] = useState<userInputType>({
    name: "name",
    value: "",
    label: "Name",
    type: "text",
  });
  const [description, setDescription] = useState<string>("");

  const handleSaveEvent = () => {
    setError([]);
    if (input.value.length == 0) {
      setError([
        {
          name: input.name,
          message: "Name can't be empty",
        },
      ]);
      return;
    }

    handleSave({ description: description, name: input.value });
  };

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
            error={error.length > 0 ? error[0].message : null}
          />

          <Textarea
            placeholder={"Training description"}
            value={description}
            setValue={setDescription}
          />
          <div className="w-1/2 mx-auto mt-3">
            <ProfileButton text={"Save"} handleClick={handleSaveEvent} />
          </div>
        </div>
      </div>
    </ProfileModal>
  );
}
