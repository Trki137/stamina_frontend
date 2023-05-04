import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { ProfileInfoType, ProfileUpdateType } from "../../@types/Profile";
import Input from "../../components/Input/Input";
import Textarea from "../../components/Input/Textarea";
import Button from "../../components/Button/Button";
import ProfileImageUpload from "../../components/ProfileImageUpload/ProfileImageUpload";
import ProfileModal from "../../components/Modal/ProfileModal";
import axios from "axios";
import { backend_paths } from "../../api/backend_paths";

type EditProfileModal = {
  title: string;
  setModalActive: Dispatch<SetStateAction<number>>;

  profile: ProfileInfoType;
  setProfileInfo: Dispatch<SetStateAction<ProfileInfoType>>;
  userid: number;
};

export default function EditProfileModal({
  title,
  setModalActive,
  profile,
  setProfileInfo,
  userid,
}: EditProfileModal) {
  const [description, setDescription] = useState<string>(
    profile.description === null ? "" : profile.description
  );
  const [file, setFile] = useState<null | string>(profile.image);
  const [imageFile, setImageFile] = useState<null | File>(null);
  const [inputValues, setInputValues] = useState([
    {
      name: "name",
      value: profile.name,
      label: "Name",
      type: "text",
    },
    {
      name: "email",
      value: profile.email,
      label: "Email",
      type: "text",
    },
    {
      name: "username",
      value: profile.username,
      label: "Username",
      type: "text",
    },
  ]);

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    if (file !== null) URL.revokeObjectURL(file);
    setFile(URL.createObjectURL(e.target.files[0]));
    setImageFile(e.target.files[0]);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputValues((prevInputValues) => {
      let newInputValues = [...prevInputValues];
      let index = newInputValues.findIndex((input) => input.name === name);
      newInputValues[index].value = value;
      return newInputValues;
    });
  };

  const handleUpdate = () => {
    const splitedName = inputValues[0].value.split(" ");

    const firstname = splitedName[0];
    let lastname = splitedName[1];

    if (splitedName.length > 2) {
      lastname = inputValues[0].value.substring(
        inputValues[0].value.indexOf(" ") + 1
      );
    }

    const data: ProfileUpdateType = {
      firstname,
      lastname,
      description: description,
      email: inputValues[1].value,
      username: inputValues[2].value,
    };

    if (imageFile) {
      updateWithImage(data);
      return;
    }

    axios
      .put(`${backend_paths.USERS_URL}/update/${userid}`, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => res.data)
      .then((value) => {
        setProfileInfo((prevProfileInfo) => {
          let newProfileInfo = { ...prevProfileInfo };
          newProfileInfo.email = data.email;
          newProfileInfo.username = data.username;
          newProfileInfo.description = data.description;
          newProfileInfo.name = data.firstname + " " + data.lastname;
          return newProfileInfo;
        });
        setModalActive(0);
      })
      .catch((err) => console.log(err));
  };

  const updateWithImage = (data: ProfileUpdateType) => {
    let formData = new FormData();

    formData.append("userInfo", JSON.stringify(data));
    if (!imageFile) return;

    formData.append("image", imageFile);

    axios({
      method: "put",
      url: `${backend_paths.USERS_URL}/update-with-image/${userid}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => res.data)
      .then((value) => {
        setProfileInfo((prevProfileInfo) => {
          let newProfileInfo = { ...prevProfileInfo };
          newProfileInfo.image = value.image;
          newProfileInfo.email = data.email;
          newProfileInfo.username = data.username;
          newProfileInfo.description = data.description;
          newProfileInfo.name = data.firstname + " " + data.lastname;
          return newProfileInfo;
        });
        setModalActive(0);
      })
      .catch((err) => console.log(err));
  };

  return (
    <ProfileModal title={title} setModalActive={() => setModalActive(0)}>
      <div className="flex items-center justify-center relative w-auto h-24">
        <ProfileImageUpload
          file={file}
          isBase64={imageFile === null}
          handleFileInput={handleFileInput}
        />
      </div>
      <div className="w-4/5 m-auto my-5">
        {inputValues.map((input) => (
          <Input
            key={input.name}
            inputInfo={input}
            handleChange={handleChange}
            error={null}
          />
        ))}

        <Textarea
          placeholder="Description..."
          value={description}
          setValue={setDescription}
        />
      </div>
      <div className="w-1/2 mx-auto">
        <Button text="Save" handleClick={handleUpdate} />
      </div>
    </ProfileModal>
  );
}
