import React, { ChangeEvent, useEffect, useState } from "react";
import { allWorkoutsType, selectedWorkoutType } from "../../@types/WorkoutType";
import { backend_paths } from "../../api/backend_paths";
import axios from "axios";
import {
  Option,
  SelectValue,
} from "react-tailwindcss-select/dist/components/type";
import ProfileButton from "../../components/Button/ProfileButton";
import { userInputType } from "../../@types/LoginTypes";
import {
  saveTrainingType,
  trainingInfoType,
  workoutsToSendType,
} from "../../@types/TrainingTypes";
import TrainingItem from "./TrainingItem";
import WorkoutInfo from "./WorkoutInfo";
import AddWorkoutForm from "./AddWorkoutForm";
import TrainingDetailsForm from "./TrainingDetailsForm";
import { IExerciseData, Muscle } from "react-body-highlighter";
import TrainingMuscleWorked from "./TrainingMuscleWorked";

import {
  calculateAvgCalories,
  calculateTime,
  resolveIntensity,
} from "../../util/trainingCalculation";

export default function AddTraining() {
  const [trainingInfo, setTrainingInfo] = useState<userInputType[]>([
    {
      name: "restBetweenSet",
      value: "",
      label: "Rest between sets",
      type: "text",
    },
    {
      name: "restBetweenWorkouts",
      value: "",
      label: "Rest between workouts",
      type: "text",
    },
    {
      name: "numOfSets",
      value: "",
      label: "Number of sets",
      type: "text",
    },
  ]);
  const [repetitionValue, setRepetitionValue] = useState<userInputType>({
    label: "Repetition",
    value: "",
    type: "text",
    name: "repetition",
  });
  const [allWorkouts, setAllWorkouts] = useState<allWorkoutsType[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<Option | null>(null);
  const [selectedRepetitionOption, setSelectedRepetitionOption] =
    useState<Option | null>(null);
  const [data, setData] = useState<null | {
    anterior: IExerciseData[];
    posterior: IExerciseData[];
  }>(null);
  const [listOfWorkouts, setListOfWorkouts] = useState<selectedWorkoutType[]>(
    []
  );
  const [workoutInfo, setWorkoutInfo] = useState<allWorkoutsType | null>(null);
  const [isWorkoutAddPhaseActive, setIsWorkoutAddPhaseActive] =
    useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(backend_paths.WORKOUT)
      .then((res) => res.data)
      .then((data) => setAllWorkouts(data))
      .catch((err) => console.log(err));
  }, []);

  const getWorkoutSelectFormat = () => {
    return allWorkouts.map((workout) => ({
      value: `${workout.workoutid}`,
      label: workout.name,
    }));
  };

  const handleChange = (value: SelectValue) => {
    setSelectedWorkout(value as Option);
  };

  const handleAddWorkout = () => {
    if (!selectedWorkout || !selectedRepetitionOption) return;

    const workoutIndex = allWorkouts.findIndex(
      (workout) => workout.workoutid === parseInt(selectedWorkout.value)
    );
    const workout = allWorkouts[workoutIndex];

    const data: selectedWorkoutType = {
      workout,
      numOfRepetitions: repetitionValue.value,
      typeOfRepetition: selectedRepetitionOption.label,
    };
    setListOfWorkouts((prev) => [...prev, data]);
  };

  const handleInfo = (id: number) => {
    const index = listOfWorkouts.findIndex(
      (workout) => workout.workout.workoutid === id
    );

    setWorkoutInfo(listOfWorkouts[index].workout);
  };

  const handleTrash = (id: number) => {
    setListOfWorkouts((prevWorkout) => {
      const index = prevWorkout.findIndex(
        (workout) => workout.workout.workoutid === id
      );
      if (index === 0) return [...prevWorkout.slice(1)];

      if (index === prevWorkout.length - 1)
        return [...prevWorkout.slice(0, index)];

      return [...prevWorkout.slice(0, index), ...prevWorkout.slice(index + 1)];
    });

    if (workoutInfo === null) return;

    if (id === workoutInfo.workoutid) setWorkoutInfo(null);
  };

  const handleNext = () => {
    setIsWorkoutAddPhaseActive(false);
    setWorkoutInfo(null);

    const posteriorData: IExerciseData[][] = listOfWorkouts.map((workout) =>
      workout.workout.muscle_targeted
        .filter((muscle) => muscle.body_side === "posterior")
        .map((muscle) => ({
          name: "",
          muscles: [muscle.input_name] as Muscle[],
        }))
    );

    const anteriorData: IExerciseData[][] = listOfWorkouts.map((workout) =>
      workout.workout.muscle_targeted
        .filter((muscle) => muscle.body_side === "anterior")
        .map((muscle) => ({
          name: "",
          muscles: [muscle.input_name] as Muscle[],
        }))
    );

    let newArr: IExerciseData[] = [];
    for (let i = 0; i < anteriorData.length; i++) {
      newArr = newArr.concat(anteriorData[i]);
    }

    let newArray2: IExerciseData[] = [];
    for (let i = 0; i < posteriorData.length; i++) {
      newArray2 = newArray2.concat(posteriorData[i]);
    }

    setData({
      anterior: newArr,
      posterior: newArray2,
    });
  };

  const handleTrainingInfo = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setTrainingInfo((prevTrainingInfo) => {
      const newTrainingInfo = [...prevTrainingInfo];
      const index = newTrainingInfo.findIndex((info) => info.name === name);
      newTrainingInfo[index].value = value;
      return newTrainingInfo;
    });
  };

  const handleSaveToDb = (data: { description: string; name: string }) => {
    const workouts: workoutsToSendType = listOfWorkouts.map((workout) => {
      if (workout.typeOfRepetition === "x") {
        return {
          workoutid: workout.workout.workoutid,
          time: null,
          repetition: parseInt(workout.numOfRepetitions),
        };
      }

      return {
        workoutid: workout.workout.workoutid,
        time: parseInt(workout.numOfRepetitions),
        repetition: null,
      };
    });

    const roundInfo: trainingInfoType = {
      restSet: parseInt(trainingInfo[0].value),
      restWorkout: parseInt(trainingInfo[1].value),
      sets: parseInt(trainingInfo[2].value),
    };

    const time = calculateTime(allWorkouts, workouts, roundInfo);
    if (!time) return;

    const avg_calories = calculateAvgCalories(
      allWorkouts,
      parseFloat(time),
      workouts,
      roundInfo
    );
    const intensity = resolveIntensity(allWorkouts);

    const dataToSend: saveTrainingType = {
      time,
      description: data.description,
      name: data.name,
      avg_calories,
      intensity,
      restBetweenSets: roundInfo.restSet,
      numOfSets: roundInfo.sets,
      restBetweenWorkouts: roundInfo.restWorkout,
      workouts,
    };

    console.log(dataToSend);

    axios
      .post(backend_paths.TRAINING, dataToSend, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full h-full min-h-[700px] min-w-full flex  justify-center ">
      <div className="w-full px-4 h-full my-auto max-w-sm flex flex-col items-center">
        {isWorkoutAddPhaseActive && (
          <React.Fragment>
            <AddWorkoutForm
              handleChange={handleChange}
              selectedWorkout={selectedWorkout}
              workoutSelectFormat={getWorkoutSelectFormat()}
              repetitionValue={repetitionValue}
              setRepetitionValue={setRepetitionValue}
              setSelectedRepetitionOption={setSelectedRepetitionOption}
              selectedRepetitionOption={selectedRepetitionOption}
              handleAddWorkout={handleAddWorkout}
            />

            <div className="w-full">
              {listOfWorkouts.map((workout, index: number) => (
                <TrainingItem
                  key={index}
                  data={workout}
                  handleInfo={() => handleInfo(workout.workout.workoutid)}
                  handleTrash={() => handleTrash(workout.workout.workoutid)}
                />
              ))}
            </div>
          </React.Fragment>
        )}

        {!isWorkoutAddPhaseActive && (
          <div className="w-full">
            <TrainingDetailsForm
              trainingInfo={trainingInfo}
              handleTrainingInfo={handleTrainingInfo}
              handleSaveTraining={() => setModalVisible(true)}
              handleSave={handleSaveToDb}
              handleCancelSave={() => setModalVisible(false)}
              handleGoBack={() => setIsWorkoutAddPhaseActive(true)}
              modalVisible={modalVisible}
            />
          </div>
        )}

        {isWorkoutAddPhaseActive && (
          <div className="w-full py-2">
            <div className="w-1/3 flex items-start">
              <ProfileButton text="Next" handleClick={handleNext} />
            </div>
          </div>
        )}
      </div>
      {workoutInfo && <WorkoutInfo data={workoutInfo} />}
      {data && !isWorkoutAddPhaseActive && <TrainingMuscleWorked data={data} />}
    </div>
  );
}
