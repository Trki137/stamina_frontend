import React, { ChangeEvent } from "react";
import Input from "../../components/Input/Input";
import { userInputType } from "../../@types/LoginTypes";
import ProfileButton from "../../components/Button/ProfileButton";

type TrainingDetailsFormType = {
  trainingInfo: userInputType[];
  handleTrainingInfo: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSaveTraining: () => void;
  handleGoBack: () => void;
};

export default function TrainingDetailsForm({
  trainingInfo,
  handleTrainingInfo,
  handleSaveTraining,
  handleGoBack,
}: TrainingDetailsFormType) {
  const handleStartWorkout = () => {};

  return (
    <React.Fragment>
      <div className="flex w-full">
        <div className={"mx-auto"}>
          {trainingInfo.map((info) => (
            <Input
              key={info.name}
              inputInfo={info}
              handleChange={handleTrainingInfo}
              error={null}
            />
          ))}
          <div className="flex flex-col gap-1">
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
