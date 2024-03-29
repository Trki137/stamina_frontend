import React, { ChangeEvent } from "react";
import Input from "../../components/Input/Input";
import { userInputType } from "../../@types/LoginTypes";
import ProfileButton from "../../components/Button/ProfileButton";
import SaveTrainingModal from "./SaveTrainingModal";

type TrainingDetailsFormType = {
  trainingInfo: userInputType[];
  handleTrainingInfo: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSaveTraining: () => void;
  handleGoBack: () => void;
  handleCancelSave: () => void;
  modalVisible: boolean;
  handleStartWorkout: () => void;
  handleSave: (data: { description: string; name: string }) => void;
  error: { name: string; message: string }[];
};

export default function TrainingDetailsForm({
  trainingInfo,
  handleTrainingInfo,
  handleSaveTraining,
  handleGoBack,
  handleCancelSave,
  modalVisible,
  handleSave,
  handleStartWorkout,
  error,
}: TrainingDetailsFormType) {
  const getError = (name: string) => {
    if (!error) return null;

    const index = error.findIndex((item) => item.name === name);
    return index !== -1 ? error[index].message : null;
  };

  return (
    <React.Fragment>
      {modalVisible && (
        <SaveTrainingModal
          handleClose={handleCancelSave}
          handleSave={handleSave}
        />
      )}
      <div className="flex w-full">
        <div className={"mx-auto w-full"}>
          <div className="mx-auto w-2/3">
            {trainingInfo.map((info) => (
              <Input
                key={info.name}
                inputInfo={info}
                handleChange={handleTrainingInfo}
                error={getError(info.name)}
              />
            ))}
          </div>
          <div className="flex flex-col gap-1 w-full">
            <ProfileButton
              text="Save workout"
              handleClick={handleSaveTraining}
            />
            <ProfileButton
              text="Start workout"
              handleClick={handleStartWorkout}
            />
            <ProfileButton text="Go back" handleClick={handleGoBack} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
