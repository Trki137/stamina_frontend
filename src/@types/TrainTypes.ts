import { allWorkoutsType } from "./WorkoutType";

export type TrainType = {
  sequence: number;
  time: number | null;
  repetition: number | null;
  name: string;
};

export type TrainingData = {
  data: TrainType[];
  workouts: allWorkoutsType[];
};
