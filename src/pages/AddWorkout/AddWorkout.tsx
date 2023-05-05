import React, { ChangeEvent, useEffect, useState } from "react";
import {
  addWorkoutType,
  equipmentType,
  muscleGroupType,
} from "../../@types/WorkoutType";
import axios from "axios";
import { backend_paths } from "../../api/backend_paths";
import MySelect from "../../components/Select/MySelect";
import {
  Option,
  SelectValue,
} from "react-tailwindcss-select/dist/components/type";
import { intensityLevel } from "../../constants/IntensityLevel";
import Textarea from "../../components/Input/Textarea";
import Input from "../../components/Input/Input";
import { userInputType } from "../../@types/LoginTypes";

import { IExerciseData, Muscle } from "react-body-highlighter";
import BodyHighlighter from "../../components/BodyHighlighter/BodyHighlighter";
import ProfileButton from "../../components/Button/ProfileButton";

export default function AddWorkout() {
  const [name, setName] = useState<userInputType>({
    label: "Name",
    value: "",
    type: "text",
    name: "name",
  });
  const [description, setDescription] = useState<string>("");
  const [muscleGroups, setMuscleGroups] = useState<muscleGroupType[] | null>(
    null
  );
  const [allEquipment, setAllEquipment] = useState<equipmentType[] | null>(
    null
  );

  const [dataForModel, setDataForModel] = useState<IExerciseData[]>([]);
  const [selectedMuscle, setSelectedMuscle] = useState<SelectValue>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<SelectValue>(null);
  const [selectedIntensity, setSelectedIntensity] = useState<Option | null>(
    null
  );

  useEffect(() => {
    axios
      .get(backend_paths.MUSCLE)
      .then((res) => res.data)
      .then((data: muscleGroupType[]) => setMuscleGroups(data))
      .catch((err) => console.log(err));

    axios
      .get(backend_paths.EQUIPMENT)
      .then((res) => res.data)
      .then((data: equipmentType[]) => setAllEquipment(data))
      .catch((err) => console.log(err));
  }, []);

  const getMuscleOptionFormat = () => {
    return muscleGroups === null
      ? null
      : muscleGroups.map((muscle: muscleGroupType) => ({
          label: muscle.name,
          value: muscle.muscleid,
        }));
  };

  const getEquipmentOptionFormat = () => {
    return allEquipment === null
      ? null
      : allEquipment.map((equipment: equipmentType) => ({
          label: equipment.name,
          value: equipment.equipmentid,
        }));
  };

  const handleMuscleChange = (value: SelectValue) => {
    setSelectedMuscle(value);
    if (!Array.isArray(value)) {
      setDataForModel([]);
      return;
    }

    const selectedMuscles: muscleGroupType[] | undefined = muscleGroups?.filter(
      (muscle) => value.findIndex((val) => val.value === muscle.muscleid) !== -1
    );

    if (selectedMuscles === undefined) {
      return;
    }

    const modelData: IExerciseData[] = selectedMuscles.map((val) => ({
      name: name.value,
      muscles: [val.input_name] as Muscle[],
    }));

    setDataForModel(modelData);
  };

  const handleSaveWorkout = () => {
    if (!(Array.isArray(selectedMuscle) && selectedIntensity)) return;

    const intensity = selectedIntensity.value;
    const muscleTargeted: number[] = selectedMuscle.map((muscle) =>
      parseInt(muscle.value)
    );
    let equipment: number[] | null = null;

    if (selectedEquipment !== null) {
      if (Array.isArray(selectedEquipment))
        equipment = selectedEquipment.map((equipment: Option) =>
          parseInt(equipment.value)
        );
    }

    const data: addWorkoutType = {
      name: name.value,
      description,
      intensity,
      muscleTargeted,
      equipment,
    };

    axios
      .post(backend_paths.WORKOUT, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setName((prev) => ({ ...prev, value: "" }));
        setDataForModel([]);
        setSelectedIntensity(null);
        setDescription("");
        setSelectedMuscle(null);
        setSelectedEquipment(null);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full h-[100%] pt-56 flex justify-center items-center align-middle">
      <div className="w-full lg:w-1/2 h-full flex flex-row">
        <div className="pl-32 w-full min-w-fit lg:pl-0 flex flex-col gap-y-1">
          <Input
            inputInfo={name}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName((prev) => ({ ...prev, value: e.target.value }))
            }
            error={null}
          />
          <Textarea
            placeholder={"Write workout description"}
            value={description}
            setValue={setDescription}
          />
          <MySelect
            placeholder={"Choose a muscle group"}
            options={getMuscleOptionFormat()}
            onChange={handleMuscleChange}
            value={selectedMuscle}
            isMultiple={true}
            fixedWidth={true}
          />

          <MySelect
            placeholder={"Choose necessary equipment"}
            options={getEquipmentOptionFormat()}
            onChange={(value: SelectValue) => setSelectedEquipment(value)}
            value={selectedEquipment}
            isMultiple={true}
            fixedWidth={true}
          />
          <MySelect
            placeholder={"Choose intensity level"}
            options={intensityLevel}
            onChange={(value: SelectValue) =>
              setSelectedIntensity(value as Option)
            }
            value={selectedIntensity}
            isMultiple={false}
            fixedWidth={true}
          />
          <div className="w-full flex justify-start ">
            <div className="w-3/6">
              <ProfileButton text={"Save"} handleClick={handleSaveWorkout} />
            </div>
          </div>
        </div>
        <div className="w-full h-full flex md:pl-20">
          <BodyHighlighter data={dataForModel} side={"anterior"} />
          <BodyHighlighter data={dataForModel} side={"posterior"} />
        </div>
      </div>
    </div>
  );
}
