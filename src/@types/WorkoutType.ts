import { IExerciseData } from "react-body-highlighter";

export type muscleGroupType = {
  muscleid: string;
  name: string;
  body_side: string;
  input_name: string;
};

export type equipmentType = {
  equipmentid: string;
  name: string;
};

export type addWorkoutType = {
  name: string;
  description: string;
  intensity: string;
  muscleTargeted: number[];
  equipment: number[];
};

export type allWorkoutsType = {
  workoutid: number;
  name: string;
  description: string;
  intensity: string;
  muscle_targeted: muscleGroupType[];
  equipment: equipmentType[] | null;
};

export type selectedWorkoutType = {
  workout: allWorkoutsType;
  numOfRepetitions: string;
  typeOfRepetition: string;
};

export type workoutBodyTarget = null | {
  anterior: IExerciseData[];
  posterior: IExerciseData[];
};
